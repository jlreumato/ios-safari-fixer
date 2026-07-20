import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const WHATSAPP_URL = "https://wa.me/5582999872509?text=Olá! Gostaria de agendar uma consulta com a Dra. Juliana Leal.";

/**
 * Full-screen CTA. Uses a sticky viewport with 2x scroll length so the content
 * can perform a zoom-OUT reveal (starts very zoomed-in + blurred, shrinks to
 * natural size) — the visual inverse of the zoom-in in the Transformação section.
 */
export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the section top hits the top of the viewport,
      // 1 after scrolling ~1 viewport past that point.
      const scrolled = Math.min(1, Math.max(0, -rect.top / vh));
      setProgress(scrolled);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Zoom-out: scale from 1.9 → 1, blur 14px → 0, opacity 0 → 1
  const scale = 1.9 - 0.9 * progress;
  const blur = 14 * (1 - progress);
  const opacity = Math.min(1, 0.15 + progress * 1.4);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "200vh" }}
    >
      <div className="sticky top-0 flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[hsl(260_35%_18%)] via-[hsl(260_40%_14%)] to-[hsl(255_45%_10%)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#8e82b8]/25 blur-[120px]" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#e7d9b5]/12 blur-[140px]" />
        </div>

        <div
          className="relative mx-auto max-w-4xl px-6 text-center sm:px-8"
          style={{
            transform: `scale(${scale})`,
            filter: `blur(${blur}px)`,
            opacity,
            transformOrigin: "center center",
            transition: "transform 80ms linear, filter 80ms linear, opacity 80ms linear",
            willChange: "transform, filter, opacity",
          }}
        >
          <h2
            className="text-balance text-5xl font-normal uppercase leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Vou transformar sua{" "}
            <span className="italic text-[#e7d9b5]">dor</span> em{" "}
            <span className="italic text-[#e7d9b5]">liberdade!</span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl lg:text-2xl">
            Agende sua consulta e dê o primeiro passo rumo a uma vida com menos dor e mais qualidade.
          </p>

          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-10 inline-block">
            <Button
              size="lg"
              className="btn-champagne btn-glow-ring gap-3 px-12 py-7 text-lg sm:text-xl active:scale-[0.97]"
            >
              <WhatsAppIcon size={24} />
              Agendar pelo WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
