"use client";

import { Wrench, Clock4, Ruler, ShieldCheck, Cog, ScissorsSquare } from "lucide-react";

const services = [
  {
    icon: <Wrench className="w-8 h-8 text-yellow-500" />,
    title: "Tornearia de Precisão",
    desc: "Peças torneadas com alta exatidão e acabamento técnico.",
  },
  {
    icon: <Clock4 className="w-8 h-8 text-yellow-500" />,
    title: "Solda MIG e TIG",
    desc: "Trabalhos de soldagem em aço, alumínio e ligas especiais.",
  },
  {
    icon: <Ruler className="w-8 h-8 text-yellow-500" />,
    title: "Fresagem e Rosqueamento",
    desc: "Usinagem de furos, roscas e ranhuras com precisão.",
  },
  {
    icon: <Cog className="w-8 h-8 text-yellow-500" />,
    title: "Manutenção Industrial",
    desc: "Conserto e ajuste de peças mecânicas para máquinas e linhas.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-yellow-500" />,
    title: "Fabricação sob medida",
    desc: "Projetos especiais com base em desenhos técnicos ou peças-modelo.",
  },
  {
    icon: <ScissorsSquare className="w-8 h-8 text-yellow-500" />,
    title: "Corte e Ajuste de Peças",
    desc: "Adaptamos componentes conforme a necessidade do seu projeto industrial.",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-100 text-gray-800" id="servicos">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Nossos Serviços
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
