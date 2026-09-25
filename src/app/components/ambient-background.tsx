export default function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#07080c]">
      <div
        className="ambient-orb left-[-10%] top-[-10%] h-[55vw] w-[55vw] bg-[#1e3a8a] opacity-45"
        style={{ animation: "orb-drift-a 28s ease-in-out infinite" }}
      />
      <div
        className="ambient-orb bottom-[-15%] right-[-10%] h-[50vw] w-[50vw] bg-[#0ea5e9] opacity-25"
        style={{ animation: "orb-drift-b 34s ease-in-out infinite" }}
      />
      <div
        className="ambient-orb left-[40%] top-[45%] h-[28vw] w-[28vw] bg-[#ff4d6d] opacity-[0.12]"
        style={{ animation: "orb-drift-a 40s ease-in-out infinite reverse" }}
      />
      <div className="grain absolute inset-0" />
    </div>
  );
}
