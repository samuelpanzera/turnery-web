import React from "react";
import { describe, it, expect, afterEach } from "bun:test";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";

import { ContactFields } from "../ContactFields";

describe("ContactFields", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders contact fields with all required attributes, styling, and accessibility features", () => {
    const { container } = render(<ContactFields />);

    const nomeField = screen.getByRole("textbox", { name: /nome/i });
    const emailField = screen.getByRole("textbox", { name: /email/i });
    const telefoneField = screen.getByRole("textbox", { name: /telefone/i });

    expect(nomeField).toBeTruthy();
    expect(emailField).toBeTruthy();
    expect(telefoneField).toBeTruthy();

    expect(nomeField.hasAttribute("required")).toBe(true);
    expect(emailField.hasAttribute("required")).toBe(true);
    expect(telefoneField.hasAttribute("required")).toBe(true);

    expect(nomeField.getAttribute("type")).toBe("text");
    expect(nomeField.getAttribute("minLength")).toBe("3");
    expect(nomeField.getAttribute("name")).toBe("nome");
    expect(nomeField.getAttribute("id")).toBe("nome");

    expect(emailField.getAttribute("type")).toBe("email");
    expect(emailField.getAttribute("name")).toBe("email");
    expect(emailField.getAttribute("id")).toBe("email");

    expect(telefoneField.getAttribute("type")).toBe("tel");
    expect(telefoneField.getAttribute("name")).toBe("telefone");
    expect(telefoneField.getAttribute("placeholder")).toBe("(11) 99999-9999");
    expect(telefoneField.getAttribute("maxLength")).toBe("15");
    expect(telefoneField.getAttribute("id")).toBe("telefone");

    expect(nomeField.className).toContain("w-full");
    expect(nomeField.className).toContain("border-gray-600");
    expect(emailField.className).toContain("w-full");
    expect(emailField.className).toContain("border-gray-600");
    expect(telefoneField.className).toContain("w-full");
    expect(telefoneField.className).toContain("border-gray-600");

    const gridContainer = container.querySelector(
      ".grid.grid-cols-1.lg\\:grid-cols-2"
    );
    expect(gridContainer).toBeTruthy();

    const nomeContainer = container.querySelector(".lg\\:col-span-2");
    expect(nomeContainer).toBeTruthy();

    expect(nomeField.getAttribute("aria-describedby")).toBe("nome-help");
    expect(nomeField.getAttribute("aria-invalid")).toBe("false");
    expect(nomeField.getAttribute("autoComplete")).toBe("name");

    expect(emailField.getAttribute("aria-describedby")).toBe("email-help");
    expect(emailField.getAttribute("aria-invalid")).toBe("false");
    expect(emailField.getAttribute("autoComplete")).toBe("email");

    expect(telefoneField.getAttribute("aria-describedby")).toBe(
      "telefone-help"
    );
    expect(telefoneField.getAttribute("aria-invalid")).toBe("false");
    expect(telefoneField.getAttribute("autoComplete")).toBe("tel");

    expect(screen.getAllByText("(obrigatório)")).toHaveLength(3);

    expect(screen.getByText("Mínimo de 3 caracteres")).toBeTruthy();
    expect(screen.getByText("Formato: exemplo@dominio.com")).toBeTruthy();
    expect(screen.getByText("Formato: (XX) XXXXX-XXXX")).toBeTruthy();
  });

  it("validates nome field with real-time feedback", async () => {
    render(<ContactFields />);

    const nomeField = screen.getByRole("textbox", { name: /nome/i });

    fireEvent.focus(nomeField);
    fireEvent.blur(nomeField);

    await waitFor(() => {
      expect(screen.getByText("Nome é obrigatório")).toBeTruthy();
    });

    fireEvent.change(nomeField, { target: { value: "Jo" } });
    fireEvent.blur(nomeField);

    await waitFor(() => {
      expect(
        screen.getByText("Nome deve ter pelo menos 3 caracteres")
      ).toBeTruthy();
    });

    fireEvent.change(nomeField, { target: { value: "João Silva" } });
    fireEvent.blur(nomeField);

    await waitFor(() => {
      expect(screen.queryByText("Nome é obrigatório")).toBeNull();
      expect(
        screen.queryByText("Nome deve ter pelo menos 3 caracteres")
      ).toBeNull();
    });
  });

  it("validates email field with real-time feedback", async () => {
    render(<ContactFields />);

    const emailField = screen.getByRole("textbox", { name: /email/i });

    fireEvent.focus(emailField);
    fireEvent.blur(emailField);

    await waitFor(() => {
      expect(screen.getByText("Email é obrigatório")).toBeTruthy();
    });

    fireEvent.change(emailField, { target: { value: "invalid-email" } });
    fireEvent.blur(emailField);

    await waitFor(() => {
      expect(screen.getByText("Email deve ter um formato válido")).toBeTruthy();
    });

    fireEvent.change(emailField, { target: { value: "joao@example.com" } });
    fireEvent.blur(emailField);

    await waitFor(() => {
      expect(screen.queryByText("Email é obrigatório")).toBeNull();
      expect(screen.queryByText("Email deve ter um formato válido")).toBeNull();
    });
  });

  it("validates telefone field with real-time feedback and formatting", async () => {
    render(<ContactFields />);

    const telefoneField = screen.getByRole("textbox", { name: /telefone/i });

    fireEvent.focus(telefoneField);
    fireEvent.blur(telefoneField);

    await waitFor(() => {
      expect(screen.getByText("Telefone é obrigatório")).toBeTruthy();
    });

    fireEvent.change(telefoneField, { target: { value: "123456789" } });
    fireEvent.blur(telefoneField);

    await waitFor(() => {
      expect(
        screen.getByText("Telefone deve estar no formato (XX) XXXXX-XXXX")
      ).toBeTruthy();
    });

    fireEvent.change(telefoneField, { target: { value: "11999999999" } });

    expect((telefoneField as HTMLInputElement).value).toBe("(11) 99999-9999");

    fireEvent.blur(telefoneField);

    await waitFor(() => {
      expect(screen.queryByText("Telefone é obrigatório")).toBeNull();
      expect(
        screen.queryByText("Telefone deve estar no formato (XX) XXXXX-XXXX")
      ).toBeNull();
    });
  });

  it("applies proper CSS classes for validation states", async () => {
    render(<ContactFields />);

    const nomeField = screen.getByRole("textbox", { name: /nome/i });

    expect(nomeField.className).toContain("border-gray-600");

    fireEvent.focus(nomeField);
    fireEvent.blur(nomeField);

    await waitFor(() => {
      expect(nomeField.className).toContain("border-red-500");
    });

    fireEvent.change(nomeField, { target: { value: "João Silva" } });
    fireEvent.blur(nomeField);

    await waitFor(() => {
      expect(nomeField.className).toContain("border-gray-600");
    });
  });

  it("sets proper ARIA attributes for validation states", async () => {
    render(<ContactFields />);

    const nomeField = screen.getByRole("textbox", { name: /nome/i });

    expect(nomeField.getAttribute("aria-invalid")).toBe("false");

    fireEvent.focus(nomeField);
    fireEvent.blur(nomeField);

    await waitFor(() => {
      expect(nomeField.getAttribute("aria-invalid")).toBe("true");
      expect(nomeField.getAttribute("aria-describedby")).toBe("nome-error");
    });

    fireEvent.change(nomeField, { target: { value: "João Silva" } });
    fireEvent.blur(nomeField);

    await waitFor(() => {
      expect(nomeField.getAttribute("aria-invalid")).toBe("false");
      expect(nomeField.getAttribute("aria-describedby")).toBe("nome-help");
    });
  });
});
