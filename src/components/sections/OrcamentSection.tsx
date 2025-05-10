"use client";

import { useState } from "react";
import { FaUpload, FaCheck, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

export default function OrcamentSection() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    descricaoPeca: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success">("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio do formulário
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");

      // Resetar formulário após sucesso
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        descricaoPeca: "",
      });

      // Resetar status após 5 segundos
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <section className="py-20 bg-gray-900 text-gray-100" id="orcamento">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
          Solicite um Orçamento
        </h2>
        <p className="text-center mb-12 max-w-3xl mx-auto text-gray-300">
          Precisa de peças sob medida para o seu projeto? Preencha nosso
          formulário para receber uma proposta personalizada rapidamente.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Coluna esquerda - Como funciona */}
          <div className="bg-gray-800 rounded-lg shadow-md p-8 border border-gray-700">
            <h3 className="text-2xl font-semibold mb-6 text-yellow-500">
              Como funciona?
            </h3>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center text-gray-900 font-bold mr-4 flex-shrink-0">
                  1
                </div>
                <p className="text-gray-300">
                  Preencha o formulário detalhando as especificações da sua peça
                </p>
              </div>

              <div className="flex items-start">
                <div className="bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center text-gray-900 font-bold mr-4 flex-shrink-0">
                  2
                </div>
                <p className="text-gray-300">
                  Nossa equipe técnica analisará seu pedido e calculará os
                  custos
                </p>
              </div>

              <div className="flex items-start">
                <div className="bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center text-gray-900 font-bold mr-4 flex-shrink-0">
                  3
                </div>
                <p className="text-gray-300">
                  Você receberá um orçamento detalhado em até 48 horas úteis
                </p>
              </div>

              <div className="flex items-start">
                <div className="bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center text-gray-900 font-bold mr-4 flex-shrink-0">
                  4
                </div>
                <p className="text-gray-300">
                  Após aprovação, iniciamos a produção com o prazo combinado
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/orcamento"
                className="flex items-center text-yellow-500 hover:text-yellow-400 font-semibold group"
              >
                <span>Formulário completo de orçamento</span>
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Coluna direita - Formulário rápido */}
          <div className="bg-gray-800 rounded-lg shadow-md p-8 border border-gray-700">
            <h3 className="text-2xl font-semibold mb-6 text-yellow-500">
              Formulário Rápido
            </h3>

            {submitStatus === "success" ? (
              <div className="bg-green-800 bg-opacity-30 border border-green-700 rounded-md p-4 flex items-center">
                <FaCheck className="text-green-500 mr-3 flex-shrink-0" />
                <p className="text-green-400">
                  Solicitação enviada com sucesso! Entraremos em contato em
                  breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="nome"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Nome Completo*
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      E-mail*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="telefone"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Telefone*
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      required
                      placeholder="(00) 00000-0000"
                      className="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="descricaoPeca"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Descreva sua necessidade*
                  </label>
                  <textarea
                    id="descricaoPeca"
                    name="descricaoPeca"
                    value={formData.descricaoPeca}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Descreva as características da peça que você precisa..."
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-5 py-2.5 bg-yellow-500 text-gray-900 font-semibold rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-200 ease-in-out ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? "Enviando..." : "Solicitar Orçamento"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
