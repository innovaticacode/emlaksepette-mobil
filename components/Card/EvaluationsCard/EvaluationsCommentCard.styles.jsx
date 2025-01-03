import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#EBEBEB",
    borderRadius: 8,
    width: "100%",
    padding: 10, // Ekstra padding
    height: "auto",
    marginVertical: 6,
  },
  body: {
    flexDirection: "row",
  },
  mainImage: {
    width: 46,
    height: 46,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: "#D9D9D9",
  },
  title: {
    fontWeight: "400",
    marginBottom: 5,
    fontSize: 11,
    flexWrap: "wrap",
    // color: "#606060",
    color: "#000000",
  },
  star: {
    flexDirection: "row",
    alignItems: "center",
  },
  desc: {
    flexShrink: 1,
    flexWrap: "wrap",
    marginTop: 5,
    fontSize: 14,
    color: "#000000",
  },
  info: {
    marginTop: 5,
    color: "#777",
    fontSize: 10,
  },
  multiImage: {
    width: 60,
    height: 54,
    marginRight: 10,
    borderRadius: 2,
    backgroundColor: "#D9D9D9",
  },
});
