"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n";

// Envíos y devoluciones escritos como un albarán a máquina, con el sello de la banda encima.
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
        <h2 className="reveal-on-scroll titular text-[clamp(2.2rem,6.5vw,5rem)]">
          <span className="tira">{t("shipping.heading")}</span>
        </h2>
        <div
          className="reveal-on-scroll relative mt-12 border-2 border-[var(--tinta)] bg-[#fbf8f1] px-5 py-7 shadow-[10px_10px_0_var(--azul)] sm:px-10 sm:py-10"
          style={{ "--hasta": "rotate(-0.6deg)" } as React.CSSProperties}
        >
          <p className="flex justify-between border-b-2 border-dashed border-[var(--tinta)] pb-3 font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.2em] sm:text-sm">
            <span>No Flag Patriots · Merch</span>
            <span>Nº 001</span>
          </p>
          <ol className="divide-y-2 divide-dotted divide-[var(--tinta)]/40">
            {items.map((item, i) => (
              <li key={item.title} className="grid grid-cols-[2.2rem_1fr] gap-x-3 py-6 sm:grid-cols-[3rem_1fr]">
                <span className="font-[family-name:var(--font-display)] text-2xl text-[var(--azul)] sm:text-3xl">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg uppercase sm:text-xl">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="border-t-2 border-dashed border-[var(--tinta)] pt-4 text-sm">
            {t("shipping.contact")}{" "}
            <a href="mailto:info@noflagpatriots.com" className="font-semibold underline decoration-2 underline-offset-4 hover:text-[var(--azul)]">
              info@noflagpatriots.com
            </a>
            .
          </p>
          <Image
            src="/products/logo1-black-ink.png"
            alt=""
            width={882}
            height={885}
            className="sello-tinta pointer-events-none absolute -right-6 -top-10 w-28 rotate-[16deg] sm:-right-12 sm:w-36"
          />
        </div>
      </div>
    </section>
  );
}
