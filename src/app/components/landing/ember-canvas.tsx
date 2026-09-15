"use client";

import { useEffect, useRef } from "react";

interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

const POOL_SIZE = 70;

export default function EmberCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    const embers: Ember[] = Array.from({ length: POOL_SIZE }, () => ({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      life: 0,
      maxLife: 0,
      size: 0,
      hue: 0,
    }));

    function reset(e: Ember, initial: boolean) {
      e.x = Math.random() * width;
      e.y = initial ? Math.random() * height : height + 10;
      e.vx = (Math.random() - 0.5) * 12;
      e.vy = -(20 + Math.random() * 30);
      e.life = 0;
      e.maxLife = 4 + Math.random() * 4;
      e.size = 1 + Math.random() * 2.5;
      e.hue = 18 + Math.random() * 30; // orange -> amber
    }
    embers.forEach((e) => reset(e, true));

    let animId = 0;
    let prevTime = 0;
    let visible = true;

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    function loop(time: number) {
      const dt = Math.min((time - prevTime) / 1000, 0.1);
      prevTime = time;

      if (visible) {
        ctx!.clearRect(0, 0, width, height);
        for (const e of embers) {
          e.life += dt;
          if (e.life >= e.maxLife) {
            reset(e, false);
            continue;
          }
          e.x += e.vx * dt + Math.sin(e.life * 3 + e.x) * 6 * dt;
          e.y += e.vy * dt;

          const lifeRatio = e.life / e.maxLife;
          const alpha = lifeRatio < 0.15
            ? lifeRatio / 0.15
            : 1 - (lifeRatio - 0.15) / 0.85;

          ctx!.beginPath();
          ctx!.fillStyle = `hsla(${e.hue}, 90%, 60%, ${Math.max(alpha, 0) * 0.85})`;
          ctx!.arc(e.x, e.y, e.size, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      animId = requestAnimationFrame(loop);
    }
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full pointer-events-none"
    />
  );
}
