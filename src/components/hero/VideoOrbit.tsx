import { useEffect, useRef, useState, useCallback } from "react";
import { motion, type PanInfo } from "framer-motion";
import { Play } from "lucide-react";
import { heroVideos, heroVideoFallbackThumb, type HeroVideo } from "@/data/heroVideos";
import VideoLightbox from "./VideoLightbox";

/**
 * LogoRotator 3D — recriação fiel do componente Framer.
 *
 * Os itens (vídeos) orbitam em um círculo 3D inclinado, com profundidade real,
 * drag/touch com momentum, rotação automática e influência do scroll da página.
 */
export default function VideoOrbit() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<HeroVideo | null>(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [containerWidth, setContainerWidth] = useState(0);
  const [tick, setTick] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  const angleRef = useRef(0);
  const isDragging = useRef(false);
  const autoSpeed = useRef(1);
  const dragVelocity = useRef(0);
  const scrollVelocity = useRef(0);

  const speed = 14; // segundos por volta completa
  const sensitivity = 0.3;

  // Responsividade + fit ao container
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !("ResizeObserver" in window)) return;
    const el = sectionRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scaleFactor = windowWidth <= 480 ? 0.4 : windowWidth <= 768 ? 0.6 : 1;
  const baseWidth = 220 * scaleFactor;
  const gap = 20 * scaleFactor;

  const count = heroVideos.length || 1;

  const itemDims = heroVideos.map((v) => {
    const vertical = v.aspect === "9/16";
    const w = vertical ? baseWidth * 0.62 : baseWidth;
    const h = vertical ? baseWidth * 0.62 * (16 / 9) : baseWidth * (9 / 16);
    return { width: w, height: h, vertical };
  });

  const avgWidth = itemDims.reduce((s, d) => s + d.width, 0) / count;
  const radiusX = Math.max((count * (avgWidth + gap)) / (2 * Math.PI), 200 * scaleFactor);
  const radiusZ = radiusX * 0.85;
  const radiusY = 40 * scaleFactor;
  const containerPadding = windowWidth <= 480 ? 80 : 100;

  // Loop de animação contínua
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    let lastTime: number | null = null;

    const animate = (time: number) => {
      if (lastTime === null) lastTime = time;
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      // Scroll velocity decay
      if (Math.abs(scrollVelocity.current) > 0.01) {
        angleRef.current = (angleRef.current + scrollVelocity.current) % 360;
        scrollVelocity.current *= 0.97;
      } else {
        scrollVelocity.current = 0;
      }

      // Drag momentum + auto-rotate
      if (!isDragging.current) {
        if (Math.abs(dragVelocity.current) > 0.1) {
          angleRef.current = (angleRef.current + dragVelocity.current * dt) % 360;
          dragVelocity.current *= 0.92;
        } else {
          dragVelocity.current = 0;
          const degreesPerSecond = 360 / speed;
          angleRef.current =
            (angleRef.current + degreesPerSecond * dt * autoSpeed.current) % 360;
        }
      }

      setTick((t) => t + 1);
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  // Scroll da página influencia a rotação quando o Hero está próximo do viewport
  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = sectionRef.current;
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const isNearViewport = rect.bottom > -viewH * 0.5 && rect.top < viewH * 1.5;
      if (isNearViewport) {
        scrollVelocity.current += delta * 0.15;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDragStart = useCallback(() => {
    isDragging.current = true;
    autoSpeed.current = 0;
    dragVelocity.current = 0;
  }, []);

  const handleDrag = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    angleRef.current = (angleRef.current + info.delta.x * sensitivity) % 360;
    dragVelocity.current = info.delta.x * sensitivity * 60;
  }, []);

  const handleDragEnd = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    isDragging.current = false;
    autoSpeed.current = 1;
    dragVelocity.current = info.velocity.x * sensitivity * 0.35;
  }, []);

  const baseAngle = angleRef.current;

  const items = heroVideos.map((v, i) => {
    const dims = itemDims[i];
    const itemAngle = (baseAngle + (360 / count) * i) % 360;
    const rad = (itemAngle * Math.PI) / 180;
    const x = Math.sin(rad) * radiusX;
    const z = Math.cos(rad) * radiusZ;
    const y = -Math.cos(rad) * radiusY;
    const depthNorm = (z + radiusZ) / (2 * radiusZ);
    const scale = 0.35 + depthNorm * 0.65;

    return {
      video: v,
      dims,
      x,
      y,
      z,
      scale,
      depthNorm,
      index: i,
    };
  });

  const sorted = [...items].sort((a, b) => a.z - b.z);

  const maxHeight = Math.max(...itemDims.map((d) => d.height));
  const orbitWidth = radiusX * 2 + avgWidth + containerPadding;
  const orbitHeight = radiusY * 2 + maxHeight + containerPadding;
  const measuredWidth =
    sectionRef.current?.getBoundingClientRect().width || containerWidth || windowWidth * 0.5;
  const fitScale = Math.min(1, measuredWidth / orbitWidth);
  const scaledHeight = orbitHeight * fitScale;

  return (
    <div
      ref={sectionRef}
      className="relative flex w-full items-center justify-center overflow-hidden"
      style={{ minHeight: `${scaledHeight}px` }}
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        className="relative cursor-grab active:cursor-grabbing"
        style={{
          width: `${orbitWidth}px`,
          height: `${orbitHeight}px`,
          transform: `scale(${fitScale})`,
          WebkitTransform: `scale(${fitScale})`,
          transformOrigin: "center center",
          perspective: "1200px",
          WebkitPerspective: "1200px",
          touchAction: "pan-y",
          userSelect: "none",
        }}
      >
        {sorted.map((item) => {
          const { video, dims, x, y, z, scale, depthNorm, index } = item;
          const isHot = hovered === index;
          const finalScale = isHot ? scale * 1.08 : scale;
          const isFront = depthNorm > 0.75;

          return (
            <motion.button
              key={video.id}
              type="button"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
              onClick={() => setOpen(video)}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              aria-label={`Assistir: ${video.title}`}
              className="group absolute overflow-hidden bg-[#f2e9d8] shadow-[0_18px_40px_-20px_rgba(42,34,51,0.45)] ring-1 ring-[#b79b62]/40"
              style={{
                left: "50%",
                top: "50%",
                width: dims.width,
                height: dims.height,
                marginLeft: -dims.width / 2,
                marginTop: -dims.height / 2,
                transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${finalScale})`,
                WebkitTransform: `translate3d(${x}px, ${y}px, ${z}px) scale(${finalScale})`,
                zIndex: Math.round(depthNorm * 100),
                transformStyle: "preserve-3d",
                WebkitTransformStyle: "preserve-3d",
                transition: isDragging.current
                  ? "box-shadow 300ms ease"
                  : "box-shadow 300ms ease, transform 120ms ease-out",
                willChange: "transform",
                boxShadow: isHot
                  ? "0 28px 60px -20px rgba(42,34,51,0.55)"
                  : "0 18px 40px -20px rgba(42,34,51,0.45)",
              }}
            >
              <img
                src={video.thumb || heroVideoFallbackThumb}
                alt={video.title}
                loading="lazy"
                draggable={false}
                className="h-full w-full object-cover"
              />
              <span
                className={`absolute inset-0 flex items-center justify-center bg-[#2a2233]/15 transition-opacity duration-300 ${
                  isFront ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              >
                <Play className="h-6 w-6 text-white" fill="currentColor" />
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      <VideoLightbox video={open} onClose={() => setOpen(null)} />
    </div>
  );
}
