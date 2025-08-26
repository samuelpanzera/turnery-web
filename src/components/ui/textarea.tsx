"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
  required?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, label, error, helpText, required, id, rows = 3, ...props },
    ref
  ) => {
    const generatedId = React.useId();
    const textareaId = id || `textarea-${generatedId}`;
    const helpId = `${textareaId}-help`;
    const errorId = `${textareaId}-error`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-white mb-2"
          >
            {label}
            {required && "*"}
            {required && <span className="sr-only">(obrigatório)</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          rows={rows}
          className={cn(
            "flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm transition-colors duration-200",
            "bg-transparent text-white placeholder-gray-400",
            "focus:outline-none focus:ring-1",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "resize-vertical",
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

Textarea.displayName = "Textarea";

export { Textarea };
