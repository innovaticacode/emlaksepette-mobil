import { Dimensions, Platform, StyleSheet } from "react-native";
const width = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    width: "100%",
    height: width > 350 ? 170 : 120,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: "grey",
    paddingTop: Platform.OS == "ios" && 50,
    backgroundColor: "grey",
  },
  backBtn: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 36 : 0,
  },
  back: {
    backgroundColor: "#FFFFFF",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  storeInfo: {
    alignItems: "center",
    paddingTop: 15,
  },
  storePosition: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "80%",
  },
  imgSize: {
    width: 64,
    height: 64,
  },
  imgCenter: {
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 64,
    height: 64,
    borderRadius: 50,
  },
  storeInfoDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  storeName: {
    fontSize: 12,
    color: "#000000",
    fontWeight: "600",
  },
  storeInfoType: {
    fontWeight: "500",
    fontSize: 10,
    color: "#000000",
  },
  content: {
    borderWidth: 1,
    borderColor: "#D4D4D4",
    borderRadius: 6,
    padding: 10,
    marginVertical: 10,
  },
  personImage: {
    width: 64,
    height: 64,
    borderRadius: 50,
  },
  body: {
    paddingHorizontal: 10,
  },
  contentHead: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  social: {
    flexDirection: "row",
    gap: 10,
  },
  normalText: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 16,
    color: "#000000",
  },
  boldText: {
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 19,
    color: "#000000",
  },
  personInfo: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  dataContainer: {
    borderWidth: 1,
    borderColor: "#D4D4D4",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    gap: 6,
  },
  dataBody: {
    flexDirection: "row",
    borderRadius: 4,
    alignItems: "center",
    gap: 6,
  },
  dataImage: {
    backgroundColor: "#EA2B2E1F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    padding: 4,
  },

  smallBold: {
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 14,
    color: "#000000",
  },
  locationReq: {
    fontSize: 8,
    color: "#EA2B2E",
    textDecorationLine: "underline",
  },
  reqLocationBody: {
    backgroundColor: "#FFDEDE",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    padding: 2,
  },
  dataMain: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  locationIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
