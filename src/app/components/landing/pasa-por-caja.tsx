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
      <div className="mx-auto max-w-4xl">
        <h2 className="reveal-on-scroll titular" style={{ "--hasta": "rotate(-1.5deg)" } as React.CSSProperties}>
          <span className="tira">{t("caja.titulo")}</span>
        </h2>
        <p className="reveal-on-scroll mx-auto mt-7 max-w-xl text-lg">{t("caja.texto")}</p>
        <Link href="/tienda" className="reveal-on-scroll boton-tira mt-10 px-9 text-lg">
          {t("caja.boton")} <span aria-hidden="true">→</span>
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
