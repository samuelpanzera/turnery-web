"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ContactFieldsProps } from "../types";

interface FieldErrors {
  nome?: string;
  email?: string;
  telefone?: string;
}

export function ContactFields({}: ContactFieldsProps) {
  const [errors, setErrors] = useState<FieldErrors>({});

  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phonePattern = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    return phonePattern.test(phone);
  };

  const validateField = (fieldName: keyof FieldErrors, value: string) => {
    switch (fieldName) {
      case "nome":
        if (!value || value.trim().length === 0) {
          return "Nome é obrigatório";
        }
        if (value.trim().length < 3) {
          return "Nome deve ter pelo menos 3 caracteres";
        }
        return null;
      case "email":
        if (value.trim() && !validateEmail(value.trim())) {
          return "Email deve ter um formato válido";
        }
        return null;
      case "telefone":
        if (!value || value.trim().length === 0) {
          return "Telefone é obrigatório";
        }
        if (!validatePhone(value)) {
          return "Telefone deve estar no formato (XX) XXXXX-XXXX";
        }
        return null;
      default:
        return null;
    }
  };

  const handleFieldChange = (fieldName: keyof FieldErrors, value: string) => {
    const error = validateField(fieldName, value);
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  const handleFieldBlur = (fieldName: keyof FieldErrors, value: string) => {
    const error = validateField(fieldName, value);
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  const formatPhone = (value: string): string => {
    const digits = value.replace(/\D/g, "");

    if (digits.length <= 2) {
      return `(${digits}`;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length <= 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    } else {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(
        7,
        11
      )}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    e.target.value = formatted;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 pb-4">
      <div className="lg:col-span-2">
        <Input
          type="text"
          id="nome"
          name="nome"
          label="Nome"
          required
          minLength={3}
          autoComplete="name"
          placeholder="Digite seu nome completo"
          error={errors.nome || undefined}
          helpText={!errors.nome ? "Mínimo de 3 caracteres" : undefined}
          onChange={(e) => handleFieldChange("nome", e.target.value)}
          onBlur={(e) => handleFieldBlur("nome", e.target.value)}
        />
      </div>

      <div>
        <Input
          type="email"
          id="email"
          name="email"
          label="Email"
          autoComplete="email"
          placeholder="seu@email.com"
          error={errors.email || undefined}
          helpText={!errors.email ? "Formato: exemplo@dominio.com" : undefined}
          onChange={(e) => handleFieldChange("email", e.target.value)}
          onBlur={(e) => handleFieldBlur("email", e.target.value)}
        />
      </div>

      <div>
        <Input
          type="tel"
          id="telefone"
          name="telefone"
          label="Telefone"
          required
          autoComplete="tel"
          placeholder="(11) 99999-9999"
          maxLength={15}
          error={errors.telefone || undefined}
          helpText={!errors.telefone ? "Formato: (XX) XXXXX-XXXX" : undefined}
          onChange={(e) => {
            handlePhoneChange(e);
            handleFieldChange("telefone", e.target.value);
          }}
          onBlur={(e) => handleFieldBlur("telefone", e.target.value)}
        />
      </div>
    </div>
  );
}
