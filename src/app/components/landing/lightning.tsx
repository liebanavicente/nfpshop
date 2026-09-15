export default function Lightning() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-white"
        style={{ animation: "screen-flash 7s ease-in-out infinite" }}
      />
      <svg
        className="absolute left-[8%] top-0 h-2/3 w-auto opacity-90"
        style={{ animation: "bolt-flash 7s linear infinite" }}
        viewBox="0 0 60 200"
        fill="none"
      >
        <path
          d="M32 0 L10 90 L28 90 L4 200 L52 78 L32 78 Z"
          fill="#bfe0ff"
          stroke="#e6f4ff"
          strokeWidth="1"
        />
      </svg>
      <svg
        className="absolute right-[14%] top-0 h-1/2 w-auto opacity-80"
        style={{ animation: "bolt-flash 7s linear infinite", animationDelay: "3.4s" }}
        viewBox="0 0 60 200"
        fill="none"
      >
        <path
          d="M36 0 L14 90 L30 90 L8 200 L54 78 L34 78 Z"
          fill="#bfe0ff"
          stroke="#e6f4ff"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
