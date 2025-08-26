import React from "react";
import { describe, it, expect, afterEach, mock } from "bun:test";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { OrcamentForm } from "../OrcamentForm";

const mockSubmitOrcamento = mock(() =>
  Promise.resolve({ success: true, message: "Orçamento enviado com sucesso!" })
);

mock.module("@/app/actions", () => ({
  submitOrcamento: mockSubmitOrcamento,
}));

const mockUseFileUpload = mock(() => ({
  file: null as File | null,
  fileError: null as string | null,
  handleFileChange: mock(),
}));

mock.module("../hooks/useFileUpload", () => ({
  useFileUpload: mockUseFileUpload,
}));

describe("Form Submission Tests", () => {
  afterEach(() => {
    cleanup();
    mockSubmitOrcamento.mockClear();
    mockUseFileUpload.mockClear();
  });

  it("renders form with all required fields and allows submission", async () => {
    mockSubmitOrcamento.mockResolvedValue({
      success: false,
      message: "",
    });

    render(<OrcamentForm />);

    expect(screen.getByRole("textbox", { name: /nome/i })).toBeTruthy();
    expect(screen.getByRole("textbox", { name: /email/i })).toBeTruthy();
    expect(screen.getByRole("textbox", { name: /telefone/i })).toBeTruthy();
    expect(
      screen.getByRole("spinbutton", { name: /quantidade de peças/i })
    ).toBeTruthy();
    expect(
      screen.getByRole("checkbox", { name: /incluir anexos/i })
    ).toBeTruthy();

    fireEvent.change(screen.getByRole("textbox", { name: /nome/i }), {
      target: { value: "João Silva" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: "joao@example.com" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /telefone/i }), {
      target: { value: "11999999999" },
    });

    expect(
      (screen.getByRole("textbox", { name: /nome/i }) as HTMLInputElement).value
    ).toBe("João Silva");
    expect(
      (screen.getByRole("textbox", { name: /email/i }) as HTMLInputElement)
        .value
    ).toBe("joao@example.com");
    expect(
      (screen.getByRole("textbox", { name: /telefone/i }) as HTMLInputElement)
        .value
    ).toBe("(11) 99999-9999");

    const submitButton = screen.getByRole("button", {
      name: "Solicitar Orçamento",
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmitOrcamento).toHaveBeenCalled();
    });
  });

  it("handles custom parts quantity input correctly", async () => {
    render(<OrcamentForm />);

    const quantityField = screen.getByRole("spinbutton", {
      name: /quantidade de peças/i,
    });

    expect((quantityField as HTMLInputElement).value).toBe("1");

    fireEvent.change(quantityField, { target: { value: "10" } });
    expect((quantityField as HTMLInputElement).value).toBe("10");

    fireEvent.change(screen.getByRole("textbox", { name: /nome/i }), {
      target: { value: "Maria Santos" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: "maria@example.com" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /telefone/i }), {
      target: { value: "21987654321" },
    });

    expect(
      (screen.getByRole("textbox", { name: /telefone/i }) as HTMLInputElement)
        .value
    ).toBe("(21) 98765-4321");
  });

  it("shows file upload section when toggle is enabled", async () => {
    render(<OrcamentForm />);

    const toggle = screen.getByRole("checkbox", { name: /incluir anexos/i });

    expect(screen.queryByText("Desenho Técnico ou Foto da Peça")).toBeNull();
    expect((toggle as HTMLInputElement).checked).toBe(false);

    fireEvent.click(toggle);

    await waitFor(() => {
      expect(screen.getByText("Desenho Técnico ou Foto da Peça")).toBeTruthy();
      expect((toggle as HTMLInputElement).checked).toBe(true);
    });

    const hiddenField = screen.getByDisplayValue("true");
    expect(hiddenField.getAttribute("name")).toBe("fileUploadEnabled");
  });

  it("displays file information when file is attached", async () => {
    const mockFile = new File(["test content"], "test.jpg", {
      type: "image/jpeg",
    });

    mockUseFileUpload.mockReturnValue({
      file: mockFile,
      fileError: null,
      handleFileChange: mock(),
    });

    render(<OrcamentForm />);

    const toggle = screen.getByRole("checkbox", { name: /incluir anexos/i });
    fireEvent.click(toggle);

    await waitFor(() => {
      expect(screen.getByText("Desenho Técnico ou Foto da Peça")).toBeTruthy();
      expect(screen.getByText(/arquivo selecionado: test.jpg/i)).toBeTruthy();
    });
  });

  it("displays file upload errors when present", async () => {
    mockUseFileUpload.mockReturnValue({
      file: null,
      fileError: "Arquivo deve ter no máximo 10MB",
      handleFileChange: mock(),
    });

    render(<OrcamentForm />);

    const toggle = screen.getByRole("checkbox", { name: /incluir anexos/i });
    fireEvent.click(toggle);

    await waitFor(() => {
      expect(screen.getByText("Desenho Técnico ou Foto da Peça")).toBeTruthy();
      expect(screen.getByText("Arquivo deve ter no máximo 10MB")).toBeTruthy();
    });

    const errorElement = screen.getByRole("alert");
    expect(errorElement).toBeTruthy();
    expect(errorElement.textContent).toContain(
      "Arquivo deve ter no máximo 10MB"
    );
  });

  it("shows validation errors when fields have invalid data", async () => {
    render(<OrcamentForm />);

    fireEvent.change(screen.getByRole("textbox", { name: /nome/i }), {
      target: { value: "Jo" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /telefone/i }), {
      target: { value: "123" },
    });

    fireEvent.blur(screen.getByRole("textbox", { name: /nome/i }));
    fireEvent.blur(screen.getByRole("textbox", { name: /email/i }));
    fireEvent.blur(screen.getByRole("textbox", { name: /telefone/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Nome deve ter pelo menos 3 caracteres")
      ).toBeTruthy();
      expect(screen.getByText("Email deve ter um formato válido")).toBeTruthy();
      expect(
        screen.getByText("Telefone deve estar no formato (XX) XXXXX-XXXX")
      ).toBeTruthy();
    });

    const nomeField = screen.getByRole("textbox", { name: /nome/i });
    const emailField = screen.getByRole("textbox", { name: /email/i });
    const telefoneField = screen.getByRole("textbox", { name: /telefone/i });

    expect(nomeField.className).toContain("border-red-500");
    expect(emailField.className).toContain("border-red-500");
    expect(telefoneField.className).toContain("border-red-500");
  });

  it("handles form submission success", async () => {
    mockSubmitOrcamento.mockResolvedValue({
      success: true,
      message: "Orçamento enviado com sucesso!",
    });

    render(<OrcamentForm />);

    fireEvent.change(screen.getByRole("textbox", { name: /nome/i }), {
      target: { value: "João Silva" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: "joao@example.com" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /telefone/i }), {
      target: { value: "11999999999" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Solicitar Orçamento" })
    );

    await waitFor(() => {
      expect(screen.getByText("Obrigado!")).toBeTruthy();
      expect(
        screen.getByText(/seu orçamento foi enviado com sucesso/i)
      ).toBeTruthy();
    });
  });

  it("handles form submission failure", async () => {
    mockSubmitOrcamento.mockResolvedValue({
      success: false,
      message: "Erro ao enviar orçamento. Tente novamente.",
    });

    render(<OrcamentForm />);

    fireEvent.change(screen.getByRole("textbox", { name: /nome/i }), {
      target: { value: "Carlos Silva" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: "carlos@example.com" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /telefone/i }), {
      target: { value: "11777666555" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Solicitar Orçamento" })
    );

    await waitFor(() => {
      expect(mockSubmitOrcamento).toHaveBeenCalled();
    });

    expect(screen.getByRole("textbox", { name: /nome/i })).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Solicitar Orçamento" })
    ).toBeTruthy();
  });

  it("handles rapid form submissions gracefully", async () => {
    mockSubmitOrcamento.mockResolvedValue({
      success: false,
      message: "",
    });

    render(<OrcamentForm />);

    fireEvent.change(screen.getByRole("textbox", { name: /nome/i }), {
      target: { value: "Teste Rápido" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: "teste@example.com" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /telefone/i }), {
      target: { value: "11555444333" },
    });

    const submitButton = screen.getByRole("button", {
      name: "Solicitar Orçamento",
    });

    fireEvent.click(submitButton);
    fireEvent.click(submitButton);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmitOrcamento).toHaveBeenCalledTimes(1);
    });
  });
});
