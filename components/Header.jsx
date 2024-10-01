import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/EvilIcons";
import IconMenu from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { getValueFor } from "./methods/user";
import { apiUrl } from "./methods/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationsRedux } from "../store/slices/Notifications/NotificationsSlice";
import { setUser } from "../store/user/UserSlice";

export default function Header({ loading, onPress, index, tab }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const notificationCount = useSelector(
    (state) => state.notifications.notificationsCount
  );

  const user = useSelector(
    (state) => state.user
  );

  console.log(user);

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
        const response = await axios.get(`${apiUrl}user/notification`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });
        const unreadCount = response.data.filter(
          (notification) => notification.is_show === 0
        ).length;
        return dispatch(
          setNotificationsRedux({
            notificationsCount: unreadCount,
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
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          onPress();
        }}
      >
        <IconMenu name="menu" size={37} color={"#333"} />
      </TouchableOpacity>
      <View
        onTouchStart={() => {
          navigation.navigate("HomePage");
          index(0);
          tab(0);
        }}
        style={{
          width: 200,
          height: 50,
        }}
      >
        <ImageBackground
          source={{
            uri: "http://192.168.18.31:8000/images/emlaksepettelogo.png",
          }}
          resizeMode="contain"
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
          }}
        />
      </View>

      <View style={{ display: "flex", flexDirection: "row-reverse" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Notifications")}
          style={{
            width: 50,
            alignItems: "center",
            borderRadius: 15,
          }}
        >
          {notificationCount > 0 && (
            <View
              style={{
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
              }}
            >
              <Text style={{ color: "white", fontSize: 11 }}>
                {notificationCount}
              </Text>
            </View>
          )}
          <Icon name="bell" size={35} />
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
    paddingTop: Platform.OS === "android" ? 0 : 0,
    width: "100%",
  },
});
