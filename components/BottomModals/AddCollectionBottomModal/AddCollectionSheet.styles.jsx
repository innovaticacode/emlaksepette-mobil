import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingTop: 24,
    gap: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#ebebeb",
  },
  addCollectionText: {
    color: "#19181C",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
  },
  caption: {
    textAlign: "center",
    color: "#B2B2B2",
    fontSize: 14,
  },
  container: {
    height: "60%",
  },
  CreateNewCollectionBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  IconContainer: {
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  btnTextContainer: {
    width: "100%",
    borderBottomWidth: 1,
    padding: 15,
    borderBottomColor: "#ebebeb",
  },
  btnText: {
    fontSize: 13,
    color: "#19181C",
    fontWeight: "600",
  },
});
