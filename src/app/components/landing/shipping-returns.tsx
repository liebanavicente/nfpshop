const items = [
  {
    title: "Producción bajo demanda",
    body: "Cada pedido se imprime especialmente para ti a través de nuestro partner de producción. Suele necesitar entre 2 y 5 días laborables antes de salir de fábrica.",
  },
  {
    title: "Envío",
    body: "Los plazos varían según el destino — normalmente entre 3 y 10 días laborables adicionales dentro de la Unión Europea. Recibirás un email con el seguimiento en cuanto se despache.",
  },
  {
    title: "Cambios y devoluciones",
    body: "Al ser productos personalizados hechos bajo pedido, no se aceptan devoluciones por cambio de opinión ni por talla. Si tu pedido llega dañado, defectuoso o con un error nuestro, escríbenos dentro de los 14 días siguientes a la entrega y lo solucionamos sin coste.",
  },
];

export default function ShippingReturns() {
  return (
    <section id="envio" className="scroll-mt-16 bg-black px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="reveal-on-scroll mb-10 font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide text-white sm:text-4xl">
          Envío y devoluciones
        </h2>
        <div className="space-y-8">
          {items.map((item) => (
            <div key={item.title} className="reveal-on-scroll border-l-2 border-sky-300/60 pl-5">
              <h3 className="font-[family-name:var(--font-display)] text-lg uppercase tracking-wide text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-neutral-300">{item.body}</p>
            </div>
          ))}
        </div>
        <p className="reveal-on-scroll mt-10 text-sm text-neutral-400">
          ¿Dudas con tu pedido? Escríbenos a{" "}
          <a href="mailto:hola@noflagpatriots.com" className="nav-link text-neutral-300">
            hola@noflagpatriots.com
          </a>
          .
        </p>
      </div>
    </section>
  );
}
