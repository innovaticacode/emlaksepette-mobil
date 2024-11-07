import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    width: "94%", // Set width to 32px less than screen width
    height: "86%", // Set height to 80% of screen height
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  seperator: {
    backgroundColor: "#EEEEEE",
    height: 1,
    width: "100%",
    marginVertical: 8,
  },
  area: {
    flexDirection: "row",
  },
  tokerize: {
    flexWrap: "wrap",
    fontWeight: "600",
    fontSize: 14,
    color: "#000000",
  },
  text: {
    flexWrap: "wrap",
    fontWeight: "500",
    fontSize: 14,
    color: "#000000",
  },
});
