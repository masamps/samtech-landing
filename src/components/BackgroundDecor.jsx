export default function BackgroundDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute left-[-18%] top-[8%] h-72 w-[72rem] -rotate-12 bg-gradient-to-r from-transparent via-cyan-300/[0.09] to-transparent blur-3xl" />
      <div className="absolute right-[-22%] top-[18%] h-80 w-[62rem] rotate-12 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent blur-3xl" />
      <div className="absolute bottom-[-8%] left-1/2 h-64 w-[70rem] -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-500/[0.08] to-transparent blur-3xl" />
      <div className="absolute inset-x-0 top-[22rem] mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
    </div>
  );
}
