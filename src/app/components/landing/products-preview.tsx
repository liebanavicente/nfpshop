import Image from "next/image";
import Link from "next/link";
import { designs } from "@/lib/products";

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency }).format(
    cents / 100,
  );
}

export default function ProductsPreview() {
  const featured = designs.slice(0, 4);
  return (
    <section id="productos" className="scroll-mt-16 bg-neutral-950 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="reveal-on-scroll mb-10 font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide text-white sm:text-4xl">
          Productos
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {featured.map((design) => {
            const variant = design.variants[0];
            return (
              <Link
                key={design.slug}
                href={`/producto/${design.slug}`}
                className="reveal-on-scroll group block border border-white/10 bg-black transition-transform duration-200 ease-out hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
              >
                <div className="relative aspect-square overflow-hidden bg-neutral-900">
                  <Image
                    src={variant.imageUrl}
                    alt={design.name}
                    fill
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <h3 className="truncate text-sm text-white">{design.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-sky-300">
                    {formatPrice(variant.priceCents, variant.currency)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/tienda"
            className="nav-link font-[family-name:var(--font-display)] text-lg uppercase tracking-widest text-white"
          >
            Ver todo →
          </Link>
        </div>
      </div>
    </section>
  );
}
