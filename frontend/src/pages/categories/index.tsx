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

export function Categories() {
  const [openDialog, setOpenDialog] = useState(false);

  const {
    data: categoriesData,
    loading: categoriesLoading,
    refetch,
  } = useQuery<{
    listCategories: Category[];
  }>(LIST_CATEGORIES);

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

      <div className="grid grid-cols-4 gap-4 mt-8">
        {categoriesData?.listCategories.map((category) => (
          <Card>
            <CardContent className="space-y-5">
              <CardHeader className="flex justify-between w-full p-0">
                <CustomIcon
                  Icon={icons.find((icon) => icon.name === category.icon)!.Icon}
                  color={category.color}
                />

                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="rounded-sm">
                    <Trash className="size-4 text-danger" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-sm">
                    <SquarePen className="size-4 text-gray-700" />
                  </Button>
                </div>
              </CardHeader>
              <div className="flex flex-col gap-1">
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
                  <span>
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
    </Page>
  );
}
