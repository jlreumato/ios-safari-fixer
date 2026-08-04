import { useEffect, useRef, useState } from "react";

/**
 * Citação com "inversão" de cor no scroll: o texto começa em traço leve e
 * é preenchido em tinta escura da esquerda para a direita conforme avança.
 */
export default function InverseQuote({
  quote,
  cite,
  className = "",
}: {
  quote: string;
  cite?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const v = (vh * 0.85 - rect.top) / (rect.height + vh * 0.35);
      setP(Math.max(0, Math.min(1, v)));
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

  const clip = `inset(0 ${(1 - p) * 100}% 0 0)`;

  return (
    <div ref={ref} className={`relative mx-auto max-w-4xl px-6 text-center ${className}`}>
      <span
        aria-hidden
        className="mx-auto mb-8 block h-px w-16 bg-[#a3813c]/50"
        style={{ transform: `scaleX(${0.2 + p * 0.8})` }}
      />
      <blockquote className="relative">
        {/* camada base (traço leve) */}
        <p
          className="text-balance font-normal leading-[1.25] text-[#2a2233]/22"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(1.6rem, 4vw, 3.25rem)",
          }}
        >
          {quote}
        </p>
        {/* camada de tinta revelada */}
        <p
          aria-hidden
          className="absolute inset-0 text-balance font-normal leading-[1.25] text-[#2a2233]"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(1.6rem, 4vw, 3.25rem)",
            clipPath: clip,
            WebkitClipPath: clip,
            transition: "clip-path 180ms linear, -webkit-clip-path 180ms linear",
          }}
        >
          {quote}
        </p>
      </blockquote>
      {cite && (
        <footer className="mt-8 text-[11px] font-medium uppercase tracking-[0.3em] text-[#a3813c]">
          {cite}
        </footer>
      )}
    </div>
  );
}
