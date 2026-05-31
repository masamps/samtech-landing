import Container from "./Container.jsx";
import Logo from "./Logo.jsx";
import { company, navLinks, services, whatsappLink } from "../data/site.js";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-ink">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#inicio" className="flex items-center gap-2.5">
              <Logo className="h-9 w-9" />
              <span className="font-display text-lg font-bold text-white">
                Samps<span className="text-brand-400"> Projetos</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">
              {company.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Navegação</h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-mist transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Serviços</h3>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.id}>
                  <a
                    href="#servicos"
                    className="text-sm text-mist transition-colors hover:text-white"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener"
                  className="text-sm text-mist transition-colors hover:text-white"
                >
                  {company.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-sm text-mist sm:flex-row">
          <p>
            © {year} {company.name}. Todos os direitos reservados.
          </p>
          <p>Desenvolvido com tecnologia de ponta.</p>
        </div>
      </Container>
    </footer>
  );
}
