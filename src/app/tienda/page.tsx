"use client";

import Link from "next/link";
import { designs } from "@/lib/products";
import ProductImage from "@/app/components/product-image";
import { useLocale } from "@/lib/i18n";
import EdicionLimitada from "@/app/components/landing/edicion-limitada";

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

// El catálogo como la mesa de merch de la portada: fichas pinchadas, un poco torcidas, con el precio en una tira.
const GIROS = [-1.2, 0.8, -0.5, 1.1, -0.9, 0.6];

function Section({
  id,
  title,
  category,
}: {
  id: string;
  title: string;
  category: "camiseta" | "funda-iphone";
}) {
  const { t } = useLocale();
  const items = designs.filter((d) => d.category === category);
  return (
    <section id={id} className="mb-24 scroll-mt-28">
      <h2 className="titular text-[clamp(2rem,5.5vw,3.75rem)]">
        <span className="tira tira-azul">{title}</span>
      </h2>
      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 md:grid-cols-3">
        {items.map((design, i) => {
          const fromPrice = design.variants[0];
          return (
            <Link
              key={design.slug}
              href={`/producto/${design.slug}`}
              style={{ rotate: `${GIROS[i % GIROS.length]}deg` }}
              className="group relative block bg-[#fbf8f1] p-2.5 pb-5 shadow-[8px_8px_0_var(--tinta)] transition-transform duration-150 hover:-translate-y-1 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[var(--azul)]"
            >
              <span aria-hidden="true" className="absolute -top-2 left-1/2 z-10 h-4 w-4 -translate-x-1/2 rounded-full bg-[var(--azul)] shadow-[1px_2px_0_var(--tinta)]" />
              <ProductImage design={design} variant={fromPrice} />
              <div className="px-1.5 pt-4">
                <h3 className="font-[family-name:var(--font-display)] text-lg uppercase leading-tight">{design.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4a443d]">{design.description}</p>
              </div>
              <p className="tira tira-azul absolute -right-3 top-[58%] rotate-[-4deg] text-sm sm:text-base">
                {t("tienda.desde")} {formatPrice(fromPrice.priceCents, fromPrice.currency)}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default function Tienda() {
  const { t } = useLocale();
  return (
    <main className="fotocopia flex-1">
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-32 sm:px-6">
        <h1 className="titular">
          <span className="tira">{t("tienda.heading")}</span>
        </h1>
        <p className="mb-16 mt-6 max-w-lg text-lg">{t("tienda.subheading")}</p>
        <EdicionLimitada compacta />
        <Section id="camisetas" title={t("tienda.camisetas")} category="camiseta" />
        <Section id="fundas" title={t("tienda.fundas")} category="funda-iphone" />
      </div>
    </main>
  );
}
