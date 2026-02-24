import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      user {
        id
        email
        name
        createdAt
        updatedAt
      }
      token
      refreshToken
    }
  }
`;
