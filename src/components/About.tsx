import { useEffect, useRef, useState } from "react";
import draJulianaAbout from "@/assets/dra-juliana-about.jpg.asset.json";


function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export default function About() {
  const { ref, visible } = useReveal();

  return (
    <section id="sobre" className="py-20 lg:py-28">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="flex flex-col items-center gap-12 lg:flex-row-reverse lg:gap-16">
          {/* Photo */}
          <div className="flex-shrink-0">
            <div className="relative h-[26rem] w-80 sm:h-[30rem] sm:w-96">
              <img
                src={draJulianaAbout.url}
                alt="Dra. Juliana Leal"
                className="h-full w-full object-cover object-top"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to bottom, #000 0%, #000 65%, rgba(0,0,0,0.35) 92%, rgba(0,0,0,0) 100%)",
                  maskImage:
                    "linear-gradient(to bottom, #000 0%, #000 65%, rgba(0,0,0,0.35) 92%, rgba(0,0,0,0) 100%)",
                }}
                loading="lazy"
              />
            </div>
          </div>


          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Sobre mim
            </p>
            <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              Dra. Juliana Leal
            </h2>
            <p className="mt-2 text-base font-medium text-primary">
              CRM/AL: 6717 · RQE: 4857
            </p>
            <div className="mt-7 space-y-5 text-lg leading-relaxed text-muted-foreground lg:max-w-xl lg:text-xl">
               <p>
                Formada em Medicina pela FAMENE, com residência em Clínica Médica na Santa Casa de Misericórdia de Maceió e especialização em Reumatologia pelo Hospital Universitário Prof. Alberto Antunes. Com Pós-Graduação em Dor pela USP-SP, possui um olhar aprofundado para o manejo de dores crônicas e complexas.
               </p>
               <p>
                Sua prática é pautada na escuta atenta e na construção de uma relação de confiança com o paciente. Acredita que o tratamento vai além dos medicamentos, envolvendo educação sobre a doença, promoção de hábitos saudáveis e um plano de cuidado individualizado para restaurar a qualidade de vida.
               </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
