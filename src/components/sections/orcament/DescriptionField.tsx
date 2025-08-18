"use client";

import { useState } from "react";

export interface DescriptionFieldProps {
  name?: string;
  id?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}

export function DescriptionField({
  name = "descricaoPeca",
  id = "descricaoPeca",
  required = true,
  placeholder = "Descreva as características da peça que você precisa...",
  rows = 2,
}: DescriptionFieldProps) {
  const [error, setError] = useState<string | null>(null);

  const validateDescription = (value: string): string | null => {
    if (required && (!value || value.trim().length === 0)) {
      return "Infomações adicionais é obrigatória";
    }
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const validationError = validateDescription(value);
    setError(validationError);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const validationError = validateDescription(value);
    setError(validationError);
  };

  return (
    <div className="pb-5">
      <label htmlFor={id} className="block text-sm font-medium text-white mb-1">
        Infomações adicionais{required && "*"}
        {required && <span className="sr-only">(obrigatório)</span>}
      </label>
      <textarea
        id={id}
        name={name}
        required={required}
        rows={rows}
        className={`w-full border rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 transition-colors duration-200 bg-transparent text-white placeholder-gray-400 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-tornomix-aco focus:ring-tornomix-aco"
        }`}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-describedby={error ? `${id}-error` : `${id}-help`}
        aria-invalid={error ? "true" : "false"}
      />
      {!error && (
        <p id={`${id}-help`} className="text-xs text-gray-400">
          {required ? "Mínimo de 10 caracteres" : ""}
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
  );
}
