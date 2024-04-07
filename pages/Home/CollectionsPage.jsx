import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import CollectionsItem from "./ProfilePages/profileComponents/CollectionsItem";

export default function CollectionsPage() {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{}}
        showsVerticalScrollIndicator={false}
      >
        <CollectionsItem />
        <CollectionsItem />
        <CollectionsItem />
        <CollectionsItem />
        <CollectionsItem />
        <CollectionsItem />
        <CollectionsItem />
        <CollectionsItem />
        <CollectionsItem />
        <CollectionsItem />
        <CollectionsItem />
        <CollectionsItem />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: 140,
    height: "100%",
  },
});
