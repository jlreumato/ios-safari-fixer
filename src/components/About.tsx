import draJulianaAbout from "@/assets/dra-juliana-about.jpg.asset.json";
import { useInView } from "@/hooks/useInView";

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section id="sobre" className="py-28 lg:py-40">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="flex flex-col items-center gap-12 lg:flex-row-reverse lg:gap-16">
          {/* Photo */}
          <div className="flex-shrink-0">
            <div className="relative h-[26rem] w-80 sm:h-[30rem] sm:w-96">
              <img
                src={draJulianaAbout.url}
                alt="Dra. Juliana Leal"
                className="h-full w-full object-cover object-top"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to bottom, #000 0%, #000 65%, rgba(0,0,0,0.35) 92%, rgba(0,0,0,0) 100%)",
                  maskImage:
                    "linear-gradient(to bottom, #000 0%, #000 65%, rgba(0,0,0,0.35) 92%, rgba(0,0,0,0) 100%)",
                }}
                loading="lazy"
              />
            </div>
          </div>


          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#a3813c]">
              Sobre mim
            </p>
            <h2
              className="mt-6 text-balance text-[clamp(2.25rem,6vw,4rem)] font-normal leading-[1.05] tracking-tight text-[#2a2233]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Dra. Juliana Leal
            </h2>
            <p className="mt-3 text-xs font-light uppercase tracking-[0.22em] text-[#4a4152]/70">
              CRM/AL 6717 · RQE 4857
            </p>
            <div className="mt-10 space-y-6 text-lg font-light leading-relaxed text-[#4a4152]/90 lg:max-w-[46ch] lg:text-xl">
              <p>
                Reumatologista com pós-graduação em Dor pela USP-SP. Especialista
                em dores crônicas e doenças autoimunes.
              </p>
              <p>
                Escuta atenta, diagnóstico preciso e um plano de cuidado feito
                para a sua vida.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
