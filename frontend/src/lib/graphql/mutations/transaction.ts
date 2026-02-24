import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($data: CreateTransactionInput!) {
    createTransaction(data: $data) {
      id
      description
      transactionDate
      amount
      kind
      categoryId
      category {
        id
        title
        description
        color
        icon
      }
      userId
      user {
        id
        name
        email
      }
      createdAt
      updatedAt
    }
  }
`;
