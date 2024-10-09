import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/EvilIcons";
import IconMenu from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { getValueFor } from "./methods/user";
import { apiUrl } from "./methods/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import {
  setNotifications,
  setNotificationsRedux,
} from "../store/slices/Notifications/NotificationsSlice";

export default function Header(props) {
  const { loading, onPress, index, tabs } = props;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [user, setuser] = useState({});

  const notificationCount = useSelector(
    (state) => state.notifications.notificationsCount
  );

  useEffect(() => {
    getValueFor("user", setuser);
  }, []);

  const getNotifications = async () => {
    try {
      if (!user?.access_token) {
        // return setNotificationCount(0);
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
        console.debug("unreadCount------------------------->>> :", unreadCount);
        // setNotificationCount(unreadCount);

        return dispatch(
          setNotificationsRedux({
            notificationsCount: unreadCount,
          })
        );
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      // setNotificationCount(0);
    }
  };

  useEffect(() => {
    getNotifications();
  }, [user]);

  return (
    <SafeAreaView style={styles.header}>
      <View>
        <IconMenu
          name="menu"
          size={36}
          color={"#333"}
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      </View>
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
          source={{
            uri: "https://private.emlaksepette.com/images/emlaksepettelogo.png",
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    width: "100%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 2,
  },
});
