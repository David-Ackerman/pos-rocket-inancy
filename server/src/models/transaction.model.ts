import { Field, GraphQLISODateTime, Int, ObjectType } from "type-graphql";

import { CategoryModel } from "./category.model";
import { UserModel } from "./user.model";

@ObjectType()
export class TransactionModel {
  @Field(() => String)
  id!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => GraphQLISODateTime)
  transactionDate!: Date;

  @Field(() => Number, { nullable: true })
  amount?: number;

  @Field(() => String)
  kind!: string;

  @Field(() => String)
  categoryId!: string;

  @Field(() => CategoryModel, { nullable: true })
  category?: CategoryModel;

  @Field(() => String)
  userId!: string;

  @Field(() => UserModel, { nullable: true })
  user?: UserModel;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}

@ObjectType()
export class PaginatedTransactions {
  @Field(() => [TransactionModel])
  data!: TransactionModel[];

  @Field(() => Int)
  totalItems!: number;

  @Field(() => Int)
  totalPages!: number;

  @Field(() => Int)
  page!: number;
}
