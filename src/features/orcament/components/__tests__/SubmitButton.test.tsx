import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, mock } from "bun:test";

const mockUseFormStatus = mock(() => ({ pending: false }));

const MockButton = ({ children, ...props }: React.ComponentProps<"button">) => (
  <button {...props}>{children}</button>
);

const mockCn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

mock.module("react-dom", () => ({
  useFormStatus: mockUseFormStatus,
}));

mock.module("@/components/ui/button", () => ({
  Button: MockButton,
}));

mock.module("@/lib/utils", () => ({
  cn: mockCn,
}));

const { SubmitButton } = await import("../SubmitButton");

describe("SubmitButton", () => {
  beforeEach(() => {
    mockUseFormStatus.mockReturnValue({ pending: false });
  });

  afterEach(() => {
    cleanup();
  });

  it("renders with default text", () => {
    render(<SubmitButton />);
    expect(screen.getByText("Solicitar Orçamento")).toBeInTheDocument();
  });

  it("renders with custom children", () => {
    render(<SubmitButton>Custom Text</SubmitButton>);
    expect(screen.getByText("Custom Text")).toBeInTheDocument();
  });

  it("shows loading state when isLoading is true", () => {
    render(<SubmitButton isLoading={true} />);
    expect(screen.getByText("Enviando...")).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-describedby", "submit-status");
    expect(
      screen.getByText("Formulário sendo enviado, aguarde")
    ).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    render(<SubmitButton disabled={true} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("applies custom className", () => {
    render(<SubmitButton className="custom-class" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("shows loading state when form is pending", () => {
    mockUseFormStatus.mockImplementation(() => ({ pending: true }));

    render(<SubmitButton />);
    expect(screen.getByText("Enviando...")).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-describedby", "submit-status");
    expect(
      screen.getByText("Formulário sendo enviado, aguarde")
    ).toBeInTheDocument();
  });

  it("is disabled when form is pending", () => {
    mockUseFormStatus.mockImplementation(() => ({ pending: true }));

    render(<SubmitButton />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("has correct default styling classes", () => {
    render(<SubmitButton />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "bg-yellow-500",
      "hover:bg-yellow-600",
      "text-black"
    );
  });

  it("has proper accessibility attributes when not loading", () => {
    render(<SubmitButton />);
    const button = screen.getByRole("button");

    expect(button).not.toHaveAttribute("aria-describedby");

    expect(button).toHaveClass("focus:outline-none", "focus:ring-2");
  });

  it("has responsive sizing classes", () => {
    render(<SubmitButton />);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("py-3", "px-6", "sm:py-4", "sm:px-8");
    expect(button).toHaveClass("text-sm", "sm:text-base");
    expect(button).toHaveClass("min-w-[200px]");
  });
});
