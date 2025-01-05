import { ME } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import React from "react";
import { View, Text, FlatList } from "react-native";
import { ReviewItem } from "./SingleRepositoryReview";

export const MyReviews = () => {
  const { data, loading, error } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: true },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View>
      <FlatList
        data={data?.me?.reviews?.edges}
        renderItem={({ item }) => <ReviewItem review={item} />}
      />
    </View>
  );
};
