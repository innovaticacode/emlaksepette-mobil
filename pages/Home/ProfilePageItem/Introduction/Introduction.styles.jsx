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
    marginVertical: 16,
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
  projectTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  seperator: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 2,
    backgroundColor: "#eaeff5",
    marginVertical: 4,
  },
  allProjectsButton: {
    backgroundColor: "#EA2C2E",
    paddingVertical: 5,
    borderRadius: 4,
  },
  allProjectsButtonText: {
    color: "white",
    fontSize: 11,
    paddingHorizontal: 10,
  },
  titleArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  infoArea: {
    borderColor: "#eaeff5",
    borderWidth: 1,
    padding: 4,
    borderRadius: 6,
  },
});