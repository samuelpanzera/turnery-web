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
import { FileUploadToggle } from "../FileUploadToggle";
import { FileUpload } from "../FileUpload";
import { useFileUploadToggle } from "../hooks/useFileUploadToggle";

const mockUseFileUpload = mock(() => ({
  file: null as File | null,
  fileError: null as string | null,
  handleFileChange: mock(() => {}),
}));

mock.module("../hooks/useFileUpload", () => ({
  useFileUpload: mockUseFileUpload,
}));

function FileUploadIntegrationTest() {
  const { isFileUploadEnabled, toggleFileUpload } = useFileUploadToggle();
  const { file, fileError, handleFileChange } = mockUseFileUpload();

  return (
    <div>
      <FileUploadToggle
        isFileUploadEnabled={isFileUploadEnabled}
        onToggle={toggleFileUpload}
      />
      {isFileUploadEnabled && (
        <FileUpload
          file={file}
          fileError={fileError}
          onFileChange={handleFileChange}
        />
      )}
    </div>
  );
}

describe("FileUpload Integration Tests", () => {
  afterEach(() => {
    cleanup();
    mockUseFileUpload.mockClear();
  });

  it("initially hides FileUpload component when toggle is disabled", () => {
    render(<FileUploadIntegrationTest />);

    const toggle = screen.getByRole("checkbox", { name: /incluir anexos/i });
    expect((toggle as HTMLInputElement).checked).toBe(false);

    expect(screen.queryByText("Desenho Técnico ou Foto da Peça")).toBeNull();
    expect(screen.queryByLabelText(/área de upload de arquivo/i)).toBeNull();
  });

  it("shows FileUpload component when toggle is enabled", async () => {
    render(<FileUploadIntegrationTest />);

    const toggle = screen.getByRole("checkbox", { name: /incluir anexos/i });

    fireEvent.click(toggle);

    await waitFor(() => {
      expect(screen.getByText("Desenho Técnico ou Foto da Peça")).toBeTruthy();
      expect(screen.getByLabelText(/área de upload de arquivo/i)).toBeTruthy();
    });

    expect((toggle as HTMLInputElement).checked).toBe(true);

    expect(screen.getByText(/✓ upload de arquivos habilitado/i)).toBeTruthy();
  });

  it("hides FileUpload component when toggle is disabled after being enabled", async () => {
    render(<FileUploadIntegrationTest />);

    const toggle = screen.getByRole("checkbox", { name: /incluir anexos/i });

    fireEvent.click(toggle);

    await waitFor(() => {
      expect(screen.getByText("Desenho Técnico ou Foto da Peça")).toBeTruthy();
    });

    fireEvent.click(toggle);

    await waitFor(() => {
      expect(screen.queryByText("Desenho Técnico ou Foto da Peça")).toBeNull();
    });

    expect((toggle as HTMLInputElement).checked).toBe(false);

    expect(screen.queryByText(/✓ upload de arquivos habilitado/i)).toBeNull();
  });

  it("maintains FileUpload state when toggling multiple times", async () => {
    const mockFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
    mockUseFileUpload.mockReturnValue({
      file: mockFile,
      fileError: null,
      handleFileChange: mock(() => {}),
    });

    render(<FileUploadIntegrationTest />);

    const toggle = screen.getByRole("checkbox", { name: /incluir anexos/i });

    fireEvent.click(toggle);

    await waitFor(() => {
      expect(screen.getByText("Desenho Técnico ou Foto da Peça")).toBeTruthy();
      expect(screen.getByText(/arquivo selecionado: test.jpg/i)).toBeTruthy();
    });

    fireEvent.click(toggle);

    await waitFor(() => {
      expect(screen.queryByText("Desenho Técnico ou Foto da Peça")).toBeNull();
    });

    fireEvent.click(toggle);

    await waitFor(() => {
      expect(screen.getByText("Desenho Técnico ou Foto da Peça")).toBeTruthy();

      expect(screen.getByText(/arquivo selecionado: test.jpg/i)).toBeTruthy();
    });
  });

  it("shows FileUpload errors when toggle is enabled", async () => {
    mockUseFileUpload.mockReturnValue({
      file: null,
      fileError: "Arquivo deve ter no máximo 10MB",
      handleFileChange: mock(() => {}),
    });

    render(<FileUploadIntegrationTest />);

    const toggle = screen.getByRole("checkbox", { name: /incluir anexos/i });

    fireEvent.click(toggle);

    await waitFor(() => {
      expect(screen.getByText("Desenho Técnico ou Foto da Peça")).toBeTruthy();
      expect(screen.getByText("Arquivo deve ter no máximo 10MB")).toBeTruthy();
    });

    const errorElement = screen.getByRole("alert");
    expect(errorElement).toBeTruthy();
  });

  it("supports keyboard navigation between toggle and file upload", async () => {
    const user = userEvent.setup();
    render(<FileUploadIntegrationTest />);

    await user.tab();
    const toggle = screen.getByRole("checkbox", { name: /incluir anexos/i });
    expect(toggle).toHaveFocus();

    await user.keyboard(" ");

    await waitFor(() => {
      expect(screen.getByText("Desenho Técnico ou Foto da Peça")).toBeTruthy();
    });

    await user.tab();
    const uploadArea = screen.getByLabelText(/área de upload de arquivo/i);
    expect(uploadArea).toHaveFocus();
  });

  it("handles file selection when toggle is enabled", async () => {
    const mockHandleFileChange = mock(() => {});
    mockUseFileUpload.mockReturnValue({
      file: null,
      fileError: null,
      handleFileChange: mockHandleFileChange,
    });

    render(<FileUploadIntegrationTest />);

    const toggle = screen.getByRole("checkbox", { name: /incluir anexos/i });

    fireEvent.click(toggle);

    await waitFor(() => {
      expect(screen.getByText("Desenho Técnico ou Foto da Peça")).toBeTruthy();
    });

    const fileInput = screen.getByLabelText(
      /desenho técnico ou foto da peça/i
    ) as HTMLInputElement;

    const testFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
    fireEvent.change(fileInput, { target: { files: [testFile] } });

    expect(mockHandleFileChange).toHaveBeenCalled();
  });

  it("maintains accessibility when components are shown/hidden", async () => {
    render(<FileUploadIntegrationTest />);

    const toggle = screen.getByRole("checkbox", { name: /incluir anexos/i });

    expect(toggle.getAttribute("aria-describedby")).toBe(
      "file-upload-toggle-description"
    );

    fireEvent.click(toggle);

    await waitFor(() => {
      const uploadArea = screen.getByLabelText(/área de upload de arquivo/i);
      expect(uploadArea.getAttribute("tabIndex")).toBe("0");
      expect(uploadArea.getAttribute("aria-describedby")).toBeTruthy();
    });

    fireEvent.click(toggle);

    await waitFor(() => {
      expect(screen.queryByLabelText(/área de upload de arquivo/i)).toBeNull();
    });

    expect(toggle.getAttribute("aria-describedby")).toBe(
      "file-upload-toggle-description"
    );
  });

  it("handles rapid toggle changes gracefully", async () => {
    render(<FileUploadIntegrationTest />);

    const toggle = screen.getByRole("checkbox", { name: /incluir anexos/i });

    fireEvent.click(toggle);
    fireEvent.click(toggle);
    fireEvent.click(toggle);
    fireEvent.click(toggle);

    expect((toggle as HTMLInputElement).checked).toBe(false);

    expect(screen.queryByText("Desenho Técnico ou Foto da Peça")).toBeNull();
  });
});
