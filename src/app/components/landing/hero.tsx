import Image from "next/image";
import EmberCanvas from "@/app/components/landing/ember-canvas";
import Lightning from "@/app/components/landing/lightning";
import LogoImpact from "@/app/components/landing/logo-impact";
import GlitchTitle from "@/app/components/landing/glitch-title";
import CtaButton from "@/app/components/landing/cta-button";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      <Image
        src="/hero-bg.jpg"
        alt=""
        fill
        priority
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_75%)]" />
      <Lightning />
      <EmberCanvas />

      <div className="relative z-10 flex flex-col items-center px-4 py-32">
        <LogoImpact />
        <div className="mt-8">
          <GlitchTitle />
        </div>
        <CtaButton />
      </div>
    </section>
  );
}
