import { color } from "@rneui/base";
import { Platform, StyleSheet } from "react-native";

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderRadius: 10,
    padding: 15,
    fontSize: 14,
    margin: "0 auto",

    backgroundColor: "#FFFFFF",

    paddingHorizontal: 6,
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
  inputAndroid: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#7C7C7C",
    padding: 10,
    marginHorizontal: 5,
    fontSize: 14,
    margin: "0 auto",
    backgroundColor: "#FFFFFF",

    paddingHorizontal: 6,
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
});

export const styles = StyleSheet.create({
  btn: {
    borderRightWidth: 1,
    borderColor: "#7C7C7C",
    flexDirection: "row",
    borderRadius: 10,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EA2C2E",

    paddingHorizontal: 6,

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
  btnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  butonfilter: {
    backgroundColor: "white",

    borderRadius: 10,
    padding: 5,
    paddingVertical: 15,
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
  clearCityButton: {
    color: "#EA2B2E",
    fontSize: 15,
    fontWeight: "600",
  },
  choosedCity: {
    fontSize: 15,
    fontWeight: "600",
    color: "#03bf3c",
  },
  FilterContainer: {
    width: "100%",
    position: "absolute",
    zIndex: 1,
    alignItems: "center",
    paddingTop: 8,
  },
  filterRow: {
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    gap: 5,
  },
  actionSheet: {
    backgroundColor: "#FFF",
    width: "100%", // Set width to 32px less than screen width
    height: "40%", // Set height to 80% of screen height
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  countyChooseContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ebebeb",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 13,
  },
  cityChooseContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ebebeb",
    borderRadius: 10,
  },
  cityActionSheetTop: {
    flexDirection: "row",

    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "space-between",
  },
});
