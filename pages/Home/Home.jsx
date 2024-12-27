import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform, Dimensions, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import ShareScreen from "./ShareScreen";
import Test from "./Test";
import Basket from "./Basket";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import IconStore from "react-native-vector-icons/MaterialCommunityIcons";
import ShoppingProfile from "./ShoppingProfile";
import { getValueFor } from "../../components/methods/user";
import HomePage2 from "./HomePage2";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { setShoppingProfile } from "../../store/slices/Menu/MenuSlice";
import { apiUrl } from "../../components/methods/apiRequest";
import VerifyScreen from "./VerifyScreen";
const Tab = createBottomTabNavigator();

const DynamicLabel = ({ label }) => {
  const screenWidth = Dimensions.get("window").width;
  const maxWidth = screenWidth / 5 - 10;

  return (
    <Text
      style={{
        fontSize: screenWidth > 400 ? 12 : 10,
        color: "#000",
        fontWeight: "500",
        marginBottom: 4,
        textAlign: "center",
        maxWidth: maxWidth,
      }}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      {label}
    </Text>
  );
};

const Home = ({ route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const basketItem = useSelector((state) => state.basket.basketItem);

  const [user, setUser] = useState({});
  const [verifyStatus, setverifyStatus] = useState(null);
  const [userdata, setuserdata] = useState({});

  useEffect(() => {
    if (route?.params?.status == "login") {
      getValueFor("user", setUser);
      getValueFor("PhoneVerify", setverifyStatus);
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

  const GetUserInfo = async () => {
    try {
      if (user.access_token) {
        const userInfo = await axios.get(apiUrl + "users/" + user?.id, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });

        setuserdata(userInfo?.data?.user);
      }
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    }
  };

  useEffect(() => {
    GetUserInfo();
  }, [user]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: Platform.OS === "ios" ? false : true,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: "black",
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="HomePage"
        component={HomePage2}
        options={{
          title: "Ana Sayfa",
          headerShown: false,
          tabBarLabel: () => <DynamicLabel label="Ana Sayfa" />,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: () => {
            dispatch(setShoppingProfile({ isShoppingProfile: false }));
          },
        })}
      />
      <Tab.Screen
        name="Favoriler"
        component={Test}
        options={{
          headerShown: false,
          tabBarLabel: () => <DynamicLabel label="Favoriler" />,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              color={color}
              size={24}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: () => {
            dispatch(setShoppingProfile({ isShoppingProfile: false }));
          },
        })}
      />
      <Tab.Screen
        name="ShareAdvert"
        component={ShareScreen}
        options={{
          headerShown: false,
          tabBarLabel: () => <DynamicLabel label="İlan Ver" />,
          tabBarIcon: () => (
            <View style={styles.advertiseIconContainer}>
              <Ionicons
                name="add"
                color={"white"}
                size={30}
                style={styles.advertiseIcon}
              />
            </View>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: () => {
            dispatch(setShoppingProfile({ isShoppingProfile: false }));
          },
        })}
      />
      <Tab.Screen
        name="Sepetim"
        component={Basket}
        options={{
          headerShown: false,
          tabBarLabel: () => <DynamicLabel label="Sepetim" />,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome5Icon name="shopping-cart" color="black" size={24} />
            ) : (
              <Feather name="shopping-cart" color="grey" size={24} />
            ),
          tabBarBadge: basketItem ? 1 : null,
          tabBarBadgeStyle: styles.tabBarBadgeStyle,
        }}
        listeners={({ navigation }) => ({
          tabPress: () => {
            dispatch(setShoppingProfile({ isShoppingProfile: false }));
          },
        })}
      />
      <Tab.Screen
        name="Hesabım"
        component={
          user.type == 2 && userdata.corporate_account_status === 0
            ? VerifyScreen
            : ShoppingProfile
        }
        options={{
          tabBarLabel: () => (
            <DynamicLabel
              label={
                user.access_token
                  ? user.role === "Kurumsal Hesap"
                    ? "Panelim"
                    : "Hesabım"
                  : "Giriş Yap"
              }
            />
          ),
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            user.role === "Kurumsal Hesap" ? (
              <IconStore
                name={focused ? "storefront" : "storefront-outline"}
                size={28}
                color={focused ? "black" : "grey"}
              />
            ) : (
              <FontAwesomeIcon
                name={focused ? "user" : "user-o"}
                size={focused ? 28 : 23}
                color={focused ? "black" : "grey"}
              />
            ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            dispatch(setShoppingProfile({ isShoppingProfile: true }));
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
  tabBar: {
    backgroundColor: "white",
    paddingVertical: 10,
    width: "auto",
    height: Platform.OS === "ios" ? 90 : 60,
    justifyContent: "center",
  },
  tabBarLabel: {
    fontWeight: "500",
    color: "black",
    marginBottom: 5,
    fontSize: 12,
  },
  advertiseIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    bottom: 20,
    backgroundColor: "#EA2B2E",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  advertiseIcon: {
    borderRadius: 20,
    fontWeight: "700",
  },
  tabBarBadgeStyle: {
    display: "flex",
    fontSize: 10,
    height: 17,
    width: 20,
    position: "absolute",
    top: 0,
    right: 0,
    borderRadius: 6,
  },
});

export default Home;
