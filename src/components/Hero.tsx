import { Phone, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroVideo from "@/assets/hero-video.mp4.asset.json";

const WHATSAPP_URL = "https://wa.me/5582999872509?text=Olá! Gostaria de agendar uma consulta com a Dra. Juliana Leal.";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden">
      {/* Full-viewport video — sits behind the fixed header */}
      <video
        src={heroVideo.url}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />

      {/* Legibility overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0e0a1a]/80 via-[#0e0a1a]/45 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />

      {/* Content over the video */}
      <div className="relative mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-center px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-4 inline-block rounded-full border border-white/25 bg-white/10 -webkit-backdrop-filter backdrop-filter backdrop-blur-md px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.18em] text-[#e7d9b5] opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards]">
            Reumatologista · CRM/AL 6717 · RQE 4857
          </p>

          <h1
            className="text-balance text-4xl font-normal leading-[1.05] tracking-tight text-white opacity-0 animate-[fadeInUp_0.7s_ease-out_0.25s_forwards] sm:text-5xl lg:text-6xl xl:text-7xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Cuidado especializado para quem convive com{" "}
            <span className="italic text-[#e7d9b5]">dores crônicas</span>
            <span className="text-white"> em Maceió.</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/80 opacity-0 animate-[fadeInUp_0.7s_ease-out_0.45s_forwards] sm:text-lg">
            Dra. Juliana Leal — Especialista em Dor e pós-graduada pela USP-SP. Atendimento humanizado em doenças reumáticas e autoimunes.
          </p>

          <div className="mt-8 flex flex-col items-start gap-4 opacity-0 animate-[fadeInUp_0.7s_ease-out_0.6s_forwards] sm:flex-row sm:items-center">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="btn-glow-ring gap-2 border-2 border-[#8e82b8] bg-transparent px-8 text-base text-[#d8d4e8] hover:bg-[#8e82b8]/15 hover:text-white active:scale-[0.97] transition-all"
              >
                <Phone className="h-5 w-5" />
                Agendar Consulta
              </Button>
            </a>

            <a
              href="#sobre"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 -webkit-backdrop-filter backdrop-filter backdrop-blur-sm px-5 py-2.5 text-base font-medium text-white/90 transition-colors hover:bg-white/15"
            >
              Conheça a Dra. Juliana
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#sobre"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
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
