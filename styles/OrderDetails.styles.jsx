import { Platform, StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 10,
    paddingLeft: 7,
    paddingRight: 7,
    gap: 11,
    paddingBottom: 20,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "white",
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modal2: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    alignSelf: "flex-start",
  },

  modalContent2: {
    backgroundColor: "#f4f4f4",
    padding: 20,
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  Image: {
    flex: 0.5 / 2,
    padding: 2,
    height: 90,
  },
  caption: {
    flex: 1.4 / 2,
    padding: 2,
    gap: 4,
  },
  button: {
    backgroundColor: "green",
    padding: 13,
    borderRadius: 5,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "500",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    height: "50%",
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
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalText: {
    marginBottom: 15,
  },
  PersonalInfoArea: {
    padding: 10,
    width: "100%",
    backgroundColor: "#FFFF",
    borderWidth: 1,
    borderColor: "#ebebeb",
    gap: 10,
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

  //new design coding styles code----------------------------
  orderStateBody: {
    backgroundColor: "#F8F8F8",
    borderRadius: 6,
    padding: 10,
  },
  orderStateInfo: {
    backgroundColor: "#FFF",
    height: "auto",
    padding: 10,
    borderRadius: 6,
    marginVertical: 6,
    gap: 8,
  },
  boldText: {
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 16,
    color: "#000",
  },
  paymentStatus: {
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 16,
  },
  orderDetail: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#9D9D9D5F",
    padding: 10,
  },
  btnArea: {
    marginTop: 10,
    flexDirection: "row",
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
    gap: 10,
  },
  seperator: {
    height: 1,
    backgroundColor: "#ebebeb",
    marginVertical: 10,
    width: "100%",
  },
  normalText: {
    fontSize: 16,
    lineHeight: 16,
    color: "#000",
    fontWeight: "500",
  },
  info: {
    flexDirection: "column",
    width: "70%",
    justifyContent: "flex-start",
    paddingHorizontal: 6,
    gap: 10,
    flexWrap: "wrap",
  },
  invoiceBody: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  customerBody: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#9D9D9D5F",
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  largeBoldtext: {
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 18,
    color: "#000",
  },
  orderSummaryBody: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#9D9D9D5F",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
  },
  amount: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#9D9D9D5F",
    padding: 10,
    marginTop: 10,
    flex: 1,
    gap: 8,
  },
  // cards
  blueCardBody: {
    width: "100%",
    backgroundColor: "#E9F5FF",
    padding: 10,
    borderRadius: 10,
    alignItems: "center", // Yatayda ortalamak için
    position: "relative", // Resim için mutlak konum
    marginTop: 20,
  },
  blueCardImg: {
    width: 60,
    height: 60,
    position: "absolute",
    top: -22,
    alignSelf: "center", // Resmi tam ortalamak için
  },
  textArea: {
    gap: 16,
    marginTop: 52,
  },
  greenCardBody: {
    width: "100%",
    backgroundColor: "#DCF1E6",
    padding: 10,
    borderRadius: 10,
    alignItems: "center", // Yatayda ortalamak için
    position: "relative", // Resim için mutlak konum
    marginTop: 40,
    marginBottom: 10,
  },
  okeyBtn: {
    backgroundColor: "#0E713D",
    height: 30,
    width: 70,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 10,
    justifyContent: "center",
  },
  rejectBtn: {
    backgroundColor: "#EA2A28",
    height: 30,
    width: 70,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 10,
    justifyContent: "center",
  },
  statusBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  iconContainer: {
    position: "absolute",
    top: -25,
    left: "50%",
    transform: [{ translateX: -25 }],
  },
  iconWrapper: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#2F7DF7",
    justifyContent: "center",
    alignItems: "center",
    // Gölge için eklemeler:
    shadowColor: "#000", // Gölge rengi
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.62, // Gölgenin opaklığı
    shadowRadius: 3.84, // Gölge bulanıklık yarıçapı
    elevation: 5, // Android için gölge efekti
  },
  iconWrapperGreen: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#0FA958",
    justifyContent: "center",
    alignItems: "center",
    // Gölge için eklemeler:
    shadowColor: "#000", // Gölge rengi
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.62, // Gölgenin opaklığı
    shadowRadius: 3.84, // Gölge bulanıklık yarıçapı
    elevation: 5, // Android için gölge efekti
  },
  modalApprove: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  approveContainer: {
    backgroundColor: "#f4f4f4",
    padding: 20,
    height: "40%",
    borderRadius: 20,
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
  headApprove: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  approveTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
  approveContent: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  approveInfo: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 10,
    color: "#ea2b2e",
  },
  approveBtn: {
    backgroundColor: "#34BC79",
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  rejectInput: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 5,
    padding: 10,
  },
  rejectBtnModal: {
    backgroundColor: "#D9D9D9",
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  rejectFile: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    padding: 10,
    width: "30%",
    justifyContent: "center",
  },
  fileTxt: {
    textAlign: "center",
    color: "#606060",
  },
});
