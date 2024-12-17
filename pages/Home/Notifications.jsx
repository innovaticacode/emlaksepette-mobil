import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";

import Notificate from "../../components/Notificate";
import moment from "moment";
import "moment/locale/tr";
import { getValueFor } from "../../components/methods/user";
import axios from "axios";
import { Platform } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import { ActivityIndicator } from "react-native-paper";
import { apiUrl } from "../../components/methods/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationsRedux } from "../../store/slices/Notifications/NotificationsSlice";
import NoDataScreen from "../../components/NoDataScreen";

export default function Notifications() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
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
  const take = 10;
  const [skip, setSkip] = useState(0);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(null);
  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  /**
   * Fetches notification data from the API and updates the state.
   *
   * @async
   * @function fetchNotificationsData
   * @param {number} [newSkip=0] - The starting point (skip) for fetching data from the API.
   * @param {boolean} [append=false] - If `true`, appends the new data to the existing list; if `false`, replaces the list.
   * @param {number} [is_show=0] - if `0`, fetches all notifications; if `1`, fetches only unread notifications.
   * @returns {Promise<void>} - Does not return anything; it updates the component state.
   * @description
   * - Use `newSkip = 0` and `append = false` for the initial fetch.
   * - Use `newSkip` as the current skip value and `append = true` for loading more data (pagination).
   * - Stops fetching if there are no more notifications to load or if already in the process of loading.
   */
  const fetchNotificationsData = async (newSkip = 0, append = false) => {
    if (bottomLoading || (append && notifications.length >= totalCount)) {
      console.log("No more notifications to load");
      return;
    }

    append ? setBottomLoading(true) : setLoading(true);

    try {
      const response = await axios.get(apiUrl + "user/notification", {
        params: {
          take: take,
          skip: newSkip,
        },
        headers: { Authorization: `Bearer ${user.access_token}` },
      });

      if (response.data?.notifications) {
        setNotifications((prev) =>
          append
            ? [...prev, ...response.data.notifications]
            : response.data.notifications
        );
        setTotalCount(response.data.total_count);
        setSkip(newSkip + take);

        dispatch(
          setNotificationsRedux({
            notificationsCount: response.data.total_unread_notifications,
          })
        );
      }
    } catch (error) {
      console.error("Bildirimler alınırken hata oluştu:", error);
    } finally {
      append ? setBottomLoading(false) : setLoading(false);
    }
  };

  /**
   * Fetches the initial notifications.
   * @function fetchNotifications
   * @returns {void}
   * @description
   * - Fetches the first set of notifications and resets the list.
   */
  const fetchNotifications = () => fetchNotificationsData(0, false);
  const fetchMoreNotifie = () => fetchNotificationsData(skip, true);

  useEffect(() => {
    if (user?.access_token) {
      fetchNotifications();
    }
  }, [user.access_token]);

  //click tumunu sil button
  const deleteRequestWithToken = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(
        apiUrl + "institutional/notifications",
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
      setLoading(false);
    }
  };

  const selectnotificate = (id) => {
    setselectedNotificateId(id);
    setalertFordeleteNotificate(true);
  };

  const deleteNotificate = async () => {
    setLoading(true);
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
      setLoading(false);
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
        titleStyle={styles.alertTitle}
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
        confirmButtonTextStyle={styles.alertMargin}
        cancelButtonTextStyle={styles.alertMargin}
      />
    );
  };

  return (
    <>
      {loading ? (
        <View style={styles.loaderView}>
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
                  <View style={styles.btnsArea}>
                    <Text style={{ color: "grey" }}></Text>
                    <View style={styles.btnInner}>
                      {notifiCountRedux > 1 && (
                        <TouchableOpacity
                          style={styles.btn}
                          onPress={() => {
                            setReadShowAlert(true);
                          }}
                        >
                          <Text style={styles.btnText}>Tümünü Oku</Text>
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                          setdeleteAlertForNotification(true);
                        }}
                      >
                        <Text style={styles.btnText}>Tümünü Sil</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <>
                    <AwesomeAlert
                      show={readShowAlert}
                      showProgress={false}
                      titleStyle={styles.alertTitle}
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
                      confirmButtonTextStyle={styles.alertMargin}
                      cancelButtonTextStyle={styles.alertMargin}
                    />
                    <>
                      <FlatList
                        data={notifications}
                        keyExtractor={(item) => item.id.toString()}
                        initialNumToRender={10}
                        removeClippedSubviews={true}
                        maxToRenderPerBatch={5}
                        onEndReachedThreshold={0.5}
                        onEndReached={fetchMoreNotifie}
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
                        ListFooterComponent={
                          bottomLoading && (
                            <ActivityIndicator
                              size="small"
                              color="#000"
                              style={{ margin: 10 }}
                            />
                          )
                        }
                      />
                    </>
                    <AwesomeAlert
                      show={deleteAlertForNotification}
                      showProgress={false}
                      titleStyle={styles.alertTitle}
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
                      confirmButtonTextStyle={styles.alertMargin}
                      cancelButtonTextStyle={styles.alertMargin}
                    />

                    <AwesomeAlert
                      show={alertFordeleteNotificate}
                      showProgress={false}
                      titleStyle={styles.alertTitle}
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
                      confirmButtonTextStyle={styles.alertMargin}
                      cancelButtonTextStyle={styles.alertMargin}
                    />
                  </>
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
  loaderView: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnsArea: {
    paddingBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btnInner: {
    flexDirection: "row",
    gap: 16,
    marginRight: 5,
  },
  btn: {
    backgroundColor: "#EB2B2E",
    textAlign: "center",
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 5,
  },
  btnText: {
    alignItems: "center",
    color: "#ffffff",
    fontWeight: "700",
  },
  alertTitle: {
    color: "#333",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
    margin: 5,
  },
  alertMargin: {
    marginLeft: 20,
    marginRight: 20,
  },
});
