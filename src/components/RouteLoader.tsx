import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingSplash from "./LoadingSplash";

/**
 * Exibe a tela de carregamento com a logomarca:
 * - antes de abrir qualquer link interno que troque de pathname (não-hash);
 * - também após navegações programáticas (fallback).
 */
export default function RouteLoader() {
  const location = useLocation();
  const navigate = useNavigate();
  const [key, setKey] = useState<string | null>(null);
  const [pending, setPending] = useState<string | null>(null);

  // Intercepta cliques em <a> internos para exibir o splash ANTES da navegação.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      // ignora âncoras / hashes / mailto / tel / esquemas externos
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        /^https?:\/\//i.test(href) && !href.startsWith(window.location.origin)
      ) return;

      // Resolve URL relativa ao documento atual.
      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      // Se só muda o hash, deixa passar (sem splash).
      if (url.pathname === window.location.pathname && url.hash) return;
      if (url.pathname === window.location.pathname && !url.hash) return;

      e.preventDefault();
      setKey("pre-" + Date.now());
      setPending(url.pathname + url.search + url.hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Executa a navegação pendente logo após mostrar o splash.
  useEffect(() => {
    if (!pending) return;
    const t = window.setTimeout(() => {
      navigate(pending);
      setPending(null);
    }, 250);
    return () => window.clearTimeout(t);
  }, [pending, navigate]);

  // Fallback: também mostra o splash quando o pathname muda por outras vias.
  const [firstMount, setFirstMount] = useState(true);
  useEffect(() => {
    if (firstMount) {
      setFirstMount(false);
      return;
    }
    if (pending) return; // splash já ativo pelo interceptor
    setKey((prev) => (prev ? prev : "nav-" + location.pathname + Date.now()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (!key) return null;
  return <LoadingSplash key={key} duration={850} onDone={() => setKey(null)} />;
}
