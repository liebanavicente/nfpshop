"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/i18n";

export default function Lookbook() {
  const { t } = useLocale();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  // Tracks an explicit pause so scrolling back into view doesn't override it.
  const userPaused = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reduced-motion visitors get the poster and the play button instead of autoplay.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      userPaused.current = true;
    }

    // Only play while on screen, so the clip doesn't burn CPU/battery below the fold.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused.current) {
          video.play().catch(() => {});
        } else if (!entry.isIntersecting) {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  }

  return (
    <section aria-labelledby="lookbook-heading" data-parada="lookbook" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="reveal-on-scroll relative mx-auto max-w-5xl" style={{ "--hasta": "rotate(-1deg)" } as React.CSSProperties}>
        <div className="celo relative bg-[var(--tinta)] p-2 shadow-[12px_12px_0_var(--azul)] sm:p-3">
          <div className="relative aspect-video overflow-hidden bg-black">
            <video
              ref={videoRef}
              src="/videos/nfpcommercial.mp4"
              poster="/videos/nfpcommercial-poster.jpg"
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={t("lookbook.videoLabel")}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-7">
              <div className="min-w-0">
                <p className="tira tira-azul text-[11px] tracking-[0.18em] sm:text-xs">
                  {t("lookbook.eyebrow")}
                </p>
                <h2
                  id="lookbook-heading"
                  className="tira mt-1.5 block w-fit text-xl sm:mt-2 sm:text-4xl"
                >
                  {t("lookbook.heading")}
                </h2>
                <Link
                  href="/tienda"
                  className="tira tira-papel group mt-3 hidden items-center gap-1 text-sm sm:inline-flex"
                >
                  {t("lookbook.cta")}
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                    ›
                  </span>
                </Link>
              </div>

              <button
                type="button"
                onClick={toggle}
                aria-label={playing ? t("lookbook.pause") : t("lookbook.play")}
                className="grid h-10 w-10 shrink-0 place-items-center bg-[var(--papel)] text-[var(--tinta)] shadow-[3px_3px_0_var(--tinta)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none sm:h-11 sm:w-11"
              >
                {playing ? (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-4 w-4" aria-hidden="true">
                    <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
