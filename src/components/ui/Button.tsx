import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "secondary";
  className?: string;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

const Button = ({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  size = "md",
  icon,
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all transform hover:scale-105 active:scale-95 rounded-lg group";
  
  const variants = {
    primary: "bg-brand-accent text-white hover:bg-brand-accent/90",
    outline: "border border-white/20 text-white hover:bg-white/5",
    secondary: "bg-brand-secondary text-white hover:bg-brand-secondary/90",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {children}
      {icon && <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClasses}>
      {content}
    </button>
  );
};

export default Button;
