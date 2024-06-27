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
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { Path, Svg } from "react-native-svg";

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

  const totalFavorites =
    user.projectFavoritesCount + user.housingFavoritesCount;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.access_token) {
          const response = await axios.get(
            `https://mobil.emlaksepette.com/api/users/${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${user?.access_token}`,
              },
            }
          );
          setPanelInfo(response?.data?.user);
          setLinks(response?.data.user.collections.links);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    };
    fetchData();
  }, [user]);

  const PhotoUrl = "https://mobil.emlaksepette.com/storage/profile_images/";

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
                                uri: `https://mobil.emlaksepette.com/storage/profile_images/${user.profile_image}`,
                              }}
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                              }}
                            />
                          </View>
                          <View style={{ marginLeft: 5 }}>
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

              {user?.has_club == 1 ? (
                <>
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
                            <Coin
                              name="exclamation"
                              size={18}
                              color={"#FF0000"}
                            />
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
                            <Loading
                              name="spinner-3"
                              size={25}
                              color={"#FFA500"}
                            />
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
                            <Icon2
                              name="bar-graph"
                              size={15}
                              color={"#9ACA66"}
                            />
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
                        onPress={() => navigation.navigate("Collections")}
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
                </>
              ) : (
                <View style={styles.container}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Collections")}
                    style={styles.image}
                  >
                    <Image
                      source={{
                        uri: "https://mobil.emlaksepette.com/images/emlak-kulup-banner.png",
                      }}
                      style={styles.image}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={style.container}>
              <View style={style.header}>
                <View style={styles.favoritesContainer}>
                  <Svg
                    fill="#000000"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="35px"
                    height="35px"
                    viewBox="0 0 58.341 58.342"
                    xmlSpace="preserve"
                    style={styles.icon}
                  >
                    <Path
                      d="M11.073,14.385h27.256l7.069,7.86l2.933-2.639c1.157-1.041,1.253-2.823,0.212-3.979l-7.201-8.005h-4.935V2.361h-6.059 v5.261H8.106l-7.361,7.999c-1.054,1.145-0.98,2.928,0.164,3.983l2.904,2.67L11.073,14.385z"
                      fill="#000000"
                    />
                    <Path
                      d="M36.76,26.767c2.312,0,4.541,0.763,6.362,2.14c0.122-0.092,0.25-0.176,0.375-0.261v-5.784l-5.54-6.2H11.821l-6.084,6.952 v23.67c0,1.557,1.262,2.817,2.818,2.817h23.692c-5.362-5.629-5.882-10.521-5.928-11.21c-0.083-0.547-0.124-1.06-0.124-1.56 C26.195,31.508,30.935,26.767,36.76,26.767z"
                      fill="#000000"
                    />
                    <Path
                      d="M49.861,29.198c-2.537,0-4.808,1.119-6.363,2.885c-1.553-1.764-3.824-2.885-6.36-2.885c-4.685,0-8.483,3.798-8.483,8.482 c0,0.479,0.049,0.945,0.125,1.403h-0.007c0,0,0.374,9.058,14.726,16.896c14.126-7.157,14.728-16.896,14.728-16.896h-0.008 c0.075-0.458,0.124-0.925,0.124-1.403C58.341,32.996,54.545,29.198,49.861,29.198z M36.873,33.05 c-2.759,0-5.001,2.244-5.001,5.001c0,0.145-0.117,0.26-0.261,0.26s-0.26-0.115-0.26-0.26c0-3.044,2.477-5.521,5.521-5.521 c0.144,0,0.261,0.116,0.261,0.26C37.133,32.934,37.016,33.05,36.873,33.05z"
                      fill="#000000"
                    />
                  </Svg>
                  <Text style={styles.favoritesText}>
                    <Text style={styles.favoritesNumber}>
                      {totalFavorites} İLAN
                    </Text>
                    {"\n"}
                    <Text style={styles.favoritesText}>
                      Favorilerinizdeki İlan Sayısı
                    </Text>
                  </Text>
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
  favoritesContainer: {
    backgroundColor: "white", // arka plan rengi
    width: "100%",
    width: "100%",
    padding: 9,
    textAlign: "center",
    borderRadius: 5,
    flexDirection: "row", // ikon ve metni yatayda hizalamak için
    alignItems: "center",
  },
  icon: {
    marginRight: 10, // ikon ile metin arasına boşluk eklemek için
  },
  favoritesText: {
    fontSize: width * 0.05, // ekran boyutuna göre yazı tipi boyutu
    color: "#343a40", // metin rengi
    fontWeight: "bold",
    fontSize: "12",
  },
  favoritesNumber: {
    color: "black",
    fontSize: "13",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between", // Görseller arasında boşluk
    alignItems: "center", // Dikeyde ortalama
    padding: 10,
    height: 200,
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
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
  Collectionshadow: {
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
