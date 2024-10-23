import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  activeBody: {
    borderWidth: 1,
    borderColor: "#EA2B2E",
    borderRadius: 4,
    padding: 6,
    paddingHorizontal: 8,
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
    paddingHorizontal: 8,
    padding: 6,
    marginRight: 4,
    marginVertical: 4,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  starBody: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  count: {
    fontSize: 10,
    color: "#777777",
  },
});
