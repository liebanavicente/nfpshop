"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n";

// La camiseta edición limitada del bolo con Not Available (P62, con su consentimiento) no se vende online:
// se pide por email. Va en la portada (después de «En directo») y, en versión compacta, arriba de la tienda.
const EMAIL = "info@noflagpatriots.com";

export default function EdicionLimitada({ compacta = false }: { compacta?: boolean }) {
  const { t } = useLocale();
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(t("edicion.asunto"))}`;

  return (
    <section
      id="edicion"
      className={compacta ? "mb-24 scroll-mt-28" : "scroll-mt-24 px-4 py-24 sm:px-6"}
    >
      <div className={`mx-auto grid max-w-6xl items-center gap-12 ${compacta ? "md:grid-cols-[0.8fr_1fr]" : "md:grid-cols-2 md:gap-16"}`}>
        <div className="reveal-on-scroll" style={{ "--hasta": "rotate(-2.5deg)" } as React.CSSProperties}>
          <div className="celo bg-[#fbf8f1] p-3 shadow-[12px_12px_0_var(--tinta)]">
            <Image
              src="/products/edicion-p62-camiseta.jpg"
              alt="Camiseta blanca edición limitada No Flag Patriots × Not Available, dibujo azul de Joel Abad"
              width={1280}
              height={1280}
              sizes="(min-width: 768px) 45vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
        <div>
          <p className="reveal-on-scroll tira tira-azul text-sm sm:text-base">{t("edicion.etiqueta")}</p>
          <h2 className={`reveal-on-scroll titular mt-5 ${compacta ? "text-[clamp(2rem,5vw,3.5rem)]" : "text-[clamp(2.4rem,6vw,5rem)]"}`}>
            <span className="tira">{t("edicion.titulo")}</span>
          </h2>
          <p className="reveal-on-scroll mt-6 max-w-md text-[17px] leading-relaxed">{t("edicion.texto")}</p>
          <div className="reveal-on-scroll mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href={mailto} className="boton-tira text-base">
              {t("edicion.boton")} <span aria-hidden="true">→</span>
            </a>
            <a href={mailto} className="font-[family-name:var(--font-display)] underline decoration-2 underline-offset-[6px] hover:text-[var(--azul)]">
              {EMAIL}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
