import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import HomePage from "../Home/HomePage";
import Search from "./Search";
import ShareScreen from "./ShareScreen";
import Test from "./Test";
import Basket from "./Basket";
import { useNavigation } from "@react-navigation/native";
import IconStore from "react-native-vector-icons/MaterialCommunityIcons";
import ShoppingProfile from "./ShoppingProfile";
import Login from "./Login&Register/Login";
import userData, { getValueFor } from "../../components/methods/user";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import HomePage2 from "./HomePage2";

const Tab = createBottomTabNavigator();

const Home = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const { width, height } = Dimensions.get("window");
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontWeight: "500", // Kalın font
          color: "black",
          marginBottom: 5, // Varsayılan rengi
        },
        tabBarActiveTintColor: "red", // Üstüne gelindiğinde rengi
        tabBarStyle: {
          backgroundColor: "white",
          padding: 5,
          height: Platform.OS === "android" ? "7%" : "9%",
        },
      }}
    >
      <Tab.Screen
        name="HomePage"
        component={HomePage2}
        options={{
          title: "Ana Sayfa",

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
        component={user.access_token ? Test : Login}
        options={{
          headerShown: false,
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
        name="ShareAdvert"
        component={user.access_token ? ShareScreen : Login}
        options={{
          headerShown: false,
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
        component={user.access_token ? Basket : Login}
        name="Sepetim"
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Feather
              name="shopping-cart"
              color={focused ? "black" : "grey"}
              size={20}
            />
          ),
          tabBarBadge: 0,
          tabBarBadgeStyle: {
            fontSize: 10,
            height: 17,
            width: 20,
            position: "absolute",
            top: 0,
            right: 0,
            borderRadius: 6,
          },
        })}
      />

      <Tab.Screen
        name={'Hesabım'}
        
        component={user.access_token ? ShoppingProfile : Login}
        options={{
          tabBarLabel:user.role === "Kurumsal Hesap" ? "Mağazam" : "Hesabım",
          headerShown: false,
          
          tabBarIcon: ({ color, focused }) =>
            user.role == "Kurumsal Hesap" ? (
              <IconStore
                name="storefront-outline"
                size={28}
                color={focused ? "#333" : "grey"}
              />
            ) : (
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
    left: 1.3,
    fontWeight: 700,
  },
});

export default Home;
