import Link from "next/link";

const sparks = [
  { x: 30, y: -22 },
  { x: -28, y: -18 },
  { x: 24, y: 20 },
  { x: -22, y: 24 },
  { x: 0, y: -32 },
  { x: 34, y: 4 },
];

export default function CtaButton() {
  return (
    <Link
      href="/tienda"
      className="cta group relative mt-8 inline-flex items-center gap-3 border-2 border-white px-8 py-4 font-[family-name:var(--font-display)] text-xl uppercase tracking-widest text-white transition-colors duration-200 hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300"
    >
      <span className="relative z-10">Entrar</span>
      <span aria-hidden="true" className="relative z-10 transition-transform duration-200 group-hover:translate-x-1">
        →
      </span>
      {sparks.map((s, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="cta-spark"
          style={
            {
              "--spark-x": `${s.x}px`,
              "--spark-y": `${s.y}px`,
              animationDelay: `${i * 30}ms`,
            } as React.CSSProperties
          }
        />
      ))}
    </Link>
  );
}
