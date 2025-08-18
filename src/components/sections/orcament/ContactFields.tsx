"use client";

import { useState } from "react";

export interface ContactFieldsProps {}

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
        <label
          htmlFor="nome"
          className="block text-sm font-medium text-white mb-2"
        >
          Nome*
          <span className="sr-only">(obrigatório)</span>
        </label>
        <input
          type="text"
          id="nome"
          name="nome"
          required
          minLength={3}
          autoComplete="name"
          className={`w-full border rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 transition-colors duration-200 bg-transparent text-white placeholder-gray-400 
            ${
              errors.nome
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-tornomix-aco focus:ring-tornomix-aco"
            }`}
          onChange={(e) => handleFieldChange("nome", e.target.value)}
          onBlur={(e) => handleFieldBlur("nome", e.target.value)}
          aria-describedby={errors.nome ? "nome-error" : "nome-help"}
          aria-invalid={errors.nome ? "true" : "false"}
          placeholder="Digite seu nome completo"
        />
        {!errors.nome && (
          <p id="nome-help" className="text-xs text-gray-400 mt-1">
            Mínimo de 3 caracteres
          </p>
        )}
        {errors.nome && (
          <p id="nome-error" className="text-sm text-red-500 mt-1" role="alert">
            {errors.nome}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-white mb-2"
        >
          Email
          <span className="sr-only">(obrigatório)</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          className={`w-full border rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 transition-colors duration-200 bg-transparent text-white placeholder-gray-400 ${
            errors.email
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-tornomix-aco focus:ring-tornomix-aco"
          }`}
          onChange={(e) => handleFieldChange("email", e.target.value)}
          onBlur={(e) => handleFieldBlur("email", e.target.value)}
          aria-describedby={errors.email ? "email-error" : "email-help"}
          aria-invalid={errors.email ? "true" : "false"}
          placeholder="seu@email.com"
        />
        {!errors.email && (
          <p id="email-help" className="text-xs text-gray-400 mt-1">
            Formato: exemplo@dominio.com
          </p>
        )}
        {errors.email && (
          <p
            id="email-error"
            className="text-sm text-red-500 mt-1"
            role="alert"
          >
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="telefone"
          className="block text-sm font-medium text-white mb-2"
        >
          Telefone*
          <span className="sr-only">(obrigatório)</span>
        </label>
        <input
          type="tel"
          id="telefone"
          name="telefone"
          required
          autoComplete="tel"
          placeholder="(11) 99999-9999"
          maxLength={15}
          className={`w-full border rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 transition-colors duration-200 bg-transparent text-white placeholder-gray-400 ${
            errors.telefone
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-tornomix-aco focus:ring-tornomix-aco"
          }`}
          onChange={(e) => {
            handlePhoneChange(e);
            handleFieldChange("telefone", e.target.value);
          }}
          onBlur={(e) => handleFieldBlur("telefone", e.target.value)}
          aria-describedby={
            errors.telefone ? "telefone-error" : "telefone-help"
          }
          aria-invalid={errors.telefone ? "true" : "false"}
        />
        {!errors.telefone && (
          <p id="telefone-help" className="text-xs text-gray-400 mt-1">
            Formato: (XX) XXXXX-XXXX
          </p>
        )}
        {errors.telefone && (
          <p
            id="telefone-error"
            className="text-sm text-red-500 mt-1"
            role="alert"
          >
            {errors.telefone}
          </p>
        )}
      </div>
    </div>
  );
}
