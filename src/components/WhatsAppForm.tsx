import { useState } from "react";
import { ArrowRight } from "lucide-react";

const WHATSAPP_NUMBER = "5582999872509";

export default function WhatsAppForm() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [queixa, setQueixa] = useState("");
  const [preferencia, setPreferencia] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      `Olá, Dra. Juliana! Gostaria de agendar uma consulta.\n\n` +
      `• Nome: ${nome || "-"}\n` +
      `• Telefone: ${telefone || "-"}\n` +
      `• Queixa principal: ${queixa || "-"}\n` +
      `• Melhor horário para retorno: ${preferencia || "-"}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const inputCls =
    "w-full border border-white/15 bg-white/[0.04] px-4 py-3 text-base text-white placeholder:text-white/40 outline-none transition-colors focus:border-[#e7d9b5]/60 focus:bg-white/[0.06]";

  return (
    <section id="agendar" className="relative py-20 sm:py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Fale diretamente comigo
          </p>
          <h2
            className="mt-3 text-balance text-4xl font-normal leading-[1.05] tracking-tight text-white sm:text-5xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Vamos conversar sobre a sua{" "}
            <span className="italic text-[#e7d9b5]">dor.</span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/75">
            Preencha as informações abaixo e envie diretamente para o meu WhatsApp.
            Você receberá um retorno humano, atento e sem pressa.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8"
        >
          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Nome completo
            </span>
            <input
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={inputCls}
              placeholder="Como devo te chamar?"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Telefone / WhatsApp
            </span>
            <input
              type="tel"
              required
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className={inputCls}
              placeholder="(82) 90000-0000"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Queixa principal
            </span>
            <textarea
              required
              value={queixa}
              onChange={(e) => setQueixa(e.target.value)}
              rows={3}
              className={inputCls}
              placeholder="Conte brevemente onde dói e há quanto tempo."
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Melhor horário para retorno
            </span>
            <input
              type="text"
              value={preferencia}
              onChange={(e) => setPreferencia(e.target.value)}
              className={inputCls}
              placeholder="Ex.: manhãs, após 18h..."
            />
          </label>

          <button
            type="submit"
            className="btn-champagne mt-2 inline-flex items-center justify-center gap-3 px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em]"
          >
            Enviar pelo WhatsApp
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
