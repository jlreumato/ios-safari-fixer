import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import { heroVideos, heroVideoFallbackThumb, type HeroVideo } from "@/data/heroVideos";
import VideoLightbox from "./VideoLightbox";

/**
 * Grade de capas: duas linhas lado a lado preenchendo toda a seção.
 * Cada capa surge do centro da tela com zoom-in até o seu lugar na grade.
 */

const total = heroVideos.length;
const firstRowCount = Math.ceil(total / 2);
const rows = [heroVideos.slice(0, firstRowCount), heroVideos.slice(firstRowCount)];

export default function VideoMosaic() {
  const [open, setOpen] = useState<HeroVideo | null>(null);
  const reduced = useReducedMotion();

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex h-1/2 w-full">
          {row.map((video, colIndex) => {
            const index = rowIndex * firstRowCount + colIndex;
            return (
              <motion.button
                key={video.id}
                type="button"
                onClick={() => setOpen(video)}
                aria-label={`Assistir: ${video.title}`}
                className="group relative h-full min-w-0 flex-1 overflow-hidden bg-[#f2e9d8]"
                initial={
                  reduced
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.04 }
                }
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: reduced ? 0 : 0.9,
                  delay: reduced ? 0 : 0.1 + index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <img
                  src={video.thumb || heroVideoFallbackThumb}
                  alt={video.title}
                  loading={index < 5 ? "eager" : "lazy"}
                  draggable={false}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-[#2a2233]/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Play className="h-6 w-6 text-white" fill="currentColor" />
                </span>
              </motion.button>
            );
          })}
        </div>
      ))}

      <VideoLightbox video={open} onClose={() => setOpen(null)} />
    </div>
  );
}
