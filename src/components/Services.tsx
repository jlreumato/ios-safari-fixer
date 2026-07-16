import { useEffect, useRef, useState } from "react";
import { Bone, ShieldCheck, Activity, HeartPulse } from "lucide-react";

const areas = [
  {
    icon: Bone,
    title: "Artrites",
    desc: "Diagnóstico e manejo de Artrite Reumatoide, Artrite Psoriásica, Espondilite Anquilosante e outras artropatias inflamatórias.",
    accent: "#8e82b8",
  },
  {
    icon: ShieldCheck,
    title: "Doenças Autoimunes",
    desc: "Acompanhamento de Lúpus Eritematoso Sistêmico (LES), Síndrome de Sjögren, Esclerose Sistêmica e Vasculites.",
    accent: "#c8778c",
  },
  {
    icon: Activity,
    title: "Fibromialgia",
    desc: "Abordagem multidisciplinar para dor crônica difusa, fadiga e alterações do sono — plano personalizado que devolve qualidade de vida.",
    accent: "#6a86c3",
  },
  {
    icon: HeartPulse,
    title: "Dores Crônicas",
    desc: "Cuidado para dores persistentes musculoesqueléticas, cefaleias tensionais associadas e síndromes miofasciais complexas.",
    accent: "#9483b8",
  },
];

export default function Services() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = el.offsetHeight - vh;
      const p = Math.max(0, Math.min(1, -rect.top / total));
      setProgress(p);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Horizontal parallax: translate the row by (areas.length - 1) * cardWidth
  // On mobile we collapse to a stacked layout without pinning.
  const translate = progress * (areas.length - 1) * 80; // in vw units

  return (
    <section id="atuacao" className="relative bg-background">
      {/* Intro */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
          Áreas de Atuação
        </p>
        <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Cuidado especializado para você
        </h2>
        <p className="mt-5 text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
          Atendimento humanizado e baseado em evidências nas principais áreas da reumatologia.
        </p>
      </div>

      {/* Mobile: simple stacked grid */}
      <div className="lg:hidden mx-auto max-w-2xl px-4 pb-20 grid gap-6">
        {areas.map((a, i) => (
          <ServiceCard key={i} area={a} index={i} total={areas.length} />
        ))}
      </div>

      {/* Desktop: horizontal parallax pinned */}
      <div
        ref={stageRef}
        className="hidden lg:block relative"
        style={{ height: `${areas.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
          <div
            className="flex gap-8 pl-[10vw] will-change-transform"
            style={{
              transform: `translate3d(-${translate}vw, 0, 0)`,
              transition: "transform 60ms linear",
            }}
          >
            {areas.map((a, i) => (
              <div key={i} className="w-[70vw] shrink-0">
                <ServiceCard area={a} index={i} total={areas.length} large />
              </div>
            ))}
          </div>
          {/* Progress indicator */}
          <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
            {areas.map((_, i) => {
              const active = Math.round(progress * (areas.length - 1)) === i;
              return (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    active ? "w-10 bg-primary" : "w-4 bg-primary/25"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  area,
  index,
  total,
  large = false,
}: {
  area: (typeof areas)[number];
  index: number;
  total: number;
  large?: boolean;
}) {
  const Icon = area.icon;
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 sm:p-10 transition-all duration-500 hover:shadow-xl ${
        large ? "lg:p-14 lg:min-h-[62vh]" : ""
      }`}
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-[40vmin] w-[40vmin] rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: area.accent }}
      />
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl text-primary transition-all duration-500 group-hover:scale-110"
            style={{ backgroundColor: `${area.accent}1a`, color: area.accent }}
          >
            <Icon className="h-7 w-7" strokeWidth={1.5} />
          </div>
          <span
            className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground"
          >
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <h3
          className={`mt-8 font-semibold text-foreground ${
            large ? "text-4xl lg:text-5xl" : "text-2xl sm:text-3xl"
          }`}
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {area.title}
        </h3>

        <p
          className={`mt-4 leading-relaxed text-muted-foreground ${
            large ? "text-lg lg:text-xl max-w-xl" : "text-base lg:text-lg"
          }`}
        >
          {area.desc}
        </p>

        <div
          className="mt-8 h-0.5 w-12 rounded-full transition-all duration-500 group-hover:w-20"
          style={{ backgroundColor: `${area.accent}80` }}
        />
      </div>
    </div>
  );
}
