import { GET_REPOSITORIES } from "@/graphql/queries";
import { useQuery } from "@apollo/client";

const useRepositories = ({
  orderBy = "CREATED_AT",
  orderDirection = "DESC",
  searchKeyword = "",
  first = 10,
  after,
}: {
  orderBy: "CREATED_AT" | "RATING_AVERAGE";
  orderDirection: "ASC" | "DESC";
  searchKeyword: string | undefined;
  first?: number;
  after?: string;
}) => {
  const { data, error, loading, fetchMore, ...result } = useQuery(
    GET_REPOSITORIES,
    {
      fetchPolicy: "cache-first",
      variables: {
        orderBy,
        orderDirection,
        searchKeyword,
        first,
        after,
      },
      notifyOnNetworkStatusChange: true,
    },
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
      },
    });
  };

  return { data, error, loading, fetchMore: handleFetchMore, ...result };
};

export default useRepositories;
