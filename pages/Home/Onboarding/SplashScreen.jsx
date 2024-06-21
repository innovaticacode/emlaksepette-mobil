import { View, Text, ImageBackground } from "react-native";
import React from "react";

export default function SplashScreen() {
  return (
    <View
      style={{
        backgroundColor: "#F5F5F7",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 150,
      }}
    >
      <View style={{ flex: 1 / 2, justifyContent: "flex-end" }}>
        <View style={{ width: 300, height: 100 }}>
          <ImageBackground
            source={require("./emlaksepettelogo.png")}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        </View>
      </View>

      <View
        style={{ flex: 1 / 2, justifyContent: "center", alignItems: "center" }}
      >
        <View style={{ width: 70, height: 70 }}>
          <ImageBackground
            source={require("./KodTurk.png")}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        </View>
        <Text style={{ color: "grey", fontWeight: "300", textAlign: "center" }}>
          Tarafından
        </Text>
      </View>
    </View>
  );
}
