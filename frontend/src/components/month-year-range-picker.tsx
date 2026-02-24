import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthYearRangePickerProps {
  selectedMonth: { month: number; year: number } | null;
  onDateChange: (
    from: { month: number; year: number } | null,
    to: { month: number; year: number } | null,
  ) => void;
  placeholder?: string;
}

export function MonthYearRangePicker({
  selectedMonth,
  onDateChange,
  placeholder = "Selecione um período",
}: MonthYearRangePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [viewYear, setViewYear] = React.useState(
    selectedMonth?.year ?? new Date().getFullYear(),
  );

  const months = [
    { num: 0, label: "Janeiro" },
    { num: 1, label: "Fevereiro" },
    { num: 2, label: "Março" },
    { num: 3, label: "Abril" },
    { num: 4, label: "Maio" },
    { num: 5, label: "Junho" },
    { num: 6, label: "Julho" },
    { num: 7, label: "Agosto" },
    { num: 8, label: "Setembro" },
    { num: 9, label: "Outubro" },
    { num: 10, label: "Novembro" },
    { num: 11, label: "Dezembro" },
  ];

  const handleMonthSelect = (month: number) => {
    const firstDay = { month, year: viewYear };
    const lastDay = { month, year: viewYear };

    onDateChange(firstDay, lastDay);
    setOpen(false);
  };

  const getDisplayText = () => {
    if (!selectedMonth) return placeholder;
    return `${months[selectedMonth.month].label}/${selectedMonth.year}`;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="justify-between font-normal h-12 w-full text-left text-gray-400 text-[1rem]"
        >
          <span>{getDisplayText()}</span>
          <span className="text-gray-400">▼</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="start">
        <div className="space-y-4">
          {/* Year Selector */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewYear(viewYear - 1)}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-lg font-semibold">{viewYear}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewYear(viewYear + 1)}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Months Grid */}
          <div className="grid grid-cols-3 gap-2">
            {months.map((month) => {
              const isSelected =
                selectedMonth?.month === month.num &&
                selectedMonth?.year === viewYear;

              return (
                <button
                  key={month.num}
                  onClick={() => handleMonthSelect(month.num)}
                  className={`py-2 px-3 text-sm rounded font-medium transition-colors ${
                    isSelected
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {month.label.slice(0, 3)}
                </button>
              );
            })}
          </div>

          {/* Clear button */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onDateChange(null, null);
                setOpen(false);
              }}
              className="flex-1"
            >
              Limpar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
