import type { Metadata } from "next";
import { Geist, Special_Elite } from "next/font/google";
import Navbar from "@/app/components/landing/navbar";
import Footer from "@/app/components/landing/footer";
import { LocaleProvider } from "@/lib/i18n";
import { CartProvider } from "@/lib/cart";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const specialElite = Special_Elite({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "No Flag Patriots — Merch",
  description: "Productos personalizados impresos y enviados bajo demanda.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${specialElite.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <LocaleProvider>
          <CartProvider>
            <Navbar />
            {children}
            <Footer />
          </CartProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
