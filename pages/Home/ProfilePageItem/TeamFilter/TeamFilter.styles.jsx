import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    flex: 1,
  },
  body: {
    gap: 10,
  },
  main: {
    gap: 16,
  },
  pickerContanier: {
    borderWidth: 1,
    borderColor: "#606060",
    borderRadius: 4,
    backgroundColor: "#FFF",
    height: 40,
    justifyContent: "center",
  },
  btn: {
    height: 40,
  },
  clearText: {
    color: "#EA2B2E",
    textDecorationLine: "underline",
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 14,
    textAlign: "center",
  },
  inputTitle: {
    color: "#0C0C0C",
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "600",
  },
});
