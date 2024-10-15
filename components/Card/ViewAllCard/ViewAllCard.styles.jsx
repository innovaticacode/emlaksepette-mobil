import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  },
  area: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  imageArea: {
    width: "100%",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 120,
    backgroundColor: "#FFF",
  },
  refText: {
    fontSize: 10,
    fontWeight: "500",
    color: "#6c757d",
  },
  title: {
    fontSize: 12,
    fontWeight: "400",
    color: "#444",
  },
  textArea: {
    jujsifyContent: "center",
    alignItems: "center",
  },
  ref: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
