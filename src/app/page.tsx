import Hero from "@/app/components/landing/hero";
import Collections from "@/app/components/landing/collections";
import ProductsPreview from "@/app/components/landing/products-preview";
import ShippingReturns from "@/app/components/landing/shipping-returns";

export default function Home() {
  return (
    <main>
      <Hero />
      <Collections />
      <ProductsPreview />
      <ShippingReturns />
    </main>
  );
}
