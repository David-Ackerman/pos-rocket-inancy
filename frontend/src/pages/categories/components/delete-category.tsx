import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Dialog,
  DialogClose,
} from "@/components/ui/dialog";
import { DELETE_CATEGORY } from "@/lib/graphql/mutations/category";
import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";

export function DeleteCategoryDialog({
  open,
  onOpenChange,
  categoryId,
  onDeleted,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryId: string;
  onDeleted?: () => void;
}) {
  const [deleteCategory, { loading }] = useMutation(DELETE_CATEGORY, {
    onCompleted() {
      toast.success("Categoria excluída com sucesso");
      onOpenChange(false);
      onDeleted?.();
    },
    onError() {
      toast.error("Falha ao excluir a categoria");
    },
  });

  const handleDelete = () => {
    deleteCategory({ variables: { id: categoryId } });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (value) return onOpenChange(true);
        onOpenChange(false);
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="bg-white border-gray-200 gap-6"
      >
        <DialogHeader className="flex flex-row justify-between">
          <div className="space-y-2">
            <DialogTitle className="text-2xl font-bold leading-tight">
              Excluir categoria
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Tem certeza que deseja excluir esta categoria? Esta ação não pode
              ser desfeita.
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
