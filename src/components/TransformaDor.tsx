import { useEffect, useRef, useState } from "react";

/**
 * Marca do programa. "Transforma" + "DOR" formam uma única palavra que
 * NUNCA quebra: o tamanho é fluido (clamp em vw) para sempre caber na tela.
 */
export default function TransformaDor({
  size = "clamp(2rem, 10.5vw, 10rem)",
  className = "",
  serif = true,
}: {
  /** font-size CSS (use clamp com vw para nunca estourar a largura). */
  size?: string;
  className?: string;
  serif?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setRevealed(true);
        observer.disconnect();
      }
    }, { threshold: 0.35 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const letters = "TransformaDOR".split("");

  return (
    <span
      ref={ref}
      translate="no"
      className={`inline-block whitespace-nowrap align-baseline tracking-tight ${className}`}
      style={{
        fontSize: size,
        lineHeight: 1.02,
        fontFamily: serif ? "'Cormorant Garamond', Georgia, serif" : undefined,
        hyphens: "none",
        WebkitHyphens: "none",
        wordBreak: "keep-all",
      }}
    >
      {letters.map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className={`inline-block ${index < 9 ? "font-normal text-[#2a2233]" : "font-semibold text-[#a3813c]"}`}
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translate3d(0,0,0) rotateY(0deg)" : "translate3d(0,0.7em,0) rotateY(75deg)",
            WebkitTransform: revealed ? "translate3d(0,0,0) rotateY(0deg)" : "translate3d(0,0.7em,0) rotateY(75deg)",
            transition: `opacity 420ms ease ${index * 55}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${index * 55}ms`,
          }}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}
