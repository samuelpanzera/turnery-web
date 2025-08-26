"use client";

import Image from "next/image";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function HeroSection() {
  const sectionRef = useIntersectionObserver<HTMLElement>({
    threshold: 0.7,
    rootMargin: "0px 0px -200px 0px",
    onIntersect: (isIntersecting) => {
      if (isIntersecting) {
        window.dispatchEvent(
          new CustomEvent("orcamentoInView", { detail: false })
        );
      }
    },
  });
  return (
    <section
      ref={sectionRef}
      className="relative bg-gray-900 text-white h-screen"
    >
      <div className="absolute inset-0 bg-black opacity-50 z-1"></div>
      <Image
        src="/assets/Aaa.jpg"
        alt="Máquina industrial"
        fill
        priority
        sizes="100vw"
        className="z-0 object-cover"
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 text-center max-w-4xl mx-auto pt-16 md:pt-24">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Alta precisão em serviços de tornearia
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
          +30 anos de experiência com usinagem industrial
        </p>
        <a
          href="#orcamento"
          className="mt-6 sm:mt-8 inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-md transition transform hover:scale-105 hover:-translate-y-1"
        >
          Solicitar Orçamento
        </a>
      </div>
    </section>
  );
}
