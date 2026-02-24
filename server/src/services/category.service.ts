import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@/dtos/input/category.input";
import { prisma } from "@/lib/prisma";

export class CategoryService {
  async createCategory(data: CreateCategoryInput, userId: string) {
    return prisma.category.create({
      data: {
        title: data.title,
        description: data.description ?? "",
        icon: data.icon,
        color: data.color,
        userId: userId,
      },
    });
  }

  async listCategories(userId: string) {
    return prisma.category.findMany({
      where: { userId },
    });
  }

  async deleteCategory(id: string) {
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      throw new Error("Category not found");
    }

    await prisma.category.delete({
      where: { id },
    });

    return true;
  }

  async findCategoryById(id: string) {
    return prisma.category.findUnique({
      where: { id },
    });
  }

  async updateCategory(id: string, data: UpdateCategoryInput) {
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      throw new Error("Category not found");
    }

    return prisma.category.update({
      where: { id },
      data: {
        title: data.title ?? existingCategory.title,
        description: data.description ?? existingCategory.description,
        icon: data.icon ?? existingCategory.icon,
        color: data.color ?? existingCategory.color,
      },
    });
  }
}
