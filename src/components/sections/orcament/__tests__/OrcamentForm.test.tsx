import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, describe, mock, afterEach } from "bun:test";
import { OrcamentForm } from "../OrcamentForm";
mock.module("@/app/actions", () => ({
  submitOrcamento: mock(() => Promise.resolve({ success: false, message: "" })),
}));
mock.module("@/hooks/useFileUpload", () => ({
  useFileUpload: () => ({
    file: null,
    fileError: null,
    handleFileChange: mock(),
  }),
}));

describe("OrcamentForm Integration", () => {
  afterEach(() => {
    cleanup();
  });

  test("renders all form sections and components", () => {
    render(<OrcamentForm />);

    expect(screen.getByText("Informações de Contato")).toBeTruthy();
    expect(screen.getByRole("textbox", { name: /nome/i })).toBeTruthy();
    expect(screen.getByRole("textbox", { name: /email/i })).toBeTruthy();
    expect(screen.getByRole("textbox", { name: /telefone/i })).toBeTruthy();

    expect(screen.getByText("Detalhes da Peça")).toBeTruthy();
    expect(
      screen.getByRole("spinbutton", { name: /quantidade de peças/i })
    ).toBeTruthy();
    expect(
      screen.getByRole("textbox", { name: /Infomações adicionais/i })
    ).toBeTruthy();

    expect(
      screen.getByRole("checkbox", { name: /incluir anexos/i })
    ).toBeTruthy();

    expect(
      screen.getByRole("button", { name: "Solicitar Orçamento" })
    ).toBeTruthy();
  });

  test("conditionally shows file upload when toggle is enabled", async () => {
    render(<OrcamentForm />);

    const toggle = screen.getByRole("checkbox", { name: /incluir anexos/i });

    expect((toggle as HTMLInputElement).checked).toBe(false);
    expect(screen.queryByText("Desenho Técnico ou Foto da Peça")).toBeNull();

    fireEvent.click(toggle);

    await waitFor(() => {
      expect(screen.getByText("Desenho Técnico ou Foto da Peça")).toBeTruthy();
    });
  });

  test("includes hidden field for file upload toggle state", () => {
    render(<OrcamentForm />);

    const hiddenField = screen.getByDisplayValue("false");
    expect(hiddenField.getAttribute("name")).toBe("fileUploadEnabled");
    expect(hiddenField.getAttribute("type")).toBe("hidden");
  });

  test("updates hidden field when toggle state changes", async () => {
    render(<OrcamentForm />);

    const toggle = screen.getByRole("checkbox", { name: /incluir anexos/i });

    expect(screen.getByDisplayValue("false")).toBeTruthy();

    fireEvent.click(toggle);

    await waitFor(() => {
      expect(screen.getByDisplayValue("true")).toBeTruthy();
    });
  });

  test("has proper form structure and accessibility", () => {
    render(<OrcamentForm />);

    const submitButton = screen.getByRole("button", {
      name: "Solicitar Orçamento",
    });
    expect(submitButton).toBeTruthy();
    expect(submitButton.closest("form")).toBeTruthy();

    expect(screen.getByText("Informações de Contato")).toBeTruthy();
    expect(screen.getByText("Detalhes da Peça")).toBeTruthy();

    const form = screen.getByRole("form");
    expect(form).toHaveAttribute(
      "aria-label",
      "Formulário de solicitação de orçamento"
    );
    expect(form).toHaveAttribute("noValidate");

    expect(
      screen.getByRole("textbox", { name: /nome/i }).hasAttribute("required")
    ).toBe(true);
    expect(
      screen.getByRole("textbox", { name: /email/i }).hasAttribute("required")
    ).toBe(true);
    expect(
      screen
        .getByRole("textbox", { name: /telefone/i })
        .hasAttribute("required")
    ).toBe(true);
    expect(
      screen
        .getByRole("spinbutton", { name: /quantidade de peças/i })
        .hasAttribute("required")
    ).toBe(true);
  });

  test("validates all mandatory fields with comprehensive error handling", async () => {
    render(<OrcamentForm />);

    const nomeField = screen.getByRole("textbox", { name: /nome/i });
    const emailField = screen.getByRole("textbox", { name: /email/i });
    const telefoneField = screen.getByRole("textbox", { name: /telefone/i });
    const quantidadeField = screen.getByRole("spinbutton", {
      name: /quantidade de peças/i,
    });

    fireEvent.focus(nomeField);
    fireEvent.blur(nomeField);

    await waitFor(() => {
      expect(screen.getByText("Nome é obrigatório")).toBeTruthy();
    });

    fireEvent.change(emailField, { target: { value: "invalid-email" } });
    fireEvent.blur(emailField);

    await waitFor(() => {
      expect(screen.getByText("Email deve ter um formato válido")).toBeTruthy();
    });

    fireEvent.change(telefoneField, { target: { value: "123" } });
    fireEvent.blur(telefoneField);

    await waitFor(() => {
      expect(
        screen.getByText("Telefone deve estar no formato (XX) XXXXX-XXXX")
      ).toBeTruthy();
    });

    fireEvent.change(quantidadeField, { target: { value: "2.5" } });

    await waitFor(() => {
      expect(
        screen.getByText("A quantidade deve ser um número inteiro positivo")
      ).toBeTruthy();
    });

    fireEvent.change(nomeField, { target: { value: "João Silva" } });
    fireEvent.change(emailField, { target: { value: "joao@example.com" } });
    fireEvent.change(telefoneField, { target: { value: "11999999999" } });
    fireEvent.change(quantidadeField, { target: { value: "5" } });

    await waitFor(() => {
      expect(screen.queryByText("Nome é obrigatório")).toBeNull();
      expect(screen.queryByText("Email deve ter um formato válido")).toBeNull();
      expect(
        screen.queryByText("Telefone deve estar no formato (XX) XXXXX-XXXX")
      ).toBeNull();
      expect(
        screen.queryByText("A quantidade deve ser um número inteiro positivo")
      ).toBeNull();
    });
  });

  test("validates file upload when toggle is enabled", async () => {
    const user = userEvent.setup();

    const mockHandleFileChange = mock();
    mock.module("@/hooks/useFileUpload", () => ({
      useFileUpload: () => ({
        file: null,
        fileError: "Arquivo deve ter no máximo 10MB",
        handleFileChange: mockHandleFileChange,
      }),
    }));

    render(<OrcamentForm />);

    const toggle = screen.getByRole("checkbox", { name: /incluir anexos/i });
    await user.click(toggle);

    await waitFor(() => {
      expect(screen.getByText("Desenho Técnico ou Foto da Peça")).toBeTruthy();
    });

    await waitFor(() => {
      expect(screen.getByText("Arquivo deve ter no máximo 10MB")).toBeTruthy();
    });
  });

  test("form submission works correctly with valid data", async () => {
    const mockSubmitOrcamento = mock(() =>
      Promise.resolve({
        success: true,
        message: "Orçamento enviado com sucesso!",
      })
    );

    mock.module("@/app/actions", () => ({
      submitOrcamento: mockSubmitOrcamento,
    }));

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
    fireEvent.change(
      screen.getByRole("spinbutton", { name: /quantidade de peças/i }),
      {
        target: { value: "3" },
      }
    );

    const submitButton = screen.getByRole("button", {
      name: "Solicitar Orçamento",
    });
    fireEvent.click(submitButton);
  });

  test("form maintains validation state during user interaction", async () => {
    render(<OrcamentForm />);

    const nomeField = screen.getByRole("textbox", { name: /nome/i });
    const emailField = screen.getByRole("textbox", { name: /email/i });

    fireEvent.focus(nomeField);
    fireEvent.blur(nomeField);

    await waitFor(() => {
      expect(screen.getByText("Nome é obrigatório")).toBeTruthy();
      expect(nomeField.className).toContain("border-red-500");
    });

    fireEvent.change(emailField, { target: { value: "test@example.com" } });

    expect(screen.getByText("Nome é obrigatório")).toBeTruthy();
    expect(nomeField.className).toContain("border-red-500");

    fireEvent.change(nomeField, { target: { value: "João Silva" } });
    fireEvent.blur(nomeField);

    await waitFor(() => {
      expect(screen.queryByText("Nome é obrigatório")).toBeNull();
      expect(nomeField.className).toContain("border-gray-600");
    });
  });

  test("accessibility attributes are properly set during validation", async () => {
    render(<OrcamentForm />);

    const nomeField = screen.getByRole("textbox", { name: /nome/i });

    expect(nomeField.getAttribute("aria-invalid")).toBe("false");

    fireEvent.focus(nomeField);
    fireEvent.blur(nomeField);

    await waitFor(() => {
      expect(nomeField.getAttribute("aria-invalid")).toBe("true");
      expect(nomeField.getAttribute("aria-describedby")).toBe("nome-error");
    });

    const errorMessage = screen.getByText("Nome é obrigatório");
    expect(errorMessage.getAttribute("id")).toBe("nome-error");
  });
});
