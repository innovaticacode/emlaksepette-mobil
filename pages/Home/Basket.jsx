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
import { useRoute, useNavigation, useIsFocused } from "@react-navigation/native";
import Header from "../../components/Header";
import Search from "./Search";
import Categories from "../../components/Categories";
import Modal from "react-native-modal";
import { getValueFor } from "../../components/methods/user";
import axios from "axios";
import { addDotEveryThreeDigits } from "../../components/methods/merhod";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Image } from "react-native-svg";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons"
import DrawerMenu from "../../components/DrawerMenu";
import { ActivityIndicator } from "react-native-paper";


export default function Basket() {
  const route = useRoute();

  const navigation = useNavigation();


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
  const [CartLength, setCartLength] = useState([])
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
      console.log(updatedUser)
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
        updateUserData()
        fetchData();
       
   
        //  console.log(updateResponse.data + 'User')
      }                                                            
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(user.access_token + 'token')
  const formatAmount = (amount) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
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

const nav=useNavigation()
  const [index, setindex] = useState(0)
  const [tab, settab] = useState(0)
 console.log(CartLength)

 const renderRightActions = () => (
  <TouchableOpacity style={styles.deleteButton} onPress={DeleteBasket}>
    <Text style={styles.deleteButtonText}>Sil</Text>
    <TrashIcon name="trash" size={23} color={"white"} />
  </TouchableOpacity>
);
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      {
        loading ? 
        <ActivityIndicator color="#333" size='large'/>:

   
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", }}>
      <View
        style={{
          ...Platform.select({
            ios: {},
            android: {
              paddingTop: 25,
            },
          }),
        }}
      >
        <Header onPress={toggleDrawer} index={setindex} tab={settab} />
      </View>

      <Modal
        isVisible={isDrawerOpen}
        onBackdropPress={() => setIsDrawerOpen(false)}
        animationIn="bounceInLeft"
        animationOut="bounceOutLeft"
        swipeDirection={["left"]}
        onSwipeComplete={() => setIsDrawerOpen(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
        <View
            style={{
              backgroundColor: "#EA2C2E",
              flex: 1 / 3,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
          <DrawerMenu setIsDrawerOpen={setIsDrawerOpen}/>
          </View>
          <View style={{ backgroundColor: "white", flex: 1.3 / 2 }}>
            <Search onpres={toggleDrawer} />
          </View>
        </View>
      </Modal>

      {CartLength !== false ? (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView
            style={styles.container}
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={false}
          >
            <GestureHandlerRootView style={{ backgroundColor: "white" }}>
              <Swipeable renderRightActions={renderRightActions}>
                <BasketItem
                DeleteBasket={DeleteBasket}
                  name={Cart?.title}
                  ımage={Cart?.image}
                  price={Cart?.amount}
                  roomOrder={Cart?.housing}
                  type={type?.type}
                  share={parsedshare}
                  update={UpdateCart}
                  minus={UpdateShareMinus}
                  counter={counter}
                  storeName={offerControl?.store}
                />
              </Swipeable>
            </GestureHandlerRootView>

         

            {type?.type == "project" && (
              <View
                style={{
                  flexDirection: "row",
                  borderWidth: 1,
                  borderColor: "#E4E4E4",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "50%",
                    padding: 9,
                    backgroundColor:
                      isInstallament == 1 ? "#5CB85C" : "transparent",
                    borderTopRightRadius: 15,
                    borderBottomRightRadius: 15,
                  }}
                  onPress={() => {
                    setisInstallament(1);
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: isInstallament == 2 ? "#333" : "#ffffff",
                    }}
                  >
                    Peşin Fiyat İle Ödeme
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: "50%",
                    padding: 9,
                    backgroundColor:
                      isInstallament == 2 ? "#5CB85C" : "transparent",
                    borderTopLeftRadius: 15,
                    borderBottomLeftRadius: 15,
                  }}
                  onPress={() => {
                    setisInstallament(2);
                    UpdateCartForInstallemnt("taksitli");
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: isInstallament == 1 ? "#333" : "#ffffff",
                    }}
                  >
                    Taksitli Fiyat İle Ödeme
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {isInstallament == 2 && (
              <View style={[styles.acceptCart, { gap: 20 }]}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#7E7E7E", fontWeight: "500" }}>
                    Peşinat:
                  </Text>
                  <Text style={{ color: "#7E7E7E", fontWeight: "500" }}>
                    {addDotEveryThreeDigits(Cart?.pesinat)} ₺
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#7E7E7E", fontWeight: "500" }}>
                    Taksit Sayısı:
                  </Text>
                  <Text style={{ color: "#7E7E7E", fontWeight: "500" }}>
                    {Cart?.taksitSayisi}{" "}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#7E7E7E", fontWeight: "500" }}>
                    Aylık Ödenecek Tutar:
                  </Text>
                  <Text style={{ color: "#7E7E7E", fontWeight: "500" }}>
                    {addDotEveryThreeDigits(Cart.aylik)} ₺
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#7E7E7E", fontWeight: "500" }}>
                    Toplam Fiyat:
                  </Text>
                  <Text style={{ color: "#7E7E7E", fontWeight: "500" }}>
                    {addDotEveryThreeDigits(Cart.installmentPrice)} ₺
                  </Text>
                </View>
                {payDec.map((item, _index) => (
                  <View
                    key={_index}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#7E7E7E", fontWeight: "600" }}>
                      {_index + 1}. Ara Ödeme
                    </Text>
                    <View>
                      <Text
                        style={{
                          color: "#7E7E7E",
                          fontWeight: "600",
                          textAlign: "right",
                        }}
                      >
                        {addDotEveryThreeDigits(item[`pay_dec_price${_index}`])}{" "}
                        ₺
                      </Text>
                      <Text style={{ color: "#7E7E7E", fontWeight: "600" }}>
                        {formatDate(item[`pay_dec_date${_index}`])}
                      </Text>
                    </View>
                  </View>
                  // <View style={{flexDirection:'column',gap:5,alignItems:'center'}}>

                  //       <Text style={{color:'#7E7E7E',fontWeight:'600'}}>{payDec.length}. Ara Ödeme</Text>
                  //       <Text style={{color:'#7E7E7E',fontWeight:'600'}}>{addDotEveryThreeDigits(item[`pay_dec_price${_index}`])} ₺</Text>
                  //       <Text style={{color:'#7E7E7E',fontWeight:'600'}}>{formatDate(item[`pay_dec_date${_index}`])}</Text>
                  // </View>
                ))}
              </View>
            )}

            {type?.type == "project" ? (
              <View style={[styles.acceptCart, { borderRadius: 3 }]}>
                <View
                  style={{
                    flexDirection: "row",
                    borderBottomWidth: 0.5,
                    borderBottomColor: "grey",
                    gap: 10,
                    paddingBottom: 5,
                    alignItems: "center",
                  }}
                >
                  <IconIdCard name="star-o" size={15} />
                  <Text>Sepet Özeti</Text>
                </View>
                <View style={{ gap: 20 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>İlan Fiyatı:</Text>

                    <Text>
                      {formatAmount(
                        isInstallament == 2
                          ? Cart?.installmentPrice
                          : Cart?.amount
                      )}{" "}
                      ₺
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>Toplam Fiyat:</Text>
                    <Text>
                      {formatAmount(
                        isInstallament == 2
                          ? Cart.installmentPrice
                          : Cart.amount
                      )}{" "}
                      ₺
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>%{offerControl?.project?.deposit_rate} Kapora:</Text>
                    <Text>
                      {" "}
                      {isInstallament == 2
                        ? formatAmount(
                            (Cart?.installmentPrice *
                              offerControl?.project?.deposit_rate) /
                              100
                          )
                        : formatAmount(
                            (Cart?.amount *
                              offerControl?.project?.deposit_rate) /
                              100
                          )}{" "}
                      ₺
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={[styles.acceptCart, { borderRadius: 3 }]}>
                <View
                  style={{
                    flexDirection: "row",
                    borderBottomWidth: 0.5,
                    borderBottomColor: "grey",
                    gap: 10,
                    paddingBottom: 5,
                    alignItems: "center",
                  }}
                >
                  <IconIdCard name="star-o" size={15} />
                  <Text>Sepet Özeti</Text>
                </View>
                <View style={{ gap: 20 }}>
                  {type?.hasCounter == true ? (
                    <>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text>İlan Fiyatı:</Text>
                        <Text>{addDotEveryThreeDigits(Cart.price)} ₺</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ color: "red" }}>
                          Emlak Kulüp İndirim Oranı:
                        </Text>
                        <Text style={{ color: "red" }}>
                          {Cart.discount_rate}%
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{}}>Toplam Fiyatı:</Text>
                        <Text style={{}}>
                          {addDotEveryThreeDigits(DiscountPrice)} ₺
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{}}>%2 Kapora:</Text>
                        <Text style={{}}>
                          {addDotEveryThreeDigits(KaporaForDiscountPrice)} ₺
                        </Text>
                      </View>
                    </>
                  ) : (
                    <>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text>İlan Fiyatı:</Text>
                        <Text>{addDotEveryThreeDigits(Cart?.price)} ₺</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text>Toplam Fiyatı:</Text>
                        <Text>{addDotEveryThreeDigits(Cart?.price)} ₺</Text>
                      </View>
                      {saleType == "kiralik" ? (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text>Bir Kira Kapora:</Text>
                          <Text>
                            {addDotEveryThreeDigits(Math.round(Cart?.price))} ₺
                          </Text>
                        </View>
                      ) : (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text>%2 Kapora:</Text>
                          <Text>
                            {addDotEveryThreeDigits(
                              Math.round((Cart?.price * 2) / 100)
                            )}{" "}
                            ₺
                          </Text>
                        </View>
                      )}
                    </>
                  )}

              
                </View>
              </View>
            )}

            <View style={styles.acceptCart}>
              <View
                style={{
                  width: "100%",
                  padding: 5,
                  flexDirection: "row",
                }}
              >
                <View style={{ flex: 1.5 / 2 }}>
                  <TextInput
                    placeholder="İndirim Kuponu Uygula"
                    style={{
                      borderWidth: 1,
                      borderColor: "#ebebeb",
                      padding: 11,
                      fontSize: 13,
                      borderTopLeftRadius: 10,
                      borderBottomLeftRadius: 10,
                    }}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    flex: 0.5 / 2,
                    backgroundColor: "#ea2b2e",
                    justifyContent: "center",
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                  }}
                >
                  <Text style={{ textAlign: "center", color: "white" }}>
                    Uygula
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{ flex: 0.8 / 2, paddingLeft: 15, padding: 4, gap: 4 }}
                >
                  <Text style={{ color: "grey", fontSize: 12 }}>Toplam</Text>
                  <Text style={{ fontWeight: "500" }}>
                    {isInstallament == 1 &&
                      type?.type == "project" &&
                      formatAmount(
                        (Cart?.amount * offerControl?.project?.deposit_rate) /
                          100
                      )}
                    {isInstallament == 2 &&
                      type?.type == "project" &&
                      addDotEveryThreeDigits(
                        (Cart?.installmentPrice *
                          offerControl?.project?.deposit_rate) /
                          100
                      )}
                    {type?.type == "housing" &&
                      saleType == "kiralik" &&
                      addDotEveryThreeDigits(Cart.price)}
                    {type?.type == "housing" &&
                      saleType == "satilik" &&
                      addDotEveryThreeDigits(
                        Math.round((Cart?.price * 2) / 100)
                      )}
                    ₺
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("PaymentScreen", {
                      slug: type?.type,
                      id: Cart.id,
                      roomOrder: Cart.housing,
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
          </ScrollView>
        </TouchableWithoutFeedback>
      ) : (
        <View style={{height:'90%',alignItems:'center',justifyContent:'center',gap:10}}>
             <View style={[styles.card, {alignItems:'center',justifyContent:'center'}]}>
            <Icon2 name="basket-plus" size={50} color={'#EA2A28'}/>
        </View>
        <View>
        <Text style={{color:'grey',fontSize:16,fontWeight:'600'}}>Sepetinizde ilan bulunmamaktadır</Text>
          <Text></Text>
        </View>
        <View style={{width:'100%',alignItems:'center'}}>
          <TouchableOpacity style={{backgroundColor:'#EA2A28',width:'90%',padding:8,borderRadius:5}} onPress={()=>{
             
              setLoading(true)
              setTimeout(() => {
                nav.navigate('HomePage')
                  setLoading(false)
              },700);
          }}>
            <Text style={{color:'#ffffff',fontWeight:'600',textAlign:'center'}}>Ana Sayfa'ya dön</Text>
          </TouchableOpacity>
        </View>
        </View>
      )}
    </SafeAreaView>
       }
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
    padding:15,
   
  borderRadius:50,

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
  }
});
