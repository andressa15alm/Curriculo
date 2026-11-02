import Section from "../layout/Section";

export default function AboutSection() {
  return (
    <Section id="about">
      <h2 className="mb-2 text-3xl font-semibold">Sobre Mim</h2>
      <p className="text-muted max-w-3xl">
         Olá! Seja muito bem-vindo(a)<br/>
         Me chamo Andressa Almeida! Sou formada em Engenharia de Computação e em Análise e Desenvolvimento de Sistemas
         eu sou movida por tecnologia, boas ideias e aprendizado constante. 
         Criei este espaço para compartilhar meus projetos, trajetórias e interesses.
         Puxe uma cadeira, dá uma olhada por aí e explore à vontade!      </p>
    </Section>
  );
}