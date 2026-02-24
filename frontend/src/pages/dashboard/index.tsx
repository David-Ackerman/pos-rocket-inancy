import { Page } from "@/components/page";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { CircleArrowDown, CircleArrowUp, Wallet } from "lucide-react";
import { useState } from "react";
import type { Category, PaginatedTransactions, Transaction } from "@/types";
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/transaction";
import { useQuery } from "@apollo/client/react";
import { CreateTransactionDialog } from "../../components/create-transaction-dialog";
import { TransactionsCard } from "./components/transactions-card";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/categories";
import { CategoriesCard } from "./components/categories-card";
import { fi } from "date-fns/locale";

export function Dashboard() {
  const [openDialog, setOpenDialog] = useState(false);

  const { data, loading, refetch } = useQuery<{
    listTransactions: PaginatedTransactions;
  }>(LIST_TRANSACTIONS, {
    variables: {
      page: 1,
      perPage: 9999,
      filters: {
        search: "",
        categoryId: null,
        kind: null,
        fromDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1,
        ).toISOString(),
        toDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          0,
        ).toISOString(),
      },
    },
  });

  const { data: categoriesData, loading: categoriesLoading } = useQuery<{
    listCategories: Category[];
  }>(LIST_CATEGORIES);

  console.log("categoriesData", categoriesData);
  return (
    <Page page="dashboard">
      <div className="grid grid-cols-3 gap-6">
        <Card>
          <CardContent className="space-y-4">
            <CardTitle className="flex items-center gap-3 text-gray-500 text-xs uppercase">
              <Wallet className="text-purple-base size-5" />
              Saldo total
            </CardTitle>
            <CardDescription className="text-gray-800 leading-8 text-[1.75rem] font-bold">
              {(data?.listTransactions.data.reduce((total, transaction) => {
                if (transaction.kind === "income") {
                  return total + transaction.amount;
                } else {
                  return total - transaction.amount;
                }
              }, 0) || 0) / 100}
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-4">
            <CardTitle className="flex items-center gap-3 text-gray-500 text-xs uppercase">
              <CircleArrowUp className="text-primary size-5" />
              Receitas do mês
            </CardTitle>
            <CardDescription className="text-gray-800 leading-8 text-[1.75rem] font-bold">
              {(data?.listTransactions.data.reduce((total, transaction) => {
                if (transaction.kind === "income") {
                  return total + transaction.amount;
                } else {
                  return total;
                }
              }, 0) || 0) / 100}
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-4">
            <CardTitle className="flex items-center gap-3 text-gray-500 text-xs uppercase">
              <CircleArrowDown className="text-red-base size-5" />
              Despesas do mês
            </CardTitle>
            <CardDescription className="text-gray-800 leading-8 text-[1.75rem] font-bold">
              {(data?.listTransactions.data.reduce((total, transaction) => {
                if (transaction.kind === "expense") {
                  return total + transaction.amount;
                } else {
                  return total;
                }
              }, 0) || 0) / 100}
            </CardDescription>
          </CardContent>
        </Card>
        <TransactionsCard
          setOpenDialog={setOpenDialog}
          transactions={data?.listTransactions.data.slice(0, 5) || []}
        />
        <CategoriesCard categories={categoriesData?.listCategories || []} />
      </div>
      <CreateTransactionDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onCreated={() => refetch()}
        categories={categoriesData?.listCategories || []}
      />
    </Page>
  );
}
