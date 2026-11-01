"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n";

// «En directo»: el merch puesto, en el bolo del Paral·lel 62 (fotos de @lanave.rec, con permiso de la banda).
const FOTOS = [
  { src: "/directo/bolo-1.jpg", alt: "Camisetas de No Flag Patriots en la mesa de merch", giro: "-rotate-2" },
  { src: "/directo/bolo-2.jpg", alt: "Pegatinas XXX No Flag Patriots", giro: "rotate-1" },
  { src: "/directo/bolo-3.jpg", alt: "No Flag Patriots tocando con la camiseta de la banda", giro: "rotate-2" },
  { src: "/directo/bolo-4.jpg", alt: "No Flag Patriots en directo, con la camiseta negra", giro: "-rotate-1" },
];

export default function Directo() {
  const { t } = useLocale();
  return (
    <section id="directo" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="reveal-on-scroll font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.3em] text-sky-300">{t("directo.etiqueta")}</p>
        <h2 className="reveal-on-scroll mb-10 mt-2 font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide text-white sm:text-4xl">{t("directo.titulo")}</h2>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {FOTOS.map((f) => (
            <figure key={f.src} className={`reveal-on-scroll directo-foto ${f.giro}`}>
              <Image src={f.src} alt={f.alt} width={700} height={700} sizes="(min-width: 768px) 25vw, 50vw" className="aspect-square w-full object-cover" />
            </figure>
          ))}
        </div>
        <p className="mt-6 text-sm text-neutral-400">{t("directo.credito")}</p>
      </div>
    </section>
  );
}
