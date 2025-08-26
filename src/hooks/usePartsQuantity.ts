import { useState, useCallback } from "react";

export interface UsePartsQuantityReturn {
  quantity: number;
  error: string | null;
  handleQuantityChange: (value: string) => void;
  resetQuantity: () => void;
}

export function usePartsQuantity(
  defaultValue: number = 1
): UsePartsQuantityReturn {
  const [quantity, setQuantity] = useState<number>(defaultValue);
  const [error, setError] = useState<string | null>(null);

  const handleQuantityChange = useCallback(
    (value: string) => {
      setError(null);

      if (value === "" || value === "0") {
        setQuantity(defaultValue);
        return;
      }

      if (value.includes(".")) {
        setError("A quantidade deve ser um número inteiro positivo");
        return;
      }

      const numericValue = parseInt(value, 10);

      if (isNaN(numericValue) || numericValue < 1) {
        setError("A quantidade deve ser um número inteiro positivo");
        return;
      }

      setQuantity(numericValue);
    },
    [defaultValue]
  );

  const resetQuantity = useCallback(() => {
    setQuantity(defaultValue);
    setError(null);
  }, [defaultValue]);

  return {
    quantity,
    error,
    handleQuantityChange,
    resetQuantity,
  };
}
