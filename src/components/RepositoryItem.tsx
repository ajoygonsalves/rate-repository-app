import theme from "@/theme";
import { RepositoryItemProps } from "@/types/types";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigate } from "react-router-native";
import * as Linking from "expo-linking";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  imageAndTextContainer: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    gap: 8,
  },
  fullName: {
    fontSize: 16,
    fontWeight: theme.fontWeights.bold as "bold",
  },
  description: {
    color: "#586069",
    fontSize: 14,
    marginBottom: 4,
  },
  badge: {
    backgroundColor: "#0366d6",
    borderRadius: 4,
    color: "white",
    padding: 5,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontWeight: theme.fontWeights.bold as "bold",
    marginBottom: 4,
  },
  statLabel: {
    color: "#586069",
    fontSize: 13,
  },
  openButton: {
    backgroundColor: "#0366d6",
    borderRadius: 4,
    color: "white",
    padding: 10,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
    width: "100%",
    marginTop: 10,
    textAlign: "center",
    fontWeight: theme.fontWeights.bold as "bold",
  },
});

const RepositoryItem = (props: RepositoryItemProps) => {
  const navigate = useNavigate();

  return (
    <Pressable onPress={() => navigate(`/repository/${props.id}`)}>
      <View style={styles.container}>
        <View style={styles.imageAndTextContainer}>
          <Image source={{ uri: props.ownerAvatarUrl }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.fullName} testID="fullName">
              {props.fullName}
            </Text>
            <Text style={styles.description} testID="description">
              {props.description}
            </Text>
            <Text style={styles.badge} testID="language">
              {props.language}
            </Text>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue} testID="stargazersCount">
              {props.stargazersCount > 1000
                ? `${(props.stargazersCount / 1000).toFixed(1)}k`
                : props.stargazersCount}
            </Text>
            <Text style={styles.statLabel}>Stars</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue} testID="forksCount">
              {props.forksCount >= 1000
                ? `${(props.forksCount / 1000).toFixed(1)}k`
                : props.forksCount}
            </Text>
            <Text style={styles.statLabel}>Forks</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue} testID="reviewCount">
              {props.reviewCount}
            </Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue} testID="ratingAverage">
              {props.ratingAverage}
            </Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        {props.url && (
          <Pressable onPress={async () => await Linking.openURL(props.url)}>
            <Text style={styles.openButton}>Open in GitHub</Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

export default RepositoryItem;
