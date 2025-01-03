import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import SubUser from "./profileComponents/SubUser";
import ModalEdit from "react-native-modal";
import axios from "axios";
import { getValueFor } from "../../../components/methods/user";
import Icon from "react-native-vector-icons/FontAwesome";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AwesomeAlert from "react-native-awesome-alerts";

import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from "react-native-alert-notification";
import { ActivityIndicator } from "react-native-paper";
import { Platform } from "react-native";
import NoDataScreen from "../../../components/NoDataScreen";
import { apiUrl } from "../../../components/methods/apiRequest";
export default function UsersList() {
  const navigation = useNavigation();
  const isfocused = useIsFocused();

  const [modalVisible, setModalVisible] = useState(false);
  const [subUsers, setsubUsers] = useState([]);
  const [loading, setloading] = useState(true);
  const [user, setuser] = useState({});
  const [SuccessDelete, setSuccessDelete] = useState(false);
  const [selectedUser, setselectedUser] = useState(0);
  const [SelectedUserIDS, setSelectedUserIDS] = useState([]);
  const [openDeleteModal, setopenDeleteModal] = useState(false);
  const [isChoosed, setisChoosed] = useState(false);
  const [isShowDeleteButon, setisShowDeleteButon] = useState(false);
  const [userList, setuserList] = useState([]);
  const [deleteAllUserType, setdeleteAllUserType] = useState(false);
  const [deleteUserModal, setdeleteUserModal] = useState(false);
  const [selectedUserDeleteModa, setselectedUserDeleteModa] = useState(false);
  const [showText, setshowText] = useState(false);
  const [passiveSubUsers, setPassiveSubUsers] = useState([]);

  useEffect(() => {
    getValueFor("user", setuser);
  }, []);

  const fetchData = async () => {
    setloading(true);
    try {
      if (user.access_token) {
        const response = await axios.get(apiUrl + "institutional/users", {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });
        const activeUsers = response.data.users.filter(
          (user) => user.status != "5"
        );
        const passiveUsers = response.data.users.filter(
          (user) => user.status == "5"
        );

        // Durumları ayarla
        setsubUsers(activeUsers);
        setPassiveSubUsers(passiveUsers);
      }
    } catch (error) {
      if (error.response) {
        console.error("Sunucudan dönen hata:", error.response.data);
      } else {
        console.error("İstek sırasında hata oluştu:", error.message);
      }
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user, isfocused]);

  const DeleteUser = async () => {
    setloading(true);

    try {
      if (user.access_token) {
        try {
          console.log("selectedUser", selectedUser.id);
          const response = await axios.put(
            `${apiUrl}institutional/users/${selectedUser?.id}/deactivate`,
            {
              should_deactivate_all: false,
            },
            {
              headers: {
                Authorization: `Bearer ${user?.access_token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 200) {
            setTimeout(() => {
              Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: "Başarılı",
                textBody: `${selectedUser.name} Adlı kullanıcı silindi.`,
                button: "Tamam",
                onHide: () => {
                  fetchData();
                },
              });
            }, 300);
          }
          setloading(false);
          return setopenDeleteModal(false);
        } catch (error) {
          if (error.response) {
            console.error("Sunucudan dönen hata:", error.response.data);
          } else {
            console.error("İstek sırasında hata oluştu:", error.message);
          }
        }

        console.log("DELETE Response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  const GetId = (UserID, name) => {
    setselectedUser(UserID);
  };

  const getUserID = (UserID) => {
    setSelectedUserIDS((prevIds) => {
      if (prevIds.includes(UserID)) {
        return prevIds.filter((item) => item !== UserID);
      } else {
        return [...prevIds, UserID];
      }
    });
  };
  useEffect(() => {
    navigation.setOptions({
      title: `Ekip Üyeleri (${subUsers?.length})`,
    });
  }, [navigation, subUsers]);

  const deleteAllUsers = async () => {
    const data = {
      user_ids: userList,
    };
    try {
      const response = await axios.delete(apiUrl + "institutional/sub-users", {
        data: data,
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      });
      console.log("DELETE Response:", response);

      if (response.status === 200) {
        setTimeout(() => {
          console.log("dialog");
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: `Başarılı`,
            textBody: `${userList.length} Kullanıcı Silindi.`,
            button: "Tamam",
            onHide: () => {
              fetchData();
              setuserList([]);
            },
          });
          setloading(false);
        }, 300);

        setdeleteAllUserType(false);
      }
    } catch (error) {
      console.error("Error making DELETE request:", error);
    }
  };
  const deleteSelectedUser = async () => {
    const data = {
      user_ids: SelectedUserIDS,
    };
    try {
      const response = await axios.delete(apiUrl + "institutional/sub-users", {
        data: data,
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      });
      if (response.status === 200) {
        setTimeout(() => {
          console.log("dialog");
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: `Başarılı.`,
            textBody: `${SelectedUserIDS.length} Kullanıcı Silindi.`,
            button: "Tamam",
            onHide: () => {
              fetchData();
              setSelectedUserIDS([]);
            },
          });
          console.log("load");
          setloading(false);
        }, 300);

        setselectedUserDeleteModa(false);
        setisChoosed(false);
        setisShowDeleteButon(!isShowDeleteButon);
      }
    } catch (error) {
      console.error("Error making DELETE request:", error);
    }
  };

  const [isPassive, setIsPassive] = useState(false);

  const tabs = [
    {
      label: "Aktif Ekip Üyeleri",
      isActive: !isPassive,
      onPress: () => setIsPassive(false),
    },
    {
      label: "Pasife Alınan Üyeler",
      isActive: isPassive,
      onPress: () => setIsPassive(true),
    },
  ];

  // console.log(passiveSubUsers.length);
  // console.log(subUsers.length);

  return (
    <AlertNotificationRoot>
      <>
        <View style={styles.sectionSelect}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              style={[
                styles.memberButton,
                tab.isActive ? styles.activeMembers : styles.passiveMembers,
              ]}
              onPress={tab.onPress}
            >
              <Text style={[styles.text, tab.isActive && styles.activeText]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </>
      {loading ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <ActivityIndicator size={"large"} color="#333" />
        </View>
      ) : subUsers?.length || passiveSubUsers?.length > 0 ? (
        <>
          {isPassive ? (
            passiveSubUsers.length > 0 ? (
              <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
                {passiveSubUsers.map((item, index) => (
                  <SubUser
                    key={index}
                    setModalVisible={setModalVisible}
                    item={item}
                    GetId={GetId}
                    isChoosed={isChoosed}
                    getUserID={getUserID}
                  />
                ))}
              </ScrollView>
            ) : (
              <NoDataScreen
                iconName={"account-off"}
                buttonText={"Anasayfa"}
                navigateTo={"Home"}
                message={"Pasife alınan ekip üyesi bulunmamaktadır."}
              />
            )
          ) : subUsers.length > 0 ? (
            <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
              {subUsers.map((item, index) => (
                <SubUser
                  key={index}
                  setModalVisible={setModalVisible}
                  item={item}
                  GetId={GetId}
                  isChoosed={isChoosed}
                  getUserID={getUserID}
                />
              ))}
            </ScrollView>
          ) : (
            <NoDataScreen
              iconName={"account-multiple-plus"}
              buttonText={"Oluştur"}
              navigateTo={"CreateUser"}
              message={"Aktif Ekip Üyeniz Bulunmamaktadır"}
            />
          )}

          <AwesomeAlert
            show={openDeleteModal}
            showProgress={false}
            titleStyle={{
              color: "#333",
              fontSize: 13,
              fontWeight: "700",
              textAlign: "center",
              margin: 5,
            }}
            title={`${selectedUser.name} adlı kullanıcıyı silmek istediğinize emin misiniz?`}
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
              setopenDeleteModal(false);
            }}
            onConfirmPressed={() => {
              DeleteUser();
            }}
            confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
            cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
          />
          <AwesomeAlert
            show={deleteAllUserType}
            showProgress={false}
            titleStyle={{
              color: "#333",
              fontSize: 13,
              fontWeight: "700",
              textAlign: "center",
              margin: 5,
            }}
            title={`${userList.length} Kullanıcıyı silmek istediğinize emin misiniz?`}
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
              setdeleteAllUserType(false);
            }}
            onConfirmPressed={() => {
              deleteAllUsers();
            }}
            confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
            cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
          />
          <AwesomeAlert
            show={deleteUserModal}
            showProgress={false}
            titleStyle={{
              color: "#333",
              fontSize: 13,
              fontWeight: "700",
              textAlign: "center",
              margin: 5,
            }}
            title={`${selectedUser.name} adlı kullanıcıyı silmek istediğinize emin misiniz?`}
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
              setopenDeleteModal(false);
            }}
            onConfirmPressed={() => {
              DeleteUser();
            }}
            confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
            cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
          />
          <AwesomeAlert
            show={selectedUserDeleteModa}
            showProgress={false}
            titleStyle={{
              color: "#333",
              fontSize: 13,
              fontWeight: "700",
              textAlign: "center",
              margin: 5,
            }}
            title={`${SelectedUserIDS.length}  kullanıcıyı silmek istediğinize emin misiniz?`}
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
              setselectedUserDeleteModa(false);
            }}
            onConfirmPressed={() => {
              deleteSelectedUser();
            }}
            confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
            cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
          />
          <View
            style={{
              flexDirection: "row",
              padding: 6,
              paddingTop: 10,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {isShowDeleteButon == true && (
              <View
                style={{ flexDirection: "row", gap: 9, alignItems: "center" }}
              >
                <Text>Seçili({SelectedUserIDS.length})</Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: "red",
                    paddingLeft: 8,
                    paddingRight: 8,
                    paddingTop: 5,
                    paddingBottom: 5,
                    borderRadius: 6,
                  }}
                  onPress={() => {
                    if (SelectedUserIDS.length == 0) {
                      setshowText(!showText);
                      setTimeout(() => {
                        setshowText(false);
                      }, 2000);
                    } else {
                      setselectedUserDeleteModa(true);
                    }
                  }}
                >
                  <Icon name="trash" size={18} color={"#ffffff"} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          {showText && (
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: "700",
                  color: "#EC302E",
                }}
              >
                Lütfen Silmek İstediğiniz Kullanıcıyı Seçiniz!
              </Text>
            </View>
          )}
          {/* <View style={{ gap: 10, padding: 5, paddingBottom: 100 }}>
            {subUsers?.map((item, index) => (
              <SubUser
                key={index}
                setModalVisible={setModalVisible}
                item={item}
                GetId={GetId}
                isChoosed={isChoosed}
                getUserID={getUserID}
              />
            ))}
          </View> */}
          <ModalEdit
            animationIn={"fadeInDown"}
            animationOut={"fadeOutDownBig"}
            isVisible={modalVisible}
            onBackdropPress={() => setModalVisible(false)}
            swipeDirection={["down"]}
            onSwipeComplete={() => setModalVisible(false)}
            backdropColor="transparent"
            style={styles.modal3}
          >
            <View style={[styles.modalContent3, { gap: 10 }]}>
              <View style={{ alignItems: "center", paddingTop: 15 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#eaeff5",
                    padding: 4,
                    width: "15%",
                    borderRadius: 20,
                  }}
                />
              </View>
              <View style={{ gap: 10, padding: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate("UpdateUsers", {
                      UserID: selectedUser.id,
                      fetcData: fetchData,
                    });
                  }}
                  style={{
                    padding: 10,
                    backgroundColor: "#79ad69",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: "white" }}>Kullanıcıyı Düzenle</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    setTimeout(() => {
                      setopenDeleteModal(true);
                    }, 600);
                  }}
                  style={{
                    padding: 10,
                    backgroundColor: "#EA2A28",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: "white" }}>Kullanıcıyı Pasife Al</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ModalEdit>
          <ModalEdit
            animationIn={"zoomInUp"}
            animationOut={"zoomOutUp"}
            animationInTiming={200}
            animationOutTiming={300}
            isVisible={SuccessDelete}
            onBackdropPress={() => setSuccessDelete(false)}
            swipeDirection={["down"]}
            onSwipeComplete={() => setSuccessDelete(false)}
            backdropColor="transparent"
            style={styles.modal4}
          >
            <View
              style={[
                styles.modalContent4,
                { gap: 10, alignItems: "center", justifyContent: "center" },
              ]}
            >
              <Text>{selectedUser.name} adlı Kullanıcınız silindi</Text>
            </View>
          </ModalEdit>
        </>
      ) : (
        <NoDataScreen
          iconName={"account-multiple-plus"}
          buttonText={"Oluştur"}
          navigateTo={"CreateUser"}
          message={"Ekip Üyeniz Bulunmamaktadır"}
        />
      )}
    </AlertNotificationRoot>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  noCommentsText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginTop: 8,
  },
  returnButton: {
    backgroundColor: "#EA2B2E",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  returnButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modal3: {
    justifyContent: "flex-end",
    margin: 0,
    backgroundColor: "#18181897",
  },
  modalContent3: {
    backgroundColor: "#f5f5f7",

    height: "30%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modal4: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    backgroundColor: "#18181897",
  },
  modalContent4: {
    backgroundColor: "#f5f5f7",
    width: "80%",
    height: "10%",
    borderRadius: 5,
  },
  btnRemove: {
    backgroundColor: "#EEEDEB",
    borderWidth: 1,
    borderColor: "#ebebeb",
    padding: 7,
    borderRadius: 5,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,

    borderRadius: 50,

    borderWidth: 0.6,
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
  activeMembers: {
    borderBottomWidth: 0.5,
    borderColor: "#e63946",
  },
  passiveMembers: {
    borderBottomWidth: 0.5,
    borderColor: "#333",
  },
  sectionSelect: {
    flexDirection: "row",
    padding: 10,
    gap: 10,
    backgroundColor: "#FFF",
  },
  passiveText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },
  activeText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#e63946",
  },
});
