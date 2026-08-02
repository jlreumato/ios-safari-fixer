import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background">
      <Helmet>
        <title>Página não encontrada | Dra. Juliana Leal — Reumatologia</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="px-6 text-center">
        <h1 className="mb-4 text-5xl font-normal text-[#2a2233]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          404
        </h1>
        <p className="mb-6 text-lg font-light text-[#4a4152]">
          Esta página não existe ou foi movida.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 border border-[#2a2233]/12 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#2a2233] transition-colors hover:border-[#a3813c] hover:text-[#a3813c]"
        >
          Voltar ao início
        </a>
      </div>
    </div>
  );
};

export default NotFound;
