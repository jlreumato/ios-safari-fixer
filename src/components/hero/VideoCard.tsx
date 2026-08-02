import { Play } from "lucide-react";
import type { HeroVideo } from "@/data/heroVideos";

type Props = {
  video: HeroVideo;
  onOpen: (v: HeroVideo) => void;
  /** Estilo de posicionamento/profundidade (desktop) ou vazio (mobile). */
  style?: React.CSSProperties;
  className?: string;
};

export default function VideoCard({ video, onOpen, style, className = "" }: Props) {
  return (
    <button
      type="button"
      onClick={() => onOpen(video)}
      aria-label={`Assistir: ${video.title}`}
      style={style}
      className={`group relative block overflow-hidden border border-[#e7d9b5]/35 bg-black/40 text-left shadow-[0_18px_50px_-20px_rgba(0,0,0,0.75)] outline-none transition-[transform,box-shadow,border-color] duration-500 hover:border-[#e7d9b5]/70 focus-visible:ring-2 focus-visible:ring-[#e7d9b5] ${className}`}
    >
      <img
        src={video.thumb}
        alt={video.title}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={(e) => {
          const img = e.currentTarget;
          if (img.src !== heroVideoFallbackThumb) img.src = heroVideoFallbackThumb;
        }}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
      />


      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

      {/* Play */}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e7d9b5]/70 bg-black/35 -webkit-backdrop-filter backdrop-filter backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
          <Play className="ml-0.5 h-4 w-4 fill-[#e7d9b5] text-[#e7d9b5]" />
        </span>
      </span>

      <span className="pointer-events-none absolute inset-x-0 bottom-0 p-3">
        <span className="block text-[9px] font-medium uppercase tracking-[0.2em] text-[#e7d9b5]/85">
          {video.kind}
        </span>
        <span className="mt-1 block text-[13px] leading-snug text-white/90 line-clamp-2">
          {video.title}
        </span>
      </span>
    </button>
  );
}
