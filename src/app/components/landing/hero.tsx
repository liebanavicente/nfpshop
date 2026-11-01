"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/i18n";

// Portada de fanzine: el nombre en tiras de máquina de escribir pegadas una a una al tempo (187 BPM),
// el vídeo de los ojos del delfín pasado por la fotocopiadora con tinta azul y el sello estampado encima.
// Debajo, una cinta que avanza una palabra por pulso con lo que importa al comprar.
const VALORES = ["onDemand", "oneShipment", "securePay", "euShipping"];

type Estilo = React.CSSProperties & Record<`--${string}`, string | number>;

export default function Hero() {
  const { t } = useLocale();
  const palabras = t("hero.titleLine1").replace(/\.$/, "").split(" ");
  const n = palabras.length;
  const cinta = VALORES.map((k) => t(`valueProps.${k}`));

  return (
    <section className="relative pt-24 sm:pt-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-16 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-6 lg:pb-20">
        <div>
          <p className="golpe etiqueta-maquina text-[var(--azul)]" style={{ "--n": 0 } as Estilo}>
            {t("hero.eyebrow")}
          </p>
          <h1 className="titular mt-5 flex flex-col items-start gap-[0.12em]">
            {palabras.map((p, i) => (
              <span
                key={p + i}
                className="golpe tira"
                style={{ "--n": i + 1, "--hasta": `rotate(${[-1.5, 1, -0.6][i % 3]}deg)`, marginLeft: `${[0, 0.45, 0.15][i % 3]}em` } as Estilo}
              >
                {p}
              </span>
            ))}
            <span
              className="golpe tira tira-azul mt-[0.2em] text-[0.4em]"
              style={{ "--n": n + 1, "--hasta": "rotate(1.5deg)" } as Estilo}
            >
              {t("hero.titleLine2").replace(/\.$/, "")}
            </span>
          </h1>

          <p className="golpe mt-8 max-w-md text-base leading-relaxed sm:text-lg" style={{ "--n": n + 2, "--desde": "translateY(6px)" } as Estilo}>
            {t("hero.subtitle")}
          </p>

          <div className="golpe mt-9 flex flex-wrap items-center gap-x-8 gap-y-5" style={{ "--n": n + 3, "--desde": "translateY(6px)" } as Estilo}>
            <Link href="/tienda" className="boton-tira text-base">
              {t("hero.ctaPrimary")} <span aria-hidden="true">→</span>
            </Link>
            <a
              href="#colecciones"
              className="font-[family-name:var(--font-display)] uppercase tracking-wider underline decoration-2 underline-offset-[6px] hover:text-[var(--azul)]"
            >
              {t("hero.ctaSecondary")}
            </a>
          </div>
        </div>

        {/* el vídeo de la marca, fotocopiado y pegado con celo */}
        <div className="relative mx-auto w-[86%] max-w-[500px] lg:w-full">
          <div
            className="golpe celo xerox aspect-[4/5] shadow-[10px_12px_0_var(--tinta)]"
            style={{ "--n": 2, "--hasta": "rotate(2deg)", "--desde": "rotate(-6deg) scale(1.15)" } as Estilo}
          >
            <video
              aria-hidden="true"
              autoPlay
              muted
              playsInline
              poster="/hero-fashion-poster.png"
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover object-[62%_center]"
            >
              <source src="/videos/nfp-eyes-in-dolphin.mp4" type="video/mp4" />
            </video>
          </div>
          <Image
            src="/products/logo1-black-ink.png"
            alt=""
            width={882}
            height={885}
            priority
            className="estampa sello-tinta absolute -bottom-10 -left-8 w-[38%] sm:-left-14"
            style={{ "--n": n + 2, "--giro": "-14deg" } as Estilo}
          />
          <p
            className="golpe tira tira-papel absolute -right-3 top-6 text-sm sm:-right-6 sm:text-base"
            style={{ "--n": n + 3, "--hasta": "rotate(4deg)" } as Estilo}
          >
            Dolphins &amp; Earthquakes
          </p>
        </div>
      </div>

      <div className="cinta-ritmo -rotate-1">
        <p className="sr-only">{cinta.join(" · ")}</p>
        <div aria-hidden="true">
          {[0, 1].flatMap((r) =>
            [...cinta, ...cinta].map((c, i) => (
              <span key={`${r}-${i}`}>
                {c} <i>✕</i>
              </span>
            )),
          )}
        </div>
      </div>
    </section>
  );
}
