"use client";

import { useState, useEffect } from "react";
import ProjectCard from "@/components/ui/ProjectCard";
import Button from "@/components/ui/Button";
import { HiArrowRight, HiCode } from "react-icons/hi";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Project } from "@/types/database";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const fetchFeaturedProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('proyectos')
          .select('*')
          .eq('highlighted', true)
          .limit(4);

        if (!ignore) {
          if (error) throw error;
          if (data) setProjects(data);
        }
      } catch (error) {
        console.error('Error fetching featured projects:', error);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchFeaturedProjects();

    return () => {
      ignore = true;
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-brand-background min-h-[60vh]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
            <h2 className="text-sm font-bold text-brand-accent uppercase tracking-widest mb-4">
              Nuestro Portafolio
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Proyectos que Impactan
            </h3>
            <p className="text-white/60 text-lg">
              Explora las soluciones innovadoras desarrolladas por nuestros miembros utilizando tecnologías de vanguardia en inteligencia computacional.
            </p>
          </div>
          <div className="flex justify-center lg:justify-start">
            <Button href="/proyectos" variant="outline" icon={<HiArrowRight />}>
              Ver todos los proyectos
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-4 lg:gap-8">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="aspect-video bg-white/5 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <motion.div 
              className="grid grid-cols-2 gap-4 lg:gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {projects.map((project) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <ProjectCard 
                    title={project.titulo}
                    description={project.descripcion_corta}
                    image={project.image_url || ""}
                    tags={project.tags}
                    link={`/proyectos/${project.slug}`}
                  />
                </motion.div>
              ))}
            </motion.div>

            {projects.length === 0 && (
              <div className="text-center py-20 border border-dashed border-white/10 rounded-[3rem]">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white/20 mx-auto mb-4">
                  <HiCode size={32} />
                </div>
                <p className="text-white/40">No hay proyectos destacados por el momento.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
