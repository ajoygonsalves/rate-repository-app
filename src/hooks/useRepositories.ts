import { GET_REPOSITORIES } from "@/graphql/queries";
import { useQuery } from "@apollo/client";

const useRepositories = ({
  orderBy = "CREATED_AT",
  orderDirection = "DESC",
  searchKeyword,
}: {
  orderBy: string;
  orderDirection: string;
  searchKeyword: string | undefined;
}) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      orderBy: orderBy,
      orderDirection: orderDirection,
      searchKeyword: searchKeyword,
    },
    notifyOnNetworkStatusChange: true,
  });
  return { data, error, loading };
};

export default useRepositories;
