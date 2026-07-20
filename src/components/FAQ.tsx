import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [revealed, setRevealed] = useState<boolean[]>(() => faqs.map(() => false));
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeaderVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Staggered reveal on scroll
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setRevealed((prev) => {
                if (prev[i]) return prev;
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 120);
            obs.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Highlight active (closest to viewport center)
  useEffect(() => {
    const onScroll = () => {
      const centerY = window.innerHeight / 2;
      let closest = -1;
      let closestDist = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const mid = rect.top + rect.height / 2;
        const d = Math.abs(mid - centerY);
        if (d < closestDist) {
          closestDist = d;
          closest = i;
        }
      });
      setActiveIndex(closest);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="bg-secondary/50 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center transition-all duration-700 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-base font-semibold uppercase tracking-[0.18em] text-primary">Dúvidas</p>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Perguntas Frequentes
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((f, i) => {
            const isActive = activeIndex === i;
            const isRevealed = revealed[i];
            return (
              <div
                key={i}
                ref={(el) => (itemRefs.current[i] = el)}
                className="transition-all duration-700 ease-out will-change-transform"
                style={{
                  opacity: isRevealed ? (activeIndex === -1 ? 1 : isActive ? 1 : 0.45) : 0,
                  transform: isRevealed
                    ? `translateY(0) scale(${isActive ? 1.02 : 1})`
                    : "translateY(24px)",
                  filter: isRevealed && !isActive && activeIndex !== -1 ? "blur(0.4px)" : "none",
                }}
              >
                <AccordionItem
                  value={`faq-${i}`}
                  className={`border-border/60 transition-colors duration-500 ${
                    isActive ? "border-primary/40" : ""
                  }`}
                >
                  <AccordionTrigger className="text-left text-xl lg:text-2xl font-medium text-foreground hover:no-underline hover:text-primary">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-lg lg:text-xl leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              </div>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
