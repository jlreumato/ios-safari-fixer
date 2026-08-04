import { useEffect, useRef, useState, type ElementType } from "react";

/**
 * Revelação de texto palavra a palavra conforme o scroll.
 * Cada palavra sobe e ganha opacidade de acordo com o avanço do bloco na tela.
 */
export default function ScrollFadeText({
  text,
  as: Tag = "p",
  className = "",
  highlight = [],
}: {
  text: string;
  as?: ElementType;
  className?: string;
  /** Palavras (lowercase, sem pontuação) exibidas em dourado itálico. */
  highlight?: string[];
}) {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const words = text.split(" ");
  const hi = highlight.map((h) => h.toLowerCase());

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = (vh * 0.95 - rect.top) / (vh * 0.5 + rect.height);
      setProgress(Math.max(0, Math.min(1, p)));
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

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        const local = Math.max(0, Math.min(1, (progress - start * 0.8) / 0.22));
        const clean = w.replace(/[^\p{L}]/gu, "").toLowerCase();
        const isHi = hi.includes(clean);
        return (
          <span
            key={`${w}-${i}`}
            className={isHi ? "italic text-[#a3813c]" : undefined}
            style={{
              display: "inline-block",
              opacity: 0.12 + local * 0.88,
              transform: `translate3d(0, ${(1 - local) * 12}px, 0)`,
              WebkitTransform: `translate3d(0, ${(1 - local) * 12}px, 0)`,
              transition: "opacity 220ms linear, transform 260ms ease-out",
              willChange: "opacity, transform",
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        );
      })}
    </Tag>
  );
}
