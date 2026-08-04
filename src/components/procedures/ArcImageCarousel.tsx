import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import quadrilImage from "@/assets/treatments/musculares.jpg.asset.json";
import joelhoImage from "@/assets/treatments/artrose.jpg.asset.json";
import ombroImage from "@/assets/procedures/infiltracao.jpg.asset.json";
import maosImage from "@/assets/treatments/artrite.jpg.asset.json";
import tornozeloImage from "@/assets/procedures/bloqueio.jpg.asset.json";

const areas = [
  { label: "Quadril", image: quadrilImage.url, href: "/procedimentos#infiltracao-ultrassom" },
  { label: "Joelho", image: joelhoImage.url, href: "/procedimentos#viscossuplementacao" },
  { label: "Ombro", image: ombroImage.url, href: "/procedimentos#infiltracao-ultrassom" },
  { label: "Punho e mãos", image: maosImage.url, href: "/procedimentos#bloqueios-anestesicos" },
  { label: "Pés e tornozelos", image: tornozeloImage.url, href: "/procedimentos#prp" },
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
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-primary">
            Procedimentos · Áreas em evidência
          </p>
          <h3 className="mt-4 text-[clamp(2.5rem,6vw,4.75rem)] font-normal leading-none text-foreground">
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
                className="ios-clip absolute aspect-[4/5] w-[68vw] max-w-[22rem] overflow-hidden rounded-[2rem] bg-card shadow-[0_28px_75px_-30px_hsl(var(--foreground)/0.45)] sm:w-[42vw] lg:w-[25vw] lg:max-w-[25rem]"
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
                <span className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-primary-foreground sm:p-8">
                  <span className="text-3xl font-normal sm:text-4xl">{area.label}</span>
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
              className={`h-1 transition-all duration-300 ${index === active ? "w-10 bg-primary" : "w-4 bg-border"}`}
            />
          ))}
        </div>

        <a href="/procedimentos" className="mx-auto mt-7 inline-flex items-center gap-3 border-b border-primary pb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
          Ver todos os procedimentos
          <ChevronRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}