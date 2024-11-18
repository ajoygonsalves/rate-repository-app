import theme from "@/theme";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { AppBarTabProps } from "@/types/types";

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold as "bold",
  },
});

const AppBarTab = (props: AppBarTabProps) => {
  return (
    <Pressable onPress={() => console.log(props.tabName)}>
      <Text style={styles.text}>{props.tabName}</Text>
    </Pressable>
  );
};

export default AppBarTab;
