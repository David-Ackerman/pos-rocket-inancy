import { Page } from "@/components/page";

import { Plus } from "lucide-react";
import { useState } from "react";
import type { Category, PaginatedTransactions, Transaction } from "@/types";
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/transaction";
import { useQuery } from "@apollo/client/react";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/categories";
import { Button } from "@/components/ui/button";
import { CreateTransactionDialog } from "@/components/create-transaction-dialog";
import { TransactionsList } from "./components/transactions-list";
import { Filter } from "./components/filter";
import { EditTransactionDialog } from "./components/dialog-edit-transaction";
import { DeleteTransactionDialog } from "./components/dialog-delete-transaction";

export function Transactions() {
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [transactionSelected, setTransactionSelected] =
    useState<Transaction | null>();

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({
    search: "",
    categoryId: "",
    kind: "",
    selectedMonth: null as { month: number; year: number } | null,
    fromDate: null as string | null,
    toDate: null as string | null,
  });
  const itemsPerPage = 10;

  const { data, refetch } = useQuery<{
    listTransactions: PaginatedTransactions;
  }>(LIST_TRANSACTIONS, {
    variables: {
      page: currentPage,
      perPage: itemsPerPage,
      filters: {
        search: filter.search,
        categoryId: filter.categoryId === "all" ? null : filter.categoryId,
        kind: filter.kind === "all" ? null : filter.kind,
        fromDate: filter.fromDate,
        toDate: filter.toDate,
      },
    },
  });

  const { data: categoriesData, loading: categoriesLoading } = useQuery<{
    listCategories: Category[];
  }>(LIST_CATEGORIES);

  function deleteTransaction(transaction: Transaction) {
    setTransactionSelected(transaction);
    setOpenDeleteDialog(true);
  }

  function editTransaction(transaction: Transaction) {
    setTransactionSelected(transaction);
    setOpenEditDialog(true);
  }

  return (
    <Page page="transactions">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Transações</h1>
          <span className="text-gray-600">
            Gerencie todas as suas transações
          </span>
        </div>

        <Button className="" size="sm" onClick={() => setOpenDialog(true)}>
          <Plus className="size-4" />
          Nova transação
        </Button>
      </div>

      <Filter
        filter={filter}
        setFilter={setFilter}
        categories={categoriesData?.listCategories || []}
        loading={categoriesLoading}
      />

      <TransactionsList
        transactions={data?.listTransactions.data || []}
        page={currentPage}
        totalPages={data?.listTransactions.totalPages ?? 1}
        totalItems={data?.listTransactions.totalItems ?? 0}
        perPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        deleteTransaction={deleteTransaction}
        editTransaction={editTransaction}
      />

      <CreateTransactionDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onCreated={() => refetch()}
        categories={categoriesData?.listCategories || []}
      />
      {transactionSelected && (
        <>
          <EditTransactionDialog
            key={transactionSelected.id}
            transaction={transactionSelected}
            categories={categoriesData?.listCategories || []}
            onOpenChange={setOpenEditDialog}
            open={openEditDialog}
            onEdited={() => {
              refetch();
              setTransactionSelected(null);
              setOpenEditDialog(false);
            }}
          />
          <DeleteTransactionDialog
            key={transactionSelected.id}
            onOpenChange={setOpenDeleteDialog}
            open={openDeleteDialog}
            transaction={transactionSelected}
            onDeleted={() => {
              refetch();
              setTransactionSelected(null);
              setOpenDeleteDialog(false);
            }}
          />
        </>
      )}
    </Page>
  );
}
