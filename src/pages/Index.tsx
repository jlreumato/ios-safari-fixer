import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Clinic from "@/components/Clinic";
import Testimonials from "@/components/Testimonials";
import TreatmentsGrid from "@/components/TreatmentsGrid";
import Procedures from "@/components/Procedures";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import WhatsAppForm from "@/components/WhatsAppForm";
import BackToTop from "@/components/BackToTop";
import LazySection from "@/components/LazySection";

import IntroCover from "@/components/IntroCover";
import Seo from "@/components/Seo";

const HOME_TITLE = "Reumatologista em Maceió (AL) | Dra. Juliana Leal — Especialista em Dor";
const HOME_DESC = "Reumatologista em Maceió — Alagoas. Especialista em Dor pela USP-SP. Tratamento humanizado de artrite, lúpus, fibromialgia, artrose, osteoporose e doenças autoimunes. CRM/AL 6717 · RQE 4857. Agende sua consulta.";

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quando devo procurar um Reumatologista?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Procure um reumatologista se sentir dores persistentes nas articulações, músculos ou ossos, especialmente com inchaço, vermelhidão, rigidez matinal ou fadiga intensa. Dificuldade para movimentar-se, febre de origem desconhecida e lesões de pele também são sinais de alerta.",
      },
    },
    {
      "@type": "Question",
      name: 'Reumatismo é uma doença única?',
      acceptedAnswer: {
        "@type": "Answer",
        text: "Não. O termo reumatismo engloba mais de 120 doenças diferentes do aparelho locomotor. Artrite reumatoide, artrose, gota e lúpus são exemplos, cada uma com diagnóstico e tratamento específicos.",
      },
    },
    {
      "@type": "Question",
      name: "Artrite e Artrose são a mesma coisa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Não. A artrite é inflamatória e pode ter origem autoimune, enquanto a artrose (osteoartrite) é degenerativa, causada pelo desgaste da cartilagem. Os tratamentos são diferentes em cada caso.",
      },
    },
    {
      "@type": "Question",
      name: "O tratamento reumatológico é para a vida toda?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Muitas doenças reumáticas são crônicas: não têm cura, mas têm controle. Com acompanhamento correto é possível alcançar remissão, quando a doença fica inativa e a medicação pode ser ajustada sob orientação médica.",
      },
    },
  ],
};

const SERVICE_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Dra. Juliana Leal — Reumatologia e Dor",
  url: "https://julianaleal.com.br/",
  telephone: "+55-82-99987-2509",
  priceRange: "$$",
  areaServed: { "@type": "State", name: "Alagoas" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Harmony Trade Center, Sala 318 — 3º Andar",
    addressLocality: "Maceió",
    addressRegion: "AL",
    addressCountry: "BR",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Tratamentos reumatológicos",
    itemListElement: [
      "Artrite Reumatoide",
      "Lúpus Eritematoso Sistêmico",
      "Fibromialgia",
      "Artrose (Osteoartrite)",
      "Osteoporose",
      "Gota",
      "Artrite Psoriásica",
      "Doenças Autoimunes",
    ].map((n) => ({
      "@type": "Offer",
      itemOffered: { "@type": "MedicalTherapy", name: n },
    })),
  },
};

const Index = () => {
  return (
    <>
      <Seo title={HOME_TITLE} description={HOME_DESC} path="/" jsonLd={[FAQ_LD, SERVICE_LD]} />

      <IntroCover />
      <Header />
      <main>
        <Hero />
        <LazySection id="sobre" rootMargin="200px" minHeight="80dvh" ariaLabel="Sobre a Dra. Juliana Leal">
          <About />
        </LazySection>
        <LazySection id="clinica" rootMargin="200px" minHeight="100dvh" ariaLabel="Locais de atendimento">
          <Clinic />
        </LazySection>
        <LazySection id="tratamentos-resumo" rootMargin="200px" minHeight="100dvh" ariaLabel="Tratamentos">
          <TreatmentsGrid />
        </LazySection>
        <LazySection id="procedimentos" rootMargin="400px" minHeight="1100dvh" ariaLabel="Procedimentos e Programa TransformaDOR">
          <Procedures />
        </LazySection>
        <LazySection id="agendar" rootMargin="200px" minHeight="80dvh" ariaLabel="Agendar consulta">
          <WhatsAppForm />
        </LazySection>
        <LazySection id="depoimentos" rootMargin="200px" minHeight="80dvh" ariaLabel="Depoimentos">
          <Testimonials />
        </LazySection>
        <LazySection rootMargin="200px" minHeight="80dvh" ariaLabel="Perguntas frequentes">
          <FAQ />
        </LazySection>
        <LazySection rootMargin="400px" minHeight="160dvh" ariaLabel="Chamada para ação">
          <CTASection />
        </LazySection>
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />

    </>
  );
};

export default Index;

