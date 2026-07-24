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

type JointLink = { label: string; slug: string };

const joints: {
  label: string;
  image: string;
  desc: string;
  links: JointLink[];
}[] = [
  {
    label: "Quadril",
    image: quadrilImg,
    desc: "Infiltrações guiadas por ultrassom para bursites trocantéricas, tendinopatias e osteoartrose coxofemoral.",
    links: [
      { label: "Infiltração Trocantérica", slug: "infiltracao-ultrassom" },
      { label: "Viscossuplementação de Quadril", slug: "viscossuplementacao" },
      { label: "PRP Coxofemoral", slug: "prp" },
    ],
  },
  {
    label: "Joelho",
    image: joelhoImg,
    desc: "Viscossuplementação, corticoide e PRP para gonartrose, meniscopatias e tendinite patelar.",
    links: [
      { label: "Viscossuplementação de Joelho", slug: "viscossuplementacao" },
      { label: "Infiltração Intra-articular", slug: "infiltracao-ultrassom" },
      { label: "PRP de Joelho", slug: "prp" },
    ],
  },
  {
    label: "Ombro",
    image: ombroImg,
    desc: "Infiltração subacromial e intra-articular para bursite, tendinite do manguito e capsulite adesiva.",
    links: [
      { label: "Infiltração Subacromial", slug: "infiltracao-ultrassom" },
      { label: "Infiltração Intra-articular", slug: "infiltracao-ultrassom" },
      { label: "Bloqueio do Supraescapular", slug: "bloqueios-anestesicos" },
    ],
  },
  {
    label: "Punho e Mãos",
    image: maosImg,
    desc: "Bloqueios para tenossinovite de De Quervain, dedo em gatilho, síndrome do túnel do carpo e rizartrose.",
    links: [
      { label: "Bloqueio do Túnel do Carpo", slug: "bloqueios-anestesicos" },
      { label: "Infiltração de Dedo em Gatilho", slug: "infiltracao-ultrassom" },
      { label: "Infiltração da Rizartrose", slug: "infiltracao-ultrassom" },
    ],
  },
  {
    label: "Pés e Tornozelos",
    image: pesImg,
    desc: "Tratamento de fascite plantar, tendinite aquiliana, esporão calcâneo e artroses do médio/retropé.",
    links: [
      { label: "Infiltração da Fascite Plantar", slug: "infiltracao-ultrassom" },
      { label: "Bloqueio do Nervo Tibial", slug: "bloqueios-anestesicos" },
      { label: "PRP do Tendão de Aquiles", slug: "prp" },
    ],
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
  const [hovered, setHovered] = useState(false);

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
  void progress;


  return (
    <div
      ref={stageRef}
      className="relative"
      style={{ height: `${joints.length * 60}vh` }}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        <div className="grid h-full w-full grid-cols-1 lg:grid-cols-2">
          {/* LEFT column reserved for text */}
          <div className="relative hidden h-full lg:block" aria-hidden />

          {/* RIGHT column — image with hover-reveal links */}
          <div
            className="relative hidden h-full w-full overflow-hidden lg:block"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
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

            {/* Hover overlay — procedure links, sophisticated modern (sharp edges) */}
            <div
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a1229]/85 via-[#1a1229]/70 to-[#2b1e40]/80 p-12 backdrop-blur-md transition-opacity duration-500"
              style={{ opacity: hovered ? 1 : 0, pointerEvents: hovered ? "auto" : "none" }}
            >
              <div className="w-full max-w-lg">
                <div className="mb-8 flex items-center gap-4">
                  <span className="h-px flex-1 bg-[#e7d9b5]/40" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#e7d9b5]">
                    Procedimentos indicados
                  </p>
                  <span className="h-px flex-1 bg-[#e7d9b5]/40" />
                </div>
                <ul className="flex flex-col divide-y divide-white/10 border-y border-white/10">
                  {current.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={`/procedimentos#${l.slug}`}
                        className="group/link flex items-center justify-between gap-4 py-4 transition-colors hover:text-[#e7d9b5]"
                      >
                        <span className="text-lg font-light tracking-wide text-white/95">
                          {l.label}
                        </span>
                        <span className="flex items-center gap-3 text-[#e7d9b5]/70 transition-all group-hover/link:text-[#e7d9b5]">
                          <span className="h-px w-6 bg-[#e7d9b5]/60 transition-all group-hover/link:w-12" />
                          <ChevronRight className="h-4 w-4" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  href="/procedimentos"
                  className="mt-10 inline-flex items-center gap-3 border border-[#e7d9b5]/60 px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#e7d9b5] transition-colors hover:border-[#e7d9b5] hover:bg-[#e7d9b5]/10"
                >
                  Ver todos os procedimentos
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Mobile — snap slider with links overlaid on image */}
          <div className="absolute inset-x-0 bottom-0 top-[40%] overflow-hidden lg:hidden">
            <div
              className="flex h-full w-full snap-x snap-mandatory overflow-x-auto"
              style={{ scrollbarWidth: "none", touchAction: "pan-x" }}
              aria-label="Áreas em evidência — arraste para navegar"
            >
              {joints.map((j) => (
                <div
                  key={j.label}
                  className="relative flex h-full w-full shrink-0 snap-center items-stretch justify-center px-4"
                  style={{ minWidth: "100%" }}
                >
                  <div
                    className="relative h-full w-full overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-primary/25"
                    style={{
                      backgroundImage: `url(${j.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {/* Links overlaid on image */}
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#1a1229]/95 via-[#1a1229]/55 to-transparent p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e7d9b5]">
                        {j.label} · Procedimentos
                      </p>
                      <ul className="mt-4 flex flex-col divide-y divide-white/10 border-y border-white/10">
                        {j.links.map((l) => (
                          <li key={l.label}>
                            <a
                              href={`/procedimentos#${l.slug}`}
                              className="flex items-center justify-between gap-3 py-3 text-sm font-light text-white/95"
                            >
                              <span>{l.label}</span>
                              <ChevronRight className="h-3.5 w-3.5 text-[#e7d9b5]" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Text overlay — left aligned */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex h-[40%] items-center lg:inset-0 lg:h-full">
          <div className="w-full lg:w-1/2 px-6 sm:px-10 lg:px-16">
            <div className="max-w-xl text-left">
              <div>
                <p className="text-base font-semibold uppercase tracking-[0.24em] text-[#e7d9b5] [text-shadow:0_1px_10px_rgba(0,0,0,0.6)]">
                  Procedimentos · Área em evidência
                </p>
                <h3
                  key={current.label}
                  className="mt-3 text-5xl font-normal tracking-tight text-white sm:text-6xl lg:text-7xl animate-in fade-in duration-500 [text-shadow:0_2px_20px_rgba(0,0,0,0.65)]"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {current.label}
                </h3>
                <p
                  key={current.desc}
                  className="mt-5 hidden text-lg leading-relaxed text-white/95 lg:block sm:text-xl [text-shadow:0_1px_10px_rgba(0,0,0,0.7)]"
                >
                  {current.desc}
                </p>
                <p className="mt-6 hidden text-xs font-semibold uppercase tracking-[0.24em] text-white/60 lg:block">
                  passe o mouse sobre a imagem para ver os procedimentos →
                </p>
                <a
                  href="/procedimentos"
                  className="pointer-events-auto mt-8 hidden lg:inline-flex items-center gap-3 border-2 border-[#e7d9b5]/70 px-7 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#e7d9b5] transition-all hover:border-primary hover:bg-primary/10 hover:text-primary"
                >
                  Ver todos os procedimentos
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Mobile — "Ver todos" button */}
        <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center lg:hidden">
          <a
            href="/procedimentos"
            className="pointer-events-auto inline-flex items-center gap-2 border-2 border-[#e7d9b5]/70 bg-[#1a1229]/70 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#e7d9b5] backdrop-blur"
          >
            Ver todos os procedimentos
            <ChevronRight className="h-3.5 w-3.5" />
          </a>
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
      {/* Programa TransformaDOR — arrow slices DOR while Etapas slide in from the right */}
      <div id="protocolo" className="relative">
        <ArrowSliceReveal steps={journey} />
      </div>

      {/* Procedimentos — Áreas em evidência (merged) */}
      <JointsWheel />
    </section>
  );
}


/**
 * Sticky reveal: an arrow slides from right to left, "cutting" the word DOR.
 * As it passes, the Programa TransformaDOR intro is clipped away and the
 * Etapas da Transformação grid (with its own nav menu) slides in from the right.
 */
function ArrowSliceReveal({ steps }: { steps: JourneyStep[] }) {
  const { ref, progress } = useScrollProgress();

  // Phase split: arrow slice 0→0.2, cylinder rotation 0.2→1.0.
  const arrowP = Math.max(0, Math.min(1, progress / 0.2));
  const cylP = Math.max(0, Math.min(1, (progress - 0.2) / 0.8));
  const activeStep = Math.min(steps.length - 1, Math.floor(cylP * steps.length * 0.9999));

  const arrowX = 100 - arrowP * 100;
  const introClip = `inset(0 ${arrowP * 100}% 0 0)`;
  const stepsClip = `inset(0 0 0 ${arrowX}%)`;

  return (
    <div ref={ref} className="relative" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        {/* Layer A — Programa TransformaDOR intro (revealed out) */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
          style={{ clipPath: introClip, WebkitClipPath: introClip }}
        >
          <p className="text-base font-semibold uppercase tracking-[0.28em] text-primary">
            Programa
          </p>
          <h3
            className="mt-4 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 font-normal tracking-tight text-foreground"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            <span style={{ fontSize: "clamp(3rem, 14vw, 14rem)", lineHeight: 1 }}>
              Transforma
            </span>
            <span
              className="inline-block bg-gradient-to-br from-primary via-primary/80 to-amber-500 bg-clip-text font-semibold text-transparent"
              style={{ fontSize: "clamp(3.5rem, 18vw, 18rem)", lineHeight: 1 }}
            >
              DOR
            </span>
          </h3>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Da primeira consulta ao trabalho em rede com fisioterapeuta, nutricionista,
            psicólogo e psiquiatras — cada etapa cuidadosamente conectada.
          </p>
          <p className="mt-10 text-sm font-semibold uppercase tracking-[0.28em] text-primary/70">
            role para revelar →
          </p>
        </div>

        {/* Layer B — Etapas da Transformação (revealed in from the right) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: stepsClip, WebkitClipPath: stepsClip }}
        >
          <StepsReveal steps={steps} active={activeStep} cylProgress={cylP} />
        </div>

        {/* Slicing arrow — only visible during arrow phase */}
        <div
          className="pointer-events-none absolute inset-y-0 z-10"
          style={{
            left: `${arrowX}%`,
            transform: "translateX(-50%)",
            opacity: arrowP < 1 ? 1 : 0,
            transition: "left 60ms linear, opacity 300ms ease",
          }}
        >
          <div
            className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, #e7d9b5 20%, #e7d9b5 80%, transparent 100%)",
              boxShadow: "0 0 24px 2px rgba(231,217,181,0.55)",
            }}
          />
          <div
            className="absolute top-1/2 flex -translate-y-1/2 items-center gap-2"
            style={{ right: "calc(50% + 6px)" }}
          >
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.32em] text-[#e7d9b5] sm:inline">
              Etapas
            </span>
            <span
              className="flex h-12 w-12 items-center justify-center border-2 border-[#e7d9b5] bg-[#1a1229]/70 text-[#e7d9b5] backdrop-blur"
              style={{ boxShadow: "0 0 30px rgba(231,217,181,0.35)" }}
            >
              <ChevronRight className="h-5 w-5 rotate-180" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepsReveal({
  steps,
  active,
  cylProgress,
}: {
  steps: JourneyStep[];
  active: number;
  cylProgress: number;
}) {
  // Vertical cylinder — one card visible at a time, rotating on X axis.
  const anglePerCard = 360 / steps.length;
  const rotation = cylProgress * (steps.length - 1) * anglePerCard;
  const radius = 560;

  // Fill progress for the vertical timeline (0 → 1 across all steps).
  const fillPct = steps.length > 1 ? (active / (steps.length - 1)) * 100 : 0;

  return (
    <div className="relative flex h-full w-full flex-col bg-transparent">
      {/* Header */}
      <div className="px-6 pt-10 sm:px-10 lg:px-16 lg:pt-14">
        <p className="text-base font-semibold uppercase tracking-[0.28em] text-primary sm:text-lg">
          Etapas da Transformação
        </p>
        <h3
          className="mt-3 text-5xl font-normal tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          8 Etapas para se <span className="italic text-primary">libertar da dor</span>
        </h3>
      </div>

      {/* Body: full-height nav + cylinder */}
      <div className="grid flex-1 grid-cols-1 gap-6 px-6 pb-10 pt-6 sm:px-10 lg:grid-cols-[440px_1fr] lg:gap-14 lg:px-16 lg:pb-14">
        {/* Nav menu — vertical timeline with connecting line + filled squares */}
        <nav
          className="relative hidden lg:flex lg:flex-col lg:h-full"
          aria-label="Etapas"
        >
            {/* Timeline track — background line */}
            <div className="pointer-events-none absolute left-[22px] top-3 bottom-3 w-px bg-white/10" />
            {/* Timeline track — filled portion */}
            <div
              className="pointer-events-none absolute left-[22px] top-3 w-px bg-[#e7d9b5] transition-[height] duration-500"
              style={{
                height: `calc((100% - 24px) * ${fillPct / 100})`,
                boxShadow: "0 0 12px rgba(231,217,181,0.6)",
              }}
            />
            {steps.map((s, i) => {
              const isActive = i === active;
              const isPassed = i <= active;
              return (
                <div
                  key={s.title}
                  className={`relative flex flex-1 items-center gap-5 border pl-14 pr-6 transition-all duration-500 ${
                    isActive
                      ? "border-[#e7d9b5] bg-[#e7d9b5]/[0.07] text-foreground"
                      : "border-white/10 text-muted-foreground"
                  }`}
                  style={{ minHeight: 0 }}
                >
                  {/* Filled square marker on the timeline */}
                  <span
                    className={`absolute left-[15px] top-1/2 h-3.5 w-3.5 -translate-y-1/2 border transition-all duration-500 ${
                      isPassed
                        ? "border-[#e7d9b5] bg-[#e7d9b5]"
                        : "border-white/25 bg-transparent"
                    }`}
                    style={
                      isPassed
                        ? { boxShadow: "0 0 14px rgba(231,217,181,0.6)" }
                        : undefined
                    }
                    aria-hidden
                  />
                  <span
                    className={`text-sm font-semibold uppercase tracking-[0.32em] ${
                      isActive ? "text-[#e7d9b5]" : "text-primary/60"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-xl font-normal leading-tight tracking-tight"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {s.title}
                  </span>
                </div>
              );
            })}
        </nav>

        {/* Mobile — horizontal nav */}
        <nav
          className="flex gap-3 overflow-x-auto lg:hidden"
          style={{ scrollbarWidth: "none", touchAction: "pan-x" }}
          aria-label="Etapas"
        >
          {steps.map((s, i) => {
            const isActive = i === active;
            return (
              <div
                key={s.title}
                className={`flex shrink-0 items-center gap-3 border py-2 pl-3 pr-4 text-left ${
                  isActive
                    ? "border-[#e7d9b5] bg-[#e7d9b5]/[0.06] text-foreground"
                    : "border-white/10 text-muted-foreground"
                }`}
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="whitespace-nowrap text-sm">{s.title}</span>
              </div>
            );
          })}
        </nav>

        {/* Vertical cylinder stage — one card at a time */}
        <div
          className="relative flex min-h-[60vh] items-center justify-center lg:min-h-0"
          style={{ perspective: "1600px" }}
        >
          <div
            className="relative h-[440px] w-full max-w-[520px]"
            style={{
              transformStyle: "preserve-3d",
              transform: `translateZ(-${radius}px) rotateX(${rotation}deg)`,
              transition: "transform 160ms linear",
              willChange: "transform",
            }}
          >
            {steps.map((s, i) => {
              const angle = i * anglePerCard;
              const isActive = i === active;
              return (
                <div
                  key={s.title}
                  className="absolute inset-0 flex flex-col justify-between border p-10"
                  style={{
                    transform: `rotateX(${-angle}deg) translateZ(${radius}px)`,
                    backfaceVisibility: "hidden",
                    borderColor: isActive
                      ? "rgba(231,217,181,0.85)"
                      : "rgba(255,255,255,0.12)",
                    background: isActive
                      ? "rgba(231,217,181,0.06)"
                      : "rgba(20,15,32,0.55)",
                    boxShadow: isActive
                      ? "0 40px 80px -20px rgba(0,0,0,0.6)"
                      : "none",
                    transition: "border-color 400ms ease, background 400ms ease",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex h-14 w-14 items-center justify-center border ${
                        isActive
                          ? "border-[#e7d9b5] text-[#e7d9b5]"
                          : "border-white/20 text-white/60"
                      }`}
                    >
                      <s.icon className="h-6 w-6" />
                    </span>
                    <span className="text-sm font-semibold uppercase tracking-[0.32em] text-primary/80">
                      Etapa {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h4
                      className="text-4xl leading-tight text-foreground lg:text-5xl"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {s.title}
                    </h4>
                    <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
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




