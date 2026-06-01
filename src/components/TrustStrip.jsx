import Container from "./Container.jsx";
import Reveal from "./Reveal.jsx";
import { stats } from "../data/site.js";

export default function TrustStrip() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <p className="text-center text-sm text-mist">
            Sistemas reais, no ar, gerando resultado para nossos clientes
          </p>
          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-y-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-white sm:text-4xl">
                  {stat.value}
                  {stat.suffix}
                </div>
                <p className="mt-1 text-xs text-mist sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
