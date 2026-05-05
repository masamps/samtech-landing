import { Github, Instagram, Linkedin } from "lucide-react";
import { footerDetails, navigation } from "../data/siteContent";
import { handleHashAnchorClick } from "../lib/scrollToHash";
import Container from "./Container";

const socialLinks = [
  { label: "LinkedIn", icon: Linkedin, href: "#" },
  { label: "Instagram", icon: Instagram, href: "#" },
  { label: "GitHub", icon: Github, href: "#" },
];

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
                  <div className="font-display text-xl font-semibold text-white">Samtech</div>
                  <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Sistemas, apps e sites</div>
                </div>
              </a>
              <p className="mt-6 max-w-md text-sm leading-8 text-slate-300">{footerDetails.description}</p>
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

              <div className="mt-6 flex gap-3">
                {socialLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      aria-label={item.label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-cyan-300/18 hover:bg-white/[0.06] hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/[0.08] pt-6 text-sm text-slate-500">
            Samtech © 2026. Projetos digitais com direção criativa, solidez técnica e acabamento premium.
          </div>
        </div>
      </Container>
    </footer>
  );
}
