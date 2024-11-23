import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Image, Text, StyleSheet } from "react-native";

const FranchiseBanner = (props) => {
  const { image, text, data, onPress } = props;
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="contain"
        alt="Franchise Banner"
      />
      <Text style={styles.text}>{text ? text : "Franchise"}</Text>
      <TouchableOpacity
        style={styles.apply}
        activeOpacity={0.8}
        onPress={() => onPress()}
      >
        <Text style={styles.btnText}>Hemen Başvur</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FranchiseBanner;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "rgb(228, 228, 228)",
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#ffffff",

    borderColor: "#E4E4E4",
    borderRadius: 10,
    padding: 8,
    paddingHorizontal: 10,
    height: "auto",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    marginHorizontal: 6,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
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
    fontSize: 10,
  },
  apply: {
    backgroundColor: "#EA2C2E",
    padding: 9,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  btnText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 11,
  },
});
