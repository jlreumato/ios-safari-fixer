import { useEffect, useRef, useState } from "react";

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
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* Photo */}
          <div className="flex-shrink-0">
            <div className="relative h-80 w-72 overflow-hidden rounded-2xl shadow-xl shadow-primary/10 sm:h-96 sm:w-80">
              <img
                src="https://julianalealreumato.com.br/wp-content/uploads/2024/10/dra-juliana-leal-reumatologista-maceio-alagoas.webp"
                alt="Dra. Juliana Leal no consultório"
                className="h-full w-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl" />
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
              Sobre mim
            </p>
            <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Dra. Juliana Leal
            </h2>
            <p className="mt-1 text-sm font-medium text-primary">
              CRM/AL: 6717 · RQE: 4857
            </p>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground lg:max-w-xl">
              <p>
                Sou médica reumatologista formada pela Universidade Federal de Alagoas (UFAL), com residência em Clínica Médica pelo Hospital Universitário Prof. Alberto Antunes e residência em Reumatologia pelo Hospital das Clínicas da Faculdade de Medicina da USP (HC-FMUSP).
              </p>
              <p>
                Possuo pós-graduação em Dor pelo Hospital das Clínicas da USP e sou membro titular da Sociedade Brasileira de Reumatologia. Minha missão é oferecer um atendimento humanizado, acolhedor e baseado nas melhores evidências científicas, para que cada paciente encontre qualidade de vida e bem-estar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
