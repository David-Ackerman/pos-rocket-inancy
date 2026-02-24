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
import { CREATE_TRANSACTION } from "@/lib/graphql/mutations/transaction";
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

interface CreateTransactionDialogProps {
  open: boolean;
  onOpenChange: (oepn: boolean) => void;
  onCreated?: () => void;
  categories: {
    id: string;
    title: string;
  }[];
}

export function CreateTransactionDialog({
  open,
  onOpenChange,
  onCreated,
  categories,
}: CreateTransactionDialogProps) {
  const [kind, setKind] = useState("expense");
  const [description, setDescription] = useState("");
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [amount, setAmount] = useState(0);
  const [categoryId, setCategoryId] = useState("");

  const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION, {
    onCompleted() {
      toast.success("Transação criada com sucesso");
      onOpenChange(false);
      onCreated?.();
    },
    onError() {
      toast.error("Falha ao criar a transação");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTransaction({
      variables: {
        data: {
          kind,
          description,
          transactionDate: transactionDate.toISOString(),
          amount,
          categoryId,
        },
      },
    });
  };

  const handleCancel = () => {
    setKind("expense");
    setTransactionDate(new Date());
    setDescription("");
    setAmount(0);
    setCategoryId("");
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
              Nova transação
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
              <Label htmlFor="title" className="text-sm font-medium">
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
              >
                <SelectTrigger className="w-full !h-12 text-gray-400 text-[1rem]">
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
