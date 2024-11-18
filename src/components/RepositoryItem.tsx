import { View, Text, StyleSheet, Image } from "react-native";
import { RepositoryItemProps } from "@/types/types";
import theme from "@/theme";

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
});

const RepositoryItem = (props: RepositoryItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageAndTextContainer}>
        <Image source={{ uri: props.ownerAvatarUrl }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.fullName}>{props.fullName}</Text>
          <Text style={styles.description}>{props.description}</Text>
          <Text style={styles.badge}>{props.language}</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {props.stargazersCount > 1000
              ? `${(props.stargazersCount / 1000).toFixed(1)}k`
              : props.stargazersCount}
          </Text>
          <Text style={styles.statLabel}>Stars</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {props.forksCount >= 1000
              ? `${(props.forksCount / 1000).toFixed(1)}k`
              : props.forksCount}
          </Text>
          <Text style={styles.statLabel}>Forks</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statValue}>{props.reviewCount}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statValue}>{props.ratingAverage}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
