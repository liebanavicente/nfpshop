"use client";

import { useCallback, useState } from "react";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { startCheckoutSession } from "@/app/actions/checkout";
import type { CartLine } from "@/lib/cart";
import { AGOTADA } from "@/lib/edicion-limitada";
import { useLocale } from "@/lib/i18n";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function Checkout({ lines }: { lines: CartLine[] }) {
  const { t } = useLocale();
  const [agotada, setAgotada] = useState(false);
  // Si una talla de la edición limitada se agota justo ahora, el servidor no abre el pago: se avisa aquí.
  const fetchClientSecret = useCallback(
    () =>
      startCheckoutSession(lines).catch((err: unknown) => {
        if (err instanceof Error && err.message.includes(AGOTADA)) setAgotada(true);
        throw err;
      }),
    [lines],
  );

  if (agotada) {
    return <p className="p-6 font-[family-name:var(--font-display)] text-lg">{t("cart.agotada")}</p>;
  }

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
