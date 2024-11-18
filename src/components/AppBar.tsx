import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: theme.colors.primary,
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
});

const AppBar = () => {
  return (
    <View style={[styles.container]}>
      <AppBarTab tabName="Repositories" />
      <AppBarTab tabName="Sign In" />
    </View>
  );
};

export default AppBar;
