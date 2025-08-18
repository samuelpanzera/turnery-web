"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  isLoading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function SubmitButton({
  isLoading,
  disabled,
  children = "Solicitar Orçamento",
  className,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  const isButtonDisabled = disabled || pending || isLoading;
  const isButtonLoading = pending || isLoading;

  const defaultClassName = [
    "bg-yellow-500 hover:bg-yellow-600 text-black font-semibold",
    "py-3 px-6 sm:py-4 sm:px-8 rounded-lg shadow-md transition-all duration-200",
    "hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-800",
    "disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100",
    "flex items-center justify-center gap-2 min-w-[200px] text-sm sm:text-base",
  ].join(" ");

  const finalClassName = className
    ? `${defaultClassName} ${className}`
    : defaultClassName;

  return (
    <Button
      type="submit"
      disabled={isButtonDisabled}
      className={finalClassName}
      aria-describedby={isButtonLoading ? "submit-status" : undefined}
    >
      {isButtonLoading ? (
        <>
          <span
            className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"
            aria-hidden="true"
          />
          <span>Enviando...</span>
          <span id="submit-status" className="sr-only">
            Formulário sendo enviado, aguarde
          </span>
        </>
      ) : (
        <span>{children}</span>
      )}
    </Button>
  );
}
