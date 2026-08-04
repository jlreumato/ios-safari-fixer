import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { useInView } from "@/hooks/useInView";
import ctaImage from "@/assets/cta-liberdade.jpg";


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
  const { ref: revealRef, inView: revealed } = useInView<HTMLElement>({ threshold: 0.05 });
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

  // Single-scroll choreography (~60vh of travel):
  //  · Phase 1 (0 → 0.7): assemble phrase word-by-word (starts already in motion,
  //    so there is no empty screen at the beginning of the section).
  //  · Phase 2 (0.7 → 0.9): reveal subtitle + button.
  //  · Phase 3 (0.9 → 1): short pause so the CTA can be read/clicked.
  const p = Math.max(0, Math.min(1, progress * 1.1 + 0.08));
  const phraseRange = 0.7;
  const buttonRange = 0.2;
  const perWord = phraseRange / SEGMENTS.length;

  // Progress per segment: 0 → not yet, 1 → fully seated.
  const segProgress = SEGMENTS.map((_, i) => {
    const start = i * perWord;
    const raw = (p - start) / perWord;
    return Math.max(0, Math.min(1, raw));
  });

  const buttonProgress = Math.max(0, Math.min(1, (p - phraseRange) / buttonRange));

  // Zoom reveal da imagem de fundo (quadro pequeno → tela cheia)
  const zoomT = Math.max(0, Math.min(1, p / 0.85));
  const zoomE = 1 - Math.pow(1 - zoomT, 3);


  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        revealRef.current = el;
      }}
      className="relative"
      style={{ height: "160vh" }}
    >

      <div
        className={`sticky top-0 flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-white via-[#fbf7ee] to-[#f2e9d8] transition-opacity duration-700 ease-out ${
          revealed ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Scroll zoom reveal — a imagem nasce num quadro pequeno e abre em tela cheia */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden
        >
          <div
            className="relative h-full w-full overflow-hidden"
            style={{
              clipPath: `inset(${(1 - zoomE) * 34}% ${(1 - zoomE) * 32}% ${(1 - zoomE) * 34}% ${(1 - zoomE) * 32}%)`,
              WebkitClipPath: `inset(${(1 - zoomE) * 34}% ${(1 - zoomE) * 32}% ${(1 - zoomE) * 34}% ${(1 - zoomE) * 32}%)`,
            }}
          >
            <img
              src={ctaImage}
              alt=""
              width={1536}
              height={1024}
              loading="lazy"
              className="h-full w-full object-cover"
              style={{
                transform: `scale(${1.28 - zoomE * 0.28})`,
                WebkitTransform: `scale(${1.28 - zoomE * 0.28})`,
                opacity: 0.35 + zoomE * 0.4,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/55 to-[#f2e9d8]/80" />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#8e82b8]/15 blur-[120px]" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#a3813c]/12 blur-[140px]" />
        </div>


        <div className="relative mx-auto max-w-5xl px-6 text-center sm:px-8">
          <h2
            className="text-balance flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2 text-5xl font-normal uppercase leading-[1.05] tracking-tight text-[#2a2233] sm:text-6xl lg:text-7xl xl:text-8xl"
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
                  className={`inline-block ${isAccent ? "italic text-[#a3813c]" : ""}`}
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
            <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-[#4a4152] sm:text-xl lg:text-2xl">
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
