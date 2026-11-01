"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n";

// «En directo»: el merch puesto, en el bolo del Paral·lel 62 (fotos de @lanave.rec, con permiso de la banda).
// Las fotos van fotocopiadas en blanco y negro y pegadas como un collage que se monta foto a foto.
const FOTOS = [
  { src: "/directo/bolo-1.jpg", alt: "Camisetas de No Flag Patriots en la mesa de merch", giro: -3, clase: "md:col-span-5" },
  { src: "/directo/bolo-3.jpg", alt: "No Flag Patriots tocando con la camiseta de la banda", giro: 2, clase: "md:col-span-4 md:col-start-6 md:mt-10" },
  { src: "/directo/bolo-2.jpg", alt: "Pegatinas XXX No Flag Patriots", giro: -1.5, clase: "md:col-span-3 md:col-start-10 md:-mt-4" },
  { src: "/directo/bolo-4.jpg", alt: "No Flag Patriots en directo, con la camiseta negra", giro: 3, clase: "md:col-span-4 md:col-start-4 md:-mt-24" },
];

export default function Directo() {
  const { t } = useLocale();
  return (
    <section id="directo" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="reveal-on-scroll etiqueta-maquina text-[var(--azul)]">{t("directo.etiqueta")}</p>
        <h2 className="reveal-on-scroll titular mt-3">
          <span className="tira">{t("directo.titulo")}</span>
        </h2>
        <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-12 md:gap-6">
          {FOTOS.map((f) => (
            <figure
              key={f.src}
              className={`reveal-on-scroll directo-foto ${f.clase}`}
              style={{ "--hasta": `rotate(${f.giro}deg)` } as React.CSSProperties}
            >
              <div className="xerox-negro relative">
                <Image src={f.src} alt={f.alt} width={900} height={900} sizes="(min-width: 768px) 40vw, 50vw" className="aspect-square w-full object-cover" />
              </div>
            </figure>
          ))}
        </div>
        <p className="mt-8 font-[family-name:var(--font-display)] text-sm">{t("directo.credito")}</p>
      </div>
    </section>
  );
}
