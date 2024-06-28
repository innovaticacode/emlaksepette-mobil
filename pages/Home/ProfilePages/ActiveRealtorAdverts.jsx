import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getValueFor } from "../../../components/methods/user";
import ProjectAdverts from "../ProfilePageItem/ProjectAdverts";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import RealtorAdvertPost from "./profileComponents/RealtorAdvertPost";
import Modal from "react-native-modal";
import { Platform } from "react-native";

export default function ActiveRealtorAdverts() {
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const [housings, sethousings] = useState([]);
  const [projectCount, setProjectCount] = useState(0);
  useEffect(() => {
    getValueFor("user", setUser);
  }, []);
  const [start, setStart] = useState(0);
  const [take, setTake] = useState(10);
  useEffect(() => {
    axios
      .get("https://mobil.emlaksepette.com/api/get_my_housings", {
        headers: { Authorization: "Bearer " + user.access_token },
      })
      .then((res) => {
        sethousings(res?.data?.activeHousingTypes);
  
      })
      .catch((e) => {
        console.log(e + "hata");
      });
  }, [user]);
  const [EditModalVisible, setEditModalVisible] = useState(false);
  const openSheet = (id) => {
    setSelectedProject(id);
    setEditModalVisible(!EditModalVisible);
  };
  const [selectedProject, setSelectedProject] = useState(null);
  return (
    <ScrollView stickyHeaderIndices={[0]}>
    
      <View
        style={{
          paddingTop: 6,
          paddingLeft: 12,
          paddingBottom: 6,
        backgroundColor:'#ffff'
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: "#333",
            fontWeight: "600",
          }}
        >
          Emlak İlanları ({housings?.length})
        </Text>
      </View>
      <View style={{padding:2,paddingLeft:10,paddingRight:10,flexDirection:'row'}}>
        <TextInput style={styles.Input} placeholder="Kelime veya İlan No ile ara" />
        <TouchableOpacity>

        </TouchableOpacity>
      </View>
      <View style={{paddingTop:10 }}>
        {housings.map((item, index) => (
          <RealtorAdvertPost key={index} housing={item} Onpress={openSheet} />
        ))}
      </View>

      <Modal
        isVisible={EditModalVisible}
        onBackdropPress={openSheet}
        backdropColor="transparent"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={{ width: "100%" }}>
            <ScrollView
              style={{ gap: 10 }}
              contentContainerStyle={{ gap: 10, alignItems: "center" }}
              showsVerticalScrollIndicator={false}
            >
              <View>
                <TouchableOpacity
                  style={{
                    backgroundColor: "grey",
                    padding: 3,
                    width: 40,
                    borderRadius: 5,
                  }}
                />
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#DAFBD0",
                  width: "90%",
                  padding: 10,
                  borderRadius: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 15,
                  borderWidth: 0.4,
                  borderColor: "#1B6C0A94",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#1B6C0A",
                    fontWeight: "bold",
                  }}
                >
                  İlanları Düzenle
                </Text>
                <MaterialIcon name="home-edit" size={18} color={"#1B6C0A"} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#FFEFCA",
                  width: "90%",
                  padding: 10,
                  borderRadius: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 15,
                  borderWidth: 0.4,
                  borderColor: "#BD3803",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#BD3803",
                    fontWeight: "bold",
                  }}
                >
                  İşlem Kayıtları
                </Text>
                <MaterialIcon name="archive" size={18} color={"#BD3803"} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EditProject", { id: selectedProject });
                  setEditModalVisible(false);
                }}
                style={{
                  backgroundColor: "#DAFBD0",
                  width: "90%",
                  padding: 10,
                  borderRadius: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 15,
                  borderWidth: 0.4,
                  borderColor: "#1B6C0A94",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#1B6C0A",
                    fontWeight: "bold",
                  }}
                >
                  Genel Düzenleme
                </Text>
                <MaterialIcon
                  name="view-dashboard-edit"
                  size={18}
                  color={"#1B6C0A"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#FFE0DB",
                  width: "90%",
                  padding: 10,
                  borderRadius: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 15,
                  borderWidth: 0.4,
                  borderColor: "#BC260F",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#BC260F",
                    fontWeight: "bold",
                  }}
                >
                  Sil
                </Text>
                <MaterialIcon
                  name="delete-outline"
                  size={18}
                  color={"#BC260F"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#FFE0DB",
                  width: "90%",
                  padding: 10,
                  borderRadius: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 15,
                  borderWidth: 0.4,
                  borderColor: "#BC260F",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#BC260F",
                    fontWeight: "bold",
                  }}
                >
                  Pasife Al
                </Text>
                <MaterialIcon
                  name="delete-outline"
                  size={18}
                  color={"#BC260F"}
                />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerText: {
    fontSize: 20,
    color: "#141824",
    fontWeight: "600",
  },
  Adverts: {
    width: "100%",

    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    gap: 10,
  },

  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    gap: 10,
    alignItems: "center",
    backgroundColor: "#F8F7F4",
    padding: 10,
    height: "35%",

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: "white",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  Input:{
    backgroundColor:'#ebebeb',
    padding:10,
    borderRadius:5,
    width:'90%'
  }
});
