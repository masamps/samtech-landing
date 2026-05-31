import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Container from "./Container.jsx";
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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <a
          href="#inicio"
          className="flex items-center gap-2.5"
          aria-label="Samps Projetos — início"
        >
          <Logo className="h-9 w-9" />
          <span className="font-display text-lg font-bold text-white">
            Samps<span className="text-brand-400"> Projetos</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-mist transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button as="a" href={whatsappLink} target="_blank" rel="noopener" size="md">
            Fale conosco
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-white md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      {/* Menu mobile */}
      {open && (
        <div className="border-t border-line bg-ink/95 backdrop-blur-xl md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-mist transition-colors hover:bg-surface hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <Button
              as="a"
              href={whatsappLink}
              target="_blank"
              rel="noopener"
              className="mt-2"
              onClick={() => setOpen(false)}
            >
              Fale conosco
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
