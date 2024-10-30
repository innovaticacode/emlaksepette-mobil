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
import Icon from "react-native-vector-icons/FontAwesome6";
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
} from "react-native-alert-notification";
import { color } from "@rneui/base";
import { apiUrl } from "./methods/apiRequest";

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
  sold,
  openSharing,
  isFavorite,
}) {
  const navigation = useNavigation();
  const [heart, setHeart] = useState("hearto");
  const [bookmark, setbookmark] = useState("bookmark-o");
  const [user, setUser] = useState({});
  const [inFavorite, setInFavorite] = useState(false);
  const [AddCartShow, setAddCartShow] = useState(false);
  const [getPostId, setgetPostId] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

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
      if (user.cartItem !== null) {
        setcartIsNull(true);
      } else {
        setAddCartShow(true);
      }
    } else {
      setalertForSign(true);
    }
  };

  const housingData = housing && JSON.parse(housing.housing_type_data);

  useEffect(() => {
    if (isFavorite === 1) {
      setHeart("heart");
    } else {
      setHeart("hearto");
    }
  }, []);

  const addFavorites = async () => {
    if (user.access_token) {
      // UI'da hemen favori olarak göster
      setHeart("heart"); // Geçici olarak kalp dolu yap
      setInFavorite(true);
      const config = {
        headers: { Authorization: `Bearer ${user.access_token}` },
      };
      try {
        const res = await axios.post(
          `${apiUrl}add_housing_to_favorites/${HouseId}`,
          {},
          config
        );
        // İstek başarılıysa durumu güncelle
        if (res.data.status === "removed") {
          setHeart("hearto"); // Eğer favorilerden çıkarıldıysa kalbi boş yap
          setInFavorite(false);
        }
        setShowAlert(false); // İşlem başarılıysa alert kapat
      } catch (error) {
        console.error("Favorilere ekleme hatası:", error);
        // Hata durumunda geçici durumu geri al
        setHeart("hearto");
        setInFavorite(false);
      }
    } else {
      setalertForFavorite(true);
    }
  };

  const updateUserData = async () => {
    try {
      const updateResponse = await axios.get(
        `${apiUrl}users/` + user?.id,
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
          `${apiUrl}add_to_cart`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        updateUserData();
        setAddCartShow(false);
        navigation.navigate("Sepetim");
        console.log(user + "Güncel Kullanıcı");
      }
    } catch (error) {
      console.error("post isteği olmadı", error);
    }
  };
  const [alertForSign, setalertForSign] = useState(false);
  const [alertForFavorite, setalertForFavorite] = useState(false);
  const [cartIsNull, setcartIsNull] = useState(false);
  return (
    <AlertNotificationRoot>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Realtor details", { houseId: HouseId })
        }
      >
        <AwesomeAlert
          // contentContainerStyle={{
          //   transform: [{ scale: 1 }], // Uyarıyı animasyonsuz hale getirmek için
          //   opacity: 2, // Uyarıyı animasyonsuz hale getirmek için
          // }}
          show={cartIsNull}
          showProgress={false}
          titleStyle={{
            color: "#333",
            fontSize: 13,
            fontWeight: "700",
            textAlign: "center",
            margin: 5,
          }}
          title={"Sepetinize sadece 1 Ürün Ekleyebilirsiniz "}
          messageStyle={{ textAlign: "center" }}
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
            setcartIsNull(false);
          }}
          onConfirmPressed={() => {
            addToCard();
            setcartIsNull(false);
          }}
          confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
          cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
        />
        <AwesomeAlert
          show={alertForFavorite}
          showProgress={false}
          titleStyle={{
            color: "#333",
            fontSize: 13,
            fontWeight: "700",
            textAlign: "center",
            margin: 5,
          }}
          title={"Giriş Yap"}
          messageStyle={{ textAlign: "center" }}
          message={`Favorilerinize konut ekleyebilmek için giriş yapmanız gerekmektedir.`}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Vazgeç"
          confirmText="Giriş Yap"
          cancelButtonColor="#ce4d63"
          confirmButtonColor="#1d8027"
          onCancelPressed={() => {
            setalertForFavorite(false);
          }}
          onConfirmPressed={() => {
            setalertForFavorite(false);
            setTimeout(() => {
              navigation.navigate("Login");
            }, 400);
          }}
          confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
          cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
        />
        <AwesomeAlert
          show={alertForSign}
          showProgress={false}
          titleStyle={{
            color: "#333",
            fontSize: 13,
            fontWeight: "700",
            textAlign: "center",
            margin: 5,
          }}
          title={"Giriş Yap"}
          messageStyle={{ textAlign: "center" }}
          message={`Sepetine konut ekleyebilmek için giriş yapmanız gerekmektedir.`}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          confirmText="Giriş Yap"
          cancelText="Vazgeç"
          cancelButtonColor="#E54564"
          confirmButtonColor="#1d8027"
          onCancelPressed={() => {
            setalertForSign(false);
          }}
          onConfirmPressed={() => {
            setalertForSign(false);
            setTimeout(() => {
              navigation.navigate("Login");
            }, 400);
          }}
          confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
          cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
        />

        <AwesomeAlert
          show={AddCartShow}
          showProgress={false}
          titleStyle={{
            color: "#333",
            fontSize: 13,
            fontWeight: "700",
            textAlign: "center",
            margin: 5,
          }}
          title={title}
          messageStyle={{ textAlign: "center" }}
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
            addToCard();
          }}
          confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
          cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
        />

        <View style={styles.container}>
          <View style={styles.İlan}>
            <View
              style={{ width: "30%", height: 80 }}
              onPress={() =>
                navigation.navigate("Realtor details", { houseId: HouseId })
              }
            >
              {openSharing === "Evet" && (
                <View
                  style={{
                    backgroundColor: "#EA2C2E",
                    position: "absolute",
                    zIndex: 1,
                    padding: 5,
                    bottom: 3,
                    left: 3,
                    width: "30%",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                >
                  <Icon name="handshake-simple" color={"#fff"} size={13} />
                </View>
              )}

              <ImageBackground
                source={{ uri: image }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </View>

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
                {/* 
                <View
                  style={{
                    ...styles.ıcons, // Diğer stil özelliklerini ekleyin
                    justifyContent:
                      bookmarkStatus && bookmarkStatus == true
                        ? "space-between"
                        : "flex-end", // Koşula göre justifyContent özelliğini belirleyin
                  }}
                >
                  {bookmarkStatus &&
                    bookmarkStatus == true &&
                    openSharing === "Evet" &&
                    (user.role == "Bireysel Hesap" ||
                      (user.role == "Kurumsal Hesap" &&
                        user.corporate_type == "Emlak Ofisi")) && (
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
                    activeOpacity={0.8}
                    onPress={() => {
                      addFavorites();
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
                */}
                {
                  !sold &&
                  <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    addFavorites();
                  }}
                >
                  <View style={styles.ıconContainer}>
                    <Heart
                      name={heart}
                      size={13}
                      color={
                        heart == "hearto"
                          ? "black"
                          : "red" || isFavorite === 1
                          ? "red"
                          : "black"
                      }
                    />
                  </View>
                </TouchableOpacity>
                }
              
              </View>

              <View style={styles.PriceAndButtons}>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  {formattedDiscountedPrice ? (
                    <>
                      <Text style={styles.discountedPriceText}>
                        {formattedPrice}
                      </Text>
                      <Text style={styles.priceText}>
                        {formattedDiscountedPrice}₺
                      </Text>
                    </>
                  ) : housing.step2_slug == "gunluk-kiralik" ? (
                    <Text style={styles.priceText}>
                      {formattedPrice} ₺{" "}
                      <Text style={{ fontSize: 11, color: "#D32729" }}>
                        / Gecelik
                      </Text>{" "}
                    </Text>
                  ) : (
                    <Text style={styles.priceText}>{formattedPrice} </Text>
                  )}
                </View>
                {!sold ? (
                  housing?.user?.id == user.id && user.access_token ? (
                    <TouchableOpacity
                      style={[styles.addBasket, { backgroundColor: "#008001" }]}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "600",
                          fontSize: 10,
                        }}
                      >
                        İlanı Düzenle
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.addBasket}
                      onPress={() => {
                        // Metin kontrolü yapılıyor
                        if (
                          (housing?.step2_slug &&
                            housing?.step2_slug === "gunluk-kiralik") ||
                          housing?.step1_slug === "mustakil-tatil"
                        ) {
                          navigation.navigate("Realtor details", {
                            houseId: HouseId,
                          });
                        } else {
                          handlePress();
                        }
                      }}
                    >
                      {(housing?.step2_slug &&
                        housing?.step2_slug == "gunluk-kiralik") ||
                      housing?.step1_slug == "mustakil-tatil" ? (
                        <Text
                          style={{
                            color: "white",
                            fontWeight: "600",
                            fontSize: 9,
                          }}
                        >
                          Rezervasyon Yap
                        </Text>
                      ) : (
                        <Text
                          style={{
                            color: "white",
                            fontWeight: "600",
                            fontSize: 10,
                          }}
                        >
                          Sepete Ekle
                        </Text>
                      )}
                    </TouchableOpacity>
                  )
                ):sold==1 ?
                <View style={[styles.addBasket, {backgroundColor:'#EA2C2E'}]}>
                    <Text style={{color:'white',fontWeight:'600',fontSize:10}}>Satıldı</Text>
                </View> :
              <View style={[styles.addBasket, {backgroundColor:'#FFA500'}]}>
              <Text style={{color:'white',fontWeight:'600',fontSize:10}}>Rezerve Edildi</Text>
          </View>
              
              }
            

                {/*                
                <TouchableOpacity
                  style={styles.addBasket}
                  onPress={handlePress}
                >
                  {
                  
                  
                  housing?.step2_slug&&
                  housing?.step2_slug == "gunluk-kiralik" ||
                  housing?.step1_slug== "mustakil-tatil" ? (
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "600",
                        fontSize: 10,
                      }}
                    >
                      Rezervasyon Yap
                    </Text>
                  ) : (
                   
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "600",
                        fontSize: 10,
                      }}
                    >
                      Sepete Ekle
                     
                    </Text>
                  )}
                </TouchableOpacity> */}
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
                  text={
                    column1_name != null && column1_name && column1_name != ""
                      ? `${column1_name} ${
                          column1_additional ? column1_additional : ""
                        }`
                      : false
                  }
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
                    column3_additional ? column3_additional :""
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
      </TouchableOpacity>
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
    borderRadius: 5,
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
  text: {
    textAlign: "center",
  },
});
