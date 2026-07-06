import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logoNome from "@/assets/nome-header.png.asset.json";

const navLinks = [
  { label: "Sobre Mim", href: "#sobre" },
  { label: "A Clínica", href: "#clinica" },
  { label: "Atuação", href: "#atuacao" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Blog", href: "#blog" },
  { label: "Contato", href: "#contato" },
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
          ? "bg-white/95 shadow-[0_2px_16px_hsl(249_22%_61%/0.08)] -webkit-backdrop-filter backdrop-filter backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center" aria-label="Dra. Juliana Leal — Reumatologia">
            <img
              src={logoNome.url}
              alt="Dra. Juliana Leal — Reumatologia"
              className="h-10 w-auto md:h-12"
              loading="eager"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
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
            <Button className="btn-glow-ring gap-2 bg-[hsl(var(--whatsapp))] text-white hover:bg-[hsl(142_70%_42%)] active:scale-[0.97] transition-all">
              <Phone className="h-4 w-4" />
              Agendar Consulta
            </Button>

          </a>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="inline-flex items-center justify-center rounded-md p-2 text-foreground lg:hidden" aria-label="Menu">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-white pt-12">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4"
                  onClick={() => setOpen(false)}
                >
                  <Button className="w-full gap-2 bg-[hsl(var(--whatsapp))] text-white hover:bg-[hsl(142_70%_42%)]">
                    <Phone className="h-4 w-4" />
                    Agendar Consulta
                  </Button>
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
