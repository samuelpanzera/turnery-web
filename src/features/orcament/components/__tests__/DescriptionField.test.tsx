import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, describe, afterEach } from "bun:test";
import { DescriptionField } from "../DescriptionField";

describe("DescriptionField", () => {
  afterEach(() => {
    cleanup();
  });

  test("renders with default props", () => {
    render(<DescriptionField />);

    const textarea = screen.getByLabelText(/Infomações adicionais/i);
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute("name", "descricaoPeca");
    expect(textarea).toHaveAttribute("id", "descricaoPeca");
    expect(textarea).toBeRequired();
  });

  test("renders with custom props", () => {
    render(
      <DescriptionField
        name="customName"
        id="customId"
        required={false}
        placeholder="Custom placeholder"
        rows={5}
      />
    );

    const textarea = screen.getByLabelText(/Infomações adicionais/i);
    expect(textarea).toHaveAttribute("name", "customName");
    expect(textarea).toHaveAttribute("id", "customId");
    expect(textarea).not.toBeRequired();
    expect(textarea).toHaveAttribute("placeholder", "Custom placeholder");
    expect(textarea).toHaveAttribute("rows", "5");
  });

  test("shows validation error for empty required field", async () => {
    const user = userEvent.setup();
    render(<DescriptionField />);

    const textarea = screen.getByLabelText(/Infomações adicionais/i);

    await user.click(textarea);
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText(/Infomações adicionais é obrigatória/i)
      ).toBeInTheDocument();
    });
  });

  test("shows validation error for text too short", async () => {
    const user = userEvent.setup();
    render(<DescriptionField />);

    const textarea = screen.getByLabelText(/Infomações adicionais/i);

    await user.type(textarea, "short");
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText(/descrição deve ter pelo menos 10 caracteres/i)
      ).toBeInTheDocument();
    });
  });

  test("does not show error for valid input", async () => {
    const user = userEvent.setup();
    render(<DescriptionField />);

    const textarea = screen.getByLabelText(/Infomações adicionais/i);

    await user.type(
      textarea,
      "Esta é uma descrição válida com mais de 10 caracteres"
    );
    await user.tab();

    await waitFor(() => {
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  test("shows help text when no error", () => {
    render(<DescriptionField />);

    expect(screen.getByText(/mínimo de 10 caracteres/i)).toBeInTheDocument();
  });

  test("shows optional help text when not required", () => {
    render(<DescriptionField required={false} />);

    expect(screen.getByText(/opcional/i)).toBeInTheDocument();
  });

  test("has proper accessibility attributes", () => {
    render(<DescriptionField />);

    const textarea = screen.getByLabelText(/Infomações adicionais/i);
    const label = screen.getByText(/Infomações adicionais/i);

    expect(textarea).toHaveAttribute("aria-describedby");
    expect(textarea).toHaveAttribute("aria-invalid", "false");
    expect(label).toHaveAttribute("for", "descricaoPeca");
  });

  test("updates accessibility attributes when error occurs", async () => {
    const user = userEvent.setup();
    render(<DescriptionField />);

    const textarea = screen.getByLabelText(/Infomações adicionais/i);

    await user.click(textarea);
    await user.tab();

    await waitFor(() => {
      expect(textarea).toHaveAttribute("aria-invalid", "true");
      expect(textarea).toHaveAttribute(
        "aria-describedby",
        "descricaoPeca-error"
      );
    });
  });

  test("clears error when valid input is entered", async () => {
    const user = userEvent.setup();
    render(<DescriptionField />);

    const textarea = screen.getByLabelText(/Infomações adicionais/i);

    await user.type(textarea, "short");
    await user.tab();

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    await user.clear(textarea);
    await user.type(
      textarea,
      "Esta é uma descrição válida e longa o suficiente"
    );

    await waitFor(() => {
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });
});
