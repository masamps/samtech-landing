import { footerDetails, navigation } from "../data/siteContent";
import { handleHashAnchorClick } from "../lib/scrollToHash";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="pb-10 pt-10">
      <Container>
        <div className="glass-panel rounded-[2.2rem] p-8 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.7fr_0.9fr]">
            <div>
              <a
                href="#hero"
                onClick={(event) => handleHashAnchorClick(event, "#hero")}
                className="inline-flex items-center gap-3"
              >
                <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                  <span className="absolute inset-1 rounded-[0.95rem] bg-gradient-to-br from-cyan-300/70 via-sky-400/45 to-transparent blur-md" />
                  <span className="relative font-display text-sm font-semibold tracking-[0.2em] text-white">S</span>
                </span>
                <div>
                  <div className="font-display text-xl font-semibold text-white">Samcore</div>
                  <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Sistemas, apps e sites</div>
                </div>
              </a>
              <p className="mt-6 max-w-md text-sm leading-8 text-slate-300">{footerDetails.description}</p>
              <div className="mt-5 inline-flex rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-xs font-medium text-slate-300">
                Responsável técnico: Matheus Sampaio
              </div>
            </div>

            <div>
              <h3 className="font-display text-lg font-semibold text-white">Navegação</h3>
              <div className="mt-5 grid gap-3">
                {navigation.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(event) => handleHashAnchorClick(event, item.href)}
                    className="text-sm text-slate-300 transition hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-lg font-semibold text-white">Contato</h3>
              <div className="mt-5 grid gap-4">
                {footerDetails.contacts.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.label} className="flex items-start gap-3 text-sm text-slate-300">
                      <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-cyan-200">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="leading-7">{item.label}</span>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

          <div className="mt-10 border-t border-white/[0.08] pt-6 text-sm text-slate-500">
            Samcore © 2026. Marca de desenvolvimento digital conduzida por Matheus Sampaio.
          </div>
        </div>
      </Container>
    </footer>
  );
}
