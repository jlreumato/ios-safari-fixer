import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import RollingText from "@/components/ui/RollingText";
import CoverBackdrop from "@/components/hero/CoverBackdrop";
import CoverMedia from "@/components/hero/CoverMedia";

const WHATSAPP_URL =
  "https://wa.me/5582999872509?text=Olá! Gostaria de agendar uma consulta com a Dra. Juliana Leal.";

const TITLE_WORDS = ["Viver", "com", "DOR", "não", "é", "NORMAL."];

export default function Hero() {
  const [entered, setEntered] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const t = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setOffset(window.scrollY);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const rise = (delay: number) => ({
    opacity: entered ? 1 : 0,
    transform: entered ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 900ms ease-out ${delay}ms, transform 900ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-[#fdfaf3]">
      <CoverBackdrop offset={offset} />

      <div className="relative z-10 mx-auto grid min-h-[100dvh] w-full max-w-7xl grid-cols-1 items-center gap-4 px-5 pb-8 pt-20 sm:gap-6 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:pb-16 lg:pt-28">
        {/* Mídia — no mobile vem primeiro, no desktop fica à direita */}
        <div className="order-1 h-[30dvh] w-full sm:h-[38dvh] lg:order-2 lg:col-span-5 lg:col-start-8 lg:h-[74dvh]">
          <CoverMedia offset={offset} />
        </div>


        {/* Tipografia */}
        <div className="order-2 w-full text-center lg:order-1 lg:col-span-6 lg:text-left">
          <p
            className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#8a6f38] sm:text-[11px]"
            style={rise(120)}
          >
            Reumatologia · Especialista em Dor
          </p>

          <h1
            className="mt-5 text-balance text-4xl font-normal leading-[1.03] tracking-tight text-[#2a2233] sm:text-5xl lg:text-[4.2rem]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {TITLE_WORDS.map((word, i) => (
              <span key={word + i} className="inline-block overflow-hidden align-bottom">
                <span
                  className="inline-block"
                  style={{
                    opacity: entered ? 1 : 0,
                    transform: entered ? "translateY(0)" : "translateY(100%)",
                    transition: `opacity 700ms ease-out ${260 + i * 110}ms, transform 900ms cubic-bezier(0.22,1,0.36,1) ${260 + i * 110}ms`,
                  }}
                >
                  {word === "DOR" ? (
                    <span className="italic text-[#a3813c]">DOR</span>
                  ) : (
                    word
                  )}
                </span>
                {i < TITLE_WORDS.length - 1 ? <span>&nbsp;</span> : null}
              </span>
            ))}
          </h1>

          <div
            className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[#a3813c]/60 to-transparent lg:mx-0 lg:via-[#a3813c]/70"
            style={rise(880)}
          />

          <p
            className="mx-auto mt-6 max-w-[44ch] text-sm font-light leading-relaxed text-[#4a4152] sm:text-base lg:mx-0"
            style={rise(960)}
          >
            <span className="block font-normal uppercase tracking-[0.14em] text-[#2a2233]">
              Dra. Juliana Leal
            </span>
            <span className="mt-1 block">CRM/AL 6717 · RQE 4857</span>
            <span className="block">Pós-graduada em Dor Crônica pela USP — São Paulo</span>
          </p>

          <div
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
            style={rise(1080)}
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="btn-champagne btn-glow-ring group gap-2 px-8 text-base active:scale-[0.97]"
              >
                <WhatsAppIcon size={20} />
                <RollingText>Agendar Consulta</RollingText>
              </Button>
            </a>

            <a
              href="#sobre"
              className="group inline-flex items-center gap-2 rounded-sm border border-[#2a2233]/25 bg-white/70 px-6 py-3 text-base font-medium text-[#2a2233] transition-colors hover:bg-white"
            >
              <RollingText>Conheça a Dra. Juliana</RollingText>
            </a>
          </div>

          <a
            href="#sobre"
            className="mt-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#6b6076] transition-colors hover:text-[#2a2233]"
            style={rise(1200)}
          >
            Role para explorar
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
