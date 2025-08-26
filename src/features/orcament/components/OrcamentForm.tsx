"use client";

import { useActionState, useEffect, useState } from "react";
import { submitOrcamento } from "@/app/actions";
import { FileUpload } from "./FileUpload";
import { SubmitButton } from "@/components/ui/submit-button";
import { ContactFields } from "./ContactFields";
import { PartsQuantityField } from "./PartsQuantityField";
import { DescriptionField } from "./DescriptionField";
import { useFileUpload } from "../hooks/useFileUpload";
import { useFileUploadToggle } from "../hooks/useFileUploadToggle";
import { CheckCircle } from "lucide-react";

const initialState = {
  success: false,
  message: "",
};

export function OrcamentForm() {
  const [state, formAction] = useActionState(submitOrcamento, initialState);
  const { file, fileError, handleFileChange } = useFileUpload();
  const { isFileUploadEnabled, toggleFileUpload } = useFileUploadToggle(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [animateCheck, setAnimateCheck] = useState(false);

  useEffect(() => {
    if (state.success && !showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(true);
        const checkTimer = setTimeout(() => {
          setAnimateCheck(true);
        }, 200);
        return () => clearTimeout(checkTimer);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [state.success, showSuccess]);

  if (state.success) {
    return (
      <div className="relative">
        <div
          className={`absolute inset-0 bg-gray-800/50 backdrop-blur-sm transition-opacity duration-300 ${
            showSuccess ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`text-center p-8 sm:p-12 transition-all duration-500 transform ${
            showSuccess
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-4 scale-95"
          }`}
          role="status"
          aria-live="polite"
          aria-label="Formulário enviado com sucesso"
        >
          <div className="flex justify-center mb-6">
            <div
              className={`relative transition-all duration-700 ${
                animateCheck ? "scale-100 rotate-0" : "scale-0 rotate-180"
              }`}
            >
              <CheckCircle
                className="w-16 h-16 sm:w-20 sm:h-20 text-green-400 drop-shadow-lg"
                strokeWidth={1.5}
              />
              <div
                className={`absolute inset-0 rounded-full bg-green-400/20 transition-all duration-1000 ${
                  animateCheck ? "scale-150 opacity-0" : "scale-100 opacity-100"
                }`}
              />
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-green-400 mb-4">
            Obrigado!
          </h3>
          <p className="text-gray-300 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            Seu orçamento foi enviado com sucesso. Entraremos em contato em
            breve.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className={`space-y-4 sm:space-y-6 mx-auto transition-opacity duration-300 ${
        state.success ? "opacity-50" : "opacity-100"
      }`}
      noValidate
      aria-label="Formulário de solicitação de orçamento"
    >
      <fieldset className="bg-gray-800 p-3 sm:p-4 md:p-6 rounded-md">
        <legend className="text-lg sm:text-xl font-semibold text-tornomix-aco mb-3 sm:mb-4 px-2">
          Informações de Contato
        </legend>
        <ContactFields />

        <DescriptionField required={false} />

        <PartsQuantityField
          defaultValue={1}
          name="quantidadePecas"
          id="quantidadePecas"
          isFileUploadEnabled={isFileUploadEnabled}
          onToggleFileUpload={toggleFileUpload}
        />

        {isFileUploadEnabled && (
          <div
            className="mt-4"
            role="region"
            aria-label="Seção de upload de arquivos"
          >
            <FileUpload
              file={file}
              fileError={fileError}
              onFileChange={handleFileChange}
            />
          </div>
        )}

        <input
          type="hidden"
          name="fileUploadEnabled"
          value={isFileUploadEnabled.toString()}
        />

        {!state.success && state.message && (
          <div
            className="p-2 mt-4 bg-red-50 border border-red-200 rounded-md"
            role="alert"
            aria-live="assertive"
          >
            <p className="text-sm text-red-600">{state.message}</p>
          </div>
        )}
      </fieldset>

      <div className="flex justify-center mt-6 px-4">
        <SubmitButton>Solicitar Orçamento</SubmitButton>
      </div>
    </form>
  );
}
