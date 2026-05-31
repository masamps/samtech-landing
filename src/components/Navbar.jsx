import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "./Button.jsx";
import Logo from "./Logo.jsx";
import { navLinks, whatsappLink } from "../data/site.js";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4">
      <div
        className={`flex w-full max-w-3xl items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-300 sm:px-4 ${
          scrolled
            ? "border border-line bg-ink/70 shadow-soft backdrop-blur-xl"
            : "border border-transparent"
        }`}
      >
        <a
          href="#inicio"
          className="flex items-center gap-2 pl-1"
          aria-label="Samps Projetos — início"
        >
          <Logo className="h-8 w-8" />
          <span className="font-display text-base font-bold text-white">
            Samps<span className="text-mist"> Projetos</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-mist transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            as="a"
            href={whatsappLink}
            target="_blank"
            rel="noopener"
            size="sm"
          >
            Fale conosco
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="absolute inset-x-4 top-full mt-2 rounded-2xl border border-line bg-ink/95 p-3 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-mist transition-colors hover:bg-surface hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <Button
              as="a"
              href={whatsappLink}
              target="_blank"
              rel="noopener"
              className="mt-2 w-full"
              onClick={() => setOpen(false)}
            >
              Fale conosco
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
