/**
 * Marca do programa. "Transforma" + "DOR" formam uma única palavra que
 * NUNCA quebra: o tamanho é fluido (clamp em vw) para sempre caber na tela.
 */
export default function TransformaDor({
  size = "clamp(2rem, 10.5vw, 10rem)",
  className = "",
  serif = true,
}: {
  /** font-size CSS (use clamp com vw para nunca estourar a largura). */
  size?: string;
  className?: string;
  serif?: boolean;
}) {
  return (
    <span
      translate="no"
      className={`inline-block whitespace-nowrap align-baseline tracking-tight ${className}`}
      style={{
        fontSize: size,
        lineHeight: 1.02,
        fontFamily: serif ? "'Cormorant Garamond', Georgia, serif" : undefined,
        hyphens: "none",
        WebkitHyphens: "none",
        wordBreak: "keep-all",
      }}
    >
      <span className="font-normal text-[#2a2233]">Transforma</span>
      <span className="font-semibold text-[#a3813c]">DOR</span>
    </span>
  );
}
