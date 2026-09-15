import Link from "next/link";
import { designs } from "@/lib/products";
import ProductImage from "@/app/components/product-image";

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

function Section({
  id,
  title,
  category,
}: {
  id: string;
  title: string;
  category: "camiseta" | "funda-iphone";
}) {
  const items = designs.filter((d) => d.category === category);
  return (
    <section id={id} className="mb-16 scroll-mt-24">
      <h2 className="mb-6 font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide text-white">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {items.map((design) => {
          const fromPrice = design.variants[0];
          return (
            <Link
              key={design.slug}
              href={`/producto/${design.slug}`}
              className="overflow-hidden border border-white/10 bg-neutral-950 transition-colors hover:border-sky-300/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
            >
              <ProductImage design={design} variant={fromPrice} />
              <div className="p-4">
                <h3 className="font-semibold text-white">{design.name}</h3>
                <p className="mt-1 text-sm text-neutral-400">{design.description}</p>
                <p className="mt-3 font-medium text-sky-300">
                  Desde {formatPrice(fromPrice.priceCents, fromPrice.currency)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default function Tienda() {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-20 pt-28 sm:px-6">
      <h1 className="mb-2 font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide text-white">
        Nuestra tienda
      </h1>
      <p className="mb-12 text-neutral-400">
        Productos personalizados, impresos y enviados bajo demanda.
      </p>
      <Section id="camisetas" title="Camisetas" category="camiseta" />
      <Section id="fundas" title="Fundas de iPhone" category="funda-iphone" />
    </main>
  );
}
