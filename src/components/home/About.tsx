import Button from "@/components/ui/Button";
import ValueItem from "@/components/ui/ValueItem";
import { HiUsers, HiBookOpen, HiLightBulb, HiGlobeAlt, HiChevronRight } from "react-icons/hi";

const About = () => {
  const values = [
    {
      title: "Comunidad",
      description: "Unimos estudiantes apasionados por la inteligencia computacional.",
      icon: HiUsers
    },
    {
      title: "Aprendizaje",
      description: "Impulsamos el aprendizaje continuo a través de talleres, charlas y seminarios.",
      icon: HiBookOpen
    },
    {
      title: "Innovación",
      description: "Desarrollamos proyectos que generen impacto en la sociedad.",
      icon: HiLightBulb
    },
    {
      title: "Impacto",
      description: "Contribuimos al avance tecnológico y al desarrollo del país.",
      icon: HiGlobeAlt
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-brand-background/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="lg:sticky lg:top-32 text-center lg:text-left">
            <h2 className="text-sm font-bold text-brand-accent uppercase tracking-widest mb-4">
              Sobre Nosotros
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Compromiso con la Excelencia e Innovación
            </h3>
            <p className="text-white/70 text-lg leading-relaxed mb-8 mx-auto lg:mx-0">
              El capitulo IEEE Computational Intelligence Society de la Universidad Nacional de Ingenieria (IEEE CIS UNI) tiene como misión fomentar el conocimiento, la investigación y la innovación en las áreas de inteligencia computacional, redes neuronales y computación evolutiva.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Button href="/nosotros" variant="outline" icon={<HiChevronRight />}>
                Saber más
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {values.map((value, index) => (
              <ValueItem 
                key={index}
                title={value.title}
                description={value.description}
                icon={value.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
