import { useEffect, useRef, useState } from "react";
import draJulianaAbout from "@/assets/dra-juliana-about.jpg.asset.json";

/**
 * Sobre mim — o texto nasce centralizado e, conforme o scroll avança,
 * migra para a esquerda enquanto a foto surge da direita (referência aluna.framer).
 */
export default function About() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = Math.max(1, el.offsetHeight - vh);
      setP(Math.max(0, Math.min(1, -rect.top / total)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // O texto ocupa primeiro a cena; a foto só começa a surgir após o scroll.
  const textT = Math.max(0, Math.min(1, (p - 0.04) / 0.34));
  const textEase = 1 - Math.pow(1 - textT, 3);
  const photoT = Math.max(0, Math.min(1, (p - 0.4) / 0.42));
  const photoEase = 1 - Math.pow(1 - photoT, 3);

  return (
    <section id="sobre" ref={stageRef} className="relative h-[210dvh]">
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative h-[100dvh]">
            {/* Texto */}
            <div
              className="absolute left-1/2 top-1/2 z-10 w-[min(94vw,72rem)] text-center"
              style={{
                opacity: 0.5 + textEase * 0.5,
                transform: `translate3d(-50%, calc(-50% - ${textEase * 27}dvh), 0)`,
                WebkitTransform: `translate3d(-50%, calc(-50% - ${textEase * 27}dvh), 0)`,
              }}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#a3813c]">
                Sobre mim
              </p>
              <h2
                className="mt-4 text-balance text-[clamp(2rem,6vw,4rem)] font-normal leading-[1.05] tracking-tight text-[#2a2233] lg:mt-6"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Dra. Juliana Leal
              </h2>
              <p className="mt-3 text-xs font-light uppercase tracking-[0.22em] text-[#4a4152]/70">
                CRM/AL 6717 · RQE 4857
              </p>
              <div
                className="mt-6 space-y-3 text-base font-light leading-relaxed text-[#4a4152]/90 sm:text-lg lg:mt-8 lg:space-y-4 lg:text-xl"
                style={{
                  maxWidth: "62ch",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
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

            {/* Foto — só aparece depois que o texto conclui seu movimento */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 hidden justify-center lg:flex"
              style={{
                opacity: photoEase,
                transform: `scale(${Math.max(0.01, photoEase)})`,
                WebkitTransform: `scale(${Math.max(0.01, photoEase)})`,
                transformOrigin: "center bottom",
                WebkitTransformOrigin: "center bottom",
              }}
            >
              <div className="relative h-[54dvh] w-[40vw] max-w-[34rem]">
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
          </div>

          {/* Mobile: foto abaixo do texto, com a mesma entrada tardia */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center lg:hidden">
            <img
              src={draJulianaAbout.url}
              alt="Dra. Juliana Leal"
              loading="lazy"
              className="h-[42dvh] w-[78vw] object-cover object-top"
              style={{
                opacity: photoEase,
                transform: `scale(${Math.max(0.01, photoEase)})`,
                WebkitTransform: `scale(${Math.max(0.01, photoEase)})`,
                WebkitMaskImage:
                  "linear-gradient(to bottom, #000 0%, #000 65%, rgba(0,0,0,0) 100%)",
                maskImage:
                  "linear-gradient(to bottom, #000 0%, #000 65%, rgba(0,0,0,0) 100%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
