import theme from "@/theme";
import { AppBarTabProps } from "@/types/types";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold as "bold",
  },
});

const AppBarTab = (props: AppBarTabProps) => {
  return (
    <Link onPress={props.onPress} to={props.to}>
      <Text style={styles.text}>{props.tabName}</Text>
    </Link>
  );
};

export default AppBarTab;
