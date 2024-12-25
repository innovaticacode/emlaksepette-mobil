import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",

    justifyContent: "center",

    flex: 1,
    ...Platform.select({
      ios: {},
      android: {
        paddingTop: 25,
      },
    }),
  },
  clubRateContainer: {
    width: 50,
    height: "100%",
    backgroundColor: "transparent",
    position: "absolute",
    right: 0,
    top: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "center",
    gap: 20,
    zIndex: 1,
  },
  commissionBadge: {
    position: "absolute",
    right: 0,
    bottom: 60,
    width: 120,
    height: 30,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  commissionText: {
    color: "#EA2C2E",
    fontWeight: "700",
    fontSize: 13,
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
    zIndex: 2,
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
    margin: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
    backgroundColor: "#fefefe",

    height: "52%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modal3: {
    justifyContent: "flex-end",
    margin: 0,
    backgroundColor: "#1414148c",
  },
  modalContent3: {
    backgroundColor: "#fefefe",

    height: "100%",
  },
  Input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#ebebeb",
  },
  label: {
    color: "grey",
    fontWeight: "500",
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
  modalImage: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContentImage: {
    backgroundColor: "black",
    justifyContent: "center",

    flex: 1,
  },
  Input: {
    backgroundColor: "#F2F2F2",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ebebeb",
    borderRadius: 5,
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
  CaptionPriceAndSlider: {
    gap: 8,
    paddingBottom: 10,
    width: "100%",
    paddingTop: 10,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: "#FFFFFF",

    width: "100%",

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
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "95%",

    backgroundColor: "white",
    borderRadius: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalContent: {
    fontSize: 16,
    marginBottom: 20,
  },
  CallAndSeePlaceContainer: {
    position: "absolute",
    width: "100%",
    bottom: 35,
    padding: 4,
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  CallBtn: {
    width: "45%",
    backgroundColor: "#EA2B2E",
    padding: 12,
    borderRadius: 8,
  },
  CallBtnText: {
    fontSize: 14,
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
  seePlaceBtn: {
    width: "45%",
    backgroundColor: "#EA2B2E",
    padding: 12,
    borderRadius: 8,
  },
  seePlaceBtnText: {
    fontSize: 14,
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
  ProfileBannerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ProfileBannerBtn: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  ProfileBannerItem: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  ProfileImageBanner: {
    width: "100%",
    height: "100%",
    marginRight: 10,
  },
  ProfileName: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
    paddingLeft: 10,
  },
  ProfileIconVerify: {
    width: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  ProjectIdText: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
    paddingLeft: 10,
  },
  PaginationContainer: {
    backgroundColor: "#333",
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
  },
  totalRateContainer: {
    position: "absolute",
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    top: 10,
  },
  LocationContainer: {
    gap: 5,
    width: "70%",
  },
  LocationText: {
    fontSize: 11,
    color: "#333",
    fontWeight: "600",
  },
  TitleText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  InformationCon: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
  },
  InfoBtn: {
    borderWidth: 1,
    borderColor: "#EA2B2E",
    padding: 5,
    borderRadius: 6,
    backgroundColor: "white",
  },
  InfoText: {
    textAlign: "center",
    fontSize: 13,
    color: "#EA2B2E",
    fontWeight: "600",
  },
});
