"use client";

import { useRef, useState, useEffect } from "react";
import { FaUpload, FaCheck, FaTimes } from "react-icons/fa";
import { Button } from "../ui/button";
import WhatsAppRedirectSuccess from "../redirects/WhatsAppRedirectSuccess";

export default function OrcamentSection() {
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
  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    descricaoPeca: "",
    quantidade: 1,
    prioridade: "",
    material: "",
    observacoes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.dispatchEvent(
              new CustomEvent("orcamentoInView", { detail: true })
            );
          } else {
            window.dispatchEvent(
              new CustomEvent("orcamentoInView", { detail: false })
            );
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFileError(null);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setFileError(
        `O arquivo excede o tamanho máximo de ${
          MAX_FILE_SIZE / (1024 * 1024)
        }MB`
      );
      setFile(null);
      return;
    }

    if (!ALLOWED_FORMATS.includes(selectedFile.type)) {
      setFileError(
        "Formato de arquivo não permitido. Formatos aceitos: JPG, JPEG, PNG, PDF, SVG, DXF, DWG, STEP e STP"
      );
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");

      setTimeout(() => {
        setFormData({
          nome: "",
          email: "",
          telefone: "",
          empresa: "",
          descricaoPeca: "",
          quantidade: 1,
          prioridade: "",
          material: "",
          observacoes: "",
        });
        setSubmitStatus("idle");
      }, 5000);
    }, 1500);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <section
      ref={sectionRef}
      className="pt-12 sm:pt-16 md:pt-20 pb-10 bg-gray-900 text-gray-100"
      id="orcamento"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 text-white">
          Solicite um Orçamento
        </h2>
        <p className="text-center mb-8 sm:mb-12 max-w-3xl mx-auto text-gray-300 text-sm sm:text-base">
          Precisa de peças sob medida para o seu projeto? Preencha nosso
          formulário para receber uma proposta personalizada rapidamente.
        </p>

        <div className="grid grid-cols-1 gap-8 sm:gap-12 items-start">
          <div className="bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 md:p-8 border border-gray-700">
            {submitStatus === "success" ? (
              <WhatsAppRedirectSuccess
                submitStatus={submitStatus}
                formData={{
                  nome: formData.nome,
                  email: formData.email,
                  telefone: formData.telefone,
                  empresa: formData.empresa,
                  descricao: formData.descricaoPeca,
                  quantidade: formData.quantidade,
                  prioridade: formData.prioridade,
                  material: formData.material,
                }}
              />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <p className="text-xs sm:text-sm text-gray-400 mb-4">
                  Campos marcados com asterisco (*) são obrigatórios.
                </p>
                <div className="bg-gray-800 p-3 sm:p-4 rounded-md">
                  <h2 className="text-lg sm:text-xl font-semibold text-tornomix-aco mb-3 sm:mb-4">
                    Informações de Contato
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label
                        htmlFor="nome"
                        className="block text-xs sm:text-sm font-medium text-white mb-1"
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
                        className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-tornomix-aco focus:border-tornomix-aco"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs sm:text-sm font-medium text-white mb-1"
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
                        className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-tornomix-aco focus:border-tornomix-aco"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="telefone"
                        className="block text-xs sm:text-sm font-medium text-white mb-1"
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
                        className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-tornomix-aco focus:border-tornomix-aco"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="empresa"
                        className="block text-xs sm:text-sm font-medium text-white mb-1"
                      >
                        Empresa
                      </label>
                      <input
                        type="text"
                        id="empresa"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-tornomix-aco focus:border-tornomix-aco"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 p-4 rounded-md mb-0">
                  <h2 className="text-xl font-semibold text-tornomix-aco mb-4">
                    Detalhes da Peça
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="descricaoPeca"
                        className="block text-sm font-medium text-white mb-1"
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
                          className="block text-sm font-medium text-white mb-1"
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
                          htmlFor="prioridade"
                          className="block text-sm font-medium text-white mb-1"
                        >
                          Prioridade
                        </label>
                        <select
                          id="prioridade"
                          name="prioridade"
                          value={formData.prioridade}
                          onChange={handleInputChange}
                          className="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 appearance-none"
                          style={{
                            backgroundImage:
                              'url(\'data:image/svg+xml;charset=US-ASCII,<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M7 7l3 3 3-3" stroke="%23fff" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>\')',
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 0.5rem center",
                          }}
                        >
                          <option
                            value=""
                            disabled
                            className="bg-gray-800 text-gray-400"
                          >
                            Selecione a prioridade
                          </option>
                          <option value="baixa" className="bg-gray-700">
                            Baixa (Prazo normal)
                          </option>
                          <option value="media" className="bg-gray-700">
                            Média (Prazo reduzido)
                          </option>
                          <option value="alta" className="bg-gray-700">
                            Alta (Urgente)
                          </option>
                        </select>
                        <p className="text-xs text-gray-400 mt-1">
                          A prioridade pode afetar o valor final do orçamento
                        </p>
                      </div>
                      <div>
                        <label
                          htmlFor="material"
                          className="block text-sm font-medium text-white mb-1"
                        >
                          Material Preferido
                        </label>
                        <select
                          id="material"
                          name="material"
                          value={formData.material}
                          onChange={handleInputChange}
                          className="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 appearance-none"
                          style={{
                            backgroundImage:
                              'url(\'data:image/svg+xml;charset=US-ASCII,<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M7 7l3 3 3-3" stroke="%23fff" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>\')',
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 0.5rem center",
                          }}
                        >
                          <option
                            value=""
                            disabled
                            className="bg-gray-800 text-gray-400"
                          >
                            Selecione um material
                          </option>
                          <option value="aco_carbono" className="bg-gray-700">
                            Aço Carbono
                          </option>
                          <option value="aco_inox" className="bg-gray-700">
                            Aço Inox
                          </option>
                          <option value="aluminio" className="bg-gray-700">
                            Alumínio
                          </option>
                          <option value="latao" className="bg-gray-700">
                            Latão
                          </option>
                          <option value="bronze" className="bg-gray-700">
                            Bronze
                          </option>
                          <option value="nylon" className="bg-gray-700">
                            Nylon
                          </option>
                          <option value="teflon" className="bg-gray-700">
                            Teflon
                          </option>
                          <option value="outro" className="bg-gray-700">
                            Outro (especificar nas observações)
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        Desenho Técnico ou Foto da Peça
                      </label>
                      <div
                        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md relative cursor-pointer"
                        onClick={triggerFileInput}
                      >
                        <div className="space-y-1 text-center w-full">
                          <input
                            type="file"
                            ref={fileInputRef}
                            className="sr-only"
                            onChange={handleFileChange}
                            accept=".jpg,.jpeg,.png,.pdf,.svg,.dxf,.dwg,.step,.stp"
                          />
                          <div className="flex flex-col items-center">
                            <FaUpload className="mx-auto h-12 w-12 text-gray-300" />
                            <p className="text-sm text-white">
                              <span className="text-white hover:text-tornomix-marinho font-medium">
                                Clique para enviar um arquivo
                              </span>{" "}
                              ou arraste e solte
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              JPG, JPEG, PNG, PDF, SVG, DXF, DWG, STEP ou STP
                              até 10MB
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
                              <p className="text-sm text-red-600">
                                {fileError}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-md transition transform hover:scale-105 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></span>
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <span>Solicitar Orçamento</span>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
