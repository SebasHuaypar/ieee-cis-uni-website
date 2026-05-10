import ProjectHero from "@/components/projects/ProjectHero";
import ProjectGrid from "@/components/projects/ProjectGrid";

export const metadata = {
  title: "Proyectos | IEEE CIS UNI",
  description: "Explora los proyectos de investigación y desarrollo del capítulo estudiantil IEEE CIS de la Universidad Nacional de Ingeniería.",
};

export default function ProyectosPage() {
  return (
    <main className="min-h-screen bg-brand-background">
      <ProjectHero />
      <ProjectGrid />
    </main>
  );
}
