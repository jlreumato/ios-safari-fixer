import { Phone, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const WHATSAPP_URL = "https://wa.me/5582999872509?text=Olá! Gostaria de agendar uma consulta com a Dra. Juliana Leal.";

export default function Hero() {
  return (
    <section
      className="relative min-h-[100dvh] overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Subtle overlay for text contrast on mobile */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/70 via-white/30 to-transparent lg:from-white/40 lg:via-transparent" />

      <div className="relative mx-auto flex max-w-7xl items-center px-4 pt-28 pb-16 sm:px-6 lg:px-8 lg:min-h-[100dvh]">
        <div className="max-w-xl text-center lg:text-left">
          <p className="mb-3 inline-block rounded-full bg-white/70 -webkit-backdrop-filter backdrop-filter backdrop-blur-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards]">
            CRM/AL: 6717 · RQE: 4857
          </p>

          <h1
            className="text-balance text-4xl font-normal leading-[1.1] tracking-tight text-foreground opacity-0 animate-[fadeInUp_0.7s_ease-out_0.25s_forwards] sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Dra. <span className="uppercase">Juliana Leal</span>
          </h1>

          <p className="mt-3 text-lg font-medium text-primary opacity-0 animate-[fadeInUp_0.7s_ease-out_0.4s_forwards] sm:text-xl">
            Reumatologista em Maceió — AL
          </p>

          <p className="mt-2 text-sm font-medium tracking-wide text-muted-foreground opacity-0 animate-[fadeInUp_0.7s_ease-out_0.5s_forwards]">
            Especialista em Dor · Pós-graduada pela USP-SP
          </p>

          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-foreground/80 opacity-0 animate-[fadeInUp_0.7s_ease-out_0.6s_forwards] lg:mx-0">
            Cuidado humanizado e especializado para quem convive com dores crônicas e doenças reumáticas. Seu bem-estar é a minha prioridade.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 opacity-0 animate-[fadeInUp_0.7s_ease-out_0.75s_forwards] sm:flex-row lg:justify-start">
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
              className="flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              Saiba mais
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </a>
          </div>
        </div>
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
