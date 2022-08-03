import { gql } from "@apollo/client";

export const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;

export const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      name
      description
      status
      createdAt
      updatedAt
      client {
        id
        name
        email
      }
    }
  }
`;
