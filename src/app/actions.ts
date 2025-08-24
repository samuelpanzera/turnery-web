"use server";

import zod from "zod";

const orcamentoSchema = zod
  .object({
    nome: zod
      .string()
      .min(3, { message: "Nome deve ter pelo menos 3 caracteres." }),
    telefone: zod.string().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, {
      message: "Telefone deve estar no formato (XX) XXXXX-XXXX.",
    }),
    quantidadePecas: zod.coerce
      .number({ error: "Quantidade de peças deve ser um número." })
      .int({ message: "Quantidade deve ser um número inteiro." })
      .positive({ message: "Quantidade deve ser maior que zero." }),
    fileUploadEnabled: zod.boolean(),
    anexo: zod.instanceof(File).nullable(),
  })
  .refine(
    (data) => {
      if (data.fileUploadEnabled && data.anexo && data.anexo.size > 0) {
        const maxFileSize = 10 * 1024 * 1024;
        return data.anexo.size <= maxFileSize;
      }
      return true;
    },
    {
      message: "O arquivo anexo deve ter no máximo 10MB.",
      path: ["anexo"],
    }
  );

interface FormState {
  success: boolean;
  message: string;
  errors?: string[];
}

export async function submitOrcamento(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawFormData = {
    ...Object.fromEntries(formData.entries()),
    fileUploadEnabled: formData.get("fileUploadEnabled") === "true",
    anexo: formData.get("anexo"),
  };

  const validationResult = orcamentoSchema.safeParse(rawFormData); // result a zodError with no file, but file is a opcional message: Input not instance of File

  if (!validationResult.success) {
    const fieldErrors = zod.treeifyError(validationResult.error).errors;
    console.log("Erros de validação:", fieldErrors);

    return {
      success: false,
      message: "Por favor, corrija os erros no formulário.",
      errors: fieldErrors,
    };
  }

  const { nome } = validationResult.data;

  console.log("Dados validados com sucesso:", validationResult.data);

  try {
    // Timout de carregamento
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      message: `Orçamento para "${nome}" enviado com sucesso!`,
    };
  } catch {
    return {
      success: false,
      message: "Houve um erro inesperado ao enviar o orçamento.",
    };
  }
}
