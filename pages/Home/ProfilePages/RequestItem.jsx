import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Platform } from "react-native";
export default function RequestItem({ openModal, item, getDetails, index }) {
  return (
    <View style={style.container}>
      <View>
        <View style={{ gap: 30 }}>
          <View style={{ gap: 20 }}>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ebebeb",
                paddingBottom: 5,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingRight: 10,
              }}
            >
              <View>
                <Text style={{ color: "#333" }}>
                  <Text style={{ fontWeight: "bold" }}>Ad:</Text>
                  {item.ad}
                </Text>
              </View>
            </View>

            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ebebeb",
                paddingBottom: 5,
              }}
            >
              <Text style={{ color: "#333" }}>
                <Text style={{ fontWeight: "bold" }}>Soyad:</Text>
                {item.soyad}
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ebebeb",
                paddingBottom: 5,
              }}
            >
              <Text style={{ color: "#333" }}>
                <Text style={{ fontWeight: "bold" }}>Telefon:</Text>
                {item.telefon}
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ebebeb",
                paddingBottom: 5,
              }}
            >
              <Text style={{ color: "#333" }}>
                {" "}
                <Text style={{ fontWeight: "bold" }}>Email: </Text>
                {item.email}
              </Text>
            </View>
          </View>
          <View style={{}}>
            <TouchableOpacity
              style={{
                backgroundColor: "#E54242",
                padding: 10,
                borderRadius: 6,
              }}
              onPress={() => {
                getDetails(item.id, index);
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 13,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Detaylar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    paddingVertical: 30,
    paddingHorizontal: 10,
    width: "100%",

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
  profileImage: {
    width: 55,
    height: 50,
  },
  ProfileName: {
    flex: 1.3 / 2,
  },
});
