import useRepositories from "@/hooks/useRepositories";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useDebounce } from "use-debounce";

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
  } as const;

  const [orderBy, setOrderBy] = useState<"CREATED_AT" | "RATING_AVERAGE">(
    "CREATED_AT",
  );
  const [orderDirection, setOrderDirection] = useState<"ASC" | "DESC">("DESC");
  const [sortBy, setSortBy] = useState<SortOption>("LATEST_REPOSITORIES");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [debouncedSearch] = useDebounce(searchKeyword, 500);

  const handleSort = (value: SortOption) => {
    setSortBy(value);
    const { orderBy, orderDirection } = orderByOptions[value];
    setOrderBy(orderBy);
    setOrderDirection(orderDirection);
  };

  const { data, loading, error, fetchMore } = useRepositories({
    orderBy: orderBy,
    orderDirection: orderDirection,
    searchKeyword: debouncedSearch,
    first: 8,
  });

  const handleEndReached = () => {
    fetchMore();
  };

  const repositoryNodes = data
    ? data?.repositories.edges.map((edge: any) => edge.node)
    : [];

  return (
    <View>
      {!!loading && <Text>Loading...</Text>}
      {!!error && <Text>Error...</Text>}

      <TextInput
        placeholder="Search repositories"
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
        value={searchKeyword}
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        autoCapitalize="none"
      />
      <FlatList
        data={repositoryNodes}
        renderItem={({ item }) => <RepositoryItem {...item} />}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
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
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          loading ? <Text>Loading more...</Text> : null
        }
      />
    </View>
  );
};

export default RepositoryList;
