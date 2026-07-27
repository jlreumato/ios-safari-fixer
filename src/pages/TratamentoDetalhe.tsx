import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Stethoscope } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getTreatment, treatments } from "@/data/treatments";
import Seo from "@/components/Seo";

const WHATSAPP_URL =
  "https://wa.me/5582999872509?text=Olá! Gostaria de agendar uma consulta com a Dra. Juliana Leal.";

const DARK_BG = `
  radial-gradient(circle at 20% 15%, hsl(260 45% 22% / 0.75), transparent 55%),
  radial-gradient(circle at 80% 40%, hsl(40 40% 30% / 0.35), transparent 55%),
  radial-gradient(circle at 30% 85%, hsl(275 40% 20% / 0.7), transparent 55%),
  linear-gradient(160deg, hsl(258 40% 12%) 0%, hsl(268 35% 15%) 55%, hsl(255 40% 10%) 100%)
`;

export default function TratamentoDetalhe() {
  const { slug = "" } = useParams();
  const treatment = getTreatment(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  if (!treatment) {
    return (
      <>
        <Header />
        <main
          className="mx-auto flex min-h-[70dvh] flex-col items-center justify-center px-4 text-center text-white"
          style={{ backgroundImage: DARK_BG, backgroundAttachment: "fixed" }}
        >
          <h1
            className="text-4xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Tratamento não encontrado
          </h1>
          <Link to="/#tratamentos-resumo" className="mt-6 text-[#e7d9b5] underline">
            Ver todos os tratamentos
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const currentIndex = treatments.findIndex((t) => t.slug === slug);
  const next = treatments[(currentIndex + 1) % treatments.length];

  return (
    <>
      <Seo
        title={`${treatment.title} — Tratamento em Maceió (AL) | Dra. Juliana Leal`}
        description={`${treatment.shortDesc} Atendimento com a Dra. Juliana Leal, reumatologista em Maceió — Alagoas.`}
        path={`/tratamentos/${treatment.slug}`}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "MedicalCondition",
          name: treatment.title,
          description: treatment.overview,
          signOrSymptom: treatment.symptoms.map((s) => ({ "@type": "MedicalSignOrSymptom", name: s })),
          possibleTreatment: treatment.approach.map((a) => ({ "@type": "MedicalTherapy", name: a })),
          associatedAnatomy: { "@type": "AnatomicalStructure", name: "Sistema musculoesquelético" },
          relevantSpecialty: { "@type": "MedicalSpecialty", name: "Rheumatology" },
        }}
      />
      <Header />
      <main
        className="relative min-h-screen"
        style={{ backgroundImage: DARK_BG, backgroundAttachment: "fixed" }}
      >
        {/* Hero */}
        <section className="relative overflow-hidden pt-28 pb-16 sm:pb-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 119px, rgba(231,211,163,0.08) 119px, rgba(231,211,163,0.08) 120px)",
            }}
          />
          <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-14 lg:px-8">
            <div>
              <Link
                to="/#tratamentos-resumo"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#e7d9b5]/80 transition-colors hover:text-[#e7d9b5]"
              >
                <ArrowLeft className="h-4 w-4" />
                Todos os tratamentos
              </Link>
              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                Tratamento reumatológico
              </p>
              <h1
                className="mt-3 text-balance text-4xl font-normal leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {treatment.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
                {treatment.shortDesc}
              </p>
              <div className="mt-8 h-px w-24 bg-[#e7d9b5]/50" />
            </div>

            {/* Image with soft mask */}
            {treatment.image && (
              <div className="relative">
                <div
                  className="relative aspect-[4/5] w-full overflow-hidden border border-white/10 bg-white/[0.03]"
                  style={{ boxShadow: "0 30px 80px -30px rgba(0,0,0,0.7)" }}
                >
                  <img
                    src={treatment.image}
                    alt={treatment.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1229] via-transparent to-transparent" />
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
                        boxShadow: "0 0 12px rgba(231,217,181,0.5)",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Content */}
        <section className="relative pb-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-3 lg:gap-14 lg:px-8">
            <div className="space-y-14 lg:col-span-2">
              <Block title="Sobre a condição">
                <p className="text-base leading-relaxed text-white/80 sm:text-lg">
                  {treatment.overview}
                </p>
              </Block>

              <Block title="Sinais e sintomas">
                <ul className="space-y-3">
                  {treatment.symptoms.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/85">
                      <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center border border-[#e7d9b5]/60 text-[#e7d9b5]">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-base leading-relaxed sm:text-lg">{s}</span>
                    </li>
                  ))}
                </ul>
              </Block>

              <Block title="Como tratamos">
                <ul className="space-y-3">
                  {treatment.approach.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/85">
                      <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center border border-[#e7d9b5]/60 text-[#e7d9b5]">
                        <Stethoscope className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-base leading-relaxed sm:text-lg">{s}</span>
                    </li>
                  ))}
                </ul>
              </Block>
            </div>

            {/* Sidebar CTA */}
            <aside className="lg:sticky lg:top-28 h-fit">
              <div
                className="relative border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm"
                style={{ boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)" }}
              >
                {(["tl", "tr", "bl", "br"] as const).map((c) => (
                  <span
                    key={c}
                    aria-hidden
                    className="pointer-events-none absolute h-4 w-4"
                    style={{
                      top: c.startsWith("t") ? -1 : undefined,
                      bottom: c.startsWith("b") ? -1 : undefined,
                      left: c.endsWith("l") ? -1 : undefined,
                      right: c.endsWith("r") ? -1 : undefined,
                      borderTop: c.startsWith("t") ? "1.5px solid #e7d9b5" : undefined,
                      borderBottom: c.startsWith("b") ? "1.5px solid #e7d9b5" : undefined,
                      borderLeft: c.endsWith("l") ? "1.5px solid #e7d9b5" : undefined,
                      borderRight: c.endsWith("r") ? "1.5px solid #e7d9b5" : undefined,
                    }}
                  />
                ))}
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                  Agende uma avaliação
                </p>
                <h3
                  className="mt-3 text-3xl font-normal leading-tight text-white"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Cuide de você com quem <span className="italic text-[#e7d9b5]">entende.</span>
                </h3>
                <p className="mt-3 text-base leading-relaxed text-white/70">
                  Dra. Juliana Leal — Reumatologista com pós-graduação em Dor Crônica pela USP.
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 border-2 border-[#e7d9b5]/70 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#e7d9b5] transition-all hover:border-primary hover:text-primary"
                >
                  Agendar Consulta
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </aside>
          </div>

          {/* Next treatment */}
          {next && next.slug !== treatment.slug && (
            <div className="mx-auto mt-20 max-w-6xl border-t border-white/10 px-4 pt-10 sm:px-6 lg:px-8">
              <Link
                to={`/tratamentos/${next.slug}`}
                className="group flex items-center justify-between gap-4"
              >
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                    Próximo tratamento
                  </p>
                  <p
                    className="mt-2 text-3xl font-normal text-white transition-colors group-hover:text-[#e7d9b5] sm:text-4xl"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {next.title}
                  </p>
                </div>
                <ArrowRight className="h-6 w-6 text-[#e7d9b5] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="h-px w-10 bg-[#e7d9b5]/60" />
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#e7d9b5]">
          {title}
        </p>
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}
