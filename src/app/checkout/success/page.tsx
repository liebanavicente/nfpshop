import { stripe } from "@/lib/stripe";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Pedido no encontrado</h1>
      </main>
    );
  }

  const session = await stripe.checkout.sessions.retrieve(session_id);

  return (
    <main className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">¡Gracias por tu compra!</h1>
      <p className="text-neutral-600 mt-2">
        Hemos recibido tu pago y estamos preparando tu pedido para producción
        y envío. Te llegará la confirmación a{" "}
        <span className="font-medium">{session.customer_details?.email}</span>
        .
      </p>
    </main>
  );
}
