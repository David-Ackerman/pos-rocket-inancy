import {
  Arg,
  FieldResolver,
  Float,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { UserModel } from "@/models/user.model";
import { UserService } from "@/services/user.service";
import { IsAuth } from "@/middlewares/auth.middleware";
import { GqlUser } from "@/graphql/decorators/user.decorator";
import { TransactionModel } from "@/models/transaction.model";
import { CategoryModel } from "@/models/category.model";
import { CategoryService } from "@/services/category.service";
import { TransactionService } from "@/services/transaction.service";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@/dtos/input/category.input";
import type { User } from "@prisma/client";

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
  private readonly categoryService = new CategoryService();
  private readonly transactionService = new TransactionService();
  private readonly userService = new UserService();

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg("data", () => CreateCategoryInput) data: CreateCategoryInput,
    @GqlUser() user: User,
  ): Promise<CategoryModel> {
    return this.categoryService.createCategory(data, user.id);
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg("data", () => UpdateCategoryInput) data: UpdateCategoryInput,
    @Arg("id", () => String) id: string,
  ): Promise<CategoryModel> {
    return this.categoryService.updateCategory(id, data);
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Arg("id", () => String) id: string): Promise<boolean> {
    return this.categoryService.deleteCategory(id);
  }

  @Query(() => [CategoryModel])
  async listCategories(@GqlUser() user: User): Promise<CategoryModel[]> {
    return this.categoryService.listCategories(user.id);
  }

  @FieldResolver(() => UserModel)
  async user(@Root() category: CategoryModel): Promise<UserModel> {
    return this.userService.findUser(category.userId);
  }

  @FieldResolver(() => Number)
  async transactionsCount(
    @Root() category: CategoryModel,
    @GqlUser() user: User,
  ): Promise<number> {
    return this.transactionService.countTransactionsFromCategory(
      category.id,
      user.id,
    );
  }

  @FieldResolver(() => Int)
  async totalSpent(
    @Root() category: CategoryModel,
    @GqlUser() user: User,
  ): Promise<number> {
    return this.transactionService.sumExpensesByCategory(category.id, user.id);
  }
}
