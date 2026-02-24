import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import {
  ChevronRight,
  Plus,
  CircleArrowDown,
  CircleArrowUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { Transaction } from "@/types";
import { CustomIcon } from "@/components/custom-icon";
import { cn } from "@/lib/utils";
import { getSecondaryColor, icons } from "@/utils/categories-utils";
import { Badge } from "@/components/ui/badge";

interface TransactionsCardProps {
  setOpenDialog: (open: boolean) => void;
  transactions: Transaction[];
}

export function TransactionsCard({
  setOpenDialog,
  transactions,
}: TransactionsCardProps) {
  return (
    <Card className="col-span-2 p-0">
      <CardContent className="divide-y divide-gray-200 w-full p-0">
        <CardTitle className="flex justify-between items-center py-5 pl-6 pr-3">
          <h2 className="text-gray-500 text-xs font-medium uppercase">
            Transações recentes
          </h2>
          <Link
            to="/transactions"
            className="flex items-center p-1 text-sm text-primary hover:underline"
          >
            Ver todas
            <ChevronRight className="size-5" />
          </Link>
        </CardTitle>
        {transactions.length === 0 && (
          <div className="py-10 flex flex-col items-center gap-3">
            <p className="text-gray-500 text-sm">
              Nenhuma transação encontrada
            </p>
          </div>
        )}
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="grid grid-cols-4 items-center justify-between h-18"
          >
            <div className="col-span-2 flex items-center gap-4 px-6">
              <CustomIcon
                Icon={
                  icons.find((icon) => icon.name === transaction.category.icon)!
                    .Icon
                }
                color={transaction.category.color}
              />
              <div className="flex flex-col">
                <strong className="text-gray-800">
                  {transaction.description}
                </strong>
                <span className="text-sm text-gray-600">
                  {new Date(transaction.transactionDate).toLocaleDateString(
                    "pt-BR",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    },
                  )}
                </span>
              </div>
            </div>
            <div className=" px-6 flex items-center justify-center">
              <Badge
                className={cn(
                  transaction.category.color,
                  getSecondaryColor(transaction.category.color),
                )}
              >
                {transaction.category.title}
              </Badge>
            </div>

            <div className="px-6 flex items-center justify-end gap-1">
              <strong className="text-gray-800">
                {transaction.kind === "income" ? "+" : "-"} R${" "}
                {transaction.amount / 100}
              </strong>
              {transaction.kind === "income" ? (
                <div className="flex items-center gap-2">
                  <CircleArrowUp className="size-4 text-brand" />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CircleArrowDown className="size-4 text-red-base" />
                </div>
              )}
            </div>
          </div>
        ))}
        <CardFooter className="flex items-center justify-center py-5 px-6">
          <Button
            variant="link"
            className="cursor-pointer flex items-center font-medium p-0"
            onClick={() => setOpenDialog(true)}
          >
            <Plus className="size-5" />
            Nova transação
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
