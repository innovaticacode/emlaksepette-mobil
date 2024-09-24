import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    backgroundColor: "#FFF",
  },
  scrollView: {
    flexGrow: 1,
  },
  title: {
    color: "#ea2b2e",
    fontSize: 20,
  },
  description: {
    color: "#000",
    fontSize: 14,
    marginVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    paddingHorizontal: 6,
  },
  starArea: {
    marginVertical: 10,
  },
  flatList: {
    paddingVertical: 10,
  },
  imgArea: {
    width: "100%",
    height: 200,
    paddingHorizontal: 4,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  noDataText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#555",
  },
});
