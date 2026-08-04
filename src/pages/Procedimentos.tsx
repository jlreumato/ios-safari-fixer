import { useRef, useState } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Seo from "@/components/Seo";

import infiltracaoAsset from "@/assets/procedures/infiltracao.jpg.asset.json";
import viscoAsset from "@/assets/procedures/viscossuplementacao.jpg.asset.json";
import prpAsset from "@/assets/procedures/prp.jpg.asset.json";
import bloqueioAsset from "@/assets/procedures/bloqueio.jpg.asset.json";
import osteoAsset from "@/assets/procedures/osteoporose.jpg.asset.json";
import autoimuneAsset from "@/assets/procedures/autoimune.jpg.asset.json";

type Procedure = {
  slug: string;
  title: string;
  image: string;
  short: string;
  indications: string[];
  benefits: string[];
};

const procedures: Procedure[] = [
  {
    slug: "infiltracao-ultrassom",
    title: "Infiltrações Guiadas por Ultrassom",
    image: infiltracaoAsset.url,
    short:
      "Aplicações precisas de medicamentos anti-inflamatórios ou anestésicos diretamente no ponto exato da dor, com auxílio de ultrassonografia em tempo real.",
    indications: [
      "Bursites (trocantérica, subacromial, olecraniana)",
      "Tendinites e tenossinovites",
      "Osteoartrose de quadril, joelho, ombro e mãos",
      "Síndrome do túnel do carpo",
    ],
    benefits: [
      "Precisão milimétrica com menor risco de lesão",
      "Alívio rápido da dor e inflamação",
      "Procedimento ambulatorial, sem necessidade de internação",
    ],
  },
  {
    slug: "viscossuplementacao",
    title: "Viscossuplementação",
    image: viscoAsset.url,
    short:
      "Reposição do ácido hialurônico articular para restaurar a lubrificação e amortecimento da cartilagem em casos de artrose.",
    indications: [
      "Osteoartrose de joelho, quadril e ombro",
      "Rigidez e dor articular crônica",
      "Pacientes com contraindicação para cirurgia",
    ],
    benefits: [
      "Melhora da mobilidade e função articular",
      "Redução da dor por vários meses",
      "Retarda a progressão do desgaste cartilaginoso",
    ],
  },
  {
    slug: "prp",
    title: "PRP — Plasma Rico em Plaquetas",
    image: prpAsset.url,
    short:
      "Terapia biológica que utiliza o plasma do próprio paciente, rico em fatores de crescimento, para estimular reparo tecidual em lesões articulares e tendíneas.",
    indications: [
      "Osteoartrose leve a moderada",
      "Tendinopatias crônicas",
      "Lesões musculares e ligamentares",
    ],
    benefits: [
      "Terapia autóloga (baixo risco imunológico)",
      "Estimula regeneração natural do tecido",
      "Complementar a fisioterapia e reabilitação",
    ],
  },
  {
    slug: "bloqueios-anestesicos",
    title: "Bloqueios Anestésicos e Neurais",
    image: bloqueioAsset.url,
    short:
      "Aplicação de anestésicos e corticoides em pontos-gatilho, nervos periféricos e enteses para interromper o ciclo de dor.",
    indications: [
      "Dedo em gatilho e tenossinovite de De Quervain",
      "Neuralgia do occipital e cefaleias cervicogênicas",
      "Síndromes miofasciais",
    ],
    benefits: [
      "Alívio imediato em casos de dor aguda",
      "Diagnóstico e tratamento em um só procedimento",
      "Retomada rápida das atividades diárias",
    ],
  },
  {
    slug: "densitometria-avaliacao",
    title: "Avaliação e Manejo da Osteoporose",
    image: osteoAsset.url,
    short:
      "Investigação metabólica completa, interpretação de densitometria óssea e prescrição de terapia antirreabsortiva ou anabólica.",
    indications: [
      "Osteoporose e osteopenia",
      "Prevenção de fraturas por fragilidade",
      "Pacientes em uso crônico de corticoide",
    ],
    benefits: [
      "Redução comprovada do risco de fraturas",
      "Acompanhamento com marcadores ósseos",
      "Plano de exercícios e prevenção de quedas",
    ],
  },
  {
    slug: "manejo-doencas-autoimunes",
    title: "Manejo de Doenças Autoimunes",
    image: autoimuneAsset.url,
    short:
      "Diagnóstico, tratamento e monitoramento de doenças reumatológicas sistêmicas com terapias-alvo modernas — sintéticas e imunobiológicas.",
    indications: [
      "Artrite Reumatoide e Artrite Psoriásica",
      "Lúpus Eritematoso Sistêmico e Síndrome de Sjögren",
      "Vasculites e esclerose sistêmica",
    ],
    benefits: [
      "Uso racional de DMARDs e biológicos",
      "Monitoramento de segurança e resposta",
      "Cuidado integrado com outras especialidades",
    ],
  },
];

const WHATSAPP_URL =
  "https://wa.me/5582999872509?text=Olá! Gostaria de saber mais sobre os procedimentos com a Dra. Juliana Leal.";

export default function ProcedimentosPage() {
  const [active, setActive] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  const handleToggle = (slug: string) => {
    const willOpen = active !== slug;
    setActive(willOpen ? slug : null);
    if (willOpen) {
      // Espera o re-layout (order-first + aspect change + transition 500ms) antes de rolar.
      const focus = () => {
        const el = cardRefs.current[slug];
        if (!el) return;
        const headerOffset = 88; // header fixo
        const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      };
      // Duplo rAF para garantir que o layout re-ordenado esteja pronto, depois
      // um segundo scroll após a transição concluir para pegar o estado final.
      requestAnimationFrame(() => requestAnimationFrame(focus));
      window.setTimeout(focus, 560);
    }
  };


  return (
    <>
      <Seo
        title="Procedimentos em Maceió | Dra. Juliana Leal"
        description="Infiltrações guiadas por ultrassom, viscossuplementação, PRP, bloqueios anestésicos e manejo de doenças autoimunes em Maceió — Alagoas."
        path="/procedimentos"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Início",
                item: "https://julianaleal.com.br/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Procedimentos",
                item: "https://julianaleal.com.br/procedimentos",
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Procedimentos reumatológicos realizados em Maceió (AL)",
            itemListElement: procedures.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "MedicalProcedure",
                name: p.title,
                description: p.short,
                url: `https://julianaleal.com.br/procedimentos#${p.slug}`,
              },
            })),
          },
        ]}
      />

      <Header />
      <main
        className="bg-parallax-fixed relative min-h-[100dvh]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 82% 20%, rgba(231,217,181,0.40), transparent 58%),
            radial-gradient(circle at 12% 82%, rgba(142,130,184,0.12), transparent 60%),
            linear-gradient(160deg, #ffffff 0%, #fbf7ee 50%, #f2e9d8 100%)
          `,
        }}
      >
        {/* Intro */}
        <section className="relative flex min-h-[60vh] items-end overflow-hidden pt-28 pb-14">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 119px, rgba(231,211,163,0.08) 119px, rgba(231,211,163,0.08) 120px)",
            }}
          />
          <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Procedimentos Reumatológicos
            </p>
            <h1
              className="mt-3 max-w-3xl text-balance text-4xl font-normal leading-[1.05] tracking-tight text-[#2a2233] sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Técnica, precisão e cuidado{" "}
              <span className="italic text-[#a3813c]">humanizado.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#4a4152] sm:text-lg">
              Cada procedimento é realizado com rigor técnico e escuta atenta — do
              diagnóstico ao acompanhamento contínuo. Conheça abaixo o portfólio completo.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[#4a4152]">
              Role para explorar
              <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
            </div>
          </div>
        </section>

        {/* Grid de procedimentos */}
        <section className="relative pb-24">
          <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 sm:px-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:px-8">
            {procedures.map((p) => {
              const isOpen = active === p.slug;
              return (
                <article
                  key={p.slug}
                  id={p.slug}
                  ref={(el) => { cardRefs.current[p.slug] = el; }}
                  className={`ios-clip group relative overflow-hidden border border-[#2a2233]/12 bg-white/80 backdrop-blur-sm transition-all duration-500 ${
                    isOpen ? "sm:col-span-2 lg:col-span-3 order-first" : ""
                  }`}

                >
                  <div
                    className={`relative overflow-hidden transition-[aspect-ratio] duration-500 ${
                      isOpen ? "aspect-[16/6] sm:aspect-[21/6]" : "aspect-[4/3]"
                    }`}
                  >
                    <div
                      className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                      style={{
                        backgroundImage: `url(${p.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2a2233]/85 via-[#2a2233]/35 to-transparent" />
                  </div>

                  <div className="p-6 lg:p-7">
                    <h2
                      className="text-2xl font-normal leading-tight tracking-tight text-[#2a2233] lg:text-3xl"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {p.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#4a4152] lg:text-base">
                      {p.short}
                    </p>

                    <button
                      type="button"
                      onClick={() => handleToggle(p.slug)}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.14em] text-[#a3813c] transition-colors hover:text-primary"
                    >
                      {isOpen ? "Fechar" : "Ver indicações"}
                      <ArrowRight
                        className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-90" : ""}`}
                      />
                    </button>

                    <div
                      className="grid overflow-hidden transition-[grid-template-rows] duration-500"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="min-h-0">
                        <div className="mt-6 grid gap-6 sm:grid-cols-2">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
                              Indicações
                            </p>
                            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#4a4152]">
                              {p.indications.map((i) => (
                                <li key={i} className="flex gap-2">
                                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#a3813c]" />
                                  {i}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
                              Benefícios
                            </p>
                            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#4a4152]">
                              {p.benefits.map((i) => (
                                <li key={i} className="flex gap-2">
                                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#a3813c]" />
                                  {i}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mx-auto mt-16 flex max-w-3xl flex-col items-center gap-6 px-4 text-center">
            <h3
              className="text-3xl font-normal leading-tight tracking-tight text-[#2a2233] sm:text-4xl"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Pronto para começar sua{" "}
              <span className="italic text-[#a3813c]">transformação?</span>
            </h3>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-[#a3813c]/60 bg-white px-8 py-3 text-base font-medium uppercase tracking-[0.18em] text-[#a3813c] transition-all hover:border-primary hover:text-primary">
                Agendar consulta
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
