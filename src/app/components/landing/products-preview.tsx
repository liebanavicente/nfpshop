"use client";

import Link from "next/link";
import { designs } from "@/lib/products";
import ProductImage from "@/app/components/product-image";
import { useLocale } from "@/lib/i18n";

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency }).format(
    cents / 100,
  );
}

export default function ProductsPreview() {
  const { t } = useLocale();
  const featured = designs.slice(0, 4);
  return (
    <section id="productos" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="reveal-on-scroll mb-10 font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide text-white sm:text-4xl">
          {t("products.heading")}
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {featured.map((design) => {
            const variant = design.variants[0];
            return (
              // reveal-on-scroll animates transform, which would override the
              // hover lift if both lived on the same element.
              <div key={design.slug} className="reveal-on-scroll">
                <Link
                  href={`/producto/${design.slug}`}
                  className="punk-card glass glass-hover block overflow-hidden p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
                >
                  <div className="overflow-hidden rounded-sm">
                    <ProductImage design={design} variant={variant} />
                  </div>
                  <div className="px-2 pb-2 pt-3">
                    <h3 className="truncate text-sm font-semibold uppercase text-white">{design.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-sky-300">
                      {formatPrice(variant.priceCents, variant.currency)}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/tienda"
            className="glass glass-hover inline-flex items-center gap-2 rounded-full px-6 py-3 font-[family-name:var(--font-display)] text-sm uppercase tracking-widest text-white"
          >
            {t("products.verTodo")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
