import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  Syringe,
  Stethoscope,
  HeartHandshake,
  Salad,
  Brain,
  Bone,
  ClipboardList,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

import quadrilImg from "@/assets/joints/quadril.jpg";
import joelhoImg from "@/assets/joints/joelho.jpg";
import ombroImg from "@/assets/joints/ombro.jpg";
import maosImg from "@/assets/joints/maos.jpg";
import pesImg from "@/assets/joints/pes.jpg";

const joints = [
  {
    label: "Quadril",
    image: quadrilImg,
    desc: "Infiltrações guiadas por ultrassom para bursites trocantéricas, tendinopatias e osteoartrose coxofemoral.",
  },
  {
    label: "Joelho",
    image: joelhoImg,
    desc: "Viscossuplementação, corticoide e PRP para gonartrose, meniscopatias e tendinite patelar.",
  },
  {
    label: "Ombro",
    image: ombroImg,
    desc: "Infiltração subacromial e intra-articular para bursite, tendinite do manguito e capsulite adesiva.",
  },
  {
    label: "Punho e Mãos",
    image: maosImg,
    desc: "Bloqueios para tenossinovite de De Quervain, dedo em gatilho, síndrome do túnel do carpo e rizartrose.",
  },
  {
    label: "Pés e Tornozelos",
    image: pesImg,
    desc: "Tratamento de fascite plantar, tendinite aquiliana, esporão calcâneo e artroses do médio/retropé.",
  },
];


const journey = [
  {
    icon: ClipboardList,
    title: "Primeira Consulta",
    desc: "Escuta atenta, história clínica completa e exame físico minucioso para entender você por inteiro — não apenas a dor.",
  },
  {
    icon: Stethoscope,
    title: "Diagnóstico Preciso",
    desc: "Exames laboratoriais e de imagem direcionados. Reavaliação conjunta dos resultados e plano terapêutico personalizado.",
  },
  {
    icon: Syringe,
    title: "Tratamento Individualizado",
    desc: "Medicações modernas, infiltrações guiadas por ultrassom e procedimentos minimamente invasivos quando indicados.",
  },
  {
    icon: Bone,
    title: "Fisioterapia Integrada",
    desc: "Trabalho em rede com fisioterapeutas parceiros para reabilitação funcional, ganho de mobilidade e força.",
  },
  {
    icon: Salad,
    title: "Nutrição Anti-inflamatória",
    desc: "Encaminhamento a nutricionistas: controle de peso, saúde óssea e alimentação que reduz inflamação.",
  },
  {
    icon: Brain,
    title: "Suporte Psicológico",
    desc: "Parceria com psicólogos para manejo da dor crônica, ansiedade e adesão ao tratamento — corpo e mente juntos.",
  },
  {
    icon: HeartHandshake,
    title: "Psiquiatria Colaborativa",
    desc: "Discussão de casos com psiquiatras de confiança quando há indicação para cuidado integrado da saúde mental.",
  },
  {
    icon: CheckCircle2,
    title: "Acompanhamento Contínuo",
    desc: "Reavaliações periódicas, ajuste fino do tratamento e celebração de cada conquista da sua transformação.",
  },
];

/** Horizontal, scroll-driven joint gallery — the active image lifts out of the row. */
function JointsWheel() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = Math.max(1, el.offsetHeight - vh);
      const p = Math.max(0, Math.min(1, -rect.top / total));
      setProgress(p);
      setActive(Math.min(joints.length - 1, Math.floor(p * joints.length * 0.9999)));
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

  const current = joints[active];

  // Text slides from screen-center into the left column as user scrolls the section.
  // 0 → text centered horizontally over the whole viewport
  // 1 → text pinned inside the left column
  const slide = Math.min(1, progress * 2);

  return (
    <div
      ref={stageRef}
      className="relative"
      style={{ height: `${joints.length * 60}vh` }}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        {/* Two-column layout */}
        <div className="grid h-full w-full grid-cols-1 lg:grid-cols-2">
          {/* LEFT column reserved for text (destination) */}
          <div className="relative hidden h-full lg:block" aria-hidden />

          {/* RIGHT column — full image */}
          <div className="relative hidden h-full w-full overflow-hidden lg:block">
            {joints.map((j, i) => (
              <div
                key={j.label}
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${j.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: i === active ? 1 : 0,
                  transform: i === active ? "scale(1)" : "scale(1.06)",
                  transition:
                    "opacity 900ms ease, transform 1400ms cubic-bezier(0.22,1,0.36,1)",
                  willChange: "opacity, transform",
                }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#1a1229]/40" />
          </div>

          {/* Mobile — diagonal fila; active card lifts to the front */}
          <div className="absolute inset-x-0 bottom-0 top-1/2 overflow-visible lg:hidden" aria-hidden>
            <div className="relative mx-auto h-full w-full" style={{ perspective: "1200px" }}>
              {joints.map((j, i) => {
                const delta = i - active;
                const isActive = i === active;
                const x = delta * 22;           // horizontal offset along the diagonal
                const y = delta * 14;           // vertical offset (fila diagonal)
                const rot = delta * -8;         // slight tilt
                const scale = isActive ? 1 : Math.max(0.42, 0.62 - Math.abs(delta) * 0.05);
                const z = isActive ? 60 : 30 - Math.abs(delta);
                const opacity = isActive ? 1 : Math.max(0.35, 0.75 - Math.abs(delta) * 0.15);
                return (
                  <div
                    key={j.label}
                    className="absolute left-1/2 top-1/2 h-[62%] w-[72%] overflow-hidden rounded-3xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-primary/25"
                    style={{
                      backgroundImage: `url(${j.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      transform: `translate3d(calc(-50% + ${x}%), calc(-50% + ${y}%), 0) rotate(${rot}deg) scale(${scale})`,
                      opacity,
                      zIndex: z,
                      transition:
                        "transform 700ms cubic-bezier(0.22,1,0.36,1), opacity 500ms ease",
                      willChange: "transform, opacity",
                    }}
                  >
                    {!isActive && (
                      <div className="absolute inset-0 bg-[#1a1229]/45" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Text overlay — starts centered, slides into the LEFT column */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex h-1/2 items-start pt-[max(5rem,calc(env(safe-area-inset-top)+4rem))] lg:inset-0 lg:h-full lg:items-center lg:pt-0">
          <div
            className="w-full lg:w-1/2"
            style={{
              paddingLeft: "max(1.5rem, env(safe-area-inset-left))",
              paddingRight: "max(1.5rem, env(safe-area-inset-right))",
            }}
          >
            {/* On lg+ the wrapper starts translated 50% to the right (centered on viewport)
                and slides back to 0 (left column) as the user scrolls. */}
            <div
              className="mx-auto max-w-xl text-center lg:text-left"
              style={{
                transform: `translate3d(var(--tx, 0px), 0, 0)`,
              }}
            >
              <div
                style={{
                  // custom prop consumed above; only apply the horizontal offset on lg screens via inline vars
                  ["--tx" as string]: `${(1 - slide) * 50}vw`,
                }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e7d9b5] sm:text-base [text-shadow:0_1px_10px_rgba(0,0,0,0.6)]">
                  Procedimentos · Área em evidência
                </p>
                <h3
                  key={current.label}
                  className="mt-3 text-balance text-4xl font-normal leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl animate-in fade-in slide-in-from-bottom-2 duration-500 [text-shadow:0_2px_20px_rgba(0,0,0,0.65)]"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", paddingBottom: "0.08em" }}
                >
                  {current.label}
                </h3>
                <p
                  key={current.desc}
                  className="mt-5 text-base leading-relaxed text-white/95 animate-in fade-in duration-500 sm:text-xl [text-shadow:0_1px_10px_rgba(0,0,0,0.7)]"
                >
                  {current.desc}
                </p>

                <div className="mt-8 w-full sm:mt-10">
                  <div className="h-1 w-full overflow-hidden rounded-full bg-white/15">
                    <div
                      className="h-full rounded-full bg-primary transition-[width] duration-150"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-white/80 sm:text-base lg:justify-start">
                    <span>{String(active + 1).padStart(2, "0")}</span>
                    <span className="h-px flex-1 bg-white/25" />
                    <ChevronRight className="h-5 w-5 animate-pulse" />
                    <span className="h-px flex-1 bg-white/25" />
                    <span>{String(joints.length).padStart(2, "0")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



export default function Procedures() {
  return (
    <section
      id="procedimentos"
      className="relative"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 15%, hsl(260 45% 22% / 0.75), transparent 55%),
          radial-gradient(circle at 80% 40%, hsl(40 40% 30% / 0.35), transparent 55%),
          radial-gradient(circle at 30% 85%, hsl(275 40% 20% / 0.7), transparent 55%),
          linear-gradient(160deg, hsl(258 40% 12%) 0%, hsl(268 35% 15%) 55%, hsl(255 40% 10%) 100%)
        `,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      {/* Journey / Protocolo TransformaDOR */}
      <div id="protocolo" className="relative">
        <ZoomIntro />
        <JourneyStage steps={journey} />
        <div className="pb-16 lg:pb-24" />
      </div>

      {/* Procedimentos — Áreas em evidência (merged) */}
      <JointsWheel />
    </section>
  );
}



type JourneyStep = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  desc: string;
};

/** Reusable scroll-progress hook: 0 → 1 while element passes the viewport. */
function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = Math.max(1, el.offsetHeight - vh);
      setP(Math.max(0, Math.min(1, -rect.top / total)));
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
  return { ref, progress: p };
}

/**
 * "Protocolo TransformaDOR" — the word DOR zooms until it fills the screen,
 * suggesting that the transformation of pain takes over the whole experience.
 */
function ZoomIntro() {
  const { ref, progress } = useScrollProgress();

  // Scale DOR aggressively; from 1× to ~40× across the scroll.
  const scale = 1 + progress * 40;
  // Fade out the "Protocolo Transforma" prefix as DOR takes over.
  const prefixOpacity = Math.max(0, 1 - progress * 2.2);
  // Fade the whole intro at the very end so JourneyStage below appears clean.
  const stageOpacity = Math.max(0, 1 - Math.max(0, progress - 0.85) * 6);
  // Hint fades in initially then leaves.
  const hintOpacity = Math.max(0, 1 - progress * 3.5);

  return (
    <div ref={ref} className="relative" style={{ height: "220vh" }}>
      <div
        className="sticky top-0 flex h-[100dvh] w-full items-center justify-center overflow-hidden"
        style={{ opacity: stageOpacity }}
      >
        {/* Ambient decor */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -top-24 left-[8%] h-80 w-80 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl" />
          <div className="absolute bottom-10 right-[5%] h-96 w-96 rounded-full bg-gradient-to-tr from-amber-200/30 to-pink-200/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 text-center">
          <p
            className="text-base font-semibold uppercase tracking-[0.28em] text-primary"
            style={{ opacity: prefixOpacity }}
          >
            Protocolo
          </p>
          <h3
            className="mt-4 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 font-normal tracking-tight text-foreground"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            <span
              className="text-4xl sm:text-6xl lg:text-7xl transition-opacity duration-200"
              style={{ opacity: prefixOpacity }}
            >
              Transforma
            </span>
            <span
              className="inline-block bg-gradient-to-br from-primary via-primary/80 to-amber-500 bg-clip-text text-5xl font-semibold text-transparent sm:text-7xl lg:text-8xl"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "center center",
                transition: "transform 120ms linear",
                willChange: "transform",
              }}
            >
              DOR
            </span>
          </h3>
          <p
            className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            style={{ opacity: prefixOpacity }}
          >
            Da primeira consulta ao trabalho em rede com fisioterapeuta, nutricionista,
            psicólogo e psiquiatras — cada etapa cuidadosamente conectada.
          </p>
          <p
            className="mt-10 text-sm font-semibold uppercase tracking-[0.28em] text-primary/70"
            style={{ opacity: hintOpacity }}
          >
            role para atravessar a dor ↓
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Journey stage — sticky viewport where cards slide vertically synced with
 * scroll while the left rail indicator moves through the steps. After the
 * last card, the page continues scrolling normally.
 */
function JourneyStage({ steps }: { steps: JourneyStep[] }) {
  const { ref, progress } = useScrollProgress();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [entry, setEntry] = useState(0);

  // Entry animation: fade + zoom-in as the section approaches the viewport
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const e = Math.max(0, Math.min(1, 1 - rect.top / vh));
      setEntry(e);
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
  }, [ref]);

  // Continuous index across steps (0 → steps.length - 1).
  const scrollPos = progress * (steps.length - 1);
  const scrollActive = Math.min(steps.length - 1, Math.max(0, Math.round(scrollPos)));
  const active = hoverIndex ?? scrollActive;
  const pos = hoverIndex !== null ? hoverIndex : scrollPos;

  const introScale = 0.6 + entry * 0.4;
  const introOpacity = entry;

  return (
    <div
      ref={ref}
      className="relative"
      style={{ height: `${steps.length * 90 + 40}vh` }}
    >
      <div
        className="sticky top-16 md:top-20 h-[calc(100dvh-4rem)] md:h-[calc(100dvh-5rem)] w-full overflow-hidden"
        style={{
          transform: `scale(${introScale})`,
          opacity: introOpacity,
          transformOrigin: "center center",
          transition: "transform 120ms linear, opacity 120ms linear",
          willChange: "transform, opacity",
        }}
      >
        <div className="mx-auto grid h-full max-w-7xl grid-cols-1 items-center gap-6 px-4 sm:px-6 lg:grid-cols-[280px_1fr] lg:gap-12 lg:px-8">
          {/* Left rail */}
          <aside className="relative hidden lg:block">
            <p className="text-base font-semibold uppercase tracking-[0.28em] text-primary/70">
              Etapas da Transformação
            </p>
            <ol className="relative mt-6 space-y-4 border-l border-primary/15 pl-6">
              {steps.map((s, i) => {
                const isActive = i === active;
                const isPast = i < active;
                return (
                  <li
                    key={s.title}
                    className="relative cursor-pointer"
                    onMouseEnter={() => setHoverIndex(i)}
                    onMouseLeave={() =>
                      setHoverIndex((h) => (h === i ? null : h))
                    }
                  >
                    <span
                      className={`absolute -left-[30px] top-2 flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-500 ${
                        isActive
                          ? "border-primary bg-primary scale-110 shadow-[0_0_0_6px_hsl(var(--primary)/0.12)]"
                          : isPast
                          ? "border-primary/50 bg-primary/60"
                          : "border-primary/25 bg-background"
                      }`}
                    >
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </span>
                    <span
                      className={`block text-[10px] font-semibold uppercase tracking-[0.28em] transition-colors ${
                        isActive ? "text-primary" : "text-muted-foreground/70"
                      }`}
                    >
                      Etapa {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`mt-1 block text-2xl leading-tight tracking-tight transition-colors ${
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground/80"
                      }`}
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {s.title}
                    </span>
                  </li>
                );
              })}

            </ol>
            <div className="mt-8 flex items-center gap-3 text-base font-medium uppercase tracking-[0.24em] text-primary/70">
              <span>{String(active + 1).padStart(2, "0")}</span>
              <span className="h-px flex-1 bg-primary/20" />
              <span>{String(steps.length).padStart(2, "0")}</span>
            </div>
          </aside>

          {/* Right stage — vertical slide of cards */}
          <div className="relative h-full overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {steps.map((step, i) => {
                const delta = i - pos;
                const abs = Math.abs(delta);
                const ty = delta * 105; // % of stage height
                const opacity = Math.max(0, 1 - abs * 0.8);
                const scale = 1 - Math.min(0.15, abs * 0.08);
                const isActive = i === active;
                return (
                  <div
                    key={step.title}
                    className="absolute inset-x-4 sm:inset-x-6 lg:inset-x-0"
                    style={{
                      transform: `translateY(${ty}%) scale(${scale})`,
                      opacity,
                      transition:
                        "transform 260ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms linear",
                      willChange: "transform, opacity",
                      zIndex: 100 - Math.round(abs * 10),
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    <div
                      className={`mx-auto max-w-2xl rounded-3xl border-2 bg-transparent p-8 sm:p-10 transition-colors duration-500 ${
                        isActive
                          ? "border-[#2a2730] shadow-[0_30px_60px_-30px_rgba(30,25,40,0.35)]"
                          : "border-[#2a2730]/40"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <step.icon className="h-6 w-6" />
                        </span>
                        <span className="text-base font-semibold uppercase tracking-[0.24em] text-primary/70">
                          Etapa {String(i + 1).padStart(2, "0")} /{" "}
                          {String(steps.length).padStart(2, "0")}
                        </span>
                      </div>
                      <h4
                        className="mt-5 text-3xl leading-tight text-foreground sm:text-4xl"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        {step.title}
                      </h4>
                      <p className="mt-4 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile progress dots */}
            <div className="pointer-events-none absolute right-2 top-1/2 flex -translate-y-1/2 flex-col gap-2 lg:hidden">
              {steps.map((_, i) => (
                <span
                  key={i}
                  className={`rounded-full transition-all duration-300 ${
                    i === active ? "h-6 w-1.5 bg-primary" : "h-1.5 w-1.5 bg-primary/25"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


