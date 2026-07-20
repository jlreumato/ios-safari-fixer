import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Blog from "@/components/Blog";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useEffect } from "react";

const BlogPage = () => {
  useEffect(() => {
    document.title = "Blog — Dra. Juliana Leal Reumatologia";
  }, []);

  return (
    <>
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
