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
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import IconStore from "react-native-vector-icons/MaterialCommunityIcons";
import ShoppingProfile from "./ShoppingProfile";
import Login from "./Login&Register/Login";
import userData, { getValueFor } from "../../components/methods/user";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import HomePage2 from "./HomePage2";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import VerifyScreen from "./VerifyScreen";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { setShoppingProfile } from "../../store/slices/Menu/MenuSlice";

const Tab = createBottomTabNavigator();

const Home = ({ route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const shoppingPage = useSelector((state) => state.menu.isShoppingProfile);

  console.debug("Home.js: isFocused", isFocused);
  console.debug("Home.js: route", route.params);
  const [user, setUser] = useState({});
  const [verifyStatus, setverifyStatus] = useState(null);
  useEffect(() => {
    if (route?.params?.status == "login") {
      getValueFor("user", setUser);
    } else if (route?.params?.status == "logout") {
      setUser({});
    }
  }, [route?.params?.status]);
  useEffect(() => {
    if (isFocused) {
      getValueFor("user", setUser);
      getValueFor("PhoneVerify", setverifyStatus);
    }
  }, [isFocused]);

  const [userdata, setuserdata] = useState({});
  const GetUserInfo = async () => {
    try {
      if (user.access_token) {
        const userInfo = await axios.get(
          "https://private.emlaksepette.com/api/users/" + user?.id,
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

  const nav = useNavigation();
  if (userdata && user.access_token) {
    if (user.type == 1) {
      if (verifyStatus == 0) {
        setTimeout(() => {
          nav.navigate("VerifyScreen");
        }, 100);
      }
    } else {
      if (verifyStatus == 0 || userdata.corporate_account_status == 0) {
        setTimeout(() => {
          nav.navigate("VerifyScreen");
        }, 100);
      }
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // Sayfadan çıkıldığında isShoppingProfile'ı false yap
        dispatch(setShoppingProfile({ isShoppingProfile: false }));
      };
    }, [dispatch])
  );

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
              name={focused ? "home" : "home-outline"}
              color={focused ? "black" : "grey"}
              size={20}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: () => {
            // Diğer tab'lar için isShoppingProfile'ı false yap
            dispatch(setShoppingProfile({ isShoppingProfile: false }));
          },
        })}
      />
      <Tab.Screen
        name="Favoriler"
        component={Test}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              color={focused ? "black" : "grey"}
              size={25}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: () => {
            // Diğer tab'lar için isShoppingProfile'ı false yap
            dispatch(setShoppingProfile({ isShoppingProfile: false }));
          },
        })}
      />
      <Tab.Screen
        name="ShareAdvert"
        component={ShareScreen}
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
        listeners={({ navigation }) => ({
          tabPress: () => {
            // Diğer tab'lar için isShoppingProfile'ı false yap
            dispatch(setShoppingProfile({ isShoppingProfile: false }));
          },
        })}
      />
      <Tab.Screen
        name="Sepetim"
        component={Basket}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <FontAwesome5Icon name="shopping-cart" color="black" size={20} />
            ) : (
              <Feather name="shopping-cart" color="black" size={20} />
            ),
          tabBarBadge: 1,
          tabBarBadgeStyle: {
            display: userdata.cartItem == null ? "none" : "flex",
            fontSize: 10,
            height: 17,
            width: 20,
            position: "absolute",
            top: 0,
            right: 0,
            borderRadius: 6,
          },
        })}
        listeners={({ navigation }) => ({
          tabPress: () => {
            // Diğer tab'lar için isShoppingProfile'ı false yap
            dispatch(setShoppingProfile({ isShoppingProfile: false }));
          },
        })}
      />
      <Tab.Screen
        name="Hesabım"
        component={ShoppingProfile}
        options={{
          tabBarLabel: user.access_token
            ? user.role === "Kurumsal Hesap"
              ? "Mağazam"
              : "Hesabım"
            : "Giriş Yap",
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
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
          tabPress: (e) => {
            dispatch(setShoppingProfile({ isShoppingProfile: true })); // ShoppingProfile için true yap
            console.debug("---------", shoppingPage);
            if (!user.access_token) {
              e.preventDefault();
              navigation.navigate("Login");
            }
          },
        })}
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
    fontWeight: "700",
  },
});

export default Home;
