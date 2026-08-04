import { useState } from "react";
import { journey } from "@/data/journey";

/**
 * Lista de processo (padrão HowTo): círculos numerados ligados por uma linha
 * vertical contínua, título que se "preenche" da esquerda para a direita
 * quando ativo e marcação de tempo à direita.
 */
export default function ProcessSteps() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section
      aria-labelledby="processo-heading"
      itemScope
      itemType="https://schema.org/HowTo"
      className="mx-auto w-full max-w-5xl px-5 sm:px-8"
    >
      <header className="mb-16 grid gap-10 md:mb-24 md:grid-cols-2">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span
              aria-hidden
              className="h-3 w-3 flex-shrink-0 rounded-full border border-[#a3813c]/70"
            />
            <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#8a7f6a]">
              Como funciona
            </span>
          </div>
          <h2
            id="processo-heading"
            itemProp="name"
            className="text-[clamp(2.25rem,6vw,4rem)] font-normal uppercase leading-[0.95] tracking-tight text-[#2a2233]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            O Processo
          </h2>
        </div>
        <div className="flex items-end md:justify-end">
          <p
            itemProp="description"
            className="max-w-[34ch] text-sm font-light leading-relaxed tracking-wide text-[#4a4152]/80 md:text-right"
          >
            Um caminho claro da primeira consulta ao controle da dor.
          </p>
        </div>
      </header>

      <ol className="list-none border-t border-[#2a2233]/12 p-0">
        {journey.map((step, i) => {
          const isOpen = open === i;
          return (
            <li
              key={step.title}
              itemProp="step"
              itemScope
              itemType="https://schema.org/HowToStep"
              className="flex list-none items-stretch border-b border-[#2a2233]/12"
            >
              <meta itemProp="position" content={String(i + 1)} />

              {/* Coluna do número + linha vertical */}
              <div
                aria-hidden
                className="flex w-12 flex-shrink-0 flex-col items-center sm:w-16"
              >
                <div
                  className="mt-7 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border text-[11px] font-medium transition-colors duration-500"
                  style={{
                    borderColor: isOpen ? "#a3813c" : "rgba(42,34,51,0.2)",
                    color: isOpen ? "#a3813c" : "rgba(42,34,51,0.45)",
                    background: isOpen ? "rgba(231,217,181,0.35)" : "transparent",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-3 w-px flex-1 bg-[#2a2233]/12" />
              </div>

              <div className="min-w-0 flex-1 pb-1">
                <h3 className="m-0">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`processo-panel-${i}`}
                    className="flex w-full cursor-pointer items-center gap-5 border-0 bg-transparent py-6 text-left"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="relative">
                        {/* base esmaecida */}
                        <span
                          className="block truncate text-[clamp(1.25rem,3.4vw,2rem)] font-medium uppercase leading-[1.05] tracking-tight text-[#2a2233]/35"
                          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                          {step.title}
                        </span>
                        {/* preenchimento revelado da esquerda para a direita */}
                        <span
                          aria-hidden
                          className="absolute inset-y-0 left-0 overflow-hidden"
                          style={{
                            width: isOpen ? "100%" : "0%",
                            transition: "width 700ms cubic-bezier(0.16,1,0.3,1)",
                          }}
                        >
                          <span
                            className="block whitespace-nowrap text-[clamp(1.25rem,3.4vw,2rem)] font-medium uppercase leading-[1.05] tracking-tight text-[#2a2233]"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                          >
                            {step.title}
                          </span>
                        </span>
                      </div>
                    </div>

                    <span className="hidden flex-shrink-0 text-[10px] font-medium uppercase tracking-[0.24em] text-[#8a7f6a] sm:inline">
                      {step.when}
                    </span>

                    <svg
                      aria-hidden
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#a3813c"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="flex-shrink-0"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 400ms cubic-bezier(0.77,0,0.175,1)",
                      }}
                    >
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </button>
                </h3>

                <div
                  id={`processo-panel-${i}`}
                  role="region"
                  className="grid"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 450ms cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  <div className="overflow-hidden">
                    <p
                      itemProp="text"
                      className="m-0 max-w-[58ch] pb-8 text-base font-light leading-relaxed text-[#4a4152]"
                    >
                      {step.detail}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
