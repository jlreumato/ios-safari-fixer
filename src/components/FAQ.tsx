import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

const faqs = [
  {
    q: "Quando devo procurar um reumatologista?",
    a: "Você deve procurar um reumatologista quando sentir dores articulares persistentes, inchaço nas articulações, rigidez matinal prolongada, fadiga inexplicável ou quando houver suspeita de doenças autoimunes. O diagnóstico precoce é fundamental para um tratamento eficaz.",
  },
  {
    q: "Quais exames são necessários na primeira consulta?",
    a: "Na primeira consulta, a Dra. Juliana fará uma avaliação clínica completa. Dependendo dos sintomas, poderão ser solicitados exames de sangue (como fator reumatoide, VHS, PCR, FAN), exames de imagem (raio-X, ultrassonografia, ressonância) e outros específicos para cada caso.",
  },
  {
    q: "A fibromialgia tem cura?",
    a: "A fibromialgia é uma condição crônica que não tem cura, mas tem tratamento eficaz. Com uma abordagem multidisciplinar — que inclui medicação adequada, atividade física, higiene do sono e acompanhamento psicológico — é possível controlar os sintomas e ter excelente qualidade de vida.",
  },
  {
    q: "Como funciona o agendamento de consultas?",
    a: "O agendamento pode ser feito pelo WhatsApp (82) 99987-2509 ou presencialmente no Harmony Trade Center, Sala 318. Trabalhamos com horários flexíveis para melhor atender nossos pacientes.",
  },
];

export default function FAQ() {
  const { ref, visible } = useReveal();

  return (
    <section className="bg-secondary/50 py-20 lg:py-28">
      <div
        ref={ref}
        className={`mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">Dúvidas</p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Perguntas Frequentes
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-border/60">
              <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline hover:text-primary">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
