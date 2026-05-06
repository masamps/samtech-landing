import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionTemplate, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { handleHashAnchorClick, scrollToHash } from "../lib/scrollToHash";
import Container from "./Container";
import Button from "./Button";

export default function Navbar({ navigation, activeSection, isScrolled, progressScale }) {
  const [isOpen, setIsOpen] = useState(false);
  const progressAngle = useTransform(progressScale, [0, 1], ["0deg", "360deg"]);
  const progressBorder = useMotionTemplate`conic-gradient(from -90deg, rgba(103, 232, 249, 0.95) 0deg, rgba(255, 255, 255, 0.86) ${progressAngle}, transparent ${progressAngle}, transparent 360deg)`;

  const handleAnchorClick = (event, href, shouldCloseMenu = false) => {
    if (shouldCloseMenu) {
      event.preventDefault();
      setIsOpen(false);
      window.setTimeout(() => {
        scrollToHash(href);
      }, 120);
      return;
    }

    handleHashAnchorClick(event, href);
  };

  useEffect(() => {
    const closeMenu = () => setIsOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-ink via-ink/95 to-ink/70 px-4 pb-3 pt-4 backdrop-blur-xl md:bg-none md:pb-0 md:backdrop-blur-0">
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`relative overflow-hidden rounded-[1.6rem] border px-4 py-3 transition duration-300 md:px-6 ${
            isScrolled
              ? "border-white/10 bg-ink shadow-soft backdrop-blur-lg md:backdrop-blur-xl"
              : "border-white/[0.08] bg-slate-950/88 shadow-soft backdrop-blur-lg md:bg-white/[0.03] md:shadow-none md:backdrop-blur-xl"
          }`}
        >
          <motion.div
            aria-hidden="true"
            className="nav-progress-frame pointer-events-none absolute inset-0 rounded-[1.6rem]"
            style={{ background: progressBorder }}
          />

          <div className="relative flex items-center justify-between gap-4">
            <a
              href="#hero"
              onClick={(event) => handleAnchorClick(event, "#hero")}
              className="group inline-flex items-center gap-3"
            >
              <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <span className="absolute inset-1 rounded-[0.95rem] bg-gradient-to-br from-cyan-300/70 via-sky-400/45 to-transparent blur-md" />
                <span className="relative font-display text-sm font-semibold tracking-[0.2em] text-white">S</span>
              </span>
              <div className="leading-tight">
                <span className="block font-display text-base font-semibold text-white">Samtech</span>
                <span className="block text-[11px] uppercase tracking-[0.26em] text-slate-400">
                  Digital Premium
                </span>
              </div>
            </a>

            <nav className="hidden items-center gap-2 md:flex">
              {navigation.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(event) => handleAnchorClick(event, item.href)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition duration-300 ${
                      isActive
                        ? "bg-white/[0.08] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                        : "text-slate-300 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <div className="hidden md:block">
              <Button href="#contato" className="px-5 py-2.5 text-sm">
                Iniciar projeto
              </Button>
            </div>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/80 text-white transition hover:bg-white/[0.06] md:hidden"
              onClick={() => setIsOpen((current) => !current)}
              aria-label="Abrir navegação"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.985 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full mt-3 overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#070b18] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl md:hidden"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.045] to-transparent" />
              <div className="relative grid gap-2">
                {navigation.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(event) => handleAnchorClick(event, item.href, true)}
                    className="rounded-2xl border border-white/[0.1] bg-white/[0.055] px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/[0.08]"
                  >
                    {item.label}
                  </a>
                ))}
                <Button
                  href="#contato"
                  className="mt-2 w-full"
                  variant="primary"
                  onClick={() => setIsOpen(false)}
                >
                  Solicitar orçamento
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}
