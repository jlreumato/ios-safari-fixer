import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import WhatsAppForm from "@/components/WhatsAppForm";
import BackToTop from "@/components/BackToTop";
import Seo from "@/components/Seo";
import TransformaDor from "@/components/TransformaDor";
import ScrollFadeText from "@/components/ScrollFadeText";
import InverseQuote from "@/components/InverseQuote";
import ProcessSteps from "@/components/transformador/ProcessSteps";
import { journeyHowToLd } from "@/data/journey";
import { Bone, Brain, HeartHandshake, Salad } from "lucide-react";

const TITLE = "Programa TransformaDOR | Dra. Juliana Leal";
const DESC =
  "Programa TransformaDOR: 8 etapas conduzidas pela Dra. Juliana Leal, da primeira consulta ao cuidado multidisciplinar contínuo para controle da dor crônica em Maceió (AL).";

const team = [
  { icon: Bone, label: "Fisioterapia", desc: "Mobilidade, força e autonomia." },
  { icon: Salad, label: "Nutrição", desc: "Alimentação anti-inflamatória." },
  { icon: Brain, label: "Psicologia", desc: "Manejo da dor crônica." },
  { icon: HeartHandshake, label: "Psiquiatria", desc: "Cuidado integrado quando indicado." },
];

const forWhom = [
  "Dor que persiste há mais de três meses",
  "Diagnóstico ainda indefinido",
  "Tratamentos anteriores sem resultado",
  "Doença reumática já diagnosticada, sem controle",
];

export default function Transformador() {
  return (
    <>
      <Seo title={TITLE} description={DESC} path="/transformador" jsonLd={journeyHowToLd} />
      <Header />

      <main>
        {/* Abertura */}
        <section className="relative flex min-h-[86dvh] items-center overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 55% at 78% 22%, rgba(231,217,181,0.55) 0%, rgba(231,217,181,0) 70%), linear-gradient(160deg, #ffffff 0%, #fbf7ee 50%, #f2e9d8 100%)",
            }}
          />
          <div className="relative mx-auto w-full max-w-6xl px-6 py-32 text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#a3813c]">
              Programa
            </p>
            <h1 className="mt-8">
              <TransformaDor size="clamp(2.25rem, 11vw, 9rem)" />
            </h1>
            <p className="mx-auto mt-10 max-w-[40ch] text-lg font-light leading-relaxed text-[#4a4152]">
              Um caminho de oito etapas para devolver movimento, sono e liberdade.
            </p>
            <a
              href="#processo"
              className="mt-14 inline-flex items-center gap-3 border border-[#a3813c]/60 px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.3em] text-[#a3813c] transition-colors hover:bg-[#f2e9d8]"
            >
              Ver as etapas
            </a>
          </div>
        </section>

        {/* Manifesto */}
        <section className="py-28 lg:py-40">
          <ScrollFadeText
            as="h2"
            text="Dor crônica não se resolve com uma receita. Se resolve com método, rede e tempo."
            highlight={["método", "rede", "tempo"]}
            className="mx-auto max-w-4xl px-6 text-balance text-center text-[clamp(1.75rem,4.5vw,3.5rem)] font-normal leading-[1.15] text-[#2a2233]"
          />
        </section>

        {/* Para quem é */}
        <section className="pb-28 lg:pb-40">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#a3813c]">
              Para quem é
            </p>
            <ul className="mt-12 list-none border-t border-[#2a2233]/12 p-0">
              {forWhom.map((item) => (
                <li
                  key={item}
                  className="border-b border-[#2a2233]/12 py-7 text-[clamp(1.15rem,2.6vw,1.75rem)] font-light leading-snug text-[#2a2233]"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* As 8 etapas */}
        <section id="processo" className="pb-28 lg:pb-40">
          <ProcessSteps />
        </section>

        {/* Equipe multidisciplinar */}
        <section className="pb-28 lg:pb-40">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#a3813c]">
              Rede de cuidado
            </p>
            <h2
              className="mt-6 max-w-[24ch] text-[clamp(1.85rem,4.5vw,3rem)] font-normal leading-[1.1] text-[#2a2233]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Nunca sozinha no seu tratamento.
            </h2>
            <div className="mt-14 grid gap-px border border-[#2a2233]/12 bg-[#2a2233]/12 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((t) => (
                <div key={t.label} className="bg-[#fdfbf7] p-8">
                  <t.icon className="h-6 w-6 text-[#a3813c]" strokeWidth={1.4} />
                  <h3 className="mt-6 text-lg font-normal text-[#2a2233]">{t.label}</h3>
                  <p className="mt-2 text-sm font-light leading-relaxed text-[#4a4152]/85">
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Citação */}
        <section className="pb-28 lg:pb-40">
          <InverseQuote
            quote="Meu compromisso é transformar sua dor em liberdade."
            cite="Dra. Juliana Leal · CRM/AL 6717 · RQE 4857"
          />
        </section>

        {/* Agendamento */}
        <WhatsAppForm />
      </main>

      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </>
  );
}
