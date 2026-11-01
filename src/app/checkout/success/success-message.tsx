"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useLocale } from "@/lib/i18n";
import { useCart } from "@/lib/cart";

export function OrderNotFound() {
  const { t } = useLocale();
  return (
    <h1 className="titular text-[clamp(2rem,6vw,3.5rem)]">
      <span className="tira">{t("checkoutSuccess.notFound")}</span>
    </h1>
  );
}

export function OrderSuccess({ email }: { email?: string | null }) {
  const { t } = useLocale();
  const { clear } = useCart();

  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* pedido hecho: el sello de la banda se estampa como en un albarán pagado */}
      <Image src="/products/logo1-black-ink.png" alt="" width={882} height={885} className="estampa sello-tinta mx-auto mb-8 w-36" style={{ "--giro": "-10deg" } as React.CSSProperties} />
      <h1 className="titular text-[clamp(2rem,6vw,3.5rem)]">
        <span className="tira">{t("checkoutSuccess.thanks")}</span>
      </h1>
      <p className="mt-6 text-lg">
        {t("checkoutSuccess.body")} <span className="font-semibold">{email}</span>.
      </p>
    </>
  );
}
