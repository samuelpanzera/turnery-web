import React from "react";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, mock, afterEach } from "bun:test";
import { ContactFields } from "../ContactFields";
import { PartsQuantityField } from "../PartsQuantityField";
import { FileUploadToggle } from "../FileUploadToggle";
import { FileUpload } from "../FileUpload";
import { SubmitButton } from "../SubmitButton";

afterEach(() => {
  cleanup();
});

describe("Accessibility Tests", () => {
  describe("ContactFields", () => {
    it("should have proper labels and required indicators", () => {
      render(<ContactFields />);

      expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/telefone/i)).toBeInTheDocument();

      expect(screen.getAllByText("(obrigatório)")).toHaveLength(3);
    });

    it("should have proper autocomplete attributes", () => {
      render(<ContactFields />);

      expect(screen.getByRole("textbox", { name: /nome/i })).toHaveAttribute(
        "autoComplete",
        "name"
      );
      expect(screen.getByRole("textbox", { name: /email/i })).toHaveAttribute(
        "autoComplete",
        "email"
      );
      expect(
        screen.getByRole("textbox", { name: /telefone/i })
      ).toHaveAttribute("autoComplete", "tel");
    });

    it("should have proper ARIA attributes for validation", async () => {
      const user = userEvent.setup();
      render(<ContactFields />);

      const nameInput = screen.getByRole("textbox", { name: /nome/i });

      expect(nameInput).toHaveAttribute("aria-describedby", "nome-help");
      expect(nameInput).toHaveAttribute("aria-invalid", "false");

      await user.type(nameInput, "ab");
      await user.tab();

      await waitFor(() => {
        expect(nameInput).toHaveAttribute("aria-invalid", "true");
        expect(nameInput).toHaveAttribute("aria-describedby", "nome-error");
      });
    });

    it("should have responsive grid layout classes", () => {
      render(<ContactFields />);

      const container = screen
        .getByRole("textbox", { name: /nome/i })
        .closest(".grid");
      expect(container).toHaveClass("grid-cols-1", "lg:grid-cols-2");
    });
  });

  describe("PartsQuantityField", () => {
    it("should have proper numeric input attributes", () => {
      render(<PartsQuantityField />);

      const input = screen.getByRole("spinbutton", {
        name: /quantidade de peças/i,
      });
      expect(input).toHaveAttribute("inputMode", "numeric");
      expect(input).toHaveAttribute("pattern", "[0-9]*");
      expect(input).toHaveAttribute("min", "1");
      expect(input).toHaveAttribute("step", "1");
      expect(input).toHaveAttribute("autoComplete", "off");
    });

    it("should have proper ARIA attributes", () => {
      render(<PartsQuantityField />);

      const input = screen.getByRole("spinbutton");
      expect(input).toHaveAttribute("aria-describedby", "quantidadePecas-help");
      expect(input).toHaveAttribute("aria-invalid", "false");

      expect(screen.getByText("(obrigatório, mínimo 1)")).toHaveClass(
        "sr-only"
      );
    });

    it("should have responsive design classes", () => {
      render(<PartsQuantityField />);

      const input = screen.getByRole("spinbutton");
      const outerContainer = input.closest("div")?.parentElement;

      expect(outerContainer?.classList.contains("max-w-xs")).toBe(true);

      expect(input).toHaveClass("py-2");
    });
  });

  describe("FileUploadToggle", () => {
    it("should have proper checkbox semantics", () => {
      const mockToggle = mock(() => {});
      render(
        <FileUploadToggle isFileUploadEnabled={false} onToggle={mockToggle} />
      );

      const checkbox = screen.getByRole("checkbox", {
        name: /incluir anexos/i,
      });
      expect(checkbox).toHaveAttribute(
        "aria-describedby",
        "file-upload-toggle-description"
      );

      expect(
        screen.getByText(/marque esta opção para enviar desenhos técnicos/i)
      ).toBeInTheDocument();
    });

    it("should support keyboard navigation", async () => {
      const user = userEvent.setup();
      const mockToggle = mock(() => {});
      render(
        <FileUploadToggle isFileUploadEnabled={false} onToggle={mockToggle} />
      );

      const checkbox = screen.getByRole("checkbox");

      await user.tab();
      expect(checkbox).toHaveFocus();

      await user.keyboard(" ");
      expect(mockToggle).toHaveBeenCalledWith(true);
    });

    it("should announce state changes", () => {
      const mockToggle = mock(() => {});
      const { rerender } = render(
        <FileUploadToggle isFileUploadEnabled={false} onToggle={mockToggle} />
      );

      expect(
        screen.queryByText(/✓ upload de arquivos habilitado/i)
      ).not.toBeInTheDocument();

      rerender(
        <FileUploadToggle isFileUploadEnabled={true} onToggle={mockToggle} />
      );

      const statusMessage = screen.getByText(
        /✓ upload de arquivos habilitado/i
      );
      expect(statusMessage).toHaveAttribute("aria-live", "polite");
    });
  });

  describe("FileUpload", () => {
    const mockProps = {
      file: null,
      fileError: null,
      onFileChange: mock(() => {}),
    };

    it("should have proper button semantics for upload area", () => {
      render(<FileUpload {...mockProps} />);

      const uploadArea = screen.getByLabelText(/área de upload de arquivo/i);
      expect(uploadArea).toHaveAttribute("tabIndex", "0");
      expect(uploadArea).toHaveAttribute("aria-describedby");
    });

    it("should have proper file input attributes", () => {
      render(<FileUpload {...mockProps} />);

      const fileInput = screen.getByLabelText(
        /desenho técnico ou foto da peça/i
      );
      expect(fileInput).toHaveAttribute(
        "accept",
        ".jpg,.jpeg,.png,.pdf,.svg,.dxf,.dwg,.step,.stp"
      );
      expect(fileInput).toHaveClass("sr-only");
    });

    it("should support keyboard navigation", async () => {
      const user = userEvent.setup();
      render(<FileUpload {...mockProps} />);

      const uploadArea = screen.getByLabelText(/área de upload de arquivo/i);

      await user.tab();
      expect(uploadArea).toHaveFocus();
    });

    it("should announce file selection status", () => {
      const file = new File(["test"], "test.jpg", { type: "image/jpeg" });
      render(<FileUpload {...mockProps} file={file} />);

      expect(
        screen.getByText(/arquivo selecionado: test.jpg/i)
      ).toBeInTheDocument();
    });

    it("should announce errors properly", () => {
      render(<FileUpload {...mockProps} fileError="File too large" />);

      const errorMessage = screen.getByRole("alert");
      expect(errorMessage).toHaveAttribute("aria-live", "assertive");
      expect(screen.getByText("File too large")).toBeInTheDocument();
    });
  });

  describe("SubmitButton", () => {
    it("should have proper loading state announcements", () => {
      render(<SubmitButton isLoading={true} />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-describedby", "submit-status");

      const statusMessage = screen.getByText(
        /formulário sendo enviado, aguarde/i
      );
      expect(statusMessage).toHaveClass("sr-only");
    });

    it("should have proper focus styles", () => {
      render(<SubmitButton />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("focus:outline-none", "focus:ring-2");
    });

    it("should be properly disabled during loading", () => {
      render(<SubmitButton isLoading={true} />);

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute("aria-describedby", "submit-status");
    });

    it("should have responsive design classes", () => {
      render(<SubmitButton />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("py-3", "px-6", "sm:py-4", "sm:px-8");
      expect(button).toHaveClass("text-sm", "sm:text-base");
      expect(button).toHaveClass("min-w-[200px]");
    });
  });
});

describe("Responsive Design Tests", () => {
  it("should have responsive grid layouts in ContactFields", () => {
    render(<ContactFields />);

    const container = screen
      .getByRole("textbox", { name: /nome/i })
      .closest(".grid");
    expect(container).toHaveClass("grid-cols-1", "lg:grid-cols-2");
  });

  it("should have responsive spacing and sizing classes", () => {
    render(<PartsQuantityField />);

    const input = screen.getByRole("spinbutton");
    expect(input).toHaveClass("py-2");
  });

  it("should have responsive padding in FileUpload", () => {
    const mockProps = {
      file: null,
      fileError: null,
      onFileChange: mock(() => {}),
    };

    render(<FileUpload {...mockProps} />);

    const uploadArea = screen.getByLabelText(/área de upload de arquivo/i);
    expect(uploadArea).toHaveClass("px-3", "sm:px-6");
  });

  it("should have responsive button sizing", () => {
    render(<SubmitButton />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("py-3", "px-6", "sm:py-4", "sm:px-8");
  });
});
