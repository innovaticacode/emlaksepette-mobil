import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 0,
    width: "100%",
    marginVertical: 0,
  },
  closeButtonContainer: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  closeButton: {
    backgroundColor: "transparent",
    borderRadius: 5,
  },
  SearchArea: {
    width: "100%",
  },

  Input: {
    backgroundColor: "#ebebebab",
    marginTop: 0,
    padding: 10,
    fontSize: 17,
    borderRadius: 4,
  },
  animatedView: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#FFFF",
    borderColor: "#e6e6e6",
    ...Platform.select({
      ios: {
        shadowColor: " #e6e6e6",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 20,
  },
  centeredView: {
    margin: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // modal dışı koyu arkaplan
  },
  modalView: {
    width: "100%",
    margin: 0,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 20,
    gap: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  centeredView2: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // modal dışı koyu arkaplan
  },
  modalView2: {
    width: "100%",

    backgroundColor: "white",
    borderRadius: 5,
    padding: 20,
    gap: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  centeredView3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // modal dışı koyu arkaplan
  },
  modalView3: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText3: {
    marginBottom: 15,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnRemove: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#EEEDEB",
    borderWidth: 1,
    borderColor: "#ebebeb",
  },
  modal2: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent2: {
    gap: 10,

    backgroundColor: "#F8F7F4",
    padding: 10,

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
  modalView4: {
    width: "100%",

    backgroundColor: "white",
    borderRadius: 5,
    padding: 20,
    gap: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modal4: {
    backgroundColor: "rgba(0,0,0,0.5)",
    margin: 0,
    padding: 10,
  },
  backgroundContainer: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
  },
  searchBarContainer: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderWidth: 0,
    borderBottomWidth: 0,
    justifyContent: "center",
    width: "100%",
    paddingBottom: 10,
    height: 50,
  },
  searchBarInput: {
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#bebebe26",
    borderBottomWidth: 1,
    height: "110%",
    borderBottomColor: "#bebebe26",
  },
  deleteButtons: {
    flexDirection: "row",
    padding: 10,
    paddingTop: 9,
    alignItems: "center",
    justifyContent: "space-between",
  },
  deleteButtonsItem: {
    flexDirection: "row",
    gap: 25,
    alignItems: "center",
  },
  chooseDeleteButton: {
    backgroundColor: "#EEEDEB",
    borderWidth: 1,
    borderColor: "#ebebeb",
    padding: 5,
    borderRadius: 5,
  },
  chooseText: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
  },
  trashIconDelete: {
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#EA2C2E",
    borderRadius: 10,
  },
});
