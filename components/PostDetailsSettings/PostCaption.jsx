import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import ShoppinInfo from "../ShoppinInfo";
import HTML from "react-native-render-html";
import { Platform } from "react-native";
export default function PostCaption({ data }) {
  const caption = data?.project?.description;
  function veriParseEt(veri) {
    try {
      // Veriyi JSON olarak parse et
      var jsonVeri = JSON.parse(veri);
      return true;
    } catch (hata) {
      // Eğer veri JSON formatında değilse, hata alırız
      return false;
      // Burada başka bir işlem yapabiliriz, örneğin orijinal veriyi geri döndürebiliriz
      // veya hiçbir işlem yapmayabiliriz.
    }
  }
  return (
    <View >
      <View style={[styles.card, styles.shadowProp]} indicatorStyle="white">
      
          <HTML
            source={{ html: data?.project?.description }}
            contentWidth={100}
          />
       
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",

    paddingHorizontal: 6,
    width: "100%",

    height: "auto",
    borderWidth: 0.7,
    borderColor: "#e6e6e6",
    ...Platform.select({
      ios: {
        shadowColor: " #e6e6e6",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
