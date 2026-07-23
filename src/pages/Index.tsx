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
import BackToTop from "@/components/BackToTop";

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
        <About />
        <Clinic />
        <TreatmentsGrid />
        <Procedures />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Index;

