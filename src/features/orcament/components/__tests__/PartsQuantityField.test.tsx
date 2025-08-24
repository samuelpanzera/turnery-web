import React from "react";
import { describe, it, expect, afterEach } from "bun:test";
import {
  render,
  screen,
  waitFor,
  cleanup,
  fireEvent,
} from "@testing-library/react";

import { PartsQuantityField } from "../PartsQuantityField";

describe("PartsQuantityField", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders with default props and proper attributes", () => {
    render(<PartsQuantityField />);

    const field = screen.getByRole("spinbutton", {
      name: /quantidade de peças/i,
    });
    expect(field).toBeTruthy();
    expect(field.getAttribute("type")).toBe("number");
    expect(field.getAttribute("name")).toBe("quantidadePecas");
    expect(field.getAttribute("id")).toBe("quantidadePecas");
    expect(field.getAttribute("min")).toBe("1");
    expect(field.getAttribute("step")).toBe("1");
    expect(field.getAttribute("inputMode")).toBe("numeric");
    expect(field.getAttribute("pattern")).toBe("[0-9]*");
    expect(field.getAttribute("autoComplete")).toBe("off");
    expect(field.hasAttribute("required")).toBe(true);
    expect((field as HTMLInputElement).value).toBe("1");

    expect(field.getAttribute("aria-describedby")).toBe("quantidadePecas-help");
    expect(field.getAttribute("aria-invalid")).toBe("false");

    expect(screen.getByText("Quantidade mínima: 1 peça")).toBeTruthy();

    expect(screen.getByText("(obrigatório, mínimo 1)")).toBeTruthy();

    expect(screen.getByText("peças")).toBeTruthy();
  });

  it("renders with custom props", () => {
    render(
      <PartsQuantityField defaultValue={10} name="customName" id="customId" />
    );

    const field = screen.getByRole("spinbutton", {
      name: /quantidade de peças/i,
    });
    expect(field.getAttribute("name")).toBe("customName");
    expect(field.getAttribute("id")).toBe("customId");
    expect((field as HTMLInputElement).value).toBe("10");
  });

  it("validates decimal input and shows error", async () => {
    render(<PartsQuantityField />);

    const field = screen.getByRole("spinbutton", {
      name: /quantidade de peças/i,
    });

    fireEvent.change(field, { target: { value: "2.5" } });

    await waitFor(() => {
      expect(
        screen.getByText("A quantidade deve ser um número inteiro positivo")
      ).toBeTruthy();
      expect(screen.queryByText("Quantidade mínima: 1 peça")).toBeNull();
    });
  });

  it("resets to default value when input is empty", async () => {
    render(<PartsQuantityField defaultValue={3} />);

    const field = screen.getByRole("spinbutton", {
      name: /quantidade de peças/i,
    });
    expect((field as HTMLInputElement).value).toBe("3");

    fireEvent.change(field, { target: { value: "" } });

    await waitFor(() => {
      expect((field as HTMLInputElement).value).toBe("3");
    });
  });

  it("applies proper CSS classes for validation states", async () => {
    render(<PartsQuantityField />);

    const field = screen.getByRole("spinbutton", {
      name: /quantidade de peças/i,
    });

    expect(field.className).toContain("border-gray-600");

    fireEvent.change(field, { target: { value: "2.5" } });

    await waitFor(() => {
      expect(field.className).toContain("border-red-500");
    });
  });

  it("sets proper ARIA attributes for validation states", async () => {
    render(<PartsQuantityField />);

    const field = screen.getByRole("spinbutton", {
      name: /quantidade de peças/i,
    });

    expect(field.getAttribute("aria-invalid")).toBe("false");
    expect(field.getAttribute("aria-describedby")).toBe("quantidadePecas-help");

    fireEvent.change(field, { target: { value: "2.5" } });

    await waitFor(() => {
      expect(field.getAttribute("aria-invalid")).toBe("true");
      expect(field.getAttribute("aria-describedby")).toBe(
        "quantidadePecas-error"
      );
    });
  });
});
