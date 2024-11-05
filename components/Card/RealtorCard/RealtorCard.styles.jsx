import { Dimensions, Platform, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");
 export const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    borderBottomWidth: 2,
    borderBlockColor: "#E8E8E8",
    padding:5
   
  },
  İlan: {
    padding: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container2: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingLeft: 5,

    paddingRight: 5,

 
  },
  captionAndIcons: {
    display: "flex",
    flexDirection: "row",
    width: "100%",

    justifyContent: "space-between",
  },
  PriceAndButtons: {
    marginTop: "auto", // Push to the bottom
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  caption: {
    width: "80%",
    gap:3
  },
  ıcons: {
    display: "flex",
    flexDirection: "row",
    width: "25%",
    bottom: 5,
    top: 2,
  },
  btns: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  addBasket: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5,
    width: "50%",
    alignItems: "center",
    backgroundColor: "#EA2C2E",
    borderRadius: 5,
  },
  heartBtn:{
    position:'absolute',
    zIndex:1,
    right:4,
    top:4
  },
  ıconContainer: {

    width: 28,
    height: 28,
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
  },
  ıconContainer2: {

    width: 32,
    height: 32,
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
  },
  InformationText: {
    fontSize: width > 400 ? 12 : 10,
    right: width > 400 ? 10 : 5,
  },
  priceText: {
    color: "#EA2C2E",
    fontWeight: "700",
    fontSize: 14,
  },
  discountedPriceText: {
    textDecorationLine: "line-through",
    color: "#FF0000",
    fontWeight: "700",
    fontSize: 10,
  },
  discountText: {
    color: "red",
    fontSize: 11,
    padding: 5,
  },
  text: {
    textAlign: "center",
  },
  location:{
    flexDirection:'row',
    alignItems:'center',
    paddingTop:5,
    gap:4
  }
});