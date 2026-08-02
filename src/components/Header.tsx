import { useState, useEffect } from "react";
import { Menu, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logoNome from "@/assets/nome-header.png.asset.json";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const navLinks = [
  { label: "Sobre Mim", href: "/#sobre" },
  { label: "A Clínica", href: "/#clinica" },
  { label: "Procedimentos", href: "/procedimentos" },
  { label: "Tratamentos", href: "/tratamentos" },
  { label: "Depoimentos", href: "/#depoimentos" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/#contato" },
];


const WHATSAPP_URL = "https://wa.me/5582999872509?text=Olá! Gostaria de agendar uma consulta com a Dra. Juliana Leal.";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 shadow-[0_1px_20px_rgba(42,34,51,0.08)] border-b border-[#2a2233]/10 -webkit-backdrop-filter backdrop-filter backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center" aria-label="Dra. Juliana Leal — Reumatologia">
            <img
              src={logoNome.url}
              alt="Dra. Juliana Leal — Reumatologia"
              className="h-10 w-auto md:h-12 [filter:brightness(0)_saturate(0)_opacity(0.85)]"
              loading="eager"
            />
          </a>


          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-base font-medium text-[#4a4152] transition-colors hover:text-primary"
              >
                {link.label}
              </a>

            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex"
          >
            <Button className="btn-champagne btn-glow-ring gap-2 active:scale-[0.97]">
              <WhatsAppIcon size={18} />
              Agendar Consulta
            </Button>
          </a>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="inline-flex items-center justify-center rounded-md p-2 text-[#2a2233] lg:hidden" aria-label="Menu">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-screen max-w-none bg-[#faf7f2] pt-16 border-l-0 px-8">
              <nav className="flex flex-col divide-y divide-[#2a2233]/10 border-y border-[#2a2233]/12">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between px-2 py-5 text-2xl font-normal tracking-tight text-foreground transition-colors duration-200 hover:bg-[#2a2233]/[0.04] hover:text-primary"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="h-5 w-5 text-[#4a4152] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" />
                  </a>
                ))}
              </nav>
              <div className="mt-8">

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6"
                  onClick={() => setOpen(false)}
                >
                  <Button className="btn-champagne btn-glow-ring w-full gap-2">
                    <WhatsAppIcon size={18} />
                    Agendar Consulta
                  </Button>
                </a>
              </div>

            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
