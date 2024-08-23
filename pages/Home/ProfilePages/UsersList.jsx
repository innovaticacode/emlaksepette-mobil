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
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from "@react-navigation/native";
import AwesomeAlert from "react-native-awesome-alerts";
import Icon2 from 'react-native-vector-icons/FontAwesome6'
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { ActivityIndicator } from "react-native-paper";
export default function UsersList() {
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false);
  const [subUsers, setsubUsers] = useState([]);
  const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);
  const [loading, setloading] = useState(false)
  const fetchData = async () => {
    setloading(true)
    try {
      if (user.access_token) {
        const response = await axios.get(
          "https://private.emlaksepette.com/api/institutional/users",
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
      setloading(false)
    }
  };
  useEffect(() => {
    fetchData();
  }, [user]);
  const [SuccessDelete, setSuccessDelete] = useState(false)
  const DeleteUser = async () => {
    try {
      if (user.access_token) {
        const response = await axios.delete(
          `https://private.emlaksepette.com/api/institutional/users/${selectedUser}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Silme Başarılı',
          textBody: `${selectedUserName} Adlı kullanıcı silindi`,
        })
        setopenDeleteModal(false)
        fetchData();

        setsubUsers(response.data.users);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [selectedUser, setselectedUser] = useState(0);
  const [selectedUserName, setselectedUserName] = useState('')
  const [SelecteduserID, setSelecteduserID] = useState(0)
  const [SelectedUserIDS, setSelectedUserIDS] = useState([])
  const GetId = (UserID, name) => {
    setselectedUser(UserID);
    setselectedUserName(name)


  };
  const getUserID = (UserID) => {
    setSelecteduserID(UserID)
    setSelectedUserIDS((prevIds) => {
      if (prevIds.includes(UserID)) {
        return prevIds.filter((item) => item !== UserID);
      } else {
        return [...prevIds, UserID];
      }
    });
  }
  console.log(SelectedUserIDS)
  const [openDeleteModal, setopenDeleteModal] = useState(false)
  useEffect(() => {
    navigation.setOptions({
      title: `Alt Kullanıcılar (${subUsers?.length})`,
    });
  }, [navigation, subUsers]);
  const [isChoosed, setisChoosed] = useState(false)
  const [isShowDeleteButon, setisShowDeleteButon] = useState(false)

  const [userList, setuserList] = useState([])
  const [deleteAllUserType, setdeleteAllUserType] = useState(false)
  const [deleteUserModal, setdeleteUserModal] = useState(false)
  const [selectedUserDeleteModa, setselectedUserDeleteModa] = useState(false)
  const deleteAllUsers = async () => {
    const data = {
      user_ids: userList,

    };
    try {
      const response = await axios.delete('https://private.emlaksepette.com/api/institutional/sub-users', {
        data: data,
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      });
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: `Silme işlemi başarılı`,
        titleStyle: { fontSize: 14 },
        textBody: `${userList.length} Kullanıcı Silindi`
      })
      fetchData()
      setuserList([])
      setdeleteAllUserType(false)

    } catch (error) {

      console.error('Error making DELETE request:', error);
    }
  }
  const deleteSelectedUser = async () => {
    const data = {
      user_ids: SelectedUserIDS,

    };
    try {
      const response = await axios.delete('https://private.emlaksepette.com/api/institutional/sub-users', {
        data: data,
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      });
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: `Silme işlemi başarılı`,
        titleStyle: { fontSize: 14 },
        textBody: `${userList.length} Kullanıcı Silindi`
      })
      fetchData()
      setSelectedUserIDS([])
      setselectedUserDeleteModa(false)

    } catch (error) {

      console.error('Error making DELETE request:', error);
    }
  }
  return (

    <AlertNotificationRoot>
      {
        loading ?
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <ActivityIndicator size={'large'} color="#333" />
          </View>
          :
          subUsers.length == 0 ?
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: 10,
                backgroundColor: 'white'
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
                <Text
                  style={{ color: "grey", fontSize: 16, fontWeight: "600" }}
                >
                  Alt Kullanıcı Bulunamadı
                </Text>
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
                    setloading(true);
                    setTimeout(() => {
                      navigation.navigate("CreateUser");
                      setloading(false);
                    }, 700);
                  }}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    Oluştur
                  </Text>
                </TouchableOpacity>
              </View>
            </View> :


            <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
              <AwesomeAlert
                show={openDeleteModal}
                showProgress={false}
                titleStyle={{ color: '#333', fontSize: 13, fontWeight: '700', textAlign: 'center', margin: 5 }}
                title={`${selectedUserName} adlı kullanıcıyı silmek istediğinize emin misiniz?`}
                messageStyle={{ textAlign: 'center' }}

                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}

                cancelText="Hayır"
                confirmText="Evet"
                cancelButtonColor="#ce4d63"
                confirmButtonColor="#1d8027"
                onCancelPressed={() => {
                  setopenDeleteModal(false)
                }}
                onConfirmPressed={() => {
                  DeleteUser()
                }}
                confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
                cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
              />
              <AwesomeAlert
                show={deleteAllUserType}
                showProgress={false}
                titleStyle={{ color: '#333', fontSize: 13, fontWeight: '700', textAlign: 'center', margin: 5 }}
                title={`${userList.length} Kullanıcıyı silmek istediğinize emin misiniz?`}
                messageStyle={{ textAlign: 'center' }}

                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}

                cancelText="Hayır"
                confirmText="Evet"
                cancelButtonColor="#ce4d63"
                confirmButtonColor="#1d8027"
                onCancelPressed={() => {
                  setdeleteAllUserType(false)
                }}
                onConfirmPressed={() => {
                  deleteAllUsers()
                }}
                confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
                cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
              />
              <AwesomeAlert
                show={deleteUserModal}
                showProgress={false}
                titleStyle={{ color: '#333', fontSize: 13, fontWeight: '700', textAlign: 'center', margin: 5 }}
                title={`${selectedUserName} adlı kullanıcıyı silmek istediğinize emin misiniz?`}
                messageStyle={{ textAlign: 'center' }}

                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}

                cancelText="Hayır"
                confirmText="Evet"
                cancelButtonColor="#ce4d63"
                confirmButtonColor="#1d8027"
                onCancelPressed={() => {
                  setopenDeleteModal(false)
                }}
                onConfirmPressed={() => {
                  DeleteUser()
                }}
                confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
                cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
              />
              <AwesomeAlert

                show={selectedUserDeleteModa}
                showProgress={false}
                titleStyle={{ color: '#333', fontSize: 13, fontWeight: '700', textAlign: 'center', margin: 5 }}
                title={`${SelectedUserIDS.length}  kullanıcıyı silmek istediğinize emin misiniz?`}
                messageStyle={{ textAlign: 'center' }}

                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}

                cancelText="Hayır"
                confirmText="Evet"
                cancelButtonColor="#ce4d63"
                confirmButtonColor="#1d8027"
                onCancelPressed={() => {
                  setselectedUserDeleteModa(false)
                }}
                onConfirmPressed={() => {
                  deleteSelectedUser()
                }}
                confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
                cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
              />
              <View style={{ flexDirection: 'row', padding: 6, paddingTop: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <TouchableOpacity style={styles.btnRemove}
                    onPress={() => {
                      setdeleteAllUserType(true)
                      const Users = subUsers.map(item => item.id)
                      setuserList(Users)
                    }}
                  >
                    <Text style={{ fontSize: 13, fontWeight: '700', color: '#333' }}>Tümünü Sil</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.btnRemove}
                    onPress={() => {
                      setisShowDeleteButon(!isShowDeleteButon)
                      setisChoosed(!isChoosed)
                    }}
                  >
                    <Text style={{ fontSize: 13, fontWeight: '700', color: '#333' }}>
                      {
                        !isChoosed ? 'Toplu Seç' : 'Seçimi İptal Et'
                      }
                    </Text>
                  </TouchableOpacity>
                </View>

                {
                  isShowDeleteButon &&
                  <View style={{ flexDirection: 'row', gap: 9, alignItems: 'center' }}>
                    <Text>Seçili({SelectedUserIDS.length})</Text>
                    <TouchableOpacity style={{ backgroundColor: 'red', paddingLeft: 8, paddingRight: 8, paddingTop: 5, paddingBottom: 5, borderRadius: 6 }}
                      onPress={() => {
                        setselectedUserDeleteModa(true)
                      }}
                    >
                      <Icon name="trash" size={18} color={"#ffffff"} />
                    </TouchableOpacity>
                  </View>
                }

              </View>
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

                        setModalVisible(false)
                        setTimeout(() => {
                          setopenDeleteModal(true)
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
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(false)
                        navigation.navigate('UpdateUsers', { UserID: selectedUser, fetcData: fetchData })
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
                <View style={[styles.modalContent4, { gap: 10, alignItems: 'center', justifyContent: 'center' }]}>
                  <Text>{selectedUserName} adlı Kullanıcınız silindi</Text>
                </View>
              </ModalEdit>
            </ScrollView>
      }
    </AlertNotificationRoot>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
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
    width: '80%',
    height: "10%",
    borderRadius: 5

  },
  btnRemove: {
    backgroundColor: "#EEEDEB",
    borderWidth: 1,
    borderColor: "#ebebeb",
    padding: 7,
    borderRadius: 5
  },
});
