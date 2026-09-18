import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import TratamentoDetalhe from "./pages/TratamentoDetalhe.tsx";
import BlogPage from "./pages/Blog.tsx";
import Procedimentos from "./pages/Procedimentos.tsx";
import Tratamentos from "./pages/Tratamentos.tsx";
import Transformador from "./pages/Transformador.tsx";
import Admin from "./pages/Admin.tsx";
import RouteLoader from "./components/RouteLoader.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <RouteLoader />
        <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/tratamentos/:slug" element={<TratamentoDetalhe />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/procedimentos" element={<Procedimentos />} />
        <Route path="/tratamentos" element={<Tratamentos />} />
        <Route path="/transformador" element={<Transformador />} />
        <Route path="/admin" element={<Admin />} />


        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
