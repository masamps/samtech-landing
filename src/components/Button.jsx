const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 disabled:opacity-60 disabled:cursor-not-allowed";

const variants = {
  primary:
    "bg-brand-gradient text-ink shadow-glow hover:shadow-[0_30px_90px_rgba(99,102,241,0.45)] hover:-translate-y-0.5",
  secondary:
    "border border-line bg-surface/60 text-mist hover:border-brand-400/60 hover:text-white hover:-translate-y-0.5",
  ghost: "text-mist hover:text-white",
};

const sizes = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export default function Button({
  as = "a",
  variant = "primary",
  size = "lg",
  className = "",
  children,
  ...props
}) {
  const Tag = as;
  return (
    <Tag
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
