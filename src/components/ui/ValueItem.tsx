import { IconType } from "react-icons";

interface ValueItemProps {
  title: string;
  description: string;
  icon: IconType;
}

const ValueItem = ({ title, description, icon: Icon }: ValueItemProps) => {
  return (
    <div className="group relative p-4 lg:p-6 rounded-xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/[0.02]">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-brand-accent/0 group-hover:bg-brand-accent/5 rounded-xl blur-xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] -z-10" />
      
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-secondary/20 flex items-center justify-center group-hover:bg-brand-accent/20 transition-colors duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
          <Icon className="text-brand-accent text-2xl group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" />
        </div>
        <div>
          <h4 className="text-xl font-bold text-white mb-2 group-hover:text-brand-accent transition-colors duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
            {title}
          </h4>
          <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ValueItem;
