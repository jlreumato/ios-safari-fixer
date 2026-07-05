import { Children, ReactNode, useEffect, useRef, useState } from "react";

/**
 * Empilha os filhos em um "palco" fixo (sticky) enquanto o usuário rola a página.
 * Cada card entra deslizando da direita para a esquerda, sobrepondo o anterior.
 * Ao terminar o último, o scroll volta ao normal e a próxima seção aparece.
 *
 * Uso: renderize apenas no mobile — em telas maiores, mantenha o layout original.
 */
export default function MobileParallaxStack({
  children,
  stepVh = 90,
  className = "",
}: {
  children: ReactNode;
  /** Distância de scroll (em vh) para cada card entrar completamente. */
  stepVh?: number;
  className?: string;
}) {
  const items = Children.toArray(children);
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsets, setOffsets] = useState<number[]>(() =>
    items.map((_, i) => (i === 0 ? 0 : 100))
  );

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const stepPx = (vh * stepVh) / 100;
      const scrolled = -rect.top; // 0 quando o topo do container encosta no topo da tela
      const next = items.map((_, i) => {
        if (i === 0) return 0;
        const p = (scrolled - (i - 1) * stepPx) / stepPx;
        const clamped = Math.max(0, Math.min(1, p));
        return (1 - clamped) * 105; // 105% garante que saia totalmente da viewport
      });
      setOffsets(next);
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
  }, [items.length, stepVh]);

  // Altura total = scroll necessário para (N-1) cards entrarem + 1 tela de "leitura" do último.
  const totalVh = (items.length - 1) * stepVh + 100;

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: `${totalVh}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="relative w-full px-4">
          {items.map((child, i) => (
            <div
              key={i}
              className="absolute inset-x-4 top-1/2 -translate-y-1/2"
              style={{
                transform: `translate3d(${offsets[i] ?? 0}%, -50%, 0)`,
                zIndex: i + 1,
                willChange: "transform",
              }}
            >
              {child}
            </div>
          ))}
          {/* Espaçador para dar altura ao palco (o primeiro card define a altura). */}
          <div className="invisible" aria-hidden>
            {items[0]}
          </div>
        </div>
      </div>
    </div>
  );
}
