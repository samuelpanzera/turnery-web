export function metadata() {
  return {
    title: "Fale Conosco",
    description: "Entre em contato conosco",
  };
}

export default function FaleConosco() {
  return (
    <main className="py-20 bg-[#171c29]">
      <section className="max-w-[1280px] mx-auto px-8 mb-12 mt-15">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Fale Conosco
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Entre em contato conosco através do formulário abaixo. Teremos
            prazer em atender sua solicitação.
          </p>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-8 py-12 bg-[#111827] rounded-lg mb-12">
        <div className="max-w-2xl mx-auto">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm px-4 py-3 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm px-4 py-3 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm px-4 py-3 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Descreva como podemos ajudar..."
              ></textarea>
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-200 ease-in-out"
              >
                Enviar Mensagem
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-8 py-12 mb-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700 text-center">
            <h3 className="text-xl font-medium mb-3 text-yellow-500">
              Endereço
            </h3>
            <p className="text-gray-300">
              R. Vila Rica, 1815A - Jardim Montanhês
              <br />
              Belo Horizonte - MG, 30750-143
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700 text-center">
            <h3 className="text-xl font-medium mb-3 text-yellow-500">
              Telefone
            </h3>
            <p className="text-gray-300">(31) 99633-7254</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700 text-center">
            <h3 className="text-xl font-medium mb-3 text-yellow-500">Email</h3>
            <p className="text-gray-300">contato@tornomix.com.br</p>
          </div>
        </div>
      </section>
    </main>
  );
}
