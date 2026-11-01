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

// La mesa de merch: cada pieza pinchada en el papel, torcida a su manera, con el precio en una tira.
const GIROS = [-2, 1.5, -1, 2.5];
const DESNIVEL = ["md:mt-0", "md:mt-12", "md:-mt-2", "md:mt-8"];

export default function ProductsPreview() {
  const { t } = useLocale();
  const featured = designs.slice(0, 4);
  return (
    <section id="productos" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="reveal-on-scroll titular">
          <span className="tira">{t("products.heading")}</span>
        </h2>
        <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 sm:gap-x-8 md:grid-cols-4">
          {featured.map((design, i) => {
            const variant = design.variants[0];
            return (
              // reveal-on-scroll anima transform: el giro va en --hasta y el hover en el hijo
              <div key={design.slug} className={`reveal-on-scroll ${DESNIVEL[i]}`} style={{ "--hasta": `rotate(${GIROS[i]}deg)` } as React.CSSProperties}>
                <Link
                  href={`/producto/${design.slug}`}
                  className="group relative block bg-[#fbf8f1] p-2.5 pb-4 shadow-[7px_7px_0_var(--tinta)] transition-transform duration-150 hover:-translate-y-1"
                >
                  <span aria-hidden="true" className="absolute -top-2 left-1/2 z-10 h-4 w-4 -translate-x-1/2 rounded-full bg-[var(--azul)] shadow-[1px_2px_0_var(--tinta)]" />
                  <ProductImage design={design} variant={variant} />
                  <h3 className="mt-3 truncate font-[family-name:var(--font-display)] text-sm uppercase sm:text-base">{design.name}</h3>
                  <p className="tira tira-azul absolute -right-3 bottom-10 rotate-[-4deg] text-sm sm:text-base">
                    {formatPrice(variant.priceCents, variant.currency)}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="mt-16 text-center">
          <Link href="/tienda" className="boton-tira">
            {t("products.verTodo")} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
