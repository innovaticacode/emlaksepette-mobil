import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  btnArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
    justifyContent: "space-between",
  },
  commentBody: {
    borderWidth: 1,
    borderColor: "#D4D4D4",
    borderRadius: 6,
    width: "100%",
    padding: 10,
    gap: 10,
    marginVertical: 10,
  },
  comment: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
  commentName: {
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 14,
    color: "#777777",
  },
});
