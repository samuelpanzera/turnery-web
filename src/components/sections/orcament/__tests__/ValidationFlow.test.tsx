import React from "react";
import { describe, it, expect, afterEach, mock } from "bun:test";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrcamentForm } from "../OrcamentForm";

const mockSubmitOrcamento = mock(() =>
  Promise.resolve({ success: false, message: "" })
);

mock.module("@/app/actions", () => ({
  submitOrcamento: mockSubmitOrcamento,
}));

mock.module("@/hooks/useFileUpload", () => ({
  useFileUpload: () => ({
    file: null,
    fileError: null,
    handleFileChange: mock(),
  }),
}));

describe("Validation Flow Tests", () => {
  afterEach(() => {
    cleanup();
    mockSubmitOrcamento.mockClear();
  });

  it("validates all required fields when user interacts with empty fields", async () => {
    render(<OrcamentForm />);

    const nomeField = screen.getByRole("textbox", { name: /nome/i });
    const emailField = screen.getByRole("textbox", { name: /email/i });
    const telefoneField = screen.getByRole("textbox", { name: /telefone/i });

    fireEvent.focus(nomeField);
    fireEvent.blur(nomeField);
    fireEvent.focus(emailField);
    fireEvent.blur(emailField);
    fireEvent.focus(telefoneField);
    fireEvent.blur(telefoneField);

    await waitFor(() => {
      expect(screen.getByText("Nome é obrigatório")).toBeTruthy();
      expect(screen.getByText("Email é obrigatório")).toBeTruthy();
      expect(screen.getByText("Telefone é obrigatório")).toBeTruthy();
    });

    expect(nomeField.className).toContain("border-red-500");
    expect(emailField.className).toContain("border-red-500");
    expect(telefoneField.className).toContain("border-red-500");

    expect(nomeField.getAttribute("aria-invalid")).toBe("true");
    expect(emailField.getAttribute("aria-invalid")).toBe("true");
    expect(telefoneField.getAttribute("aria-invalid")).toBe("true");
  });

  it("validates individual fields as user interacts with them", async () => {
    render(<OrcamentForm />);

    const nomeField = screen.getByRole("textbox", { name: /nome/i });
    const emailField = screen.getByRole("textbox", { name: /email/i });
    const telefoneField = screen.getByRole("textbox", { name: /telefone/i });

    fireEvent.focus(nomeField);
    fireEvent.change(nomeField, { target: { value: "Jo" } });
    fireEvent.blur(nomeField);

    await waitFor(() => {
      expect(
        screen.getByText("Nome deve ter pelo menos 3 caracteres")
      ).toBeTruthy();
    });

    fireEvent.focus(emailField);
    fireEvent.change(emailField, { target: { value: "invalid-email" } });
    fireEvent.blur(emailField);

    await waitFor(() => {
      expect(screen.getByText("Email deve ter um formato válido")).toBeTruthy();
    });

    fireEvent.focus(telefoneField);
    fireEvent.change(telefoneField, { target: { value: "123" } });
    fireEvent.blur(telefoneField);

    await waitFor(() => {
      expect(
        screen.getByText("Telefone deve estar no formato (XX) XXXXX-XXXX")
      ).toBeTruthy();
    });

    expect(
      screen.getByText("Nome deve ter pelo menos 3 caracteres")
    ).toBeTruthy();
    expect(screen.getByText("Email deve ter um formato válido")).toBeTruthy();
    expect(
      screen.getByText("Telefone deve estar no formato (XX) XXXXX-XXXX")
    ).toBeTruthy();
  });

  it("clears validation errors when fields are corrected", async () => {
    render(<OrcamentForm />);

    const nomeField = screen.getByRole("textbox", { name: /nome/i });
    const emailField = screen.getByRole("textbox", { name: /email/i });
    const telefoneField = screen.getByRole("textbox", { name: /telefone/i });

    fireEvent.focus(nomeField);
    fireEvent.blur(nomeField);
    fireEvent.change(emailField, { target: { value: "invalid" } });
    fireEvent.blur(emailField);
    fireEvent.change(telefoneField, { target: { value: "123" } });
    fireEvent.blur(telefoneField);

    await waitFor(() => {
      expect(screen.getByText("Nome é obrigatório")).toBeTruthy();
      expect(screen.getByText("Email deve ter um formato válido")).toBeTruthy();
      expect(
        screen.getByText("Telefone deve estar no formato (XX) XXXXX-XXXX")
      ).toBeTruthy();
    });

    fireEvent.change(nomeField, { target: { value: "João Silva" } });
    fireEvent.blur(nomeField);
    fireEvent.change(emailField, { target: { value: "joao@example.com" } });
    fireEvent.blur(emailField);
    fireEvent.change(telefoneField, { target: { value: "11999999999" } });
    fireEvent.blur(telefoneField);

    await waitFor(() => {
      expect(screen.queryByText("Nome é obrigatório")).toBeNull();
      expect(screen.queryByText("Email deve ter um formato válido")).toBeNull();
      expect(
        screen.queryByText("Telefone deve estar no formato (XX) XXXXX-XXXX")
      ).toBeNull();
    });

    expect(nomeField.className).toContain("border-gray-600");
    expect(emailField.className).toContain("border-gray-600");
    expect(telefoneField.className).toContain("border-gray-600");

    expect(nomeField.getAttribute("aria-invalid")).toBe("false");
    expect(emailField.getAttribute("aria-invalid")).toBe("false");
    expect(telefoneField.getAttribute("aria-invalid")).toBe("false");
  });

  it("validates parts quantity field styling and attributes", async () => {
    render(<OrcamentForm />);

    const quantityField = screen.getByRole("spinbutton", {
      name: /quantidade de peças/i,
    });

    expect(quantityField.className).toContain("border-gray-600");
    expect(quantityField.getAttribute("aria-invalid")).toBe("false");
    expect(quantityField.getAttribute("aria-describedby")).toBe(
      "quantidadePecas-help"
    );

    fireEvent.change(quantityField, { target: { value: "2.5" } });

    await waitFor(() => {
      expect(quantityField.className).toContain("border-red-500");
      expect(quantityField.getAttribute("aria-invalid")).toBe("true");
      expect(quantityField.getAttribute("aria-describedby")).toBe(
        "quantidadePecas-error"
      );
    });

    fireEvent.change(quantityField, { target: { value: "5" } });

    await waitFor(() => {
      expect(quantityField.className).toContain("border-gray-600");
      expect(quantityField.getAttribute("aria-invalid")).toBe("false");
      expect(quantityField.getAttribute("aria-describedby")).toBe(
        "quantidadePecas-help"
      );
    });
  });

  it("handles validation with file upload enabled", async () => {
    mock.module("@/hooks/useFileUpload", () => ({
      useFileUpload: () => ({
        file: null,
        fileError: "Arquivo deve ter no máximo 10MB",
        handleFileChange: mock(),
      }),
    }));

    render(<OrcamentForm />);

    const toggle = screen.getByRole("checkbox", { name: /incluir anexos/i });
    fireEvent.click(toggle);

    await waitFor(() => {
      expect(screen.getByText("Desenho Técnico ou Foto da Peça")).toBeTruthy();
      expect(screen.getByText("Arquivo deve ter no máximo 10MB")).toBeTruthy();
    });

    fireEvent.change(screen.getByRole("textbox", { name: /nome/i }), {
      target: { value: "João Silva" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: "joao@example.com" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /telefone/i }), {
      target: { value: "11999999999" },
    });

    expect(screen.getByText("Arquivo deve ter no máximo 10MB")).toBeTruthy();
  });

  it("validates phone number formatting in real-time", async () => {
    render(<OrcamentForm />);

    const telefoneField = screen.getByRole("textbox", { name: /telefone/i });

    fireEvent.change(telefoneField, { target: { value: "11999999999" } });

    expect((telefoneField as HTMLInputElement).value).toBe("(11) 99999-9999");

    fireEvent.blur(telefoneField);

    await waitFor(() => {
      expect(
        screen.queryByText("Telefone deve estar no formato (XX) XXXXX-XXXX")
      ).toBeNull();
    });
  });

  it("maintains validation state during form interaction", async () => {
    render(<OrcamentForm />);

    const nomeField = screen.getByRole("textbox", { name: /nome/i });
    const emailField = screen.getByRole("textbox", { name: /email/i });
    const quantityField = screen.getByRole("spinbutton", {
      name: /quantidade de peças/i,
    });

    fireEvent.focus(nomeField);
    fireEvent.blur(nomeField);

    await waitFor(() => {
      expect(screen.getByText("Nome é obrigatório")).toBeTruthy();
    });

    fireEvent.change(emailField, { target: { value: "test@example.com" } });
    fireEvent.change(quantityField, { target: { value: "3" } });

    expect(screen.getByText("Nome é obrigatório")).toBeTruthy();
    expect(nomeField.className).toContain("border-red-500");

    const toggle = screen.getByRole("checkbox", { name: /incluir anexos/i });
    fireEvent.click(toggle);

    await waitFor(() => {
      expect(screen.getByText("Desenho Técnico ou Foto da Peça")).toBeTruthy();
    });

    expect(screen.getByText("Nome é obrigatório")).toBeTruthy();
    expect(nomeField.className).toContain("border-red-500");
  });

  it("handles complex validation scenarios with multiple field interactions", async () => {
    const user = userEvent.setup();
    render(<OrcamentForm />);

    await user.type(screen.getByRole("textbox", { name: /nome/i }), "Jo"); // Too short
    await user.type(
      screen.getByRole("textbox", { name: /email/i }),
      "valid@example.com"
    );
    await user.type(
      screen.getByRole("textbox", { name: /telefone/i }),
      "invalid-phone"
    );
    await user.clear(screen.getByRole("spinbutton", { name: /quantidade/i }));
    await user.type(
      screen.getByRole("spinbutton", { name: /quantidade/i }),
      "2.5"
    );

    await user.tab();
    await user.tab();
    await user.tab();
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText("Nome deve ter pelo menos 3 caracteres")
      ).toBeTruthy();
      expect(
        screen.getByText("Telefone deve estar no formato (XX) XXXXX-XXXX")
      ).toBeTruthy();
      expect(
        screen.getByText("A quantidade deve ser um número inteiro positivo")
      ).toBeTruthy();
    });

    expect(screen.queryByText("Email deve ter um formato válido")).toBeNull();

    await user.clear(screen.getByRole("textbox", { name: /nome/i }));
    await user.type(
      screen.getByRole("textbox", { name: /nome/i }),
      "João Silva"
    );
    await user.tab();

    await waitFor(() => {
      expect(
        screen.queryByText("Nome deve ter pelo menos 3 caracteres")
      ).toBeNull();
    });

    expect(
      screen.getByText("Telefone deve estar no formato (XX) XXXXX-XXXX")
    ).toBeTruthy();
    expect(
      screen.getByText("A quantidade deve ser um número inteiro positivo")
    ).toBeTruthy();
  });
});
