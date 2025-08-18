import { describe, it, expect } from "bun:test";
import { submitOrcamento } from "../actions";

describe("submitOrcamento", () => {
  const initialState = { success: false, message: "" };

  it("should validate all required fields", async () => {
    const formData = new FormData();

    const result = await submitOrcamento(initialState, formData);

    expect(result.success).toBe(false);
    expect(result.message).toContain("Nome deve ter pelo menos 3 caracteres");
    expect(result.message).toContain("Telefone é obrigatório");
  });

  it("should validate email format", async () => {
    const formData = new FormData();
    formData.append("nome", "João Silva");
    formData.append("email", "invalid-email");
    formData.append("telefone", "(11) 99999-9999");
    formData.append("quantidadePecas", "1");

    const result = await submitOrcamento(initialState, formData);

    expect(result.success).toBe(false);
    expect(result.message).toContain("Email deve ter um formato válido");
  });

  it("should validate phone format", async () => {
    const formData = new FormData();
    formData.append("nome", "João Silva");
    formData.append("email", "joao@example.com");
    formData.append("telefone", "invalid-phone");
    formData.append("quantidadePecas", "1");

    const result = await submitOrcamento(initialState, formData);

    expect(result.success).toBe(false);
    expect(result.message).toContain("Telefone deve estar no formato");
  });

  it("should validate parts quantity", async () => {
    const formData = new FormData();
    formData.append("nome", "João Silva");
    formData.append("email", "joao@example.com");
    formData.append("telefone", "(11) 99999-9999");
    formData.append("quantidadePecas", "0");

    const result = await submitOrcamento(initialState, formData);

    expect(result.success).toBe(false);
    expect(result.message).toContain(
      "Quantidade de peças deve ser um número inteiro maior que 0"
    );
  });

  it("should handle file upload toggle state", async () => {
    const formData = new FormData();
    formData.append("nome", "João Silva");
    formData.append("email", "joao@example.com");
    formData.append("telefone", "(11) 99999-9999");
    formData.append("quantidadePecas", "5");
    formData.append("fileUploadEnabled", "true");

    const result = await submitOrcamento(initialState, formData);

    expect(result.success).toBe(true);
    expect(result.message).toBe("Orçamento enviado com sucesso!");
  });

  it("should succeed with valid data", async () => {
    const formData = new FormData();
    formData.append("nome", "João Silva");
    formData.append("email", "joao@example.com");
    formData.append("telefone", "(11) 99999-9999");
    formData.append("quantidadePecas", "3");
    formData.append("fileUploadEnabled", "false");

    const result = await submitOrcamento(initialState, formData);

    expect(result.success).toBe(true);
    expect(result.message).toBe("Orçamento enviado com sucesso!");
  });

  it("should maintain backward compatibility with missing optional fields", async () => {
    const formData = new FormData();
    formData.append("nome", "João Silva");
    formData.append("email", "joao@example.com");
    formData.append("telefone", "(11) 99999-9999");
    // quantidadePecas not provided - should default to 1
    // fileUploadEnabled not provided - should default to false

    const result = await submitOrcamento(initialState, formData);

    expect(result.success).toBe(true);
    expect(result.message).toBe("Orçamento enviado com sucesso!");
  });

  it("should validate file size when file upload is enabled", async () => {
    const formData = new FormData();
    formData.append("nome", "João Silva");
    formData.append("email", "joao@example.com");
    formData.append("telefone", "(11) 99999-9999");
    formData.append("quantidadePecas", "1");
    formData.append("fileUploadEnabled", "true");

    // Create a mock file that's too large (over 10MB)
    const largeFile = new File(["x".repeat(11 * 1024 * 1024)], "large.txt", {
      type: "text/plain",
    });
    formData.append("anexo", largeFile);

    const result = await submitOrcamento(initialState, formData);

    expect(result.success).toBe(false);
    expect(result.message).toContain("Arquivo deve ter no máximo 10MB");
  });
});
