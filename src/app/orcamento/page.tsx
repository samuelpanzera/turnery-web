"use client";

import { useState, useRef } from "react";
import { FaUpload, FaCheck, FaTimes } from "react-icons/fa";

// Formatos de arquivo permitidos
const ALLOWED_IMAGE_FORMATS = ["image/jpeg", "image/jpg", "image/png"];
const ALLOWED_TECHNICAL_FORMATS = [
  "application/pdf",
  "image/svg+xml",
  "application/dxf",
  "application/dwg",
  "application/step",
  "application/stp",
];
const ALLOWED_FORMATS = [
  ...ALLOWED_IMAGE_FORMATS,
  ...ALLOWED_TECHNICAL_FORMATS,
];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function Orcamento() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    descricaoPeca: "",
    quantidade: "",
    prazoEntrega: "",
    material: "",
    observacoes: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFileError(null);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    // Validar tamanho do arquivo
    if (selectedFile.size > MAX_FILE_SIZE) {
      setFileError(
        `O arquivo excede o tamanho máximo de ${
          MAX_FILE_SIZE / (1024 * 1024)
        }MB`
      );
      setFile(null);
      return;
    }

    // Validar formato do arquivo
    if (!ALLOWED_FORMATS.includes(selectedFile.type)) {
      setFileError(
        "Formato de arquivo não permitido. Formatos aceitos: JPG, JPEG, PNG, PDF, SVG, DXF, DWG, STEP e STP"
      );
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Aqui você implementaria a lógica para enviar os dados para o servidor
      // Por enquanto, vamos simular um envio bem-sucedido após um pequeno delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Dados do formulário:", formData);
      console.log("Arquivo:", file);

      setSubmitStatus("success");
      // Limpar formulário após envio bem-sucedido
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        empresa: "",
        descricaoPeca: "",
        quantidade: "",
        prazoEntrega: "",
        material: "",
        observacoes: "",
      });
      setFile(null);
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 md:p-8 bg-tornomix-background">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-3xl font-bold text-tornomix-marinho mb-2 text-center">
          Solicitação de Orçamento
        </h1>
        <p className="text-tornomix-metal text-center mb-8">
          Preencha o formulário abaixo para solicitar um orçamento para
          fabricação de peças.
        </p>

        {submitStatus === "success" && (
          <div className="mb-6 p-4 bg-tornomix-sucesso bg-opacity-10 border border-tornomix-sucesso rounded-md flex items-center">
            <FaCheck className="text-tornomix-sucesso mr-2" />
            <p className="text-tornomix-sucesso">
              Orçamento enviado com sucesso! Entraremos em contato em breve.
            </p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mb-6 p-4 bg-tornomix-alerta bg-opacity-10 border border-tornomix-alerta rounded-md flex items-center">
            <FaTimes className="text-tornomix-alerta mr-2" />
            <p className="text-tornomix-alerta">
              Erro ao enviar orçamento. Por favor, tente novamente ou entre em
              contato diretamente conosco.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Seção: Informações de Contato */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h2 className="text-xl font-semibold text-tornomix-aco mb-4">
              Informações de Contato
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="nome"
                  className="block text-sm font-medium text-gray-700 mb-1"
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
                  className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-tornomix-aco focus:border-tornomix-aco"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
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
                  className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-tornomix-aco focus:border-tornomix-aco"
                />
              </div>
              <div>
                <label
                  htmlFor="telefone"
                  className="block text-sm font-medium text-gray-700 mb-1"
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
                  className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-tornomix-aco focus:border-tornomix-aco"
                />
              </div>
              <div>
                <label
                  htmlFor="empresa"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Empresa
                </label>
                <input
                  type="text"
                  id="empresa"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-tornomix-aco focus:border-tornomix-aco"
                />
              </div>
            </div>
          </div>

          {/* Seção: Detalhes da Peça */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h2 className="text-xl font-semibold text-tornomix-aco mb-4">
              Detalhes da Peça
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="descricaoPeca"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Descrição da Peça*
                </label>
                <textarea
                  id="descricaoPeca"
                  name="descricaoPeca"
                  value={formData.descricaoPeca}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-tornomix-aco focus:border-tornomix-aco"
                  placeholder="Descreva as características da peça que você precisa..."
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="quantidade"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Quantidade*
                  </label>
                  <input
                    type="number"
                    id="quantidade"
                    name="quantidade"
                    value={formData.quantidade}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-tornomix-aco focus:border-tornomix-aco"
                  />
                </div>
                <div>
                  <label
                    htmlFor="prazoEntrega"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Prazo de Entrega Desejado
                  </label>
                  <input
                    type="date"
                    id="prazoEntrega"
                    name="prazoEntrega"
                    value={formData.prazoEntrega}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-tornomix-aco focus:border-tornomix-aco"
                  />
                </div>
                <div>
                  <label
                    htmlFor="material"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Material Preferido
                  </label>
                  <select
                    id="material"
                    name="material"
                    value={formData.material}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-tornomix-aco focus:border-tornomix-aco"
                  >
                    <option value="">Selecione um material</option>
                    <option value="aco_carbono">Aço Carbono</option>
                    <option value="aco_inox">Aço Inox</option>
                    <option value="aluminio">Alumínio</option>
                    <option value="latao">Latão</option>
                    <option value="bronze">Bronze</option>
                    <option value="nylon">Nylon</option>
                    <option value="teflon">Teflon</option>
                    <option value="outro">
                      Outro (especificar nas observações)
                    </option>
                  </select>
                </div>
              </div>

              {/* Upload de Arquivos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Desenho Técnico ou Foto da Peça
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md relative">
                  <div className="space-y-1 text-center">
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="sr-only"
                      onChange={handleFileChange}
                      accept=".jpg,.jpeg,.png,.pdf,.svg,.dxf,.dwg,.step,.stp"
                    />
                    <div className="flex flex-col items-center">
                      <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        <button
                          type="button"
                          onClick={triggerFileInput}
                          className="text-tornomix-aco hover:text-tornomix-marinho font-medium"
                        >
                          Clique para enviar um arquivo
                        </button>{" "}
                        ou arraste e solte
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        JPG, JPEG, PNG, PDF, SVG, DXF, DWG, STEP ou STP até 10MB
                      </p>
                    </div>

                    {file && (
                      <div className="mt-2 p-2 bg-green-50 rounded flex items-center border border-green-200">
                        <FaCheck className="text-green-500 mr-2" />
                        <p className="text-sm text-green-600 truncate">
                          {file.name}
                        </p>
                      </div>
                    )}

                    {fileError && (
                      <div className="mt-2 p-2 bg-red-50 rounded flex items-center border border-red-200">
                        <FaTimes className="text-red-500 mr-2" />
                        <p className="text-sm text-red-600">{fileError}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="observacoes"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Observações Adicionais
                </label>
                <textarea
                  id="observacoes"
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-tornomix-aco focus:border-tornomix-aco"
                  placeholder="Informações adicionais que possam ajudar no orçamento..."
                ></textarea>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <p className="text-sm text-gray-500">* Campos obrigatórios</p>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 bg-tornomix-aco text-white font-semibold rounded-md hover:bg-tornomix-marinho focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tornomix-aco transition duration-200 ease-in-out ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Enviando..." : "Solicitar Orçamento"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
