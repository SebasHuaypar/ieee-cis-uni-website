import Image from "next/image";
import { FaLinkedin, FaGithub } from "react-icons/fa";

interface MemberCardProps {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  github?: string;
  interests?: string[];
}

const MemberCard = ({ name, role, image, linkedin, github, interests }: MemberCardProps) => {
  const displayInterests = interests 
    ? [...interests].slice(0, 3).sort((a, b) => a.length - b.length) 
    : [];

  return (
    <div className="group relative flex flex-col md:block md:rounded-2xl md:overflow-hidden w-full transition-all duration-500">
      {/* Image Container */}
      <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-xl md:rounded-2xl border border-white/10 bg-brand-background shadow-xl md:shadow-2xl transition-all duration-500 group-hover:border-brand-accent/50">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover grayscale-[0.3] md:group-hover:grayscale-0 md:group-hover:scale-105 transition-all duration-700"
        />
        {/* Desktop Overlay Gradient */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-brand-background via-brand-background/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
      </div>

      {/* Info Block - Stacked on Mobile, Floating on Desktop */}
      <div className="
        mt-2 md:mt-0 
        md:absolute md:bottom-0 md:left-0 md:right-0 
        p-2 md:p-5 
        md:backdrop-blur-md md:bg-brand-secondary/40 md:border-t md:border-white/10 
        md:translate-y-[calc(100%-90px)] md:group-hover:translate-y-0 
        transition-transform duration-500 ease-out z-10
      ">
        <div className="flex flex-col gap-2 md:gap-4">
          {/* Role & Name */}
          <div className="md:transition-all md:duration-500 md:group-hover:scale-[1.02] md:origin-left">
            <p className="text-brand-accent text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-0.5 md:mb-1 truncate">
              {role}
            </p>
            <h4 className="text-[13px] md:text-xl font-bold text-white tracking-tight leading-tight line-clamp-1 md:line-clamp-none">
              {name}
            </h4>
          </div>

          {/* Details - Always visible on mobile, revealed on hover on desktop */}
          <div className="flex flex-col gap-2 md:gap-4 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 md:delay-100">
            {/* Interests Tags */}
            {interests && (
              <div className="flex flex-wrap gap-1 md:gap-1.5 max-h-[40px] md:max-h-none overflow-hidden">
                {displayInterests.map((interest, idx) => (
                  <span key={idx} className="text-[8px] md:text-[9px] bg-white/10 text-white/70 px-1.5 md:px-2 py-0.5 rounded-full border border-white/5 whitespace-nowrap">
                    {interest}
                  </span>
                ))}
                {interests.length > 3 && (
                  <span 
                    className="text-[8px] md:text-[9px] text-white/40 self-center cursor-help hover:text-brand-accent transition-colors"
                    title={interests.slice(3).join(", ")}
                  >
                    +{interests.length - 3}
                  </span>
                )}
              </div>
            )}
            
            {/* Socials */}
            <div className="flex justify-between items-center pt-1.5 md:pt-3 border-t border-white/10">
              <div className="flex gap-3 md:gap-4">
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-brand-accent transition-colors">
                    <FaLinkedin className="w-3.5 h-3.5 md:w-5 md:h-5" />
                  </a>
                )}
                {github && (
                  <a href={github} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-brand-accent transition-colors">
                    <FaGithub className="w-3.5 h-3.5 md:w-5 md:h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
