import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { heroVideos, heroVideoFallbackThumb, type HeroVideo } from "@/data/heroVideos";
import VideoLightbox from "./VideoLightbox";

const DURATION = 5200; // ms por slide

export default function VideoSlideshow() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [open, setOpen] = useState<HeroVideo | null>(null);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const startRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  const total = heroVideos.length;

  const go = useCallback(
    (next: number, d: 1 | -1) => {
      setDir(d);
      setIndex(((next % total) + total) % total);
      setProgress(0);
      startRef.current = performance.now();
    },
    [total],
  );

  const next = useCallback(() => go(index + 1, 1), [go, index]);
  const prev = useCallback(() => go(index - 1, -1), [go, index]);

  // Autoplay com barra de progresso
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || paused || open) return;
    startRef.current = performance.now() - progress * DURATION;
    const tick = (t: number) => {
      const p = Math.min((t - startRef.current) / DURATION, 1);
      setProgress(p);
      if (p >= 1) {
        go(index + 1, 1);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused, open, go]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  const active = heroVideos[index];

  return (
    <>
      <div
        className="relative w-full select-none"
        aria-label="Vídeos e entrevistas da Dra. Juliana Leal"
        onKeyDown={onKey}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        tabIndex={0}
      >
        {/* Palco */}
        <div
          className="relative w-full overflow-hidden border border-[#e7d9b5]/60 bg-[#efe6d6] shadow-[0_30px_80px_-34px_rgba(42,34,51,0.45)]"
          style={{ aspectRatio: "16 / 10" }}
        >
          {heroVideos.map((v, i) => {
            const isActive = i === index;
            const offset = i === index ? 0 : dir === 1 ? 100 : -100;
            return (
              <button
                key={v.id}
                type="button"
                tabIndex={isActive ? 0 : -1}
                aria-hidden={!isActive}
                onClick={() => isActive && setOpen(v)}
                aria-label={`Assistir: ${v.title}`}
                className="group absolute inset-0 block h-full w-full cursor-pointer text-left outline-none"
                style={{
                  transform: `translate3d(${isActive ? 0 : offset}%,0,0) scale(${isActive ? 1 : 1.06})`,
                  opacity: isActive ? 1 : 0,
                  zIndex: isActive ? 2 : 1,
                  pointerEvents: isActive ? "auto" : "none",
                  transition:
                    "transform 900ms cubic-bezier(0.76,0,0.24,1), opacity 700ms ease",
                  WebkitTransform: `translate3d(${isActive ? 0 : offset}%,0,0) scale(${isActive ? 1 : 1.06})`,
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
                  className="pointer-events-none h-full w-full object-cover transition-transform duration-[6000ms] ease-out group-hover:scale-[1.04]"
                  style={{ transform: isActive ? "scale(1.02)" : "scale(1)" }}
                />

                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0813]/85 via-[#0b0813]/15 to-transparent" />
                <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/25" />

                {/* Play centralizado — capa inteira clicável */}
                <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <span className="flex h-16 w-16 items-center justify-center border border-[#e7d9b5]/85 bg-black/30 transition-transform duration-500 group-hover:scale-110">
                    <Play className="ml-0.5 h-6 w-6 fill-[#e7d9b5] text-[#e7d9b5]" />
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#e7d9b5] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    Assistir
                  </span>
                </span>

                <span className="pointer-events-none absolute inset-x-0 bottom-0 p-5 pb-8 sm:p-7 sm:pb-10">
                  <span className="block text-[11px] font-medium uppercase tracking-[0.26em] text-[#e7d9b5]">
                    {v.kind}
                  </span>
                  <span
                    className="mt-2 block text-xl leading-snug text-white sm:text-2xl"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {v.title}
                  </span>
                </span>
              </button>
            );
          })}

          {/* Setas */}
          <button
            type="button"
            onClick={prev}
            aria-label="Vídeo anterior"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center border border-[#e7d9b5]/70 bg-[#0b0813]/35 text-[#e7d9b5] backdrop-blur-sm transition-colors hover:bg-[#0b0813]/60 focus-visible:ring-2 focus-visible:ring-[#e7d9b5]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Próximo vídeo"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center border border-[#e7d9b5]/70 bg-[#0b0813]/35 text-[#e7d9b5] backdrop-blur-sm transition-colors hover:bg-[#0b0813]/60 focus-visible:ring-2 focus-visible:ring-[#e7d9b5]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Barra de progresso do slide */}
          <div className="absolute inset-x-0 bottom-0 z-10 h-[3px] bg-white/15">
            <div
              className="h-full bg-[#e7d9b5]"
              style={{ width: `${progress * 100}%`, transition: "width 120ms linear" }}
            />
          </div>
        </div>

        {/* Miniaturas / navegação */}
        <div className="mt-4 grid grid-cols-5 gap-2 sm:gap-3">
          {heroVideos.map((v, i) => (
            <button
              key={v.id}
              type="button"
              onClick={() => go(i, i > index ? 1 : -1)}
              aria-label={`Ir para: ${v.title}`}
              aria-current={i === index}
              className={`relative overflow-hidden border transition-all duration-500 focus-visible:ring-2 focus-visible:ring-[#e7d9b5] ${
                i === index
                  ? "border-[#a3813c] opacity-100"
                  : "border-[#2a2233]/15 opacity-60 hover:opacity-95"
              }`}
              style={{ aspectRatio: "16 / 10" }}
            >
              <img
                src={v.thumb}
                alt=""
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (img.src !== heroVideoFallbackThumb) img.src = heroVideoFallbackThumb;
                }}
                className="h-full w-full object-cover"
              />
              {i === index && (
                <span className="pointer-events-none absolute inset-0 border border-[#e7d9b5]/70" />
              )}
            </button>
          ))}
        </div>

        <p className="mt-3 text-center text-[11px] font-light uppercase tracking-[0.24em] text-[#6b6076]">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} ·{" "}
          {active.kind}
        </p>
      </div>

      <VideoLightbox video={open} onClose={() => setOpen(null)} />
    </>
  );
}
