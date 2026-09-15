"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function LogoImpact() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;

    const canHover = window.matchMedia("(hover: hover)").matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!canHover || prefersReduced) return;

    function handleMove(e: MouseEvent) {
      const rect = wrap!.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      img!.style.transform = `rotateY(${px * 14}deg) rotateX(${-py * 14}deg)`;
    }
    function handleLeave() {
      img!.style.transform = "rotateY(0deg) rotateX(0deg)";
    }

    wrap.addEventListener("mousemove", handleMove);
    wrap.addEventListener("mouseleave", handleLeave);
    return () => {
      wrap.removeEventListener("mousemove", handleMove);
      wrap.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto flex h-48 w-48 items-center justify-center sm:h-60 sm:w-60"
      style={{ perspective: "600px" }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border-2 border-sky-300/70"
        style={{ animation: "shockwave 1.4s ease-out 0.3s both" }}
      />
      <div
        ref={imgRef}
        className="relative h-full w-full rounded-full transition-transform duration-200 ease-out"
        style={{
          animation:
            "stamp-impact 0.7s cubic-bezier(0.2,0,0,1) both, glow-pulse 3s ease-in-out 0.7s infinite",
          transformStyle: "preserve-3d",
        }}
      >
        <Image
          src="/products/logo1-white-ink.png"
          alt="No Flag Patriots"
          fill
          priority
          className="object-contain"
          sizes="240px"
        />
      </div>
    </div>
  );
}
