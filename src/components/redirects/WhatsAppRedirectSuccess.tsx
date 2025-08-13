import { useEffect } from "react";
import { FaCheck } from "react-icons/fa";

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  empresa?: string;
  descricao: string;
  quantidade: number | string;
  prioridade?: string;
  material?: string;
}

interface Props {
  submitStatus: "success" | "error" | "idle";
  formData: FormData;
}

const WhatsAppRedirectSuccess = ({ submitStatus, formData }: Props) => {
  useEffect(() => {
    if (submitStatus === "success" && formData) {
      const {
        nome,
        email,
        telefone,
        empresa,
        descricao,
        quantidade,
        prioridade,
        material,
      } = formData;

      const mensagem = `Olá, gostaria de solicitar um orçamento!

- Nome: ${nome}
- E-mail: ${email}
- Telefone: ${telefone}
- Empresa: ${empresa || "Não informado"}

- Descrição da peça: ${descricao}
- Quantidade: ${quantidade}
- Prioridade: ${prioridade || "Não especificada"}
- Material: ${material || "Não especificado"}

- Anexarei o desenho técnico da peça em seguida, caso necessário.`;

      const numero = "5531996337254";
      const url = `https://wa.me/${numero}?text=${encodeURIComponent(
        mensagem
      )}`;

      window.open(url, "_blank");
    }
  }, [submitStatus, formData]);

  return (
    <div className="bg-green-800 bg-opacity-30 border border-green-700 rounded-md p-4">
      <div className="flex items-center mb-3">
        <FaCheck className="text-green-500 mr-3 flex-shrink-0" />
        <p className="text-green-400 font-semibold">
          Solicitação enviada com sucesso!
        </p>
      </div>
      <p className="text-gray-300 ml-8">
        Uma nova janela foi aberta para continuar sua solicitação via WhatsApp.
        Nossa equipe técnica analisará seu pedido e entrará em contato em breve
        com um orçamento detalhado, incluindo valores e prazos de entrega de
        acordo com a complexidade da peça e sua prioridade. Obrigado pela
        preferência!
      </p>
    </div>
  );
};

export default WhatsAppRedirectSuccess;
