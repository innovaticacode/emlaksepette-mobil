import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/EvilIcons";
import IconMenu from "react-native-vector-icons/Entypo";
import BackIcon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { getValueFor } from "./methods/user";
import {
  apiRequestPostWithBearer,
  apiUrl,
  frontEndUriBase,
} from "./methods/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationsRedux } from "../store/slices/Notifications/NotificationsSlice";
import { setUser } from "../store/user/UserSlice";
import * as Device from "expo-device";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Header({ showBack }) {
  const insets = useSafeAreaInsets();

  console.log("insets", insets);

  const isAndroidWithNotch =
    Platform.OS === "android" && Device.modelName.includes("Notch");

  console.log("isAndroidWithNotch", isAndroidWithNotch);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const scheme = useColorScheme();
  const headerStyle = {
    backgroundColor: scheme === "dark" ? "#000" : "#fff",
  };
  const hasNotch = insets.top > 20;

  const checkNotch = isAndroidWithNotch || hasNotch ? { paddingTop: 30 } : {};

  const notificationCount = useSelector(
    (state) => state.notifications.notificationsCount
  );

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const getNotifications = async () => {
    try {
      if (!user?.access_token) {
        return dispatch(
          setNotificationsRedux({
            notificationsCount: 0,
          })
        );
      }
      if (user?.access_token) {
        const response = await axios.get(apiUrl + "user/notification", {
          params: {
            take: 0,
            skip: 0,
          },
          headers: { Authorization: `Bearer ${user.access_token}` },
        });
        return dispatch(
          setNotificationsRedux({
            notificationsCount: response.data.total_unread_notifications,
          })
        );
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, [user]);

  return (
    <SafeAreaView style={[styles.header, headerStyle, checkNotch]}>
      <View>
        {showBack == 1 ? (
          <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 40, right: 20 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <BackIcon name="left" size={25} color={"#333"} />
          </TouchableOpacity>
        ) : (
          <IconMenu
            name="menu"
            size={36}
            color={"#333"}
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        )}
      </View>
      <View
        style={styles.logoContainer}
        onTouchStart={() => {
          navigation.navigate("HomePage");
        }}
      >
        <ImageBackground
          source={{
            uri: frontEndUriBase + "images/emlaksepettelogo.png",
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </View>

      <View style={styles.notificationContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          {notificationCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>{notificationCount}</Text>
            </View>
          )}
          <Icon name="bell" size={35} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    gap: 50,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 2,
  },
  logoContainer: {
    width: 200,
    height: 50,
  },
  logoImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  notificationContainer: {
    display: "flex",
    flexDirection: "row-reverse",
  },
  notificationBadge: {
    position: "absolute",
    top: -4,
    right: 4,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  notificationText: {
    color: "white",
    fontSize: 11,
  },
});
