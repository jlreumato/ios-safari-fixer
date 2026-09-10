import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Garante que cada nova página abra no topo (exceto quando há âncora explícita). */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}
