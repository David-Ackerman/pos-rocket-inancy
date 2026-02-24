import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { icons } from "@/utils/categories-utils";

interface KindSelectionGroupProps {
  value: string;
  onChange: (value: string) => void;
}

export function IconRadio({ value, onChange }: KindSelectionGroupProps) {
  const mappedIcons = Object.entries(icons).map(([key, { name, Icon }]) => ({
    key,
    value: name,
    Icon,
  }));

  return (
    <RadioGroup
      defaultValue={value}
      onValueChange={onChange}
      className="grid grid-cols-8 w-full"
    >
      {mappedIcons.map(({ value, Icon }) => (
        <FieldLabel
          key={value}
          htmlFor={value}
          className="border-gray-300 cursor-pointer has-data-[state=checked]:border-brand !size-10.5"
        >
          <Field orientation="horizontal" className="!p-0">
            <RadioGroupItem value={value} id={value} className="peer sr-only" />
            <FieldContent className="p-0 flex items-center justify-center size-10.5">
              <Icon key={value} className="size-5 text-gray-600" />
            </FieldContent>
          </Field>
        </FieldLabel>
      ))}
    </RadioGroup>
  );
}
