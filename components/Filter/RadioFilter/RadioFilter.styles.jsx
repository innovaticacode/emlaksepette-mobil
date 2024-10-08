import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalBody: {
    justifyContent: "center",
    margin: 0,
    backgroundColor: "#0c03033d",
    padding: 20,
  },
  modalContent: {
    gap: 5,
    paddingBottom: 25,
    backgroundColor: "#f8f8ff",
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#ffffff",

    ...Platform.select({
      ios: {
        shadowColor: "white",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  titleArea: {
    paddingTop: 15,
  },
  title: {
    alignItems: "center",
    color: "#333",
    fontSize: 17,
    fontWeight: "600",
  },

  text: {
    color: "#333",
    fontWeight: "600",
  },
  checkBox: {
    backgroundColor: "transparent",
    borderWidth: 0,
    margin: 0,
  },
});
