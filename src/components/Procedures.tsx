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
import { journey as journeyData } from "@/data/journey";
import TransformaDor from "@/components/TransformaDor";
import ArcImageCarousel from "@/components/procedures/ArcImageCarousel";



type JointLink = { label: string; slug: string };

/** Dispositivos de toque (iOS Safari incluso) não lidam bem com blurs
 *  grandes animados: reduzimos o raio e congelamos a rotação da aurora. */
const REDUCE_FX =
  typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

const joints: {
  label: string;
  desc: string;
  links: JointLink[];
}[] = [
  {
    label: "Quadril",
    desc: "Infiltrações guiadas por ultrassom para bursites, tendinopatias e osteoartrose.",
    links: [
      { label: "Infiltração Trocantérica", slug: "infiltracao-ultrassom" },
      { label: "Viscossuplementação de Quadril", slug: "viscossuplementacao" },
      { label: "PRP Coxofemoral", slug: "prp" },
    ],
  },
  {
    label: "Joelho",
    desc: "Viscossuplementação, corticoide e PRP para gonartrose e tendinites.",
    links: [
      { label: "Viscossuplementação de Joelho", slug: "viscossuplementacao" },
      { label: "Infiltração Intra-articular", slug: "infiltracao-ultrassom" },
      { label: "PRP de Joelho", slug: "prp" },
    ],
  },
  {
    label: "Ombro",
    desc: "Infiltração subacromial para bursite, manguito rotador e capsulite.",
    links: [
      { label: "Infiltração Subacromial", slug: "infiltracao-ultrassom" },
      { label: "Infiltração Intra-articular", slug: "infiltracao-ultrassom" },
      { label: "Bloqueio do Supraescapular", slug: "bloqueios-anestesicos" },
    ],
  },
  {
    label: "Punho e Mãos",
    desc: "Bloqueios para De Quervain, dedo em gatilho, túnel do carpo e rizartrose.",
    links: [
      { label: "Bloqueio do Túnel do Carpo", slug: "bloqueios-anestesicos" },
      { label: "Infiltração de Dedo em Gatilho", slug: "infiltracao-ultrassom" },
      { label: "Infiltração da Rizartrose", slug: "infiltracao-ultrassom" },
    ],
  },
  {
    label: "Pés e Tornozelos",
    desc: "Fascite plantar, tendinite aquiliana e artroses do médio e retropé.",
    links: [
      { label: "Infiltração da Fascite Plantar", slug: "infiltracao-ultrassom" },
      { label: "Bloqueio do Nervo Tibial", slug: "bloqueios-anestesicos" },
      { label: "PRP do Tendão de Aquiles", slug: "prp" },
    ],
  },
];


const journey = journeyData;


/**
 * Áreas em evidência — sem imagens. Índice tipográfico em tela cheia:
 * o scroll ativa uma área por vez (nome gigante em kinetic reveal) e o
 * mouse cria um halo que segue o cursor sobre linhas finas animadas.
 */
function JointsWheel() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [cursor, setCursor] = useState({ x: 50, y: 50 });

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

  const shown = hoverIndex ?? active;
  const current = joints[shown];
  const localRaw = Math.max(0, Math.min(1, progress * joints.length - active));
  const local = Math.min(1, localRaw / 0.3);
  const e = 1 - Math.pow(1 - local, 3);

  return (
    <div
      ref={stageRef}
      className="relative"
      style={{ height: `${joints.length * 60}vh` }}
    >
      <div
        className="sticky top-0 h-[100dvh] w-full overflow-hidden"
        onMouseMove={(ev) => {
          const r = ev.currentTarget.getBoundingClientRect();
          setCursor({
            x: ((ev.clientX - r.left) / r.width) * 100,
            y: ((ev.clientY - r.top) / r.height) * 100,
          });
        }}
      >
        {/* Halo que segue o cursor */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(28rem 28rem at ${cursor.x}% ${cursor.y}%, rgba(163,129,60,0.16), transparent 70%)`,
            opacity: REDUCE_FX ? 0 : 1,
          }}
          aria-hidden
        />

        {/* Linhas finas horizontais que respiram com o scroll */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="absolute left-0 h-px w-full"
              style={{
                top: `${(i / 14) * 100}%`,
                background:
                  "linear-gradient(90deg, transparent, rgba(163,129,60,0.28), transparent)",
                transform: `scaleX(${0.4 + ((Math.sin(progress * 6 + i) + 1) / 2) * 0.6})`,
                WebkitTransform: `scaleX(${0.4 + ((Math.sin(progress * 6 + i) + 1) / 2) * 0.6})`,
                transformOrigin: i % 2 === 0 ? "left center" : "right center",
              }}
            />
          ))}
        </div>

        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-center px-6 sm:px-10 lg:px-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#a3813c]">
            Procedimentos · Áreas em evidência
          </p>

          {/* Nome gigante da área ativa, em kinetic reveal */}
          <h3
            className="mt-6 overflow-hidden text-[clamp(2.75rem,10vw,7rem)] font-normal leading-[0.95] tracking-tight text-[#2a2233]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            <span
              key={current.label}
              className="block"
              style={{
                transform: `translate3d(0, ${(1 - e) * 40}px, 0)`,
                WebkitTransform: `translate3d(0, ${(1 - e) * 40}px, 0)`,
                opacity: 0.25 + e * 0.75,
                filter: `blur(${(1 - e) * 6}px)`,
              }}
            >
              {current.label}
            </span>
          </h3>

          <p className="mt-5 max-w-[46ch] text-lg font-light leading-relaxed text-[#4a4152] sm:text-xl">
            {current.desc}
          </p>

          {/* Índice de áreas + links dos procedimentos */}
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <ul className="flex flex-col divide-y divide-[#2a2233]/10 border-y border-[#2a2233]/12">
              {joints.map((j, i) => {
                const on = i === shown;
                return (
                  <li key={j.label}>
                    <button
                      type="button"
                      onMouseEnter={() => setHoverIndex(i)}
                      onFocus={() => setHoverIndex(i)}
                      onMouseLeave={() => setHoverIndex(null)}
                      onBlur={() => setHoverIndex(null)}
                      className="group flex w-full items-center justify-between gap-4 py-3 text-left"
                    >
                      <span
                        className={`text-base font-light tracking-wide transition-all duration-300 sm:text-lg ${
                          on ? "text-[#2a2233]" : "text-[#4a4152]/60"
                        }`}
                        style={{ letterSpacing: on ? "0.06em" : undefined }}
                      >
                        {j.label}
                      </span>
                      <span
                        className="h-px bg-[#a3813c]/70 transition-all duration-300"
                        style={{ width: on ? "3.5rem" : "1rem" }}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            <ul
              key={current.label}
              className="flex flex-col divide-y divide-[#2a2233]/10 border-y border-[#2a2233]/12"
            >
              {current.links.map((l, i) => (
                <li
                  key={l.label}
                  style={{
                    opacity: e,
                    transform: `translate3d(${(1 - e) * (12 + i * 6)}px, 0, 0)`,
                    WebkitTransform: `translate3d(${(1 - e) * (12 + i * 6)}px, 0, 0)`,
                  }}
                >
                  <a
                    href={`/procedimentos#${l.slug}`}
                    className="group/link flex items-center justify-between gap-4 py-3 transition-colors hover:text-[#a3813c]"
                  >
                    <span className="text-base font-light tracking-wide text-[#4a4152] sm:text-lg">
                      {l.label}
                    </span>
                    <span className="flex items-center gap-3 text-[#a3813c]/70 transition-all group-hover/link:text-[#a3813c]">
                      <span className="h-px w-5 bg-[#a3813c]/60 transition-all group-hover/link:w-10" />
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <a
            href="/procedimentos"
            className="mt-10 inline-flex w-fit items-center gap-3 border border-[#a3813c]/60 px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a3813c] transition-colors hover:border-[#a3813c] hover:bg-[#a3813c]/10"
          >
            Ver todos os procedimentos
            <ChevronRight className="h-4 w-4" />
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
          radial-gradient(circle at 82% 20%, rgba(231,217,181,0.40), transparent 58%),
          radial-gradient(circle at 12% 82%, rgba(142,130,184,0.12), transparent 60%),
          linear-gradient(160deg, #ffffff 0%, #fbf7ee 50%, #f2e9d8 100%)
        `,
      }}
    >
      {/* Programa TransformaDOR — arrow slices DOR while Etapas slide in from the right */}
      <div id="protocolo" className="relative">
        <ArrowSliceReveal steps={journey} />
      </div>

      {/* Procedimentos — Áreas em evidência (merged) */}
      <ArcImageCarousel />
    </section>
  );
}


/**
 * Reveal "site girado para o lado": a sobrecapa do Programa TransformaDOR
 * gira no eixo Y (como se a página inteira virasse de lado) e, no mesmo
 * movimento, as Etapas da Transformação entram girando do outro lado.
 */
function ArrowSliceReveal({ steps }: { steps: JourneyStep[] }) {
  const { ref, progress } = useScrollProgress();

  // Fase 1 (0 → 0.18): giro lateral. Fase 2 (0.18 → 1): etapas.
  const turnP = Math.max(0, Math.min(1, progress / 0.18));
  const cylP = Math.max(0, Math.min(1, (progress - 0.18) / 0.82));
  const activeStep = Math.min(steps.length - 1, Math.floor(cylP * steps.length * 0.9999));

  const ease = (x: number) => 1 - Math.pow(1 - x, 3);
  const e = ease(turnP);

  const introStyle: CSSProperties = {
    transform: `perspective(1600px) rotateY(${-e * 92}deg) translateZ(${-e * 120}px)`,
    WebkitTransform: `perspective(1600px) rotateY(${-e * 92}deg) translateZ(${-e * 120}px)`,
    transformOrigin: "left center",
    WebkitTransformOrigin: "left center",
    opacity: 1 - e * 0.9,
    pointerEvents: turnP > 0.15 ? "none" : "auto",
    WebkitBackfaceVisibility: "hidden",
    backfaceVisibility: "hidden",
  };

  const stepsStyle: CSSProperties = {
    transform: `perspective(1600px) rotateY(${(1 - e) * 88}deg) translateZ(${-(1 - e) * 120}px)`,
    WebkitTransform: `perspective(1600px) rotateY(${(1 - e) * 88}deg) translateZ(${-(1 - e) * 120}px)`,
    transformOrigin: "right center",
    WebkitTransformOrigin: "right center",
    opacity: 0.1 + e * 0.9,
    pointerEvents: turnP > 0.85 ? "auto" : "none",
    WebkitBackfaceVisibility: "hidden",
    backfaceVisibility: "hidden",
  };

  return (
    <div ref={ref} className="relative h-[480dvh]">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        {/* Sobrecapa — Programa TransformaDOR */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={introStyle}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#a3813c]">
            Programa
          </p>

          <h3 className="mt-8">
            <TransformaDor size="clamp(2.25rem, 11vw, 9rem)" />
          </h3>

          <p className="mx-auto mt-10 max-w-[34ch] text-base font-light leading-relaxed text-[#4a4152] sm:text-lg">
            Oito etapas para transformar dor em liberdade.
          </p>

          <a
            href="/transformador"
            className="mt-12 inline-flex items-center gap-3 border border-[#a3813c]/60 px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.3em] text-[#a3813c] transition-colors hover:bg-[#f2e9d8]"
          >
            Conhecer o Programa
            <ChevronRight className="h-3.5 w-3.5" />
          </a>

          <p className="mt-14 text-[10px] font-medium uppercase tracking-[0.32em] text-[#a3813c]/60">
            role para as etapas
          </p>
        </div>

        {/* Etapas da Transformação */}
        <div className="absolute inset-0 overflow-hidden" style={stepsStyle}>
          <StepsReveal steps={steps} active={activeStep} cylProgress={cylP} />
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
            "0 30px 70px -24px rgba(42,34,51,0.18), 0 0 0 1px rgba(163,129,60,0.18)",
        }}
        aria-hidden={!isFront}
      >
        {/* Card backdrop */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #ffffff 0%, #fbf7ee 60%, #f4ecdd 100%)",
          }}
        />
        {/* Aurora glow */}
        <div
          className="pointer-events-none absolute -inset-24 opacity-60"
          style={
            REDUCE_FX
              ? {
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(231,217,181,0.30), transparent 62%)," +
                    "radial-gradient(circle at 72% 38%, rgba(163,129,60,0.10), transparent 60%)," +
                    "radial-gradient(circle at 45% 78%, rgba(142,130,184,0.16), transparent 65%)",
                  transform: `rotate(${(i * 47) % 360}deg)`,
                }
              : {
                  background:
                    "conic-gradient(from 210deg at 50% 45%, rgba(231,217,181,0.30), rgba(231,217,181,0.28), rgba(142,130,184,0.16), rgba(231,217,181,0.2), rgba(231,217,181,0.30))",
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
              borderTop: c.startsWith("t") ? "2px solid #a3813c" : undefined,
              borderBottom: c.startsWith("b") ? "2px solid #a3813c" : undefined,
              borderLeft: c.endsWith("l") ? "2px solid #a3813c" : undefined,
              borderRight: c.endsWith("r") ? "2px solid #a3813c" : undefined,
              boxShadow: "0 0 10px rgba(163,129,60,0.35)",
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
            WebkitTextStroke: "1.5px rgba(163,129,60,0.28)",
            textShadow: "0 0 40px rgba(163,129,60,0.10)",
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
                    "conic-gradient(from 0deg, #a3813c, rgba(142,130,184,0.9), #a3813c, rgba(74,53,120,0.9), #a3813c)",
                  animation: isFront ? "spin 6s linear infinite" : undefined,
                  filter: "blur(2px)",
                  opacity: 0.9,
                }}
              />
              <span aria-hidden className="absolute inset-[2px] bg-[#faf7f2]" />
              <s.icon className="relative h-6 w-6 text-[#a3813c]" />
            </span>
            <div className="flex flex-col">
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#a3813c]"
                style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
              >
                Etapa {num} / {String(totalSteps).padStart(2, "0")}
              </span>
              <span className="mt-1 h-px w-16 bg-[#a3813c]/60" />
            </div>
          </div>

          <div className="mt-auto">
            <h4
              className="text-4xl leading-tight text-[#2a2233] lg:text-5xl"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {s.title}
            </h4>
            <p className="mt-5 text-lg leading-relaxed text-[#4a4152]">{s.desc}</p>
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
          <div className="pointer-events-none absolute left-[22px] top-3 bottom-3 w-px bg-[#2a2233]/15" />
          <div
            className="pointer-events-none absolute left-[22px] top-3 w-px bg-[#a3813c] transition-[height] duration-500"
            style={{
              height: `calc((100% - 24px) * ${fillPct / 100})`,
              boxShadow: "0 0 12px rgba(163,129,60,0.35)",
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
                    ? "border-[#a3813c] bg-[#a3813c]/[0.07] text-foreground"
                    : "border-[#2a2233]/12 text-muted-foreground"
                }`}
                style={{ minHeight: 0 }}
              >
                <span
                  className={`absolute left-[15px] top-1/2 h-3.5 w-3.5 -translate-y-1/2 border transition-all duration-500 ${
                    isPassed
                      ? "border-[#a3813c] bg-[#a3813c]"
                      : "border-[#2a2233]/12 bg-transparent"
                  }`}
                  style={
                    isPassed
                      ? { boxShadow: "0 0 14px rgba(163,129,60,0.35)" }
                      : undefined
                  }
                  aria-hidden
                />
                <span
                  className={`text-base font-semibold uppercase tracking-[0.32em] ${
                    isActive ? "text-[#a3813c]" : "text-primary/60"
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
                    ? "border-[#a3813c] bg-[#a3813c]/[0.08] text-foreground"
                    : "border-[#2a2233]/12 text-muted-foreground opacity-60"
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




