"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/i18n";
import { SPOTIFY_ALBUM_ID } from "@/lib/band";

// Minimal typing for Spotify's iFrame API:
// https://developer.spotify.com/documentation/embeds/references/iframe-api
type PlaybackUpdate = { isPaused: boolean; isBuffering: boolean; position: number; duration: number };
type Controller = {
  play(): void;
  pause(): void;
  togglePlay(): void;
  destroy(): void;
  addListener(event: "ready", cb: () => void): void;
  addListener(event: "playback_update", cb: (e: { data: PlaybackUpdate }) => void): void;
};
type IFrameAPI = {
  createController(
    el: HTMLElement,
    options: { uri: string; width?: number | string; height?: number },
    cb: (controller: Controller) => void,
  ): void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: IFrameAPI) => void;
  }
}

let apiPromise: Promise<IFrameAPI> | null = null;
function loadSpotifyApi() {
  if (!apiPromise) {
    apiPromise = new Promise((resolve) => {
      window.onSpotifyIframeApiReady = resolve;
      const script = document.createElement("script");
      script.src = "https://open.spotify.com/embed/iframe-api/v1";
      script.async = true;
      document.body.appendChild(script);
    });
  }
  return apiPromise;
}

const OPT_OUT_KEY = "nfp-music-off";

interface MusicContextValue {
  isPlaying: boolean;
  /** Plays from an explicit user action (e.g. a play button) — also undoes a previous close. */
  playFromUser: () => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}

function Equalizer({ active }: { active: boolean }) {
  return (
    <span aria-hidden="true" className="flex h-3.5 items-end gap-[2px]">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-full w-[3px] origin-bottom rounded-full bg-sky-300"
          style={{
            transform: active ? undefined : "scaleY(0.3)",
            animation: active ? `eq-bar 900ms ease-in-out ${i * 150}ms infinite alternate` : "none",
          }}
        />
      ))}
    </span>
  );
}

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const { t } = useLocale();
  const hostRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<Controller | null>(null);
  const wantPlayRef = useRef(false);
  const dismissedRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const setDismissedBoth = useCallback((value: boolean) => {
    dismissedRef.current = value;
    setDismissed(value);
  }, []);

  // Create the Spotify embed once for the whole session. The API replaces the element it
  // is given, so it gets a throwaway child rather than a React-managed node.
  useEffect(() => {
    const container = hostRef.current;
    if (!container) return;
    let cancelled = false;
    let controller: Controller | null = null;

    loadSpotifyApi().then((api) => {
      if (cancelled) return;
      const el = document.createElement("div");
      container.appendChild(el);
      api.createController(el, { uri: `spotify:album:${SPOTIFY_ALBUM_ID}`, width: "100%", height: 80 }, (c) => {
        if (cancelled) {
          c.destroy();
          return;
        }
        controller = c;
        controllerRef.current = c;
        c.addListener("ready", () => {
          if (wantPlayRef.current && !dismissedRef.current) c.play();
        });
        c.addListener("playback_update", (e) => setIsPlaying(!e.data.isPaused));
      });
    });

    return () => {
      cancelled = true;
      controller?.destroy();
      controllerRef.current = null;
      container.replaceChildren();
    };
  }, []);

  // Browsers block audio until the visitor interacts with the page, so the record starts
  // on the first click, tap or key press anywhere — unless they closed the player before.
  useEffect(() => {
    let optedOut = false;
    try {
      optedOut = localStorage.getItem(OPT_OUT_KEY) === "1";
    } catch {
      // storage unavailable — treat as not opted out
    }
    if (optedOut) {
      setDismissedBoth(true);
      return;
    }

    function onFirstInteraction(e: Event) {
      if (dismissedRef.current) return stop();
      // Interacting with the dock itself (minimize/close) shouldn't count as "play".
      if (dockRef.current?.contains(e.target as Node)) return;
      wantPlayRef.current = true;
      controllerRef.current?.play();
      stop();
    }
    function stop() {
      document.removeEventListener("pointerdown", onFirstInteraction, true);
      document.removeEventListener("keydown", onFirstInteraction, true);
    }
    document.addEventListener("pointerdown", onFirstInteraction, true);
    document.addEventListener("keydown", onFirstInteraction, true);
    return stop;
  }, [setDismissedBoth]);

  const playFromUser = useCallback(() => {
    try {
      localStorage.removeItem(OPT_OUT_KEY);
    } catch {
      // ignore
    }
    setDismissedBoth(false);
    setMinimized(false);
    wantPlayRef.current = true;
    controllerRef.current?.play();
  }, [setDismissedBoth]);

  function close() {
    controllerRef.current?.pause();
    try {
      localStorage.setItem(OPT_OUT_KEY, "1");
    } catch {
      // ignore
    }
    setDismissedBoth(true);
  }

  const iconButton =
    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300";

  return (
    <MusicContext.Provider value={{ isPlaying, playFromUser }}>
      {children}
      {/* Room to scroll the page's last content out from under the dock. */}
      {!dismissed && <div aria-hidden="true" className={minimized ? "h-20" : "h-36"} />}

      <div
        ref={dockRef}
        role="region"
        aria-label={t("music.playerTitle")}
        // Kept mounted when closed so the embed (and its loaded state) survives a reopen.
        className={`glass-strong fixed bottom-3 right-3 z-40 w-[calc(100%-1.5rem)] rounded-2xl transition-[opacity,transform,visibility] duration-300 sm:bottom-5 sm:right-5 sm:w-[360px] ${
          dismissed ? "invisible translate-y-4 opacity-0" : "visible translate-y-0 opacity-100"
        }`}
      >
        <div className="flex items-center gap-2 py-1.5 pl-3.5 pr-1.5">
          <Equalizer active={isPlaying} />
          <p className="min-w-0 flex-1 truncate text-xs text-neutral-300">
            <span className="text-neutral-400">{isPlaying ? t("player.nowPlaying") : t("player.paused")} · </span>
            <span className="text-white">Dolphins and Earthquakes</span>
          </p>
          {minimized && (
            <button
              type="button"
              onClick={() => controllerRef.current?.togglePlay()}
              aria-label={isPlaying ? t("player.pause") : t("player.play")}
              className={iconButton}
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
                </svg>
              )}
            </button>
          )}
          <button
            type="button"
            onClick={() => setMinimized((v) => !v)}
            aria-label={minimized ? t("player.expand") : t("player.minimize")}
            aria-expanded={!minimized}
            className={iconButton}
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-4 w-4 transition-transform duration-300 ${minimized ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" onClick={close} aria-label={t("player.close")} className={iconButton}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Collapsed with grid rows rather than unmounted, so playback keeps going while minimized. */}
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
            minimized ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div ref={hostRef} className="px-1.5 pb-1.5 [&_iframe]:block [&_iframe]:rounded-xl" />
          </div>
        </div>
      </div>
    </MusicContext.Provider>
  );
}
