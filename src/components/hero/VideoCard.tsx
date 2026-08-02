import { Play } from "lucide-react";
import { heroVideoFallbackThumb, type HeroVideo } from "@/data/heroVideos";

type Props = {
  video: HeroVideo;
  onOpen: (v: HeroVideo) => void;
  /** Estilo de posicionamento/profundidade (desktop) ou vazio (mobile). */
  style?: React.CSSProperties;
  className?: string;
  /** Cartão em destaque: borda cheia, brilho champagne e tipografia maior. */
  featured?: boolean;
};

export default function VideoCard({
  video,
  onOpen,
  style,
  className = "",
  featured = false,
}: Props) {
  return (
    <button
      type="button"
      onClick={() => onOpen(video)}
      aria-label={`Assistir: ${video.title}`}
      style={style}
      className={`group relative block overflow-hidden bg-black/40 text-left outline-none transition-[box-shadow,border-color] duration-500 focus-visible:ring-2 focus-visible:ring-[#e7d9b5] ${
        featured
          ? "card-featured-glow border border-[#e7d9b5]/85"
          : "border border-[#e7d9b5]/35 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.75)] hover:border-[#e7d9b5]/75"
      } ${className}`}
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
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
      />

      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${
          featured ? "from-black/80 via-black/10" : "from-black/85 via-black/15"
        } to-transparent`}
      />

      {/* Indicador do cartão em destaque */}
      {featured && (
        <span className="pointer-events-none absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-[#e7d9b5] animate-pulse" />
      )}

      {/* Play — quadrado de linha fina champagne */}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span
          className={`flex items-center justify-center border border-[#e7d9b5]/80 bg-black/30 -webkit-backdrop-filter backdrop-filter backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 ${
            featured ? "h-14 w-14" : "h-10 w-10"
          }`}
        >
          <Play
            className={`ml-0.5 fill-[#e7d9b5] text-[#e7d9b5] ${featured ? "h-5 w-5" : "h-3.5 w-3.5"}`}
          />
        </span>
      </span>

      <span
        className={`pointer-events-none absolute inset-x-0 bottom-0 ${featured ? "p-5" : "p-3"}`}
      >
        <span
          className={`block font-medium uppercase text-[#e7d9b5]/90 ${
            featured ? "text-[11px] tracking-[0.24em]" : "text-[9px] tracking-[0.2em]"
          }`}
        >
          {video.kind}
        </span>
        <span
          className={`mt-1 block leading-snug text-white/95 line-clamp-2 ${
            featured ? "text-[17px]" : "text-[13px]"
          }`}
        >
          {video.title}
        </span>
      </span>
    </button>
  );
}
