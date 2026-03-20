import { useEffect, useRef, useState } from "react";
import { Bone, ShieldCheck, Activity, HeartPulse } from "lucide-react";

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

const areas = [
  {
    icon: Bone,
    title: "Artrites",
    desc: "Artrite reumatoide, artrite psoriásica, gota e outras artropatias inflamatórias, com diagnóstico precoce e tratamento personalizado.",
  },
  {
    icon: ShieldCheck,
    title: "Doenças Autoimunes",
    desc: "Lúpus eritematoso sistêmico, esclerose sistêmica, vasculites, síndrome de Sjögren e outras doenças autoimunes.",
  },
  {
    icon: Activity,
    title: "Fibromialgia",
    desc: "Abordagem multidisciplinar para controle da dor, melhora do sono e qualidade de vida dos pacientes com fibromialgia.",
  },
  {
    icon: HeartPulse,
    title: "Dores Crônicas",
    desc: "Investigação e tratamento de dores musculoesqueléticas, osteoporose, tendinites, bursites e outras condições de dor crônica.",
  },
];

export default function Services() {
  const { ref, visible } = useReveal();

  return (
    <section id="atuacao" className="py-20 lg:py-28">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">Áreas de Atuação</p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Cuidado especializado para você
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {areas.map((a, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-white p-8 shadow-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <a.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-foreground" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                {a.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
