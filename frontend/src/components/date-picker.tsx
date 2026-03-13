import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  date: Date | undefined;
  onDateChange: (date: Date) => void;
  error?: string;
}

export function DatePicker({ date, onDateChange, error }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Field className="flex-1 gap-2">
      <FieldLabel htmlFor="date" className="text-sm font-medium ">
        Data
      </FieldLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-error={!!error}
            id="date"
            className="justify-start font-normal h-12 data-[error=true]:border-red-500 data-[error=true]:focus-visible:ring-red-500"
          >
            {date ? date.toLocaleDateString() : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            captionLayout="dropdown"
            required
            onSelect={(date) => {
              if (!date) return;
              onDateChange(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </Field>
  );
}
