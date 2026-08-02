import { useEffect, useRef, useState } from "react";
import { heroVideos, type HeroVideo } from "@/data/heroVideos";
import VideoCard from "./VideoCard";
import VideoLightbox from "./VideoLightbox";

type Layer = {
  /** Posicionamento dentro da cena (em % do container). */
  pos: React.CSSProperties;
  width: string;
  rotateY: number;
  depth: number;
  z: number;
  anim: string;
  dur: string;
  delay: string;
  blur?: number;
  featured?: boolean;
};

/** Perspectiva em camadas: cada card tem rotação e profundidade próprias. */
const LAYERS: Layer[] = [
  // Entrevista 16:9 — topo direito, levemente recuada
  {
    pos: { right: "5%", top: "3%" },
    width: "46%",
    rotateY: -15,
    depth: -50,
    z: 20,
    anim: "drift-layer-b",
    dur: "9s",
    delay: "-1.2s",
    blur: 0.3,
  },
  // Reel vertical — esquerda, recuado ao fundo
  {
    pos: { left: "9%", top: "9%" },
    width: "25%",
    rotateY: 25,
    depth: -100,
    z: 10,
    anim: "drift-layer-c",
    dur: "11s",
    delay: "-3s",
    blur: 0.9,
  },
  // Entrevista 16:9 — inferior esquerda, mais ao fundo
  {
    pos: { left: "5%", bottom: "3%" },
    width: "42%",
    rotateY: 10,
    depth: -80,
    z: 15,
    anim: "drift-layer-a",
    dur: "10s",
    delay: "-5s",
    blur: 0.6,
  },

  // Reel vertical — centro, em destaque à frente de todos
  {
    pos: { left: "50%", top: "50%" },
    width: "34%",
    rotateY: 0,
    depth: 100,
    z: 40,
    anim: "drift-layer-a",
    dur: "8s",
    delay: "0s",
    featured: true,
  },
  // Reel vertical — inferior direita, profundidade intermediária
  {
    pos: { right: "4%", bottom: "12%" },
    width: "27%",
    rotateY: -20,
    depth: 20,
    z: 30,
    anim: "drift-layer-c",
    dur: "8.5s",
    delay: "-2.4s",
  },

];

export default function FloatingVideoGallery() {
  const [open, setOpen] = useState<HeroVideo | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isDesktop || reduce) return;
    const onMove = (e: MouseEvent) => {
      const r = wrapRef.current?.getBoundingClientRect();
      if (!r) return;
      setTilt({
        x: ((e.clientX - (r.left + r.width / 2)) / r.width) * 6,
        y: ((e.clientY - (r.top + r.height / 2)) / r.height) * -4,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      {/* Desktop: cena em perspectiva */}
      <div
        ref={wrapRef}
        aria-label="Vídeos e entrevistas da Dra. Juliana Leal"
        className="gallery-scene relative hidden h-[540px] w-full lg:block xl:h-[600px]"
      >
        <div
          className="gallery-plane absolute inset-0"
          style={{
            transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
            transition: "transform 900ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {heroVideos.map((v, i) => {
            const l = LAYERS[i % LAYERS.length];
            const isHovered = hovered === i;
            const center = l.featured ? "translate(-50%, -50%) " : "";
            const depth = l.depth + (isHovered ? 90 : 0);
            const scale = isHovered && l.featured ? 1.05 : 1;
            return (
              <div
                key={v.id}
                className="gallery-plane absolute opacity-0 animate-[fadeInUp_0.9s_ease-out_forwards]"
                style={{
                  ...l.pos,
                  width: l.width,
                  zIndex: isHovered ? 60 : l.z,
                  animationDelay: `${0.45 + i * 0.11}s`,
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
              >
                <div
                  className="gallery-plane"
                  style={{
                    transform: `${center}rotateY(${isHovered ? l.rotateY * 0.35 : l.rotateY}deg) translateZ(${depth}px) scale(${scale})`,
                    transition: "transform 600ms cubic-bezier(0.22,1,0.36,1), filter 600ms ease",
                    filter: l.blur && !isHovered ? `blur(${l.blur}px) brightness(0.88)` : undefined,
                  }}
                >
                  <div
                    className="float-layer"
                    style={{
                      animationName: l.anim,
                      animationDuration: l.dur,
                      animationDelay: l.delay,
                    }}
                  >
                    <VideoCard
                      video={v}
                      onOpen={setOpen}
                      featured={l.featured}
                      style={{ aspectRatio: v.aspect.replace("/", " / ") }}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile / tablet: empilhamento compacto com leve inclinação */}
      <div className="gallery-scene flex flex-col items-center gap-4 lg:hidden">
        {heroVideos.map((v, i) => {
          const l = LAYERS[i % LAYERS.length];
          const rot = i % 2 === 0 ? 7 : -7;
          return (
            <div
              key={v.id}
              className="gallery-plane w-full opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]"
              style={{
                maxWidth: v.aspect === "9/16" ? "62%" : "88%",
                animationDelay: `${0.2 + i * 0.09}s`,
              }}
            >
              <div
                className="gallery-plane"
                style={{ transform: `rotateY(${rot}deg) translateZ(${l.featured ? 30 : 0}px)` }}
              >
                <div
                  className="float-layer"
                  style={{
                    animationName: l.anim,
                    animationDuration: "12s",
                    animationDelay: `${-i * 1.6}s`,
                  }}
                >
                  <VideoCard
                    video={v}
                    onOpen={setOpen}
                    featured={l.featured}
                    style={{ aspectRatio: v.aspect.replace("/", " / ") }}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <VideoLightbox video={open} onClose={() => setOpen(null)} />
    </>
  );
}
