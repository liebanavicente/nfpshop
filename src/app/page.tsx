import Hero from "@/app/components/landing/hero";
import Collections from "@/app/components/landing/collections";
import ProductsPreview from "@/app/components/landing/products-preview";
import Music from "@/app/components/landing/music";
import ShippingReturns from "@/app/components/landing/shipping-returns";

export default function Home() {
  return (
    <main>
      <Hero />
      <Collections />
      <ProductsPreview />
      <Music />
      <ShippingReturns />
    </main>
  );
}
