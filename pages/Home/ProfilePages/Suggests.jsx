import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Linking,
} from "react-native";
import { useState, useEffect } from "react";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import SuggestItem from "./profileComponents/SuggestItem";
import { Platform } from "react-native";
import { getValueFor } from "../../../components/methods/user";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
export default function Suggests() {
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  const nav = useNavigation();
  const [Tabs, setTabs] = useState(0);
  const openModal = () => {
    setModalVisible(!modalVisible);
  };
  const closeModal = () => {
    setModalVisible(!modalVisible);
  };

  // const suggests=[
  //   {
  //     title:'Master Sonsuz Tatil Köyü 2 No lu Daire',
  //     username:'Maliiyetine Ev',
  //     mail:'maliyetine@gmail.com',
  //     location:'İstanbul / Kartal',
  //     status:false,
  //     job:'Engineer',
  //     suggest:'            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, praesentium. Laboriosam fugiat reprehenderit tenetur, iure consectetur esse eius mollitia exercitationem accusa'
  //   }
  // ]
  const [user, setUser] = useState({});
  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const [loading, setloading] = useState(false);
  const [suggests, setsuggests] = useState([]);
  const GetUserInfo = async () => {
    setloading(true);
    try {
      if (user.access_token) {
        const response = await axios.get(
          "http://192.168.1.102:8000/api/institutional/user/offers",
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        setsuggests(response?.data?.offers);
      }
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (suggests.length > 0) {
      nav.setOptions({
        title: `Başvurularım (${suggests.length})`,
      });
    }
  }, [suggests, nav]);

  useEffect(() => {
    GetUserInfo();
  }, [user]);

  return (
    <>
      {loading ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <ActivityIndicator size={"large"} color="#333" />
        </View>
      ) : (
        <View style={styles.container}>
          <ScrollView>
            <View style={{ padding: 15 }}>
              {suggests.map((item, index) => (
                <SuggestItem key={index} openModal={openModal} item={item} />
              ))}
            </View>
          </ScrollView>
          <Modal
            animationType="fade" // veya "fade", "none" gibi
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={{ gap: 5 }}>
                  <Text>Yanıtınız</Text>
                  <TextInput
                    style={[styles.Input, { width: "100%" }]}
                    multiline
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "green",
                      padding: 15,
                      paddingLeft: 20,
                      paddingRight: 20,
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 15 }}>
                      Yanıtla
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "red",
                      padding: 15,
                      paddingLeft: 20,
                      paddingRight: 20,
                      borderRadius: 5,
                    }}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={{ color: "white", fontSize: 15 }}>İptal</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  tabBar: {
    paddingLeft: 20,
    padding: 10,
    borderBottomWidth: 1,

    backgroundColor: "#FFFF",
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
  TabBarBtn: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 4,
  },
  tabBarText: {
    color: "white",
    fontWeight: "500",
  },
  centeredView: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // modal dışı koyu arkaplan
  },
  modalView: {
    width: "100%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    gap: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  Input: {
    backgroundColor: "#ebebebba",
    marginTop: 0,
    padding: 10,
    height: 100,
    fontSize: 17,
    borderRadius: 4,
  },
  tabBtn: {
    backgroundColor: "white",
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ebebeb",
  },
});
