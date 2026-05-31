import { motion } from "framer-motion";
import { Activity, CheckCircle2, Smartphone } from "lucide-react";

// Mockup decorativo: um "dashboard" e um card de app flutuante.
export default function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      {/* glow de fundo */}
      <div className="absolute -inset-8 -z-10 rounded-full bg-brand-500/20 blur-3xl" />

      {/* janela do navegador / dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="card-surface overflow-hidden shadow-card"
      >
        <div className="flex items-center gap-2 border-b border-line bg-ink/60 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
          <span className="h-3 w-3 rounded-full bg-green-400/70" />
          <span className="ml-3 h-5 flex-1 rounded-md bg-surface" />
        </div>

        <div className="space-y-4 p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-2.5 w-24 rounded bg-mist/20" />
              <div className="mt-2 h-5 w-32 rounded bg-mist/30" />
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-500/15 px-3 py-1 text-xs font-semibold text-brand-300">
              <Activity size={13} /> Em tempo real
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { h: "h-16", c: "from-brand-500/40 to-brand-500/5" },
              { h: "h-24", c: "from-accent-400/40 to-accent-400/5" },
              { h: "h-20", c: "from-brand-400/40 to-brand-400/5" },
            ].map((bar, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.5 }}
                style={{ transformOrigin: "bottom" }}
                className="flex items-end rounded-xl border border-line bg-ink/40 p-2"
              >
                <div className={`w-full rounded-md bg-gradient-to-t ${bar.c} ${bar.h}`} />
              </motion.div>
            ))}
          </div>

          <div className="space-y-2.5 rounded-xl border border-line bg-ink/40 p-4">
            {[80, 60, 70].map((w, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 size={16} className="shrink-0 text-accent-400" />
                <div
                  className="h-2.5 rounded bg-mist/20"
                  style={{ width: `${w}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* card de app flutuante */}
      <motion.div
        initial={{ opacity: 0, y: 20, x: 20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="absolute -bottom-8 -right-2 w-40 animate-float-slow sm:-right-8 sm:w-48"
      >
        <div className="card-surface shadow-glow">
          <div className="flex items-center gap-2 border-b border-line p-3">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient text-ink">
              <Smartphone size={16} />
            </span>
            <div>
              <div className="h-2 w-16 rounded bg-mist/30" />
              <div className="mt-1.5 h-2 w-10 rounded bg-mist/15" />
            </div>
          </div>
          <div className="space-y-2 p-3">
            <div className="h-2 w-full rounded bg-mist/15" />
            <div className="h-2 w-3/4 rounded bg-mist/15" />
            <div className="mt-3 h-8 rounded-lg bg-brand-gradient" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
