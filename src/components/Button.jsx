import { ArrowRight } from "lucide-react";
import { handleHashAnchorClick } from "../lib/scrollToHash";

const variants = {
  primary:
    "button-shine bg-white text-slate-950 hover:bg-slate-100 shadow-[0_18px_50px_rgba(255,255,255,0.14)]",
  secondary:
    "border border-white/[0.14] bg-white/[0.03] text-white hover:border-white/[0.25] hover:bg-white/[0.06]",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  icon: Icon = ArrowRight,
  onClick,
}) {
  const handleClick = (event) => {
    handleHashAnchorClick(event, href);
    onClick?.(event);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold tracking-[0.01em] transition duration-300 hover:-translate-y-0.5 active:scale-[0.99] ${variants[variant]} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      {Icon && <Icon className="relative z-10 h-4 w-4 transition duration-300 group-hover:translate-x-0.5" />}
    </a>
  );
}
