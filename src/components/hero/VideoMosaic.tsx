import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import { heroVideos, heroVideoFallbackThumb, type HeroVideo } from "@/data/heroVideos";
import VideoLightbox from "./VideoLightbox";

/**
 * Mosaico de capas: cada vídeo surge do centro da tela com zoom-in
 * e assume o seu lugar fixo, preenchendo toda a seção principal.
 */

type Spot = { x: number; y: number; w: number; r: number };

// Posições em % do container (x/y = centro da capa, w = largura, r = rotação).
const DESKTOP: Spot[] = [
  { x: 8, y: 26, w: 12.5, r: -4 },
  { x: 26, y: 20, w: 13, r: 2.5 },
  { x: 44, y: 27, w: 13.5, r: -2 },
  { x: 62, y: 20, w: 13, r: 3 },
  { x: 80, y: 27, w: 12.5, r: -3 },
  { x: 94, y: 20, w: 11.5, r: 4 },
  { x: 17, y: 60, w: 13, r: 3 },
  { x: 50, y: 61, w: 14, r: -2.5 },
  { x: 83, y: 60, w: 13, r: 2 },
];

const MOBILE: Spot[] = [
  { x: 16, y: 17, w: 30, r: -4 },
  { x: 50, y: 13, w: 31, r: 2 },
  { x: 84, y: 17, w: 30, r: 4 },
  { x: 14, y: 42, w: 29, r: 3 },
  { x: 50, y: 39, w: 32, r: -2 },
  { x: 86, y: 42, w: 29, r: -4 },
  { x: 20, y: 66, w: 29, r: -2 },
  { x: 52, y: 64, w: 31, r: 3 },
  { x: 84, y: 67, w: 28, r: -3 },
];

export default function VideoMosaic() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<HeroVideo | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([entry]) => {
      if (entry) setSize({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const isMobile = size.w > 0 && size.w <= 768;
  const spots = isMobile ? MOBILE : DESKTOP;

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden">
      {heroVideos.map((video, index) => {
        const spot = spots[index % spots.length];
        // Deslocamento inicial: do centro do container até o seu lugar.
        const fromX = (50 - spot.x) * (size.w / 100);
        const fromY = (50 - spot.y) * (size.h / 100);

        return (
          <motion.button
            key={video.id}
            type="button"
            onClick={() => setOpen(video)}
            aria-label={`Assistir: ${video.title}`}
            className="group absolute overflow-hidden rounded-xl bg-[#f2e9d8] shadow-[0_18px_40px_-20px_rgba(42,34,51,0.45)] ring-1 ring-[#b79b62]/40 transition-shadow duration-300 hover:shadow-[0_28px_60px_-18px_rgba(42,34,51,0.55)]"
            style={{
              left: `${spot.x}%`,
              top: `${spot.y}%`,
              width: `${spot.w}%`,
              aspectRatio: "9 / 16",
              marginLeft: `-${spot.w / 2}%`,
              translateY: "-50%",
              zIndex: 10 + (index % 3),
            }}
            initial={
              reduced
                ? { opacity: 1, scale: 1, x: 0, y: 0 }
                : { opacity: 0, scale: 0.04, x: fromX, y: fromY, rotate: 0 }
            }
            animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: spot.r }}
            transition={{
              duration: reduced ? 0 : 1.05,
              delay: reduced ? 0 : 0.12 + index * 0.09,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 40 }}
          >
            <img
              src={video.thumb || heroVideoFallbackThumb}
              alt={video.title}
              loading={index < 4 ? "eager" : "lazy"}
              draggable={false}
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-[#2a2233]/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Play className="h-6 w-6 text-white" fill="currentColor" />
            </span>
          </motion.button>
        );
      })}

      <VideoLightbox video={open} onClose={() => setOpen(null)} />
    </div>
  );
}
