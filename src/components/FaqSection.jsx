import Container from "./Container.jsx";
import SectionHeading from "./SectionHeading.jsx";
import FaqList from "./FaqList.jsx";
import { faqs } from "../data/site.js";

export default function FaqSection() {
  return (
    <section id="duvidas" className="scroll-mt-28 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Dúvidas frequentes"
          title="As perguntas que todo cliente faz antes de começar"
        />
        <div className="mx-auto mt-12 max-w-3xl">
          <FaqList faqs={faqs} />
        </div>
      </Container>
    </section>
  );
}
