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
import { CREATE_CATEGORY } from "@/lib/graphql/mutations/category";
import { IconRadio } from "./icon-radio";
import { ColorRadioGroup } from "./color-radio-group";

interface CreateTransactionDialogProps {
  open: boolean;
  onOpenChange: (oepn: boolean) => void;
  onCreated?: () => void;
}

export function CreateCategoryDialog({
  open,
  onOpenChange,
  onCreated,
}: CreateTransactionDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("");

  const [createCategory, { loading }] = useMutation(CREATE_CATEGORY, {
    onCompleted() {
      toast.success("Categoria criada com sucesso");
      onOpenChange(false);
      onCreated?.();
    },
    onError() {
      toast.error("Falha ao criar a categoria");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCategory({
      variables: {
        data: {
          title,
          description,
          icon,
          color,
        },
      },
    });
    handleCancel();
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setIcon("");
    setColor("");
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
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-sm"
            >
              X
            </Button>
          </DialogClose>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 text-gray-700 ">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Título
              </Label>
              <Input
                id="title"
                placeholder="Ex. Alimentação"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-12"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Descrição
              </Label>
              <Input
                id="description"
                placeholder="Descrição da categoria"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-12"
                disabled={loading}
              />
              <span className="text-gray-500 text-xs">Opcional</span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon" className="text-sm font-medium">
                Ícone
              </Label>
              <div className="flex gap-2">
                <IconRadio value={icon} onChange={setIcon} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon" className="text-sm font-medium">
                Cor
              </Label>
              <ColorRadioGroup value={color} onChange={setColor} />
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
