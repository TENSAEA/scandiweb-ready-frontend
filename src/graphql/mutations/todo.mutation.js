import { gql } from "@apollo/client";

export const CREATE_TODO = gql`
  mutation CreateTodo($title: String!, $userID: ID!) {
    createTodo(title: $title, userID: $userID) {
      completed
      id
      userID
      title
      updatedAt
      createdAt
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $title: String, $completed: Boolean) {
    updateTodo(id: $id, title: $title, completed: $completed) {
      completed
      id
      title
      updatedAt
      createdAt
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      completed
      id
      title
      updatedAt
      createdAt
    }
  }
`;
