import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import { treatments } from "@/data/treatments";
import Seo from "@/components/Seo";

/**
 * Página de Tratamentos — mesma linguagem visual do restante do site:
 * fundo profundo lilás/ameixa, tipografia Cormorant Garamond em títulos,
 * detalhes em champagne e cards com imagem em close com scrim inferior.
 */
export default function Tratamentos() {
  const navigate = useNavigate();

  const siteBg = `
    radial-gradient(circle at 20% 15%, hsl(260 45% 22% / 0.75), transparent 55%),
    radial-gradient(circle at 80% 40%, hsl(40 40% 30% / 0.35), transparent 55%),
    radial-gradient(circle at 30% 85%, hsl(275 40% 20% / 0.7), transparent 55%),
    linear-gradient(160deg, hsl(258 40% 12%) 0%, hsl(268 35% 15%) 55%, hsl(255 40% 10%) 100%)
  `;

  return (
    <>
      <Seo
        title="Tratamentos Reumatológicos em Maceió (AL) — Dra. Juliana Leal"
        description="Conheça os tratamentos oferecidos pela Dra. Juliana Leal em Maceió — Alagoas: artrite reumatoide, lúpus, fibromialgia, artrose, osteoporose, gota e outras doenças autoimunes."
        path="/tratamentos"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Tratamentos reumatológicos — Dra. Juliana Leal",
          itemListElement: treatments.map((t, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `https://julianalealreumato.com.br/tratamentos/${t.slug}`,
            name: t.title,
          })),
        }}
      />
      <Header />
      <main
        style={{
          backgroundImage: siteBg,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
      >
        {/* Hero */}
        <section className="relative overflow-hidden pt-36 pb-20 lg:pt-44 lg:pb-28">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 119px, rgba(231,211,163,0.08) 119px, rgba(231,211,163,0.08) 120px)",
            }}
          />
          <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#e7d9b5]">
              Tratamentos Reumatológicos
            </p>
            <h1
              className="mx-auto mt-5 max-w-4xl text-balance text-5xl font-normal leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Cuidado especializado para cada{" "}
              <span className="italic text-[#e7d9b5]">condição reumatológica.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
              Atendimento humanizado e baseado em evidências. Selecione uma
              condição para conhecer os detalhes do tratamento.
            </p>
            <div className="mx-auto mt-10 h-px w-40 bg-[#e7d9b5]/50" />
          </div>
        </section>

        {/* Grid de tratamentos */}
        <section className="relative pb-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {treatments.map((t, i) => (
                <button
                  key={t.slug}
                  type="button"
                  onClick={() => navigate(`/tratamentos/${t.slug}`)}
                  className="group relative flex h-[440px] flex-col overflow-hidden border-2 border-[#2a2730] text-left transition-all duration-500 hover:border-[#e7d9b5]/60 hover:-translate-y-1"
                >
                  <img
                    src={t.image}
                    alt={t.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1229]/95 via-[#1a1229]/45 to-transparent" />
                  <div className="absolute left-4 top-4 z-10 border border-[#e7d9b5]/50 bg-[#1a1229]/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e7d9b5] backdrop-blur">
                    {String(i + 1).padStart(2, "0")} / {String(treatments.length).padStart(2, "0")}
                  </div>
                  <div className="relative z-10 mt-auto p-6">
                    <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e7d9b5]">
                      <span className="h-px w-8 bg-[#e7d9b5]/70" />
                      <span>Tratamento</span>
                    </div>
                    <h2
                      className="mt-3 text-balance text-3xl leading-tight tracking-tight text-white"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {t.title}
                    </h2>
                    <p className="mt-3 line-clamp-2 text-sm leading-snug text-white/80">
                      {t.shortDesc}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/80">
                        Ver detalhes
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center border-2 border-[#e7d9b5] text-[#e7d9b5] transition-transform duration-500 group-hover:translate-x-1">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </>
  );
}
