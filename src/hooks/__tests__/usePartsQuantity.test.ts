import { describe, it, expect } from "bun:test";
import { renderHook, act } from "@testing-library/react";
import { usePartsQuantity } from "@/features/orcament/hooks/usePartsQuantity";

describe("usePartsQuantity", () => {
  it("initializes with default value of 1", () => {
    const { result } = renderHook(() => usePartsQuantity());

    expect(result.current.quantity).toBe(1);
    expect(result.current.error).toBeNull();
  });

  it("initializes with custom default value", () => {
    const { result } = renderHook(() => usePartsQuantity(5));

    expect(result.current.quantity).toBe(5);
    expect(result.current.error).toBeNull();
  });

  it("handles valid positive integer input", () => {
    const { result } = renderHook(() => usePartsQuantity());

    act(() => {
      result.current.handleQuantityChange("10");
    });

    expect(result.current.quantity).toBe(10);
    expect(result.current.error).toBeNull();
  });

  it("resets to default value when input is empty", () => {
    const { result } = renderHook(() => usePartsQuantity(3));

    act(() => {
      result.current.handleQuantityChange("10");
    });
    expect(result.current.quantity).toBe(10);

    act(() => {
      result.current.handleQuantityChange("");
    });
    expect(result.current.quantity).toBe(3);
    expect(result.current.error).toBeNull();
  });

  it("resets to default value when input is zero", () => {
    const { result } = renderHook(() => usePartsQuantity(2));

    act(() => {
      result.current.handleQuantityChange("0");
    });

    expect(result.current.quantity).toBe(2);
    expect(result.current.error).toBeNull();
  });

  it("shows error for decimal input", () => {
    const { result } = renderHook(() => usePartsQuantity());

    act(() => {
      result.current.handleQuantityChange("2.5");
    });

    expect(result.current.quantity).toBe(1); // Should remain unchanged
    expect(result.current.error).toBe(
      "A quantidade deve ser um número inteiro positivo"
    );
  });

  it("shows error for negative numbers", () => {
    const { result } = renderHook(() => usePartsQuantity());

    act(() => {
      result.current.handleQuantityChange("-5");
    });

    expect(result.current.quantity).toBe(1); // Should remain unchanged
    expect(result.current.error).toBe(
      "A quantidade deve ser um número inteiro positivo"
    );
  });

  it("shows error for non-numeric input", () => {
    const { result } = renderHook(() => usePartsQuantity());

    act(() => {
      result.current.handleQuantityChange("abc");
    });

    expect(result.current.quantity).toBe(1); // Should remain unchanged
    expect(result.current.error).toBe(
      "A quantidade deve ser um número inteiro positivo"
    );
  });

  it("clears error when valid input is provided after error", () => {
    const { result } = renderHook(() => usePartsQuantity());

    // First, create an error
    act(() => {
      result.current.handleQuantityChange("2.5");
    });
    expect(result.current.error).toBe(
      "A quantidade deve ser um número inteiro positivo"
    );

    // Then provide valid input
    act(() => {
      result.current.handleQuantityChange("5");
    });
    expect(result.current.quantity).toBe(5);
    expect(result.current.error).toBeNull();
  });

  it("resets quantity and error with resetQuantity", () => {
    const { result } = renderHook(() => usePartsQuantity(7));

    // Change quantity and create error
    act(() => {
      result.current.handleQuantityChange("15");
    });
    expect(result.current.quantity).toBe(15);

    act(() => {
      result.current.handleQuantityChange("2.5");
    });
    expect(result.current.error).toBe(
      "A quantidade deve ser um número inteiro positivo"
    );

    // Reset
    act(() => {
      result.current.resetQuantity();
    });
    expect(result.current.quantity).toBe(7);
    expect(result.current.error).toBeNull();
  });

  it("handles multiple consecutive invalid inputs", () => {
    const { result } = renderHook(() => usePartsQuantity());

    act(() => {
      result.current.handleQuantityChange("2.5");
    });
    expect(result.current.error).toBe(
      "A quantidade deve ser um número inteiro positivo"
    );

    act(() => {
      result.current.handleQuantityChange("-3");
    });
    expect(result.current.error).toBe(
      "A quantidade deve ser um número inteiro positivo"
    );

    act(() => {
      result.current.handleQuantityChange("abc");
    });
    expect(result.current.error).toBe(
      "A quantidade deve ser um número inteiro positivo"
    );

    // Quantity should remain at default throughout
    expect(result.current.quantity).toBe(1);
  });

  it("handles edge case with very large numbers", () => {
    const { result } = renderHook(() => usePartsQuantity());

    act(() => {
      result.current.handleQuantityChange("999999");
    });

    expect(result.current.quantity).toBe(999999);
    expect(result.current.error).toBeNull();
  });

  it("maintains state consistency across multiple operations", () => {
    const { result } = renderHook(() => usePartsQuantity(3));

    // Valid input
    act(() => {
      result.current.handleQuantityChange("10");
    });
    expect(result.current.quantity).toBe(10);
    expect(result.current.error).toBeNull();

    // Invalid input
    act(() => {
      result.current.handleQuantityChange("2.5");
    });
    expect(result.current.quantity).toBe(10); // Should remain unchanged
    expect(result.current.error).toBe(
      "A quantidade deve ser um número inteiro positivo"
    );

    // Another valid input
    act(() => {
      result.current.handleQuantityChange("7");
    });
    expect(result.current.quantity).toBe(7);
    expect(result.current.error).toBeNull();

    // Reset
    act(() => {
      result.current.resetQuantity();
    });
    expect(result.current.quantity).toBe(3);
    expect(result.current.error).toBeNull();
  });
});
