import { motion } from "framer-motion";

/**
 * Marca do programa com animação de revelação letra por letra.
 * "Transforma" + "DOR" formam uma única palavra que NUNCA quebra.
 */
export default function TransformaDor({
  size = "clamp(2rem, 10.5vw, 10rem)",
  className = "",
  serif = true,
}: {
  size?: string;
  className?: string;
  serif?: boolean;
}) {
  const word1 = "Transforma";
  const word2 = "DOR";

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(4px)",
    },
  };

  return (
    <motion.span
      translate="no"
      className={`inline-flex whitespace-nowrap align-baseline tracking-tight ${className}`}
      style={{
        fontSize: size,
        lineHeight: 1.02,
        fontFamily: serif ? "'Cormorant Garamond', Georgia, serif" : undefined,
      }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <span className="flex">
        {word1.split("").map((letter, index) => (
          <motion.span key={index} variants={child} className="font-normal text-[#2a2233]">
            {letter}
          </motion.span>
        ))}
      </span>
      <span className="flex">
        {word2.split("").map((letter, index) => (
          <motion.span key={index} variants={child} className="font-semibold text-[#a3813c]">
            {letter}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
}
