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
    width: 140,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    rowGap: 4,
  },

  body: {
    borderWidth: 1,
    borderColor: "#E4E4E4",
    borderRadius: 4,
    padding: 6,
    paddingHorizontal: 8,
    marginRight: 4,
    marginVertical: 4,
    width: 140,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    rowGap: 4,
  },
  activeText: {
    color: "#EA2B2E",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 12,
  },
  text: {
    color: "#B0B0B0",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 12,
  },
  count: {
    fontSize: 10,
    color: "#777777",
    fontWeight: "500",
    lineHeight: 12,
  },
  activeCount: {
    fontSize: 10,
    color: "#EA2B2E",
    fontWeight: "500",
    lineHeight: 12,
  },
});
