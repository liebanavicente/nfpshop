import { stripe } from "@/lib/stripe";
import { OrderNotFound, OrderSuccess } from "@/app/checkout/success/success-message";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <main className="mx-auto max-w-2xl px-4 pb-20 pt-36 text-center">
        <OrderNotFound />
      </main>
    );
  }

  const session = await stripe.checkout.sessions.retrieve(session_id);

  return (
    <main className="mx-auto max-w-2xl px-4 pb-20 pt-36 text-center">
      <OrderSuccess email={session.customer_details?.email} />
    </main>
  );
}
