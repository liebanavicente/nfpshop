"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/i18n";
import { useMovimientoReducido } from "@/lib/movimiento-reducido";

// Final de la portada: el carrito del delfín aparca aquí. Con «reducir movimiento» no viaja, así que se pinta aparcado.
export default function PasaPorCaja() {
  const { t } = useLocale();
  const quieto = useMovimientoReducido();
  return (
    <section id="caja" className="scroll-mt-24 px-4 pb-40 pt-24 text-center sm:px-6 sm:pb-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="reveal-on-scroll font-[family-name:var(--font-display)] text-4xl uppercase tracking-wide text-white sm:text-6xl">{t("caja.titulo")}</h2>
        <p className="reveal-on-scroll mx-auto mt-5 max-w-xl text-lg text-neutral-300">{t("caja.texto")}</p>
        <Link href="/tienda" className="reveal-on-scroll mt-9 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-[family-name:var(--font-display)] text-base uppercase tracking-widest text-black transition hover:bg-sky-200">
          {t("caja.boton")} →
        </Link>
        {quieto && (
          <div className="mx-auto mt-10 w-40">
            <Image src="/hero-dolphin-cart.png" alt="" width={1297} height={1199} />
          </div>
        )}
        {/* hueco con la altura del carrito, para que aparque debajo del botón sin taparlo */}
        <div aria-hidden="true" className="caja-aparcamiento mx-auto mt-[clamp(130px,15vw,215px)]" />
      </div>
    </section>
  );
}
