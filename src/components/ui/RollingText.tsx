import { cn } from "@/lib/utils";

interface RollingTextProps {
  children: string;
  className?: string;
}

/**
 * Efeito "rolo de texto": no hover, o rótulo sobe e uma cópia entra por baixo.
 * O elemento pai precisa ter a classe `group`.
 */
export default function RollingText({ children, className }: RollingTextProps) {
  return (
    <span className={cn("relative inline-block overflow-hidden align-middle", className)}>
      <span className="block transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}
