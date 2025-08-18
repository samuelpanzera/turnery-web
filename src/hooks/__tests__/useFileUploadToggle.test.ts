import { describe, it, expect } from "bun:test";
import { renderHook, act } from "@testing-library/react";
import { useFileUploadToggle } from "../useFileUploadToggle";

describe("useFileUploadToggle", () => {
  it("initializes with default value of false", () => {
    const { result } = renderHook(() => useFileUploadToggle());

    expect(result.current.isFileUploadEnabled).toBe(false);
  });

  it("initializes with provided initial value", () => {
    const { result } = renderHook(() => useFileUploadToggle(true));

    expect(result.current.isFileUploadEnabled).toBe(true);
  });

  it("toggles file upload state to true", () => {
    const { result } = renderHook(() => useFileUploadToggle(false));

    act(() => {
      result.current.toggleFileUpload(true);
    });

    expect(result.current.isFileUploadEnabled).toBe(true);
  });

  it("toggles file upload state to false", () => {
    const { result } = renderHook(() => useFileUploadToggle(true));

    act(() => {
      result.current.toggleFileUpload(false);
    });

    expect(result.current.isFileUploadEnabled).toBe(false);
  });

  it("can toggle multiple times", () => {
    const { result } = renderHook(() => useFileUploadToggle(false));

    act(() => {
      result.current.toggleFileUpload(true);
    });
    expect(result.current.isFileUploadEnabled).toBe(true);

    act(() => {
      result.current.toggleFileUpload(false);
    });
    expect(result.current.isFileUploadEnabled).toBe(false);

    act(() => {
      result.current.toggleFileUpload(true);
    });
    expect(result.current.isFileUploadEnabled).toBe(true);
  });

  it("maintains state consistency", () => {
    const { result } = renderHook(() => useFileUploadToggle());

    // Initial state
    expect(result.current.isFileUploadEnabled).toBe(false);

    // Enable
    act(() => {
      result.current.toggleFileUpload(true);
    });
    expect(result.current.isFileUploadEnabled).toBe(true);

    // Setting to same value should maintain state
    act(() => {
      result.current.toggleFileUpload(true);
    });
    expect(result.current.isFileUploadEnabled).toBe(true);
  });
});
