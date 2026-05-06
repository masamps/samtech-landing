export default function BackgroundDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute left-[-24%] top-[9%] h-56 w-[42rem] -rotate-12 bg-gradient-to-r from-transparent via-cyan-300/[0.07] to-transparent blur-2xl md:left-[-18%] md:h-72 md:w-[72rem] md:blur-3xl" />
      <div className="absolute right-[-28%] top-[18%] hidden h-80 w-[62rem] rotate-12 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent blur-3xl md:block" />
      <div className="absolute bottom-[-8%] left-1/2 hidden h-64 w-[70rem] -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-500/[0.07] to-transparent blur-3xl md:block" />
      <div className="absolute inset-x-0 top-[22rem] mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
    </div>
  );
}
