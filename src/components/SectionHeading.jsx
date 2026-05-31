import Reveal from "./Reveal.jsx";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}) {
  const alignment =
    align === "left" ? "text-left items-start" : "text-center items-center mx-auto";
  return (
    <Reveal className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-mist sm:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
