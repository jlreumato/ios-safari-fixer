import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Seo from "@/components/Seo";
import { treatments } from "@/data/treatments";

const WHATSAPP_URL =
  "https://wa.me/5582999872509?text=Olá! Gostaria de agendar uma consulta com a Dra. Juliana Leal.";

export default function TratamentosPage() {
  return (
    <>
      <Seo
        title="Tratamentos Reumatológicos em Maceió (AL) — Dra. Juliana Leal"
        description="Fibromialgia, artrose, osteoporose, artrite reumatoide, gota, artrite psoriásica e outras doenças imunológicas — cuidado humanizado em Maceió, Alagoas."
        path="/tratamentos"
      />
      <Header />
      <main
        className="relative min-h-screen"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 15%, hsl(260 45% 22% / 0.75), transparent 55%),
            radial-gradient(circle at 80% 40%, hsl(40 40% 30% / 0.35), transparent 55%),
            radial-gradient(circle at 30% 85%, hsl(275 40% 20% / 0.7), transparent 55%),
            linear-gradient(160deg, hsl(258 40% 12%) 0%, hsl(268 35% 15%) 55%, hsl(255 40% 10%) 100%)
          `,
          backgroundAttachment: "fixed",
        }}
      >
        {/* Intro */}
        <section className="relative flex min-h-[55vh] items-end overflow-hidden pt-28 pb-14">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 119px, rgba(231,211,163,0.08) 119px, rgba(231,211,163,0.08) 120px)",
            }}
          />
          <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Tratamentos Reumatológicos
            </p>
            <h1
              className="mt-3 max-w-3xl text-balance text-4xl font-normal leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Cuidado para cada{" "}
              <span className="italic text-[#e7d9b5]">condição.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              Atendimento humanizado e baseado em evidências nas principais áreas da
              reumatologia — do diagnóstico ao acompanhamento contínuo.
            </p>
          </div>
        </section>

        {/* Grid de tratamentos — cantos retos */}
        <section className="relative pb-20">
          <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:gap-8 lg:px-8">
            {treatments.map((t, i) => (
              <Link
                key={t.slug}
                to={`/tratamentos/${t.slug}`}
                className="group relative flex aspect-[3/4] flex-col overflow-hidden border border-white/10 bg-white/[0.03] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-transform duration-500 hover:-translate-y-1"
              >
                <img
                  src={t.image}
                  alt={t.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

                <div className="absolute left-4 top-4 z-10 px-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e7d9b5] sm:text-xs">
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(treatments.length).padStart(2, "0")}
                </div>

                <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6 text-white">
                  <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#e7d9b5] sm:text-xs">
                    <span className="h-px w-8 bg-[#e7d9b5]/70" />
                    <span>Tratamento</span>
                  </div>
                  <h2
                    className="mt-2 text-balance text-2xl leading-tight tracking-tight sm:text-3xl"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {t.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-snug text-white/85 sm:text-base">
                    {t.shortDesc}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/85 sm:text-xs">
                      Saiba mais
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center border-2 border-[#e7d9b5] text-[#e7d9b5] transition-transform duration-500 group-hover:scale-110">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA dentro da sessão */}
          <div className="mx-auto mt-20 flex max-w-3xl flex-col items-center gap-6 px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
              Vamos conversar sobre você
            </p>
            <h3
              className="text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Pronto para transformar sua{" "}
              <span className="italic text-[#e7d9b5]">dor em liberdade?</span>
            </h3>
            <p className="max-w-xl text-base leading-relaxed text-white/75">
              Agende sua avaliação e receba um plano de cuidado personalizado — do
              diagnóstico preciso ao acompanhamento contínuo.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-champagne inline-flex items-center gap-3 px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em]"
            >
              Agendar consulta
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
