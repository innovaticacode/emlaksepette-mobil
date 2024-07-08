import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import { React, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Heart from "react-native-vector-icons/AntDesign";
import Bookmark from "react-native-vector-icons/FontAwesome";
import Info from "./Info";
import { Platform } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import axios from "axios";
import { getValueFor } from "./methods/user";
import * as SecureStore from "expo-secure-store";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { color } from "@rneui/base";

export default function RealtorPost({
  title,
  loading,
  price,
  image,
  location,
  m2,
  roomCount,
  floor,
  HouseId,
  GetId,
  discountRate,
  discount_amount,
  housing,
  bookmarkStatus,
  column1_name,
  column1_additional,
  column2_name,
  column2_additional,
  column3_name,
  column3_additional,
  column4_name,
  column4_additional,
  step2_slug,
  step1_slug,
}) {
  const navigation = useNavigation();
  const [heart, setHeart] = useState("hearto");
  const [bookmark, setbookmark] = useState("bookmark-o");
  const [user, setUser] = useState({});
  const [inFavorite, setInFavorite] = useState(false);
  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const changeHeart = () => {
    setHeart(heart === "hearto" ? "heart" : "hearto");
  };

  useEffect(() => {
    if (housing.is_housing_favorite == null) {
      setHeart("hearto");
      setInFavorite(false);
    } else {
      setHeart("heart");
      setInFavorite(true);
    }
  }, []);

  const [getPostId, setgetPostId] = useState(0);

  const CreateCollection = (id) => {
    setgetPostId(id);
    navigation.navigate("CreateCollections", { HouseID: id });
  };
  const discountedPrice = discountRate
    ? price - (price * discountRate) / 100
    : price - discount_amount;

  const formattedPrice = parseFloat(price)
    .toLocaleString("tr-TR", {
      style: "currency",
      currency: "TRY",
    })
    .replace(/,00$/, "");

  const formattedDiscountedPrice = discountedPrice
    ? discountedPrice !== price
      ? parseFloat(discountedPrice)
          .toLocaleString("tr-TR", {
            style: "currency",
            currency: "TRY",
          })
          .replace(/,00$/, "")
      : null
    : 0;

  const handlePress = () => {
   
    if (user.access_token) {
      if (user.cartItem !== null ) {
        setcartIsNull(true)
    }else{
      setAddCartShow(true)
    }
      
    }else{
      setalertForSign(true) 
    }
   
  
   
  };

  const housingData = housing && JSON.parse(housing.housing_type_data);
  const [showAlert, setShowAlert] = useState(false);

  const addFavorites = () => {
    if (user.access_token) {
      const config = {
        headers: { Authorization: `Bearer ${user.access_token}` },
      };
      axios
        .post(
          "https://mobil.emlaksepette.com/api/add_housing_to_favorites/" +
            HouseId,
          {},
          config
        )
        .then((res) => {
          changeHeart();
      
          if (res.data.status == "removed") {
            setInFavorite(false);
          } else {
            setInFavorite(true);
          }
        });
      setShowAlert(false);
    }else{
      setalertForFavorite(true)
    }

  };

  const [AddCartShow, setAddCartShow] = useState(false);
  
  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const updateUserData = async () => {
    try {
      const updateResponse = await axios.get(
        "https://mobil.emlaksepette.com/api/users/" + user?.id,
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
      setUser(updatedUser);
  
      // SecureStore ile güncellenmiş kullanıcı verilerini kaydetme
      await SecureStore.setItemAsync("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    }
  };
  const addToCard = async () => {
    const formData = new FormData();
    formData.append("id", HouseId);
    formData.append("isShare", null);
    formData.append("numbershare", null);
    formData.append("qt", 1);
    formData.append("type", "housing");
    formData.append("project", null);
    formData.append("clear_cart", "no");

    try {
      if (user?.access_token) {
        const response = await axios.post(
          "https://mobil.emlaksepette.com/api/institutional/add_to_cart",
          formData,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        updateUserData()
        setAddCartShow(false)
        navigation.navigate("Sepetim");
        console.log(user + 'Güncel Kullanıcı')
      }
    } catch (error) {
      console.error("post isteği olmadı", error);
    }
  };
const [alertForSign, setalertForSign] = useState(false)
const [alertForFavorite, setalertForFavorite] = useState(false)
const [cartIsNull, setcartIsNull] = useState(false)
  return (
    <AlertNotificationRoot>
      <View>
      <AwesomeAlert
              // contentContainerStyle={{
              //   transform: [{ scale: 1 }], // Uyarıyı animasyonsuz hale getirmek için
              //   opacity: 2, // Uyarıyı animasyonsuz hale getirmek için
              // }}
            show={cartIsNull}
            showProgress={false}
              titleStyle={{color:'#333',fontSize:13,fontWeight:'700',textAlign:'center',margin:5}}
              title={'Sepetinize sadece 1 Ürün Ekleyebilirsiniz '}
              messageStyle={{textAlign:'center'}}
              message={`Mevcut sepeti silmek istermisiniz`}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}

            cancelText="Hayır"
            confirmText="Evet"
            cancelButtonColor="#ce4d63"
            confirmButtonColor="#1d8027"
            onCancelPressed={() => {
              setcartIsNull(false)
            }}
            onConfirmPressed={() => {
             addToCard()
              setcartIsNull(false)
            }}
            confirmButtonTextStyle={{marginLeft:20,marginRight:20}}
            cancelButtonTextStyle={{marginLeft:20,marginRight:20}}
          />
      <AwesomeAlert
            
            show={alertForFavorite}
            showProgress={false}
              titleStyle={{color:'#333',fontSize:13,fontWeight:'700',textAlign:'center',margin:5}}
              title={'Giriş Yap'}
              messageStyle={{textAlign:'center'}}
              message={`Favorilerinize Konut Ekleyebilmek için Giriş Yapmanız Gerekir`}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}

            cancelText="Vazgeç"
            confirmText="Giriş Yap"
            cancelButtonColor="#ce4d63"
            confirmButtonColor="#1d8027"
            onCancelPressed={() => {
              setalertForFavorite(false)
            }}
            onConfirmPressed={() => {
              navigation.navigate('Login')
              setalertForFavorite(false)
            }}
            confirmButtonTextStyle={{marginLeft:20,marginRight:20}}
            cancelButtonTextStyle={{marginLeft:20,marginRight:20}}
          />
      <AwesomeAlert
            
            show={alertForSign}
            showProgress={false}
              titleStyle={{color:'#333',fontSize:13,fontWeight:'700',textAlign:'center',margin:5}}
            title={'Giriş Yap'}
            messageStyle={{textAlign:'center'}}
            message={`Sepetine Konut Ekleyebilmek için Giriş Yapmanız Gerekir`}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}

           
            confirmText="Giriş Yap"
            cancelText="Vazgeç"
            cancelButtonColor="#E54564"
            confirmButtonColor="#1d8027"
            onCancelPressed={() => {
              setalertForSign(false)
            }}
            onConfirmPressed={() => {
              navigation.navigate('Login')
              setalertForSign(false)
            }}
            confirmButtonTextStyle={{marginLeft:20,marginRight:20}}
            cancelButtonTextStyle={{marginLeft:20,marginRight:20}}
          />
     
          <AwesomeAlert
            
            show={AddCartShow}
            showProgress={false}
              titleStyle={{color:'#333',fontSize:13,fontWeight:'700',textAlign:'center',margin:5}}
            title={title}
            messageStyle={{textAlign:'center'}}
            message={`#2000${HouseId} No' lu Konutu Sepete Eklemek İstiyor Musunuz?`}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}

            cancelText="Hayır"
            confirmText="Evet"
            cancelButtonColor="#ce4d63"
            confirmButtonColor="#1d8027"
            onCancelPressed={() => {
              setAddCartShow(false);
            }}
            onConfirmPressed={() => {
              addToCard()
            }}
            confirmButtonTextStyle={{marginLeft:20,marginRight:20}}
            cancelButtonTextStyle={{marginLeft:20,marginRight:20}}
          />
   
        <View style={styles.container}>
          <View style={styles.İlan}>
            <TouchableOpacity
              style={{ width: "30%", height: 80 }}
              onPress={() =>
                navigation.navigate("Realtor details", { houseId: HouseId })
              }
            >
              <ImageBackground
                source={{ uri: image }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </TouchableOpacity>

            <View style={styles.container2}>
              <View style={styles.captionAndIcons}>
                <View style={styles.caption}>
                  <Text style={{ fontSize: 9, color: "black" }}>
                    İlan No: {2000000 + HouseId}
                  </Text>
                  <Text
                    style={{ fontSize: 10, fontWeight: 700 }}
                    numberOfLines={3}
                  >
                    {title}
                  </Text>
                </View>
                <View
                  style={{
                    ...styles.ıcons, // Diğer stil özelliklerini ekleyin
                    justifyContent:
                      bookmarkStatus && bookmarkStatus == true
                        ? "space-between"
                        : "flex-end", // Koşula göre justifyContent özelliğini belirleyin
                  }}
                >
                  {bookmarkStatus && bookmarkStatus == true && (
                    <TouchableOpacity
                      onPress={() => {
                        CreateCollection(HouseId);
                      }}
                    >
                      <View style={styles.ıconContainer}>
                        <Bookmark
                          name={bookmark}
                          size={13}
                          color={bookmark == "bookmark-o" ? "black" : "red"}
                        />
                      </View>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    onPress={() => {
                     
                      addFavorites()
                    }}
                  >
                    <View style={styles.ıconContainer}>
                      <Heart
                        name={heart}
                        size={13}
                        color={heart == "hearto" ? "black" : "red"}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.PriceAndButtons}>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  {formattedDiscountedPrice ? (
                    <>
                      <Text style={styles.discountedPriceText}>
                        {formattedPrice}₺
                      </Text>
                      <Text style={styles.priceText}>
                        {formattedDiscountedPrice}₺
                      </Text>
                    </>
                  ) : (
                    <Text style={styles.priceText}>{formattedPrice}₺</Text>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.addBasket}
                  onPress={handlePress}
                >
                  {step2_slug &&
                  step2_slug == "gunluk-kiralik" &&
                  step1_slug == "mustakil-tatil" ? (
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "500",
                        fontSize: 12,
                      }}
                    >
                      Rezervasyon
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "500",
                        fontSize: 12,
                      }}
                    >
                      Sepete Ekle
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#E8E8E8",
              height: 30,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              {column1_name && (
                <Info
                  text={`${column1_name} ${
                    column1_additional ? column1_additional : ""
                  }`}
                />
              )}
              {column2_name && (
                <Info
                  text={`${column2_name} ${
                    column2_additional ? column2_additional : ""
                  }`}
                />
              )}
              {column3_name && (
                <Info
                  text={`${column3_name} ${
                    column3_additional ? column3_additional : ".Kat"
                  }`}
                />
              )}
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.InformationText}>{location}</Text>
            </View>
          </View>
          {/* {discountRate ? (
            <View
              style={{
                backgroundColor: "#E8E8E8",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.discountText}>
                #{2000000 + HouseId} Numaralı İlan İçin: Satın alma işlemi
                gerçekleştirdiğinizde, Emlak Kulüp üyesi tarafından paylaşılan
                link aracılığıyla %{discountRate}indirim uygulanacaktır.
              </Text>
            </View>
          ) : null} */}
        </View>
      </View>
    </AlertNotificationRoot>
  );
}
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    borderBottomWidth: 1,
    borderBlockColor: "#E8E8E8",
  },
  İlan: {
    padding: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container2: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingLeft: 5,

    paddingRight: 5,

    paddingTop: 5,
  },
  captionAndIcons: {
    display: "flex",
    flexDirection: "row",
    width: "100%",

    justifyContent: "space-between",
  },
  PriceAndButtons: {
    marginTop: "auto", // Push to the bottom
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  caption: {
    width: "70%",
  },
  ıcons: {
    display: "flex",
    flexDirection: "row",
    width: "25%",
    bottom: 5,
    top: 2,
  },
  btns: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  addBasket: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5,
    width: "50%",
    alignItems: "center",
    backgroundColor: "#264ABB",
  },

  ıconContainer: {
    width: 28,
    height: 28,
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
  },
  InformationText: {
    fontSize: width > 400 ? 12 : 10,
    right: width > 400 ? 10 : 5,
  },
  priceText: {
    color: "#264ABB",
    fontWeight: "700",
    fontSize: 12,
  },
  discountedPriceText: {
    textDecorationLine: "line-through",
    color: "#FF0000",
    fontWeight: "700",
    fontSize: 10,
  },
  discountText: {
    color: "red",
    fontSize: 11,
    padding: 5,
  },
  text:{
    textAlign:'center'
  }
});
