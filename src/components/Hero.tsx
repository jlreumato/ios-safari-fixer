import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import VideoFanCarousel from "@/components/hero/VideoFanCarousel";

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

      {/* Content */}
      <div className="relative mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-center px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-8">
          <div className="max-w-2xl">
            <p className="mb-4 inline-block rounded-full border border-[#b79b62]/40 bg-white/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-[#8a6f38] opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards] sm:text-xs">
              Reumatologista · CRM/AL 6717 · RQE 4857
            </p>

            <h1
              className="text-balance text-4xl font-normal leading-[1.05] tracking-tight text-[#2a2233] opacity-0 animate-[fadeInUp_0.7s_ease-out_0.25s_forwards] sm:text-5xl lg:text-6xl xl:text-7xl"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Humanidade para transformar sua{" "}
              <span className="italic text-[#a3813c]">DOR</span>
              <span> em </span>
              <span className="italic text-[#a3813c]">LIBERDADE!</span>
            </h1>

            <p className="mt-5 max-w-lg text-base font-light leading-relaxed text-[#4a4152] opacity-0 animate-[fadeInUp_0.7s_ease-out_0.45s_forwards] sm:text-lg">
              Dra. Juliana Leal — Especialista em Dor e pós-graduada pela USP-SP. Atendimento humanizado em doenças reumáticas e autoimunes.
            </p>

            <div className="mt-8 flex flex-col items-start gap-4 opacity-0 animate-[fadeInUp_0.7s_ease-out_0.6s_forwards] sm:flex-row sm:items-center">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="btn-champagne btn-glow-ring gap-2 px-8 text-base active:scale-[0.97]"
                >
                  <WhatsAppIcon size={20} />
                  Agendar Consulta
                </Button>
              </a>

              <a
                href="#sobre"
                className="inline-flex items-center gap-2 rounded-full border border-[#2a2233]/25 bg-white/60 px-5 py-2.5 text-base font-medium text-[#2a2233] transition-colors hover:bg-white"
              >
                Conheça a Dra. Juliana
              </a>
            </div>
          </div>

          {/* Fan card carousel de vídeos */}
          <VideoFanCarousel />
        </div>

        {/* Scroll indicator */}
        <a
          href="#sobre"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-base font-medium uppercase tracking-[0.2em] text-[#6b6076] transition-colors hover:text-[#2a2233]"
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
