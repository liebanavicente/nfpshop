const TEE_PATH =
  "M70,14 L30,34 L8,72 L34,90 L46,78 L46,186 L154,186 L154,78 L166,90 L192,72 L170,34 L130,14 Q100,32 70,14 Z";

export function TshirtMockup({
  imageUrl,
  color,
}: {
  imageUrl: string;
  color: "white" | "black";
}) {
  const fill = color === "white" ? "#f5f5f5" : "#18181b";
  const stroke = color === "white" ? "#d4d4d4" : "#3f3f46";

  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      <path d={TEE_PATH} fill={fill} stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
      <clipPath id={`tee-print-${color}`}>
        <rect x="72" y="72" width="56" height="56" />
      </clipPath>
      <image
        href={imageUrl}
        x="72"
        y="72"
        width="56"
        height="56"
        clipPath={`url(#tee-print-${color})`}
        preserveAspectRatio="xMidYMid slice"
      />
    </svg>
  );
}

export function PhoneMockup({ imageUrl }: { imageUrl: string }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      <defs>
        <clipPath id="phone-case-clip">
          <rect x="62" y="16" width="76" height="168" rx="14" />
        </clipPath>
      </defs>
      <rect
        x="60"
        y="14"
        width="80"
        height="172"
        rx="16"
        fill="#18181b"
        stroke="#3f3f46"
        strokeWidth="2"
      />
      <image
        href={imageUrl}
        x="62"
        y="16"
        width="76"
        height="168"
        clipPath="url(#phone-case-clip)"
        preserveAspectRatio="xMidYMid slice"
      />
      <circle cx="122" cy="28" r="5" fill="#0a0a0a" stroke="#3f3f46" strokeWidth="1" />
    </svg>
  );
}
