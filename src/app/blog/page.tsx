import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";

export const metadata = {
  title: "Blog & Research | IEEE CIS UNI",
  description: "Explora los últimos artículos, tutoriales e investigaciones sobre Inteligencia Artificial de la comunidad IEEE CIS UNI.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-brand-background">
      <BlogHero />
      <BlogGrid />
    </main>
  );
}
