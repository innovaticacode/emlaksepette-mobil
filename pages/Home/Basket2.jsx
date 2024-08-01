import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ImageBackground,
  Image,
} from "react-native";
import { Platform } from "react-native";
import IconIdCard from "react-native-vector-icons/FontAwesome";
import React, { useState, useEffect } from "react";
import BasketItem from "../../components/BasketItem";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import TrashIcon from "react-native-vector-icons/EvilIcons";
import {
  useRoute,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";

import Header from "../../components/Header";
import Search from "./Search";
import Categories from "../../components/Categories";
import Modal from "react-native-modal";
import { getValueFor } from "../../components/methods/user";
import axios from "axios";
import { addDotEveryThreeDigits } from "../../components/methods/merhod";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import DrawerMenu from "../../components/DrawerMenu";
import { ActivityIndicator } from "react-native-paper";

export default function Basket2() {
  const route = useRoute();

  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [neightboord, setNeightboord] = useState(false);
  const [ilanNo, setIlanNo] = useState("");
  const [roomOrder, setRoomOrder] = useState("");

  useEffect(() => {
    const fetchStoredData = async () => {
      try {
        const storedTitle = await SecureStore.getItemAsync("advertise_title");
        const storedAmount = await SecureStore.getItemAsync("amount");
        const storedImageUrl = await SecureStore.getItemAsync("imageUrl");
        const storedNeightboord = await SecureStore.getItemAsync("neightboord");
        const storedIlanNo = await SecureStore.getItemAsync("ilanNo");
        const storedRoomOrder = await SecureStore.getItemAsync(
          "roomOrderString"
        );

        setTitle(storedTitle || "Başlık bulunamadı");
        setAmount(storedAmount || "Tutar bulunamadı");
        setImageUrl(storedImageUrl || "resim yok");
        setNeightboord(storedNeightboord || "abooov");
        setIlanNo(storedIlanNo || "İlan numarası bulunamadı");
        setRoomOrder(storedRoomOrder || "Oda numarası bulunamadı");
      } catch (error) {
        console.error("Veri alma hatası:", error);
      }
    };

    fetchStoredData();
  }, []);

  console.log("roomOrderss");

  const [Basket, SetBasket] = useState([
    {
      name: "MASTER ORMAN KÖY EVLERİ",
      price: 2500000,
      shopName: "Maliyetine Ev",
      shopPoint: 8.3,
      id: 1,
      hisse: true,
    },
  ]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const [user, setuser] = useState({});
  const [Cart, setCart] = useState({});
  const [type, settype] = useState({});
  const [saleType, setsaleType] = useState({});
  const [offerControl, setofferControl] = useState({});
  const [payDec, setpayDec] = useState([]);
  const [isShare, setisShare] = useState([]);
  const [CartLength, setCartLength] = useState([]);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);

  const fetchData = async () => {
    try {
      if (user?.access_token && isFocused) {
        setLoading(true);
        const response = await axios.get(
          "https://private.emlaksepette.com/api/institutional/my-cart",
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        setCart(response?.data?.cart?.item);
        settype(response?.data?.cart);
        setsaleType(response?.data?.saleType);
        setofferControl(response?.data);
        setpayDec(response?.data?.cart?.item?.pay_decs);
        setisShare(response?.data?.cart?.item?.isShare);
        setCartLength(response?.data?.cart);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.access_token) {
      fetchData();
    }
  }, [isFocused, user]);
  const [parsedshare, setparsedshare] = useState("");
  const Parse = async () => {
    try {
      if (Cart && isShare && type && saleType) {
        setparsedshare(JSON.parse(isShare)[0]);
      }
    } catch (error) {
      console.log("parse edilemedi");
    }
  };
  useEffect(() => {
    Parse();
  }, [fetchData]);

  const [isInstallament, setisInstallament] = useState(1);

  let DiscountRate = Cart?.discount_rate;
  let TotalPrice = Cart?.price;
  let DiscountPrice = Cart?.price - (Cart?.amount * Cart?.discount_rate) / 100;
  let KaporaForDiscountPrice = (DiscountPrice * 2) / 100;

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const monthNames = [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ];

    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${month}, ${day} ${year}`;
  };

  // Sepetteki Hisse Sayısını Arttırma Ve Fİyat Güncelleme
  const [shareCounter, setshareCounter] = useState(1);
  //Arttırma
  const [message, setmessage] = useState({});
  const [counter, setcounter] = useState(1);
  const UpdateCart = async () => {
    let formData = new FormData();
    formData.append("change", "artir");
    try {
      if (user.access_token) {
        const response = await axios.post(
          "https://private.emlaksepette.com/api/update-cart-qt",
          formData,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        fetchData();
        setmessage(response.data);
        setcounter(response?.data?.quantity);
        if (counter == Cart.numbershare) {
          Alert.alert("Daha Fazla Hisse Ekleyemezsinizæ");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const UpdateShareMinus = async () => {
    let formData = new FormData();
    formData.append("change", "azalt");
    try {
      if (user.access_token) {
        const response = await axios.post(
          "https://private.emlaksepette.com/api/update-cart-qt",
          formData,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        fetchData();
        setmessage(response.data);
        setcounter(response?.data?.quantity);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateUserData = async () => {
    try {
      const updateResponse = await axios.get(
        "https://private.emlaksepette.com/api/users/" + user?.id,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );

      // Mevcut kullanıcı verilerini güncellenmiş verilerle birleştirme
      const updatedUser = {
        ...user,
        ...updateResponse.data.user,
        access_token: user.access_token, // access token'ı koruma
      };

      // Kullanıcı durumunu güncelleme
      setuser(updatedUser);

      // SecureStore ile güncellenmiş kullanıcı verilerini kaydetme
      await SecureStore.setItemAsync("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    }
  };

  const DeleteBasket = async () => {
    try {
      if (user.access_token) {
        const response = await axios.post(
          "https://private.emlaksepette.com/api/remove-from-cart",
          {},
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        updateUserData();
        fetchData();

        //  console.log(updateResponse.data + 'User')
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("tr-TR", {
      currencyDisplay: "code",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const [messageUpdateCart, setmessageUpdateCart] = useState({});
  const UpdateCartForInstallemnt = async (selectedOption) => {
    let qt = Cart.qt ? Cart.qt : 1;

    var updatedPrice =
      selectedOption === "taksitli"
        ? Cart.installmentPrice * qt
        : Cart.defaultPrice * qt;
    let formData = new FormData();
    formData.append("paymentOption", selectedOption);
    formData.append("updatedPrice", updatedPrice);
    try {
      if (user.access_token) {
        const response = await axios.post(
          "https://private.emlaksepette.com/api/update-cart",
          formData,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        fetchData();
        setmessageUpdateCart(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const nav = useNavigation();
  const [index, setindex] = useState(0);
  const [tab, settab] = useState(0);
  console.log(CartLength);

  const [paymentMethod, setPaymentMethod] = useState("");
  const renderRightActions = () => (
    <TouchableOpacity style={styles.deleteButton} onPress={DeleteBasket}>
      <Text style={styles.deleteButtonText}>Sil</Text>
      <TrashIcon name="trash" size={23} color={"white"} />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {loading ? (
        <ActivityIndicator color="#333" size="large" />
      ) : (
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "white", width: "100%" }}
        >
          <View style={{ padding: 20 }}>
            <View
              style={[
                styles.acceptCart,
                {
                  borderWidth: 1,
                  borderColor: "#F0EDE9",
                  borderRadius: 5,

                  padding: 20,
                },
              ]}
            >
              <View style={{ flexDirection: "row" }}>
                {imageUrl !== "resim yok" && imageUrl !== "" && (
                  <Image
                    source={{ uri: imageUrl }}
                    style={{ width: 100, height: 100, borderRadius: 10 }}
                    resizeMode="cover"
                    onError={(error) => {
                      console.error(
                        "Image Load Error: ",
                        error.nativeEvent.error
                      );
                    }}
                  />
                )}
                <View
                  style={{
                    flexDirection: "column",
                    flexWrap: "wrap",
                    gap: 5,
                    flex: 1,
                  }}
                >
                  <Text style={{ fontSize: 10 }}>İlan No: {ilanNo} </Text>
                  <Text style={{ fontWeight: "700" }}>{title} </Text>
                  <View style={{ width: "100%" }}>
                    <Text style={{ fontSize: 8, fontWeight: "bold" }}>
                      {roomOrder} No'lu konut için komşumu gör satın alım
                      sayfası
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.acceptCart}>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    flex: 0.8 / 2,
                    paddingLeft: 15,
                    padding: 4,
                    gap: 4,
                  }}
                >
                  <Text style={{ color: "grey", fontSize: 12 }}>Toplam</Text>
                  <Text style={{ fontWeight: "500" }}>250 ₺</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("PaymentScreen2", {
                      title,
                      amount,
                      imageUrl,
                      neightboord,
                      ilanNo,
                      roomOrder,
                    });
                  }}
                  style={{
                    flex: 1.2 / 2,
                    backgroundColor: "#ea2b2e",
                    justifyContent: "center",
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ textAlign: "center", color: "white" }}>
                    Sepeti Onayla
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    gap: 10,
  },
  acceptCart: {
    width: "100%",
    marginTop: 10,
    padding: 10,

    gap: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: "100%",

    borderWidth: 0.7,
    borderColor: "#CED4DA",
    ...Platform.select({
      ios: {
        shadowColor: " #e6e6e6",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  deleteButton: {
    padding: 30,
    backgroundColor: "#ea2b2e",

    flexDirection: "row",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 15,
  },
  toggleButton: {
    fontSize: 20,
    marginBottom: 20,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  toggleButton: {
    fontSize: 20,
    marginBottom: 20,
  },

  modal: {
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",

    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: 320,
  },
  HouseInfo: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: "100%",
    marginTop: 10,

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
  modal2: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent2: {
    backgroundColor: "#f4f4f4",
    padding: 20,
    height: "75%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  AdvertDetail: {
    gap: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: "100%",

    borderWidth: 0.7,
    borderColor: "#e6e6e6",
    ...Platform.select({
      ios: {
        shadowColor: " #e6e6e6",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.0,
        shadowRadius: 1,
      },
      android: {
        elevation: 5,
      },
    }),
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