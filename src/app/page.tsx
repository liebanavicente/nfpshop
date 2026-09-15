import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Nuestra tienda</h1>
      <p className="text-neutral-600 mb-10">
        Productos personalizados, impresos y enviados bajo demanda.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/producto/${product.id}`}
            className="group border border-neutral-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-square bg-neutral-100">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="font-semibold">{product.name}</h2>
              <p className="text-sm text-neutral-600 mt-1">
                {product.description}
              </p>
              <p className="mt-3 font-medium">
                {formatPrice(product.priceCents, product.currency)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
