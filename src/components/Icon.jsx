import {
  LayoutDashboard,
  Globe,
  Smartphone,
  Sparkles,
  Gauge,
  ShieldCheck,
  TrendingUp,
  MessagesSquare,
  Wrench,
} from "lucide-react";

const icons = {
  LayoutDashboard,
  Globe,
  Smartphone,
  Sparkles,
  Gauge,
  ShieldCheck,
  TrendingUp,
  MessagesSquare,
  Wrench,
};

export default function Icon({ name, ...props }) {
  const Cmp = icons[name] || Sparkles;
  return <Cmp {...props} />;
}
