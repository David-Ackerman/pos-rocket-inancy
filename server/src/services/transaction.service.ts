import { prisma } from "@/lib/prisma";
import {
  CreateTransactionInput,
  TransactionFilterInput,
  UpdateTransactionInput,
} from "@/dtos/input/transaction.input";
import type { Prisma, TransactionKind } from "@prisma/client";
import { after } from "node:test";

export class TransactionService {
  async createTransaction(data: CreateTransactionInput, userId: string) {
    return prisma.transaction.create({
      data: {
        description: data.description,
        transactionDate: data.transactionDate,
        amount: data.amount,
        kind: data.kind,
        categoryId: data.categoryId,
        userId: userId,
      },
    });
  }

  async listTransactions({
    userId,
    page,
    perPage,
    filters,
  }: {
    userId: string;
    page: number;
    perPage: number;
    filters?: TransactionFilterInput;
  }) {
    const where: Prisma.TransactionWhereInput = {
      userId,
    };

    if (filters?.search) {
      where.description = {
        contains: filters.search,
      };
    }

    if (filters?.kind) {
      where.kind = filters.kind;
    }

    if (filters?.categoryId) {
      where.categoryId = filters.categoryId;
    }

    if (filters?.fromDate || filters?.toDate) {
      where.transactionDate = {};

      if (filters.fromDate) {
        where.transactionDate.gte = new Date(filters.fromDate);
      }

      if (filters.toDate) {
        where.transactionDate.lte = new Date(filters.toDate);
      }
    }

    const totalItems = await prisma.transaction.count({ where });

    const transactions = await prisma.transaction.findMany({
      where,
      include: {
        category: true,
        user: true,
      },
      orderBy: { transactionDate: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return {
      data: transactions,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      page,
    };
  }

  async deleteTransaction(id: string) {
    const existingTransaction = await prisma.transaction.findUnique({
      where: { id },
    });

    if (!existingTransaction) {
      throw new Error("Transaction not found");
    }

    await prisma.transaction.delete({
      where: { id },
    });

    return true;
  }

  async findTransactionById(id: string) {
    return prisma.transaction.findUnique({
      where: { id },
    });
  }

  async updateTransaction(id: string, data: UpdateTransactionInput) {
    const existingTransaction = await prisma.transaction.findUnique({
      where: { id },
    });

    if (!existingTransaction) {
      throw new Error("Transaction not found");
    }

    return prisma.transaction.update({
      where: { id },
      data: {
        description: data.description ?? existingTransaction.description,
        transactionDate:
          data.transactionDate ?? existingTransaction.transactionDate,
        amount: data.amount ?? existingTransaction.amount,
        kind: data.kind ?? existingTransaction.kind,
        categoryId: data.categoryId ?? existingTransaction.categoryId,
      },
    });
  }

  async listTransactionsByCategory(categoryId: string, userId: string) {
    return prisma.transaction.findMany({
      where: { categoryId, userId },
    });
  }

  async listTransactionsByKind(kind: TransactionKind, userId: string) {
    return prisma.transaction.findMany({
      where: { kind, userId },
    });
  }

  async countTransactionsFromCategory(categoryId: string, userId: string) {
    return prisma.transaction.count({
      where: { categoryId, userId },
    });
  }

  async sumExpensesByCategory(categoryId: string, userId: string) {
    const result = await prisma.transaction.aggregate({
      where: {
        categoryId,
        userId,
        kind: "expense",
      },
      _sum: {
        amount: true,
      },
    });

    return result._sum.amount ?? 0;
  }
}
