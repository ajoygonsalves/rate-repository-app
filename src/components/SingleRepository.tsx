import { GET_SINGLE_REPOSITORY } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { Text, View } from "react-native";
import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import SingleRepositoryReview from "./SingleRepositoryReview";

const SingleRepository = () => {
  let { repositoryId } = useParams();

  const { data, loading, error } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { repositoryId },
    fetchPolicy: "cache-and-network",
  });

  const repository = data?.repository;

  if (!repository) {
    return <Text>Repository not found</Text>;
  }

  if (error) {
    return <Text>Error fetching repository</Text>;
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  console.dir(data, { depth: null });

  return (
    <View style={{ flex: 1 }}>
      <RepositoryItem {...repository} />
      <SingleRepositoryReview respositoryId={repositoryId} />
    </View>
  );
};

export default SingleRepository;
