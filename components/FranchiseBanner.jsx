import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const FranchiseBanner = (props) => {
  const { image, text, data } = props;
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="contain"
        alt="Franchise Banner"
      />
      <Text style={styles.text}>{text ? text : "Franchise"}</Text>
    </View>
  );
};

export default FranchiseBanner;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(228, 228, 228)",
    width: 110,
    paddingHorizontal: 10,
    height: "auto",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    marginHorizontal: 6,
    marginBottom: 20,
  },
  image: {
    width: 90,
    height: 100,
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 8,
  },
});
