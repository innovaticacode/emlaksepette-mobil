import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("window");

const SeeMyNeighbor = () => {
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.mainContainer2}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require("../../../images/KomsumuGor2.png")}
          ></Image>
          <Text style={styles.bigTitle}>
            <Text style={styles.bigTitleRed}> "Komşunu Gör" </Text> ile Yeni
            Komşularınızla Tanışın, Güvenle Yatırım Yapın!
          </Text>
          <Text style={styles.mainContent}>
            EmlakSepette.com, inşaat projelerinden mülk satın alan kişilere,
            komşularıyla tanışma ve etkileşim kurma imkânı sunar. "Komşunu Gör"
            özelliği sayesinde, aynı projeden mülk alan diğer kişilerle
            iletişime geçebilir, onların deneyimlerinden faydalanarak daha
            bilinçli kararlar alabilirsiniz.
          </Text>
        </View>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    showsVerticalScrollIndicator: false,
    alignContent: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  image: {
    width: width * 0.65, // ekran genişliğinin %80'i
    height: height * 0.28,
    margin: 20,
  },
  bigTitle: {
    fontWeight: "700",
    fontSize: 25,
    textAlign: "center",
    color: "black",
    marginHorizontal: 35,
    marginVertical: 20,
    fontFamily: "Inter",
  },
  bigTitleRed: {
    color: "#EA2B2E",
  },
  mainContent: {
    textAlign: "center",
    marginHorizontal: 40,
    marginVertical: 10,
    fontWeight: "400",
    padding: 5,
    fontSize: 18,
    margin: 20,
  },
});
export default SeeMyNeighbor;
