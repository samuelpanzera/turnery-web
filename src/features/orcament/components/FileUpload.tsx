"use client";

import { useRef } from "react";
import { FaUpload, FaCheck, FaTimes } from "react-icons/fa";
import { FileUploadProps } from "../types";

export function FileUpload({ file, fileError, onFileChange }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      triggerFileInput();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const syntheticEvent = {
        target: { files },
      } as React.ChangeEvent<HTMLInputElement>;
      onFileChange(syntheticEvent);
    }
  };

  return (
    <div>
      <label
        htmlFor="file-upload-input"
        className="block text-sm font-medium text-white mb-2"
      >
        Desenho Técnico ou Foto da Peça
      </label>
      <div
        className={`mt-1 flex justify-center px-3 sm:px-6 pt-4 sm:pt-5 pb-4 sm:pb-6 
          border-2 border-dashed rounded-md relative cursor-pointer
          focus-within:ring-2 focus-within:ring-tornomix-aco focus-within:ring-offset-2 focus-within:ring-offset-gray-800
          hover:border-gray-400 transition-colors duration-200 ${
            fileError
              ? "border-red-400 bg-red-50"
              : file
              ? "border-green-400 bg-green-50"
              : "border-gray-300 hover:bg-gray-50"
          }`}
        onClick={triggerFileInput}
        onKeyDown={handleKeyDown}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        aria-label="Área de upload de arquivo. Clique ou arraste um arquivo para fazer upload"
        aria-describedby="file-upload-description file-upload-status"
      >
        <div className="space-y-2 text-center w-full">
          <input
            type="file"
            ref={fileInputRef}
            id="file-upload-input"
            name="anexo"
            className="sr-only"
            onChange={onFileChange}
            accept=".jpg,.jpeg,.png,.pdf,.svg,.dxf,.dwg,.step,.stp"
            aria-describedby="file-upload-description"
          />
          <div className="flex flex-col items-center">
            <FaUpload
              className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400"
              aria-hidden="true"
            />
            <p className="text-sm sm:text-base text-white">
              <span className="text-white hover:text-tornomix-marinho font-medium">
                Clique para enviar um arquivo
              </span>{" "}
              <span className="hidden sm:inline">ou arraste e solte</span>
            </p>
            <p
              id="file-upload-description"
              className="text-xs sm:text-sm text-gray-500 mt-1"
            >
              JPG, PNG, PDF, SVG, DXF, DWG, STEP até 10MB
            </p>
          </div>

          {file && (
            <div
              className="mt-3 p-3 bg-green-100 rounded-lg flex items-center border border-green-300"
              role="status"
              aria-live="polite"
            >
              <FaCheck
                className="text-green-600 mr-2 flex-shrink-0"
                aria-hidden="true"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-green-700 font-medium truncate">
                  {file.name}
                </p>
                <p className="text-xs text-green-600">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          )}

          {fileError && (
            <div
              className="mt-3 p-3 bg-red-100 rounded-lg flex items-start border border-red-300"
              role="alert"
              aria-live="assertive"
            >
              <FaTimes
                className="text-red-600 mr-2 mt-0.5 flex-shrink-0"
                aria-hidden="true"
              />
              <p className="text-sm text-red-700">{fileError}</p>
            </div>
          )}
        </div>
      </div>
      <div id="file-upload-status" className="sr-only" aria-live="polite">
        {file
          ? `Arquivo selecionado: ${file.name}`
          : "Nenhum arquivo selecionado"}
        {fileError ? `. Erro: ${fileError}` : ""}
      </div>
    </div>
  );
}
