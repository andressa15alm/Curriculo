import Section from "../layout/Section"; // ajuste se o caminho do seu Section for diferente
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  return (
    <Section id="projects">
      <h2 className="mb-6 text-3xl font-semibold">Projetos</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Link
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            aria-label={`Abrir projeto ${p.title} em nova aba`}
          >
            {/* imagem (ratio 4:3) */}
            <div className="relative aspect-[4/3]">
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                priority={false}
              />
              {/* gradiente sutil para contraste do título */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 to-transparent" />
            </div>

            {/* título + CTA */}
            <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-3 p-4">
              <span className="text-base font-medium">{p.title}</span>
              <span className="rounded-lg border border-white/15 bg-white/10 px-3 py-1 text-xs opacity-90 transition-opacity group-hover:opacity-100">
                Abrir ↗
              </span>
            </div>

            {/* foco acessível */}
            <span className="absolute inset-0 rounded-2xl ring-0 ring-accent/60 focus:outline-none focus-visible:ring-2" />
          </Link>
        ))}
      </div>
    </Section>
  );
}
