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

  // 0 → centralizado · 1 → alinhado à esquerda com a foto à direita
  const t = Math.max(0, Math.min(1, (p - 0.08) / 0.62));
  const e = 1 - Math.pow(1 - t, 3);

  return (
    <section id="sobre" ref={stageRef} className="relative h-[190dvh]">
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-[100dvh] items-center justify-center">
            {/* Texto */}
            <div
              className="relative z-10 w-full text-center"
              style={{
                opacity: 0.25 + e * 0.75,
                transform: `translate3d(0, ${(1 - e) * 24}px, 0)`,
                WebkitTransform: `translate3d(0, ${(1 - e) * 24}px, 0)`,
              }}
            >
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
              <div
                className="mt-10 space-y-6 text-lg font-light leading-relaxed text-[#4a4152]/90 lg:text-xl"
                style={{
                  maxWidth: "46ch",
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

            {/* Foto — surge da direita */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 hidden justify-center lg:flex"
              style={{
                opacity: e,
                transform: `scale(${Math.max(0.01, e)})`,
                WebkitTransform: `scale(${Math.max(0.01, e)})`,
                transformOrigin: "center bottom",
                WebkitTransformOrigin: "center bottom",
              }}
            >
              <div className="relative h-[58dvh] w-[40vw] max-w-[34rem]">
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

          {/* Mobile: foto abaixo do texto */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center lg:hidden">
            <img
              src={draJulianaAbout.url}
              alt="Dra. Juliana Leal"
              loading="lazy"
              className="h-[40dvh] w-[72vw] object-cover object-top"
              style={{
                opacity: e,
                transform: `scale(${Math.max(0.01, e)})`,
                WebkitTransform: `scale(${Math.max(0.01, e)})`,
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
