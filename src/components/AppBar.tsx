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
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
        <AppBarTab tabName="Repositories" />
        <AppBarTab tabName="Sign In" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
