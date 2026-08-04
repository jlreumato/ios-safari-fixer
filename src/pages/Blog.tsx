import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Blog from "@/components/Blog";
import WhatsAppButton from "@/components/WhatsAppButton";
import WhatsAppForm from "@/components/WhatsAppForm";
import CTASection from "@/components/CTASection";
import BackToTop from "@/components/BackToTop";
import Seo from "@/components/Seo";

const BASE = "https://julianaleal.com.br";

const BLOG_TITLE = "Blog de Reumatologia | Dra. Juliana Leal";
const BLOG_DESC =
  "Artigos em português sobre artrite reumatoide, lúpus, fibromialgia, artrose, osteoporose e gota, escritos pela Dra. Juliana Leal, reumatologista em Maceió — Alagoas.";

const BLOG_LD = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${BASE}/blog#blog`,
  name: "Blog da Dra. Juliana Leal — Reumatologia",
  description: BLOG_DESC,
  url: `${BASE}/blog`,
  inLanguage: "pt-BR",
  author: { "@type": "Physician", name: "Dra. Juliana Leal", url: `${BASE}/` },
  publisher: { "@id": `${BASE}/#physician` },
  blogPost: [
    { name: "Gota: A Doença do Ácido Úrico", url: `${BASE}/tratamentos/gota` },
    { name: "Entendendo a Artrite Reumatoide", url: `${BASE}/tratamentos/artrite-reumatoide` },
    { name: "O que é Lúpus (LES)?", url: `${BASE}/tratamentos/outras-doencas-imunologicas` },
    { name: "Fibromialgia: muito além da dor", url: `${BASE}/tratamentos/fibromialgia` },
  ].map((p) => ({
    "@type": "BlogPosting",
    headline: p.name,
    url: p.url,
    mainEntityOfPage: p.url,
    inLanguage: "pt-BR",
    author: { "@type": "Person", name: "Dra. Juliana Leal" },
  })),
};

const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: `${BASE}/` },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
  ],
};

const BlogPage = () => {
  return (
    <>
      <Seo title={BLOG_TITLE} description={BLOG_DESC} path="/blog" jsonLd={[BLOG_LD, BREADCRUMB_LD]} />
      <Header />
      <main className="pt-24">
        <Blog />
        <CTASection />
        <WhatsAppForm />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </>
  );
};

export default BlogPage;
