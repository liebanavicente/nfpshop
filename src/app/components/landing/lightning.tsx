// Hand-jittered points so each arm reads as a rough, broken brush stroke
// (like the XXX marks in the band's logo) instead of a clean geometric line.
const ARM_A = "-17,-16 -11,-12 -13,-7 -5,-3 -1,2 6,6 4,11 17,17";
const ARM_B = "17,-17 10,-13 13,-8 4,-4 1,1 -6,7 -3,12 -17,16";

function XMark({ x, y, size, rotate = 0 }: { x: number; y: number; size: number; rotate?: number }) {
  const scale = size / 34;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <polyline
        points={ARM_A}
        fill="none"
        stroke="#e6f4ff"
        strokeWidth={7.5}
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeDasharray="9 2.5 6 3 8"
      />
      <polyline
        points={ARM_B}
        fill="none"
        stroke="#bfe0ff"
        strokeWidth={7.5}
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeDasharray="7 3 10 2 5"
      />
    </g>
  );
}

function XxxBolt({ className, delay }: { className: string; delay?: string }) {
  return (
    <svg
      className={className}
      style={{ animation: "bolt-flash 7s linear infinite", animationDelay: delay }}
      viewBox="0 0 60 220"
      fill="none"
    >
      <XMark x={22} y={30} size={34} rotate={-8} />
      <XMark x={38} y={104} size={34} rotate={6} />
      <XMark x={20} y={178} size={34} rotate={-4} />
    </svg>
  );
}

export default function Lightning() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-white"
        style={{ animation: "screen-flash 7s ease-in-out infinite" }}
      />
      <XxxBolt className="absolute left-[8%] top-0 h-2/3 w-auto opacity-90" />
      <XxxBolt
        className="absolute right-[14%] top-0 h-1/2 w-auto opacity-80"
        delay="3.4s"
      />
    </div>
  );
}
