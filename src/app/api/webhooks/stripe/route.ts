import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { getProduct } from "@/lib/products";
import { createGelatoOrder } from "@/lib/gelato";

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

  return NextResponse.json({ received: true });
}

async function handleCompletedCheckout(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  const productId = session.metadata?.productId;
  const product = productId ? getProduct(productId) : undefined;
  const shipping = session.collected_information?.shipping_details;
  const address = shipping?.address ?? session.customer_details?.address;

  if (!product || !address || !session.customer_details?.email) {
    console.error("Checkout completed with missing data", {
      sessionId,
      productId,
    });
    return;
  }

  const [firstName, ...rest] = (shipping?.name ?? "Cliente").split(" ");

  try {
    await createGelatoOrder({
      orderReferenceId: session.id,
      customerReferenceId: session.customer_details.email,
      currency: (session.currency ?? product.currency).toUpperCase(),
      items: [
        {
          itemReferenceId: product.id,
          productUid: product.gelatoProductUid,
          quantity: 1,
        },
      ],
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
