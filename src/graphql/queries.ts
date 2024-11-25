import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query GetRepositories {
    repositories {
      edges {
        node {
          id
          fullName
          description
          forksCount
          language
          reviewCount
          ownerAvatarUrl
          ratingAverage
          stargazersCount
        }
      }
    }
  }
`;
