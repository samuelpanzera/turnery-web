"use client";

import {
  Wrench,
  Clock4,
  Ruler,
  ShieldCheck,
  Cog,
  ScissorsSquare,
} from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const services = [
  {
    icon: <Wrench className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />,
    title: "Tornearia de Precisão",
    desc: "Peças torneadas com alta exatidão e acabamento técnico.",
  },
  {
    icon: <Clock4 className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />,
    title: "Solda MIG e TIG",
    desc: "Trabalhos de soldagem em aço, alumínio e ligas especiais.",
  },
  {
    icon: <Ruler className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />,
    title: "Fresagem e Rosqueamento",
    desc: "Usinagem de furos, roscas e ranhuras com precisão.",
  },
  {
    icon: <Cog className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />,
    title: "Manutenção Industrial",
    desc: "Conserto e ajuste de peças mecânicas para máquinas e linhas.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />,
    title: "Fabricação sob medida",
    desc: "Projetos especiais com base em desenhos técnicos ou peças-modelo.",
  },
  {
    icon: <ScissorsSquare className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />,
    title: "Corte e Ajuste de Peças",
    desc: "Adaptamos componentes conforme a necessidade do seu projeto industrial.",
  },
];

export default function ServicesSection() {
  const sectionRef = useIntersectionObserver<HTMLElement>({
    threshold: 0.3,
    rootMargin: "-100px 0px",
    onIntersect: (isIntersecting) => {
      if (isIntersecting) {
        window.dispatchEvent(
          new CustomEvent("orcamentoInView", { detail: true })
        );
      }
    },
  });

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 bg-gray-900 text-gray-100"
      id="servicos"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-white">
          Nossos Serviços
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition border border-gray-700 flex flex-col h-full transform hover:-translate-y-1 hover:border-yellow-500/30"
            >
              <div className="mb-3 sm:mb-4">{service.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
                {service.title}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
