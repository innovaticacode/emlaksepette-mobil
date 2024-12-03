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
import Icon2 from "react-native-vector-icons/FontAwesome6";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from "react-native-alert-notification";
import { ActivityIndicator } from "react-native-paper";
import { Platform } from "react-native";
export default function UsersList() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [subUsers, setsubUsers] = useState([]);
  const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);
  const [loading, setloading] = useState(false);
  const fetchData = async () => {
    setloading(true);
    try {
      if (user.access_token) {
        const response = await axios.get(
          "http://192.168.18.31:8000/api/institutional/users",
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        setsubUsers(response.data.users);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setloading(false);
    }
  };
  const isfocused = useIsFocused();
  console.log(user?.access_token);
  useEffect(() => {
    fetchData();
  }, [user, isfocused]);
  const [SuccessDelete, setSuccessDelete] = useState(false);
  const DeleteUser = async () => {
    try {
      if (user.access_token) {
        const response = await axios.delete(
          `http://192.168.18.31:8000/api/institutional/users/${selectedUser}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Başarılı",
          textBody: `${selectedUserName} Adlı kullanıcı silindi.`,
          button: "Tamam",
        });
        setopenDeleteModal(false);
        fetchData();

        setsubUsers(response.data.users);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [selectedUser, setselectedUser] = useState(0);
  const [selectedUserName, setselectedUserName] = useState("");
  const [SelecteduserID, setSelecteduserID] = useState(0);
  const [SelectedUserIDS, setSelectedUserIDS] = useState([]);

  const GetId = (UserID, name) => {
    setselectedUser(UserID);
    setselectedUserName(name);
  };

  const getUserID = (UserID) => {
    setSelecteduserID(UserID);
    setSelectedUserIDS((prevIds) => {
      if (prevIds.includes(UserID)) {
        return prevIds.filter((item) => item !== UserID);
      } else {
        return [...prevIds, UserID];
      }
    });
  };
  console.log(SelectedUserIDS);
  const [openDeleteModal, setopenDeleteModal] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      title: `Alt Kullanıcılar (${subUsers?.length})`,
    });
  }, [navigation, subUsers]);
  const [isChoosed, setisChoosed] = useState(false);
  const [isShowDeleteButon, setisShowDeleteButon] = useState(false);

  const [userList, setuserList] = useState([]);
  const [deleteAllUserType, setdeleteAllUserType] = useState(false);
  const [deleteUserModal, setdeleteUserModal] = useState(false);
  const [selectedUserDeleteModa, setselectedUserDeleteModa] = useState(false);
  const deleteAllUsers = async () => {
    const data = {
      user_ids: userList,
    };
    try {
      const response = await axios.delete(
        "http://192.168.18.31:8000/api/institutional/sub-users",
        {
          data: data,
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: `Başarılı`,
        textBody: `${userList.length} Kullanıcı Silindi.`,
        button: "Tamam",
      });
      fetchData();
      setuserList([]);
      setdeleteAllUserType(false);
    } catch (error) {
      console.error("Error making DELETE request:", error);
    }
  };
  const deleteSelectedUser = async () => {
    const data = {
      user_ids: SelectedUserIDS,
    };
    try {
      const response = await axios.delete(
        "http://192.168.18.31:8000/api/institutional/sub-users",
        {
          data: data,
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: `Başarılı.`,
        textBody: `${SelectedUserIDS.length} Kullanıcı Silindi.`,
        button: "Tamam",
      });
      fetchData();
      setSelectedUserIDS([]);
      setselectedUserDeleteModa(false);
      setisChoosed(false);
      setisShowDeleteButon(!isShowDeleteButon);
    } catch (error) {
      console.error("Error making DELETE request:", error);
    }
  };

  const [showText, setshowText] = useState(false);
  return (
    <AlertNotificationRoot>
      {loading ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <ActivityIndicator size={"large"} color="#333" />
        </View>
      ) : subUsers.length == 0 ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            gap: 10,
            backgroundColor: "white",
            marginTop: -62,
          }}
        >
          <View
            style={[
              styles.card,
              { alignItems: "center", justifyContent: "center" },
            ]}
          >
            <Icon2 name="user-tie" size={35} color={"#EA2A28"} />
          </View>
          <View>
            <Text style={styles.noCommentsText}>
              Daha önce alt kullanıcı oluşturmadınız.
            </Text>
            <Text></Text>
          </View>
          <View style={{ width: "100%", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.returnButton}
              onPress={() => {
                setloading(true);
                setTimeout(() => {
                  navigation.navigate("CreateUser");
                  setloading(false);
                }, 700);
              }}
            >
              <Text style={styles.returnButtonText}>Oluştur</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
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
            title={`${selectedUserName} adlı kullanıcıyı silmek istediğinize emin misiniz?`}
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
            title={`${selectedUserName} adlı kullanıcıyı silmek istediğinize emin misiniz?`}
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
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                style={styles.btnRemove}
                onPress={() => {
                  setdeleteAllUserType(true);
                  const Users = subUsers.map((item) => item.id);
                  setuserList(Users);
                }}
              >
                <Text
                  style={{ fontSize: 13, fontWeight: "700", color: "#333" }}
                >
                  Tümünü Sil
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnRemove}
                onPress={() => {
                  setisShowDeleteButon(!isShowDeleteButon);
                  setisChoosed(!isChoosed);
                  setSelectedUserIDS([]);
                }}
              >
                <Text
                  style={{ fontSize: 13, fontWeight: "700", color: "#333" }}
                >
                  {isChoosed == true ? "Seçimi İptal Et" : "Toplu Seç"}
                </Text>
              </TouchableOpacity>
            </View>

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
          <View style={{ gap: 10, padding: 5, paddingBottom: 100 }}>
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
          </View>
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
                      UserID: selectedUser,
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
                  <Text style={{ color: "white" }}>Kullanıcıyı Sil</Text>
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
              <Text>{selectedUserName} adlı Kullanıcınız silindi</Text>
            </View>
          </ModalEdit>
        </ScrollView>
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
});
