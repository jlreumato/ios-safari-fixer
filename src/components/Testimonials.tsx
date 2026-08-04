import { useInView } from "@/hooks/useInView";
import ReelCarousel from "@/components/testimonials/ReelCarousel";

export default function Testimonials() {
  const { ref, inView } = useInView();

  return (
    <section id="depoimentos" className="overflow-hidden py-28 lg:py-40">
      <div
        ref={ref}
        className={`mx-auto max-w-4xl px-6 text-center transition-all duration-700 ease-out ${
          inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#a3813c]">
          Depoimentos
        </p>
        <h2
          className="mt-6 text-balance text-[clamp(2.25rem,6vw,4rem)] font-normal leading-[1.05] tracking-tight text-[#2a2233]"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Histórias reais, em vídeo
        </h2>
        <p className="mx-auto mt-6 max-w-[42ch] text-base font-light leading-relaxed text-[#4a4152]/85 sm:text-lg">
          Pacientes contam, com suas próprias palavras, o que mudou.
        </p>
      </div>

      <div className="mt-16 lg:mt-20">
        <ReelCarousel />
      </div>
    </section>
  );
}
