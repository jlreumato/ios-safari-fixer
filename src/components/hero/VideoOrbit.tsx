import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { heroVideos, heroVideoFallbackThumb, type HeroVideo } from "@/data/heroVideos";
import VideoLightbox from "./VideoLightbox";

/**
 * Orbit Rotator — as capas dos vídeos giram continuamente em um anel,
 * mantendo-se sempre na vertical (contra-rotação), no espírito do
 * componente "LogoRotator". Hover pausa e destaca; clique abre o vídeo.
 */
export default function VideoOrbit() {
  const [angle, setAngle] = useState(0);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState<HeroVideo | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const raf = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || paused || open) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      setAngle((a) => (a + dt * 0.012) % 360);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [paused, open]);

  const total = heroVideos.length;

  return (
    <div className="relative flex items-center justify-center">
      <div
        className="relative aspect-square w-[min(86vw,26rem)] lg:w-[32rem]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          setPaused(false);
          setHovered(null);
        }}
      >
        {/* anéis guia */}
        <span className="pointer-events-none absolute inset-[13%] rounded-full border border-[#b79b62]/25" />
        <span className="pointer-events-none absolute inset-[27%] rounded-full border border-[#b79b62]/15" />

        {/* núcleo */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#8a6f38]">
            Assista
          </p>
          <p
            className="mt-1 text-2xl font-normal text-[#2a2233]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Dra. Juliana
          </p>
        </div>

        {heroVideos.map((v, i) => {
          const a = angle + (i * 360) / total;
          const isHot = hovered === i;
          const vertical = v.aspect === "9/16";
          return (
            <div
              key={v.id}
              className="pointer-events-none absolute inset-0"
              style={{
                transform: `rotate(${a}deg)`,
                WebkitTransform: `rotate(${a}deg)`,
              }}
            >
              <button
                type="button"
                onClick={() => setOpen(v)}
                onMouseEnter={() => setHovered(i)}
                aria-label={`Assistir: ${v.title}`}
                className="group pointer-events-auto absolute left-1/2 top-0 block overflow-hidden bg-[#f2e9d8] shadow-[0_18px_40px_-20px_rgba(42,34,51,0.45)] ring-1 ring-[#b79b62]/40"
                style={{
                  width: vertical ? "5.5rem" : "8rem",
                  height: vertical ? "9.5rem" : "5.4rem",
                  transform: `translate(-50%, -35%) rotate(${-a}deg) scale(${isHot ? 1.12 : 1})`,
                  WebkitTransform: `translate(-50%, -35%) rotate(${-a}deg) scale(${isHot ? 1.12 : 1})`,
                  transition: "box-shadow 300ms ease",
                }}
              >
                <img
                  src={v.thumb || heroVideoFallbackThumb}
                  alt={v.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-[#2a2233]/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Play className="h-6 w-6 text-white" fill="currentColor" />
                </span>
              </button>
            </div>
          );
        })}
      </div>

      <VideoLightbox video={open} onClose={() => setOpen(null)} />
    </div>
  );
}
