import Navbar from "@/app/components/landing/navbar";
import Hero from "@/app/components/landing/hero";
import Collections from "@/app/components/landing/collections";
import ProductsPreview from "@/app/components/landing/products-preview";
import ShippingReturns from "@/app/components/landing/shipping-returns";
import Footer from "@/app/components/landing/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Collections />
        <ProductsPreview />
        <ShippingReturns />
      </main>
      <Footer />
    </>
  );
}
