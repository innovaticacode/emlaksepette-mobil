import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import AddBtn from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/EvilIcons";
import IconMenu from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { getValueFor } from "./methods/user";

export default function Header({ loading, onPress, index, tab }) {
  const navigation = useNavigation();
  const [notificationCount, setNotificationCount] = useState(0);
  const [user, setuser] = useState({});
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getValueFor("user", setuser);
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (!user?.access_token) {
          setNotifications([]);
          setNotificationCount(0);
          return;
        }

        const response = await axios.get(
          "https://private.emlaksepette.com/api/user/notification",
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );

        if (response.data) {
          setNotifications(response.data);
        } else {
          setNotifications([]);
        }

        const unreadCount = response.data.filter(
          (notification) => notification.readed === 0
        ).length;
        setNotificationCount(unreadCount);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotifications([]);
        setNotificationCount(0); // Set unreadCount to 0 in case of an error
      }
    };

    if (user?.access_token) {
      fetchNotifications();
    }
  }, [user?.access_token]);
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
          onPress={() =>
            navigation.navigate("Notifications", { notifications })
          }
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
                backgroundColor: "red",
                paddingLeft: 6,
                paddingRight: 6,
                paddingTop: 2,
                paddingBottom: 2,
                bottom: 22,
                left: 23,
                zIndex: 1,
                borderRadius: 20,
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
