import { View, Text } from "react-native";
import React from "react";
import WebView from "react-native-webview";
import { useRoute } from "@react-navigation/native";

export default function ShowContracts() {
  const route = useRoute();
  const { filePath } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        source={{
          uri: `https://docs.google.com/gview?url=${encodeURIComponent(
            filePath
          )}&embedded=true`,
        }}
        style={{ flex: 1 }}
      />
    </View>
  );
}
