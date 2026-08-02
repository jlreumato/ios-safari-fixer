import { MapPin, Phone as PhoneIcon, Clock, Instagram } from "lucide-react";
import logoNome from "@/assets/nome-header.png.asset.json";

export default function Footer() {
  return (
    <footer id="contato" className="border-t border-[#2a2233]/10 bg-gradient-to-b from-[#fbf7ee] to-[#f2e9d8] py-16 text-[#4a4152]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <a href="/" aria-label="Ir para a página inicial" className="inline-block">
              <img
                src={logoNome.url}
                alt="Dra. Juliana Leal — Reumatologia"
                className="h-12 w-auto brightness-0 invert md:h-14"
                loading="lazy"
              />
            </a>

            <p className="mt-4 text-base leading-relaxed">
              Reumatologista em Maceió — AL. Atendimento humanizado e baseado em evidências científicas.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-semibold uppercase tracking-wider text-[#2a2233]">Contato</h3>
            <ul className="mt-4 space-y-4 text-base">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span><strong className="text-[#2a2233]">Harmony Trade Center</strong><br />Sala 318, 3º Andar — Maceió, AL</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span><strong className="text-[#2a2233]">Clínica Reumatos</strong><br />Centro Médico Imagem Plena<br />Av. João Davino, 766 — Mangabeiras, Maceió, AL</span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon className="h-5 w-5 flex-shrink-0 text-primary" />
                <a href="tel:+5582999872509" className="transition-colors hover:text-[#2a2233]">(82) 99987-2509</a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-5 w-5 flex-shrink-0 text-primary" />
                <span>Seg-Sex: 8h às 17h</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-base font-semibold uppercase tracking-wider text-[#2a2233]">Redes Sociais</h3>
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.instagram.com/dra.julianaleal/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#2a2233]/20 bg-transparent text-[#2a2233] transition-all hover:border-[#a3813c] hover:bg-white"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-6">
              <p className="text-base">CRM/AL: 6717 · RQE: 4857</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[#2a2233]/12 pt-6 text-center text-base text-[#4a4152]">
          <p>© {new Date().getFullYear()} Dra. Juliana Leal — Reumatologia. Todos os direitos reservados.</p>
          <p className="mt-2 flex items-center justify-center gap-1.5 text-sm text-[#6b6076]/70">
            <span>Desenvolvido com</span>
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#a3813c]" fill="currentColor" aria-hidden>
              <path d="M6 3h12l4 6-10 12L2 9l4-6zm.6 2L4 8.5h4.2L10.5 5H6.6zm6.9 0L15.8 8.5h3.6L17 5h-3.5zM11.5 5L9.2 8.5h5.6L12.5 5h-1zM4.4 10.5L11 18.2 7.5 10.5H4.4zm4.4 0l3.1 7.3 3.1-7.3H8.8zm7.6 0l-3.5 7.7 6.6-7.7h-3.1z" />
            </svg>
            <span>por</span>
            <a
              href="https://befind.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4a4152] underline-offset-2 hover:text-[#a3813c] hover:underline"
            >
              Befind — Experiências Digitais
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
