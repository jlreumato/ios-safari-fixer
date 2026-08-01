import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
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
import { useInView } from "@/hooks/useInView";
import { useIsMobile } from "@/hooks/use-mobile";


import quadrilImg from "@/assets/joints/quadril.jpg";
import joelhoImg from "@/assets/joints/joelho.jpg";
import ombroImg from "@/assets/joints/ombro.jpg";
import maosImg from "@/assets/joints/maos.jpg";
import pesImg from "@/assets/joints/pes.jpg";

type JointLink = { label: string; slug: string };

/** Dispositivos de toque (iOS Safari incluso) não lidam bem com blurs
 *  grandes animados: reduzimos o raio e congelamos a rotação da aurora. */
const REDUCE_FX =
  typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

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
  // Sub-progress inside the active area (0 → 1): drives the slice choreography.
  const local = Math.max(0, Math.min(1, progress * joints.length - active));
  const SLICES = 6;

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

          {/* RIGHT column — sliced kinetic image with hover-reveal links */}
          <div
            className="relative hidden h-full w-full overflow-hidden lg:block"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {joints.map((j, i) => {
              const isActive = i === active;
              const isPrev = i === active - 1;
              if (!isActive && !isPrev) return null;
              return (
                <div key={j.label} className="absolute inset-0" aria-hidden={!isActive}>
                  {Array.from({ length: SLICES }).map((_, s) => {
                    // Stagger: each slice enters slightly after the previous one.
                    const span = 1 / (SLICES * 0.9);
                    const start = (s / SLICES) * (1 - span) * 0.9;
                    const raw = (local - start) / span;
                    const e = 1 - Math.pow(1 - Math.max(0, Math.min(1, raw)), 3);
                    const dir = s % 2 === 0 ? -1 : 1;
                    // Active slice slides into place; previous one keeps sliding out.
                    const shift = isActive ? (1 - e) * 100 * dir : -e * 100 * dir;
                    const top = (s / SLICES) * 100;
                    return (
                      <div
                        key={s}
                        className="absolute left-0 w-full overflow-hidden"
                        style={{
                          top: `${top}%`,
                          height: `${100 / SLICES + 0.2}%`,
                          transform: `translate3d(${shift}%, 0, 0)`,
                          opacity: isActive ? Math.min(1, e * 1.4) : Math.max(0, 1 - e * 1.4),
                          willChange: "transform, opacity",
                        }}
                      >
                        <div
                          className="absolute left-0 w-full"
                          style={{
                            top: `-${top}%`,
                            height: `${100 * SLICES}%`,
                            backgroundImage: `url(${j.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            transform: `scale(${isActive ? 1 + (1 - e) * 0.06 : 1.02})`,
                            transformOrigin: "center",
                          }}
                        />
                      </div>
                    );
                  })}
                  {/* Thin champagne seams between the slices */}
                  {Array.from({ length: SLICES - 1 }).map((_, s) => (
                    <span
                      key={`seam-${s}`}
                      className="pointer-events-none absolute left-0 h-px w-full"
                      style={{
                        top: `${((s + 1) / SLICES) * 100}%`,
                        background:
                          "linear-gradient(90deg, transparent, rgba(231,217,181,0.55), transparent)",
                        opacity: isActive ? Math.max(0, 1 - local * 2) : 0,
                      }}
                    />
                  ))}
                </div>
              );
            })}
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
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <section
      ref={ref}
      id="procedimentos"
      className={`bg-parallax-fixed relative transition-opacity duration-700 ease-out ${
        inView ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 15%, hsl(260 45% 22% / 0.75), transparent 55%),
          radial-gradient(circle at 80% 40%, hsl(40 40% 30% / 0.35), transparent 55%),
          radial-gradient(circle at 30% 85%, hsl(275 40% 20% / 0.7), transparent 55%),
          linear-gradient(160deg, hsl(258 40% 12%) 0%, hsl(268 35% 15%) 55%, hsl(255 40% 10%) 100%)
        `,
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
    <div ref={ref} className="relative" style={{ height: "800vh" }}>
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
  // Diagonal deck: the cards are queued in a diagonal line (desktop) or
  // stacked vertically (mobile). Scrolling down makes the front card slide
  // out, revealing the next one already in place behind it.
  const isMobile = useIsMobile();
  const totalSteps = steps.length;
  const progress = cylProgress * (totalSteps - 1);
  const currentIdx = Math.min(totalSteps - 1, Math.max(0, Math.floor(progress)));
  const t = Math.min(1, Math.max(0, progress - currentIdx)); // 0 → 1 transition

  // Fill progress for the vertical timeline (0 → 1 across all steps).
  const fillPct = totalSteps > 1 ? (active / (totalSteps - 1)) * 100 : 0;

  const ease = (x: number) => 1 - Math.pow(1 - x, 3); // easeOutCubic

  // Mobile nav: slide the active step label into view horizontally.
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const item = nav.children[active] as HTMLElement | undefined;
    if (!item) return;
    const left = item.offsetLeft - (nav.clientWidth - item.offsetWidth) / 2;
    nav.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [active]);

  /** rel: continuous deck position. 0 = front, negative = leaving, >0 = queued. */
  const deckStyle = (rel: number): CSSProperties => {
    if (rel < 0) {
      // Exiting card: slides diagonally out (up-left on desktop, up on mobile).
      const e = ease(Math.min(1, -rel));
      return {
        transform: isMobile
          ? `translate3d(0, ${-e * 60}%, 0) scale(${1 + e * 0.06}) rotate(${-e * 3}deg)`
          : `translate3d(${-e * 62}%, ${-e * 26}%, 0) rotate(${-e * 9}deg) scale(${1 + e * 0.04})`,
        opacity: Math.max(0, 1 - e * 1.25),
        filter: e > 0.05 ? `blur(${e * 6}px)` : undefined,
        zIndex: 60,
      };
    }
    const d = Math.min(4, rel);
    const dx = isMobile ? 0 : d * 7;
    const dy = isMobile ? d * 5.5 : d * 6;
    return {
      transform: `translate3d(${dx}%, ${dy}%, 0) scale(${1 - d * 0.05}) rotate(${
        isMobile ? 0 : d * 1.2
      }deg)`,
      opacity: Math.max(0, 1 - d * 0.24),
      filter: d > 0.15 ? `blur(${Math.min(4, d * 1.4)}px)` : undefined,
      zIndex: 60 - Math.round(d * 10),
    };
  };

  const renderCard = (i: number, rel: number) => {
    const s = steps[i];
    const num = String(i + 1).padStart(2, "0");
    const isFront = rel < 0.5;

    return (
      <div
        key={`deck-${i}`}
        className="ios-clip absolute inset-0 overflow-hidden"
        style={{
          ...deckStyle(rel),
          transformOrigin: "center center",
          transition: "transform 120ms linear, opacity 120ms linear, filter 160ms linear",
          willChange: "transform, opacity, filter",
          boxShadow:
            "0 40px 90px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(231,217,181,0.16)",
        }}
        aria-hidden={!isFront}
      >
        {/* Card backdrop */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(20,15,32,0.96) 0%, rgba(30,20,50,0.94) 100%)",
          }}
        />
        {/* Aurora glow */}
        <div
          className="pointer-events-none absolute -inset-24 opacity-70"
          style={
            REDUCE_FX
              ? {
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(142,130,184,0.38), transparent 62%)," +
                    "radial-gradient(circle at 72% 38%, rgba(231,217,181,0.26), transparent 60%)," +
                    "radial-gradient(circle at 45% 78%, rgba(74,53,120,0.42), transparent 65%)",
                  transform: `rotate(${(i * 47) % 360}deg)`,
                }
              : {
                  background:
                    "conic-gradient(from 210deg at 50% 45%, rgba(142,130,184,0.35), rgba(231,217,181,0.28), rgba(74,53,120,0.35), rgba(231,217,181,0.2), rgba(142,130,184,0.35))",
                  filter: "blur(60px)",
                  WebkitFilter: "blur(60px)",
                  transform: `rotate(${(i * 47) % 360}deg)`,
                }
          }
        />

        {/* Corner brackets */}
        {(["tl", "tr", "bl", "br"] as const).map((c) => (
          <span
            key={c}
            aria-hidden
            className="pointer-events-none absolute h-5 w-5"
            style={{
              top: c.startsWith("t") ? -1 : undefined,
              bottom: c.startsWith("b") ? -1 : undefined,
              left: c.endsWith("l") ? -1 : undefined,
              right: c.endsWith("r") ? -1 : undefined,
              borderTop: c.startsWith("t") ? "2px solid #e7d9b5" : undefined,
              borderBottom: c.startsWith("b") ? "2px solid #e7d9b5" : undefined,
              borderLeft: c.endsWith("l") ? "2px solid #e7d9b5" : undefined,
              borderRight: c.endsWith("r") ? "2px solid #e7d9b5" : undefined,
              boxShadow: "0 0 12px rgba(231,217,181,0.55)",
            }}
          />
        ))}

        {/* Giant outlined number */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none text-[clamp(240px,40vh,480px)] font-bold leading-none tracking-tighter"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(231,217,181,0.28)",
            textShadow: "0 0 40px rgba(231,217,181,0.12)",
          }}
        >
          {num}
        </div>

        {/* Content */}
        <div className="relative flex h-full w-full flex-col justify-between px-8 py-10 sm:px-10">
          <div className="flex items-center gap-4">
            <span className="relative flex h-14 w-14 items-center justify-center">
              <span
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "conic-gradient(from 0deg, #e7d9b5, rgba(142,130,184,0.9), #e7d9b5, rgba(74,53,120,0.9), #e7d9b5)",
                  animation: isFront ? "spin 6s linear infinite" : undefined,
                  filter: "blur(2px)",
                  opacity: 0.9,
                }}
              />
              <span aria-hidden className="absolute inset-[2px] bg-[#1a1229]" />
              <s.icon className="relative h-6 w-6 text-[#e7d9b5]" />
            </span>
            <div className="flex flex-col">
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#e7d9b5]"
                style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
              >
                Etapa {num} / {String(totalSteps).padStart(2, "0")}
              </span>
              <span className="mt-1 h-px w-16 bg-[#e7d9b5]/60" />
            </div>
          </div>

          <div className="mt-auto">
            <h4
              className="text-4xl leading-tight text-white lg:text-5xl"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {s.title}
            </h4>
            <p className="mt-5 text-lg leading-relaxed text-white/80">{s.desc}</p>
          </div>
        </div>
      </div>
    );
  };

  // Cards currently in the deck: the leaving one plus the queued ones.
  const visible: { i: number; rel: number }[] = [];
  for (let i = Math.max(0, currentIdx - 1); i < totalSteps; i++) {
    const rel = i - currentIdx - t;
    if (rel <= -1 || rel > 4.2) continue;
    visible.push({ i, rel });
  }

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

      {/* Body: full-height nav + diagonal deck */}
      <div className="grid flex-1 grid-cols-1 gap-6 px-6 pb-10 pt-6 sm:px-10 lg:grid-cols-[440px_1fr] lg:gap-14 lg:px-16 lg:pb-14">
        {/* Nav menu — vertical timeline with connecting line + filled squares */}
        <nav
          className="relative hidden lg:flex lg:flex-col lg:h-full"
          aria-label="Etapas"
        >
          <div className="pointer-events-none absolute left-[22px] top-3 bottom-3 w-px bg-white/10" />
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
                  className={`text-base font-semibold uppercase tracking-[0.32em] ${
                    isActive ? "text-[#e7d9b5]" : "text-primary/60"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-2xl font-normal leading-tight tracking-tight lg:text-[1.7rem]"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {s.title}
                </span>

              </div>
            );
          })}
        </nav>

        {/* Mobile — horizontal nav that slides to the active step */}
        <nav
          ref={navRef}
          className="flex gap-3 overflow-x-auto lg:hidden"
          style={{ scrollbarWidth: "none", touchAction: "pan-x" }}
          aria-label="Etapas"
        >
          {steps.map((s, i) => {
            const isActive = i === active;
            return (
              <div
                key={s.title}
                className={`flex shrink-0 items-center gap-3 border py-2 pl-3 pr-4 text-left transition-all duration-500 ${
                  isActive
                    ? "border-[#e7d9b5] bg-[#e7d9b5]/[0.08] text-foreground"
                    : "border-white/10 text-muted-foreground opacity-60"
                }`}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="whitespace-nowrap text-base" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{s.title}</span>

              </div>
            );
          })}
        </nav>

        {/* Diagonal deck stage */}
        <div className="relative flex min-h-[58vh] items-center justify-center lg:min-h-0">
          <div className="relative aspect-[4/5] h-full max-h-[540px] w-full max-w-[520px] lg:max-w-[540px]">
            {visible
              .slice()
              .sort((a, b) => b.rel - a.rel)
              .map(({ i, rel }) => renderCard(i, rel))}
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




