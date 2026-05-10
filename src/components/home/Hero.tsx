import Button from "@/components/ui/Button";
import Image from "next/image";
import { HiArrowRight, HiChevronRight } from "react-icons/hi";

const Hero = () => {
  return (
    <section className="relative pt-36 pb-20 px-6 md:px-12 lg:px-24 min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-accent/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-brand-secondary/20 rounded-full blur-[150px] -z-10" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="relative">
          {/* Text Content */}
          <div className="max-w-3xl relative z-20 text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Inteligencia que transforma el <span className="text-brand-accent">futuro</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mb-10 leading-relaxed mx-auto lg:mx-0">
              En IEEE CIS UNI impulsamos el estudio, la investigación y la aplicación de la inteligencia artificial, redes neuronales y computación evolutiva para resolver los desafíos del mundo real.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Button size="lg" icon={<HiArrowRight />}>
                Explorar Proyectos
              </Button>
              <Button variant="outline" size="lg" icon={<HiChevronRight />}>
                Conócenos
              </Button>
            </div>
          </div>

          {/* Hero Image as Background Element */}
          <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-0 w-full lg:w-[600px] h-[450px] lg:h-[600px] -z-10 opacity-40 lg:opacity-60 pointer-events-none">
            <Image
              src="/images/hero_image.png"
              alt="IEEE CIS UNI Hero"
              fill
              className="object-contain object-right"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
