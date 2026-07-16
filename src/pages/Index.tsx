import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Clinic from "@/components/Clinic";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import TreatmentsGrid from "@/components/TreatmentsGrid";
import Procedures from "@/components/Procedures";
import Blog from "@/components/Blog";
import Instagram from "@/components/Instagram";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <>
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
        <Services />
        <TreatmentsGrid />
        <Procedures />
        <Testimonials />
        <Blog />
        <Instagram />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Index;
