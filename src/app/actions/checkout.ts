"use server";

import { stripe } from "@/lib/stripe";
import { getDesign, getVariant } from "@/lib/products";
import { getSiteUrl } from "@/lib/site-url";
import type { CartLine } from "@/lib/cart";

export async function startCheckoutSession(lines: CartLine[]) {
  if (lines.length === 0) {
    throw new Error("Cart is empty");
  }

  const siteUrl = getSiteUrl();

  const lineItems = lines.map((line) => {
    const design = getDesign(line.designSlug);
    const variant = design && getVariant(design, line.variantId);
    if (!design || !variant) {
      throw new Error(`Unknown design/variant: ${line.designSlug}/${line.variantId}`);
    }
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

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded_page",
    redirect_on_completion: "always",
    return_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    mode: "payment",
    // Gelato necesita una dirección de envío para producir y enviar el pedido.
    shipping_address_collection: {
      allowed_countries: ["ES", "PT", "FR", "IT", "DE"],
    },
    phone_number_collection: { enabled: true },
    line_items: lineItems,
  });

  if (!session.client_secret) {
    throw new Error("Stripe did not return a client secret");
  }

  return session.client_secret;
}
