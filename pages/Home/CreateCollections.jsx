import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getValueFor } from "../../components/methods/user";
import axios from "axios";

import AddCollection from "../../components/AddCollection";
import { ActivityIndicator } from "react-native-paper";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from "react-native-alert-notification";
import NoDataScreen from "../../components/NoDataScreen";
import { apiUrl } from "../../components/methods/apiRequest";
export default function CreateCollections() {
  const route = useRoute();
  const { HouseID, ProjectId } = route.params;
  const [CollectionName, setCollectionName] = useState("");
  const [user, setUser] = useState({});
  const [collections, setcollections] = useState([]);

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);
  const [loading, setloading] = useState(false);
  const fetchData = async () => {
    setloading(true);
    try {
      if (user.access_token) {
        const response = await axios.get(`${apiUrl}client/collections`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });

        setcollections(response?.data.collections);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [user]);
  const [namFromGetUser, setnamFromGetUser] = useState([]);
  const GetUserInfo = async () => {
    setloading(true);
    try {
      if (user?.access_token && user) {
        const userInfo = await axios.get(`${apiUrl}users/` + user?.id, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });
        const userData = userInfo?.data?.user;
        setnamFromGetUser(userData);
      }
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    GetUserInfo();
  }, [user]);

  const [selectedCollectionId, setselectedCollectionId] = useState(0);
  const [selectedCollectionName2, setselectedCollectionName2] = useState("");
  const getCollectionId = (id, name) => {
    setselectedCollectionId(id);
    setselectedCollectionName2(name);
  };
  const [disabledTrue, setdisabledTrue] = useState(false);
  const addCollectionPost = () => {
    // Koleksiyon adının boş olup olmadığını kontrol edin
    if (!CollectionName.trim()) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Hata",
        textBody:
          user.type == 2 && user.corporate_type == "Emlak Ofisi"
            ? "Lütfen Portföy Adı Girin"
            : "Lütfen Koleksiyon Adı Girin.",
        button: "Tamam",
      });
      return;
    }

    const collectionData = {
      collection_name: CollectionName,
      cart: {
        id: HouseID,
        type: ProjectId ? "project" : null,
        project: ProjectId ? ProjectId : null,
        clear_cart: "no",
        selectedCollectionId: null,
      },
    };

    axios
      .post(`${apiUrl}add/collection`, collectionData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.access_token}`,
        },
      })
      .then((response) => {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title:
            user.type == 2 && user.corporate_type == "Emlak Ofisi"
              ? "Portföy Oluşturuldu"
              : "Koleksiyon Oluşturuldu.",
          textBody:
            user.type == 2 && user.corporate_type == "Emlak Ofisi"
              ? `${CollectionName} Adlı Portföy Oluşturuldu.`
              : `${CollectionName} Adlı Koleksiyon Oluşturuldu.`,
          button: "Tamam",
        });
        fetchData();
        // setselectedCollectionName(response.data.collection.name)
        setCollectionName("");
        setdisabledTrue(true);
        setTimeout(() => {
          setdisabledTrue(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const [showAlert, setshowAlert] = useState(false);
  const [showDeleteAlert, setshowDeleteAlert] = useState(false);
  const addSelectedCollection = (id, name) => {
    const collectionData = {
      collection_name: name,
      clear_cart: "no",
      id: HouseID,
      item_id: ProjectId ? ProjectId : HouseID,
      selectedCollectionId: id,
      type: ProjectId ? 1 : 2,
    };

    axios
      .post(`${apiUrl}addLink`, collectionData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.access_token}`,
        },
      })
      .then((response) => {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title:
            user.type == 2 && user.corporate_type == "Emlak Ofisi"
              ? "Portföye Eklendi"
              : "Koleksiyona Eklendi",
          textBody:
            user.type == 2 && user.corporate_type == "Emlak Ofisi"
              ? `${name} Adlı Portföye eklendi`
              : `${name} Adlı koleksiyona eklendi`,
          button: "Tamam",
        });

        var newCollections = collections.map((collection) => {
          if (collection.id == id) {
            return {
              ...collection,
              links: [
                ...collection.links,
                {
                  collection_id: id,
                  room_order: ProjectId ? HouseID : null,
                  item_id: ProjectId ? ProjectId : HouseID,
                  user_id: user?.id,
                  item_type: ProjectId ? 1 : 2,
                },
              ],
            };
          } else {
            return collection;
          }
        });
        setcollections(newCollections);
      })
      .catch((error) => {
        // Hata durumunu işleyin
        console.error("Error:", error);
      });
  };

  const ıtemOnCollection = (collectionId) => {
    let check = false;
    collections.map((collection) => {
      for (var i = 0; i < collection?.links?.length; i++) {
        if (ProjectId) {
          if (
            (collection.links[i].item_type =
              1 &&
              collection.links[i].item_id == ProjectId &&
              collection.links[i].room_order == HouseID &&
              collection.links[i].collection_id == collectionId)
          ) {
            check = true;
          }
        } else {
          if (
            (collection.links[i].item_type =
              2 &&
              collection.links[i].item_id == HouseID &&
              collection.links[i].collection_id == collectionId)
          ) {
            check = true;
          }
        }
      }
    });

    return check;
  };
  const removeItemOnCollection = (collectionId, name) => {
    const collectionData = {
      item_type: ProjectId ? 1 : 2,
      room_order: HouseID,
      item_id: ProjectId ? ProjectId : HouseID,
      collection_id: collectionId,
    };

    axios
      .post(`${apiUrl}remove_item_on_collection`, collectionData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.access_token}`,
        },
      })
      .then((response) => {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "1 Konut silindi",
          textBody:
            user.type == 2 && user.corporate_type == "Emlak Ofisi"
              ? `${name} Adlı portföyden 1 konut silindi`
              : `${name} Adlı koleksiyondan 1 konut silindi`,
          button: "Tamam",
          onHide: () => {
            fetchData();
          },
        });

        var newCollections = collections.map((collection) => {
          if (collection.id == collectionId) {
            var newLinks = collection.links.filter((link) => {
              if (
                link.collection_id == collectionId && link.item_id == ProjectId
                  ? ProjectId
                  : HouseID && link.room_order == ProjectId
                  ? HouseID
                  : null
              ) {
              } else {
                return link;
              }
            });

            return {
              ...collection,
              links: newLinks,
            };
          } else {
            return collection;
          }
        });

        setcollections(newCollections);
      })
      .catch((error) => {
        // Hata durumunu işleyin
        console.error("Error:", error);
      });
  };
  const [PopUpForRemoveItem, setsetPopUpForRemoveItem] = useState(false);
  const navigation = useNavigation();

  const filterEmojis = (text) => {
    // Emoji kod noktalarını içeren regex deseni
    const emojiRegex =
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
    return text.replace(emojiRegex, "");
  };
  const handleChangeText = (input) => {
    const filteredText = filterEmojis(input);
    setCollectionName(filteredText);
  };
  useEffect(() => {
    if (loading) {
      // Yükleniyor ise
      navigation.setOptions({
        title: "Yükleniyor...",
      });
    } else if (namFromGetUser) {
      // Yüklenme tamamlandığında ve namFromGetUser dolu olduğunda
      navigation.setOptions({
        title:
          namFromGetUser.corporate_type === "Emlak Ofisi"
            ? "Portföy Oluştur Ve Ekle"
            : "Koleksiyon Oluştur Ve Ekle",
      });
    }
  }, [loading, namFromGetUser, navigation]);

  return (
    <AlertNotificationRoot>
      <>
        {loading ? (
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <ActivityIndicator color="#333" size={"large"} />
          </View>
        ) : (
          <>
            {user.access_token ? (
              <>
                <ScrollView
                  style={styles.container}
                  contentContainerStyle={{ paddingBottom: 50 }}
                >
                  <View style={{ gap: 5, paddingTop: 10 }}>
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#333",
                        fontWeight: "bold",
                      }}
                    >
                      {user.type == 2 && user.corporate_type == "Emlak Ofisi"
                        ? "Portföy İsmi"
                        : "Koleksiyon İsmi"}
                    </Text>

                    <TextInput
                      style={styles.Input}
                      value={CollectionName}
                      onChangeText={(value) => handleChangeText(value)}
                    />
                    <View style={{ paddingTop: 10, alignItems: "center" }}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#EA2B2E",
                          padding: 9,
                          borderRadius: 5,
                          width: "90%",
                          opacity: disabledTrue == true ? 0.3 : 1,
                        }}
                        onPress={addCollectionPost}
                        disabled={disabledTrue}
                      >
                        <Text
                          style={{
                            color: "#ffffff",
                            fontSize: 13,
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          {user.type == 2 &&
                          user.corporate_type == "Emlak Ofisi"
                            ? "Portföy Ekle"
                            : "Koleksiyon Ekle"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* <View style={{ paddingTop: 45 }}>
                    <Text
                      style={{ fontSize: 14, color: "#333", fontWeight: "700" }}
                    >
                      {user.type == 2 && user.corporate_type == "Emlak Ofisi"
                        ? "Portföylerim"
                        : "Koleksiyonlarım"}
                    </Text>
                  </View> */}
                  <View style={{ gap: 5, padding: 10 }}>
                    {loading ? (
                      <>
                        <View>
                          <ActivityIndicator size={"small"} color="#333" />
                        </View>
                      </>
                    ) : collections.length == 0 ? (
                      <>
                        {/* <View
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                            height: "90%",
                            gap: 10,
                          }}
                        >
                          <View
                            style={[
                              styles.card2,
                              {
                                alignItems: "center",
                                justifyContent: "center",
                              },
                            ]}
                          >
                            <Icon3
                              name="bookmark-add"
                              size={50}
                              color={"#EA2A28"}
                            />
                          </View>
                          <View>
                            <Text
                              style={{
                                color: "grey",
                                fontSize: 16,
                                fontWeight: "600",
                              }}
                            >
                              {user.type == 2 &&
                                user.corporate_type == "Emlak Ofisi"
                                ? "Portföyünüze İlan bulunmamaktadır."
                                : "Koleksiyonunuzda ilan bulunmamaktadır."}
                            </Text>
                          </View>
                          <View
                            style={{ width: "100%", alignItems: "center" }}
                          ></View>
                        </View> */}
                      </>
                    ) : (
                      collections.map((item, index) => (
                        <AddCollection
                          checkFunc={ıtemOnCollection}
                          key={index}
                          item={item}
                          getCollectionId={getCollectionId}
                          addLink={addSelectedCollection}
                          removeItemOnCollection={removeItemOnCollection}
                          setPopUpForRemoveItem={setsetPopUpForRemoveItem}
                        />
                      ))
                    )}
                  </View>
                </ScrollView>
              </>
            ) : (
              <>
                <View style={{}}>
                  <View style={styles.card}>
                    <View style={{ paddingTop: 10 }}>
                      <Text
                        style={{
                          textAlign: "center",
                          color: "#4C6272",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Üyeliğiniz Bulunmamaktadır!
                      </Text>
                    </View>
                    <View style={{ width: "80%" }}>
                      <Text style={{ textAlign: "center", color: "#7A8A95" }}>
                        {user.type == 2 && user.corporate_type == "Emlak Ofisi"
                          ? "Portföyünüze konut ekleyebilmeniz için giriş yapmanız gerekmektedir"
                          : "Koleksiyonunuza konut ekleyebilmeniz için giriş yapmanız gerekmektedir"}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#F65656",
                        width: "100%",
                        padding: 10,
                      }}
                      onPress={() => {
                        setTimeout(() => {
                          navigation.navigate("Login");
                        }, 400);
                      }}
                    >
                      <Text style={{ color: "#FFFFFF", textAlign: "center" }}>
                        Giriş Yap
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </>
        )}
      </>
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7f7",
    padding: 10,
  },
  Input: {
    backgroundColor: "#ebebebeb",
    padding: 9,
    borderRadius: 5,
  },
  card: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    gap: 10,
    width: "100%",

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
  card2: {
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
