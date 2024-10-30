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
import { LinearGradient } from "expo-linear-gradient";
import Icon3 from "react-native-vector-icons/AntDesign";
import enler from "../../../components/images/enler.png";
import cerceve from "../../../components/images/cerceve.png";
import { addDotEveryThreeDigits } from "../../../components/methods/merhod";
import { apiUrl, frontEndUriBase } from "../../../components/methods/apiRequest";

export default function Panel({ options, onSelect }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const navigation = useNavigation();
  const handleSelect = (option) => {
    setModalVisible(false);
    onSelect(option);
  };
  const [links, setLinks] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
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
            `${apiUrl}profile/info/mobile/dashboard`,
            {
              headers: {
                Authorization: `Bearer ${user?.access_token}`,
              },
            }
          );
          setPanelInfo(response?.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    };
    fetchData();
  }, [user]);

 

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };
    loadData();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (!user?.access_token) {
          setNotifications([]);
          setNotificationCount(0);
          return;
        }

        const response = await axios.get(
          apiUrl+"user/notification",
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );

        if (response.data) {
          setNotifications(response.data);
        } else {
          setNotifications([]);
        }
        const unreadCount = response.data.filter(
          (notification) => notification.readed === 0
        ).length;
        setNotificationCount(unreadCount);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotifications([]);
        setNotificationCount(0); // Set unreadCount to 0 in case of an error
      }
    };

    if (user?.access_token) {
      fetchNotifications();
    }
  }, [user?.access_token]);

  const data = [
    { baslik: "Aktif İlanlar", bilgi: "122" },
    { baslik: "Onay Bekleyen İlanlar", bilgi: "75" },
    { baslik: "Toplam İlanlar", bilgi: "30" },
    { baslik: "Rededilen İlanlar", bilgi: "15" },
  ];
  const formattedSales = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(panelInfo.totalSales);
console.log(user.access_token)
  return (
    <>
      <View style={style.container}>
        {isLoading ? (
          <View style={style.loadingContainer}>
            <ActivityIndicator size="large" color="#333" />
          </View>
        ) : (
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <View style={style.container}>
              <View style={{ marginBottom: 20 }}>
                <View style={{ position: "relative", marginTop: 30 }}>
                  <LinearGradient
                    colors={["rgba(234, 43, 46, 1)", "rgba(132, 24, 26, 0.62)"]} // RGBA formatında renkler
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={[styles.gradient, {}]}
                  >
                    {/* Gradyan içeriği */}
                  </LinearGradient>
                </View>
                <View
                  style={{
                    marginTop: 10,
                    position: "absolute",
                    top: 14,
                    left: 20,
                    flexDirection: "row",
                    borderWidth: 4,
                    borderRadius: 50,
                    borderColor: "#F7F7F9",
                  }}
                >
                  <ImageBackground
                    source={{
                      uri: `${frontEndUriBase}storage/profile_images/${panelInfo.user.profile_image}`,
                    }}
                    style={styles.imageBackground}
                    resizeMode="cover"
                    imageStyle={{}}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      flexDirection: "column",
                      position: "absolute",
                      top: 24,
                      left: 90,
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "700" }}>
                      {panelInfo.user.name}
                    </Text>
                    <Text style={{ color: "white", fontWeight: "400" }}>
                      {panelInfo.user.email}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                <View style={styles.rowContainer}>
                  <View style={styles.itemContainer}>
                    <View style={{ padding: 10, alignItems: "center" }}>
                      <Text style={styles.title}>Aktif İlanlar</Text>
                    </View>
                    <View
                      style={{
                        width: "100%",
                      }}
                    >
                      <LinearGradient
                        colors={[
                          "rgba(234, 43, 46, 1)",
                          "rgba(132, 24, 26, 0.62)",
                        ]} // RGBA formatında renkler
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={[
                          styles.gradient2,
                          {
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                          },
                        ]}
                      >
                        {/* Gradyan içeriği */}
                        <Text style={styles.info}>
                          {panelInfo.activeAdvertProjects +
                            panelInfo.activeAdvertHousings}
                        </Text>
                      </LinearGradient>
                    </View>
                  </View>
                  <View style={styles.itemContainer}>
                    <View style={{ padding: 10, alignItems: "center" }}>
                      <Text style={styles.title}>Onay Bekleyen İlanlar</Text>
                    </View>
                    <View
                      style={{
                        width: "100%",
                      }}
                    >
                      <LinearGradient
                        colors={[
                          "rgba(234, 43, 46, 1)",
                          "rgba(132, 24, 26, 0.62)",
                        ]} // RGBA formatında renkler
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={[
                          styles.gradient2,
                          {
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                          },
                        ]}
                      >
                        {/* Gradyan içeriği */}
                        <Text style={styles.info}>
                          {panelInfo.pendingAdvertProjects +
                            panelInfo.pendingAdvertHousings}
                        </Text>
                      </LinearGradient>
                    </View>
                  </View>
                  <View style={styles.itemContainer}>
                    <View style={{ padding: 10, alignItems: "center" }}>
                      <Text style={styles.title}>Pasif İlanlar</Text>
                    </View>
                    <View
                      style={{
                        width: "100%",
                      }}
                    >
                      <LinearGradient
                        colors={[
                          "rgba(234, 43, 46, 1)",
                          "rgba(132, 24, 26, 0.62)",
                        ]} // RGBA formatında renkler
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={[
                          styles.gradient2,
                          {
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                          },
                        ]}
                      >
                        {/* Gradyan içeriği */}
                        <Text style={styles.info}>
                          {panelInfo.passiveAdvertHousings +
                            panelInfo.passiveAdvertProjects}
                        </Text>
                      </LinearGradient>
                    </View>
                  </View>
                  <View style={styles.itemContainer}>
                    <View style={{ padding: 10, alignItems: "center" }}>
                      <Text style={styles.title}>Reddedilen İlanlar</Text>
                    </View>
                    <View
                      style={{
                        width: "100%",
                      }}
                    >
                      <LinearGradient
                        colors={[
                          "rgba(234, 43, 46, 1)",
                          "rgba(132, 24, 26, 0.62)",
                        ]} // RGBA formatında renkler
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={[
                          styles.gradient2,
                          {
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                          },
                        ]}
                      >
                        {/* Gradyan içeriği */}
                        <Text style={styles.info}>
                          {panelInfo.rejectAdvertProjects +
                            panelInfo.rejectAdvertHousings}
                        </Text>
                      </LinearGradient>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                <View
                  style={[
                    styles.card,
                    {
                      padding: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 15,
                    },
                  ]}
                >
                  <View>
                    <View
                      style={{
                        backgroundColor: "#FF9908",
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon3 name="eyeo" size={20} color={"#fff"} />
                    </View>
                  </View>
                  <View style={{ gap: 3 }}>
                    <Text
                      style={{
                        color: "#000000",
                        fontWeight: "400",
                        fontSize: 13,
                      }}
                    >
                      Genel Görüntülenme Sayısı
                    </Text>
                    <Text
                      style={{
                        color: "#000000",
                        fontWeight: "600",
                        fontSize: 12,
                      }}
                    >
                      {panelInfo.viewCountProjects +
                        panelInfo.viewCountHousings}
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.card,
                    {
                      padding: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 15,
                      marginTop: 10,
                    },
                  ]}
                >
                  <View>
                    <View
                      style={{
                        backgroundColor: "red",
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon3 name="wallet" size={20} color={"#fff"} />
                    </View>
                  </View>
                  <View style={{ gap: 3 }}>
                    <Text
                      style={{
                        color: "#000000",
                        fontWeight: "400",
                        fontSize: 13,
                      }}
                    >
                      Toplam Satış
                    </Text>
                    <Text
                      style={{
                        color: "#000000",
                        fontWeight: "600",
                        fontSize: 12,
                      }}
                    >
                      {formattedSales}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.card,
                  {
                    paddingRight: 10,
                    paddingLeft: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 15,
                    marginTop: 10,
                    height: "25%",
                  },
                ]}
              >
                <View
                  style={{
                    width: "100%",

                    overflow: "hidden",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                        marginTop: 10,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Icon3
                          name="star"
                          size={20}
                          color={"orange"}
                          style={{ marginRight: 10 }}
                        />
                        <Text>Emlak Kulubün Enleri</Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <View
                          style={{
                            backgroundColor: "red",
                            padding: 10,
                            borderRadius: 10,
                          }}
                        >
                          <Text style={{ fontSize: 10, color: "white" }}>
                            Tümünü Gör
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <ImageBackground
                    source={enler}
                    style={styles.backgroundImage}
                    resizeMode="cover" // Resmi kapsayacak şekilde ayarlar
                  >
                    <View style={styles.overlay}>
                      <Text style={styles.text}>
                        Bu ayın eni sen olabilirsin!
                      </Text>
                      <Text style={styles.text}>Enler arasında yerini al!</Text>
                    </View>
                    <View style={{}}>
                      <ImageBackground
                        source={cerceve}
                        style={styles.imageBackground2}
                        resizeMode="cover"
                      >
                        <Text style={{ top: 69, left: 27, color: "white" }}>
                          {panelInfo.user.name}
                        </Text>
                      </ImageBackground>
                      <ImageBackground
                      
                        source={{ uri: frontEndUriBase + 'storage/profile_images/' }}
                        style={styles.imageBackground3}
                        resizeMode="cover"
                        imageStyle={{
                          borderBottomLeftRadius: 20,
                          borderBottomRightRadius: 20,
                        }}
                      />
                    </View>
                  </ImageBackground>
                </View>
              </View>

              <View style={{ marginTop: 10, marginBottom: 100 }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("AdvertPanel")}
                  style={[
                    styles.card,
                    {
                      padding: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 15,
                      marginTop: 10,
                    },
                  ]}
                >
                  <View
                    style={{
                      paddingLeft: 20,
                      paddingRight: 20,
                      borderLeftWidth: 3,
                      borderColor: "red",
                    }}
                  >
                    <Text style={{ borderLeftWidth: 3, borderColor: "red" }}>
                      İlan Yönetimi
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ClubPanel");
                  }}
                  style={[
                    styles.card,
                    {
                      padding: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 15,
                      marginTop: 10,
                    },
                  ]}
                >
                  <View
                    style={{
                      paddingLeft: 20,
                      paddingRight: 20,
                      borderLeftWidth: 3,
                      borderColor: "red",
                    }}
                  >
                    <Text>Emlak Kulüp</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Collections");
                  }}
                  style={[
                    styles.card,
                    {
                      padding: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 15,
                      marginTop: 10,
                    },
                  ]}
                >
                  <View
                    style={{
                      paddingLeft: 20,
                      paddingRight: 20,
                      borderLeftWidth: 3,
                      borderColor: "red",
                    }}
                  >
                    <Text>Koleksiyonlarım</Text>
                  </View>
                </TouchableOpacity>
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
  card: {
    backgroundColor: "#FFFFFF",

    width: "100%",
    borderRadius: 8,

    borderColor: "#e6e6e6",
  },
  gradient: {
    width: "100%",
    height: 50,
    marginTop: 10,
  },
  gradient2: {
    width: "100%",
    height: 30,
    marginTop: 10,
  },
  overlay: {
    flex: 1, // Gerekirse overlay içeriğinin arka plan görseli üzerinde yer almasını sağlar

    padding: 20,
  },
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "left",
  },
  imageBackground: {
    width: 80, // Dairenin genişliği
    height: 80, // Dairenin yüksekliği
    borderRadius: 60, // Yarıçap (width / 2)
    overflow: "hidden", // Görüntünün taşmasını engellemek için,
    // ��izgi kalınlığı
    borderColor: "#F7F7F9", // ��izgi rengi
  },
  imageBackground3: {
    width: 75, // Dairenin genişliği
    height: 75, // Dairenin yüksekliği
    borderRadius: 50, // Yarıçap (width / 2)
    overflow: "hidden", // Görüntünün taşmasını engellemek için,
    position: "absolute", //
    left: 15,
    top: 10,
  },
  imageBackground2: {
    width: 100, // Dairenin genişliği
    height: 100, // Dairenin yüksekliği

    // Yarıçap (width / 2)
    overflow: "hidden", // Görüntünün taşmasını engellemek için,
    zIndex: 11,
  },
  backgroundImage: {
    flex: 1, // Tüm alanı kaplamasını sağlar
    flexDirection: "row",
    justifyContent: "space-between", // İçeriği dikeyde ortalar
    alignItems: "center", //
    padding: 10, // İçeriğin etrafındaki padding
    borderRadius: 20,
    overflow: "hidden",
  },

  rowContainer: {
    flexDirection: "row", // Öğeleri yatayda hizalar
    flexWrap: "wrap", // Taşma durumunda yeni satıra geçmelerini sağlar
    justifyContent: "space-between", // Öğeler arasında eşit boşluk bırakır
    alignItems: "center", //
  },
  itemContainer: {
    width: (Dimensions.get("window").width - 60) / 2, // Genişliği ekran genişliğine göre ayarlar ve iki öğe yan yana gelir
    flexDirection: "column", // Her bir itemContainer içindeki metinleri alt alta hizalar

    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    alignItems: "center",

    marginBottom: 15, // Alt kenarda boşluk bırakır
  },
  title: {
    fontWeight: "bold",
    fontSize: 12,
  },
  info: {
    fontSize: 12,
    color: "white",
    fontWeight: "700",
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
