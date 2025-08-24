import { usePartsQuantity } from "@/hooks/usePartsQuantity"; 
import React from "react";
import { PartsQuantityFieldProps } from "../types";

export function PartsQuantityField({
  defaultValue = 1,
  onChange,
  name = "quantidadePecas",
  id = "quantidadePecas",
  isFileUploadEnabled = false,
  onToggleFileUpload,
}: PartsQuantityFieldProps) {
  const { quantity, error, handleQuantityChange } =
    usePartsQuantity(defaultValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleQuantityChange(value);

    if (onChange) {
      const numericValue = parseInt(value, 10);
      if (!isNaN(numericValue) && numericValue >= 1) {
        onChange(numericValue);
      } else {
        onChange(defaultValue);
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-6">
      <div className="max-w-xs">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-white mb-2"
        >
          Quantidade de Peças*
          <span className="sr-only">(obrigatório, mínimo 1)</span>
        </label>
        <div className="relative">
          <input
            type="number"
            id={id}
            name={name}
            value={quantity}
            onChange={handleInputChange}
            min="1"
            step="1"
            required
            autoComplete="off"
            className={`w-full border rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 transition-colors duration-200 bg-transparent text-white placeholder-gray-400 ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-tornomix-aco focus:ring-tornomix-aco"
            }`}
            placeholder="1"
            aria-describedby={error ? `${id}-error` : `${id}-help`}
            aria-invalid={error ? "true" : "false"}
            inputMode="numeric"
            pattern="[0-9]*"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 text-sm pr-5">peças</span>
          </div>
        </div>
        {!error && (
          <p id={`${id}-help`} className="text-xs text-gray-400 mt-1">
            Quantidade mínima: 1 peça
          </p>
        )}
        {error && (
          <p
            id={`${id}-error`}
            className="text-sm text-red-500 mt-1"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
      </div>

      {onToggleFileUpload && (
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-white mb-2">
            Incluir anexos
          </label>
          <div className="flex items-center space-x-3">
            <div className="relative inline-flex items-center">
              <input
                type="checkbox"
                id="file-upload-toggle"
                checked={isFileUploadEnabled}
                onChange={(e) => onToggleFileUpload(e.target.checked)}
                className="sr-only"
                aria-describedby="file-upload-toggle-description"
              />
              <div
                className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out cursor-pointer ${
                  isFileUploadEnabled ? "bg-tornomix-aco" : "bg-gray-600"
                }`}
                onClick={() => onToggleFileUpload(!isFileUploadEnabled)}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                    isFileUploadEnabled ? "translate-x-5" : "translate-x-0.5"
                  } mt-0.5`}
                />
              </div>
            </div>
            <span className="text-sm text-gray-300">
              {isFileUploadEnabled ? "Habilitado" : "Desabilitado"}
            </span>
          </div>
          <p
            id="file-upload-toggle-description"
            className="text-xs text-gray-400 mt-2"
          >
            Envie desenhos técnicos, imagens ou outros arquivos para o orçamento
          </p>
        </div>
      )}
    </div>
  );
}
