import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

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

const testimonials = [
  {
    name: "Maria S.",
    text: "A Dra. Juliana mudou minha vida! Depois de anos convivendo com dores e sem diagnóstico, ela identificou minha artrite reumatoide e iniciou o tratamento correto. Hoje vivo com muito mais qualidade de vida.",
    stars: 5,
  },
  {
    name: "João P.",
    text: "Profissional extremamente competente e humana. Me senti acolhido desde a primeira consulta. Ela explica tudo com paciência e clareza, e o tratamento para minha gota está sendo muito eficaz.",
    stars: 5,
  },
  {
    name: "Ana L.",
    text: "Sofri durante muitos anos com fibromialgia sem saber o que era. A Dra. Juliana não só fez o diagnóstico como montou um plano de tratamento completo. Recomendo de olhos fechados!",
    stars: 5,
  },
];

export default function Testimonials() {
  const { ref, visible } = useReveal();

  return (
    <section id="depoimentos" className="bg-secondary/50 py-20 lg:py-28">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Depoimentos</p>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            O que dizem os pacientes
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`rounded-2xl bg-white p-7 shadow-sm transition-all duration-500 hover:shadow-md ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${200 + i * 120}ms` }}
            >
              <div className="flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-5 text-base lg:text-lg leading-relaxed text-muted-foreground italic">"{t.text}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary">
                  {t.name.charAt(0)}
                </div>
                <span className="text-base font-semibold text-foreground">{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
