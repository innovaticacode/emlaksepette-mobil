import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./RealtorCardHome.styles";
import Icon from "react-native-vector-icons/FontAwesome6";
import { addDotEveryThreeDigits } from "../../methods/merhod";
import { useNavigation } from "@react-navigation/native";
import { getValueFor } from "../../methods/user";
import AwesomeAlert from "react-native-awesome-alerts";
import Heart from "react-native-vector-icons/AntDesign";
import axios from "axios";
import Bookmark from "react-native-vector-icons/FontAwesome";
import { apiUrl } from "../../methods/apiRequest";
export default function RealtorCardHome({
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
  const [AddCartShow, setAddCartShow] = useState(false);
  const [inFavorite, setInFavorite] = useState(false);
  const [alertForFavorite, setalertForFavorite] = useState(false);
  const [cartIsNull, setcartIsNull] = useState(false);
  const [alertForSign, setalertForSign] = useState(false);
  const [bookmark, setbookmark] = useState("bookmark-o");
  const [showAlert, setShowAlert] = useState(false);
  const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);
  const CreateCollection = (id) => {
    setgetPostId(id);
    navigation.navigate("CreateCollections", { HouseID: id });
  };
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
          `${apiUrl}institutional/add_to_cart_api`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setAddCartShow(false);
        navigation.navigate("Sepetim");
      }
    } catch (error) {
      console.error("post isteği olmadı", error);
    }
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      activeOpacity={0.7}
      onPress={() => {
        navigation.navigate("Realtor details", { houseId: HouseId });
      }}
    >
      <View style={{ gap: 8 }}>
        <View style={styles.ımageContainer}>
          <ImageBackground
            source={{ uri: image }}
            style={styles.ımage}
            borderRadius={6}
          />
          <View style={styles.IconContainer}>
            {bookmarkStatus &&
              bookmarkStatus == true &&
              openSharing == "Evet" &&
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
                      size={15}
                      color={bookmark == "bookmark-o" ? "black" : "red"}
                    />
                  </View>
                </TouchableOpacity>
              )}
            {(!sold || sold > 1) && (
              <TouchableOpacity
                style={styles.ıconContainer}
                activeOpacity={0.8}
                onPress={() => {
                  addFavorites();
                }}
              >
                <View>
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
            )}
          </View>
        </View>
        <View style={[styles.ımageContainer, { height: "auto" }]}>
          <Text
            style={{ fontSize: 14, fontWeight: "600", color: "#0C0C0C" }}
            numberOfLines={2}
          >
            {title}
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <Icon name="location-dot" size={15} color={"#606060"} />
          <Text style={{ fontSize: 12, color: "#606060", fontWeight: "500" }}>
            {location}
          </Text>
        </View>
      </View>
      <View style={{ gap: 4 }}>
        {housing.step2_slug == "gunluk-kiralik" ? (
          <Text style={{ fontSize: 15, color: "#EA2C2E", fontWeight: "700" }}>
            {price}₺ /{" "}
            <Text style={{ fontSize: 13, color: "#D32729" }}>Gecelik</Text>
          </Text>
        ) : (
          <Text style={{ fontSize: 15, color: "#EA2C2E", fontWeight: "700" }}>
            {addDotEveryThreeDigits(price)}₺
          </Text>
        )}
        <View></View>
        {!sold || sold > 1 ? (
          housing?.user?.id == user.id && user.access_token ? (
            <TouchableOpacity
              style={[styles.addCardBtn, { backgroundColor: "#008001" }]}
              onPress={() => {
                navigation.navigate("EditPending");
              }}
            >
              <Text style={styles.butonText}>İlanı Düzenle</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.addCardBtn}
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
                <Text style={styles.butonText}>Rezervasyon Yap</Text>
              ) : (
                <Text style={styles.butonText}>Sepete Ekle</Text>
              )}
            </TouchableOpacity>
          )
        ) : sold == 1 ? (
          <View style={[styles.addCardBtn, { backgroundColor: "#000000" }]}>
            <Text style={styles.butonText}>Satıldı</Text>
          </View>
        ) : (
          <View style={[styles.addCardBtn, { backgroundColor: "#373737" }]}>
            <Text style={styles.butonText}>Rezerve Edildi</Text>
          </View>
        )}
      </View>
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
    </TouchableOpacity>
  );
}
