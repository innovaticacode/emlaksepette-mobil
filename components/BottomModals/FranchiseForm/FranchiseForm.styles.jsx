import { Dimensions, StyleSheet } from "react-native";
const screenHeight = Dimensions.get("screen").height;
const actionSheetHeight = screenHeight * 0.71;
export const styles = StyleSheet.create({
  container: {
    width: "94%",
    height: actionSheetHeight,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headText: {
    color: "#EA2B2E",
    fontSize: 12,
    fontweight: "600",
    lineHeight: 14,
  },
  seperator: {
    height: 1,
    width: "100%",
    backgroundColor: "#EA2B2E",
    marginVertical: 8,
  },
  inputBody: {
    gap: 10,
    marginTop: 10,
  },
  inputInfo: {
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#606060",
    borderRadius: 4,
    padding: 8,
    height: 40,
  },
  messageInput: {
    height: 160,
    borderWidth: 1,
    borderColor: "#606060",
    borderRadius: 4,
    padding: 8,
  },
});
