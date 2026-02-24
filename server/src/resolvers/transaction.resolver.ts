import {
  Arg,
  FieldResolver,
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
import {
  PaginatedTransactions,
  TransactionModel,
} from "@/models/transaction.model";
import { CategoryModel } from "@/models/category.model";
import { TransactionService } from "@/services/transaction.service";
import {
  CreateTransactionInput,
  TransactionFilterInput,
  UpdateTransactionInput,
} from "@/dtos/input/transaction.input";
import type { User } from "@prisma/client";
import { CategoryService } from "@/services/category.service";

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  private readonly transactionService = new TransactionService();
  private readonly categoryService = new CategoryService();
  private readonly userService = new UserService();

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg("data", () => CreateTransactionInput) data: CreateTransactionInput,
    @GqlUser() user: User,
  ): Promise<TransactionModel> {
    return this.transactionService.createTransaction(data, user.id);
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg("data", () => UpdateTransactionInput) data: UpdateTransactionInput,
    @Arg("id", () => String) id: string,
  ): Promise<TransactionModel> {
    return this.transactionService.updateTransaction(id, data);
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg("id", () => String) id: string,
  ): Promise<boolean> {
    return this.transactionService.deleteTransaction(id);
  }

  @Query(() => PaginatedTransactions)
  async listTransactions(
    @Arg("page", () => Int, { defaultValue: 1 }) page: number,
    @Arg("perPage", () => Int, { defaultValue: 10 }) perPage: number,
    @Arg("filters", () => TransactionFilterInput, { nullable: true })
    filters: TransactionFilterInput,
    @GqlUser() user: User,
  ): Promise<PaginatedTransactions> {
    return this.transactionService.listTransactions({
      userId: user.id,
      page,
      perPage,
      filters,
    });
  }

  @FieldResolver(() => UserModel)
  async user(@Root() category: CategoryModel): Promise<UserModel> {
    return this.userService.findUser(category.userId);
  }

  @FieldResolver(() => CategoryModel)
  async category(@Root() transaction: TransactionModel) {
    return this.categoryService.findCategoryById(transaction.categoryId);
  }
}
