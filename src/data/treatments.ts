import fibromialgiaImg from "@/assets/treatments/fibromialgia.jpg.asset.json";
import lupusImg from "@/assets/treatments/lupus.jpg.asset.json";
import artriteImg from "@/assets/treatments/artrite.jpg.asset.json";
import sjogrenImg from "@/assets/treatments/sjogren.jpg.asset.json";
import muscularesImg from "@/assets/treatments/musculares.jpg.asset.json";
import artroseImg from "@/assets/treatments/artrose.jpg.asset.json";
import osteoporoseImg from "@/assets/treatments/osteoporose.jpg.asset.json";
import tendoesImg from "@/assets/treatments/tendoes.jpg.asset.json";

const IMAGES: Record<string, string> = {
  fibromialgia: fibromialgiaImg.url,
  lupus: lupusImg.url,
  "artrite-reumatoide": artriteImg.url,
  "sindrome-de-sjogren": sjogrenImg.url,
  "lesoes-musculares": muscularesImg.url,
  artrose: artroseImg.url,
  osteoporose: osteoporoseImg.url,
  "lesoes-nos-tendoes": tendoesImg.url,
};

export type Treatment = {
  slug: string;
  title: string;
  shortDesc: string;
  gradient: string; // tailwind gradient classes
  accent: string; // hex for accent bits
  image: string;
  overview: string;
  symptoms: string[];
  approach: string[];
};

const _treatments: Omit<Treatment, "image">[] = [
  {
    slug: "fibromialgia",
    title: "Fibromialgia",
    shortDesc:
      "Dor crônica difusa, fadiga e alterações do sono — cuidado multidisciplinar centrado em você.",
    gradient: "from-[#e9defc] via-[#f5eef8] to-[#fce4ec]",
    accent: "#8e82b8",
    overview:
      "A fibromialgia é uma síndrome de dor crônica generalizada que envolve o sistema nervoso central, com alterações no processamento da dor. O tratamento é individualizado e combina medicação, exercício físico, higiene do sono e apoio psicológico.",
    symptoms: [
      "Dor muscular difusa há mais de 3 meses",
      "Fadiga persistente e sono não reparador",
      "Rigidez matinal e sensibilidade ao toque",
      "Dificuldade de concentração (fibro-fog)",
    ],
    approach: [
      "Avaliação clínica detalhada e exclusão de outras causas",
      "Plano medicamentoso individualizado",
      "Orientação de exercícios progressivos",
      "Suporte para sono, humor e manejo do estresse",
    ],
  },
  {
    slug: "lupus",
    title: "Lúpus Eritematoso Sistêmico",
    shortDesc:
      "Doença autoimune que pode acometer pele, articulações, rins e outros órgãos. Diagnóstico precoce muda tudo.",
    gradient: "from-[#fde2e4] via-[#fbeff1] to-[#eee0f5]",
    accent: "#c8778c",
    overview:
      "O Lúpus é uma doença autoimune sistêmica em que o organismo produz anticorpos contra as próprias células. O acompanhamento reumatológico regular permite controle da atividade da doença e preservação da qualidade de vida.",
    symptoms: [
      "Manchas na pele, especialmente no rosto",
      "Dor e inchaço nas articulações",
      "Febre, cansaço extremo e queda de cabelo",
      "Sensibilidade à luz solar",
    ],
    approach: [
      "Investigação laboratorial e imunológica completa",
      "Terapia imunomoduladora personalizada",
      "Monitoramento renal, cardiovascular e ósseo",
      "Orientação sobre gestação, vacinas e fotoproteção",
    ],
  },
  {
    slug: "artrite-reumatoide",
    title: "Artrite Reumatoide",
    shortDesc:
      "Inflamação articular crônica que, tratada precocemente, evita deformidades e mantém sua funcionalidade.",
    gradient: "from-[#dde7fb] via-[#eaf0fb] to-[#e2defc]",
    accent: "#6a86c3",
    overview:
      "A Artrite Reumatoide é uma doença inflamatória crônica que ataca principalmente as articulações. O tratamento moderno com drogas modificadoras do curso da doença (DMARDs) e biológicos permite remissão em grande parte dos pacientes.",
    symptoms: [
      "Dor e inchaço simétrico em pequenas articulações",
      "Rigidez matinal prolongada (>1 hora)",
      "Cansaço e mal-estar geral",
      "Deformidades progressivas se não tratada",
    ],
    approach: [
      "Diagnóstico precoce com exames de imagem e laboratório",
      "DMARDs sintéticos e biológicos quando indicados",
      "Reavaliação periódica com escores de atividade",
      "Integração com fisioterapia e terapia ocupacional",
    ],
  },
  {
    slug: "sindrome-de-sjogren",
    title: "Síndrome de Sjögren",
    shortDesc:
      "Doença autoimune que causa secura ocular e bucal e pode envolver outros órgãos.",
    gradient: "from-[#dff3ea] via-[#eaf5ee] to-[#e3edf7]",
    accent: "#5aa080",
    overview:
      "A Síndrome de Sjögren é uma doença autoimune que afeta principalmente as glândulas produtoras de lágrima e saliva. O acompanhamento previne complicações oculares, dentárias e sistêmicas.",
    symptoms: [
      "Olhos e boca secos persistentes",
      "Dificuldade para engolir alimentos secos",
      "Cansaço e dores articulares",
      "Aumento das parótidas",
    ],
    approach: [
      "Confirmação diagnóstica com sorologia e testes específicos",
      "Substitutos de lágrima e saliva",
      "Tratamento sistêmico quando há acometimento de órgãos",
      "Prevenção de cáries e cuidado oftalmológico contínuo",
    ],
  },
  {
    slug: "lesoes-musculares",
    title: "Lesões Musculares",
    shortDesc:
      "Diagnóstico preciso das dores musculares — do estiramento à miosite inflamatória.",
    gradient: "from-[#fdead0] via-[#fbf1de] to-[#f6e3d0]",
    accent: "#c68a4a",
    overview:
      "Dor muscular pode ter causas mecânicas, metabólicas ou inflamatórias (miopatias). Uma avaliação reumatológica completa identifica a origem e direciona o tratamento adequado.",
    symptoms: [
      "Dor muscular localizada ou difusa",
      "Fraqueza para subir escadas ou levantar objetos",
      "Cãibras frequentes",
      "Elevação de enzimas musculares em exames",
    ],
    approach: [
      "Anamnese focada e exame físico neuromuscular",
      "Exames laboratoriais e de imagem direcionados",
      "Encaminhamento a fisioterapia e reabilitação",
      "Tratamento medicamentoso quando indicado",
    ],
  },
  {
    slug: "artrose",
    title: "Artrose (Osteoartrite)",
    shortDesc:
      "Doença degenerativa da cartilagem — controle da dor e preservação do movimento.",
    gradient: "from-[#e6e0f5] via-[#efeaf7] to-[#f5e6ee]",
    accent: "#9483b8",
    overview:
      "A artrose é a doença articular mais comum, marcada pelo desgaste da cartilagem. O tratamento combina medidas não farmacológicas, medicações e, em casos selecionados, infiltrações e cirurgia.",
    symptoms: [
      "Dor articular que piora com o uso",
      "Rigidez após períodos de repouso",
      "Estalos e limitação de movimento",
      "Deformidades e aumento do volume articular",
    ],
    approach: [
      "Programa de exercícios e controle de peso",
      "Analgésicos e anti-inflamatórios com uso racional",
      "Infiltrações articulares em casos selecionados",
      "Encaminhamento cirúrgico quando necessário",
    ],
  },
  {
    slug: "osteoporose",
    title: "Osteoporose",
    shortDesc:
      "Ossos frágeis silenciosamente. Prevenir e tratar é evitar fraturas e preservar independência.",
    gradient: "from-[#e0eaf5] via-[#ecf1f7] to-[#e0e6f0]",
    accent: "#6b8fb8",
    overview:
      "A osteoporose reduz a densidade e a qualidade do osso, aumentando o risco de fraturas. O diagnóstico com densitometria e o tratamento adequado reduzem drasticamente o risco de fraturas.",
    symptoms: [
      "Perda de altura ou postura curvada",
      "Fraturas por trauma mínimo",
      "Dor lombar de instalação súbita (fratura vertebral)",
      "Fatores de risco: menopausa, corticoide, tabagismo",
    ],
    approach: [
      "Avaliação com densitometria óssea e exames metabólicos",
      "Reposição de cálcio e vitamina D",
      "Medicações antirreabsortivas ou anabólicas",
      "Orientação de exercícios e prevenção de quedas",
    ],
  },
  {
    slug: "lesoes-nos-tendoes",
    title: "Lesões nos Tendões",
    shortDesc:
      "Tendinites, tenossinovites e entesites — dor que limita a rotina tem tratamento.",
    gradient: "from-[#fce3e8] via-[#faeced] to-[#f0e2ee]",
    accent: "#b6799a",
    overview:
      "Tendinopatias podem ter causa mecânica (sobrecarga) ou inflamatória (espondiloartrites). A avaliação reumatológica define a origem e o tratamento correto — de reabilitação a medicações específicas.",
    symptoms: [
      "Dor localizada em ombro, cotovelo, joelho ou tornozelo",
      "Piora com movimentos específicos",
      "Inchaço e calor local",
      "Limitação funcional progressiva",
    ],
    approach: [
      "Exame físico e ultrassonografia dirigida",
      "Repouso relativo e fisioterapia",
      "Infiltrações guiadas em casos selecionados",
      "Tratamento sistêmico quando há doença de base",
    ],
  },
];

export const treatments: Treatment[] = _treatments.map((t) => ({
  ...t,
  image: IMAGES[t.slug],
}));

export const getTreatment = (slug: string) =>
  treatments.find((t) => t.slug === slug);

