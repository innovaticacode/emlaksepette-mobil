import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import AddBtn from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/EvilIcons";
import IconMenu from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
export default function Header({ loading, onPress }) {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          onPress();
        }}
      >
        <IconMenu name="menu" size={40} color={"#333"} />
      </TouchableOpacity>
      <View
        onTouchStart={() => {
          navigation.navigate("HomePage");
        }}
        style={{
          width: 200,
          height: 50,
        }}
      >
        <ImageBackground
          source={require("./emlaksepettelogo.png")}
          resizeMode="contain"
          style={{
            width: "100%",
            flex: 1,
            justifyContent: "center",
          }}
        />
      </View>

      <View style={{ display: "flex", flexDirection: "row-reverse" }}>
        {/* <TouchableOpacity style={{
        
        width:50,
        alignItems: 'center',
      
        borderRadius:15
      }}
        onPress={()=>navigation.navigate('ShopProfile')}
      >
       <Icon name='user' size={40}/>
      </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Notifications")}
          style={{
            width: 50,
            alignItems: "center",

            borderRadius: 15,
          }}
        >
          <View
            style={{
              position: "absolute",
              backgroundColor: "red",
              paddingLeft: 6,
              paddingRight: 6,
              padding: 1,
              bottom: 22,
              left: 23,
              zIndex: 1,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "white" }}>1</Text>
          </View>
          <Icon name="bell" size={40} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    alignItems: "center",

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
    padding: 10,
    paddingTop: Platform.OS === "android" ? 20 : 0,
    width: "100%",
  },
});
