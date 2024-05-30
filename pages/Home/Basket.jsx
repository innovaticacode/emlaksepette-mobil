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
import { useRoute, useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import Search from "./Search";
import Categories from "../../components/Categories";
import Modal from "react-native-modal";
import { getValueFor } from "../../components/methods/user";
import axios from "axios";
import { addDotEveryThreeDigits } from "../../components/methods/merhod";

export default function Basket() {
  const route = useRoute();

  const navigation = useNavigation();

  const renderRightActions = () => (
    <TouchableOpacity style={styles.deleteButton} onPress={() => {}}>
      <Text style={styles.deleteButtonText}>Sil</Text>
      <TrashIcon name="trash" size={23} color={"white"} />
    </TouchableOpacity>
  );
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
  const [offerControl, setofferControl] = useState({})
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);

  const fetchData = async () => {
    try {
      if (user.access_token) {
        const response = await axios.get(
          "https://test.emlaksepette.com/api/institutional/my-cart",
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        setCart(response?.data?.cart?.item);
        settype(response?.data?.cart);
        setsaleType(response?.data?.saleType);
        setofferControl(response?.data)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);



  const [isInstallament, setisInstallament] = useState(0);

  let DiscountRate = Cart.discount_rate;
  let TotalPrice = Cart.price;
  let DiscountPrice = Cart.price - (Cart.amount * Cart.discount_rate) / 100;
  let KaporaForDiscountPrice = (DiscountPrice * 2) / 100;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
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
        <Header onPress={toggleDrawer} />
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
              flex: 0.7 / 2,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}
          >
            <SafeAreaView style={{ zIndex: 1 }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("HomePage");
                    setIsDrawerOpen(false);
                  }}
                >
                  <Categories
                    category="Ana Sayfa"
                    bordernone="none"
                    ıconName="home"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Hesabım");
                    setIsDrawerOpen(false);
                  }}
                >
                  <Categories
                    category="Hesabım"
                    bordernone="none"
                    ıconName="user"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("RealtorClubExplore");
                    setIsDrawerOpen(false);
                  }}
                >
                  <Categories
                    category="Emlak Kulüp"
                    bordernone="none"
                    showImage={true}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Categories
                    category="İlan Ver"
                    bordernone="none"
                    ıconName="plus"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Categories
                    category="Sat Kirala"
                    bordernone="none"
                    ıconName="search-plus"
                  />
                </TouchableOpacity>
              </ScrollView>
            </SafeAreaView>
            <ImageBackground
              source={require("./MenuBg.jpg")}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                opacity: 0.2,
              }}
              resizeMode="cover"
              borderBottomLeftRadius={30}
              borderBottomRightRadius={30}
            />
          </View>
          <View style={{ backgroundColor: "white", flex: 1.3 / 2 }}>
            <Search onpres={toggleDrawer} />
          </View>
        </View>
      </Modal>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          style={styles.container}
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
        >
          <GestureHandlerRootView style={{ backgroundColor: "white" }}>
            <Swipeable renderRightActions={renderRightActions}>
              <BasketItem
                name={Cart.title}
                ımage={Cart.image}
                price={Cart.amount}
                roomOrder={Cart.housing}
                type={type.type}
              />
            </Swipeable>
          </GestureHandlerRootView>

          {/* <View>
            <View style={[styles.HouseInfo, { padding: 15 }]}>
              <View style={{ flexDirection: "row", gap: 5 }}>
                <Text style={{ fontSize: 12 }}>İlan Adı:</Text>
                {
                  type.type=='housing'?
                  <Text>{Cart.title}</Text>
                  :
                  <Text style={{ fontSize: 12 }}>
                    {Cart.title} Projesinde {Cart.housing} No'lu Konut
                  </Text>
                }
              
              </View>
              <View style={{ flexDirection: "row", gap: 5 }}>
                <Text style={{ fontSize: 12 }}>İlan Konumu:</Text>
                <Text style={{ fontSize: 12 }}>{Cart.city} / Hendek</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 5 }}>
                <Text style={{ fontSize: 12 }}>Mağaza:</Text>
                <Text style={{ fontSize: 12 }}>Maliyetine Ev</Text>
              </View>
            </View>
          </View> */}
      
          {type.type == "project" && (
            <View
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderColor: "#E4E4E4",
                justifyContent: "center",
                marginTop:10
              }}
            >
              <TouchableOpacity
                style={{
                  width: "50%",
                  padding: 9,
                  backgroundColor:
                    isInstallament == 0 ? "#5CB85C" : "transparent",
                  borderTopRightRadius: 15,
                  borderBottomRightRadius: 15,
                }}
                onPress={() => {
                  setisInstallament(0);
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: isInstallament == 1 ? "#333" : "#ffffff",
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
                    isInstallament == 1 ? "#5CB85C" : "transparent",
                  borderTopLeftRadius: 15,
                  borderBottomLeftRadius: 15,
                }}
                onPress={() => {
                  setisInstallament(1);
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: isInstallament == 0 ? "#333" : "#ffffff",
                  }}
                >
                  Taksitli Fiyat İle Ödeme
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {
            isInstallament==1 &&
            <View style={[styles.acceptCart,{gap:20}]}>
                 <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{color:'#7E7E7E',fontWeight:'500'}}>Peşinat:</Text>
                  <Text style={{color:'#7E7E7E',fontWeight:'500'}}>{addDotEveryThreeDigits(Cart.pesinat)} ₺</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{color:'#7E7E7E',fontWeight:'500'}}>Taksit Sayısı:</Text>
                  <Text style={{color:'#7E7E7E',fontWeight:'500'}}>{Cart.taksitSayisi} </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{color:'#7E7E7E',fontWeight:'500'}}>Aylık Ödenecek Tutar:</Text>
                  <Text style={{color:'#7E7E7E',fontWeight:'500'}}>{addDotEveryThreeDigits(Cart.aylik)} ₺</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{color:'#7E7E7E',fontWeight:'500'}}>Toplam Fiyat:</Text>
                  <Text style={{color:'#7E7E7E',fontWeight:'500'}}>{addDotEveryThreeDigits(Cart.installmentPrice)} ₺</Text>
                </View>
            
            </View>
          }
            


          {type.type == "project" ? (
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
                  <Text>{addDotEveryThreeDigits( isInstallament==1? Cart.installmentPrice:Cart.defaultPrice)} ₺</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>Toplam Fiyat:</Text>
                  <Text>{addDotEveryThreeDigits(isInstallament==1 ? Cart.installmentPrice:Cart.price)} ₺</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>%{offerControl?.project?.deposit_rate} Kapora:</Text>
                  <Text> {isInstallament==1?  addDotEveryThreeDigits(Cart.installmentPrice * offerControl?.project?.deposit_rate / 100 ) :addDotEveryThreeDigits(Cart.price * offerControl?.project?.deposit_rate / 100 )} ₺</Text>
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
                   
                
                {type.hasCounter == true ? (
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
                    <Text style={{ color: "red" }}>{Cart.discount_rate}%</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{  }}>
                      Toplam Fiyatı:
                    </Text>
                    <Text style={{ }}>{ addDotEveryThreeDigits(DiscountPrice)} ₺</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{  }}>
                      %2 Kapora:
                    </Text>
                    <Text style={{ }}>{addDotEveryThreeDigits(KaporaForDiscountPrice)} ₺</Text>
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
                  <Text>{addDotEveryThreeDigits(Cart.price)} ₺</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>Toplam Fiyatı:</Text>
                  <Text>{addDotEveryThreeDigits(Cart.price)} ₺</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>%2 Kapora:</Text>
                  <Text>{addDotEveryThreeDigits(Cart.price *2 / 100 )} ₺</Text>
                </View>

               </>
                )}
            

                {/* 
                                    <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text>Toplam Fiyat:</Text>
                                        <Text>{addDotEveryThreeDigits(Cart.amount) } ₺</Text>
                                    </View>
                                      {
                                        saleType=='kiralik'?
                                        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text>Bir Kira Kapora</Text>
                                        <Text>{addDotEveryThreeDigits(Cart.amount) } ₺</Text>
                                    </View>:
                                          type.hasCounter==true? 
                                       <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
                                       <Text>%2 Kapora</Text>
                                       <Text>{addDotEveryThreeDigits(KaporaForDiscountPrice)} ₺</Text>
                                   </View>:  <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
                                       <Text>%2 Kapora</Text>
                                       <Text>{addDotEveryThreeDigits(Cart.amount * 2 /100)} ₺</Text>
                                   </View>
                                      }

                                      {
                                          type.hasCounter==true?
                                          <>
                                              <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
                                          <Text>Emlak Kulüp İndirimi</Text>
                                          <Text>%{Cart.discount_rate}</Text>
                                      </View>
                                              <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
                                          <Text>İndirimli Fiyat</Text>
                                          <Text>{DiscountPrice} ₺</Text>
                                      </View>
                                          </>
                                          :<></>
                                      
                                      }
                               */}
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
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
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
                  {addDotEveryThreeDigits((Cart.amount * 2) / 100)} TL
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
    </SafeAreaView>
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
});
