import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const WHATSAPP_URL = "https://wa.me/5582999872509?text=Olá! Gostaria de agendar uma consulta com a Dra. Juliana Leal.";

type Segment = {
  text: string;
  italic?: boolean;
  /** Entry angle: from where the word flies in. */
  from: { x: number; y: number; rot: number; scale?: number };
};

const SEGMENTS: Segment[] = [
  { text: "Vou",         from: { x: -60, y: -40, rot: -18 } },
  { text: "transformar", from: { x:  60, y: -30, rot:  14 } },
  { text: "sua",         from: { x: -40, y:  50, rot: -10 } },
  { text: "dor",         italic: true, from: { x:   0, y:   0, rot:   0, scale: 4 } },
  { text: "em",          from: { x:  50, y:  40, rot:  12 } },
  { text: "liberdade!",  italic: true, from: { x: -70, y:  10, rot: -8, scale: 0.4 } },
];

/**
 * Full-screen CTA. Each scroll step assembles the phrase word-by-word,
 * with each word flying in from a different angle.
 */
export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = Math.max(1, el.offsetHeight - vh);
      setProgress(Math.max(0, Math.min(1, -rect.top / total)));
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

  // Reserve the last 15% for the button reveal; the first 85% assembles the phrase.
  const phraseRange = 0.85;
  const perWord = phraseRange / SEGMENTS.length;

  // Progress per segment: 0 → not yet, 1 → fully seated.
  const segProgress = SEGMENTS.map((_, i) => {
    const start = i * perWord;
    const raw = (progress - start) / perWord;
    return Math.max(0, Math.min(1, raw));
  });

  const buttonProgress = Math.max(0, Math.min(1, (progress - phraseRange) / (1 - phraseRange)));

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "220vh" }}
    >
      <div className="sticky top-0 flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[hsl(260_35%_18%)] via-[hsl(260_40%_14%)] to-[hsl(255_45%_10%)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#8e82b8]/25 blur-[120px]" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#e7d9b5]/12 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 text-center sm:px-8">
          <h2
            className="text-balance flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2 text-5xl font-normal uppercase leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {SEGMENTS.map((seg, i) => {
              const p = segProgress[i];
              // Ease-out cubic
              const e = 1 - Math.pow(1 - p, 3);
              const fromScale = seg.from.scale ?? 0.6;
              const tx = seg.from.x * (1 - e);
              const ty = seg.from.y * (1 - e);
              const rot = seg.from.rot * (1 - e);
              const sc = fromScale + (1 - fromScale) * e;
              const isAccent = seg.italic;
              return (
                <span
                  key={i}
                  className={`inline-block ${isAccent ? "italic text-[#e7d9b5]" : ""}`}
                  style={{
                    transform: `translate3d(${tx}vw, ${ty}vh, 0) rotate(${rot}deg) scale(${sc})`,
                    opacity: e,
                    filter: `blur(${(1 - e) * 8}px)`,
                    transformOrigin: "center center",
                    willChange: "transform, opacity, filter",
                    transition: "transform 120ms linear, opacity 120ms linear, filter 120ms linear",
                  }}
                >
                  {seg.text}
                </span>
              );
            })}
          </h2>

          <div
            style={{
              opacity: buttonProgress,
              transform: `translateY(${(1 - buttonProgress) * 30}px)`,
              transition: "opacity 200ms ease, transform 200ms ease",
              willChange: "opacity, transform",
            }}
          >
            <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl lg:text-2xl">
              Agende sua consulta e dê o primeiro passo rumo a uma vida com menos dor e mais qualidade.
            </p>

            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block">
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
      </div>
    </section>
  );
}
