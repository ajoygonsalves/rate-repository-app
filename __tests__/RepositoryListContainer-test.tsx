import RepositoryList from "@/components/RepositoryList";
import { render, screen, waitFor } from "@testing-library/react-native";
import { MockedProvider } from "@apollo/client/testing";
import { GET_REPOSITORIES } from "@/graphql/queries";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", async () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      const mocks = [
        {
          request: {
            query: GET_REPOSITORIES,
          },
          result: {
            data: {
              repositories: {
                ...repositories,
              },
            },
          },
        },
      ];

      render(
        <MockedProvider mocks={mocks}>
          <RepositoryList />
        </MockedProvider>,
      );

      await waitFor(() => {
        expect(screen.getAllByTestId("fullName")).toBeDefined();
        expect(screen.getAllByTestId("fullName")[0].props.children).toBe(
          "jaredpalmer/formik",
        );
        expect(screen.getAllByTestId("description")[0].props.children).toBe(
          "Build forms in React, without the tears",
        );
        expect(screen.getAllByTestId("language")[0].props.children).toBe(
          "TypeScript",
        );
        expect(screen.getAllByTestId("stargazersCount")[0].props.children).toBe(
          "21.9k",
        );
        expect(screen.getAllByTestId("forksCount")[0].props.children).toBe(
          "1.6k",
        );
        expect(screen.getAllByTestId("reviewCount")[0].props.children).toBe(3);
      });
    });
  });
});
