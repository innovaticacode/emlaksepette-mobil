import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Categories({ category, iconName }) {

  if (category == "Projeler") {
    iconName="folder-home";
  }
  else if (category == "Konut") {
    iconName="home-group";
  }
  else if (category == "İş Yeri") {
    iconName="storefront";
  }
  else if (category == "Arsa") {
    iconName="terrain";
  }
  else if (category == "Tiny House") {
    iconName="hoop-house";
  }
  else if (category == "Bungalov") {
    iconName="tent";
  }
  else if (category == "Prefabrik Yapılar") {
    iconName="greenhouse";
  }
  else if (category == "Tatil Sepette") {
    iconName="island";
  }


  return (
    <View style={styles.category}>
      <View style={styles.iconTextContainer}>
        <Icon name={iconName} size={18} color="#333" />
        <Text style={styles.categoryText}>{category}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  category: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0,
    borderBottomColor: "#ebebeb",
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
});
