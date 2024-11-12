import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: "auto",
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
    minHeight: 130,
  },
  headTextArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
  },
  title: {
    color: "#000000",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 24,
  },
  address: {
    color: "#000000",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 24,
  },
  date: {
    fontWeight: "500",
    color: "#5B5B5B",
  },
  message: {
    color: "#000000",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 24,
  },
  desc: {
    flex: 1,
    color: "#000000",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 24,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
    flex: 1,
  },

  descView: {
    flexDirection: "row",
  },
});
