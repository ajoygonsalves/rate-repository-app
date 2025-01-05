import { DELETE_REVIEW, ME } from "@/graphql/queries";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import React from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigate } from "react-router-native";
import { ReviewItem } from "./SingleRepositoryReview";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1e4e8",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    color: "white",
  },
  viewRepositoryButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    color: "white",
  },
});

export const MyReviews = () => {
  const { data, loading, error } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: true },
  });

  const client = useApolloClient();

  const [mutate] = useMutation(DELETE_REVIEW, {
    onCompleted: () => {
      client.refetchQueries({ include: [ME] });
    },
  });

  const navigate = useNavigate();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.me?.reviews?.edges}
        renderItem={({ item }) => {
          return (
            <View>
              <ReviewItem review={item} />
              <View style={styles.buttonContainer}>
                <Pressable
                  onPress={() => {
                    Alert.alert("Delete Review", "Are you sure?", [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "Delete",
                        onPress: () => {
                          mutate({
                            variables: { deleteReviewId: item.node.id },
                          });
                        },
                      },
                    ]);
                  }}
                  style={styles.deleteButton}
                >
                  <Text>Delete</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    navigate(`/repository/${item.node.repository.id}`);
                  }}
                  style={styles.viewRepositoryButton}
                >
                  <Text>View Repository</Text>
                </Pressable>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};
