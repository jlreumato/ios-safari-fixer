import { useEffect, useRef } from "react";
import heroReel from "@/assets/hero-reel-juliana.mp4";
import portrait from "@/assets/dra-juliana-leal.webp";

type Props = {
  /** deslocamento de scroll para o parallax leve */
  offset?: number;
};

/**
 * Coluna vertical alta que combina o retrato da Dra. Juliana (discreto, em
 * segundo plano) com o vídeo do consultório usado apenas como textura.
 */
export default function CoverMedia({ offset = 0 }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const slow = () => {
      try {
        v.playbackRate = 0.55;
      } catch {
        /* ignore */
      }
    };
    slow();
    v.addEventListener("loadedmetadata", slow);
    return () => v.removeEventListener("loadedmetadata", slow);
  }, []);

  const fade =
    "linear-gradient(to bottom, transparent 0%, #000 14%, #000 74%, transparent 100%)";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative h-full w-full"
      style={{ transform: `translate3d(0, ${offset * -0.06}px, 0)` }}
    >
      <div
        className="ios-clip relative mx-auto h-full w-full max-w-[520px] overflow-hidden rounded-[28px]"
        style={{
          WebkitMaskImage: fade,
          maskImage: fade,
        }}
      >
        {/* Vídeo como textura */}
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.35]"
          style={{
            WebkitFilter: "grayscale(0.85) sepia(0.18) contrast(1.02)",
            filter: "grayscale(0.85) sepia(0.18) contrast(1.02)",
          }}
          src={heroReel}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />

        {/* Retrato */}
        <img
          src={portrait}
          alt=""
          loading="eager"
          decoding="async"
          className="cover-kenburns absolute inset-0 h-full w-full object-cover object-[50%_22%] opacity-[0.92]"
          style={{
            WebkitFilter: "saturate(0.94) contrast(1.02)",
            filter: "saturate(0.94) contrast(1.02)",
          }}
        />

        {/* Harmonização quente sobre a coluna */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(255,253,248,0.28) 0%, rgba(255,253,248,0) 40%, rgba(255,253,248,0.55) 100%)",
          }}
        />
      </div>
    </div>
  );
}
