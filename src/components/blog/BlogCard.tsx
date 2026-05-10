import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiOutlineClock, HiBookOpen } from "react-icons/hi";

interface BlogCardProps {
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  level: "Básico" | "Intermedio" | "Avanzado";
  slug: string;
}

const BlogCard = ({ title, excerpt, image, author, date, readTime, category, level, slug }: BlogCardProps) => {
  const levelColors = {
    Básico: "text-emerald-400 bg-emerald-400/10",
    Intermedio: "text-brand-accent bg-brand-accent/10",
    Avanzado: "text-red-400 bg-red-400/10"
  };

  return (
    <Link href={`/blog/${slug}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group cursor-pointer"
      >
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 bg-brand-secondary/5 mb-6">
          {image ? (
            <Image 
              src={image}
              alt={title}
              fill
              className="object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-brand-secondary/10 to-brand-background group-hover:scale-110 transition-transform duration-700">
              <HiBookOpen className="text-6xl text-brand-accent/40" />
            </div>
          )}
          
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-background/80 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest border border-white/10">
              {category}
            </span>
            <span className={`px-3 py-1 rounded-full backdrop-blur-md text-[9px] font-black uppercase tracking-widest border border-white/5 ${levelColors[level]}`}>
              {level}
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1.5 text-white/30 text-[10px] font-bold uppercase tracking-widest">
              <HiOutlineClock size={14} />
              {readTime}
            </div>
            <div className="w-1 h-1 rounded-full bg-white/10" />
            <div className="text-white/30 text-[10px] font-bold uppercase tracking-widest">
              {date}
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-accent transition-colors duration-300 leading-tight">
            {title}
          </h3>
          
          <p className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-2">
            {excerpt}
          </p>

          <div className="flex items-center gap-3 pt-4 border-t border-white/5">
            <div className="w-6 h-6 rounded-full bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center text-[10px] font-bold text-brand-accent">
              {author.charAt(0)}
            </div>
            <span className="text-[11px] font-bold text-white/60 uppercase tracking-widest">
              {author}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default BlogCard;
