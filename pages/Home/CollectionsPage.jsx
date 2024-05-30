import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Keyboard,
  Animated,
  TouchableOpacity,
  Modal,
  Linking,
  ActivityIndicator,
} from "react-native";
import { useState, useRef, useEffect } from "react";

import ShareIcon from "react-native-vector-icons/Entypo";
import DeleteIcon from "react-native-vector-icons/MaterialIcons";
import PencilIcon from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/FontAwesome";
import Heart from "react-native-vector-icons/AntDesign";
import IconMessenger from "react-native-vector-icons/Fontisto";
import IconSms from "react-native-vector-icons/Feather";
import * as Clipboard from "expo-clipboard";
import { Platform } from "react-native";
import { SearchBar } from "@rneui/themed";
import axios from "axios";

import CollectionsItem from "./ProfilePages/profileComponents/CollectionsItem";
import { getValueFor } from "../../components/methods/user";

export default function CollectionsPage() {
  const [showAlert, setshowAlert] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [SharemodalVisible, setShareModalVisible] = useState(false);
  const [searchColection, setSearchColection] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [display, setdisplay] = useState(false);
  const updateSearch = (searchColection) => {
    setSearchColection(searchColection);
  };
  const translateY = useRef(new Animated.Value(400)).current;

  const openSheet = () => {
    setIsDisabled(true);
    setdisplay(true);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSheet = () => {
    setIsDisabled(false);
    setdisplay(false);
    Animated.timing(translateY, {
      toValue: 400,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const shareLinkOnWhatsApp = () => {
    const url = `https://7f24-78-178-52-190.ngrok-free.app/proje/1000381/detay`;

    const whatsappShareURL = `whatsapp://send?text=${encodeURIComponent(url)}`;

    Linking.openURL(whatsappShareURL)
      .then(() => console.log("WhatsApp açıldı ve link paylaşıldı"))
      .catch((error) => console.error("WhatsApp açılamadı:", error));
  };
  const shareLinkOnInstagram = (text) => {
    const url = `https://7f24-78-178-52-190.ngrok-free.app/proje/1000381/detay`;

    const instagramShareURL = `instagram://story/?text=${encodeURIComponent(
      url
    )}`;

    Linking.openURL(instagramShareURL)
      .then(() => console.log("Instagram açıldı ve link paylaşıldı"))
      .catch((error) => console.error("Instagram açılamadı:", error));
  };
  const copyToClipboard = () => {
    const url = `https://7f24-78-178-52-190.ngrok-free.app/proje/1000381/detay`;
    Clipboard.setStringAsync(url);
    ShowAlert();
  };
  const handleShareViaSMS = (text) => {
    const url = text;
    const message = `Bu linki kontrol et: ${url}`;

    Linking.openURL(`sms:?body=${encodeURIComponent(message)}`);
  };
  const shareLinkOnMessenger = () => {
    const url = "https://7f24-78-178-52-190.ngrok-free.app/proje/1000381/detay";
    const messengerShareURL = `fb-messenger://share/?link=${encodeURIComponent(
      url
    )}`;

    Linking.openURL(messengerShareURL)
      .then(() => console.log("Messenger açıldı ve link paylaşıldı"))
      .catch((error) => console.error("Messenger açılamadı:", error));
  };

  const shareLinkOnFacebook = () => {
    const myAppLink = "https://myapp.com/link-to-share"; // Paylaşılacak link
    const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      myAppLink
    )}`;

    Linking.openURL(facebookShareURL)
      .then(() => console.log("Facebook paylaşımı başlatıldı"))
      .catch((error) =>
        console.error("Facebook paylaşımı başlatılamadı:", error)
      );
  };
  const ShowAlert = () => {
    setshowAlert(true);
    setTimeout(() => {
      setshowAlert(false);
    }, 2000);
  };

  const [projectItems, setProjectItems] = useState([]);
  const [collections, setcollections] = useState([]);
  const [user, setUser] = useState({});
  const handleSearch = (text) => {
    setSearchText(text);
    // Burada arama işlemleri yapılabilir
  };
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  useEffect(() => {
    fetchData(); // Sayfa ilk yüklendiğinde verileri getir
  }, [user]);

  const [loading, setloading] = useState(false);

  const fetchData = async () => {
    try {
      setloading(true);

      if (user.access_token) {
        const response = await axios.get(
          "https://emlaksepette.com/api/client/collections",
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        setProjectItems(response?.data?.items);
        setcollections(response?.data?.collections);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setloading(false); // İstek tamamlandığında loading durumunu false yap
    }
  };

  const [selectedCollection, setselectedCollection] = useState(0);
  const [colectionName, setcolectionName] = useState("");
  const getId = (id, name) => {
    setselectedCollection(id);
    setcolectionName(name);
  };
  const [message, setmessage] = useState(false);
  const deleteCollection = async (id) => {
    try {
      let formData = new FormData();
      formData.append();
      const response = await axios.delete(
        `https://emlaksepette.com/api/collection/${id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      );
      setmessage(true);
      closeSheet();
      setTimeout(() => {
        setmessage(false);
      }, 3000);
      fetchData();
      setModalVisible2(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [newName, setnewName] = useState("");

  const editCollectionName = async (id) => {
    try {
      let formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("collectionName", newName);

      const response = await axios.post(
        `https://emlaksepette.com/api/collection/${id}/edit`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
            "Content-Type": "multipart/form-data", // FormData kullanıldığı için Content-Type belirtilmelidir
          },
        }
      );
      fetchData();
      closeSheet();
      setModalVisible(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <View style={{ height: "100%" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        onTouchStart={closeSheet}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {message ? (
            <Text style={{ color: "green", textAlign: "center" }}>
              {colectionName} adlı Koleksiyonunuz silindi
            </Text>
          ) : (
            <></>
          )}
        </View>
        {loading == false ? (
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              display: collections?.length == 0 ? "flex" : "none",
            }}
          >
            Koleksiyonunuz bulunmamaktadır
          </Text>
        ) : (
          ""
        )}
        {loading == false ? (
          collections.map((collection, index) => {
            return (
              <CollectionsItem
                projectItems={projectItems}
                item={collection}
                getId={getId}
                key={index}
                openBottom={openSheet}
                disabled={isDisabled}
                shareWp={shareLinkOnWhatsApp}
                copy={copyToClipboard}
              />
            );
          })
        ) : (
          <ActivityIndicator size="large" color={"red"} />
        )}
      </ScrollView>
      <View
        style={{
          flex: 1,
          position: "absolute",
          bottom: 100,
          width: "100%",
          display: display == false ? "none" : "flex",
          zIndex: 1,
        }}
      >
        <Animated.View
          style={[styles.animatedView, { transform: [{ translateY }] }]}
        >
          <View style={{ width: "100%" }}>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 7,
                  backgroundColor: "#ebebeb",
                  borderRadius: 5,
                }}
                onPress={closeSheet}
              ></TouchableOpacity>
            </View>
            <View style={{ paddingBottom: 10 }}>
              <TouchableOpacity
                style={{
                  padding: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ebebeb",
                }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 15,
                    justifyContent: "flex-start",
                    padding: 3,
                  }}
                >
                  <PencilIcon name="pencil-alt" size={17} />
                  <Text style={{ textAlign: "center" }}>
                    Koleksiyonun Adını Düzenle
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ebebeb",
                }}
                onPress={() => {
                  setShareModalVisible(!SharemodalVisible);
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 15,
                    justifyContent: "flex-start",
                    padding: 3,
                  }}
                >
                  <ShareIcon name="share-alternative" size={18} />
                  <Text style={{ textAlign: "center", top: 2 }}>Paylaş</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  padding: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ebebeb",
                }}
                onPress={() => {
                  setModalVisible2(!modalVisible2);
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 15,
                    justifyContent: "flex-start",
                    padding: 3,
                  }}
                >
                  <DeleteIcon name="delete-outline" size={20} />
                  <Text style={{ textAlign: "center", top: 2 }}>
                    Koleksiyonu Sil
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
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
              <Text>Koleksiyon Adı</Text>
              <TextInput
                style={[styles.Input, { width: "100%" }]}
                value={newName}
                onChangeText={(value) => setnewName(value)}
                placeholder={colectionName}
                placeholderTextColor={"#333"}
              />
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "green",
                  padding: 15,
                  paddingLeft: 20,
                  paddingRight: 20,
                  borderRadius: 5,
                }}
                onPress={() => {
                  editCollectionName(selectedCollection);
                }}
              >
                <Text style={{ color: "white", fontSize: 15 }}>Kaydet</Text>
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
      <Modal
        animationType="fade" // veya "fade", "none" gibi
        transparent={true}
        visible={SharemodalVisible}
        onRequestClose={() => {
          setShareModalVisible(!SharemodalVisible);
        }}
      >
        <View style={styles.centeredView2}>
          <View style={styles.modalView2}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 17,
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#1cea30",
                    padding: 15,
                    borderRadius: 30,
                    justifyContent: "center",
                  }}
                  onPress={copyToClipboard}
                >
                  <ShareIcon name="link" size={30} color={"white"} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#01E676",
                    padding: 15,
                    paddingRight: 17,
                    paddingLeft: 17,
                    borderRadius: 30,
                  }}
                  onPress={shareLinkOnWhatsApp}
                >
                  <Icon name="whatsapp" size={33} color={"white"} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#0766FF",
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderRadius: 30,
                    justifyContent: "center",
                  }}
                  onPress={shareLinkOnFacebook}
                >
                  <Icon name="facebook" size={30} color={"white"} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#F04E53",
                    paddingLeft: 17,
                    paddingRight: 17,
                    borderRadius: 30,
                    justifyContent: "center",
                  }}
                  onPress={shareLinkOnInstagram}
                >
                  <Icon name="instagram" size={31} color={"white"} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#0766FF",
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderRadius: 30,
                    padding: 13,
                    justifyContent: "center",
                  }}
                  onPress={handleShareViaSMS}
                >
                  <IconSms name="message-circle" size={30} color={"white"} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#0766FF",
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderRadius: 30,
                    padding: 13,
                    justifyContent: "center",
                  }}
                  onPress={shareLinkOnMessenger}
                >
                  <IconMessenger name="messenger" size={30} color={"white"} />
                </TouchableOpacity>
              </View>
            </ScrollView>
            <View style={{ alignItems: "center", paddingTop: 10 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "red",
                  paddingRight: 25,
                  paddingLeft: 25,
                  padding: 5,
                  borderRadius: 5,
                }}
                onPress={() => setShareModalVisible(!SharemodalVisible)}
              >
                <Text style={{ color: "white" }}>Kapat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade" // veya "fade", "none" gibi
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
        }}
      >
        <View style={styles.centeredView3}>
          <View style={styles.modalView3}>
            <Text style={styles.modalText3}>
              Koleksiyonu Silmek İStediğinize eminmisin?
            </Text>
            <View style={{ display: "flex", flexDirection: "row", gap: 25 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "red",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderRadius: 5,
                }}
                onPress={() => {
                  deleteCollection(selectedCollection);
                }}
              >
                <Text style={{ color: "white" }}>Evet</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible2(!modalVisible2)}
                style={{
                  backgroundColor: "#35f40e",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "white" }}>Vazgeç</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 0,
    width: "100%",
    marginVertical: 0,
  },
  SearchArea: {
    width: "100%",
    backgroundColor: "white",
  },

  Input: {
    backgroundColor: "#ebebebab",
    marginTop: 0,
    padding: 10,
    fontSize: 17,
    borderRadius: 4,
  },
  animatedView: {
    alignItems: "center",
    justifyContent: "center",

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
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 20,
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
  centeredView2: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // modal dışı koyu arkaplan
  },
  modalView2: {
    width: "100%",

    backgroundColor: "white",
    borderRadius: 5,
    padding: 20,
    gap: 15,
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
  centeredView3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // modal dışı koyu arkaplan
  },
  modalView3: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText3: {
    marginBottom: 15,
    textAlign: "center",
  },
});
