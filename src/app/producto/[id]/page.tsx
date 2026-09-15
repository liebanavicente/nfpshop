import Image from "next/image";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products";
import Checkout from "@/app/components/checkout";

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="relative aspect-square bg-neutral-100 rounded-lg overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-neutral-600 mt-2">{product.description}</p>
        <p className="text-xl font-semibold mt-4">
          {formatPrice(product.priceCents, product.currency)}
        </p>
        <div className="mt-8">
          <Checkout productId={product.id} />
        </div>
      </div>
    </main>
  );
}
