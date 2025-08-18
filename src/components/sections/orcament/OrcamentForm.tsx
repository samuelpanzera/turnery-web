"use client";

import { useActionState } from "react";
import { submitOrcamento } from "@/app/actions";
import { FileUpload } from "./FileUpload";
import { SubmitButton } from "./SubmitButton";
import { ContactFields } from "./ContactFields";
import { FileUploadToggle } from "./FileUploadToggle";
import { PartsQuantityField } from "./PartsQuantityField";
import { DescriptionField } from "./DescriptionField";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useFileUploadToggle } from "@/hooks/useFileUploadToggle";

const initialState = {
  success: false,
  message: "",
};

export function OrcamentForm() {
  const [state, formAction] = useActionState(submitOrcamento, initialState);
  const { file, fileError, handleFileChange } = useFileUpload();
  const { isFileUploadEnabled, toggleFileUpload } = useFileUploadToggle(false);

  if (state.success) {
    return (
      <div
        className="text-center p-4 sm:p-8"
        role="status"
        aria-live="polite"
        aria-label="Formulário enviado com sucesso"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-green-400">
          Obrigado!
        </h3>
        <p className="text-gray-300 mt-2 text-sm sm:text-base">
          Seu orçamento foi enviado com sucesso. Entraremos em contato em breve.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="space-y-4 sm:space-y-6 mx-auto"
      noValidate
      aria-label="Formulário de solicitação de orçamento"
    >
      {/* Contact Information Section */}
      <fieldset className="bg-gray-800 p-3 sm:p-4 md:p-6 rounded-md">
        <legend className="text-lg sm:text-xl font-semibold text-tornomix-aco mb-3 sm:mb-4 px-2">
          Informações de Contato
        </legend>
        <ContactFields />
      </fieldset>

      {/* Parts Information Section */}
      <fieldset className="bg-gray-800 p-3 sm:p-4 md:p-6 rounded-md">
        <legend className="text-lg sm:text-xl font-semibold text-tornomix-aco mb-3 sm:mb-4 px-2">
          Detalhes da Peça
        </legend>
        <div className="space-y-4 sm:space-y-6">
          <PartsQuantityField />

          {/* Description Field */}
          <DescriptionField required={false} />

          {/* File Upload Toggle */}
          <FileUploadToggle
            isFileUploadEnabled={isFileUploadEnabled}
            onToggle={toggleFileUpload}
          />

          {/* Conditional File Upload */}
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
        </div>
      </fieldset>

      {/* Hidden field to track file upload toggle state */}

      <input
        type="hidden"
        name="fileUploadEnabled"
        value={isFileUploadEnabled.toString()}
      />

      {!state.success && state.message && (
        <div
          className="p-3 bg-red-50 border border-red-200 rounded-md"
          role="alert"
          aria-live="assertive"
        >
          <p className="text-sm text-red-600">{state.message}</p>
        </div>
      )}

      <div className="flex justify-center mt-6 px-4">
        <SubmitButton />
      </div>
    </form>
  );
}
