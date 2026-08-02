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
      className={`group relative block w-full cursor-pointer overflow-hidden bg-black/40 text-left outline-none transition-[box-shadow,border-color] duration-500 focus-visible:ring-2 focus-visible:ring-[#a3813c] ${
        featured
          ? "card-featured-glow border border-[#a3813c]/85"
          : "border border-[#a3813c]/35 shadow-[0_18px_45px_-22px_rgba(42,34,51,0.30)] hover:border-[#a3813c]/75"
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
        className="pointer-events-none h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
      />

      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${
          featured ? "from-black/80 via-black/10" : "from-black/85 via-black/15"
        } to-transparent`}
      />

      {/* Véu que escurece levemente a capa toda ao passar o mouse */}
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/25" />

      {/* Indicador do cartão em destaque */}
      {featured && (
        <span className="pointer-events-none absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-[#a3813c] animate-pulse" />
      )}

      {/* Play — cobre toda a capa; o botão inteiro é clicável */}
      <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3">
        <span
          className={`flex items-center justify-center border border-[#a3813c]/80 bg-black/35 transition-transform duration-500 group-hover:scale-110 ${
            featured ? "h-16 w-16" : "h-12 w-12"
          }`}
        >
          <Play
            className={`ml-0.5 fill-[#a3813c] text-[#a3813c] ${featured ? "h-6 w-6" : "h-4 w-4"}`}
          />
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#a3813c] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          Assistir
        </span>
      </span>


      <span
        className={`pointer-events-none absolute inset-x-0 bottom-0 ${featured ? "p-5" : "p-3"}`}
      >
        <span
          className={`block font-medium uppercase text-[#a3813c]/90 ${
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
