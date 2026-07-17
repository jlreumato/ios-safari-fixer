import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  Syringe,
  Waves,
  Microscope,
  Stethoscope,
  HeartHandshake,
  Salad,
  Brain,
  Bone,
  ClipboardList,
  Activity,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const joints = [
  {
    label: "Quadril",
    desc: "Infiltrações guiadas por ultrassom para bursites trocantéricas, tendinopatias e osteoartrose coxofemoral.",
  },
  {
    label: "Joelho",
    desc: "Viscossuplementação, corticoide e PRP para gonartrose, meniscopatias e tendinite patelar.",
  },
  {
    label: "Ombro",
    desc: "Infiltração subacromial e intra-articular para bursite, tendinite do manguito e capsulite adesiva.",
  },
  {
    label: "Punho e Mãos",
    desc: "Bloqueios para tenossinovite de De Quervain, dedo em gatilho, síndrome do túnel do carpo e rizartrose.",
  },
  {
    label: "Pés e Tornozelos",
    desc: "Tratamento de fascite plantar, tendinite aquiliana, esporão calcâneo e artroses do médio/retropé.",
  },
];

const substances = [
  {
    icon: Syringe,
    title: "Ácido Hialurônico",
    desc: "Viscossuplementação que restaura a lubrificação articular e reduz a dor de forma prolongada.",
  },
  {
    icon: Microscope,
    title: "PRP (Plasma Rico em Plaquetas)",
    desc: "Concentrado autólogo com fatores de crescimento que estimulam a regeneração tecidual.",
  },
  {
    icon: Syringe,
    title: "Corticoide de Depósito",
    desc: "Ação anti-inflamatória potente e localizada, indicada em crises dolorosas selecionadas.",
  },
  {
    icon: Syringe,
    title: "Anestésicos e Bloqueios",
    desc: "Alívio imediato e diagnóstico terapêutico das estruturas realmente responsáveis pela dor.",
  },
];

const equipment = [
  {
    icon: Waves,
    title: "Ultrassonografia Musculoesquelética",
    desc: "Diagnóstico em tempo real e precisão milimétrica em cada infiltração guiada.",
  },
  {
    icon: Activity,
    title: "Ondas de Choque",
    desc: "Estímulo mecânico para tendinopatias crônicas, esporão e lesões de difícil resolução.",
  },
  {
    icon: Microscope,
    title: "Materiais Descartáveis Premium",
    desc: "Agulhas finas específicas, kits estéreis e insumos hospitalares de alto padrão.",
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
    title: "Ortopedia Colaborativa",
    desc: "Discussão de casos com ortopedistas de confiança quando há indicação cirúrgica ou procedimentos avançados.",
  },
  {
    icon: CheckCircle2,
    title: "Acompanhamento Contínuo",
    desc: "Reavaliações periódicas, ajuste fino do tratamento e celebração de cada conquista da sua transformação.",
  },
];

/** Interactive radial navigator for the joint areas — driven by scroll and clickable. */
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

  const scrollToIndex = (i: number) => {
    const el = stageRef.current;
    if (!el) return;
    const vh = window.innerHeight;
    const total = el.offsetHeight - vh;
    const target = el.offsetTop + (i / joints.length) * total + total / (joints.length * 2);
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  const current = joints[active];
  const R = 160;
  const circumference = 2 * Math.PI * R;
  const dash = circumference * progress;

  return (
    <div
      ref={stageRef}
      className="relative"
      style={{ height: `${joints.length * 60}vh` }}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        <div className="mx-auto grid h-full max-w-7xl grid-cols-1 items-center gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(380px,440px)_1fr] lg:px-8">
          {/* Radial navigator */}
          <div className="relative mx-auto aspect-square w-[min(88vw,420px)]">
            {/* SVG progress arc */}
            <svg
              viewBox="0 0 400 400"
              className="absolute inset-0 h-full w-full -rotate-90"
              aria-hidden
            >
              <circle
                cx="200" cy="200" r={R}
                fill="none"
                stroke="hsl(var(--primary) / 0.12)"
                strokeWidth="2"
                strokeDasharray="2 6"
              />
              <circle
                cx="200" cy="200" r={R}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circumference}`}
                style={{ transition: "stroke-dasharray 120ms linear" }}
              />
            </svg>

            {/* Labels around the ring */}
            {joints.map((j, i) => {
              const angle = (i / joints.length) * 2 * Math.PI - Math.PI / 2;
              const x = 50 + (R / 200) * 50 * Math.cos(angle);
              const y = 50 + (R / 200) * 50 * Math.sin(angle);
              const isActive = i === active;
              return (
                <button
                  key={j.label}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <span
                    className={`block whitespace-nowrap rounded-full border px-3 py-1.5 text-xs sm:text-sm font-medium backdrop-blur transition-all duration-500 ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground shadow-[0_10px_30px_-10px_hsl(var(--primary))] scale-110"
                        : "border-primary/20 bg-card/80 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    {j.label}
                  </span>
                </button>
              );
            })}

            {/* Center indicator */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p
                key={active}
                className="text-5xl font-normal text-primary animate-in fade-in zoom-in-95 duration-500"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {String(active + 1).padStart(2, "0")}
              </p>
              <p className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                de {String(joints.length).padStart(2, "0")}
              </p>
            </div>
          </div>

          {/* Active detail */}
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
              Área em evidência
            </p>
            <h3
              key={current.label}
              className="mt-2 text-4xl font-normal tracking-tight text-foreground sm:text-5xl lg:text-6xl animate-in fade-in slide-in-from-bottom-2 duration-500"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {current.label}
            </h3>
            <p
              key={current.desc}
              className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground animate-in fade-in duration-500"
            >
              {current.desc}
            </p>

            {/* Progress bar + hint */}
            <div className="mt-6 max-w-md">
              <div className="h-1 w-full overflow-hidden rounded-full bg-primary/10">
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-150"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">
                <span>role para avançar</span>
                <ChevronRight className="h-4 w-4 animate-pulse" />
                <span className="h-px flex-1 bg-primary/20" />
                <span>ou clique</span>
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
    <section id="procedimentos" className="relative bg-background">
      {/* Intro */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-6 lg:pt-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
          Procedimentos
        </p>
        <h2
          className="mt-3 text-balance text-4xl font-normal tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Precisão que devolve movimento
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Infiltrações guiadas, terapias regenerativas e equipamentos de última geração
          para tratar a dor onde ela realmente está.
        </p>
      </div>

      {/* Vertical circular carousel — joints */}
      <JointsWheel />

      {/* Substâncias + Equipamentos — accordion */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-16">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="substances" className="border-primary/10">
            <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:no-underline">
              Substâncias utilizadas
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-3 pt-2 sm:grid-cols-2">
                {substances.map((s) => (
                  <div
                    key={s.title}
                    className="flex gap-3 rounded-2xl border border-primary/10 bg-card/60 p-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{s.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="equipment" className="border-primary/10">
            <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:no-underline">
              Equipamentos
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-3 pt-2 sm:grid-cols-2">
                {equipment.map((e) => (
                  <div
                    key={e.title}
                    className="flex gap-3 rounded-2xl border border-primary/10 bg-card/60 p-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <e.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{e.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {e.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Journey / Protocolo TransformaDOR */}
      <div className="relative">
        <ZoomIntro />
        <JourneyStage steps={journey} />

        {/* Rede Multidisciplinar — pillars */}
        <div className="relative mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8 pb-24 lg:pb-32">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Rede Multidisciplinar
            </p>
            <h4
              className="mt-3 text-3xl font-normal tracking-tight text-foreground sm:text-4xl"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Quatro especialidades, um único objetivo
            </h4>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Stethoscope, name: "Reumatologia", desc: "Diagnóstico e conduta clínica de precisão." },
              { icon: Bone, name: "Fisioterapia", desc: "Reabilitação funcional, mobilidade e força." },
              { icon: Salad, name: "Nutrição", desc: "Alimentação anti-inflamatória e saúde óssea." },
              { icon: Brain, name: "Psicologia", desc: "Manejo da dor crônica e bem-estar emocional." },
            ].map((p, i) => (
              <div
                key={p.name}
                className="group relative overflow-hidden rounded-3xl border border-primary/10 bg-card/70 p-6 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_50px_-25px_rgba(70,50,120,0.35)]"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-primary/15 to-transparent blur-2xl transition-opacity duration-500 group-hover:opacity-80" />
                <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <p.icon className="h-6 w-6" />
                </span>
                <p className="relative mt-4 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-primary/60">
                  0{i + 1}
                </p>
                <h5
                  className="relative mt-1 text-2xl leading-tight text-foreground"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {p.name}
                </h5>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
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
            className="text-sm font-semibold uppercase tracking-[0.28em] text-primary"
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
            psicólogo e ortopedistas — cada etapa cuidadosamente conectada.
          </p>
          <p
            className="mt-10 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-primary/70"
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

  // Continuous index across steps (0 → steps.length - 1).
  const pos = progress * (steps.length - 1);
  const active = Math.min(steps.length - 1, Math.max(0, Math.round(pos)));

  return (
    <div
      ref={ref}
      className="relative"
      style={{ height: `${steps.length * 90 + 40}vh` }}
    >
      <div className="sticky top-16 md:top-20 h-[calc(100dvh-4rem)] md:h-[calc(100dvh-5rem)] w-full overflow-hidden">
        <div className="mx-auto grid h-full max-w-7xl grid-cols-1 items-center gap-6 px-4 sm:px-6 lg:grid-cols-[280px_1fr] lg:gap-12 lg:px-8">
          {/* Left rail */}
          <aside className="relative hidden lg:block">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-primary/70">
              Etapas do protocolo
            </p>
            <ol className="relative mt-6 space-y-4 border-l border-primary/15 pl-6">
              {steps.map((s, i) => {
                const isActive = i === active;
                const isPast = i < active;
                return (
                  <li key={s.title} className="relative">
                    <span
                      className={`absolute -left-[30px] top-1 flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-500 ${
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
                      className={`block text-[0.65rem] font-semibold uppercase tracking-[0.22em] transition-colors ${
                        isActive ? "text-primary" : "text-muted-foreground/70"
                      }`}
                    >
                      Etapa {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`mt-0.5 block text-sm leading-snug transition-colors ${
                        isActive
                          ? "font-medium text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {s.title}
                    </span>
                  </li>
                );
              })}
            </ol>
            <div className="mt-8 flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-primary/70">
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
                      className={`mx-auto max-w-2xl rounded-3xl border p-8 sm:p-10 backdrop-blur transition-colors duration-500 ${
                        isActive
                          ? "border-primary/40 bg-card shadow-[0_30px_60px_-30px_rgba(70,50,120,0.45)]"
                          : "border-primary/10 bg-card/60"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <step.icon className="h-6 w-6" />
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
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
                      <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
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


