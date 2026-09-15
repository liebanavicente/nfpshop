function XMark({ x, y, size, rotate = 0 }: { x: number; y: number; size: number; rotate?: number }) {
  const half = size / 2;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <line
        x1={-half}
        y1={-half}
        x2={half}
        y2={half}
        stroke="#e6f4ff"
        strokeWidth={size * 0.22}
        strokeLinecap="round"
      />
      <line
        x1={half}
        y1={-half}
        x2={-half}
        y2={half}
        stroke="#bfe0ff"
        strokeWidth={size * 0.22}
        strokeLinecap="round"
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
