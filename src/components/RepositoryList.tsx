import useRepositories from "@/hooks/useRepositories";
import { FlatList, StyleSheet, Text, View } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

// const repositories: RepositoryItemProps[] = [
//   {
//     id: "jaredpalmer.formik",
//     fullName: "jaredpalmer/formik",
//     description: "Build forms in React, without the tears",
//     language: "TypeScript",
//     forksCount: 1589,
//     stargazersCount: 21553,
//     ratingAverage: 88,
//     reviewCount: 4,
//     ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
//   },
//   {
//     id: "rails.rails",
//     fullName: "rails/rails",
//     description: "Ruby on Rails",
//     language: "Ruby",
//     forksCount: 18349,
//     stargazersCount: 45377,
//     ratingAverage: 100,
//     reviewCount: 2,
//     ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/4223?v=4",
//   },
//   {
//     id: "django.django",
//     fullName: "django/django",
//     description: "The Web framework for perfectionists with deadlines.",
//     language: "Python",
//     forksCount: 21015,
//     stargazersCount: 48496,
//     ratingAverage: 73,
//     reviewCount: 5,
//     ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/27804?v=4",
//   },
//   {
//     id: "reduxjs.redux",
//     fullName: "reduxjs/redux",
//     description: "Predictable state container for JavaScript apps",
//     language: "TypeScript",
//     forksCount: 13902,
//     stargazersCount: 52869,
//     ratingAverage: 0,
//     reviewCount: 0,
//     ownerAvatarUrl: "https://avatars3.githubusercontent.com/u/13142323?v=4",
//   },
// ];

const ItemSeparator = () => <View style={styles.separator} />;

// Define the type for sort options
type SortOption =
  | "LATEST_REPOSITORIES"
  | "HIGHEST_RATED_REPOSITORIES"
  | "LOWEST_RATED_REPOSITORIES";

const RepositoryList = () => {
  const orderByOptions = {
    LATEST_REPOSITORIES: {
      orderBy: "CREATED_AT",
      orderDirection: "DESC",
    },
    HIGHEST_RATED_REPOSITORIES: {
      orderBy: "RATING_AVERAGE",
      orderDirection: "DESC",
    },
    LOWEST_RATED_REPOSITORIES: {
      orderBy: "RATING_AVERAGE",
      orderDirection: "ASC",
    },
  } as const; // Make this object constant

  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [sortBy, setSortBy] = useState<SortOption>("LATEST_REPOSITORIES");

  const handleSort = (value: SortOption) => {
    setSortBy(value);
    const { orderBy, orderDirection } = orderByOptions[value];
    setOrderBy(orderBy);
    setOrderDirection(orderDirection);
  };

  const { data, loading, error } = useRepositories({
    orderBy: orderBy,
    orderDirection: orderDirection,
  });

  const repositoryNodes = data
    ? data.repositories.edges.map((edge: any) => edge.node)
    : [];

  return (
    <View>
      {!!loading && <Text>Loading...</Text>}
      {!!error && <Text>Error...</Text>}
      <FlatList
        data={repositoryNodes}
        renderItem={({ item }) => <RepositoryItem {...item} />}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={() => (
          <View>
            <Picker selectedValue={sortBy} onValueChange={handleSort}>
              <Picker.Item
                label="Latest repositories"
                value="LATEST_REPOSITORIES"
              />
              <Picker.Item
                label="Highest rated repositories"
                value="HIGHEST_RATED_REPOSITORIES"
              />
              <Picker.Item
                label="Lowest rated repositories"
                value="LOWEST_RATED_REPOSITORIES"
              />
            </Picker>
          </View>
        )}
      />
    </View>
  );
};

export default RepositoryList;
