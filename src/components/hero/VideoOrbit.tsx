import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [open, setOpen] = useState<HeroVideo | null>(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [containerWidth, setContainerWidth] = useState(0);

  const angleRef = useRef(0);
  const isDragging = useRef(false);
  const didDrag = useRef(false);
  const isVisible = useRef(true);
  const dragVelocity = useRef(0);
  const scrollVelocity = useRef(0);

  const speed = 14;
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
      const entry = entries[0];
      if (entry) setContainerWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scaleFactor = windowWidth <= 480 ? 0.4 : windowWidth <= 768 ? 0.6 : 1;
  const baseWidth = 220 * scaleFactor;
  const gap = 20 * scaleFactor;
  const count = heroVideos.length || 1;

  const itemDims = useMemo(
    () =>
      heroVideos.map((video) => {
        const vertical = video.aspect === "9/16";
        const width = vertical ? baseWidth * 0.62 : baseWidth;
        const height = vertical ? width * (16 / 9) : width * (9 / 16);
        return { width, height };
      }),
    [baseWidth]
  );

  const avgWidth = itemDims.reduce((s, d) => s + d.width, 0) / count;
  const radiusX = Math.max((count * (avgWidth + gap)) / (2 * Math.PI), 200 * scaleFactor);
  const radiusZ = radiusX * 0.85;
  const radiusY = 40 * scaleFactor;
  const containerPadding = windowWidth <= 480 ? 80 : 100;
  const maxHeight = Math.max(...itemDims.map((d) => d.height));
  const orbitWidth = radiusX * 2 + avgWidth + containerPadding;
  const orbitHeight = radiusY * 2 + maxHeight + containerPadding;
  const measuredWidth = containerWidth || windowWidth * 0.5;
  const fitScale = Math.min(1, measuredWidth / orbitWidth);
  const scaledHeight = orbitHeight * fitScale;

  // A órbita é atualizada diretamente no DOM para não renderizar React a 60 fps.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const degreesPerSecond = 360 / speed;
    const applyPositions = () => {
      heroVideos.forEach((_, index) => {
        const element = itemRefs.current[index];
        if (!element) return;

        const itemAngle = (angleRef.current + (360 / count) * index) % 360;
        const radians = (itemAngle * Math.PI) / 180;
        const x = Math.sin(radians) * radiusX;
        const z = Math.cos(radians) * radiusZ;
        const y = -Math.cos(radians) * radiusY;
        const depth = (z + radiusZ) / (2 * radiusZ);
        const itemScale = 0.35 + depth * 0.65;
        const transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${itemScale})`;

        element.style.transform = transform;
        element.style.webkitTransform = transform;
        element.style.zIndex = String(Math.round(depth * 100));
        element.dataset.front = depth > 0.75 ? "true" : "false";
      });
    };

    applyPositions();
    if (reducedMotion) return;

    let raf = 0;
    let lastTime: number | null = null;

    const animate = (time: number) => {
      if (!isVisible.current || document.hidden) {
        lastTime = time;
        raf = requestAnimationFrame(animate);
        return;
      }

      if (lastTime === null) lastTime = time;
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      if (Math.abs(scrollVelocity.current) > 0.01) {
        angleRef.current = (angleRef.current + scrollVelocity.current) % 360;
        scrollVelocity.current *= 0.97;
      } else {
        scrollVelocity.current = 0;
      }

      if (!isDragging.current) {
        if (Math.abs(dragVelocity.current) > 0.1) {
          angleRef.current = (angleRef.current + dragVelocity.current * dt) % 360;
          dragVelocity.current *= 0.92;
        } else {
          dragVelocity.current = 0;
          angleRef.current = (angleRef.current + degreesPerSecond * dt) % 360;
        }
      }

      applyPositions();
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [count, radiusX, radiusY, radiusZ, speed]);

  // Suspende o trabalho gráfico fora do viewport.
  useEffect(() => {
    const element = sectionRef.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry?.isIntersecting ?? false;
      },
      { rootMargin: "40% 0px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

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
    didDrag.current = false;
    dragVelocity.current = 0;
  }, []);

  const handleDrag = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 6) didDrag.current = true;
    angleRef.current = (angleRef.current + info.delta.x * sensitivity) % 360;
    dragVelocity.current = info.delta.x * sensitivity * 60;
  }, []);

  const handleDragEnd = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    isDragging.current = false;
    dragVelocity.current = info.velocity.x * sensitivity * 0.35;
  }, []);

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
        {heroVideos.map((video, index) => {
          const dims = itemDims[index];
          if (!dims) return null;
          return (
            <button
              key={video.id}
              ref={(element) => {
                itemRefs.current[index] = element;
              }}
              type="button"
              onClick={() => {
                if (!didDrag.current) setOpen(video);
                didDrag.current = false;
              }}
              aria-label={`Assistir: ${video.title}`}
              className="group absolute overflow-hidden bg-[#f2e9d8] opacity-0 shadow-[0_18px_40px_-20px_rgba(42,34,51,0.45)] ring-1 ring-[#b79b62]/40 transition-[box-shadow,opacity] duration-300 hover:shadow-[0_28px_60px_-20px_rgba(42,34,51,0.55)] animate-[fadeIn_0.6s_ease-out_forwards]"
              style={{
                left: "50%",
                top: "50%",
                width: dims.width,
                height: dims.height,
                marginLeft: -dims.width / 2,
                marginTop: -dims.height / 2,
                transformStyle: "preserve-3d",
                WebkitTransformStyle: "preserve-3d",
                willChange: "transform",
                animationDelay: `${index * 80}ms`,
              }}
            >
              <img
                src={video.thumb || heroVideoFallbackThumb}
                alt={video.title}
                loading="lazy"
                draggable={false}
                className="h-full w-full object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-[#2a2233]/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-data-[front=true]:opacity-100">
                <Play className="h-6 w-6 text-white" fill="currentColor" />
              </span>
            </button>
          );
        })}
      </motion.div>

      <VideoLightbox video={open} onClose={() => setOpen(null)} />
    </div>
  );
}
