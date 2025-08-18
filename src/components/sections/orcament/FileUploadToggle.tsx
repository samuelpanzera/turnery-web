"use client";

import React from "react";

export interface FileUploadToggleProps {
  isFileUploadEnabled: boolean;
  onToggle: (enabled: boolean) => void;
  className?: string;
}

export function FileUploadToggle({
  isFileUploadEnabled,
  onToggle,
  className = "",
}: FileUploadToggleProps) {
  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(e.target.checked);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
      onToggle(!isFileUploadEnabled);
    }
  };

  return (
    <div
      className={`flex items-start space-x-3 p-3 rounded-md border border-gray-600 hover:border-gray-500 transition-colors ${className}`}
    >
      <input
        type="checkbox"
        id="file-upload-toggle"
        checked={isFileUploadEnabled}
        onChange={handleToggleChange}
        onKeyDown={handleKeyDown}
        className="h-4 w-4 mt-1 text-tornomix-aco focus:ring-2 focus:ring-tornomix-aco focus:ring-offset-2 focus:ring-offset-gray-800 border-gray-300 rounded transition-colors"
        aria-describedby="file-upload-toggle-description"
      />
      <div className="flex-1">
        <label
          htmlFor="file-upload-toggle"
          className="text-sm font-medium text-white cursor-pointer select-none"
        >
          Incluir anexos
        </label>
        <p
          id="file-upload-toggle-description"
          className="text-xs text-gray-400 mt-1"
        >
          Marque esta opção para enviar desenhos técnicos, imagens ou outros
          arquivos que ajudem na elaboração do orçamento
        </p>
        {isFileUploadEnabled && (
          <p className="text-xs text-green-400 mt-1" aria-live="polite">
            ✓ Upload de arquivos habilitado
          </p>
        )}
      </div>
    </div>
  );
}
