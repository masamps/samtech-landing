import { Mail, MapPin, MessageCircle } from "lucide-react";
import Container from "./Container.jsx";
import Logo from "./Logo.jsx";
import { company, navLinks, services, whatsappLink } from "../data/site.js";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-ink">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <a href="/#inicio" className="flex min-h-[44px] items-center gap-2.5">
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
                    className="inline-flex min-h-[40px] items-center text-sm text-mist transition-colors hover:text-white"
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
                    href="/#servicos"
                    className="inline-flex min-h-[40px] items-center text-sm text-mist transition-colors hover:text-white"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Contato</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-[40px] items-center gap-2 text-sm text-mist transition-colors hover:text-white"
                >
                  <MessageCircle size={15} className="shrink-0" />
                  {company.whatsappLabel}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex min-h-[40px] items-center gap-2 text-sm text-mist transition-colors hover:text-white"
                >
                  <Mail size={15} className="shrink-0" />
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-2 pt-1 text-sm text-mist">
                <MapPin size={15} className="mt-0.5 shrink-0" />
                Atendimento remoto para todo o Brasil
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-sm text-mist sm:flex-row">
          <p>
            © {year} {company.name}. Todos os direitos reservados.
          </p>
          <a
            href="/politica-de-privacidade.html"
            className="inline-flex min-h-[40px] items-center transition-colors hover:text-white"
          >
            Política de Privacidade
          </a>
        </div>
      </Container>
    </footer>
  );
}
