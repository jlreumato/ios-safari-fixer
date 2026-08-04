import {
  Syringe,
  Stethoscope,
  HeartHandshake,
  Salad,
  Brain,
  Bone,
  ClipboardList,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

export type JourneyStep = {
  icon: LucideIcon;
  title: string;
  /** Frase curta usada nos cards da home (minimalista). */
  desc: string;
  /** Texto completo usado na página /transformador. */
  detail: string;
  /** Marcação de tempo/momento exibida à direita na lista da página. */
  when: string;
};

export const journey: JourneyStep[] = [
  {
    icon: ClipboardList,
    title: "Primeira Consulta",
    desc: "Escuta atenta e exame minucioso — você por inteiro, não só a dor.",
    detail:
      "História clínica completa, exame físico minucioso e escuta sem pressa. Saímos da consulta com hipóteses claras e um caminho definido.",
    when: "Dia 1",
  },
  {
    icon: Stethoscope,
    title: "Diagnóstico Preciso",
    desc: "Exames direcionados e plano terapêutico personalizado.",
    detail:
      "Exames laboratoriais e de imagem escolhidos com propósito, sem excessos. Revisamos os resultados juntos e definimos o plano.",
    when: "Semana 1–2",
  },
  {
    icon: Syringe,
    title: "Tratamento Individualizado",
    desc: "Medicação moderna e infiltrações guiadas por ultrassom.",
    detail:
      "Medicações modernas, infiltrações guiadas por ultrassom e procedimentos minimamente invasivos quando indicados — sempre na menor dose eficaz.",
    when: "Semana 2+",
  },
  {
    icon: Bone,
    title: "Fisioterapia Integrada",
    desc: "Reabilitação funcional em rede com fisioterapeutas parceiros.",
    detail:
      "Encaminhamento e acompanhamento conjunto com fisioterapeutas para ganho de mobilidade, força e autonomia nos movimentos do dia a dia.",
    when: "Em paralelo",
  },
  {
    icon: Salad,
    title: "Nutrição Anti-inflamatória",
    desc: "Alimentação que reduz inflamação e protege os ossos.",
    detail:
      "Parceria com nutricionistas: controle de peso, saúde óssea e um padrão alimentar que reduz o processo inflamatório.",
    when: "Em paralelo",
  },
  {
    icon: Brain,
    title: "Suporte Psicológico",
    desc: "Corpo e mente juntos no manejo da dor crônica.",
    detail:
      "Psicólogos parceiros no manejo da dor crônica, da ansiedade e da adesão ao tratamento — porque dor persistente também é experiência emocional.",
    when: "Em paralelo",
  },
  {
    icon: HeartHandshake,
    title: "Psiquiatria Colaborativa",
    desc: "Discussão de casos quando há indicação de cuidado integrado.",
    detail:
      "Discussão de casos com psiquiatras de confiança quando há indicação, garantindo cuidado integrado da saúde mental.",
    when: "Quando indicado",
  },
  {
    icon: CheckCircle2,
    title: "Acompanhamento Contínuo",
    desc: "Reavaliações periódicas e ajuste fino do tratamento.",
    detail:
      "Reavaliações periódicas, ajuste fino das condutas e celebração de cada conquista. Controle da doença é um processo, não um evento.",
    when: "Contínuo",
  },
];

export const journeyHowToLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Programa TransformaDOR — 8 etapas para se libertar da dor",
  description:
    "Programa da Dra. Juliana Leal que conduz o paciente da primeira consulta ao cuidado multidisciplinar contínuo para controle da dor crônica.",
  step: journey.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
    text: s.detail,
  })),
};
