import { useMutation } from "@apollo/client/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { DELETE_TRANSACTION } from "@/lib/graphql/mutations/transaction";

import type { Transaction } from "@/types";

interface DeleteTransactionDialogProps {
  open: boolean;
  onOpenChange: (oepn: boolean) => void;
  onDeleted?: () => void;
  transaction: Transaction;
}

export function DeleteTransactionDialog({
  open,
  onOpenChange,
  onDeleted,
  transaction,
}: DeleteTransactionDialogProps) {
  const [deleteTransaction, { loading }] = useMutation(DELETE_TRANSACTION, {
    onCompleted() {
      toast.success("Transação editada com sucesso");
      onOpenChange(false);
      onDeleted?.();
    },
    onError() {
      toast.error("Falha ao editar a transação");
    },
  });

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();

    deleteTransaction({
      variables: {
        id: transaction.id,
      },
    });
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (value) return onOpenChange(true);
        handleCancel();
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="bg-white border-gray-200 gap-6"
      >
        <DialogHeader className="flex flex-row justify-between">
          <div className="space-y-2">
            <DialogTitle className="text-2xl font-bold leading-tight">
              Excluir transação
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Tem certeza que deseja excluir esta transação? Esta ação não pode
              ser desfeita.
            </DialogDescription>
          </div>
          <DialogClose asChild>
            <Button variant="outline" size="icon" className="rounded-sm">
              X
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="flex justify-end mt-4 gap-2">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
            className="cursor-pointer"
          >
            Excluir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
