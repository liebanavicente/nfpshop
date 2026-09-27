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
    <section aria-labelledby="lookbook-heading" className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="reveal-on-scroll relative mx-auto max-w-5xl">
        <div
          aria-hidden="true"
          className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.22)_0%,rgba(30,58,138,0.18)_45%,transparent_72%)] blur-2xl"
        />

        <div className="punk-card glass relative overflow-hidden p-1.5 sm:p-2">
          <div className="relative aspect-video overflow-hidden bg-neutral-950">
            <video
              ref={videoRef}
              src="/videos/nfpgrok.mp4"
              poster="/videos/nfpgrok-poster.jpg"
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={t("lookbook.videoLabel")}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              className="h-full w-full object-cover"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-7">
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-sky-300 sm:text-xs">
                  {t("lookbook.eyebrow")}
                </p>
                <h2
                  id="lookbook-heading"
                  className="mt-1.5 font-[family-name:var(--font-display)] text-xl uppercase tracking-wide text-white sm:mt-2 sm:text-3xl"
                >
                  {t("lookbook.heading")}
                </h2>
                <Link
                  href="/tienda"
                  className="group mt-3 hidden items-center gap-1 text-sm font-medium text-white/90 transition-colors hover:text-sky-200 sm:inline-flex"
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
                className="glass-strong grid h-10 w-10 shrink-0 place-items-center rounded-full text-white transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 sm:h-11 sm:w-11"
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
