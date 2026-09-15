"use server";

import { stripe } from "@/lib/stripe";
import { getProduct } from "@/lib/products";
import { getSiteUrl } from "@/lib/site-url";

export async function startCheckoutSession(productId: string) {
  const product = getProduct(productId);
  if (!product) {
    throw new Error(`Unknown product: ${productId}`);
  }

  const siteUrl = getSiteUrl();

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
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
          currency: product.currency,
          product_data: {
            name: product.name,
            description: product.description,
            images: [`${siteUrl}${product.imageUrl}`],
            metadata: { productId: product.id },
          },
          unit_amount: product.priceCents,
        },
        quantity: 1,
      },
    ],
    metadata: {
      productId: product.id,
    },
  });

  if (!session.client_secret) {
    throw new Error("Stripe did not return a client secret");
  }

  return session.client_secret;
}
