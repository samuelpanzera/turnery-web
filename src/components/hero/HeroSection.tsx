import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-gray-900 text-white h-screen">
      <div className="absolute inset-0 bg-black opacity-50 z-1"></div>
      <Image
        src="/assets/Aaa.jpg"
        alt="Máquina industrial"
        fill
        priority
        sizes="100vw"
        className="z-0 object-cover"
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center max-w-4xl mx-auto pt-24">
        <h1 className="text-4xl md:text-5xl font-bold">
          Alta precisão em serviços de tornearia
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          +30 anos de experiência com usinagem industrial
        </p>
        <Link
          href="/orcamento"
          className="mt-6 inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg shadow-md transition"
        >
          Solicitar Orçamento
        </Link>
      </div>
    </section>
  );
}
