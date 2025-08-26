import { useState } from "react";

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const ALLOWED_IMAGE_FORMATS = ["image/jpeg", "image/jpg", "image/png"];
export const ALLOWED_TECHNICAL_FORMATS = [
  "application/pdf",
  "image/svg+xml",
  "application/dxf",
  "application/dwg",
  "application/step",
  "application/stp",
];

export const ALLOWED_FORMATS = [
  ...ALLOWED_IMAGE_FORMATS,
  ...ALLOWED_TECHNICAL_FORMATS,
];

export function useFileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFileError(null);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      setFileError(
        `O arquivo excede o tamanho máximo de ${MAX_FILE_SIZE_MB}MB`
      );
      setFile(null);
      return;
    }

    if (!ALLOWED_FORMATS.includes(selectedFile.type)) {
      setFileError("Formato de arquivo não permitido.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  return { file, fileError, handleFileChange };
}
