"use client";

import { Star, ExternalLink } from "lucide-react";
import Link from "next/link";

const testimonials = [
  {
    name: "João Silva",
    rating: 5,
    text: "Serviço excelente! A equipe da TornoMix foi muito atenciosa e entregou tudo dentro do prazo. Recomendo fortemente.",
  },
  {
    name: "Maria Oliveira",
    rating: 5,
    text: "Profissionais competentes e comprometidos. Fiquei muito satisfeita com o resultado final do trabalho.",
  },
  {
    name: "Carlos Souza",
    rating: 5,
    text: "Atendimento de primeira e qualidade impecável. A TornoMix superou minhas expectativas.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-900 text-gray-100" id="depoimentos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-white">
          O que dizem nossos clientes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition border border-gray-700 flex flex-col h-full transform hover:-translate-y-1 hover:border-yellow-500/30"
            >
              <div className="flex items-center mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>
              <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                &quot;{testimonial.text}&quot;
              </p>
              <p className="text-white font-semibold mt-auto text-sm sm:text-base">
                {testimonial.name}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-gray-400 text-xs sm:text-sm flex items-center justify-center gap-2 flex-wrap">
            <span>Fonte: Avaliações do Google</span>
            <Link
              href="https://www.google.com/search?q=ss+tornemanetos&oq=ss+tornemanetos&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgkIARAhGAoYoAHSAQgxNjM4ajBqMagCALACAA&sourceid=chrome&ie=UTF-8#mpd=~3856395717577198843/customers/reviews?p%3DCg51cGRhdGV0aW1lZGVzYxIDYWxs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 inline-flex items-center"
            >
              <svg
                className="h-3 w-3 sm:h-4 sm:w-4 mr-1"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.46 7.12l-2.78 1.15a4.982 4.982 0 00-2.95-2.94l1.15-2.78c2.1.8 3.77 2.47 4.58 4.57zM12 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zM9.13 4.54l1.17 2.78a5 5 0 00-2.98 2.97L4.54 9.13a7.984 7.984 0 014.59-4.59zM4.54 14.87l2.78-1.15a4.968 4.968 0 002.97 2.96l-1.17 2.78a7.996 7.996 0 01-4.58-4.59zm10.34 4.59l-1.15-2.78a4.978 4.978 0 002.95-2.97l2.78 1.17a8.007 8.007 0 01-4.58 4.58z" />
              </svg>
              Ver no Google
              <ExternalLink className="h-2 w-2 sm:h-3 sm:w-3 ml-1" />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
