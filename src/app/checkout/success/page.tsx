import { stripe } from "@/lib/stripe";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <main className="mx-auto max-w-2xl px-4 pb-20 pt-36 text-center">
        <h1 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide text-white">
          Pedido no encontrado
        </h1>
      </main>
    );
  }

  const session = await stripe.checkout.sessions.retrieve(session_id);

  return (
    <main className="mx-auto max-w-2xl px-4 pb-20 pt-36 text-center">
      <h1 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide text-white">
        ¡Gracias por tu compra!
      </h1>
      <p className="mt-2 text-neutral-400">
        Hemos recibido tu pago y estamos preparando tu pedido para producción
        y envío. Te llegará la confirmación a{" "}
        <span className="font-medium text-white">{session.customer_details?.email}</span>
        .
      </p>
    </main>
  );
}
