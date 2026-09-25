"use client";

import { useLocale } from "@/lib/i18n";

export default function ShippingReturns() {
  const { t } = useLocale();

  const items = [
    { title: t("shipping.productionTitle"), body: t("shipping.productionBody") },
    { title: t("shipping.shippingTitle"), body: t("shipping.shippingBody") },
    { title: t("shipping.returnsTitle"), body: t("shipping.returnsBody") },
  ];

  return (
    <section id="envio" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="reveal-on-scroll mb-10 font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide text-white sm:text-4xl">
          {t("shipping.heading")}
        </h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.title} className="reveal-on-scroll glass rounded-3xl p-6 sm:p-7">
              <h3 className="font-[family-name:var(--font-display)] text-lg uppercase tracking-wide text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-neutral-300">{item.body}</p>
            </div>
          ))}
        </div>
        <p className="reveal-on-scroll mt-10 text-sm text-neutral-400">
          {t("shipping.contact")}{" "}
          <a href="mailto:info@noflagpatriots.com" className="nav-link text-neutral-300">
            info@noflagpatriots.com
          </a>
          .
        </p>
      </div>
    </section>
  );
}
