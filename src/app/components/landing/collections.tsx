import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    href: "/tienda#camisetas",
    label: "Camisetas",
    image: "/products/dolphinflag.png",
    bg: "bg-neutral-900",
  },
  {
    href: "/tienda#fundas",
    label: "Fundas de iPhone",
    image: "/products/case-guitarra.jpg",
    bg: "bg-neutral-950",
  },
];

export default function Collections() {
  return (
    <section id="colecciones" className="scroll-mt-16 bg-black px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="reveal-on-scroll mb-10 font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide text-white sm:text-4xl">
          Colecciones
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {collections.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className={`reveal-on-scroll group relative flex aspect-[4/3] items-end overflow-hidden border border-white/10 ${c.bg} focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300`}
            >
              <Image
                src={c.image}
                alt=""
                fill
                className="object-cover opacity-60 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <span className="relative z-10 p-6 font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide text-white transition-transform duration-200 group-hover:-translate-y-1 sm:text-3xl">
                {c.label} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
