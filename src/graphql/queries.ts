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

export const ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

export const GET_SINGLE_REPOSITORY = gql`
  query GetSingleRespoitory($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      description
      forksCount
      language
      reviewCount
      ownerAvatarUrl
      ratingAverage
      stargazersCount
      url
      reviews {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;

export const GET_REVIEWS = gql`
  query GET_REVIEWS($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;
