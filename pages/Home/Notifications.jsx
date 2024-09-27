import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";

import Notificate from "../../components/Notificate";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import "moment/locale/tr";
import { getValueFor } from "../../components/methods/user";
import axios from "axios";
import { Platform } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import { ActivityIndicator } from "react-native-paper";
import NoDataScreen from "./components/NoDataScreen";
import { apiUrl } from "../../components/methods/apiRequest";
import { useDispatch } from "react-redux";
import { setNotificationsRedux } from "../../store/slices/Notifications/NotificationsSlice";
import { Dialog } from "react-native-alert-notification";

export default function Notifications() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [loading, setloading] = useState(false);
  const navigation = useNavigation();
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [deleteAlertForNotification, setdeleteAlertForNotification] =
    useState(false);
  const [selectedNotificateId, setselectedNotificateId] = useState(0);
  const [alertFordeleteNotificate, setalertFordeleteNotificate] =
    useState(false);
  const [showDeletedAlert, setShowDeletedAlert] = useState({
    show: false,
    message: "",
    success: false,
  });

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

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
        (notification) => notification.is_show === 0
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

  //click tumunu sil button
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
      await fetchNotifications();

      dispatch(
        setNotificationsRedux({
          notificationsCount: 0,
        })
      );
      return setShowDeletedAlert({
        show: true,
        message: response.data.message,
        success: true,
      });
    } catch (error) {
      Alert.alert("Hata", "Silme işlemi başarısız oldu!");
      console.error("Error making DELETE request:", error);
    } finally {
      setloading(false);
    }
  };

  const selectnotificate = (id) => {
    setselectedNotificateId(id);
    setalertFordeleteNotificate(true);
  };

  const deleteNotificate = async () => {
    setloading(true);
    try {
      const response = await axios.delete(
        `${apiUrl}institutional/notification/delete`,
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
          data: {
            id: selectedNotificateId,
          },
        }
      );

      if (response.data.status) {
        await fetchNotifications();

        dispatch(
          setNotificationsRedux({
            notificationsCount: Math.max(0, notificationCount - 1),
          })
        );
        return setShowDeletedAlert({
          show: true,
          message: response.data.message,
          success: true,
        });
      } else {
        setalertFordeleteNotificate(false);
        Alert.alert("Başarısız", response.data.message);
      }

      setalertFordeleteNotificate(false);
    } catch (error) {
      Alert.alert("Hata", "Silme işlemi başarısız oldu!");
      console.error("Error making DELETE request:", error);
    } finally {
      setloading(false); // Move setloading(false) to the finally block
    }
  };

  const deletedAlert = () => {
    return (
      <AwesomeAlert
        show={showDeletedAlert.show === true}
        showProgress={false}
        titleStyle={{
          color: "#333",
          fontSize: 16,
          fontWeight: "700",
          textAlign: "center",
          margin: 5,
        }}
        title={showDeletedAlert.message}
        messageStyle={{ textAlign: "center" }}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Tamam"
        confirmButtonColor={showDeletedAlert.success ? "#1d8027" : "#ce4d63"}
        onConfirmPressed={() => {
          setShowDeletedAlert({
            ...showDeletedAlert,
            show: false,
          });
          setTimeout(() => {
            setShowDeletedAlert({
              show: false,
              message: "",
              success: false,
            });
          }, 300);
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
    );
  };

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
          {deletedAlert()}
          {user.access_token ? (
            <View style={styles.container}>
              {notifications?.length == 0 ? (
                <NoDataScreen
                  message="Bildiriminiz bulunmamaktadır."
                  iconName="bell-off"
                  buttonText="Anasayfaya Dön"
                  navigateTo="HomePage"
                />
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
                  <ScrollView>
                    <>
                      {notifications.map((item, index) => (
                        <Notificate
                          isShow={item.is_show}
                          selectnotificate={selectnotificate}
                          key={index}
                          id={item.id}
                          name={item.text}
                          time={moment(item.created_at)
                            .locale("tr")
                            .format("LLL")}
                        />
                      ))}
                    </>
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
                        "Tüm bildirimleri silmek istediğinize emin misiniz?"
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
                        deleteNotificate();
                        setalertFordeleteNotificate(false);
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
            <NoDataScreen
              message="Bildirimlerinizi görmek için giriş yapmanız gerekmektedir."
              iconName="bell"
              buttonText="Giriş Yap"
              navigateTo="Login"
            />
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
