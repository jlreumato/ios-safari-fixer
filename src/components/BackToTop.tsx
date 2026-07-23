import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Voltar ao início"
      className={`fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-[#e7d3a3]/60 bg-[#1a1229]/80 text-[#e7d3a3] shadow-lg -webkit-backdrop-filter backdrop-filter backdrop-blur-md transition-all duration-300 hover:bg-[#e7d3a3] hover:text-[#1a1229] active:scale-95 ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp className="h-6 w-6" />
    </button>
  );
}
