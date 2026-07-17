import fibromialgiaImg from "@/assets/treatments/fibromialgia.jpg.asset.json";
import artroseImg from "@/assets/treatments/artrose.jpg.asset.json";
import osteoporoseImg from "@/assets/treatments/osteoporose.jpg.asset.json";
import muscularesImg from "@/assets/treatments/musculares.jpg.asset.json";
import artriteImg from "@/assets/treatments/artrite.jpg.asset.json";
import gotaImg from "@/assets/treatments/gota.jpg.asset.json";
import psoriasicaImg from "@/assets/treatments/psoriasica.jpg.asset.json";
import outrasImg from "@/assets/treatments/outras.jpg.asset.json";

const IMAGES: Record<string, string> = {
  fibromialgia: fibromialgiaImg.url,
  artrose: artroseImg.url,
  osteoporose: osteoporoseImg.url,
  "dores-musculares": muscularesImg.url,
  "artrite-reumatoide": artriteImg.url,
  gota: gotaImg.url,
  "artrite-psoriasica": psoriasicaImg.url,
  "outras-doencas-imunologicas": outrasImg.url,
};

export type Treatment = {
  slug: string;
  title: string;
  shortDesc: string;
  gradient: string;
  accent: string;
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
    slug: "dores-musculares",
    title: "Dores Musculares e Lesões nos Tendões",
    shortDesc:
      "Dor lombar, ombro, tendinites e entesites — diagnóstico preciso e tratamento que devolve movimento.",
    gradient: "from-[#fdead0] via-[#fbf1de] to-[#f6e3d0]",
    accent: "#c68a4a",
    overview:
      "Dores musculares e tendinopatias podem ter causa mecânica, metabólica ou inflamatória. A avaliação reumatológica identifica a origem — de sobrecarga a doenças sistêmicas — e direciona o tratamento correto, de reabilitação a medicações específicas.",
    symptoms: [
      "Dor localizada em ombro, cotovelo, coluna ou joelho",
      "Piora com movimentos específicos ou esforço",
      "Fraqueza, cãibras e limitação funcional",
      "Inchaço, calor local e rigidez",
    ],
    approach: [
      "Exame físico e ultrassonografia dirigida",
      "Repouso relativo e fisioterapia integrada",
      "Infiltrações guiadas em casos selecionados",
      "Tratamento sistêmico quando há doença de base",
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
    slug: "gota",
    title: "Gota",
    shortDesc:
      "Crises intensas de dor articular pelo acúmulo de ácido úrico — controle e prevenção são possíveis.",
    gradient: "from-[#fde2d4] via-[#fbeadd] to-[#f6d9c8]",
    accent: "#c67a5c",
    overview:
      "A gota é uma artrite inflamatória causada pelo depósito de cristais de ácido úrico nas articulações. Um plano bem conduzido interrompe as crises, dissolve os cristais acumulados e previne novas manifestações.",
    symptoms: [
      "Crise súbita de dor intensa, geralmente no dedão do pé",
      "Vermelhidão, calor e inchaço da articulação",
      "Ataques recorrentes desencadeados por dieta ou álcool",
      "Formação de tofos em casos crônicos",
    ],
    approach: [
      "Confirmação diagnóstica e dosagem de ácido úrico",
      "Tratamento da crise com anti-inflamatórios específicos",
      "Terapia hipouricemiante contínua quando indicada",
      "Orientação alimentar e revisão de medicamentos",
    ],
  },
  {
    slug: "artrite-psoriasica",
    title: "Artrite Psoriásica",
    shortDesc:
      "Inflamação articular associada à psoríase — tratamento moderno controla pele e articulações.",
    gradient: "from-[#fce3e8] via-[#faeced] to-[#f0e2ee]",
    accent: "#b6799a",
    overview:
      "A artrite psoriásica é uma doença inflamatória crônica que combina manifestações articulares e cutâneas. Terapias-alvo modernas controlam a inflamação, preservam as articulações e melhoram as lesões de pele.",
    symptoms: [
      "Placas descamativas em cotovelos, joelhos e couro cabeludo",
      "Dor e inchaço em articulações e dedos (dactilite)",
      "Dor lombar inflamatória e rigidez matinal",
      "Alterações ungueais (pitting, onicólise)",
    ],
    approach: [
      "Avaliação conjunta pele-articulações",
      "DMARDs sintéticos e imunobiológicos direcionados",
      "Fisioterapia e cuidado dermatológico integrado",
      "Reavaliação regular com escores de atividade",
    ],
  },
  {
    slug: "outras-doencas-imunologicas",
    title: "Outras Doenças Imunológicas",
    shortDesc:
      "Lúpus, Síndrome de Sjögren, esclerose sistêmica, vasculites e outras condições autoimunes.",
    gradient: "from-[#fde2e4] via-[#fbeff1] to-[#eee0f5]",
    accent: "#c8778c",
    overview:
      "Doenças autoimunes sistêmicas exigem diagnóstico preciso e acompanhamento contínuo. Investigamos e conduzimos condições como Lúpus, Síndrome de Sjögren, esclerose sistêmica e vasculites, com terapias imunomoduladoras personalizadas.",
    symptoms: [
      "Manchas na pele, especialmente no rosto (rash malar)",
      "Olhos e boca secos, febre e queda de cabelo",
      "Dor e inchaço articular associados a sintomas sistêmicos",
      "Sensibilidade à luz solar e cansaço extremo",
    ],
    approach: [
      "Investigação imunológica e laboratorial completa",
      "Terapia imunomoduladora individualizada",
      "Monitoramento renal, cardiovascular e ósseo",
      "Orientação sobre gestação, vacinas e fotoproteção",
    ],
  },
];

export const treatments: Treatment[] = _treatments.map((t) => ({
  ...t,
  image: IMAGES[t.slug],
}));

export const getTreatment = (slug: string) =>
  treatments.find((t) => t.slug === slug);
