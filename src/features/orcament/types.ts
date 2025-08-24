export interface OrcamentFormData {
  nome: string;
  email: string;
  telefone: string;
  descricaoPeca: string;
  quantidadePecas: number;
  fileUploadEnabled: boolean;
}

export interface ContactFieldsProps {}

export interface FileUploadProps {
  file: File | null;
  fileError: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface DescriptionFieldProps {
  name?: string;
  id?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}

export interface PartsQuantityFieldProps {
  defaultValue?: number;
  onChange?: (quantity: number) => void;
  name?: string;
  id?: string;
  isFileUploadEnabled?: boolean;
  onToggleFileUpload?: (enabled: boolean) => void;
}

export interface FileUploadToggleState {
  isFileUploadEnabled: boolean;
}

export interface UsePartsQuantityReturn {
  quantity: number;
  error: string | null;
  handleQuantityChange: (value: string) => void;
  resetQuantity: () => void;
}
