import { StyleSheet } from "react-native";
import { Platform } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
    backgroundColor: "#ecf0f1", // Top bar background color
  },
  segment: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  selectedSegment: {
    backgroundColor: "#3498db", // Selected segment color
  },
  segmentText: {
    color: "#2c3e50", // Segment text color
  },
  viewPager: {
    height: 250,
  },
  Info: {
    width: "100%",
    top: 20,
    height: 240,
  },
  text: {
    fontSize: 11,
    fontWeight: "300",

    color: "grey",
  },
  btnText: {
    fontSize: 15,
    textAlign: "center",
    color: "white",
    fontWeight: "500",
    letterSpacing: 1,
  },
  shareIcons: {
    backgroundColor: "#dbdbdb",
    justifyContent: "center",
    width: 50,
    height: 50,
    alignItems: "center",
    borderRadius: 30,
    bottom: 2,
  },
  modal: {
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",

    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: 320,
  },
  clubRateContainer: {
    width: 50,
    height: "100%",
    backgroundColor: "transparent",
    position: "absolute",
    left: 0,

    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "center",
    gap: 20,
    zIndex: 1,
  },
  ıconContainer: {
    width: 50,
    height: "100%",
    backgroundColor: "transparent",
    position: "absolute",
    right: 10,
    top: 15,
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "center",
    gap: 20,
    zIndex: 1,
  },
  ıcon: {
    backgroundColor: "#FFFFFFAD",
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  centeredView: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    // modal dışı koyu arkaplan
  },
  modalView: {
    width: "100%",

    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
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
  modal2: {
    justifyContent: "flex-end",
    margin: 0,
    backgroundColor: "#1414148c",
  },
  modalContent2: {
    backgroundColor: "white",

    height: "50%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modal3: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent3: {
    backgroundColor: "white",

    height: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  pagination: {
    position: "absolute",
    zIndex: 1,
    padding: 3,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
    bottom: 0,
    alignItems: "center",

    width: "100%",
  },
  other: {
    padding: 10,
    top: 0,

    backgroundColor: "#FFFFFF",

    marginTop: 0,

    width: "100%",

    height: "auto",
    borderWidth: 0.7,
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
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 0.7,
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
  },
  Input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#ebebeb",
  },
  modalImage: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContentImage: {
    backgroundColor: "black",
    justifyContent: "center",

    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  discountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  discountedPrice: {
    color: "#EA2C2E",
    fontWeight: "700",
    marginTop: 5,
    fontSize: 14,
    position: "relative",
    marginLeft: 5,
  },
  regularPrice: {
    color: "#EA2C2E",
    fontWeight: "700",
    marginTop: 5,
    fontSize: 14,
    textAlign: "center",
  },
  discountText: {
    color: "red",
    fontSize: 11,
    padding: 10,
  },
  shareSaleText: {
    width: "100%",
    color: "#274abb",
    fontWeight: "700",
    marginTop: 5,
    fontSize: 14,
    position: "relative",
  },
  originalPrice: {
    marginLeft: 5,
  },
  strikethrough: {
    textDecorationLine: "line-through",
    color: "#ea2a28",
    fontWeight: "700",
    marginTop: 5,
    fontSize: 11,
  },
  offSale: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 10,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#EA2C2E",
    borderRadius: 5,
  },
  offSaleText: {
    color: "white",
    fontWeight: "500",
    fontSize: 12,
  },
  sold: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 10,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#EA2C2E",
    borderRadius: 5,
  },
  soldText: {
    color: "white",
    fontWeight: "500",
    fontSize: 12,
  },
  payDetailBtn: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 10,
    alignItems: "center",

    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#EA2C2E",
  },
  payDetailText: {
    fontWeight: "700",
    fontSize: 12,
    color: "#EA2C2E",
  },
  captionAndIcons: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  caption: {
    width: "70%",
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    width: "25%",
    bottom: 5,
  },
  btns: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 6,
    gap: 3,
  },
  addBasket: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 10,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#EA2C2E",
    borderRadius: 5,
  },
  addBasketText: {
    color: "white",
    fontWeight: "700",
    fontSize: 12,
  },
  showCustomer: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 10,
    width: "100%",
    alignItems: "center",
    backgroundColor: "green",
    borderRadius: 5,
  },
  showCustomerText: {
    color: "white",
    fontWeight: "500",
    fontSize: 12,
  },
  pending: {
    padding: 10,
    width: "100%",
    alignItems: "center",
    backgroundColor: "orange",
    borderRadius: 5,
  },
  pendingText: {
    color: "white",
    fontWeight: "500",
    fontSize: 12,
  },
  priceAndButtons: {
    marginTop: "auto",
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commissionBadge: {
    position: "absolute",
    left: 0,
    bottom: 50,
    width: 120,
    height: 30,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  commissionText: {
    color: "#EA2C2E",
    fontWeight: "700",
    fontSize: 14,
  },
  modal4: {
    justifyContent: "center",
    margin: 0,
    padding: 20,
    backgroundColor: "#1414148c",
  },
  modalContent4: {
    backgroundColor: "#fefefe",
    padding: 20,
    borderRadius: 5,
  },
  takasContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  takasBtn: {
    backgroundColor: "#FEF4EB",
    flexDirection: "row",
    padding: 6,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5,
  },
  takasText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "600",
  },
  takasIcon: {
    backgroundColor: "#F37919",
    padding: 6,
    borderRadius: 5,
  },
});
