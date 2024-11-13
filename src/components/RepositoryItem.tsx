import { View, Text } from "react-native";
import { RepositoryItemProps } from "@/types/types";

const RepositoryItem = (props: RepositoryItemProps) => {
  return (
    <View>
      <Text>Full Name: {props.fullName}</Text>
      <Text>Description: {props.description}</Text>
      <Text>Language: {props.language}</Text>
      <Text>Forks: {props.forksCount}</Text>
      <Text>Reviews: {props.reviewCount}</Text>
      <Text>Rating: {props.ratingAverage}</Text>
    </View>
  );
};

export default RepositoryItem;
