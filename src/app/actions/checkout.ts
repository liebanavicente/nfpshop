"use server";

import { stripe } from "@/lib/stripe";
import { getDesign, getVariant } from "@/lib/products";
import { getSiteUrl } from "@/lib/site-url";

export async function startCheckoutSession(designSlug: string, variantId: string) {
  const design = getDesign(designSlug);
  const variant = design && getVariant(design, variantId);
  if (!design || !variant) {
    throw new Error(`Unknown design/variant: ${designSlug}/${variantId}`);
  }

  const siteUrl = getSiteUrl();

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
    line_items: [
      {
        price_data: {
          currency: variant.currency,
          product_data: {
            name: `${design.name} (${variant.label})`,
            description: design.description,
            images: [`${siteUrl}${variant.imageUrl}`],
          },
          unit_amount: variant.priceCents,
        },
        quantity: 1,
      },
    ],
    metadata: {
      designSlug: design.slug,
      variantId: variant.id,
    },
  });

  if (!session.client_secret) {
    throw new Error("Stripe did not return a client secret");
  }

  return session.client_secret;
}
