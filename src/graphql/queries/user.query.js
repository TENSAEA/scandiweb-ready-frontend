import { gql } from "@apollo/client";

export const GET_AUTH_USER = gql`
  query AuthUser {
    authUser {
      _id
      username
    }
  }
`;
