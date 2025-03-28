import { gql } from "@apollo/client";

export const GET_Todo = gql`
  query Todo($todoId: ID!) {
    todo(id: $todoId) {
      id
      createdAt
      completed
      title
      updatedAt
    }
  }
`;

export const GET_TODOS = gql`
  query GetTodos($userID: ID!) {
    todos(userID: $userID) {
      id
      title
      completed
      createdAt
      updatedAt
    }
  }
`;
