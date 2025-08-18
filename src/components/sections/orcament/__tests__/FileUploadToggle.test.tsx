import React from "react";
import { describe, it, expect, afterEach, mock } from "bun:test";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FileUploadToggle } from "../FileUploadToggle";

describe("FileUploadToggle", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders with correct initial state when disabled", () => {
    const mockToggle = mock(() => {});
    render(
      <FileUploadToggle isFileUploadEnabled={false} onToggle={mockToggle} />
    );

    const checkbox = screen.getByRole("checkbox", {
      name: /incluir anexos/i,
    });
    expect((checkbox as HTMLInputElement).checked).toBe(false);
    expect(checkbox.getAttribute("id")).toBe("file-upload-toggle");
    expect(checkbox.getAttribute("aria-describedby")).toBe(
      "file-upload-toggle-description"
    );

    expect(screen.getByText("Incluir anexos")).toBeTruthy();
    expect(
      screen.getByText(/marque esta opção para enviar desenhos técnicos/i)
    ).toBeTruthy();

    expect(screen.queryByText(/✓ upload de arquivos habilitado/i)).toBeNull();
  });

  it("renders with correct initial state when enabled", () => {
    const mockToggle = mock(() => {});
    render(
      <FileUploadToggle isFileUploadEnabled={true} onToggle={mockToggle} />
    );

    const checkbox = screen.getByRole("checkbox", {
      name: /incluir anexos/i,
    });
    expect((checkbox as HTMLInputElement).checked).toBe(true);

    const statusMessage = screen.getByText(/✓ upload de arquivos habilitado/i);
    expect(statusMessage).toBeTruthy();
    expect(statusMessage.getAttribute("aria-live")).toBe("polite");
  });

  it("calls onToggle when checkbox is clicked", () => {
    const mockToggle = mock(() => {});
    render(
      <FileUploadToggle isFileUploadEnabled={false} onToggle={mockToggle} />
    );

    const checkbox = screen.getByRole("checkbox", {
      name: /incluir anexos/i,
    });

    fireEvent.click(checkbox);
    expect(mockToggle).toHaveBeenCalledWith(true);
  });

  it("calls onToggle when label is clicked", () => {
    const mockToggle = mock(() => {});
    render(
      <FileUploadToggle isFileUploadEnabled={false} onToggle={mockToggle} />
    );

    const label = screen.getByText("Incluir anexos");
    fireEvent.click(label);
    expect(mockToggle).toHaveBeenCalledWith(true);
  });

  it("handles keyboard navigation with space key", () => {
    const mockToggle = mock(() => {});
    render(
      <FileUploadToggle isFileUploadEnabled={false} onToggle={mockToggle} />
    );

    const checkbox = screen.getByRole("checkbox", {
      name: /incluir anexos/i,
    });

    fireEvent.keyDown(checkbox, { key: " " });
    expect(mockToggle).toHaveBeenCalledWith(true);
  });

  it("handles keyboard navigation with space key when enabled", () => {
    const mockToggle = mock(() => {});
    render(
      <FileUploadToggle isFileUploadEnabled={true} onToggle={mockToggle} />
    );

    const checkbox = screen.getByRole("checkbox", {
      name: /incluir anexos/i,
    });

    fireEvent.keyDown(checkbox, { key: " " });
    expect(mockToggle).toHaveBeenCalledWith(false);
  });

  it("ignores other keyboard keys", () => {
    const mockToggle = mock(() => {});
    render(
      <FileUploadToggle isFileUploadEnabled={false} onToggle={mockToggle} />
    );

    const checkbox = screen.getByRole("checkbox", {
      name: /incluir anexos/i,
    });

    fireEvent.keyDown(checkbox, { key: "Enter" });
    fireEvent.keyDown(checkbox, { key: "Tab" });
    fireEvent.keyDown(checkbox, { key: "Escape" });

    expect(mockToggle).not.toHaveBeenCalled();
  });

  it("applies custom className", () => {
    const mockToggle = mock(() => {});
    render(
      <FileUploadToggle
        isFileUploadEnabled={false}
        onToggle={mockToggle}
        className="custom-class"
      />
    );

    const container = screen
      .getByRole("checkbox")
      .closest("div") as HTMLElement;
    expect(container.className).toContain("custom-class");
  });

  it("has proper styling classes", () => {
    const mockToggle = mock(() => {});
    render(
      <FileUploadToggle isFileUploadEnabled={false} onToggle={mockToggle} />
    );

    const container = screen
      .getByRole("checkbox")
      .closest("div") as HTMLElement;
    expect(container.className).toContain("flex");
    expect(container.className).toContain("items-start");
    expect(container.className).toContain("space-x-3");
    expect(container.className).toContain("p-3");
    expect(container.className).toContain("rounded-md");
    expect(container.className).toContain("border");

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.className).toContain("h-4");
    expect(checkbox.className).toContain("w-4");
    expect(checkbox.className).toContain("focus:ring-2");
  });

  it("has proper accessibility attributes", () => {
    const mockToggle = mock(() => {});
    render(
      <FileUploadToggle isFileUploadEnabled={false} onToggle={mockToggle} />
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.getAttribute("aria-describedby")).toBe(
      "file-upload-toggle-description"
    );

    const description = screen.getByText(
      /marque esta opção para enviar desenhos técnicos/i
    );
    expect(description.getAttribute("id")).toBe(
      "file-upload-toggle-description"
    );

    const label = screen.getByText("Incluir anexos");
    expect(label.getAttribute("for")).toBe("file-upload-toggle");
    expect(label.className).toContain("cursor-pointer");
    expect(label.className).toContain("select-none");
  });

  it("supports user event interactions", async () => {
    const user = userEvent.setup();
    const mockToggle = mock(() => {});
    render(
      <FileUploadToggle isFileUploadEnabled={false} onToggle={mockToggle} />
    );

    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);
    expect(mockToggle).toHaveBeenCalledWith(true);
  });

  it("supports keyboard interaction with user event", async () => {
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
});
