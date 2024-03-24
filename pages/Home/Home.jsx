import React from "react";
import { View, Text, StyleSheet,Platform ,Dimensions} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import HomePage from "../Home/HomePage";
import Search from "./Search";
import ShareScreen from "./ShareScreen";
import Test from "./Test";
import Basket from "./Basket";
import { useNavigation } from "@react-navigation/native";

import ShoppingProfile from "./ShoppingProfile";
import Login from "./Login&Register/Login";

const Tab = createBottomTabNavigator();



const Home = () => {
  const {width,height}=Dimensions.get("window")
  return (
    <Tab.Navigator
    
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
  
          fontWeight: "200",
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "grey",
        tabBarActiveBackgroundColor: "transparent",
        tabBarStyle: {
          backgroundColor: "white",
          padding: 6,
          height: Platform.OS === "android" ? '7%' :'9%'
        },
      }}
    >
      <Tab.Screen
        name="Vitrin"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="home-outline"
              color={focused ? "black" : "grey"}
              size={20}
            />
          ),
        }}
      />
 <Tab.Screen
        name="Favoriler"
        component={Test}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="heart-outline"
              color={focused ? "black" : "grey"}
              size={20}
            />
          ),
        }}
      />
     

      <Tab.Screen
        name="İlan Ver"
        component={ShareScreen}
        options={{
          tabBarLabel: "İlan Ver",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.ilanVerIconContainer}>
              <Ionicons
                name="add"
                color={"white"}
                size={30}
                style={styles.ilanVerIcon}
              />
            </View>
          ),
        }}
      />

     
  <Tab.Screen
  
  name="Sepetim"
  options={({ route }) => ({
    
    tabBarIcon: ({ color, focused }) => (
      <Feather
        name="shopping-cart"
        color={focused ? "black" : "grey"}
        size={20}
      />
    ),
    tabBarBadge: 0,
    tabBarBadgeStyle: {
      fontSize: 10, height: 17, width: 20, position: 'absolute', top: 0, right: 0, borderRadius:6
    },
  
    
  })}
>
  {(props) => <Basket {...props}/>} 
</Tab.Screen>
<Tab.Screen
        name="Hesabım"
        component={Login}
        options={{
          headerShown:false,
          tabBarIcon: ({ color, focused }) => (

            <Feather
              name="user"
              color={focused ? "black" : "grey"}
              size={23}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  ilanVerIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    bottom: 15,
    backgroundColor: "#EA2B2E",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ilanVerIcon: {
    borderRadius: 20,
    left:1.3,
    fontWeight: 700
 
  },
});

export default Home;
