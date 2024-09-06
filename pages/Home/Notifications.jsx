import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import Notificate from "../../components/Notificate";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import moment from "moment";
import "moment/locale/tr";
import { getValueFor } from "../../components/methods/user";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Platform } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import { ActivityIndicator } from "react-native-paper";

export default function Notifications() {
  const route = useRoute();

  const [user, setUser] = useState({});
  useEffect(() => {
    getValueFor("user", setUser);
  }, []);
  console.log(user);
  const [loading, setloading] = useState(false);

  const navigation = useNavigation();

  const [notificationCount, setNotificationCount] = useState(0);

  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      if (!user?.access_token) {
        setNotifications([]);
        setNotificationCount(0);
        return;
      }
      setloading(true);
      const response = await axios.get(
        "https://private.emlaksepette.com/api/user/notification",
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );

      if (response.data) {
        // Bildirimleri tarihe göre sıralama (en yeni tarihler en üstte)
        const sortedNotifications = response.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setNotifications(sortedNotifications);
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
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (user?.access_token) {
      fetchNotifications();
    }
  }, [user.access_token]);

  const deleteRequestWithToken = async () => {
    setloading(true);
    try {
      const response = await axios.delete(
        "https://private.emlaksepette.com/api/institutional/notifications",
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      );
      Alert.alert("Başarılı", "Silme işlemi başarılı!");
      fetchNotifications();
      console.log("Delete request successful:", response.data);
    } catch (error) {
      Alert.alert("Hata", "Silme işlemi başarısız oldu!");
      console.error("Error making DELETE request:", error);
    } finally {
      setloading(false);
    }
  };
  const deleteNotifacte = async () => {
    setloading(true);

    try {
      const response = await axios.delete(
        "https://private.emlaksepette.com/api/institutional/notification/delete",
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
          data: {
            id: selectedNotificateId,
            userId: user?.id,
          },
        }
      );

      if (response.data.success) {
        // Başarı kontrolü yapın
        fetchNotifications();
        Alert.alert("Başarılı", "Silme işlemi başarılı!");
      } else {
        Alert.alert("Hata", "Silme işlemi başarısız oldu!");
      }

      setalertFordeleteNotificate(false);
    } catch (error) {
      Alert.alert("Hata", "Silme işlemi başarısız oldu!");
      console.error("Error making DELETE request:", error);
    } finally {
      setloading(false);
    }
  };

  const [deleteAlertForNotification, setdeleteAlertForNotification] =
    useState(false);
  const [selectedNotificateId, setselectedNotificateId] = useState(0);
  const [alertFordeleteNotificate, setalertFordeleteNotificate] =
    useState(false);
  const selectnotificate = (id) => {
    setselectedNotificateId(id);
    setalertFordeleteNotificate(true);
  };

  console.log(selectedNotificateId);
  return (
    <>
      {loading ? (
        <View
          style={{
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator color="#333" size={"large"} />
        </View>
      ) : (
        <>
          {user.access_token ? (
            <View style={styles.container}>
              {notifications?.length == 0 ? (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    gap: 10,
                  }}
                >
                  <View
                    style={[
                      styles.card,
                      { alignItems: "center", justifyContent: "center" },
                    ]}
                  >
                    <Icon name="bell" size={50} color={"#EA2A28"} />
                  </View>
                  <View>
                    <Text
                      style={{ color: "grey", fontSize: 16, fontWeight: "600" }}
                    >
                      Bildiriminiz bulunmamaktadır
                    </Text>
                    <Text></Text>
                  </View>
                  <View style={{ width: "100%", alignItems: "center" }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#EA2A28",
                        width: "90%",
                        padding: 8,
                        borderRadius: 5,
                      }}
                      onPress={() => {
                        navigation.navigate("HomePage");
                      }}
                    >
                      <Text
                        style={{
                          color: "#ffffff",
                          fontWeight: "600",
                          textAlign: "center",
                        }}
                      >
                        Ana Sayfa'ya dön
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <>
                  <View
                    style={{
                      paddingBottom: 5,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "grey" }}>Bugün</Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#EB2B2E",
                        paddingLeft: 20,
                        paddingRight: 20,
                        padding: 3,
                        borderRadius: 5,
                      }}
                      onPress={() => {
                        setdeleteAlertForNotification(true);
                      }}
                    >
                      <Text
                        style={{
                          alignItems: "center",
                          color: "#ffffff",
                          fontWeight: "700",
                        }}
                      >
                        Tümünü Sil
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <ScrollView style={{}}>
                    <View style={{ gap: 15 }}>
                      {notifications.map((item, index) => (
                        <Notificate
                          selectnotificate={selectnotificate}
                          key={index}
                          id={item.id}
                          name={item.text}
                          time={moment(item.created_at)
                            .locale("tr")
                            .format("LLL")}
                        />
                      ))}
                    </View>
                    <AwesomeAlert
                      show={deleteAlertForNotification}
                      showProgress={false}
                      titleStyle={{
                        color: "#333",
                        fontSize: 13,
                        fontWeight: "700",
                        textAlign: "center",
                        margin: 5,
                      }}
                      title={
                        "Tüm bildirimleri silmek istediğinize eminmisiniz?"
                      }
                      messageStyle={{ textAlign: "center" }}
                      closeOnTouchOutside={true}
                      closeOnHardwareBackPress={false}
                      showCancelButton={true}
                      showConfirmButton={true}
                      cancelText="Hayır"
                      confirmText="Evet"
                      cancelButtonColor="#ce4d63"
                      confirmButtonColor="#1d8027"
                      onCancelPressed={() => {
                        setdeleteAlertForNotification(false);
                      }}
                      onConfirmPressed={() => {
                        deleteRequestWithToken();
                      }}
                      confirmButtonTextStyle={{
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                      cancelButtonTextStyle={{
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                    />
                    <AwesomeAlert
                      show={alertFordeleteNotificate}
                      showProgress={false}
                      titleStyle={{
                        color: "#333",
                        fontSize: 13,
                        fontWeight: "700",
                        textAlign: "center",
                        margin: 5,
                      }}
                      title={"Bildirimi silmek istediğinize eminmisiniz?"}
                      messageStyle={{ textAlign: "center" }}
                      closeOnTouchOutside={true}
                      closeOnHardwareBackPress={false}
                      showCancelButton={true}
                      showConfirmButton={true}
                      cancelText="Hayır"
                      confirmText="Evet"
                      cancelButtonColor="#ce4d63"
                      confirmButtonColor="#1d8027"
                      onCancelPressed={() => {
                        setalertFordeleteNotificate(false);
                      }}
                      onConfirmPressed={() => {
                        deleteNotifacte();
                      }}
                      confirmButtonTextStyle={{
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                      cancelButtonTextStyle={{
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                    />
                  </ScrollView>
                </>
              )}
            </View>
          ) : (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: 10,
                backgroundColor: "white",
              }}
            >
              <View
                style={[
                  styles.card,
                  { alignItems: "center", justifyContent: "center" },
                ]}
              >
                <Icon name="bell" size={50} color={"#EA2A28"} />
              </View>
              <View>
                <Text
                  style={{
                    color: "grey",
                    fontSize: 16,
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  Bildirimlerinizi görmek için giriş yapmanız gerekmektedir
                </Text>
                <Text></Text>
              </View>
              <View style={{ width: "100%", alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#EA2A28",
                    width: "90%",
                    padding: 8,
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    navigation.navigate("Login");
                  }}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    Giriş Yap
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    flex: 1,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,

    borderRadius: 50,

    borderWidth: 0.7,
    borderColor: "#e6e6e6",
    ...Platform.select({
      ios: {
        shadowColor: " #e6e6e6",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
