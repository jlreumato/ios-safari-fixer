import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

// Imagens específicas das articulações
import quadrilImage from "@/assets/joints/quadril.jpg";
import joelhoImage from "@/assets/joints/joelho.jpg";
import ombroImage from "@/assets/joints/ombro.jpg";
import maosImage from "@/assets/joints/maos.jpg";
import pesImage from "@/assets/joints/pes.jpg";

const areas = [
  { label: "Quadril", image: quadrilImage, href: "/procedimentos#infiltracao-ultrassom" },
  { label: "Joelho", image: joelhoImage, href: "/procedimentos#viscossuplementacao" },
  { label: "Ombro", image: ombroImage, href: "/procedimentos#infiltracao-ultrassom" },
  { label: "Punho e mãos", image: maosImage, href: "/procedimentos#bloqueios-anestesicos" },
  { label: "Pés e tornozelos", image: pesImage, href: "/procedimentos#prp" },
];

export default function ArcImageCarousel() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const element = stageRef.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const distance = Math.max(1, element.offsetHeight - viewport);
      setProgress(Math.max(0, Math.min(1, -rect.top / distance)));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const position = progress * (areas.length - 1);
  const active = Math.round(position);

  return (
    <div ref={stageRef} className="relative h-[360dvh]">
      <div className="sticky top-0 flex h-[100dvh] flex-col overflow-hidden py-20 lg:py-24">
        <header className="mx-auto w-full max-w-6xl px-6 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#a3813c]">
            Procedimentos · Áreas em evidência
          </p>
          <h3 className="mt-4 text-[clamp(2.5rem,6vw,4.75rem)] font-normal leading-none text-[#2a2233]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Cuidado preciso, onde dói.
          </h3>
        </header>

        <div className="relative mt-8 flex flex-1 items-center justify-center [perspective:1400px] [-webkit-perspective:1400px]">
          {areas.map((area, index) => {
            const relative = index - position;
            const angle = relative * 24;
            const radians = (angle * Math.PI) / 180;
            const x = Math.sin(radians) * 54;
            const y = Math.pow(Math.abs(relative), 1.35) * 8;
            const z = -Math.abs(relative) * 150;
            const opacity = Math.max(0.16, 1 - Math.abs(relative) * 0.26);

            return (
              <motion.a
                key={area.label}
                href={area.href}
                aria-label={`Ver procedimentos para ${area.label}`}
                className="ios-clip absolute aspect-[4/5] w-[68vw] max-w-[22rem] overflow-hidden rounded-[2rem] bg-white shadow-[0_28px_75px_-30px_rgba(42,34,51,0.45)] sm:w-[42vw] lg:w-[25vw] lg:max-w-[25rem]"
                animate={{ x: `${x}vw`, y: `${y}%`, z, rotateZ: angle * 0.16, opacity }}
                transition={{ type: "spring", stiffness: 90, damping: 24, mass: 0.7 }}
                style={{
                  zIndex: 50 - Math.round(Math.abs(relative) * 10),
                  transformStyle: "preserve-3d",
                  WebkitTransformStyle: "preserve-3d",
                  pointerEvents: Math.abs(relative) < 0.65 ? "auto" : "none",
                }}
              >
                <img src={area.image} alt={`Área de ${area.label}`} className="h-full w-full object-cover" loading="lazy" />
                <span className="absolute inset-0 bg-gradient-to-t from-[#2a2233]/80 via-transparent to-transparent" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white sm:p-8">
                  <span className="text-3xl font-normal sm:text-4xl" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{area.label}</span>
                  <ChevronRight className="mb-1 h-5 w-5" />
                </span>
              </motion.a>
            );
          })}
        </div>

        <div className="mx-auto flex items-center gap-2" aria-label={`Área ${active + 1} de ${areas.length}`}>
          {areas.map((area, index) => (
            <span
              key={area.label}
              className={`h-1 transition-all duration-300 ${index === active ? "w-10 bg-[#a3813c]" : "w-4 bg-[#2a2233]/12"}`}
            />
          ))}
        </div>

        <a href="/procedimentos" className="mx-auto mt-7 inline-flex items-center gap-3 border-b border-[#a3813c] pb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#a3813c] transition-colors hover:bg-[#a3813c]/5">
          Ver todos os procedimentos
          <ChevronRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
