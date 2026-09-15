import Image from "next/image";
import Link from "next/link";
import { designs } from "@/lib/products";

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
    <section id={id} className="mb-12 scroll-mt-20">
      <h2 className="text-xl font-semibold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {items.map((design) => {
          const fromPrice = design.variants[0];
          return (
            <Link
              key={design.slug}
              href={`/producto/${design.slug}`}
              className="group border border-neutral-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-square bg-neutral-100">
                <Image
                  src={fromPrice.imageUrl}
                  alt={design.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{design.name}</h3>
                <p className="text-sm text-neutral-600 mt-1">{design.description}</p>
                <p className="mt-3 font-medium">
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
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Nuestra tienda</h1>
      <p className="text-neutral-600 mb-10">
        Productos personalizados, impresos y enviados bajo demanda.
      </p>
      <Section id="camisetas" title="Camisetas" category="camiseta" />
      <Section id="fundas" title="Fundas de iPhone" category="funda-iphone" />
    </main>
  );
}
