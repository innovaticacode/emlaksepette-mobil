import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import Favorite from "../../components/Favorite";
import Test from "./Test";

import RealtorPostFavorited from "../../components/RealtorPostFavorited";

export default function Favorites() {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{}}
        showsVerticalScrollIndicator={false}
      >
        <RealtorPostFavorited price="12323" m2="20" />
        <RealtorPostFavorited price="12323" m2="20" />
        <RealtorPostFavorited price="12323" m2="20" />
        <RealtorPostFavorited price="12323" m2="20" />
        <RealtorPostFavorited price="12323" m2="20" />
        <RealtorPostFavorited price="12323" m2="20" />
        <RealtorPostFavorited price="12323" m2="20" />
        <RealtorPostFavorited price="12323" m2="20" />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
    padding: 1,
    height: "100%",
  },
});
