import Image from "next/image";

const STAMP = { src: "/products/logo1-white-ink.png", w: 880, h: 885 };
const BANNER = { src: "/products/logoclassic-black-shirt.png", w: 640, h: 327 };

// Hand-placed so the logos read as scattered, not tiled. Sizes use max() so
// they stay legible on phones where vw alone would make them specks.
const logos = [
  { img: STAMP, pos: "left-[-4%] top-[6%]", size: "w-[max(22vw,150px)]", rotate: -14, blur: 3, opacity: 0.1, float: 0 },
  { img: BANNER, pos: "right-[-6%] top-[14%]", size: "w-[max(30vw,220px)]", rotate: 9, blur: 4, opacity: 0.09, float: 1 },
  { img: BANNER, pos: "left-[4%] top-[52%]", size: "w-[max(24vw,180px)]", rotate: -7, blur: 6, opacity: 0.07, float: 2 },
  { img: STAMP, pos: "right-[8%] top-[46%]", size: "w-[max(16vw,120px)]", rotate: 16, blur: 2, opacity: 0.1, float: 0 },
  { img: STAMP, pos: "left-[30%] bottom-[-8%]", size: "w-[max(26vw,180px)]", rotate: 8, blur: 7, opacity: 0.06, float: 1 },
  { img: BANNER, pos: "right-[-4%] bottom-[4%]", size: "w-[max(22vw,160px)]", rotate: -11, blur: 3, opacity: 0.08, float: 2 },
  { img: STAMP, pos: "left-[46%] top-[22%]", size: "w-[max(10vw,80px)]", rotate: -22, blur: 9, opacity: 0.05, float: 0 },
];

const floats = [
  "logo-float-a 22s ease-in-out infinite",
  "logo-float-b 28s ease-in-out infinite",
  "logo-float-a 34s ease-in-out infinite reverse",
];

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

      {logos.map(({ img, pos, size, rotate, blur, opacity, float }, i) => (
        <div key={i} className={`absolute ${pos} ${size}`} style={{ animation: floats[float] }}>
          <Image
            src={img.src}
            alt=""
            width={img.w}
            height={img.h}
            sizes="30vw"
            className="h-auto w-full"
            style={{ transform: `rotate(${rotate}deg)`, filter: `blur(${blur}px)`, opacity }}
          />
        </div>
      ))}

      <div className="grain absolute inset-0" />
    </div>
  );
}
