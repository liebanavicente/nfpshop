export default function GlitchTitle() {
  return (
    <div className="text-center">
      <p
        className="mb-2 text-sm tracking-[0.3em] text-neutral-300 sm:text-base"
        style={{ animation: "glitch-in 0.6s cubic-bezier(0.2,0,0,1) 0.15s both" }}
      >
        BIENVENIDOS A LA TIENDA DE MERCH DE
      </p>
      <h1
        className="font-[family-name:var(--font-display)] text-5xl uppercase leading-none text-white sm:text-7xl"
        style={{
          animation: "glitch-in 0.7s cubic-bezier(0.2,0,0,1) 0.3s both",
          textShadow: "3px 0 #ff4d6d, -3px 0 #7dd3fc",
        }}
      >
        No Flag Patriots
      </h1>
    </div>
  );
}
