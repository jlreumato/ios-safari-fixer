import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Phone, Stethoscope } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { getTreatment, treatments } from "@/data/treatments";

const WHATSAPP_URL =
  "https://wa.me/5582999872509?text=Olá! Gostaria de agendar uma consulta com a Dra. Juliana Leal.";

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
        <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
          <h1 className="text-3xl">Tratamento não encontrado</h1>
          <Link to="/tratamentos" className="mt-6 text-primary underline">
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
      <Header />
      <main className="bg-[#faf8f5]">
        {/* Hero */}
        <section
          className={`relative overflow-hidden bg-gradient-to-br ${treatment.gradient} pt-28 pb-20`}
        >
          <div
            className="pointer-events-none absolute -top-24 -right-24 h-[70vmin] w-[70vmin] rounded-full opacity-30 blur-3xl"
            style={{ backgroundColor: treatment.accent }}
          />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Link
              to="/tratamentos"
              className="inline-flex items-center gap-2 text-base font-medium text-[#4a4560] transition-colors hover:text-[#2b2540]"
            >
              <ArrowLeft className="h-4 w-4" />
              Todos os tratamentos
            </Link>
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.22em] text-[#5a4d7a]">
              Tratamento reumatológico
            </p>
            <h1
              className="mt-3 text-balance text-4xl font-normal leading-[1.02] tracking-tight text-[#2b2540] sm:text-6xl lg:text-7xl"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {treatment.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#4a4560] sm:text-lg">
              {treatment.shortDesc}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2
                  className="text-3xl font-normal text-[#2b2540] sm:text-4xl"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Sobre a condição
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#4a4560] sm:text-lg">
                  {treatment.overview}
                </p>
              </div>

              <div>
                <h2
                  className="text-3xl font-normal text-[#2b2540] sm:text-4xl"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Sinais e sintomas
                </h2>
                <ul className="mt-5 space-y-3">
                  {treatment.symptoms.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#4a4560]">
                      <span
                        className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${treatment.accent}22`, color: treatment.accent }}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-base sm:text-lg leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2
                  className="text-3xl font-normal text-[#2b2540] sm:text-4xl"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Como tratamos
                </h2>
                <ul className="mt-5 space-y-3">
                  {treatment.approach.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#4a4560]">
                      <span
                        className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${treatment.accent}22`, color: treatment.accent }}
                      >
                        <Stethoscope className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-base sm:text-lg leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar CTA */}
            <aside className="lg:sticky lg:top-28 h-fit">
              <div className="rounded-3xl border border-[#e6dfd3] bg-white p-8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)]">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                  Agende uma avaliação
                </p>
                <h3
                  className="mt-3 text-2xl font-normal text-[#2b2540]"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Cuide de você com quem entende.
                </h3>
                <p className="mt-3 text-base leading-relaxed text-[#5a5568]">
                  Dra. Juliana Leal — Reumatologista com pós-graduação em Dor Crônica pela USP.
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block"
                >
                  <Button
                    size="lg"
                    className="btn-champagne btn-glow-ring w-full gap-2 active:scale-[0.97]"
                  >
                    <Phone className="h-5 w-5" />
                    Agendar Consulta
                  </Button>
                </a>
              </div>
            </aside>
          </div>

          {/* Next treatment */}
          {next && next.slug !== treatment.slug && (
            <div className="mt-20 border-t border-[#e6dfd3] pt-10">
              <Link
                to={`/tratamentos/${next.slug}`}
                className="group flex items-center justify-between gap-4"
              >
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                    Próximo tratamento
                  </p>
                  <p
                    className="mt-2 text-3xl font-normal text-[#2b2540] transition-colors group-hover:text-[#8e82b8] sm:text-4xl"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {next.title}
                  </p>
                </div>
                <ArrowRight className="h-6 w-6 text-[#8e82b8] transition-transform group-hover:translate-x-1" />
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
