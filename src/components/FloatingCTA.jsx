import { MessageCircle } from "lucide-react";
import { contactChannels } from "../data/siteContent";

export default function FloatingCTA() {
  const whatsapp = contactChannels.find((channel) => channel.title === "Chamar no WhatsApp");

  if (!whatsapp) {
    return null;
  }

  return (
    <a
      href={whatsapp.href}
      className="fixed bottom-4 left-4 right-4 z-40 inline-flex items-center justify-center gap-2 rounded-full border border-cyan-300/20 bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_60px_rgba(8,13,28,0.42)] transition duration-300 active:scale-[0.99] md:hidden"
    >
      <MessageCircle className="h-4 w-4" />
      Falar com Matheus
    </a>
  );
}
