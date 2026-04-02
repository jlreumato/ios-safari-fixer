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
    q: "Quando devo procurar um Reumatologista?",
    a: "Você deve procurar um reumatologista se sentir dores persistentes nas articulações, músculos ou ossos, especialmente se acompanhadas de inchaço, vermelhidão, rigidez matinal ou fadiga intensa. Sintomas como dificuldade para movimentar-se, febre de origem desconhecida e lesões de pele também são sinais de alerta.",
  },
  {
    q: '"Reumatismo" é uma doença única?',
    a: 'Não. O termo "reumatismo" é popularmente usado para descrever dores no corpo, mas na verdade, ele engloba mais de 120 doenças diferentes que afetam o aparelho locomotor (articulações, ossos, músculos, tendões). Artrite reumatoide, artrose, gota e lúpus são exemplos de doenças reumáticas, cada uma com diagnóstico e tratamento específicos.',
  },
  {
    q: "Artrite e Artrose são a mesma coisa?",
    a: "Não. Embora ambas afetem as articulações, a artrite é uma doença inflamatória (como a artrite reumatoide), onde o próprio sistema imune ataca as articulações. Já a artrose (ou osteoartrite) é uma doença degenerativa, causada pelo desgaste da cartilagem ao longo do tempo. Os tratamentos são diferentes para cada caso.",
  },
  {
    q: "O tratamento reumatológico é para a vida toda?",
    a: "Muitas doenças reumáticas são crônicas, o que significa que não têm cura, mas têm controle. O tratamento visa controlar a inflamação, aliviar os sintomas, prevenir danos às articulações e manter a qualidade de vida. Com o acompanhamento correto, é possível entrar em remissão, período em que a doença fica inativa e a medicação pode ser ajustada ou até suspensa, sempre sob orientação médica.",
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
