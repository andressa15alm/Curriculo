
const experiences = [
  {
    period: "2015 — 2020",
    title: "Engenharia de Computação",
    category: "Formação",
    description:
      "Formação focada em engenharia de software, arquitetura de sistemas, algoritmos avançados e resolução de problemas complexos.",
    number: "01",
  },
  {
    period: "2021 — 2023",
    title: "Professora de Programação",
    category: "Experiência profissional",
    description:
      "Lecionei lógica de programação, desenvolvimento web e algoritmos para turmas de diferentes níveis, aprimorando minha comunicação técnica e didática.",
    number: "02",
  },
  {
    period: "2023 — 2025",
    title: "Análise e Desenvolvimento de Sistemas",
    category: "Formação",
    description:
      "Aprofundamento prático em desenvolvimento de software completo, arquitetura moderna, padrões de projeto e boas práticas de código.",
    number: "03",
  },
  {
    period: "2024 — 2025",
    title: "Estágio em Ciência de Dados",
    category: "Experiência profissional",
    description:
      "Desenvolvimento de soluções de Inteligência Artificial com foco em, LLMs/Agentes,visão computacional, automação de fluxos e análise de dados.",
    number: "04",
  },
];

export default function MinhaTrajetoria() {
  return (
    <section
      id="trajectory"
      className="w-full max-w-5xl mx-auto px-6 py-20"
    >
      {/* Cabeçalho */}
      <div className="mb-14">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3">
          Minha Trajetória
        </h2>

        <p className="text-gray-400 text-base md:text-lg">
          Uma jornada de aprendizado, ensino e evolução na tecnologia.
        </p>
      </div>

      {/* Linha do tempo */}
      <div className="relative">
        {/* Linha vertical */}
        <div className="absolute left-[7px] top-3 bottom-3 w-px bg-white/20 md:left-[155px]" />

        <div className="space-y-8">
          {experiences.map((item) => (
            <div
              key={item.number}
              className="relative grid grid-cols-1 md:grid-cols-[155px_1fr] gap-4 md:gap-8"
            >
              {/* Período */}
              <div className="flex items-center gap-5 md:justify-end md:items-start md:pt-7">
                <div className="relative z-10 w-[15px] h-[15px] shrink-0 rounded-full bg-white ring-4 ring-[#0b0d10]" />

                <span className="text-sm font-semibold text-white md:text-right">
                  {item.period}
                </span>
              </div>

              {/* Card */}
              <div className="group border border-white/10 bg-white/[0.03] rounded-2xl p-6 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.06]">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                      {item.category}
                    </span>

                    <h3 className="text-xl font-semibold text-white mt-2">
                      {item.title}
                    </h3>
                  </div>

                  <span className="text-2xl font-semibold text-white/20">
                    {item.number}
                  </span>
                </div>

                <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Encerramento */}
      <div className="mt-12 border border-white/10 rounded-2xl p-6 md:p-8 bg-white/[0.03]">
        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
          Continuo buscando novos desafios e oportunidades para unir
          tecnologia, dados e criatividade na construção de soluções
          que gerem resultados reais.
        </p>
      </div>
    </section>
  );
}
