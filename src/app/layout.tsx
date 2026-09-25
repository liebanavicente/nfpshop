import type { Metadata } from "next";
import { Geist, Special_Elite } from "next/font/google";
import Navbar from "@/app/components/landing/navbar";
import Footer from "@/app/components/landing/footer";
import AmbientBackground from "@/app/components/ambient-background";
import { LocaleProvider } from "@/lib/i18n";
import { CartProvider } from "@/lib/cart";
import { MusicProvider } from "@/app/components/music-player";
import { getSiteUrl } from "@/lib/site-url";
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
  metadataBase: new URL(getSiteUrl()),
  title: "No Flag Patriots — Merch",
  description: "Merchandising de nuestra banda, NFP.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${specialElite.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <AmbientBackground />
        <LocaleProvider>
          <CartProvider>
            <MusicProvider>
              <Navbar />
              {children}
              <Footer />
            </MusicProvider>
          </CartProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
