import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "../data/site.js";

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp"
      className={`fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-brand-gradient text-ink shadow-glow transition-all duration-300 hover:scale-110 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span className="absolute inset-0 -z-10 animate-pulse-soft rounded-full bg-brand-400/40" />
      <MessageCircle size={26} />
    </a>
  );
}
