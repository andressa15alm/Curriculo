import Section from "../layout/Section";
import { Linkedin } from "lucide-react";
export default function ContactSection() {
   return (
    <Section id="contact">
      <h2 className="mb-2 text-3xl font-semibold">Contato</h2>

      <p className="mb-4 text-muted">
        e-mail:{" "}
        <a
          href="#contact"
          className="underline hover:text-white transition-colors"
        >
          paulaandressa987@gmail.com
        </a>
      </p>

      <div className="flex items-center gap-2">
        {/* ícone opcional */}
        <Linkedin className="h-5 w-5 text-white/80" />
        <a
          href="https://www.linkedin.com/in/andressa-almeida-de-paula-tecnologia-da-informacao/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/90 hover:text-white transition-colors underline"
        >
          linkedin.com/in/andressa-almeida-de-paula-tecnologia-da-informacao
        </a>
      </div>
    </Section>
  );
}