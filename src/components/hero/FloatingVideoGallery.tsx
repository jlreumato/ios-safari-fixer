import { useEffect, useRef, useState } from "react";
import { heroVideos, type HeroVideo } from "@/data/heroVideos";
import VideoCard from "./VideoCard";
import VideoLightbox from "./VideoLightbox";

/** Cluster compacto: posições em % do container, animação e profundidade por card. */
const LAYOUT = [
  { left: "0%", top: "6%", width: "48%", z: 30, anim: "float-card-a", dur: "9s", delay: "0s", blur: 0, scale: 1 },
  { left: "41%", top: "20%", width: "27%", z: 40, anim: "float-card-b", dur: "7.5s", delay: "-1.2s", blur: 0, scale: 1 },
  { left: "70%", top: "2%", width: "26%", z: 20, anim: "float-card-c", dur: "10.5s", delay: "-3s", blur: 1.2, scale: 0.96 },
  { left: "9%", top: "58%", width: "42%", z: 25, anim: "float-card-c", dur: "8.5s", delay: "-2s", blur: 0.6, scale: 0.98 },
  { left: "63%", top: "50%", width: "24%", z: 35, anim: "float-card-a", dur: "8s", delay: "-4s", blur: 0, scale: 1 },
];

export default function FloatingVideoGallery() {
  const [open, setOpen] = useState<HeroVideo | null>(null);
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
        x: ((e.clientX - (r.left + r.width / 2)) / r.width) * 18,
        y: ((e.clientY - (r.top + r.height / 2)) / r.height) * 14,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      {/* Desktop: cluster flutuante */}
      <div
        ref={wrapRef}
        aria-label="Vídeos e entrevistas da Dra. Juliana Leal"
        className="relative hidden h-[520px] w-full lg:block xl:h-[580px]"
        style={{
          transform: `translate3d(${tilt.x}px, ${tilt.y}px, 0)`,
          transition: "transform 700ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {heroVideos.map((v, i) => {
          const l = LAYOUT[i % LAYOUT.length];
          return (
            <div
              key={v.id}
              className="float-card absolute opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]"
              style={{
                left: l.left,
                top: l.top,
                width: l.width,
                zIndex: l.z,
                animationDelay: `${0.5 + i * 0.12}s`,
              }}
            >
              <div
                className="float-card"
                style={{
                  animationName: l.anim,
                  animationDuration: l.dur,
                  animationDelay: l.delay,
                  filter: l.blur ? `blur(${l.blur}px)` : undefined,
                }}
              >
                <VideoCard
                  video={v}
                  onOpen={setOpen}
                  style={{ aspectRatio: v.aspect.replace("/", " / "), transform: `scale(${l.scale})` }}
                  className="w-full"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile / tablet: carrossel horizontal */}
      <div
        className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:hidden"
        style={{ touchAction: "pan-x pan-y", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
      >
        {heroVideos.map((v, i) => (
          <div
            key={v.id}
            className="float-card shrink-0 snap-center"
            style={{
              width: v.aspect === "9/16" ? "44vw" : "68vw",
              animationName: LAYOUT[i % LAYOUT.length].anim,
              animationDuration: "9s",
              animationDelay: `${-i * 1.4}s`,
            }}
          >
            <VideoCard
              video={v}
              onOpen={setOpen}
              style={{ aspectRatio: v.aspect.replace("/", " / ") }}
              className="w-full"
            />
          </div>
        ))}
      </div>

      <VideoLightbox video={open} onClose={() => setOpen(null)} />
    </>
  );
}
