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

const HOME_TITLE = "Dra. Juliana Leal — Reumatologista em Maceió (AL) | Especialista em Dor";
const HOME_DESC = "Reumatologista em Maceió — Alagoas. Especialista em Dor pela USP-SP. Tratamento humanizado de artrite, lúpus, fibromialgia, artrose, osteoporose e doenças autoimunes. CRM/AL 6717 · RQE 4857. Agende sua consulta.";

const Index = () => {
  return (
    <>
      <Seo title={HOME_TITLE} description={HOME_DESC} path="/" />
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

