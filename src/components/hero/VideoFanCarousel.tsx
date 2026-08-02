import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { heroVideos, heroVideoFallbackThumb, type HeroVideo } from "@/data/heroVideos";
import VideoLightbox from "./VideoLightbox";

const DURATION = 5600; // autoplay do leque
const SPREAD = 17; // graus entre cada carta
const LIFT = 30; // deslocamento vertical por posição

/**
 * Fan Card Carousel — as capas dos vídeos abrem em leque (como cartas na mão).
 * A carta central fica em destaque; clicar nela abre o vídeo, clicar nas
 * laterais gira o leque. Suporta arraste/swipe, teclado e autoplay.
 */
export default function VideoFanCarousel() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState<HeroVideo | null>(null);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const dragRef = useRef<{ x: number; done: boolean } | null>(null);
  const timerRef = useRef<number>(0);

  const total = heroVideos.length;

  const go = useCallback(
    (next: number) => setIndex(((next % total) + total) % total),
    [total],
  );
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || paused || open) return;
    timerRef.current = window.setTimeout(() => go(index + 1), DURATION);
    return () => window.clearTimeout(timerRef.current);
  }, [index, paused, open, go]);

  // distância circular assinada até a carta ativa
  const delta = (i: number) => {
    let d = i - index;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { x: e.clientX, done: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d || d.done) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 45) {
      d.done = true;
      dx < 0 ? next() : prev();
    }
  };
  const onPointerUp = () => {
    dragRef.current = null;
  };

  return (
    <>
      <div
        className="relative w-full select-none"
        aria-label="Vídeos e entrevistas da Dra. Juliana Leal"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") next();
          if (e.key === "ArrowLeft") prev();
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          setPaused(false);
          setHovered(null);
        }}
      >
        {/* Cena do leque */}
        <div
          className="relative mx-auto h-[380px] w-full touch-pan-y sm:h-[440px] lg:h-[500px]"
          style={{ perspective: "1400px", WebkitPerspective: "1400px" } as React.CSSProperties}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {heroVideos.map((v, i) => {
            const d = delta(i);
            const abs = Math.abs(d);
            const isActive = d === 0;
            const isHovered = hovered === i;
            const angle = d * SPREAD;
            const lift = abs * LIFT + (isHovered && !isActive ? -22 : 0);
            const scale = isActive ? 1 : Math.max(0.72, 1 - abs * 0.09);
            const depth = isActive ? 60 : -abs * 60;

            return (
              <button
                key={v.id}
                type="button"
                aria-label={
                  isActive ? `Assistir: ${v.title}` : `Ver vídeo: ${v.title}`
                }
                aria-current={isActive}
                tabIndex={abs > 2 ? -1 : 0}
                onClick={() => (isActive ? setOpen(v) : go(i))}
                onPointerEnter={() => setHovered(i)}
                className="group absolute left-1/2 top-1/2 block cursor-pointer overflow-hidden border bg-[#efe6d6] text-left outline-none focus-visible:ring-2 focus-visible:ring-[#a3813c]"
                style={{
                  width: "clamp(190px, 30%, 300px)",
                  aspectRatio: "3 / 4",
                  marginLeft: "calc(clamp(190px, 30%, 300px) / -2)",
                  marginTop: "calc(clamp(190px, 30%, 300px) * -0.62)",
                  transformOrigin: "50% 145%",
                  WebkitTransformOrigin: "50% 145%",
                  transform: `translateX(${d * 26}%) rotate(${angle}deg) translateY(${lift}px) translateZ(${depth}px) scale(${scale})`,
                  WebkitTransform: `translateX(${d * 26}%) rotate(${angle}deg) translateY(${lift}px) scale(${scale})`,
                  zIndex: 40 - abs,
                  opacity: abs > 2 ? 0 : 1,
                  borderColor: isActive
                    ? "rgba(163,129,60,0.95)"
                    : "rgba(231,217,181,0.6)",
                  boxShadow: isActive
                    ? "0 34px 70px -26px rgba(42,34,51,0.55)"
                    : "0 18px 44px -24px rgba(42,34,51,0.45)",
                  transition:
                    "transform 800ms cubic-bezier(0.22,1,0.36,1), opacity 600ms ease, border-color 600ms ease, box-shadow 600ms ease",
                }}
              >
                <img
                  src={v.thumb}
                  alt={v.title}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.src !== heroVideoFallbackThumb) img.src = heroVideoFallbackThumb;
                  }}
                  className="pointer-events-none h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                />

                <span
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: isActive
                      ? "linear-gradient(to top, rgba(11,8,19,0.88) 0%, rgba(11,8,19,0.12) 45%, rgba(11,8,19,0) 75%)"
                      : "linear-gradient(to top, rgba(11,8,19,0.78) 0%, rgba(11,8,19,0.25) 55%, rgba(11,8,19,0.15) 100%)",
                  }}
                />

                {/* Play — cobre toda a capa da carta ativa */}
                <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2.5">
                  <span
                    className={`flex items-center justify-center border border-[#e7d9b5]/85 bg-black/30 transition-transform duration-500 group-hover:scale-110 ${
                      isActive ? "h-14 w-14" : "h-10 w-10"
                    }`}
                  >
                    <Play
                      className={`ml-0.5 fill-[#e7d9b5] text-[#e7d9b5] ${
                        isActive ? "h-5 w-5" : "h-3.5 w-3.5"
                      }`}
                    />
                  </span>
                  {isActive && (
                    <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#e7d9b5] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      Assistir
                    </span>
                  )}
                </span>

                <span className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
                  <span className="block text-[10px] font-medium uppercase tracking-[0.24em] text-[#e7d9b5]">
                    {v.kind}
                  </span>
                  <span
                    className={`mt-1 block leading-snug text-white line-clamp-2 ${
                      isActive ? "text-[17px]" : "text-[13px]"
                    }`}
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {v.title}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Controles */}
        <div className="mt-1 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={prev}
            aria-label="Vídeo anterior"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2a2233]/25 bg-white/70 text-[#2a2233] transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-[#a3813c]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {heroVideos.map((v, i) => (
              <button
                key={v.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Ir para: ${v.title}`}
                aria-current={i === index}
                className="h-[3px] transition-all duration-500"
                style={{
                  width: i === index ? 34 : 14,
                  background: i === index ? "#a3813c" : "rgba(42,34,51,0.25)",
                }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Próximo vídeo"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2a2233]/25 bg-white/70 text-[#2a2233] transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-[#a3813c]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-3 text-center text-[11px] font-light uppercase tracking-[0.24em] text-[#6b6076]">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} ·{" "}
          {heroVideos[index].kind}
        </p>
      </div>

      <VideoLightbox video={open} onClose={() => setOpen(null)} />
    </>
  );
}
