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
  const t = Math.max(0, Math.min(1, (p - 0.12) / 0.5));
  const e = 1 - Math.pow(1 - t, 3);

  return (
    <section id="sobre" ref={stageRef} className="relative" style={{ height: "220vh" }}>
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-10 lg:gap-16">
            {/* Texto */}
            <div
              className="flex-1"
              style={{
                textAlign: e > 0.5 ? "left" : "center",
                transform: `translate3d(${(1 - e) * 12}%, 0, 0)`,
                WebkitTransform: `translate3d(${(1 - e) * 12}%, 0, 0)`,
                transition: "text-align 200ms linear",
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
                  marginLeft: e > 0.5 ? undefined : "auto",
                  marginRight: e > 0.5 ? undefined : "auto",
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
              className="hidden flex-shrink-0 lg:block"
              style={{
                opacity: e,
                transform: `translate3d(${(1 - e) * 60}px, 0, 0)`,
                WebkitTransform: `translate3d(${(1 - e) * 60}px, 0, 0)`,
                clipPath: `inset(0 ${(1 - e) * 100}% 0 0)`,
                WebkitClipPath: `inset(0 ${(1 - e) * 100}% 0 0)`,
              }}
            >
              <div className="relative h-[30rem] w-96">
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
          <div className="mt-10 flex justify-center lg:hidden">
            <img
              src={draJulianaAbout.url}
              alt="Dra. Juliana Leal"
              loading="lazy"
              className="h-[22rem] w-72 object-cover object-top"
              style={{
                opacity: 0.35 + e * 0.65,
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
