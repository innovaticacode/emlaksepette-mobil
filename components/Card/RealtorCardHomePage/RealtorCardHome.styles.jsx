
import { Platform } from "react-native";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFFFFF",
  padding:10,
    borderRadius:3,
    gap:8,
    flexDirection:'column',
    justifyContent:'space-between',
 
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
  ımageContainer: {
    width: 190,
    height: 150,
  },
  ımage: {
    width: "100%",
    height: "100%",
    
  },
  addCardBtn:{
    padding:8,
    backgroundColor:'#EA2B2E',
    borderRadius:5
  },
  butonText:{
  color:'white',
  fontSize:12,
  fontWeight:'700',
  textAlign:'center'
  },
  ıconContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#FFFF",
    position:'absolute',
    right:5,
    top:5,
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
