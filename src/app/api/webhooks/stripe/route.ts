import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { getDesign, getVariant } from "@/lib/products";
import { createGelatoOrder, type GelatoOrderItem } from "@/lib/gelato";
import { getSiteUrl } from "@/lib/site-url";
import { confirmarStock, liberarStock } from "@/lib/stock";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing signature or webhook secret" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await handleCompletedCheckout(session.id);
  }

  // Pago de la edición limitada sin completar: las tallas reservadas vuelven al stock.
  // (Hay que activar este evento en el webhook de Stripe.)
  if (event.type === "checkout.session.expired") {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.metadata?.stock === "1") await liberarStock(session.id);
  }

  return NextResponse.json({ received: true });
}

async function handleCompletedCheckout(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items.data.price.product"],
  });

  const conStock = session.metadata?.stock === "1";
  if (conStock) {
    try {
      await confirmarStock(session.id);
    } catch (err) {
      // El cobro ya está hecho: la reserva sigue descontada del stock, solo falta marcarla como venta.
      console.error("Failed to confirm stock reservation", { sessionId, err });
    }
  }

  const shipping = session.collected_information?.shipping_details;
  const address = shipping?.address ?? session.customer_details?.address;

  if (!address || !session.customer_details?.email) {
    console.error("Checkout completed with missing shipping/email", { sessionId });
    return;
  }

  const siteUrl = getSiteUrl();
  const items: GelatoOrderItem[] = [];

  for (const lineItem of session.line_items?.data ?? []) {
    const product = lineItem.price?.product;
    const metadata = product && typeof product !== "string" && !product.deleted
      ? product.metadata
      : undefined;
    const designSlug = metadata?.designSlug;
    const variantId = metadata?.variantId;
    const design = designSlug ? getDesign(designSlug) : undefined;
    const variant = design && variantId ? getVariant(design, variantId) : undefined;

    if (!design || !variant) {
      console.error("Line item missing design/variant metadata", {
        sessionId,
        designSlug,
        variantId,
      });
      continue;
    }

    // Stock propio (edición limitada): no va a Gelato, lo envía la banda desde el aviso de Stripe.
    if (!variant.gelatoProductUid) continue;

    items.push({
      itemReferenceId: `${design.slug}-${variant.id}`,
      productUid: variant.gelatoProductUid,
      quantity: lineItem.quantity ?? 1,
      files: [{ type: "default", url: `${siteUrl}${variant.imageUrl}` }],
    });
  }

  if (items.length === 0) {
    if (conStock) return; // pedido solo de stock propio
    console.error("Checkout completed with no resolvable items", { sessionId });
    return;
  }

  const [firstName, ...rest] = (shipping?.name ?? "Cliente").split(" ");

  try {
    await createGelatoOrder({
      orderReferenceId: session.id,
      customerReferenceId: session.customer_details.email,
      currency: (session.currency ?? "eur").toUpperCase(),
      items,
      shippingAddress: {
        firstName: firstName || "Cliente",
        lastName: rest.join(" ") || "-",
        addressLine1: address.line1 ?? "",
        addressLine2: address.line2 ?? undefined,
        city: address.city ?? "",
        postCode: address.postal_code ?? "",
        state: address.state ?? undefined,
        country: address.country ?? "",
        email: session.customer_details.email,
        phone: session.customer_details.phone ?? undefined,
      },
    });
  } catch (err) {
    // TODO: enviar esta alerta a un canal (email/Slack) para intervención manual,
    // ya que el cliente ya ha pagado y el pedido de producción no se ha creado.
    console.error("Failed to create Gelato order", { sessionId, err });
  }
}
