import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { primaryColors } from "@/utils/categories-utils";
import { cn } from "@/lib/utils";

interface KindSelectionGroupProps {
  value: string;
  onChange: (value: string) => void;
}

export function ColorRadioGroup({ value, onChange }: KindSelectionGroupProps) {
  return (
    <RadioGroup
      defaultValue={value}
      onValueChange={onChange}
      className="flex justify-between"
    >
      {primaryColors.map((name) => (
        <FieldLabel
          htmlFor={name}
          className="p-1 bg-gray-100 border-gray-300 cursor-pointer !rounded-md group-has-data-[state=checked]/field:border-brand"
        >
          <Field orientation="horizontal" className="!p-0">
            <RadioGroupItem value={name} id={name} className="peer sr-only" />
            <FieldContent className="!p-0">
              <div
                className={cn(
                  "rounded-[4px] w-full h-5 text-center",
                  `bg-${name}`,
                )}
              />
            </FieldContent>
          </Field>
        </FieldLabel>
      ))}
    </RadioGroup>
  );
}
