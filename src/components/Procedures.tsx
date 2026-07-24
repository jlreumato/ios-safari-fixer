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
      { label: "Artrose", slug: "artrose" },
      { label: "Osteoporose", slug: "osteoporose" },
      { label: "Dores musculares", slug: "dores-musculares" },
    ],
  },
  {
    label: "Joelho",
    image: joelhoImg,
    desc: "Viscossuplementação, corticoide e PRP para gonartrose, meniscopatias e tendinite patelar.",
    links: [
      { label: "Artrose", slug: "artrose" },
      { label: "Dores musculares", slug: "dores-musculares" },
      { label: "Gota", slug: "gota" },
    ],
  },
  {
    label: "Ombro",
    image: ombroImg,
    desc: "Infiltração subacromial e intra-articular para bursite, tendinite do manguito e capsulite adesiva.",
    links: [
      { label: "Dores musculares", slug: "dores-musculares" },
      { label: "Artrite Reumatoide", slug: "artrite-reumatoide" },
      { label: "Artrose", slug: "artrose" },
    ],
  },
  {
    label: "Punho e Mãos",
    image: maosImg,
    desc: "Bloqueios para tenossinovite de De Quervain, dedo em gatilho, síndrome do túnel do carpo e rizartrose.",
    links: [
      { label: "Artrite Reumatoide", slug: "artrite-reumatoide" },
      { label: "Artrite Psoriásica", slug: "artrite-psoriasica" },
      { label: "Artrose", slug: "artrose" },
    ],
  },
  {
    label: "Pés e Tornozelos",
    image: pesImg,
    desc: "Tratamento de fascite plantar, tendinite aquiliana, esporão calcâneo e artroses do médio/retropé.",
    links: [
      { label: "Gota", slug: "gota" },
      { label: "Artrite Psoriásica", slug: "artrite-psoriasica" },
      { label: "Dores musculares", slug: "dores-musculares" },
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

          {/* Mobile — horizontal snap slider (foto + links) */}
          <div className="absolute inset-x-0 bottom-0 top-[46%] overflow-hidden lg:hidden">
            <div
              className="flex h-full w-full snap-x snap-mandatory overflow-x-auto"
              style={{ scrollbarWidth: "none", touchAction: "pan-x" }}
              aria-label="Áreas em evidência — arraste para navegar"
            >
              {joints.map((j) => (
                <div
                  key={j.label}
                  className="relative flex h-full w-full shrink-0 snap-center flex-col"
                  style={{ minWidth: "100%" }}
                >
                  <div
                    className="relative mx-auto mt-2 h-[62%] w-[86%] overflow-hidden rounded-3xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-primary/25"
                    style={{
                      backgroundImage: `url(${j.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="mx-auto mt-4 flex w-[86%] flex-col gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#e7d9b5]">
                      {j.label}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {j.links.map((l) => (
                        <a
                          key={l.slug}
                          href={`/tratamentos/${l.slug}`}
                          className="rounded-full border border-white/25 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/90 transition-colors hover:border-primary hover:text-primary"
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>

        {/* Text overlay — starts centered, slides into the LEFT column */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex h-1/2 items-center lg:inset-0 lg:h-full">
          <div
            className="w-full lg:w-1/2 px-6 sm:px-10 lg:px-16"
            style={{
              transform: `translateX(${slide * 0}%)`,
            }}
          >
            {/* On lg+ the wrapper starts translated 50% to the right (centered on viewport)
                and slides back to 0 (left column) as the user scrolls. */}
            <div
              className="mx-auto max-w-xl text-center lg:text-left"
              style={{
                transform: `translateX(var(--tx, 0px))`,
              }}
            >
              <div
                style={{
                  // custom prop consumed above; only apply the horizontal offset on lg screens via inline vars
                  ["--tx" as string]: `${(1 - slide) * 50}vw`,
                }}
              >
                <p className="text-base font-semibold uppercase tracking-[0.24em] text-[#e7d9b5] [text-shadow:0_1px_10px_rgba(0,0,0,0.6)]">
                  Procedimentos · Área em evidência
                </p>
                <h3
                  key={current.label}
                  className="mt-3 text-5xl font-normal tracking-tight text-white sm:text-6xl lg:text-7xl animate-in fade-in slide-in-from-bottom-2 duration-500 [text-shadow:0_2px_20px_rgba(0,0,0,0.65)]"
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

                {/* Desktop-only links menu — replaces progress + counter */}
                <div className="mt-8 hidden flex-wrap gap-3 lg:flex" key={`${current.label}-links`}>
                  {current.links.map((l) => (
                    <a
                      key={l.slug}
                      href={`/tratamentos/${l.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-5 py-2.5 text-sm font-medium uppercase tracking-[0.14em] text-white/90 transition-all hover:border-primary hover:bg-primary/10 hover:text-primary"
                    >
                      {l.label}
                      <ChevronRight className="h-3.5 w-3.5" />
                    </a>
                  ))}
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
        <FlipIntro />
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
 * "Programa TransformaDOR" — the whole heading flips laterally (Y-axis) on
 * scroll. The back face reveals the "Etapas da Transformação" prelude,
 * seamlessly handing off to the JourneyStage that follows.
 */
function FlipIntro() {
  const { ref, progress } = useScrollProgress();

  // One-scroll flip: 0 → 180deg with slight easing.
  const eased = Math.min(1, progress * 1.25);
  const angle = eased * 180;
  const showBack = eased > 0.5;

  return (
    <div ref={ref} className="relative" style={{ height: "160vh" }}>
      <div
        className="sticky top-0 flex h-[100dvh] w-full items-center justify-center overflow-hidden"
        style={{ perspective: "1600px" }}
      >
        {/* Ambient decor */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -top-24 left-[8%] h-80 w-80 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl" />
          <div className="absolute bottom-10 right-[5%] h-96 w-96 rounded-full bg-gradient-to-tr from-amber-200/30 to-pink-200/20 blur-3xl" />
        </div>

        <div
          className="relative mx-auto w-full max-w-6xl px-4"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(-${angle}deg)`,
            transition: "transform 200ms linear",
            willChange: "transform",
          }}
        >
          {/* FRONT — Programa TransformaDOR */}
          <div
            className="text-center"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              opacity: showBack ? 0 : 1,
              transition: "opacity 200ms linear",
            }}
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
              role para virar a página ↻
            </p>
          </div>

          {/* BACK — Etapa 1 já em exibição (mesma sessão) */}
          <div
            className="absolute inset-0 flex items-center justify-center px-4"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              opacity: showBack ? 1 : 0,
              transition: "opacity 200ms linear",
            }}
          >
            <div className="mx-auto max-w-2xl rounded-3xl border-2 border-[#2a2730] bg-transparent p-8 sm:p-10 shadow-[0_30px_60px_-30px_rgba(30,25,40,0.35)]">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary/80">
                Etapas da Transformação
              </p>
              <div className="mt-4 flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {(() => {
                    const Icon = journey[0].icon;
                    return <Icon className="h-6 w-6" />;
                  })()}
                </span>
                <span className="text-base font-semibold uppercase tracking-[0.24em] text-primary/70">
                  Etapa 01 / {String(journey.length).padStart(2, "0")}
                </span>
              </div>
              <h4
                className="mt-5 text-4xl leading-tight text-foreground sm:text-5xl"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {journey[0].title}
              </h4>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {journey[0].desc}
              </p>
            </div>
          </div>
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
  const scrollPos = progress * (steps.length - 1);
  const active = Math.min(steps.length - 1, Math.max(0, Math.round(scrollPos)));
  const pos = scrollPos;

  return (
    <>
      {/* MOBILE — horizontal snap slider, sem transparências ou hijack de scroll */}
      <div className="lg:hidden px-4 sm:px-6 pb-12">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-primary/80">
          Etapas da Transformação
        </p>
        <div
          className="-mx-4 sm:-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 sm:px-6 pb-4"
          style={{ scrollbarWidth: "none", touchAction: "pan-x" }}
        >
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="snap-center shrink-0"
              style={{ width: "82vw" }}
            >
              <div className="h-full rounded-3xl border-2 border-[#2a2730] bg-background/40 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                    <step.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/80">
                    Etapa {String(i + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                  </span>
                </div>
                <h4
                  className="mt-5 text-3xl leading-tight text-foreground"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {step.title}
                </h4>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP — sticky vertical slider (sem fade-in nem hover) */}
      <div
        ref={ref}
        className="relative hidden lg:block"
        style={{ height: `${steps.length * 90 + 40}vh` }}
      >
        <div className="sticky top-20 h-[calc(100dvh-5rem)] w-full overflow-hidden">
          <div className="mx-auto grid h-full max-w-7xl grid-cols-[280px_1fr] items-center gap-12 px-8">
            {/* Left rail */}
            <aside className="relative">
              <p className="text-base font-semibold uppercase tracking-[0.28em] text-primary/70">
                Etapas da Transformação
              </p>
              <ol className="relative mt-6 space-y-4 border-l border-primary/15 pl-6">
                {steps.map((s, i) => {
                  const isActive = i === active;
                  const isPast = i < active;
                  return (
                    <li key={s.title} className="relative">
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
                          isActive ? "text-foreground" : "text-muted-foreground/80"
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
                      className="absolute inset-x-0"
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
                        className={`mx-auto max-w-2xl rounded-3xl border-2 bg-transparent p-10 transition-colors duration-500 ${
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
                          className="mt-5 text-4xl leading-tight text-foreground"
                          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                          {step.title}
                        </h4>
                        <p className="mt-4 text-xl leading-relaxed text-muted-foreground">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



