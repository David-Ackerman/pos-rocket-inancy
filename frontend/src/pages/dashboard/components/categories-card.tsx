import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import type { Category } from "@/types";
import { cn } from "@/lib/utils";
import { getSecondaryColor } from "@/utils/categories-utils";

interface CategoriesCardProps {
  categories: Category[];
}

export function CategoriesCard({ categories }: CategoriesCardProps) {
  return (
    <Card className="col-span-1 p-0">
      <CardContent className="divide-y divide-gray-200 w-full p-0">
        <CardTitle className="flex justify-between items-center py-5 pl-6 pr-3">
          <h2 className="text-gray-500 text-xs font-medium uppercase">
            Categorias
          </h2>
          <Link
            to="/categories"
            className="flex items-center p-1 text-sm text-primary hover:underline"
          >
            Gerenciar
            <ChevronRight className="size-5" />
          </Link>
        </CardTitle>
        {categories.length === 0 && (
          <div className="py-10 flex flex-col items-center gap-3">
            <p className="text-gray-500 text-sm">
              Nenhuma categoria encontrada
            </p>
          </div>
        )}
        {categories.map((category) => (
          <div
            key={category.id}
            className=" grid grid-cols-3 py-3 px-6  justify-between items-center"
          >
            <Badge
              variant="secondary"
              className={cn(category.color, getSecondaryColor(category.color))}
            >
              {category.title}
            </Badge>

            <span className="text-gray-500 text-sm text-end">
              {category.transactionsCount} itens
            </span>

            <strong className="text-end text-gray-800 font-semibold">
              R$ {category.totalSpent / 100}
            </strong>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
