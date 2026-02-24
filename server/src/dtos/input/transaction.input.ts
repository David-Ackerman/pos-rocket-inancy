import { Field, InputType } from "type-graphql";

@InputType()
export class CreateTransactionInput {
  @Field(() => String)
  description!: string;

  @Field(() => Date)
  transactionDate!: Date;

  @Field(() => Number)
  amount!: number;

  @Field(() => String)
  kind!: string;

  @Field(() => String)
  categoryId!: string;
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  description!: string;

  @Field(() => Date)
  transactionDate!: Date;

  @Field(() => Number)
  amount!: number;

  @Field(() => String)
  kind!: string;

  @Field(() => String)
  categoryId!: string;
}

@InputType()
export class TransactionFilterInput {
  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => String, { nullable: true })
  kind?: string;

  @Field(() => String, { nullable: true })
  categoryId?: string;

  @Field(() => String, { nullable: true })
  fromDate?: string;

  @Field(() => String, { nullable: true })
  toDate?: string;
}
