import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/Fontisto";
export default function Favorite() {
  return (
    <View
      style={{
        width: "100%",
        padding: 10,
        display: "flex",
        gap: 0,
        marginTop: 0,
      }}
    >
      <View style={styles.cards}>
        <View style={{ width: "25%", height: 100, flex: 1 }}>
          <ImageBackground
            source={require("../images/home.jpg")}
            resizeMode="cover"
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          />
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <Text>Master Realtor'den Kuruçeşme Hatip Köyde 2+1 daire</Text>
          <Text style={{ color: "red", fontSize: 20, fontWeight: 600 }}>
            2.500.000
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            display:"flex",
            justifyContent: "space-between",
            padding: 10,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              fontSize: 16,
              fontWeight: 400,
              borderWidth: 1,
              borderColor: "#FF7373",
              width: 100,
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 5,
              paddingBottom: 5,
              color: "white",
              textAlign: "center",
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                fontWeight: 600,
              }}
            >
              Sil <Icon name="delete" size={20} color={"#FF7373"} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{}}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                backgroundColor: "blue",
                width: 100,
                borderRadius: 5,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 5,
                paddingBottom: 5,
                color: "white",
                textAlign: "center",
              }}
            >
              Sepete Ekle
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cards: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E6E7EC",
    borderRadius: 5,
    padding: 10,
    // ...Platform.select({
    //   ios: {
    //     shadowColor: " #e6e6e6",
    //     shadowOffset: { width: 1, height: 1 },
    //     shadowOpacity: 0.1,
    //     shadowRadius: 5,
    //   },
    //   android: {
    //     elevation: 5,
    //   },
    // }),
  },
});
