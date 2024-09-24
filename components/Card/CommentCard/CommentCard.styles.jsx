import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    borderColor: "#e6e6e6",
    borderWidth: 1,
    borderRadius: 4,
  },

  card: {
    width: "100%",
    minWidth: 300,
    padding: 10,
    gap: 10,
    height: "auto",
    backgroundColor: "#F8F9FA",
  },
  desc: {
    flexDirection: "column",
    gap: 4,
  },
  star: {
    flexDirection: "row",
    gap: 4,
  },
  head: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 4,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgb(51, 51, 51)",
  },
  addres: {
    color: "rgb(157, 157, 157)",
    fontSize: 14,
    fontWeight: "400",
  },
  desc: {
    fontSize: 12,
    color: "#000",
    fontWeight: "400",
  },
  descCont: {
    flexDirection: "column",
    gap: 4,
  },
});
