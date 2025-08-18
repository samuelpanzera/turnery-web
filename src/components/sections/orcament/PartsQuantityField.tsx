import { usePartsQuantity } from "@/hooks/usePartsQuantity";

export interface PartsQuantityFieldProps {
  defaultValue?: number;
  onChange?: (quantity: number) => void;
  name?: string;
  id?: string;
}

export function PartsQuantityField({
  defaultValue = 1,
  onChange,
  name = "quantidadePecas",
  id = "quantidadePecas",
}: PartsQuantityFieldProps) {
  const { quantity, error, handleQuantityChange } =
    usePartsQuantity(defaultValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleQuantityChange(value);

    // Call onChange callback if provided
    if (onChange) {
      const numericValue = parseInt(value, 10);
      if (!isNaN(numericValue) && numericValue >= 1) {
        onChange(numericValue);
      } else {
        onChange(defaultValue);
      }
    }
  };

  return (
    <div className="max-w-xs">
      <label htmlFor={id} className="block text-sm font-medium text-white mb-2">
        Quantidade de Peças*
        <span className="sr-only">(obrigatório, mínimo 1)</span>
      </label>
      <div className="relative">
        <input
          type="number"
          id={id}
          name={name}
          value={quantity}
          onChange={handleInputChange}
          min="1"
          step="1"
          required
          autoComplete="off"
          className={`w-full border rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 transition-colors duration-200 bg-transparent text-white placeholder-gray-400 ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-600 focus:border-tornomix-aco focus:ring-tornomix-aco"
          }`}
          placeholder="1"
          aria-describedby={error ? `${id}-error` : `${id}-help`}
          aria-invalid={error ? "true" : "false"}
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <span className="text-gray-500 text-sm">peças</span>
        </div>
      </div>
      {!error && (
        <p id={`${id}-help`} className="text-xs text-gray-400 mt-1">
          Quantidade mínima: 1 peça
        </p>
      )}
      {error && (
        <p
          id={`${id}-error`}
          className="text-sm text-red-500 mt-1"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
}
