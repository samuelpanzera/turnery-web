"use server";

interface ValidationError {
  field: string;
  message: string;
}

function validateEmail(email: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function validatePhone(phone: string): boolean {
  const phonePattern = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
  return phonePattern.test(phone);
}

function validatePartsQuantity(quantity: string): {
  isValid: boolean;
  value?: number;
} {
  const numericValue = parseInt(quantity, 10);

  if (isNaN(numericValue)) {
    return { isValid: false };
  }

  if (numericValue < 1) {
    return { isValid: false };
  }

  return { isValid: true, value: numericValue };
}

export async function submitOrcamento(
  prevState: { success: boolean; message: string },
  formData: FormData
) {
  const rawFormData = Object.fromEntries(formData.entries());
  console.log("Dados recebidos no servidor:", rawFormData);

  const errors: ValidationError[] = [];

  const nome = formData.get("nome");
  if (!nome || typeof nome !== "string" || nome.length < 3) {
    errors.push({
      field: "nome",
      message: "Nome deve ter pelo menos 3 caracteres.",
    });
  }

  const telefone = formData.get("telefone");
  if (!telefone || typeof telefone !== "string") {
    errors.push({ field: "telefone", message: "Telefone é obrigatório." });
  } else if (!validatePhone(telefone)) {
    errors.push({
      field: "telefone",
      message: "Telefone deve estar no formato (XX) XXXXX-XXXX.",
    });
  }

  const quantidadePecasRaw = formData.get("quantidadePecas");
  let quantidadePecas = 1;

  if (quantidadePecasRaw && typeof quantidadePecasRaw === "string") {
    const quantityValidation = validatePartsQuantity(quantidadePecasRaw);
    if (!quantityValidation.isValid) {
      errors.push({
        field: "quantidadePecas",
        message: "Quantidade de peças deve ser um número inteiro maior que 0.",
      });
    } else {
      quantidadePecas = quantityValidation.value!;
    }
  }

  const fileUploadEnabled = formData.get("fileUploadEnabled") === "true";
  const anexo = formData.get("anexo") as File | null;

  if (fileUploadEnabled && anexo && anexo.size > 0) {
    const maxFileSize = 10 * 1024 * 1024;
    if (anexo.size > maxFileSize) {
      errors.push({
        field: "anexo",
        message: "Arquivo deve ter no máximo 10MB.",
      });
    }
  }

  if (errors.length > 0) {
    const errorMessage = errors.map((error) => error.message).join(" ");
    return { success: false, message: errorMessage };
  }

  console.log("Dados processados:", {
    nome,
    telefone,
    quantidadePecas,
    fileUploadEnabled,
    hasFile: anexo && anexo.size > 0,
  });

  if (process.env.NODE_ENV !== "test") {
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }

  const isSuccess = true;

  if (!isSuccess) {
    return { success: false, message: "Houve um erro ao enviar o orçamento." };
  }

  return { success: true, message: "Orçamento enviado com sucesso!" };
}
