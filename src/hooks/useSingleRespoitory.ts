import { GET_SINGLE_REPOSITORY } from "@/graphql/queries";
import { useQuery } from "@apollo/client";

const useSingleRepository = ({ repositoryId }: { repositoryId: string }) => {
  const { data, error, loading } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: {
      repositoryId,
    },
  });
  return { data, error, loading };
};

export default useSingleRepository;
