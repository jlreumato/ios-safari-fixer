import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingSplash from "./LoadingSplash";

/**
 * Exibe a tela de carregamento com a logomarca sempre que a rota muda.
 */
export default function RouteLoader() {
  const location = useLocation();
  const [key, setKey] = useState<string | null>(null);
  const [first, setFirst] = useState(true);

  useEffect(() => {
    if (first) {
      setFirst(false);
      return;
    }
    setKey(location.pathname + Date.now());
  }, [location.pathname]);

  if (!key) return null;
  return <LoadingSplash key={key} duration={750} onDone={() => setKey(null)} />;
}
