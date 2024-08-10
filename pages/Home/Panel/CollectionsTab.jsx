
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Keyboard,
    Animated,
    TouchableOpacity,
    Linking,
  } from "react-native";
  import { ActivityIndicator } from "react-native-paper";
  import Modal from "react-native-modal";
  import { useState, useRef, useEffect } from "react";

  import { Platform } from "react-native";
  import ShareIcon from "react-native-vector-icons/Entypo";
  import DeleteIcon from "react-native-vector-icons/MaterialIcons";
  import PencilIcon from "react-native-vector-icons/FontAwesome5";
  import Icon from "react-native-vector-icons/FontAwesome";
  import Heart from "react-native-vector-icons/AntDesign";
  import IconMessenger from "react-native-vector-icons/Fontisto";
  import IconSms from "react-native-vector-icons/Feather";
  import * as Clipboard from "expo-clipboard";
  import Icon2 from "react-native-vector-icons/Feather";
  
  import Icon3 from "react-native-vector-icons/MaterialIcons";
  import { SearchBar } from "@rneui/themed";
  import axios from "axios";

 
  import AwesomeAlert from "react-native-awesome-alerts";
  import {
    ALERT_TYPE,
    Dialog,
    AlertNotificationRoot,
    Toast,
  } from "react-native-alert-notification";
  import { useNavigation } from "@react-navigation/native";
import CollectionsItem from "../ProfilePages/profileComponents/CollectionsItem";
import RegisterRealtorClub from "../ProfilePages/RegisterRealtorClub";
import { getValueFor } from "../../../components/methods/user";
  export default function CollectionsTab() {
    const navigation = useNavigation();
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
      setchoose(!choose);
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
    const [filteredMenuData, setFilteredMenuData] = useState([]);
    const handleSearch = (text) => {
      setSearchText(text);
  
      // Eğer searchText doluysa, collections array'ini filtrele
      // Aksi takdirde, collections array'ini olduğu gibi bırak
      const filteredData = text
        ? collections.filter((item) =>
            item.name.toLowerCase().includes(text.toLowerCase())
          )
        : collections;
      setcollectionsRecods(filteredData);
  
      // Burada arama işlemleri yapılabilir
    };
  
    const [searchText, setSearchText] = useState("");
  
    useEffect(() => {
      getValueFor("user", setUser);
    }, []);
  
    const [loading, setloading] = useState(false);
    const [collectionsRecods, setcollectionsRecods] = useState([]);
  
    const fetchData = async () => {
      try {
        setloading(true);
  
        if (user.access_token) {
          const response = await axios.get(
            "https://private.emlaksepette.com/api/client/collections",
            {
              headers: {
                Authorization: `Bearer ${user?.access_token}`,
              },
            }
          );
          setProjectItems(response?.data?.items);
          setcollections(response?.data?.collections);
          setcollectionsRecods(response?.data?.collections);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setloading(false); // İstek tamamlandığında loading durumunu false yap
      }
    };
  
    useEffect(() => {
      fetchData();
    }, [user]);
  
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
          `https://private.emlaksepette.com/api/collection/${id}/delete`,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
  
        closeSheet();
  
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Koleksiyon Silindi",
          textBody: `${colectionName} Adlı koleksiyonunuz başarıyla silindi`,
        });
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
          `https://private.emlaksepette.com/api/collection/${id}/edit`,
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
  
    const removeFromCollection = async (collectionItem) => {
      try {
        await onRemove();
        setcollectionsRecods((prevItems) =>
          prevItems.filter((projectItem) => projectItem.collection_id !== item.id)
        );
      } catch (error) {
        console.error("Error removing item from the collection:", error);
      }
    };
    const [RemoveSelectedCollectionsModal, setRemoveSelectedCollectionsModal] =
      useState(false);
    const [CollectionsRemoveIds, setCollectionsRemoveIds] = useState([]);
    const [CollectionIDForAllRemove, setCollectionIDForAllRemove] = useState([]);
    const [CollectionIDForRemove, setCollectionIDForRemove] = useState(0);
    const SelectCollection = (id) => {
      setCollectionIDForRemove(id);
      setCollectionsRemoveIds((prevIds) => {
        if (prevIds.includes(id)) {
          return prevIds.filter((item) => item !== id);
        } else {
          return [...prevIds, id];
        }
      });
    };
    const [isChoosed, setisChoosed] = useState(false);
  
    const [ereror, setereror] = useState({});
  
    const RemoveSelectedCollections = async () => {
      const data = {
        ids: CollectionsRemoveIds,
      };
      try {
        const response = await axios.delete(
          `https://private.emlaksepette.com/api/collections`,
  
          {
            data: data,
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
              "Content-Type": "application/json", // FormData kullanıldığı için Content-Type belirtilmelidir
            },
          }
        );
        setRemoveSelectedCollectionsModal(false);
        fetchData();
        setereror(response.data);
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: `Koleksionlar Silindi`,
          textBody: `${CollectionsRemoveIds.length} Koleksiyon silindi`,
        });
  
        setCollectionsRemoveIds([]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const collectionIDS = collections.map((collection) => collection.id);
    const [modalForRemoveAll, setmodalForRemoveAll] = useState(false);
  
    const RemoveAllCollection = async () => {
      const data = {
        ids: collectionIDS,
      };
      try {
        const response = await axios.delete(
          `https://private.emlaksepette.com/api/collections`,
  
          {
            data: data,
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
              "Content-Type": "application/json", // FormData kullanıldığı için Content-Type belirtilmelidir
            },
          }
        );
        setmodalForRemoveAll(false);
        fetchData();
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Koleksiyonlar Silindi",
          textBody: `Tüm Koleksiyonlar Silindi`,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    console.log(user.has_club);
    const [choose, setchoose] = useState(false);
  
    return (
      <>
        {loading ? (
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <ActivityIndicator color="#333" size={"large"} />
          </View>
        ) : (
          <>
            {collections.length == 0 ? (
              <>
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
                    <Icon3 name="bookmark-add" size={50} color={"#EA2A28"} />
                  </View>
                  <View>
                    <Text
                      style={{ color: "grey", fontSize: 16, fontWeight: "600" }}
                    >
                      Koleksiyonunuzda ilan bulunmamaktadır
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
                          navigation.navigate("HomePage");
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
                        Ana Sayfa'ya dön
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            ) : (
              <AlertNotificationRoot>
                {user.has_club != 1 ? (
                  <RegisterRealtorClub />
                ) : (
                  <View style={styles.container}>
                    <View style={{ flex: 1 }}>
                      <AwesomeAlert
                        show={RemoveSelectedCollectionsModal}
                        showProgress={false}
                        titleStyle={{
                          color: "#333",
                          fontSize: 13,
                          fontWeight: "700",
                          textAlign: "center",
                          margin: 5,
                        }}
                        title={`${CollectionsRemoveIds.length} Seçili Koleksiyonu silmek istediğinize emin misin`}
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
                          setRemoveSelectedCollectionsModal(false);
                        }}
                        onConfirmPressed={() => {
                          RemoveSelectedCollections();
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
                        show={modalVisible2}
                        showProgress={false}
                        titleStyle={{
                          color: "#333",
                          fontSize: 13,
                          fontWeight: "700",
                          textAlign: "center",
                          margin: 5,
                        }}
                        title={`${colectionName} adlı koleksiyonu silmek istediğinize eminmisiniz?`}
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
                          setModalVisible2(false);
                        }}
                        onConfirmPressed={() => {
                          deleteCollection(selectedCollection);
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
                        show={modalForRemoveAll}
                        showProgress={false}
                        titleStyle={{
                          color: "#333",
                          fontSize: 15,
                          fontWeight: "700",
                          textAlign: "center",
                          margin: 5,
                        }}
                        title={"Tümünü Sil"}
                        message="Tüm koleksiyonları silmek istediğinize emin misiniz?"
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
                          setmodalForRemoveAll(false);
                        }}
                        onConfirmPressed={() => {
                          RemoveAllCollection();
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
                      <View
                        style={{
                          alignItems: "center",
                          flex: 1,
                        
                          backgroundColor: "white",
                        }}
                        onTouchStart={() => {
                          Keyboard.dismiss();
                          closeSheet();
                        }}
                      >
                        <View style={styles.container}>
                          <ScrollView
                            showsVerticalScrollIndicator={false}
                            stickyHeaderIndices={[0]}
                            contentContainerStyle={{ paddingBottom: 20,padding:10 }}
                          >
                            <View style={styles.SearchArea}>
                              <SearchBar
                                containerStyle={{
                                  backgroundColor: "transparent",
                                  borderTopWidth: 0,
                                  borderWidth: 0,
                                  borderBottomWidth: 0,
                                  justifyContent: "center",
                                  width: "100%",
                                  paddingBottom: 10,
                                
                                  height: 50,
                                }}
                                inputContainerStyle={{
                                  borderRadius: 5,
                                  backgroundColor: "#FFFFFF",
                                  borderWidth: 1,
                                  borderColor: "#bebebe26",
                                  borderBottomWidth: 1,
                                  height: "110%",
                                  borderBottomColor: "#bebebe26",
                                }}
                                placeholder="Koleksiyon Ara..."
                                inputStyle={{ fontSize: 15 }}
                                showLoading={false}
                                searchIcon={{ color: "#CCCCCC" }}
                                onChangeText={handleSearch}
                                value={searchText}
                              />
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                                padding: 5,
                                paddingTop: 9,
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                  gap: 25,
                                  alignItems: "center",
                                }}
                              >
                                <TouchableOpacity
                                  style={[
                                    styles.btnRemove,
                                    {
                                      backgroundColor: "#EEEDEB",
                                      borderWidth: 1,
                                      borderColor: "#ebebeb",
                                    },
                                  ]}
                                  onPress={() => {
                                    if (collections.length == 0) {
                                      Toast.show({
                                        type: ALERT_TYPE.WARNING,
                                        title: "Koleksiyon Bulunmamaktadır",
                                        textBody: `Silinecek koleksiyon bulunmuyor`,
                                      });
                                    } else {
                                      setmodalForRemoveAll(true);
                                    }
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      textAlign: "center",
                                      fontWeight: "bold",
                                      color: "#333",
                                    }}
                                  >
                                    Tümünü Sil
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  style={[
                                    styles.btnRemove,
                                    {
                                      backgroundColor: "#EEEDEB",
                                      borderWidth: 1,
                                      borderColor: "#ebebeb",
                                    },
                                  ]}
                                  onPress={() => {
                                    setisChoosed(!isChoosed);
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      textAlign: "center",
                                      fontWeight: "bold",
                                      color: "#333",
                                    }}
                                  >
                                    Toplu Seç
                                  </Text>
                                </TouchableOpacity>
                                {isChoosed && (
                                  <Text style={{ fontSize: 14 }}>
                                    Seçili ({CollectionsRemoveIds.length})
                                  </Text>
                                )}
                              </View>
                              <View
                                style={{ display: isChoosed ? "flex" : "none" }}
                              >
                                <TouchableOpacity
                                  style={[
                                    styles.btnRemove,
                                    { paddingLeft: 15, paddingRight: 15 },
                                  ]}
                                  onPress={() => {
                                    if (CollectionsRemoveIds.length == 0) {
                                      Toast.show({
                                        type: ALERT_TYPE.WARNING,
                                        title: "Lütfen seçiniz",
                                        textBody: `Silmek istediğiniz koleksiyonları seçiniz`,
                                      });
                                    } else {
                                      setRemoveSelectedCollectionsModal(true);
                                    }
                                  }}
                                >
                                  <Icon
                                    name="trash"
                                    size={18}
                                    color={"#ffffff"}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
  
                            {loading == false ? (
                              collectionsRecods.map((collection, index) => {
                                return (
                                  <CollectionsItem
                                    isChoosed={isChoosed}
                                    SelectCollection={SelectCollection}
                                    projectItems={projectItems}
                                    item={collection}
                                    getId={getId}
                                    key={index}
                                    openBottom={openSheet}
                                    disabled={isDisabled}
                                    shareWp={shareLinkOnWhatsApp}
                                    copy={copyToClipboard}
                                    onRemove={() =>
                                      removeFromCollection(collection)
                                    } // onRemove işlevini yolla
                                  />
                                );
                              })
                            ) : (
                              <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="#333" />
                              </View>
                            )}
                          </ScrollView>
                        </View>
                      </View>
  
                      <View
                        style={{
                          flex: 1,
                          position: "absolute",
                          bottom: 0,
                          width: "100%",
                          display: display == false ? "none" : "flex",
                        }}
                      >
                        <Animated.View
                          style={[
                            styles.animatedView,
                            { transform: [{ translateY }] },
                          ]}
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
                                  <Text style={{ textAlign: "center", top: 2 }}>
                                    Paylaş
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
                        isVisible={choose}
                        style={styles.modal2}
                        animationIn={"slideInUp"}
                        animationOut={"slideOutDown"}
                        onBackdropPress={() => setchoose(false)}
                        swipeDirection={["down"]}
                        onSwipeComplete={() => setchoose(false)}
                      >
                        <View style={styles.modalContent2}>
                          <View style={{ alignItems: "center", paddingTop: 10 }}>
                            <TouchableOpacity
                              style={{
                                width: "15%",
                                backgroundColor: "#c2c4c6",
                                padding: 4,
                                borderRadius: 50,
                              }}
                            ></TouchableOpacity>
                          </View>
                          <View
                            style={{
                              gap: 30,
                              paddingBottom: 20,
                              paddingLeft: 20,
                              paddingRight: 20,
                              paddingTop: 10,
                            }}
                          >
                            <TouchableOpacity
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 10,
                              }}
                              onPress={{}}
                            >
                              <PencilIcon name="link" size={23} color={"#333"} />
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: "#333",
                                  fontWeight: "700",
                                }}
                              >
                                Linki Kopyala
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 10,
                              }}
                              onPress={() => {}}
                            >
                              <IconMessenger
                                name="whatsapp"
                                size={22}
                                color={"#333"}
                              />
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: "#333",
                                  fontWeight: "700",
                                }}
                              >
                                Paylaş
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 10,
                              }}
                              onPress={() => {
                                setchoose(false);
                                setloading(true);
                                setTimeout(() => {
                                  setModalVisible(true);
                                  setloading(false);
                                }, 1000);
                              }}
                            >
                              <PencilIcon name="edit" size={21} color={"#333"} />
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: "#333",
                                  fontWeight: "700",
                                }}
                              >
                                Koleksiyon Adını Düzenle
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 10,
                              }}
                              onPress={() => {
                                setchoose(false);
                                setTimeout(() => {
                                  setModalVisible2(true);
                                }, 700);
                              }}
                            >
                              <Icon3
                                name="restore-from-trash"
                                size={22}
                                color={"#d83131"}
                              />
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: "#d83131",
                                  fontWeight: "700",
                                }}
                              >
                                Koleksiyonu Sil
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </Modal>
  
                      <Modal
                        animationIn={"fadeIn"}
                        animationOut={"fadeOut"} // veya "fade", "none" gibi
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                          setModalVisible(!modalVisible);
                        }}
                        style={styles.modal4}
                      >
                        <View style={styles.modalView4}>
                          <View style={styles.closeButtonContainer}>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: "600",
                                color: "black",
                              }}
                            >
                              Koleksiyon Adını Değiştir
                            </Text>
                            <TouchableOpacity
                              style={styles.closeButton}
                              onPress={() => setModalVisible(!modalVisible)}
                            >
                              <Icon2
                                name="x"
                                size={15}
                                color={"#525B75"}
                                style={{ fontWeight: "700" }}
                              />
                            </TouchableOpacity>
                          </View>
                          <View style={{ gap: 5 }}>
                            <TextInput
                              style={[styles.Input, { width: "100%" }]}
                              value={newName}
                              onChangeText={(value) => setnewName(value)}
                              placeholder={colectionName}
                              placeholderTextColor={"#333"}
                            />
                            <Text
                              style={{
                                fontSize: 10,
                                marginBottom: 5,
                                color: "black",
                                marginTop: 10,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Icon2 name="info" size={15} color={"#525B75"} />
                              <Text>
                                {" "}
                                Oluşturduğun koleksiyonu paylaştığında, Emlak
                                Sepette uyguluması içerisindeki diğer kullanıcılar
                                da listendeki ilanları görüntüleyebilir.
                              </Text>
                            </Text>
                          </View>
  
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <TouchableOpacity
                              style={{
                                backgroundColor: "green",
                                padding: 10,
                                width: "100%",
                                borderRadius: 5,
                                textAlign: "center",
                              }}
                              onPress={() => {
                                editCollectionName(selectedCollection);
                              }}
                            >
                              <Text
                                style={{
                                  color: "white",
                                  fontSize: 15,
                                  textAlign: "center",
                                }}
                              >
                                Düzenle
                              </Text>
                            </TouchableOpacity>
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
                            <ScrollView
                              horizontal
                              showsHorizontalScrollIndicator={false}
                            >
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
                                  <ShareIcon
                                    name="link"
                                    size={30}
                                    color={"white"}
                                  />
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
                                  <Icon
                                    name="whatsapp"
                                    size={33}
                                    color={"white"}
                                  />
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
                                  <Icon
                                    name="facebook"
                                    size={30}
                                    color={"white"}
                                  />
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
                                  <Icon
                                    name="instagram"
                                    size={31}
                                    color={"white"}
                                  />
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
                                  <IconSms
                                    name="message-circle"
                                    size={30}
                                    color={"white"}
                                  />
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
                                  <IconMessenger
                                    name="messenger"
                                    size={30}
                                    color={"white"}
                                  />
                                </TouchableOpacity>
                              </View>
                            </ScrollView>
                            <View
                              style={{ alignItems: "center", paddingTop: 10 }}
                            >
                              <TouchableOpacity
                                style={{
                                  backgroundColor: "red",
                                  paddingRight: 25,
                                  paddingLeft: 25,
                                  padding: 5,
                                  borderRadius: 5,
                                }}
                                onPress={() =>
                                  setShareModalVisible(!SharemodalVisible)
                                }
                              >
                                <Text style={{ color: "white" }}>Kapat</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </Modal>
                      {/* <Modal
           
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}// veya "fade", "none" gibi
            transparent={true}
            visible={modalVisible2}
            onRequestClose={() => {
              setModalVisible2(!modalVisible2);
            }}
            style={styles.modal4}
          >
           
              <View style={styles.modalView4}>
                <Text style={styles.modalText3}>
                  Koleksiyonu Silmek İstediğinize eminmisin?
                </Text>
                <View
                  style={{ display: "flex", flexDirection: "row", gap: 25 }}
                >
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
            
          </Modal> */}
                    </View>
                  </View>
                )}
              </AlertNotificationRoot>
            )}
          </>
        )}
      </>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
        backgroundColor:'#F6F6F6',
      paddingHorizontal: 0,
      width: "100%",
      marginVertical: 0,
    },
    closeButtonContainer: {
      flexDirection: "row",
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    },
    closeButton: {
      backgroundColor: "transparent",
      borderRadius: 5,
    },
    SearchArea: {
      width: "100%",
    
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
      borderRadius: 20,
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
      margin: 0,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)", // modal dışı koyu arkaplan
    },
    modalView: {
      width: "100%",
      margin: 0,
      backgroundColor: "white",
      borderRadius: 5,
      padding: 20,
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
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    btnRemove: {
      backgroundColor: "#EA2A28",
      padding: 5,
      borderRadius: 5,
    },
    modal2: {
      justifyContent: "flex-end",
      margin: 0,
    },
    modalContent2: {
      gap: 10,
  
      backgroundColor: "#F8F7F4",
      padding: 10,
  
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
    modalView4: {
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
    modal4: {
      backgroundColor: "rgba(0,0,0,0.5)",
      margin: 0,
      padding: 10,
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
  




