import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getSiteUrl } from "@/lib/site-url";

// TEMPORARY: creates (or reports) the Stripe webhook endpoint for this
// deployment's current mode, pointed at /api/webhooks/stripe. Delete after use.
export async function GET() {
  const url = `${getSiteUrl()}/api/webhooks/stripe`;

  const existing = await stripe.webhookEndpoints.list({ limit: 100 });
  const match = existing.data.find((e) => e.url === url);
  if (match) {
    return NextResponse.json({ existing: true, id: match.id, status: match.status });
  }

  const endpoint = await stripe.webhookEndpoints.create({
    url,
    enabled_events: ["checkout.session.completed"],
  });

  return NextResponse.json({
    created: true,
    id: endpoint.id,
    secret: endpoint.secret,
  });
}
