import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Blog from "@/components/Blog";
import WhatsAppButton from "@/components/WhatsAppButton";
import Seo from "@/components/Seo";

const BlogPage = () => {
  return (
    <>
      <Seo
        title="Blog de Reumatologia — Dra. Juliana Leal | Maceió, AL"
        description="Artigos sobre artrite reumatoide, lúpus, fibromialgia, artrose, osteoporose e gota escritos pela Dra. Juliana Leal, reumatologista em Maceió — Alagoas."
        path="/blog"
      />
      <Header />
      <main className="pt-24">
        <Blog />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default BlogPage;
