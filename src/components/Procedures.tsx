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
  const slide = Math.min(1, progress * 2);

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

            {/* Hover overlay — procedure links, centered on image */}
            <div
              className="absolute inset-0 flex items-center justify-center bg-[#1a1229]/70 p-10 backdrop-blur-sm transition-opacity duration-500"
              style={{ opacity: hovered ? 1 : 0, pointerEvents: hovered ? "auto" : "none" }}
            >
              <div className="w-full max-w-md text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#e7d9b5]">
                  Procedimentos indicados
                </p>
                <div className="mt-5 flex flex-col gap-2.5">
                  {current.links.map((l) => (
                    <a
                      key={l.label}
                      href={`/procedimentos#${l.slug}`}
                      className="group inline-flex items-center justify-between gap-3 rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/95 backdrop-blur transition-all hover:border-primary hover:bg-primary/10 hover:text-primary"
                    >
                      <span>{l.label}</span>
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  ))}
                </div>
                <a
                  href="/procedimentos"
                  className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-[#e7d9b5]/70 bg-white/5 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#e7d9b5] transition-all hover:border-primary hover:text-primary"
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
                    className="relative h-full w-full overflow-hidden rounded-3xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-primary/25"
                    style={{
                      backgroundImage: `url(${j.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {/* Links overlaid on image */}
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#1a1229]/90 via-[#1a1229]/40 to-transparent p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#e7d9b5]">
                        {j.label} · Procedimentos
                      </p>
                      <div className="mt-3 flex flex-col gap-2">
                        {j.links.map((l) => (
                          <a
                            key={l.label}
                            href={`/procedimentos#${l.slug}`}
                            className="inline-flex items-center justify-between gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-medium text-white/95 backdrop-blur"
                          >
                            <span>{l.label}</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                          </a>
                        ))}
                      </div>
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
              <div
                style={{
                  ["--tx" as string]: `${(1 - slide) * 50}vw`,
                  transform: `translateX(var(--tx, 0px))`,
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
 * "Programa TransformaDOR" — sobrecapa que se abre lateralmente (duas
 * metades deslizando para fora) conforme o scroll avança, revelando a
 * seção "Etapas da Transformação" logo abaixo. Mesmo padrão visual da
 * sobrecapa principal do site.
 */
function FlipIntro() {
  const { ref, progress } = useScrollProgress();

  // Abertura mais lenta e cinematográfica: 0 → 1 em ~80% do scroll disponível.
  const eased = Math.min(1, progress * 1.25);
  const shift = eased * 100; // porcentagem que cada metade desliza

  const content = (
    <div className="relative flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-4 text-center">
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
        role para abrir ↓
      </p>
    </div>
  );

  const coverBg = `
    radial-gradient(circle at 20% 15%, hsl(260 45% 22% / 0.75), transparent 55%),
    radial-gradient(circle at 80% 40%, hsl(40 40% 30% / 0.35), transparent 55%),
    radial-gradient(circle at 30% 85%, hsl(275 40% 20% / 0.7), transparent 55%),
    linear-gradient(160deg, hsl(258 40% 12%) 0%, hsl(268 35% 15%) 55%, hsl(255 40% 10%) 100%)
  `;

  const halfBgStyle: React.CSSProperties = {
    backgroundImage: coverBg,
    backgroundAttachment: "fixed",
    backgroundSize: "100vw 100vh",
    backgroundRepeat: "no-repeat",
  };

  const halfTransition = "transform 900ms cubic-bezier(0.65, 0, 0.35, 1)";

  return (
    <div ref={ref} className="relative" style={{ height: "180vh" }}>
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        {/* Metade esquerda */}
        <div
          className="absolute inset-y-0 left-0 w-1/2 overflow-hidden"
          style={{
            ...halfBgStyle,
            backgroundPosition: "left top",
            transform: `translate3d(-${shift}%, 0, 0)`,
            transition: halfTransition,
          }}
        >
          <div className="absolute inset-y-0 left-0 h-full w-screen">{content}</div>
        </div>

        {/* Metade direita */}
        <div
          className="absolute inset-y-0 right-0 w-1/2 overflow-hidden"
          style={{
            ...halfBgStyle,
            backgroundPosition: "right top",
            transform: `translate3d(${shift}%, 0, 0)`,
            transition: halfTransition,
          }}
        >
          <div className="absolute inset-y-0 right-0 h-full w-screen">{content}</div>
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

      {/* DESKTOP — grid estático (sem parallax) */}
      <div ref={ref} className="relative hidden lg:block">
        <div className="mx-auto max-w-7xl px-8 py-24">
          <div className="mb-14 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
              Etapas da Transformação
            </p>
            <h3
              className="mt-4 text-5xl font-normal tracking-tight text-foreground"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Uma jornada em <span className="italic text-primary">oito etapas</span>
            </h3>
          </div>
          <ol className="grid grid-cols-2 gap-6 xl:grid-cols-4">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="group relative flex flex-col border-2 border-[#2a2730] bg-transparent p-8 transition-colors duration-300 hover:border-primary/60"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <step.icon className="h-6 w-6" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">
                    Etapa {String(i + 1).padStart(2, "0")}
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
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}



