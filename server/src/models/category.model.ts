import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql";
import { TransactionModel } from "./transaction.model";
import { UserModel } from "./user.model";

@ObjectType()
export class CategoryModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  icon!: string;

  @Field(() => String)
  color!: string;

  @Field(() => Number, { nullable: true })
  transactionsCount?: number;

  @Field(() => Number, { nullable: true })
  totalSpent?: number;

  @Field(() => String)
  userId!: string;

  @Field(() => UserModel, { nullable: true })
  user?: UserModel;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}
