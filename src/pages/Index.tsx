import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Clinic from "@/components/Clinic";
import Testimonials from "@/components/Testimonials";
import TreatmentsGrid from "@/components/TreatmentsGrid";
import Procedures from "@/components/Procedures";
import Blog from "@/components/Blog";
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
        <div className="relative">
          <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
            <Hero />
          </div>
          <div className="about-parallax relative z-10">
            <About />
          </div>
        </div>
        <Clinic />
        <TreatmentsGrid />
        <Procedures />
        <Testimonials />
        <Blog />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Index;
