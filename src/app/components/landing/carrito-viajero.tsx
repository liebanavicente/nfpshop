"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/i18n";
import { useMovimientoReducido } from "@/lib/movimiento-reducido";

// El delfín hace la compra: el carrito de la portada del disco baja contigo por la página.
// Rueda de una sección a otra (cada sección es una «parada» a la izquierda o a la derecha), en cada parada dice algo
// en un bocadillo, en «Productos» las camisetas vuelan dentro del carrito y al final aparca en «¿Pasas por caja?».
// Todo sale de la posición del scroll; con «reducir movimiento» no viaja y espera aparcado en la caja.

type Parada = { selector: string; clave: string; x: number };

const PARADAS: Parada[] = [
  { selector: "[data-parada='lookbook']", clave: "lookbook", x: 0.78 },
  { selector: "#directo", clave: "directo", x: 0.12 },
  { selector: "#colecciones", clave: "colecciones", x: 0.78 },
  { selector: "#productos", clave: "productos", x: 0.12 },
  { selector: "#musica", clave: "musica", x: 0.78 },
  { selector: "#envio", clave: "envio", x: 0.12 },
  { selector: "#caja", clave: "", x: 0.5 },
];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const suave = (u: number) => u * u * (3 - 2 * u);

export default function CarritoViajero() {
  const { t } = useLocale();
  const caja = useRef<HTMLDivElement>(null);
  const carro = useRef<HTMLDivElement>(null);
  const [bocadillo, setBocadillo] = useState("");
  const [cosas, setCosas] = useState(0);
  const quieto = useMovimientoReducido();

  useEffect(() => {
    if (quieto) return;
    const el = caja.current!, cr = carro.current!;
    let anclas: number[] = [], inicio = 0, raf = 0, xPrevio = -1, mira = 1, recogido = false;

    const medir = () => {
      anclas = PARADAS.map((p) => {
        const s = document.querySelector<HTMLElement>(p.selector);
        if (!s) return NaN;
        const r = s.getBoundingClientRect();
        const top = r.top + window.scrollY;
        // la parada «llega» cuando la sección está centrada (la caja, cuando su botón queda a la vista)
        return p.clave ? top + r.height / 2 - innerHeight / 2 : top + r.height - innerHeight;
      });
      const primera = anclas.find((a) => !Number.isNaN(a)) ?? 0;
      inicio = primera - innerHeight * 0.75;
    };

    // Las camisetas de «Productos» vuelan al carrito (una vez)
    const recoger = () => {
      recogido = true;
      const imgs = Array.from(document.querySelectorAll<HTMLImageElement>("#productos img")).slice(0, 4);
      const destino = cr.getBoundingClientRect();
      imgs.forEach((img, i) => {
        const r = img.getBoundingClientRect();
        const c = img.cloneNode() as HTMLImageElement;
        Object.assign(c.style, { position: "fixed", left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px`, zIndex: "45", pointerEvents: "none", borderRadius: "4px", objectFit: "cover" });
        document.body.appendChild(c);
        const dx = destino.left + destino.width * 0.45 - (r.left + r.width / 2);
        const dy = destino.top + destino.height * 0.35 - (r.top + r.height / 2);
        c.animate(
          [
            { transform: "translate(0,0) scale(1) rotate(0deg)", opacity: 1 },
            { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 160}px) scale(0.55) rotate(${i % 2 ? 160 : -160}deg)`, opacity: 1, offset: 0.55 },
            { transform: `translate(${dx}px, ${dy}px) scale(0.12) rotate(${i % 2 ? 340 : -340}deg)`, opacity: 0.9 },
          ],
          { duration: 900, delay: i * 260, easing: "cubic-bezier(.45,0,.55,1)", fill: "forwards" },
        ).finished.then(() => {
          c.remove();
          setCosas((n) => n + 1);
          cr.animate([{ transform: "translateY(0)" }, { transform: "translateY(6px)" }, { transform: "translateY(0)" }], { duration: 220 });
        });
      });
    };

    const pinta = () => {
      raf = 0;
      const y = window.scrollY, w = window.innerWidth, movil = w < 640;
      // en escritorio, el reproductor ocupa la esquina derecha: el carrito no pasa por encima
      const xMax = movil ? 1 : (w - 400) / w;
      const ancho = cr.offsetWidth;
      let x: number, texto = "";
      const validas = anclas.map((a, i) => ({ a, i })).filter((p) => !Number.isNaN(p.a));
      if (!validas.length) return;
      if (y < inicio) {
        el.style.opacity = "0";
        return;
      }
      el.style.opacity = "1";
      // Cada tramo entre dos paradas: el primer cuarto sigue parado (y hablando) en la de salida, el último cuarto ya
      // está parado en la de llegada, y en medio rueda. Así el bocadillo sale tanto al llegar como al irse.
      let parada = -1, subida = 0, centrado = 0;
      if (y < validas[0].a) {
        const u = clamp((y - inicio) / (validas[0].a - inicio));
        x = -0.25 + (PARADAS[validas[0].i].x + 0.25) * suave(clamp(u / 0.75));
        if (u > 0.75) parada = validas[0].i;
      } else {
        let k = validas.length - 1;
        for (let j = 0; j < validas.length - 1; j++) if (y < validas[j + 1].a) { k = j; break; }
        const a = validas[k], b = validas[Math.min(k + 1, validas.length - 1)];
        const u = k === validas.length - 1 ? 0 : clamp((y - a.a) / (b.a - a.a || 1));
        const v = suave(clamp((u - 0.25) / 0.5));
        x = PARADAS[a.i].x + (PARADAS[b.i].x - PARADAS[a.i].x) * v;
        parada = u < 0.25 ? a.i : u > 0.75 ? b.i : -1;
        // último tramo: sube desde el suelo de la pantalla hasta la línea de aparcamiento de la caja y se queda ahí
        const final = k === validas.length - 1 ? 1 : b.i === PARADAS.length - 1 ? v : 0;
        const plaza = document.querySelector<HTMLElement>(".caja-aparcamiento");
        if (final > 0 && plaza) {
          const suelo = el.getBoundingClientRect().top;
          subida = (plaza.getBoundingClientRect().bottom - suelo) * final;
          centrado = final;
        }
      }
      if (parada >= 0) {
        texto = PARADAS[parada].clave;
        if (texto === "productos" && !recogido) recoger();
      }
      const xs = clamp(x, -0.3, 1) * (x > 0 ? xMax : 1);
      const pxRuta = xs * w - (xs > 0.5 ? ancho : 0);
      // en la caja aparca centrado (ahí el reproductor ya no estorba)
      const px = pxRuta + (w / 2 - ancho / 2 - pxRuta) * centrado;
      if (xPrevio >= 0 && Math.abs(px - xPrevio) > 0.5) mira = px > xPrevio ? -1 : 1;
      const rueda = Math.sin(px / 14) * 2.2 * Math.min(1, Math.abs(px - xPrevio) / 3);
      const inclina = clamp((px - xPrevio) * 0.35, -6, 6);
      xPrevio = px;
      cr.style.transform = `translate(${px}px, ${rueda + subida}px) rotate(${inclina * 0.5}deg)`;
      // solo se voltea el dibujo: el bocadillo y el contador se tienen que poder leer
      const dibujo = cr.querySelector("img");
      if (dibujo) dibujo.style.transform = `scaleX(${mira})`;
      cr.dataset.lado = px > w / 2 ? "derecha" : "izquierda";
      setBocadillo(texto);
    };
    const pedir = () => { if (!raf) raf = requestAnimationFrame(pinta); };

    medir();
    pedir();
    const ro = new ResizeObserver(() => { medir(); pedir(); });
    ro.observe(document.body);
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
      cancelAnimationFrame(raf);
    };
  }, [quieto]);

  if (quieto) return null; // aparcado en la caja (lo pinta PasaPorCaja)

  return (
    <div ref={caja} aria-hidden="true" className="carrito-viajero" style={{ opacity: 0 }}>
      <div ref={carro} className="carrito-viajero-carro">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero-dolphin-cart.png" alt="" draggable={false} />
        {cosas > 0 && <span className="carrito-viajero-cuenta">{cosas}</span>}
        <p className={`carrito-viajero-bocadillo ${bocadillo ? "visible" : ""}`}>{bocadillo ? t(`delfin.${bocadillo}`) : ""}</p>
      </div>
    </div>
  );
}
