"use client";

import { useEffect } from "react";
import { useLocale } from "@/lib/i18n";
import { useCart } from "@/lib/cart";

export function OrderNotFound() {
  const { t } = useLocale();
  return (
    <h1 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide text-white">
      {t("checkoutSuccess.notFound")}
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
      <h1 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide text-white">
        {t("checkoutSuccess.thanks")}
      </h1>
      <p className="mt-2 text-neutral-400">
        {t("checkoutSuccess.body")} <span className="font-medium text-white">{email}</span>.
      </p>
    </>
  );
}
