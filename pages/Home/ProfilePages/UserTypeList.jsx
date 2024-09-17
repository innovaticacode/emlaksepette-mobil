import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import Users from "./profileComponents/Users";
import { getValueFor } from "../../../components/methods/user";
import Modal from "react-native-modal";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/FontAwesome6";
import AwesomeAlert from "react-native-awesome-alerts";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from "react-native-alert-notification";
import { ActivityIndicator } from "react-native-paper";
import { useIsFocused, useNavigation } from "@react-navigation/native";
export default function UserTypeList() {
  const [userList, setuserList] = useState([]);
  const navigation = useNavigation();
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
          "https://private.emlaksepette.com/api/institutional/roles",
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        setuserList(response?.data.roles);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setloading(false);
    }
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    fetchData();
  }, [user, isFocused]);
  const roles = userList;

  // Her bir rolü map fonksiyonu ile dönüştür ve yeni bir dizi oluştur
  const transformedRoles = roles.map((role) => ({
    id: role.id,
    name: role.name.charAt(0).toUpperCase() + role.name.slice(1),
  }));

  //Delete
  const [DeletedData, setDeletedData] = useState({});
  const [deletedSuccessMessage, setdeletedSuccessMessage] = useState(false);
  const DeleteUser = async (UserId) => {
    try {
      const response = await axios.delete(
        `https://private.emlaksepette.com/api/institutional/roles/${UserId}`,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );
      fetchData();
      setDeletedData(response.data);
      setdeletedSuccessMessage(false);
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Başarılı",
        textBody: `${selectedUserName} adlı kullanıcı silindi.`,
        button: "Tamam",
      });
    } catch (error) {
      console.error("Delete request error:", error);
    }
  };
  const [selectedUserName, setselectedUserName] = useState("");
  const [selectedUserId, setselectedUserId] = useState(0);
  const getUserIdAndName = (UserId, name) => {
    setdeletedSuccessMessage(true);
    setselectedUserId(UserId);
    setselectedUserName(name);
  };

  useEffect(() => {
    navigation.setOptions({
      title: `Kullanıcı Tipleri (${transformedRoles?.length})`,
    });
  }, [navigation, transformedRoles]);
  const [isChoosed, setisChoosed] = useState(false);
  const [isShowDeleteButon, setisShowDeleteButon] = useState(false);
  const [SelecteduserID, setSelecteduserID] = useState(0);
  const [SelectedUserIDS, setSelectedUserIDS] = useState([]);
  const [deleteUserModal, setdeleteUserModal] = useState(false);
  const [deleteAllUserType, setdeleteAllUserType] = useState(false);
  const SelectUser = (id) => {
    setSelecteduserID(id);
    setSelectedUserIDS((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((item) => item !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };

  const deleteSelectedUserType = async () => {
    const data = {
      role_ids: SelectedUserIDS,
    };
    try {
      const response = await axios.delete(
        "https://private.emlaksepette.com/api/institutional/rol-users",
        {
          data: data,
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: `Başarılı`,
        textBody: `${SelectedUserIDS.length} Kullanıcı Tipi Silindi.`,
        button: "Tamam",
      });
      fetchData();
      setSelectedUserIDS([]);
      setisChoosed(false);
      setisShowDeleteButon(!isShowDeleteButon);
      setdeleteUserModal(false);
    } catch (error) {
      console.error("Error making DELETE request:", error);
    }
  };

  const [UsersId, setUsersId] = useState([]);
  useEffect(() => {
    console.log(UsersId);
  }, [isFocused]);

  const deleteAllUsers = async () => {
    const data = {
      role_ids: UsersId,
    };
    try {
      const response = await axios.delete(
        "https://private.emlaksepette.com/api/institutional/rol-users",
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
        textBody: `${userList.length} İlan silindi.`,
        button: "Tamam",
      });
      fetchData();
      setUsersId([]);
      setdeleteAllUserType(false);
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
          <ActivityIndicator color="#333" size={"large"} />
        </View>
      ) : transformedRoles.length == 0 ? (
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
            <Icon2 name="user-tie" size={50} color={"#EA2A28"} />
          </View>
          <View>
            <Text style={styles.noCommentsText}>
              Daha önce kullanıcı tipi oluşturmadınız.
            </Text>
          </View>
          <View style={{ width: "100%", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.returnButton}
              onPress={() => {
                setloading(true);
                setTimeout(() => {
                  navigation.navigate("CreateUserType");
                  setloading(false);
                }, 700);
              }}
            >
              <Text style={styles.returnButtonText}>
                Oluştur
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
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
                  const Users = userList.map((item) => item.id);
                  setUsersId(Users);
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
                  {" "}
                  {!isChoosed ? "Toplu Seç" : "Seçimi İptal Et"}{" "}
                </Text>
              </TouchableOpacity>
            </View>

            {isShowDeleteButon && (
              <View
                style={{ flexDirection: "row", gap: 9, alignItems: "center" }}
              >
                <Text>Seçili({SelectedUserIDS.length})</Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#EC302E",
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
                      setdeleteUserModal(true);
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
                Lütfen Silmek İstediğiniz Kullanıcı Tiplerini Seçiniz!
              </Text>
            </View>
          )}

          <View style={{ padding: 7, gap: 10 }}>
            {transformedRoles.map((item, index) => (
              <Users
                name={item.name}
                id="1"
                key={index}
                index={index}
                item={item}
                deleteUser={getUserIdAndName}
                isChoosed={isChoosed}
                SelectUserFunc={SelectUser}
              />
            ))}
          </View>
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
            title={`${UsersId.length} Kullanıcı tipini silmek istediğinize eminm misiniz?`}
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
            show={deletedSuccessMessage}
            showProgress={false}
            titleStyle={{
              color: "#333",
              fontSize: 13,
              fontWeight: "700",
              textAlign: "center",
              margin: 5,
            }}
            title={`${selectedUserName} adlı kullanıcı tipini silmek istediğinize emin misiniz?`}
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
              setdeletedSuccessMessage(false);
            }}
            onConfirmPressed={() => {
              DeleteUser(selectedUserId);
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
            title={`${SelectedUserIDS.length} Kullanıcı tipini silmek istediğinize emin misiniz?`}
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
              setdeleteUserModal(false);
            }}
            onConfirmPressed={() => {
              deleteSelectedUserType();
            }}
            confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
            cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
          />
        </ScrollView>
      )}
    </AlertNotificationRoot>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f7",
  },
  noCommentsText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginTop: 8,
  },
  returnButton: {
    backgroundColor: '#EA2B2E',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  returnButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modal4: {
    justifyContent: "center",
    margin: 0,
    padding: 20,
    backgroundColor: "#1414148c",
  },
  modalContent4: {
    backgroundColor: "#ffffff",
    padding: 20,
    gap: 20,
    borderRadius: 5,
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
  btnRemove: {
    backgroundColor: "#EEEDEB",
    borderWidth: 1,
    borderColor: "#ebebeb",
    padding: 7,
    borderRadius: 5,
  },
});
