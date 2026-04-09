import { useEffect, useRef, useState } from "react";
import { Bone, ShieldCheck, Activity } from "lucide-react";

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
    desc: "Diagnóstico e manejo de Artrite Reumatoide, Artrite Psoriásica, Espondilite Anquilosante e outras artropatias inflamatórias.",
    accent: "from-primary/20 to-primary/5",
  },
  {
    icon: ShieldCheck,
    title: "Doenças Autoimunes",
    desc: "Acompanhamento de Lúpus Eritematoso Sistêmico (LES), Síndrome de Sjögren, Esclerose Sistêmica e Vasculites.",
    accent: "from-accent to-secondary/30",
  },
  {
    icon: Activity,
    title: "Fibromialgia e Dores",
    desc: "Abordagem multidisciplinar para o controle da Fibromialgia e outras síndromes dolorosas crônicas difusas.",
    accent: "from-primary/15 to-accent/40",
  },
];

export default function Services() {
  const { ref, visible } = useReveal();

  return (
    <section id="atuacao" className="py-20 lg:py-28 bg-secondary/40">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Áreas de Atuação
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Cuidado especializado para você
          </h2>
          <p className="mt-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
            Atendimento humanizado e baseado em evidências nas principais áreas da reumatologia.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {areas.map((a, i) => (
            <div
              key={i}
              className={`group relative rounded-3xl border border-border/60 bg-card p-8 sm:p-10 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              {/* Gradient blob background */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${a.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

              <div className="relative">
                {/* Icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
                  <a.icon className="h-7 w-7" strokeWidth={1.5} />
                </div>

                {/* Number tag */}
                <span className="absolute -top-1 -right-1 text-[5rem] font-bold leading-none text-primary/[0.04] select-none transition-colors group-hover:text-primary/[0.08]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-7 text-xl sm:text-2xl font-semibold text-foreground" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  {a.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {a.desc}
                </p>

                {/* Decorative line */}
                <div className="mt-6 h-0.5 w-10 rounded-full bg-primary/20 transition-all duration-500 group-hover:w-16 group-hover:bg-primary/50" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
