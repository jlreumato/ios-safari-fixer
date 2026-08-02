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
      className={`fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-[#a3813c]/60 bg-[#faf7f2]/80 text-[#a3813c] shadow-lg -webkit-backdrop-filter backdrop-filter backdrop-blur-md transition-all duration-300 hover:bg-[#a3813c] hover:text-[#faf7f2] active:scale-95 ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp className="h-6 w-6" />
    </button>
  );
}
