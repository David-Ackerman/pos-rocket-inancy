import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpDown, Plus, SquarePen, Tag, Trash } from "lucide-react";
import { useState } from "react";
import type { Category } from "@/types";
import { useQuery } from "@apollo/client/react";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/categories";
import { CustomIcon } from "@/components/custom-icon";
import { getSecondaryColor, icons } from "@/utils/categories-utils";
import { cn } from "@/lib/utils";
import { CreateCategoryDialog } from "./components/create-category";
import { Badge } from "@/components/ui/badge";
import { DeleteCategoryDialog } from "./components/delete-category";
import { EditCategoryDialog } from "./components/edit-category";

export function Categories() {
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const {
    data: categoriesData,
    loading: categoriesLoading,
    refetch,
  } = useQuery<{
    listCategories: Category[];
  }>(LIST_CATEGORIES);

  function handleDeleteCategory(category: Category) {
    setSelectedCategory(category);
    setDeleteDialogOpen(true);
  }

  function handleEditCategory(category: Category) {
    setSelectedCategory(category);
    setEditDialogOpen(true);
  }

  return (
    <Page page="categories">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Categorias</h1>
          <span className="text-gray-600">
            Organize suas transações por categorias
          </span>
        </div>

        <Button className="" size="sm" onClick={() => setOpenDialog(true)}>
          <Plus className="size-4" />
          Nova categoria
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-8">
        <Card>
          <CardContent className="space-y-4">
            <CardTitle className="flex items-center gap-3 text-gray-800 leading-8 text-[1.75rem] font-bold">
              <Tag className="size-6 text-gray-700" />
              {categoriesData?.listCategories.length || 0}
            </CardTitle>
            <CardDescription className="text-gray-500 text-xs uppercase">
              Total de categorias
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-4">
            <CardTitle className="flex items-center gap-3 text-gray-800 leading-8 text-[1.75rem] font-bold">
              <ArrowUpDown className="size-6 text-purple-base" />
              {categoriesData?.listCategories.reduce(
                (total, category) => total + category.transactionsCount,
                0,
              ) || 0}
            </CardTitle>
            <CardDescription className="text-gray-500 text-xs uppercase">
              Total de transações
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-4">
            <CardTitle className="flex items-center gap-3 text-gray-800 leading-8 text-[1.75rem] font-bold">
              <Tag className="size-6 text-gray-700" />
              {categoriesData?.listCategories.find(
                (category) =>
                  category.transactionsCount ===
                  Math.max(
                    ...categoriesData.listCategories.map(
                      (c) => c.transactionsCount,
                    ),
                  ),
              )?.title || "N/A"}
            </CardTitle>
            <CardDescription className="text-gray-500 text-xs uppercase">
              Categoria mais utilizada
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {categoriesLoading && (
        <div className="py-10 flex flex-col items-center gap-3">
          <ArrowUpDown className="size-6 text-gray-400 animate-spin" />
          <p className="text-gray-500 text-sm">Carregando categorias...</p>
        </div>
      )}
      <div className="grid grid-cols-4 gap-4 mt-8">
        {categoriesData?.listCategories.map((category) => (
          <Card>
            <CardContent className="flex flex-col justify-between flex-1 gap-5">
              <CardHeader className="flex justify-between w-full p-0">
                <CustomIcon
                  Icon={icons.find((icon) => icon.name === category.icon)!.Icon}
                  color={category.color}
                />

                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={() => handleDeleteCategory(category)}
                    variant="outline"
                    size="icon"
                    className="rounded-sm"
                  >
                    <Trash className="size-4 text-danger" />
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleEditCategory(category)}
                    variant="outline"
                    size="icon"
                    className="rounded-sm"
                  >
                    <SquarePen className="size-4 text-gray-700" />
                  </Button>
                </div>
              </CardHeader>
              <div className="flex-1 flex flex-col gap-1">
                <strong className="font-semibold text-gray-800">
                  {category.title}
                </strong>
                <span className="text-gray-600">{category.description}</span>
              </div>
              <div className="flex justify-between">
                <Badge
                  className={cn(
                    category.color,
                    getSecondaryColor(category.color),
                  )}
                >
                  {category.title}
                </Badge>
                {category.transactionsCount > 0 && (
                  <span className="text-gray-600">
                    {category.transactionsCount}{" "}
                    {category.transactionsCount > 1 ? "itens" : "item"}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <CreateCategoryDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onCreated={() => refetch()}
      />
      <DeleteCategoryDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        categoryId={selectedCategory?.id || ""}
        onDeleted={() => {
          refetch();
          setDeleteDialogOpen(false);
          setSelectedCategory(null);
        }}
      />
      {selectedCategory && (
        <EditCategoryDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          category={selectedCategory!}
          onUpdated={() => {
            refetch();
            setEditDialogOpen(false);
            setSelectedCategory(null);
          }}
        />
      )}
    </Page>
  );
}
