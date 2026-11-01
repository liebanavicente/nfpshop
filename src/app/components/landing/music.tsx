"use client";

import Image from "next/image";
import BrandIcon from "@/app/components/brand-icon";
import { useLocale } from "@/lib/i18n";
import { OFFICIAL_SITE, listenLinks } from "@/lib/band";
import { useMusic } from "@/app/components/music-player";

export default function Music() {
  const { t } = useLocale();
  const { isPlaying, playFromUser } = useMusic();

  return (
    // El único bloque de tinta azul a sangre: el disco, con los bordes de papel rasgado.
    <section
      id="musica"
      className="rasgado-arriba rasgado-abajo scroll-mt-24 bg-[var(--azul)] px-4 py-28 text-[var(--papel)] sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="reveal-on-scroll etiqueta-maquina">
              {t("music.eyebrow")}
            </p>
            <h2 className="reveal-on-scroll titular mt-4 text-[clamp(2.2rem,4.4vw,4rem)]">
              <span className="tira">{t("music.heading")}</span>
            </h2>
            <p className="reveal-on-scroll mt-6 max-w-md text-[17px] leading-relaxed">
              {t("music.body")}
            </p>

            <p className="mt-10 etiqueta-maquina text-xs">
              {t("music.listenOn")}
            </p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {listenLinks.map(({ name, icon, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tira tira-papel inline-flex items-center gap-2 px-3 py-2 text-sm normal-case shadow-[3px_3px_0_var(--tinta)] transition-transform duration-100 hover:-translate-y-0.5"
                  >
                    <BrandIcon name={icon} className="h-4 w-4" />
                    {name}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={OFFICIAL_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center gap-1 font-[family-name:var(--font-display)] uppercase tracking-wider underline decoration-2 underline-offset-[6px]"
            >
              {t("music.officialSite")} <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* One player for the whole site (the dock) — a second embed here would play over it. */}
          <div
            className="reveal-on-scroll mx-auto w-full max-w-sm lg:max-w-md"
            style={{ "--hasta": "rotate(2.5deg)" } as React.CSSProperties}
          >
            <div className="celo bg-[var(--papel)] p-3 shadow-[12px_12px_0_var(--tinta)]">
              <Image
                src="/album-dolphins-and-earthquakes.jpg"
                alt="Dolphins and Earthquakes"
                width={640}
                height={640}
                sizes="(min-width: 1024px) 448px, 384px"
                className="h-auto w-full"
              />
            </div>
            <button
              type="button"
              onClick={playFromUser}
              disabled={isPlaying}
              className="mt-8 flex w-full items-center gap-3 bg-[var(--tinta)] py-2.5 pl-2.5 pr-5 font-[family-name:var(--font-display)] uppercase tracking-wider text-[var(--papel)] shadow-[5px_5px_0_var(--azul-hondo)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:cursor-default"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[var(--papel)] text-[var(--tinta)]">
                {isPlaying ? (
                  <span
                    aria-hidden="true"
                    className="flex h-3 items-end gap-[2px]"
                  >
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-full w-[3px] origin-bottom bg-[var(--tinta)]"
                        style={{
                          animation: `eq-bar 900ms ease-in-out ${i * 150}ms infinite alternate`,
                        }}
                      />
                    ))}
                  </span>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    className="ml-0.5 h-4 w-4"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
                  </svg>
                )}
              </span>
              {isPlaying ? t("player.nowPlaying") : t("music.playCta")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
