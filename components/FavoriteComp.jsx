import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function FavoriteComp() {
  return (
    <View style={styles.area}>
      <View style={{ backgroundColor: "red" }}>
        <Text>asd</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    paddingRight: 20,
    backgroundColor: "#eaeaea",
  },
});
