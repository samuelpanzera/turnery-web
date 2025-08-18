import { OrcamentForm } from "./orcament/OrcamentForm";

export default function OrcamentSection() {
  return (
    <section className="pt-20 pb-10 bg-gray-900 text-gray-100" id="orcamento">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">
          Solicite um Orçamento
        </h2>
        <p className="text-center mb-12 max-w-3xl mx-auto text-gray-300">
          Precisa de peças sob medida? Preencha nosso formulário para receber
          uma proposta personalizada.
        </p>

        <div className="bg-gray-800 rounded-lg shadow-md p-1 border border-gray-700 pb-5 pt-6">
          <OrcamentForm />
        </div>
      </div>
    </section>
  );
}
