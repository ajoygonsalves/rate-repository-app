import { GET_REVIEWS } from "@/graphql/queries";
import theme from "@/theme";
import { useQuery } from "@apollo/client";
import { FlatList, StyleSheet, Text, View } from "react-native";

const ReviewItem = ({ review }: { review: any }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{review.node.rating}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.username}>{review.node.user.username}</Text>
        <Text style={styles.createdAt}>
          {new Date(review.node.createdAt).toLocaleDateString()}
        </Text>
        <Text style={styles.text}>{review.node.text}</Text>
      </View>
    </View>
  );
};

const SingleRepositoryReview = ({
  respositoryId,
}: {
  respositoryId: string | undefined;
}) => {
  const { data, loading, error } = useQuery(GET_REVIEWS, {
    variables: { repositoryId: respositoryId },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching reviews</Text>;
  if (!respositoryId) return <Text>No repository ID</Text>;

  const reviews = data?.repository?.reviews?.edges;

  return (
    <View>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={(item) => item.node.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        style={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
  },
  reviewContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#e1e4e8",
  },
  ratingContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    marginRight: 10,
  },
  rating: {
    fontSize: 16,
    fontWeight: theme.fontWeights.bold as "bold",
    color: theme.colors.primary,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  username: {
    fontSize: 16,
    fontWeight: theme.fontWeights.bold as "bold",
    marginBottom: 5,
  },
  createdAt: {
    fontSize: 12,
    color: "#586069",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
  separator: {
    height: 10,
  },
});

export default SingleRepositoryReview;
