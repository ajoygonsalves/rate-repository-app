import { GET_REPOSITORIES } from "@/graphql/queries";
import { useQuery } from "@apollo/client";

const useRepositories = ({
  orderBy = "CREATED_AT",
  orderDirection = "DESC",
}: {
  orderBy: string;
  orderDirection: string;
}) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      orderBy: orderBy,
      orderDirection: orderDirection,
    },
  });
  return { data, error, loading };
};

export default useRepositories;
