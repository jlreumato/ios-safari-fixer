import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import VideoMosaic from "@/components/hero/VideoMosaic";
import RollingText from "@/components/ui/RollingText";

const WHATSAPP_URL = "https://wa.me/5582999872509?text=Olá! Gostaria de agendar uma consulta com a Dra. Juliana Leal.";


export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-[#faf7f2]">
      {/* Fundo neutro champagne/branco */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #ffffff 0%, #fbf7ee 45%, #f2e9d8 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 55% at 78% 28%, rgba(231,217,181,0.55) 0%, rgba(231,217,181,0) 70%), radial-gradient(50% 50% at 8% 88%, rgba(142,130,184,0.10) 0%, rgba(142,130,184,0) 70%)",
        }}
      />

      {/* Mosaico de capas em tela cheia */}
      <div className="absolute inset-0 h-full w-full">
        <VideoMosaic />
      </div>

      {/* Conteúdo sobreposto na parte inferior */}
      <div className="pointer-events-none relative z-10 flex min-h-[100dvh] w-full flex-col justify-end pb-10 sm:pb-14">
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%]"
          style={{
            background:
              "linear-gradient(to top, rgba(255,253,248,0.97) 0%, rgba(255,253,248,0.88) 42%, rgba(255,253,248,0) 100%)",
          }}
        />

        <div className="pointer-events-auto relative mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:max-w-6xl">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.28em] text-[#8a6f38] opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards] sm:text-[11px]">
            Reumatologia · Especialista em Dor
          </p>

          <h1
            className="text-balance text-4xl font-normal leading-[1.02] tracking-tight text-[#2a2233] opacity-0 animate-[fadeInUp_0.7s_ease-out_0.25s_forwards] sm:text-5xl lg:whitespace-nowrap lg:text-6xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Viver com <span className="italic text-[#a3813c]">DOR</span> não é NORMAL.
          </h1>

          <p className="mx-auto mt-5 max-w-[42ch] text-sm font-light leading-relaxed text-[#4a4152] opacity-0 animate-[fadeInUp_0.7s_ease-out_0.45s_forwards] sm:text-base">
            Dra. Juliana Leal · CRM/AL 6717 · RQE 4857
            <span className="mt-1 block">Pós-graduada em Dor Crônica pela USP — São Paulo</span>
          </p>
        </div>

        <div className="pointer-events-auto relative mx-auto mt-7 flex flex-col items-center gap-4 px-4 opacity-0 animate-[fadeInUp_0.7s_ease-out_0.6s_forwards] sm:flex-row sm:items-center">
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

        {/* Scroll indicator */}
        <a
          href="#sobre"
          className="pointer-events-auto relative mx-auto mt-6 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#6b6076] transition-colors hover:text-[#2a2233]"
        >
          Role para explorar
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        </a>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(18px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
      `}</style>
    </section>
  );
}
