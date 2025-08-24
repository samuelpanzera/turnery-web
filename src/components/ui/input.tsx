"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, label, error, helpText, required, id, ...props },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || `input-${generatedId}`;
    const helpId = `${inputId}-help`;
    const errorId = `${inputId}-error`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-white mb-2"
          >
            {label}
            {required && "*"}
            {required && <span className="sr-only">(obrigatório)</span>}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            "flex h-10 w-full rounded-md border px-3 py-2 text-sm transition-colors duration-200",
            "bg-transparent text-white placeholder-gray-400",
            "focus:outline-none focus:ring-1",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-tornomix-aco focus:ring-tornomix-aco",
            className
          )}
          ref={ref}
          required={required}
          aria-describedby={error ? errorId : helpText ? helpId : undefined}
          aria-invalid={error ? "true" : "false"}
          {...props}
        />
        {!error && helpText && (
          <p id={helpId} className="text-xs text-gray-400 mt-1">
            {helpText}
          </p>
        )}
        {error && (
          <p
            id={errorId}
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
);

Input.displayName = "Input";

export { Input };
