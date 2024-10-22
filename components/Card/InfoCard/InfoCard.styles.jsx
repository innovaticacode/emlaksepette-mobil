import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 130,
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    lineHeight: 24,
  },
  subTitle: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
    lineHeight: 20,
  },
  date: {
    color: "#5B5B5B",
    fontSize: 14,
    fontWeight: "500",
  },
  descBody: {
    flexDirection: "row",
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  desc: {
    flexShrink: 1,
    width: "100%",
    fontSize: 14,
    fontWeight: "500",
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightArea: {
    justifyContent: "space-between",
    alignItems: "center",
  },
});
