import { MapPin, Phone as PhoneIcon, Clock, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contato" className="bg-foreground py-16 text-white/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <span className="text-xl font-bold text-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              Dra. Juliana Leal
            </span>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-primary">Reumatologia</p>
            <p className="mt-4 text-sm leading-relaxed">
              Reumatologista em Maceió — AL. Atendimento humanizado e baseado em evidências científicas.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Contato</h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span><strong className="text-white">Harmony Trade Center</strong><br />Sala 318, 3º Andar — Maceió, AL</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span><strong className="text-white">Clínica Reumatos</strong><br />Centro Médico Imagem Plena<br />Av. João Davino, 766 — Mangabeiras, Maceió, AL</span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 flex-shrink-0 text-primary" />
                <a href="tel:+5582999872509" className="transition-colors hover:text-white">(82) 99987-2509</a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 flex-shrink-0 text-primary" />
                <span>Seg-Sex: 8h às 17h</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Redes Sociais</h3>
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.instagram.com/dra.julianaleal/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-6">
              <p className="text-sm">CRM/AL: 6717 · RQE: 4857</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Dra. Juliana Leal — Reumatologia. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
