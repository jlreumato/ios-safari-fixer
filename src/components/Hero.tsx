import { Phone, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import draJulianaImg from "@/assets/dra-juliana-leal.webp";

const WHATSAPP_URL = "https://wa.me/5582999872509?text=Olá! Gostaria de agendar uma consulta com a Dra. Juliana Leal.";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-br from-[hsl(280_40%_97%)] via-[hsl(270_35%_95%)] to-[hsl(249_30%_92%)]">
      {/* Decorative shapes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-[400px] w-[400px] rounded-full bg-primary/5" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-primary/[0.03] translate-y-1/2 -translate-x-1/3" />
        <div className="absolute top-1/3 left-1/4 h-2 w-2 rounded-full bg-primary/20" />
        <div className="absolute top-1/2 right-1/3 h-3 w-3 rounded-full bg-primary/15" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col-reverse items-center px-4 pt-24 pb-12 sm:px-6 md:pt-28 lg:flex-row lg:gap-12 lg:px-8 lg:pt-0 lg:pb-0 lg:min-h-[100dvh]">
        {/* Text side */}
        <div className="flex-1 text-center lg:text-left lg:py-24">
          <p
            className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards]"
          >
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

          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-foreground opacity-0 animate-[fadeInUp_0.7s_ease-out_0.6s_forwards] lg:mx-0">
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

        {/* Image side */}
        <div className="flex-1 flex items-end justify-center lg:justify-end opacity-0 animate-[fadeIn_1s_ease-out_0.3s_forwards]">
          <div className="relative">
            <div className="absolute inset-0 rounded-b-[2rem] bg-gradient-to-t from-primary/10 to-transparent lg:rounded-[2rem]" />
            <img
              src="https://julianalealreumato.com.br/imagens/fotos/drajulianaleal.webp"
              alt="Dra. Juliana Leal — Reumatologista em Maceió"
              className="relative h-[340px] w-auto object-contain sm:h-[420px] lg:h-[560px]"
              loading="eager"
            />
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(18px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; filter: blur(4px); }
          to { opacity: 1; filter: blur(0); }
        }
      `}</style>
    </section>
  );
}
