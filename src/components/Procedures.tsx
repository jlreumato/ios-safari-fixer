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

/** Vertical circular carousel for the joint areas. */
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
      const total = el.offsetHeight - vh;
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

  const rotation = -progress * (joints.length - 1) * (360 / joints.length);
  const current = joints[active];

  return (
    <div
      ref={stageRef}
      className="relative"
      style={{ height: `${joints.length * 80}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="mx-auto grid h-full max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-[420px_1fr] lg:px-8">
          {/* Wheel */}
          <div className="relative mx-auto h-[420px] w-[420px] max-w-full">
            <div
              className="absolute inset-0"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: "transform 120ms linear",
              }}
            >
              {joints.map((j, i) => {
                const angle = (i / joints.length) * 360;
                const isActive = i === active;
                return (
                  <div
                    key={j.label}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      transform: `rotate(${angle}deg) translateY(-180px) rotate(${-angle - rotation}deg)`,
                      transition: "transform 120ms linear",
                    }}
                  >
                    <div
                      className={`-translate-x-1/2 -translate-y-1/2 rounded-full border px-5 py-3 text-sm font-medium backdrop-blur transition-all duration-300 ${
                        isActive
                          ? "border-primary bg-primary text-primary-foreground shadow-lg scale-110"
                          : "border-primary/20 bg-card/70 text-muted-foreground"
                      }`}
                    >
                      {j.label}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Center dot */}
            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40" />
            {/* Guide ring */}
            <div className="absolute inset-6 rounded-full border border-dashed border-primary/15" />
          </div>

          {/* Active detail */}
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
              Área em evidência
            </p>
            <h3
              key={current.label}
              className="mt-3 text-4xl font-normal tracking-tight text-foreground sm:text-5xl lg:text-6xl animate-in fade-in slide-in-from-bottom-2 duration-500"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {current.label}
            </h3>
            <p
              key={current.desc}
              className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground animate-in fade-in duration-500"
            >
              {current.desc}
            </p>
            <div className="mt-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">
              <span>
                {String(active + 1).padStart(2, "0")} / {String(joints.length).padStart(2, "0")}
              </span>
              <span className="h-px flex-1 max-w-[120px] bg-primary/20" />
              <span>role para avançar</span>
              <ChevronRight className="h-4 w-4" />
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
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32 text-center">
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

      {/* Journey / Protocolo Transformador */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24 lg:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Protocolo Transformador
          </p>
          <h3
            className="mt-3 text-balance text-3xl font-normal tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            A jornada completa do paciente
          </h3>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Da primeira consulta ao trabalho em rede com fisioterapeuta, nutricionista,
            psicólogo e ortopedistas.
          </p>
        </div>

        <JourneyCylinder steps={journey} />

      </div>
    </section>
  );
}

type JourneyStep = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  desc: string;
};

/**
 * Cylindrical vertical roll — steps rotate through a fixed viewport as the
 * user scrolls. Only the active step is fully opaque and scaled; others fade
 * and slide into the distance like slats on a cylinder.
 */
function JourneyCylinder({ steps }: { steps: JourneyStep[] }) {
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

  // continuous index across steps
  const pos = progress * (steps.length - 1);
  const active = Math.round(pos);

  return (
    <div
      ref={stageRef}
      className="relative mt-8"
      style={{ height: `${steps.length * 80}vh` }}
    >
      <div className="sticky top-16 md:top-20 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] w-full overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-px max-w-3xl -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/25 to-transparent"
          aria-hidden
        />
        <div
          className="relative mx-auto h-full max-w-3xl px-4 sm:px-6 lg:px-8"
          style={{ perspective: "1200px" }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {steps.map((step, i) => {
              const delta = i - pos; // negative = above, positive = below
              const abs = Math.abs(delta);
              const rotX = Math.max(-80, Math.min(80, delta * 45));
              const ty = delta * 90;
              const tz = -abs * 120;
              const opacity = Math.max(0, 1 - abs * 0.55);
              const scale = 1 - Math.min(0.35, abs * 0.15);
              const isActive = i === active;
              return (
                <div
                  key={step.title}
                  className="absolute inset-x-4 sm:inset-x-6 lg:inset-x-8"
                  style={{
                    transform: `translate3d(0, ${ty}px, ${tz}px) rotateX(${rotX}deg) scale(${scale})`,
                    opacity,
                    transition: "transform 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms linear",
                    willChange: "transform, opacity",
                    zIndex: 100 - Math.round(abs * 10),
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <div
                    className={`mx-auto rounded-3xl border p-8 sm:p-10 backdrop-blur transition-colors duration-500 ${
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
                        Etapa {String(i + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
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

          {/* Progress dots on the right */}
          <div className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 flex-col gap-2 sm:flex">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "h-6 w-1.5 bg-primary" : "w-1.5 bg-primary/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

  );
}
