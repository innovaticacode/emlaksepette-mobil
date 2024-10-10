import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import ShareScreen from "./ShareScreen";
import Test from "./Test";
import Basket from "./Basket";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import IconStore from "react-native-vector-icons/MaterialCommunityIcons";
import ShoppingProfile from "./ShoppingProfile";
import Login from "./Login&Register/Login";
import { getValueFor } from "../../components/methods/user";
import { Platform } from "react-native";
import HomePage2 from "./HomePage2";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

const Home = ({ route }) => {
  const isFocused = useIsFocused();
  const [user, setUser] = useState({});
  const [verifyStatus, setverifyStatus] = useState(null);
  const [userdata, setuserdata] = useState({});
  const nav = useNavigation();

  useEffect(() => {
    if (route?.params?.status === "login") {
      getValueFor("user", setUser);
    } else if (route?.params?.status === "logout") {
      setUser({});
    }
  }, [route?.params?.status]);

  useEffect(() => {
    if (isFocused) {
      getValueFor("user", setUser);
      getValueFor("PhoneVerify", setverifyStatus);
    }
  }, [isFocused]);

  const GetUserInfo = async () => {
    try {
      if (user.access_token) {
        const userInfo = await axios.get(
          `https://private.emlaksepette.com/api/users/${user?.id}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        setuserdata(userInfo?.data?.user);
      }
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    }
  };

  useEffect(() => {
    GetUserInfo();
  }, [user]);

  if (userdata && user.access_token) {
    if (user.type === 1 && verifyStatus === 0) {
      setTimeout(() => nav.navigate("VerifyScreen"), 100);
    } else if (verifyStatus === 0 || userdata.corporate_account_status === 0) {
      setTimeout(() => nav.navigate("VerifyScreen"), 100);
    }
  }

  const handleTabPress = (e, navigation) => {
    if (!user.access_token) {
      e.preventDefault();
      setTimeout(() => {
        navigation.navigate("Login");
      }, 400);
    }
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: Platform.OS === "ios" ? false : true,
        tabBarLabelStyle: {
          fontWeight: "500", // Kalın font
          color: "black",
          marginBottom: 5, // Varsayılan rengi
        },
        tabBarActiveTintColor: "red", // Üstüne gelindiğinde rengi
        tabBarStyle: {
          backgroundColor: "white",
          padding: 5,
          height: Platform.OS === "android" ? "8%" : "9%",
        },
      }}
    >
      <Tab.Screen
        name="HomePage"
        component={HomePage2}
        options={{
          title: "Ana Sayfa",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
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
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              color={focused ? "black" : "grey"}
              size={25}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => handleTabPress(e, navigation),
        })}
      />
      <Tab.Screen
        name="ShareAdvert"
        component={ShareScreen}
        options={{
          headerShown: false,
          tabBarLabel: "İlan Ver",
          tabBarIcon: () => (
            <View style={styles.adverIconContainer}>
              <Ionicons name="add" color={"white"} size={30} />
            </View>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => handleTabPress(e, navigation),
        })}
      />
      <Tab.Screen
        component={Basket}
        name="Sepetim"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome5Icon name="shopping-cart" color="black" size={20} />
            ) : (
              <Feather name="shopping-cart" color="black" size={20} />
            ),
          tabBarBadge: userdata.cartItem ? 1 : null,
          tabBarBadgeStyle: {
            fontSize: 10,
            height: 17,
            width: 20,
            position: "absolute",
            top: 0,
            right: 0,
            borderRadius: 6,
          },
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => handleTabPress(e, navigation),
        })}
      />
      <Tab.Screen
        name={"Hesabım"}
        component={ShoppingProfile}
        options={{
          tabBarLabel: user.access_token
            ? user.role === "Kurumsal Hesap"
              ? "Panelim"
              : "Hesabım"
            : "Giriş Yap",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            user.role === "Kurumsal Hesap" ? (
              <IconStore
                name={focused ? "storefront" : "storefront-outline"}
                size={28}
                color={focused ? "#333" : "grey"}
              />
            ) : (
              <FontAwesomeIcon
                name={focused ? "user" : "user-o"}
                size={focused ? 28 : 23}
              />
            ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => handleTabPress(e, navigation),
        })}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  adverIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 25,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    bottom: 16,
  },
  ilanVerIcon: {
    borderRadius: 20,
    left: 1.3,
  },
});

export default Home;
