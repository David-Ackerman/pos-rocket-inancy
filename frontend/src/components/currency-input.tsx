import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type ComponentProps } from "react";

export const CurrencyInput = ({
  value,
  changeValue,
  error,
  ...props
}: {
  value: number;
  changeValue: (value: number) => void;
  error?: string;
} & ComponentProps<"input">) => {
  function formatCurrencyFromCents(cents: number) {
    return (cents / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const onlyDigits = e.target.value.replace(/\D/g, "");

    const cents = Number(onlyDigits || "0");

    changeValue(cents);
  }

  return (
    <div className="space-y-2 flex-1">
      <Label htmlFor="title" className="text-sm font-medium">
        Valor
      </Label>
      <Input
        id="value"
        value={formatCurrencyFromCents(value)}
        onChange={handleChange}
        data-error={!!error}
        className="w-full h-12 data-[error=true]:border-red-500 data-[error=true]:focus-visible:ring-red-500"
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
