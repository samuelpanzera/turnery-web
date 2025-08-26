"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { DescriptionFieldProps } from "../types";

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
      <Textarea
        id={id}
        name={name}
        label="Infomações adicionais"
        required={required}
        rows={rows}
        placeholder={placeholder}
        error={error || undefined}
        helpText={!error && required ? "Mínimo de 10 caracteres" : undefined}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
}
