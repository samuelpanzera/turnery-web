"use client";

import * as React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  children?: React.ReactNode;
}

const SubmitButton = React.forwardRef<HTMLButtonElement, SubmitButtonProps>(
  (
    {
      className,
      isLoading,
      loadingText = "Enviando...",
      disabled,
      children = "Enviar",
      ...props
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    const isButtonDisabled = disabled || pending || isLoading;
    const isButtonLoading = pending || isLoading;

    const defaultClassName = cn(
      "bg-yellow-500 hover:bg-yellow-600 text-black font-semibold",
      "py-3 px-6 sm:py-4 sm:px-8 rounded-lg shadow-md transition-all duration-200",
      "hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-800",
      "disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100",
      "flex items-center justify-center gap-2 min-w-[200px] text-sm sm:text-base cursor-pointer",
      className
    );

    return (
      <Button
        type="submit"
        disabled={isButtonDisabled}
        className={defaultClassName}
        ref={ref}
        aria-describedby={isButtonLoading ? "submit-status" : undefined}
        {...props}
      >
        {isButtonLoading ? (
          <>
            <span
              className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"
              aria-hidden="true"
            />
            <span>{loadingText}</span>
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
);

SubmitButton.displayName = "SubmitButton";

export { SubmitButton };
