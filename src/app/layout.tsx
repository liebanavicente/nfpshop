import type { Metadata } from "next";
import { IBM_Plex_Mono, Special_Elite } from "next/font/google";
import Navbar from "@/app/components/landing/navbar";
import Footer from "@/app/components/landing/footer";
import AmbientBackground from "@/app/components/ambient-background";
import { LocaleProvider } from "@/lib/i18n";
import { CartProvider } from "@/lib/cart";
import { MusicProvider } from "@/app/components/music-player";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const bodyMono = IBM_Plex_Mono({
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const specialElite = Special_Elite({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const title = "No Flag Patriots — Merch oficial";
const description =
  "Camisetas y fundas con el arte de Dolphins and Earthquakes, el nuevo disco de No Flag Patriots. Impresas bajo pedido.";

// The share image itself comes from app/opengraph-image.jpg (file-based metadata wins
// over config); X falls back to it when there is no twitter:image.
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: "No Flag Patriots",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${bodyMono.variable} ${specialElite.variable} h-full antialiased`}
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
