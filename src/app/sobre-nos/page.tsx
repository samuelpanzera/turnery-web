export default function SobreNos() {
  return (
    <main className="py-20 bg-[#171c29]">
      <section className="max-w-[1280px] mx-auto px-8 mb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 mt-15 text-white">
            Sobre Nós
          </h1>
          <p className="text-lg text-white max-w-4xl mx-auto">
            Conheça a história da TornoMix e nosso compromisso com a excelência
            em usinagem e tornearia desde 2021.
          </p>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-8 py-12 bg-[#111827] rounded-lg">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-yellow-500">
              Nossa História
            </h2>
            <p className="mb-4 text-gray-300">
              A TornoMix foi fundada em{" "}
              <strong className="text-white">6 de janeiro de 2021</strong> por
              um especialista com mais de quatro décadas de experiência no
              setor. Nossa jornada começou com a visão de oferecer serviços de
              tornearia e usinagem de alta precisão para indústrias de diversos
              segmentos.
            </p>
            <p className="text-gray-300">
              Desde o início, priorizamos investimentos em tecnologia de ponta e
              processos eficientes, garantindo que cada peça usinada atenda aos
              mais rigorosos padrões de qualidade e às especificações exatas dos
              nossos clientes.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-yellow-500">
              Experiência e Conhecimento
            </h2>
            <p className="mb-4 text-gray-300">
              Nosso fundador iniciou sua carreira na indústria em{" "}
              <strong className="text-white">1983</strong>, aos 18 anos, e
              construiu uma sólida trajetória de{" "}
              <strong className="text-white">41 anos</strong> no setor de
              usinagem e manutenção industrial. Durante grande parte desse
              período, trabalhou na Fiat (atual Stellantis), onde adquiriu
              conhecimento aprofundado sobre processos industriais e padrões
              internacionais de qualidade.
            </p>
            <p className="text-gray-300">
              Este vasto conhecimento técnico é a base da TornoMix,
              permitindo-nos oferecer soluções customizadas para as mais
              diversas necessidades industriais, com a precisão e confiabilidade
              que apenas a experiência pode proporcionar.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-8 py-12 mt-12">
        <h2 className="text-2xl font-semibold mb-8 text-center text-yellow-500">
          Nossa Missão e Valores
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-yellow-500">Missão</h3>
            <p className="text-gray-300">
              Fornecer soluções em usinagem e tornearia que atendam com
              excelência às necessidades dos nossos clientes, contribuindo para
              o sucesso de seus projetos e para o desenvolvimento da indústria
              brasileira.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-yellow-500">Visão</h3>
            <p className="text-gray-300">
              Ser referência em Minas Gerais no segmento de tornearia e usinagem
              de precisão, reconhecida pela qualidade dos nossos serviços, pela
              capacidade técnica da nossa equipe e pelo compromisso com a
              inovação.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-yellow-500">
              Valores
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Excelência técnica e precisão</li>
              <li>• Compromisso com prazos</li>
              <li>• Atendimento personalizado</li>
              <li>• Melhoria contínua</li>
              <li>• Responsabilidade e ética</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-8 py-12 mt-8 mb-12 bg-zinc-900 text-white rounded-lg">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6 text-yellow-400">
            Nosso Compromisso com a Qualidade
          </h2>
          <p className="max-w-3xl mx-auto text-zinc-300">
            Na TornoMix, cada projeto é tratado com a dedicação e o rigor
            técnico que aprendemos ao longo de décadas na indústria. Aplicamos
            metodologias comprovadas e utilizamos equipamentos de última geração
            para garantir resultados perfeitos em cada peça que produzimos.
            Nossa experiência nos permite antecipar desafios e oferecer soluções
            inovadoras que agregam valor real aos negócios dos nossos clientes.
          </p>
        </div>
      </section>
    </main>
  );
}
