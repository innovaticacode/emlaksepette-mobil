import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import TestFranchise from "../assets/test-franchise.png";

const FranchiseBanner = (props) => {
  const { image, text } = props;
  return (
    <React.Fragment>
      <View style={styles.container}>
        <Image
          source={image ? image : TestFranchise}
          style={styles.image}
          resizeMode="contain"
          alt="Franchise Banner"
        />
        <Text style={styles.text}>{text ? text : "Franchise"}</Text>
      </View>
    </React.Fragment>
  );
};

export default FranchiseBanner;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(228, 228, 228)",
    width: 110,
    height: "auto",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
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
