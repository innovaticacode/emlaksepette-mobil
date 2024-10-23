import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
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
import { apiRequestGet, apiUrl } from "../../components/methods/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationsRedux } from "../../store/slices/Notifications/NotificationsSlice";
import NoDataScreen from "../../components/NoDataScreen";

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
  const [readShowAlert, setReadShowAlert] = useState(false);

  const notifiCountRedux = useSelector(
    (state) => state.notifications.notificationsCount
  );

  const [notifiContent, setNotifiContent] = useState([]);

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

      if (response) {
        const unreadCount = response.data.filter(
          (notification) => notification.is_show === 0
        ).length;

        dispatch(
          setNotificationsRedux({
            notificationsCount: unreadCount,
          })
        );
      }
    } catch (error) {
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

      return setShowDeletedAlert({
        show: true,
        message: response.data.message,
        success: true,
      });
    } catch (error) {
      Alert.alert("Hata", "Silme işlemi başarısız oldu!");
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
    } finally {
      setloading(false);
    }
  };

  const oneAlertRead = async (id) => {
    try {
      const response = await axios.post(
        `${apiUrl}institutional/notification/read`,
        { id: id },
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      );

      return response && (await fetchNotifications());
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const allRead = async () => {
    try {
      const response = await axios.get(`${apiUrl}institutional/markAllAsRead`, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      });
      return response && (await fetchNotifications());
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
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
                    <Text style={{ color: "grey" }}></Text>
                    <View style={{ flexDirection: "row", gap: 16, marginRight: 5 }}>
                      {notifiCountRedux > 1 && (
                        <TouchableOpacity
                          style={{
                            backgroundColor: "#EB2B2E",
                            textAlign: "center",
                            paddingHorizontal: 16,
                            paddingVertical: 4,
                            borderRadius: 5,
                          }}
                          onPress={() => {
                            setReadShowAlert(true);
                          }}
                        >
                          <Text
                            style={{
                              alignItems: "center",
                              color: "#ffffff",
                              fontWeight: "700",
                            }}
                          >
                            Tümünü Oku
                          </Text>
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#EB2B2E",
                          textAlign: "center",
                          paddingHorizontal: 16,
                          paddingVertical: 4,
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
                  </View>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <AwesomeAlert
                      show={readShowAlert}
                      showProgress={false}
                      titleStyle={{
                        color: "#333",
                        fontSize: 13,
                        fontWeight: "700",
                        textAlign: "center",
                        margin: 5,
                      }}
                      title={
                        "Tüm bildirimleri okundu olarak işaretlemek istediğinize emin misiniz?"
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
                        setReadShowAlert(false);
                      }}
                      onConfirmPressed={() => {
                        allRead();
                        setReadShowAlert(false);
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
                    <>
                      <FlatList
                        data={notifications}
                        keyExtractor={(item) => item.id.toString()}
                        initialNumToRender={10}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item }) => (
                          <Notificate
                            isShow={item.is_show}
                            selectnotificate={selectnotificate}
                            id={item.id}
                            name={item.text}
                            time={moment(item.created_at)
                              .locale("tr")
                              .format("LLL")}
                            onRead={oneAlertRead}
                            desc={item.content}
                            title={item.title}
                          />
                        )}
                      />
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
    paddingVertical: 10,
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
