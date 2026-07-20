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
import IntroCover from "@/components/IntroCover";

const Index = () => {
  return (
    <>
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

