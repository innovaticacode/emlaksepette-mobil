import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform, Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import ShareScreen from "./ShareScreen";
import Test from "./Test";
import Basket from "./Basket";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import IconStore from "react-native-vector-icons/MaterialCommunityIcons";
import ShoppingProfile from "./ShoppingProfile";
import { getValueFor } from "../../components/methods/user";
import HomePage2 from "./HomePage2";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { setShoppingProfile } from "../../store/slices/Menu/MenuSlice";
const Tab = createBottomTabNavigator();

const Home = ({ route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const shoppingPage = useSelector((state) => state.menu.isShoppingProfile);
  const nav = useNavigation();

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

  if (userdata && user.access_token) {
    if (user.type === 1 && verifyStatus === 0) {
      setTimeout(() => nav.replace("VerifyScreen"), 100);
    } else if (verifyStatus === 0 || userdata.corporate_account_status === 0) {
      setTimeout(() => nav.replace("VerifyScreen"), 100);
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
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={25}
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
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              color={color}
              size={25}
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
          tabBarLabel: "İlan Ver",
          tabBarIcon: () => (
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
            dispatch(setShoppingProfile({ isShoppingProfile: false }));
          },
        })}
      />
      <Tab.Screen
        name="Sepetim"
        component={Basket}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <FontAwesome5Icon name="shopping-cart" color="black" size={20} />
            ) : (
              <Feather name="shopping-cart" color="grey" size={20} />
            ),
          tabBarBadge: 1,
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
        component={ShoppingProfile}
        options={{
          tabBarLabel: user.access_token
            ? user.role === "Kurumsal Hesap"
              ? "Panelim"
              : "Hesabım"
            : "Giriş Yap",
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            user.role === "Kurumsal Hesap" ? (
              <IconStore
                name={focused ? "storefront" : "storefront-outline"}
                size={28}
                color={color}
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
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "white",
    paddingVertical: 10,
    width: "auto",
    height: 90, 
    justifyContent: "center",
  },
  tabBarLabel: {
    fontWeight: "500",
    color: "black",
    marginBottom: 5,
    fontSize: 12,
  },
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
  tabBarBadgeStyle: {
    display: 'flex',
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