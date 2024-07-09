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
import { useNavigation } from "@react-navigation/native";
export default function UsersList() {
    const navigation=useNavigation()
  const [modalVisible, setModalVisible] = useState(false);
  const [subUsers, setsubUsers] = useState([]);
  const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);

  const fetchData = async () => {
    try {
      if (user.access_token) {
        const response = await axios.get(
          "https://private.emlaksepette.com/api/users",
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
        setModalVisible(false);
        setTimeout(() => {
            setSuccessDelete(true)
        }, 500);
        setTimeout(() => {
                setSuccessDelete(false)
        }, 2500);
        fetchData();

        setsubUsers(response.data.users);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [selectedUser, setselectedUser] = useState(0);
  const [selectedUserName, setselectedUserName] = useState('')
  const GetId = (UserID,name) => {
    setselectedUser(UserID);
    setselectedUserName(name)
  };
  return (
    <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
      <View style={{ backgroundColor: "#ffffff", padding: 10 }}>
        {
            subUsers?.length==0 ? 
            <View>
                <Text style={{color:'red',fontSize:18,textAlign:'center',fontWeight:'bold'}}>Alt Kullanıcınız Bulunmamaktadır</Text>
                </View>:
                 <Text style={{ color: "#333", fontSize: 18 }}>
                 Alt Kullanıcı Listesi ({subUsers?.length})
               </Text>
        }
       
      </View>
      <View style={{ padding: 10, gap: 10, paddingBottom: 100 }}>
        {subUsers?.map((item, index) => (
          <SubUser
            key={index}
            setModalVisible={setModalVisible}
            item={item}
            GetId={GetId}
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
              onPress={DeleteUser}
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
            onPress={()=>{
                setModalVisible(false)
                    navigation.navigate('UpdateUsers' ,{UserID:selectedUser , fetcData:fetchData})
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
        <View style={[styles.modalContent4, { gap: 10 ,alignItems:'center',justifyContent:'center'}]}>
          <Text>{selectedUserName} adlı Kullanıcınız silindi</Text>
        </View>
      </ModalEdit>
    </ScrollView>
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
    margin:0,
    backgroundColor: "#18181897",
  },
  modalContent4: {
    backgroundColor: "#f5f5f7",
    width:'80%',
    height: "10%",
    borderRadius:5

  },
});
