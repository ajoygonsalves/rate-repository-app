import { ME } from "@/graphql/queries";
import useSignOut from "@/hooks/useSignOut";
import { useQuery } from "@apollo/client";
import Constants from "expo-constants";
import { ScrollView, StyleSheet, View } from "react-native";
import theme from "../theme";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: theme.colors.primary,
  },
  scrollViewContent: {
    gap: 10,
  },
});

const AppBar = () => {
  const { data } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
  });

  const signOut = useSignOut();

  const handleSignOut = async () => {
    await signOut();
  };

  const isLoggedIn = !!data?.me;

  const authenticatedTabs = [
    <AppBarTab to="/add-review" tabName="Add Review" key="add-review" />,
    <AppBarTab
      onPress={handleSignOut}
      to="/"
      tabName="Sign Out"
      key="sign-out"
    />,
  ];

  const unauthenticatedTabs = [
    <AppBarTab to="/sign-in" tabName="Sign In" key="sign-in" />,
    <AppBarTab to="/sign-up" tabName="Sign Up" key="sign-up" />,
  ];

  const tabs = isLoggedIn ? authenticatedTabs : unauthenticatedTabs;

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
        <AppBarTab to="/" tabName="Repositories" key="repositories" />
        {tabs}
      </ScrollView>
    </View>
  );
};

export default AppBar;
