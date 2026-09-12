import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import heroReel from "@/assets/hero-reel.mp4.asset.json";
import RollingText from "@/components/ui/RollingText";

const WHATSAPP_URL = "https://wa.me/5582999872509?text=Olá! Gostaria de agendar uma consulta com a Dra. Juliana Leal.";

export default function Hero() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (window.scrollY > 8) {
      setRevealed(true);
      return;
    }
    const reveal = () => setRevealed(true);
    window.addEventListener("scroll", reveal, { passive: true });
    window.addEventListener("wheel", reveal, { passive: true });
    window.addEventListener("touchmove", reveal, { passive: true });
    return () => {
      window.removeEventListener("scroll", reveal);
      window.removeEventListener("wheel", reveal);
      window.removeEventListener("touchmove", reveal);
    };
  }, []);

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-[#faf7f2]">
      {/* Vídeo em tela cheia */}
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <video
          className="h-full w-full object-cover"
          src={heroReel.url}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#2a2233]/10" />
      </div>

      {/* Conteúdo sobreposto na parte inferior */}
      <div className="pointer-events-none relative z-10 flex min-h-[100dvh] w-full flex-col justify-end pb-10 sm:pb-14">
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] transition-opacity duration-700"
          style={{
            opacity: revealed ? 1 : 0,
            background:
              "linear-gradient(to top, rgba(255,253,248,0.98) 0%, rgba(255,253,248,0.9) 45%, rgba(255,253,248,0) 100%)",
          }}
        />

        <div
          className="pointer-events-auto relative transition-all duration-[900ms] ease-out"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(48px)",
          }}
        >
          <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:max-w-6xl">
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.28em] text-[#8a6f38] sm:text-[11px]">
              Reumatologia · Especialista em Dor
            </p>

            <h1
              className="text-balance text-4xl font-normal leading-[1.02] tracking-tight text-[#2a2233] sm:text-5xl lg:whitespace-nowrap lg:text-6xl"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Viver com <span className="italic text-[#a3813c]">DOR</span> não é NORMAL.
            </h1>

            <p className="mx-auto mt-5 max-w-[42ch] text-sm font-light leading-relaxed text-[#4a4152] sm:text-base">
              Dra. Juliana Leal · CRM/AL 6717 · RQE 4857
              <span className="mt-1 block">Pós-graduada em Dor Crônica pela USP — São Paulo</span>
            </p>
          </div>

          <div className="mx-auto mt-7 flex flex-col items-center gap-4 px-4 sm:flex-row sm:justify-center">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="btn-champagne btn-glow-ring group gap-2 px-8 text-base active:scale-[0.97]"
              >
                <WhatsAppIcon size={20} />
                <RollingText>Agendar Consulta</RollingText>
              </Button>
            </a>

            <a
              href="#sobre"
              className="group inline-flex items-center gap-2 rounded-sm border border-[#2a2233]/25 bg-white/70 px-6 py-3 text-base font-medium text-[#2a2233] transition-colors hover:bg-white"
            >
              <RollingText>Conheça a Dra. Juliana</RollingText>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#sobre"
          className="pointer-events-auto relative mx-auto mt-6 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#6b6076] transition-colors hover:text-[#2a2233]"
        >
          Role para explorar
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
