import { useEffect, useRef, useState } from "react";
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
} from "lucide-react";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

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
    title: "1. Primeira Consulta",
    desc: "Escuta atenta, história clínica completa e exame físico minucioso para entender você por inteiro — não apenas a dor.",
  },
  {
    icon: Stethoscope,
    title: "2. Diagnóstico Preciso",
    desc: "Exames laboratoriais e de imagem direcionados. Reavaliação conjunta dos resultados e plano terapêutico personalizado.",
  },
  {
    icon: Syringe,
    title: "3. Tratamento Individualizado",
    desc: "Medicações modernas, infiltrações guiadas por ultrassom e procedimentos minimamente invasivos quando indicados.",
  },
  {
    icon: Bone,
    title: "4. Fisioterapia Integrada",
    desc: "Trabalho em rede com fisioterapeutas parceiros para reabilitação funcional, ganho de mobilidade e força.",
  },
  {
    icon: Salad,
    title: "5. Nutrição Anti-inflamatória",
    desc: "Encaminhamento a nutricionistas especializados: controle de peso, saúde óssea e alimentação que reduz inflamação.",
  },
  {
    icon: Brain,
    title: "6. Suporte Psicológico",
    desc: "Parceria com psicólogos para manejo da dor crônica, ansiedade e adesão ao tratamento — corpo e mente juntos.",
  },
  {
    icon: HeartHandshake,
    title: "7. Ortopedia Colaborativa",
    desc: "Discussão de casos com ortopedistas de confiança quando há indicação cirúrgica ou procedimentos avançados.",
  },
  {
    icon: CheckCircle2,
    title: "8. Acompanhamento Contínuo",
    desc: "Reavaliações periódicas, ajuste fino do tratamento e celebração de cada conquista da sua transformação.",
  },
];

export default function Procedures() {
  const intro = useReveal();

  return (
    <section id="procedimentos" className="relative bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div
          ref={intro.ref}
          className={`mx-auto max-w-3xl text-center transition-all duration-700 ${
            intro.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
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
            para tratar a dor onde ela realmente está — de forma segura e minimamente invasiva.
          </p>
        </div>

        {/* Joints */}
        <div className="mt-16 lg:mt-20">
          <h3 className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
            Áreas tratadas
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {joints.map((j) => (
              <article
                key={j.label}
                className="group rounded-2xl border border-primary/10 bg-card/60 p-6 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:bg-card"
              >
                <div className="mb-3 h-1 w-8 rounded-full bg-primary/60 transition-all group-hover:w-14" />
                <h4
                  className="text-xl text-foreground"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {j.label}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {j.desc}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Substances + Equipment */}
        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-2">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
              Substâncias utilizadas
            </h3>
            <div className="mt-6 space-y-4">
              {substances.map((s) => (
                <div
                  key={s.title}
                  className="flex gap-4 rounded-2xl border border-primary/10 bg-card/60 p-5 transition-colors hover:bg-card"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="text-base font-semibold text-foreground">{s.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
              Equipamentos
            </h3>
            <div className="mt-6 space-y-4">
              {equipment.map((e) => (
                <div
                  key={e.title}
                  className="flex gap-4 rounded-2xl border border-primary/10 bg-card/60 p-5 transition-colors hover:bg-card"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <e.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="text-base font-semibold text-foreground">{e.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {e.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Journey / Protocolo Transformador */}
        <div className="mt-24 lg:mt-32">
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
              Da primeira consulta ao trabalho conjunto com fisioterapeuta, nutricionista,
              psicólogo e ortopedistas — um cuidado em rede, pensado para transformar sua vida.
            </p>
          </div>

          <div className="relative mt-14">
            {/* vertical guide (desktop) */}
            <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/30 to-transparent lg:block" />

            <ol className="space-y-6 lg:space-y-10">
              {journey.map((step, i) => {
                const left = i % 2 === 0;
                return (
                  <li
                    key={step.title}
                    className={`relative flex flex-col lg:flex-row lg:items-center ${
                      left ? "" : "lg:flex-row-reverse"
                    }`}
                  >
                    <div className="lg:w-1/2 lg:px-8">
                      <div className="rounded-2xl border border-primary/10 bg-card/70 p-6 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:bg-card">
                        <div className="flex items-center gap-3">
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <step.icon className="h-5 w-5" />
                          </span>
                          <h4
                            className="text-2xl text-foreground"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                          >
                            {step.title}
                          </h4>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                    <span className="pointer-events-none absolute left-1/2 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-primary ring-4 ring-background lg:block" />
                    <div className="hidden lg:block lg:w-1/2" />
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
