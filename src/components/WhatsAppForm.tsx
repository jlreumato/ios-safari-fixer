import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const WHATSAPP_NUMBER = "5582999872509";

export default function WhatsAppForm() {
  const { ref, inView } = useInView();
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
    "w-full border border-[#2a2233]/12 bg-white px-4 py-3 text-base text-[#2a2233] placeholder:text-[#6b6076]/80 outline-none transition-colors focus:border-[#a3813c]/60 focus:bg-white";

  return (
    <section
      ref={ref}
      id="agendar"
      className={`relative py-20 sm:py-24 transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Fale diretamente comigo
          </p>
          <h2
            className="mt-3 text-balance text-4xl font-normal leading-[1.05] tracking-tight text-[#2a2233] sm:text-5xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Vamos conversar sobre a sua{" "}
            <span className="italic text-[#a3813c]">dor.</span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[#4a4152]">
            Preencha as informações abaixo e envie diretamente para o meu WhatsApp.
            Você receberá um retorno humano, atento e sem pressa.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 border border-[#2a2233]/12 bg-white/80 p-6 backdrop-blur-sm sm:p-8"
        >
          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4a4152]">
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
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4a4152]">
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
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4a4152]">
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
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4a4152]">
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
