import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Elemento raiz da aplicação não encontrado");

createRoot(rootElement).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);
