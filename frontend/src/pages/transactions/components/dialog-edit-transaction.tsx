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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { UPDATE_TRANSACTION } from "@/lib/graphql/mutations/transaction";
import { KindSelectionGroup } from "@/components/kind-selection-group";

import { DatePicker } from "@/components/date-picker";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { CurrencyInput } from "@/components/currency-input";
import type { Transaction } from "@/types";

interface EditTransactionDialogProps {
  open: boolean;
  onOpenChange: (oepn: boolean) => void;
  onEdited?: () => void;
  categories: {
    id: string;
    title: string;
  }[];
  transaction: Transaction;
}

export function EditTransactionDialog({
  open,
  onOpenChange,
  onEdited,
  categories,
  transaction,
}: EditTransactionDialogProps) {
  const [kind, setKind] = useState<string>(transaction.kind);
  const [description, setDescription] = useState(transaction.description || "");
  const [transactionDate, setTransactionDate] = useState(
    new Date(transaction.transactionDate),
  );
  const [amount, setAmount] = useState(transaction.amount);
  const [categoryId, setCategoryId] = useState(transaction.categoryId);
  const [errors, setErrors] = useState({
    description: "",
    transactionDate: "",
    amount: "",
    categoryId: "",
  });

  const [createTransaction, { loading }] = useMutation(UPDATE_TRANSACTION, {
    onCompleted() {
      toast.success("Transação editada com sucesso");
      onOpenChange(false);
      onEdited?.();
    },
    onError() {
      toast.error("Falha ao editar a transação");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || amount <= 0) {
      setErrors((prev) => ({
        ...prev,
        amount: "Valor deve ser maior que zero",
      }));
      return;
    }

    if (!transactionDate) {
      setErrors((prev) => ({
        ...prev,
        transactionDate: "Data da transação é obrigatória",
      }));
      return;
    }

    if (!categoryId) {
      setErrors((prev) => ({ ...prev, categoryId: "Categoria é obrigatória" }));
      return;
    }

    createTransaction({
      variables: {
        data: {
          kind,
          description,
          transactionDate: transactionDate.toISOString(),
          amount,
          categoryId,
          id: transaction.id,
        },
        id: transaction.id,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="bg-white border-gray-200 gap-6"
      >
        <DialogHeader className="flex flex-row justify-between">
          <div className="space-y-2">
            <DialogTitle className="text-2xl font-bold leading-tight">
              Editar transação
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Registre sua despesa ou receita.
            </DialogDescription>
          </div>
          <DialogClose asChild>
            <Button variant="outline" size="icon" className="rounded-sm">
              X
            </Button>
          </DialogClose>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 text-gray-700 ">
          <div className="space-y-4">
            <KindSelectionGroup value={kind} onChange={setKind} />
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Descrição
              </Label>
              <Input
                id="description"
                placeholder="Ex. Almoço no restaurante"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-12"
                disabled={loading}
              />
            </div>
            <div className="flex gap-4">
              <DatePicker
                date={transactionDate}
                onDateChange={(date) => setTransactionDate(date)}
              />

              <CurrencyInput
                value={amount}
                disabled={loading}
                changeValue={setAmount}
                error={errors.amount}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">
                Categoria
              </Label>
              <Select
                name="category"
                value={categoryId}
                onValueChange={setCategoryId}
                required
              >
                <SelectTrigger
                  name="category"
                  data-error={!!errors.categoryId}
                  className="w-full !h-12 text-gray-400 text-[1rem] data-[error=true]:border-red-500 data-[error]:focus-visible:ring-red-500"
                >
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.categoryId && (
                <p className="text-sm text-red-500">{errors.categoryId}</p>
              )}
            </div>
          </div>

          <Button className="w-full h-12" type="submit" disabled={loading}>
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
