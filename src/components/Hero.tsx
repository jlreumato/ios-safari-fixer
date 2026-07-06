import { Phone, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroVideo from "@/assets/hero-video.mp4.asset.json";

const WHATSAPP_URL = "https://wa.me/5582999872509?text=Olá! Gostaria de agendar uma consulta com a Dra. Juliana Leal.";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-br from-[#faf8f5] via-[#f5f0e8] to-[#ebe5db]">
      {/* Subtle ambient glow in lilac/pink tones */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(249_22%_61%/0.08),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_hsl(330_30%_55%/0.06),_transparent_55%)]" />

      {/* Fine decorative lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 119px, rgba(142,130,184,0.10) 119px, rgba(142,130,184,0.10) 120px)`,
        }}
      />

      <div className="relative mx-auto flex min-h-[100dvh] max-w-7xl flex-col items-center justify-center px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        {/* Video card — 2/3 of viewport */}
        <div
          className="relative w-full overflow-hidden rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
          style={{ height: "66dvh" }}
        >
          <video
            src={heroVideo.url}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster=""
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden="true"
          />

          {/* Dark overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0a1a]/85 via-[#0e0a1a]/55 to-[#0e0a1a]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Content over the video */}
          <div className="relative flex h-full flex-col justify-center px-6 py-8 sm:px-10 md:px-14 lg:px-20">
            <div className="max-w-2xl">
              <p className="mb-4 inline-block rounded-full border border-white/20 bg-white/5 -webkit-backdrop-filter backdrop-filter backdrop-blur-sm px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#e7d9b5] opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards]">
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

              <p className="mt-5 max-w-lg text-base leading-relaxed text-white/75 opacity-0 animate-[fadeInUp_0.7s_ease-out_0.45s_forwards] sm:text-lg">
                Dra. Juliana Leal — Especialista em Dor e pós-graduada pela USP-SP. Atendimento humanizado em doenças reumáticas e autoimunes.
              </p>

              <div className="mt-8 flex flex-col items-start gap-4 opacity-0 animate-[fadeInUp_0.7s_ease-out_0.6s_forwards] sm:flex-row sm:items-center">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    className="gap-2 bg-[hsl(var(--whatsapp))] px-8 text-base text-white shadow-lg shadow-[hsl(142_70%_49%/0.25)] hover:bg-[hsl(142_70%_42%)] active:scale-[0.97] transition-all"
                  >
                    <Phone className="h-5 w-5" />
                    Agendar Consulta
                  </Button>
                </a>
                <a
                  href="#sobre"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/10"
                >
                  Conheça a Dra. Juliana
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#sobre"
          className="mt-8 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
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
