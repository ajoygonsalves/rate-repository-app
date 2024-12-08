import { GET_REPOSITORIES } from "@/graphql/queries";
import { useQuery } from "@apollo/client";

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES);
  return { data, error, loading };
};

export default useRepositories;
