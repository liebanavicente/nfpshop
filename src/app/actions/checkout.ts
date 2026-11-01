"use server";

import { stripe } from "@/lib/stripe";
import { getDesign, getVariant } from "@/lib/products";
import { getSiteUrl } from "@/lib/site-url";
import { AGOTADA, EDICION_P62 } from "@/lib/edicion-limitada";
import { reservarStock, skuDe, type LineaStock } from "@/lib/stock";
import type { CartLine } from "@/lib/cart";


export async function startCheckoutSession(lines: CartLine[]) {
  if (lines.length === 0) {
    throw new Error("Cart is empty");
  }

  const siteUrl = getSiteUrl();
  const lineasStock: LineaStock[] = [];

  const lineItems = lines.map((line) => {
    const design = getDesign(line.designSlug);
    const variant = design && getVariant(design, line.variantId);
    if (!design || !variant) {
      throw new Error(`Unknown design/variant: ${line.designSlug}/${line.variantId}`);
    }
    if (design.stock) lineasStock.push({ sku: skuDe(design.slug, variant.id), cantidad: line.quantity });
    return {
      price_data: {
        currency: variant.currency,
        product_data: {
          name: `${design.name} (${variant.label})`,
          description: design.description,
          images: [`${siteUrl}${variant.imageUrl}`],
          // Recovered in the webhook (via line_items.data.price.product) to
          // build the Gelato order — session-level metadata is too small
          // to hold a whole cart.
          metadata: {
            designSlug: design.slug,
            variantId: variant.id,
          },
        },
        unit_amount: variant.priceCents,
      },
      quantity: line.quantity,
    };
  });

  // La edición limitada la envía la banda: envío propio (o recogida) y solo a sus países.
  const conStock = lineasStock.length > 0;
  const { envio } = EDICION_P62;
  const stockOptions = conStock
    ? {
        metadata: { stock: "1" },
        // Stripe exige al menos 30 minutos; es lo que dura la reserva de las tallas.
        expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount" as const,
              display_name: "Envío por Correos",
              fixed_amount: { amount: envio.correosCents, currency: "eur" },
            },
          },
          ...(envio.recogidaBarcelona
            ? [
                {
                  shipping_rate_data: {
                    type: "fixed_amount" as const,
                    display_name: "Recogida en Barcelona (te escribimos para quedar)",
                    fixed_amount: { amount: 0, currency: "eur" },
                  },
                },
              ]
            : []),
        ],
      }
    : {};

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded_page",
    redirect_on_completion: "always",
    return_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    mode: "payment",
    // Gelato necesita una dirección de envío para producir y enviar el pedido.
    shipping_address_collection: {
      allowed_countries: conStock ? [...envio.paises] : ["ES", "PT", "FR", "IT", "DE"],
    },
    phone_number_collection: { enabled: true },
    line_items: lineItems,
    ...stockOptions,
  });

  // Reserva las tallas para esta sesión; si alguna ya no llega, se cierra la sesión sin cobrar.
  if (conStock && !(await reservarStock(session.id, lineasStock))) {
    await stripe.checkout.sessions.expire(session.id);
    throw new Error(AGOTADA);
  }

  if (!session.client_secret) {
    throw new Error("Stripe did not return a client secret");
  }

  return session.client_secret;
}
