import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MonthYearRangePicker } from "@/components/month-year-range-picker";

interface FilterProps {
  filter: {
    search: string;
    categoryId: string;
    kind: string;
    fromDate: string | null;
    toDate: string | null;
    selectedMonth: { month: number; year: number } | null;
  };
  setFilter: (filter: {
    search: string;
    categoryId: string;
    kind: string;
    fromDate: string | null;
    toDate: string | null;
    selectedMonth: { month: number; year: number } | null;
  }) => void;
  categories: {
    id: string;
    title: string;
  }[];
  loading: boolean;
}

export function Filter({ filter, setFilter, categories }: FilterProps) {
  return (
    <Card className="mb-8">
      <CardContent className="flex gap-4 items-center text-gray-700">
        <div className="space-y-2 flex-1">
          <Label htmlFor="title" className="text-sm font-medium">
            Buscar
          </Label>
          <Input
            id="search"
            placeholder="Ex. Alimentação"
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            className="w-full h-12"
          />
        </div>
        <div className="space-y-2 flex-1">
          <Label htmlFor="title" className="text-sm font-medium">
            Tipo
          </Label>
          <Select
            value={filter.kind}
            onValueChange={(value) => setFilter({ ...filter, kind: value })}
          >
            <SelectTrigger className="w-full !h-12 text-gray-400 text-[1rem]">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="expense">Despesa</SelectItem>
                <SelectItem value="income">Receita</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 flex-1">
          <Label htmlFor="category" className="text-sm font-medium">
            Categoria
          </Label>
          <Select
            value={filter.categoryId}
            name="category"
            onValueChange={(value) =>
              setFilter({ ...filter, categoryId: value })
            }
          >
            <SelectTrigger className="w-full !h-12 text-gray-400 text-[1rem]">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Todas</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 flex-1">
          <Label htmlFor="period" className="text-sm font-medium">
            Período
          </Label>
          <MonthYearRangePicker
            selectedMonth={filter.selectedMonth}
            onDateChange={(from, to) =>
              setFilter({
                ...filter,
                selectedMonth:
                  from && to ? { month: from.month, year: from.year } : null,
                fromDate: from
                  ? `${from.year}-${String(from.month + 1).padStart(2, "0")}-01`
                  : null,
                toDate: to
                  ? new Date(to.year, to.month + 1, 0)
                      .toISOString()
                      .split("T")[0]
                  : null,
              })
            }
            placeholder="Selecione um período"
          />
        </div>
      </CardContent>
    </Card>
  );
}
