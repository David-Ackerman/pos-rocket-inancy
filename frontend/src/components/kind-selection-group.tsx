import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { CircleArrowDown, CircleArrowUp } from "lucide-react";

interface KindSelectionGroupProps {
  value: string;
  onChange: (value: string) => void;
}

export function KindSelectionGroup({
  value,
  onChange,
}: KindSelectionGroupProps) {
  return (
    <RadioGroup
      defaultValue={value}
      onValueChange={onChange}
      className="flex border border-gray-200 rounded-[12px  ] p-2 gap-0"
    >
      <FieldLabel
        htmlFor="expense"
        className="has-data-[state=checked]:bg-gray-100 not-has-data-[state=checked]:border-none has-data-[state=checked]:border-red-dark"
      >
        <Field orientation="horizontal">
          <RadioGroupItem
            value="expense"
            id="expense"
            className="peer sr-only"
          />
          <FieldContent>
            <FieldTitle className="w-full flex items-center justify-center gap-3 text-gray-600 group-has-data-[state=checked]/field:text-gray-800 group-has-data-[state=checked]/field:font-medium">
              <CircleArrowDown className="size-4 text-gray-400 group-has-data-[state=checked]/field:text-red-base" />
              Despesa
            </FieldTitle>
          </FieldContent>
        </Field>
      </FieldLabel>
      <FieldLabel
        htmlFor="income"
        className="peer-data-[state=checked]:bg-gray-100 not-has-data-[state=checked]:border-none peer-data-[state=checked]:border-green-dark"
      >
        <Field orientation="horizontal">
          <RadioGroupItem value="income" id="income" className="peer sr-only" />
          <FieldContent>
            <FieldTitle className="w-full flex items-center justify-center gap-3 text-gray-600 group-has-data-[state=checked]/field:text-gray-800 group-has-data-[state=checked]/field:font-medium">
              <CircleArrowUp className="size-4 text-gray-400 group-has-data-[state=checked]/field:text-green-base" />
              Receita
            </FieldTitle>
          </FieldContent>
        </Field>
      </FieldLabel>
    </RadioGroup>
  );
}
