import { Dimensions, StyleSheet } from "react-native";
const screenHeight = Dimensions.get("screen").height;
const actionSheetHeight = screenHeight * 0.86;

export const styles = StyleSheet.create({
  container: {
    width: "94%",
    height: actionSheetHeight,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
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
  input: {
    borderWidth: 1,
    borderColor: "#606060",
    borderRadius: 4,
    minHeight: 40,
    height: "auto",
    padding: 4,
  },
  boldText: {
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 14,
    color: "#0C0C0C",
  },
  thinText: {
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 14,
    color: "#0C0C0C",
  },
  inputBody: {
    marginTop: 10,
    gap: 8,
  },
  checkBox: {
    width: "100%",
    padding: 0,
    marginLeft: 0,
    marginRight: 0,
    justifyContent: "center",
  },
  infoArea: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  statistic: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F4F4F4",
    padding: 8,
    alignItems: "center",
  },
  pointer: {
    marginTop: 6,
  },
  stars: {
    flexDirection: "row",
    alignItems: "center",
  },
});
