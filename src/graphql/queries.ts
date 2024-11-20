import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query {
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
