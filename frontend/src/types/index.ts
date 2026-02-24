export interface User {
  id: string;
  email: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface PaginatedTransactions {
  data: Transaction[];
  totalItems: number;
  totalPages: number;
  page: number;
}

export interface Transaction {
  id: string;
  description: string;
  transactionDate: string;
  amount: number;
  kind: "expense" | "income";
  categoryId: string;
  category: Category;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  title: string;
  description?: string;
  color: string;
  icon: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  transactionsCount: number;
  totalSpent: number;
  createdAt?: string;
  updatedAt?: string;
}
