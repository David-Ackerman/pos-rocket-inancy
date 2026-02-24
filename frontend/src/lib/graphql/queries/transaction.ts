import { gql } from "@apollo/client";

export const LIST_TRANSACTIONS = gql`
  query ListTransactions(
    $page: Int!
    $perPage: Int!
    $filters: TransactionFilterInput
  ) {
    listTransactions(page: $page, perPage: $perPage, filters: $filters) {
      data {
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
      totalItems
      totalPages
      page
    }
  }
`;
