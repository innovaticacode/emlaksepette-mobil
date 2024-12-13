import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";

export default function ShowContracts() {
  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ uri: "https://emlaksepette.com/sozlesmeler" }}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
