import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  tabText: {
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 20,
  },
  tabIndicator: {
    backgroundColor: "#EA2B2E",
    height: 1,
  },
  tabBg: {
    backgroundColor: "#FFF",
  },
  loading: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
});
