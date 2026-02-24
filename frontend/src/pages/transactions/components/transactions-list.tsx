import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CircleArrowUp, CircleArrowDown, SquarePen, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Transaction } from "@/types";
import { CustomIcon } from "@/components/custom-icon";
import { getSecondaryColor, icons } from "@/utils/categories-utils";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Pagination } from "./pagination";

interface TransactionsCardProps {
  transactions: Transaction[];
  totalItems: number;
  totalPages: number;
  page: number;
  perPage: number;
  setCurrentPage: (page: number) => void;
}

export function TransactionsList({
  transactions,
  totalItems,
  totalPages,
  page,
  perPage,
  setCurrentPage,
}: TransactionsCardProps) {
  return (
    <Card className="w-full p-0">
      <CardContent className="divide-y divide-gray-200 w-full p-0">
        {transactions.length === 0 && (
          <div className="py-10 flex flex-col items-center gap-3">
            <p className="text-gray-500 text-sm">
              Nenhuma transação encontrada
            </p>
          </div>
        )}
        {transactions.length > 0 && (
          <div className="grid grid-cols-20 items-center justify-between">
            <div className="col-span-8 py-5 px-6">
              <span className="font-medium uppercase text-xs text-gray-500">
                Descrição
              </span>
            </div>
            <div className="col-span-2 py-5 px-6 flex justify-center">
              <span className="font-medium uppercase text-xs text-gray-500">
                Data
              </span>
            </div>
            <div className="col-span-3 py-5 px-6 flex justify-center">
              <span className="font-medium uppercase text-xs text-gray-500">
                Categoria
              </span>
            </div>
            <div className="col-span-2 py-5 px-6 flex justify-center">
              <span className="font-medium uppercase text-xs text-gray-500">
                Tipo
              </span>
            </div>

            <div className="col-span-3 py-5 px-6 flex justify-end">
              <span className="font-medium uppercase text-xs text-gray-500">
                Valor
              </span>
            </div>
            <div className="col-span-2 py-5 px-6 text-end">
              <span className="font-medium uppercase text-xs text-gray-500">
                Ações
              </span>
            </div>
          </div>
        )}
        {transactions.map((transaction) => (
          <div className="grid grid-cols-20 items-center justify-between h-18">
            <div className="col-span-8 flex items-center gap-4 px-6">
              <CustomIcon
                Icon={
                  icons.find((icon) => icon.name === transaction.category.icon)!
                    .Icon
                }
                color={transaction.category.color}
              />
              <strong className="text-gray-800">
                {transaction.description}
              </strong>
            </div>
            <div className="col-span-2 px-6 flex justify-center items-center">
              <span className="text-sm text-gray-600">
                {new Date(transaction.createdAt!).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                })}
              </span>
            </div>
            <div className="col-span-3 px-6 flex items-center justify-center">
              <Badge
                className={cn(
                  transaction.category.color,
                  getSecondaryColor(transaction.category.color),
                )}
              >
                {transaction.category.title}
              </Badge>
            </div>
            <div className="col-span-2 flex items-center justify-center px-6">
              {transaction.kind === "income" ? (
                <div className="flex items-center gap-2">
                  <CircleArrowUp className="size-4 text-brand" />
                  <span className="text-xs text-green-dark">Entrada</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CircleArrowDown className="size-4 text-red-base" />
                  <span className="text-xs text-red-dark">Saída</span>
                </div>
              )}
            </div>

            <div className="col-span-3 px-6 flex items-center justify-end">
              <strong className="text-gray-800">
                {transaction.kind === "income" ? "+" : "-"}R${" "}
                {transaction.amount / 100}
              </strong>
            </div>
            <div className="col-span-2 px-6 flex items-center gap-2 justify-center">
              <Button
                variant="outline"
                size="icon"
                className="rounded-sm size-8"
              >
                <Trash className="size-4 text-danger" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-sm size-8"
              >
                <SquarePen className="size-4 text-gray-700" />
              </Button>
            </div>
          </div>
        ))}
        <CardFooter className="flex items-center justify-center">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={perPage}
            onPageChange={setCurrentPage}
          />
        </CardFooter>
      </CardContent>
    </Card>
  );
}
