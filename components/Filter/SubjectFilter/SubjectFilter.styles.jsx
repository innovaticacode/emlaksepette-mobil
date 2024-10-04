import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  activeBody: {
    borderWidth: 1,
    borderColor: "#EA2B2E",
    borderRadius: 4,
    padding: 6,
    shadowColor: "#EA2B2E",
    marginRight: 4,
    marginVertical: 4,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    borderWidth: 1,
    borderColor: "#E4E4E4",
    borderRadius: 4,
    padding: 6,
    marginRight: 4,
    marginVertical: 4,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  activeText: {
    color: "#EA2B2E",
    fontWeight: "500",
    fontSize: 10,
    lineHeight: 12,
  },
  text: {
    color: "#B0B0B0",
    fontWeight: "500",
    fontSize: 10,
    lineHeight: 12,
  },
});
