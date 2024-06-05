import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  Modal,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import Icon from "react-native-vector-icons/EvilIcons";
import Coin from "react-native-vector-icons/FontAwesome5";
import Loading from "react-native-vector-icons/EvilIcons";
import Icon2 from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import CollectionItemPanel from "./profileComponents/CollectionItemPanel";
import { getValueFor } from "../../../components/methods/user";
import { Platform } from "react-native";
import axios from "axios";
import Header from "../../../components/Header";
import { ActivityIndicator } from "react-native-paper";
export default function Panel({ options, onSelect }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const navigation = useNavigation();
  const handleSelect = (option) => {
    setModalVisible(false);
    onSelect(option);
  };
  const [links, setLinks] = useState({});

  const calculateButtonPosition = () => {
    if (buttonRef.current) {
      buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
        setButtonPosition({ x: pageX, y: pageY + height });
      });
    }
  };
  const buttonRef = useRef();
  const { width, height } = Dimensions.get("window");

  const [panelInfo, setPanelInfo] = useState({});
  const [user, setUser] = useState({});
  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.access_token) {
          const response = await axios.get(
            `https://test.emlaksepette.com/api/institutional/users/${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${user?.access_token}`,
              },
            }
          );
          setPanelInfo(response?.data);
          setLinks(response?.data.collections.links);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    };
    fetchData();
  }, [user]);

  const PhotoUrl = "https://test.emlaksepette.com/storage/profile_images/";

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };
    loadData();
  }, []);
  return (
    <>
      <View style={style.container}>
        {isLoading ? (
          <View style={style.loadingContainer}>
            <ActivityIndicator size="large" color="#000000" />
          </View>
        ) : (
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <View style={style.container}>
              <View style={style.header}>
                <View style={style.NameInfo}>
                  <View style={style.cardContainer}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "start",
                        textAlign: "start",
                        width: "100%",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            width: "85%",
                          }}
                        >
                          <View style={style.ProfileImage}>
                            <Image
                              source={{
                                uri: `https://test.emlaksepette.com/storage/profile_images/${user.profile_image}`,
                              }}
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                              }}
                            />
                          </View>
                          <View style={{marginLeft: 5}}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: "400",
                              }}
                            >
                              {panelInfo?.user?.name}
                            </Text>
                            <Text
                              style={{
                                color: "black",
                                fontWeight: "500",
                                fontSize: 10,
                              }}
                            >
                              {user.email}
                            </Text>
                          </View>
                        </View>

                        <TouchableOpacity
                          onPress={() => navigation.navigate("Notifications")}
                          style={{
                            width: 50,
                            alignItems: "center",

                            borderRadius: 15,
                          }}
                        >
                          <View
                            style={{
                              position: "absolute",
                              backgroundColor: "red",
                              paddingLeft: 6,
                              paddingRight: 6,

                              paddingTop: 2,
                              paddingBottom: 2,
                              bottom: 15,
                              left: 23,
                              zIndex: 1,
                              borderRadius: 20,
                            }}
                          >
                            <Text style={{ color: "white", fontSize: 11 }}>
                              1
                            </Text>
                          </View>
                          <Icon name="bell" size={28} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* <View style={{ padding: 0 }}>
          <View style={{ width: "100%", paddingLeft: 10, paddingRight: 10 }}>
            <TouchableOpacity
              ref={buttonRef}
              onPress={() => {
                calculateButtonPosition();
                setModalVisible(true);
              }}
              style={style.dropdownButton}
            >
              <Text style={{ color: "#B3B3B3" }}>Son 7 Gün</Text>
              <Icon name="arrow-drop-down" size={20} color={"#B3B3B3"} />
            </TouchableOpacity>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <TouchableOpacity
                style={style.modalBackground}
                onPress={() => setModalVisible(false)}
              >
                <View
                  style={[
                    style.modalContent,
                    { top: buttonPosition.y, left: buttonPosition.x },
                  ]}
                >
                  <View style={{ width: "100%", gap: 10 }}>
                    <TouchableOpacity
                      style={{
                        borderWidth: 0.8,
                        borderColor: "#ebebeb",
                        padding: 10,
                      }}
                    >
                      <Text>Son 7 Gün</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        borderWidth: 0.8,
                        borderColor: "#ebebeb",
                        padding: 10,
                        justifyContent: "center",
                      }}
                    >
                      <Text>Son 15 Gün</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        borderWidth: 0.8,
                        borderColor: "#ebebeb",
                        padding: 10,
                      }}
                    >
                      <Text>1 Ay</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </Modal>
          </View>
        </View> */}

              <View style={styles.container}>
                <Image
                  source={{ uri: "https://test.emlaksepette.com/images/emlak-kulup-banner.png" }}
                  style={styles.image}
                />
              </View>

              <View style={style.Cards}>
                <Text
                  style={{
                    fontSize: 13,
                    letterSpacing: 0.2,
                    fontWeight: 600,
                    marginLeft: 5,
                  }}
                >
                  Emlak Kulüp Kazanç İstatistiği
                </Text>
                <View style={style.CardsItems}>
                  <View style={style.Item}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ flex: 1.8 / 2 }}>
                        <Text
                          style={{
                            fontSize: 13,
                            color: "#FF0000",
                            fontWeight: "bold",
                          }}
                        >
                          Toplam Kazanç
                        </Text>
                        <Text style={{ fontSize: 9, fontWeight: "bold" }}>
                          (Komisyon Tutarı)
                        </Text>
                      </View>

                      <View style={{ flex: 0.2 / 2 }}>
                        <Coin name="coins" size={18} color={"#9ACA66"} />
                      </View>
                    </View>
                    <View style={{ top: 10, gap: 10 }}>
                      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                        {panelInfo.balanceStatus1}
                        {" ₺"}
                      </Text>
                      <View style={{ flexDirection: "row", gap: 3 }}>
                        <Coin name="angle-up" color={"#9ACA66"} />
                        <Text style={{ fontSize: 11, color: "#9ACA66" }}>
                          2.5%{" "}
                        </Text>
                        <Text style={{ fontSize: 11, color: "#ACACAC" }}>
                          son 7 gün
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={style.Item}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ flex: 1.8 / 2 }}>
                        <Text
                          style={{
                            fontSize: 13,
                            color: "#FF0000",
                            fontWeight: "bold",
                          }}
                        >
                          Reddedilen
                        </Text>
                        <Text style={{ fontSize: 9, fontWeight: "bold" }}>
                          (Komisyon Tutarı)
                        </Text>
                      </View>

                      <View style={{ flex: 0.2 / 2 }}>
                        <Coin name="exclamation" size={18} color={"#FF0000"} />
                      </View>
                    </View>
                    <View style={{ top: 8, gap: 10 }}>
                      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                        {panelInfo.balanceStatus2}
                        {" ₺"}
                      </Text>
                      <View style={{ flexDirection: "row", gap: 3 }}>
                        <Coin name="angle-down" color={"#FF0000"} />
                        <Text style={{ fontSize: 10, color: "#FF0000" }}>
                          2.5%{" "}
                        </Text>
                        <Text style={{ fontSize: 10, color: "#ACACAC" }}>
                          son 7 gün
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={style.CardsItems}>
                  <View style={style.Item}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ flex: 1.8 / 2 }}>
                        <Text
                          style={{
                            fontSize: 13,
                            color: "#FFA500",
                            fontWeight: "bold",
                          }}
                        >
                          Onaydaki Kazanç
                        </Text>
                        <Text style={{ fontSize: 9, fontWeight: "bold" }}>
                          (Komisyon Tutarı)
                        </Text>
                      </View>

                      <View style={{ flex: 0.2 / 2 }}>
                        <Loading name="spinner-3" size={25} color={"#FFA500"} />
                      </View>
                    </View>
                    <View style={{ top: 8, gap: 10 }}>
                      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                        {panelInfo?.balanceStatus0} ₺
                      </Text>
                      <View style={{ flexDirection: "row", gap: 3 }}>
                        <Icon2 name="minus" color={"#FFA500"} />
                        <Text style={{ fontSize: 10, color: "#FFA500" }}>
                          2.5%{" "}
                        </Text>
                        <Text style={{ fontSize: 10, color: "#ACACAC" }}>
                          son 7 gün
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={style.Item}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ flex: 1.7 / 2 }}>
                        <Text
                          style={{
                            fontSize: 13,
                            color: "#9ACA66",
                            fontWeight: "bold",
                          }}
                        >
                          Başarı Yüzdesi(%)
                        </Text>
                        <Text style={{ fontSize: 9, fontWeight: "bold" }}>
                          (Komisyon Tutarı)
                        </Text>
                      </View>

                      <View style={{ flex: 0.2 / 2 }}>
                        <Icon2 name="bar-graph" size={15} color={"#9ACA66"} />
                      </View>
                    </View>
                    <View style={{ top: 8, gap: 10 }}>
                      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                        {panelInfo.successPercentage}
                        {" %"}
                      </Text>
                      <View style={{ flexDirection: "row", gap: 3 }}>
                        <Coin name="angle-up" color={"#9ACA66"} />
                        <Text style={{ fontSize: 10, color: "#9ACA66" }}>
                          2.5%{" "}
                        </Text>
                        <Text style={{ fontSize: 10, color: "#ACACAC" }}>
                          son 7 gün
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ width: "100%", padding: 10, top: 5 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      letterSpacing: 0.2,
                      fontWeight: 600,
                      marginLeft: 5,
                    }}
                  >
                    Son Eklenen Koleksiyonlarım
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Collecitons")}
                  >
                    <Text
                      style={{
                        letterSpacing: 0.2,
                        fontSize: 11,
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      Tümünü Gör
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ paddingTop: 10, gap: 10 }}>
                  {panelInfo.collections?.map((collection) => (
                    <CollectionItemPanel
                      panelInfo={collection.links}
                      collection={collection}
                    />
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </>
  );
}
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between", // Görseller arasında boşluk
    alignItems: "center", // Dikeyde ortalama
    padding: 10,
  },
  image: {
    width: "100%",
    height: 100,
    margin: 5,
    objectFit: "contain",
  },
});

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F9",
  },
  cardContainer: {
    backgroundColor: "white",
    width: "100%",
    padding: 9,
    textAlign: "center",
    borderRadius: 5,
  },
  header: {
    width: "100%",

    display: "flex",
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  NameInfo: {
    width: "100%",
  },
  ProfileImage: {},
  dropdownButton: {
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: "100%",
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 0.7,
    borderColor: "white",
    ...Platform.select({
      ios: {
        shadowColor: " white",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    position: "absolute",
    right: 10,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  Cards: {
    width: "100%",
    padding: 10,
    gap: 10,
  },
  CardsItems: {
    display: "flex",
    flexDirection: "row",

    gap: 10,
  },
  Item: {
    width: "100%",
    borderRadius: 5,
    backgroundColor: "blue",
    flex: 1,
    backgroundColor: "#FFFFFF",

    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "100%",

    borderWidth: 1,
    borderColor: "#FFFFFF",
  },

  CollectionItem: {
    width: "100%",

    padding: 4,
  },
  CollectionImage: {
    width: "100%",
    height: "50%",

    backgroundColor: "white",
    padding: 2,
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  CollecitonShadow: {
    width: "100%",

    display: "flex",
    flexDirection: "row",

    backgroundColor: "white",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,

    marginVertical: 0,

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
