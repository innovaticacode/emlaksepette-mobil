import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Icon2 from "react-native-vector-icons/Fontisto";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import Icon4 from "react-native-vector-icons/FontAwesome5";
import StarIcon from "react-native-vector-icons/FontAwesome";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getValueFor } from "../../../components/methods/user";
import axios from "axios";
import { addDotEveryThreeDigits } from "../../../components/methods/merhod";
export default function OrderDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { OrderId } = route.params;

  const [user, setUser] = useState({});

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const [Detail, setDetail] = useState({});
  const [projectDetail, setprojectDetail] = useState({});
  const [housingDetail, sethousingDetail] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.access_token) {
          const response = await axios.get(
            `https://test.emlaksepette.com/api/institutional/order_detail/453`,
            {
              headers: {
                Authorization: `Bearer ${user?.access_token}`,
              },
            }
          );
          setDetail(response?.data?.order);
          setprojectDetail(response.data.project);
          sethousingDetail(response.data.housing);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user, OrderId]);
  const [parsedData, setparsedData] = useState("");
  useEffect(() => {
    if (Detail?.cart && typeof Detail.cart === "string" && user.access_token) {
      try {
        const cartObject = JSON.parse(Detail.cart);
        if (cartObject && cartObject.item && cartObject.item.image) {
          setparsedData(cartObject);
        } else {
          console.error("Cart nesnesi veya item.image bulunamadı");
        }
      } catch (error) {
        console.error("JSON parse edilemedi:", error);
      }
    }
  }, [Detail]);

  const date = new Date(Detail.created_at);
  // Ay isimleri dizisi
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
  // Günü, ay ismini ve yılı al
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;

  let deposit_rate = 0.04;
  let discount_percent = 4;
  let saleType = "";
  let kapora_tutari =
    parseFloat(Detail?.amount?.replace(",", "").replace(".", "")) / 100;
  let urun_fiyati = parseFloat(parsedData?.item?.price);
  let tam_tutar;
  let tam_tutar_formatli;
  let urun_fiyati_formatli;
  let indirim_miktari;
  let indirim_yuzdesi;
  let indirim_yuzdesi_formatli;
  if (parsedData?.type === "housing") {
    const housing = parsedData?.item;
    saleType = housing?.step2_slug;
  } else {
    saleType = projectDetail?.step2_slug;
    deposit_rate = projectDetail?.deposit_rate / 100;
    discount_percent = projectDetail?.deposit_rate;
  }
  const kapora_orani = discount_percent / 100;
  tam_tutar = kapora_tutari / kapora_orani;
  tam_tutar_formatli = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(tam_tutar);
  urun_fiyati_formatli = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(urun_fiyati);
  indirim_miktari = tam_tutar - urun_fiyati;
  indirim_yuzdesi = (indirim_miktari / tam_tutar) * 100;
  indirim_yuzdesi_formatli = new Intl.NumberFormat("tr-TR", {
    style: "percent",
    maximumFractionDigits: 2,
  }).format(indirim_yuzdesi / 100);

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={style.container}>
        <View style={style.orderInfo}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "400", fontSize: 13 }}>İlan No: </Text>
            <Text style={{ fontSize: 13, color: "grey" }}>
              #1000{Detail.id}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "400", fontSize: 13 }}>
              Sipariş Tarihi:{" "}
            </Text>
            <Text style={{ fontSize: 13, color: "grey" }}>{formattedDate}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "400", fontSize: 13 }}>
              Sipariş Özeti:{" "}
            </Text>
            <Text style={{ fontSize: 13, color: "grey" }}>
              {Detail.status == 0 && (
                <Text style={{ fontSize: 13, color: "#BC3913" }}>
                  1 Onay Bekliyor
                </Text>
              )}
              {Detail.status == 1 && (
                <Text style={{ fontSize: 13, color: "#4B8F3C" }}>
                  1 Onaylandı
                </Text>
              )}
              {Detail.status == 2 && (
                <Text style={{ fontSize: 13, color: "#B81911" }}>
                  Reddedildi
                </Text>
              )}
            </Text>
            <Text style={{ fontSize: 13, color: "#333" }}> 1 Ürün</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "400", fontSize: 13 }}>
              Sipariş Detayı:{" "}
            </Text>
            {Detail.status == 0 && (
              <Text style={{ fontSize: 13, color: "#BC3913" }}>
                Onay Bekliyor
              </Text>
            )}
            {Detail.status == 1 && (
              <Text style={{ fontSize: 13, color: "#4B8F3C" }}>Onaylandı</Text>
            )}
            {Detail.status == 2 && (
              <Text style={{ fontSize: 13, color: "#B81911" }}>Reddedildi</Text>
            )}
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "400", fontSize: 13 }}>Toplam: </Text>
            <Text style={{ fontSize: 13, color: "green" }}>
              {Detail.amount} ₺
            </Text>
          </View>
        </View>
        <View style={style.orderDetail}>
          <View style={{ gap: 10 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "400", fontSize: 13 }}>
                Teslimat No:{" "}
              </Text>
              <Text style={{ fontSize: 13, color: "green" }}>{Detail.key}</Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Text style={{ fontWeight: "400", fontSize: 13 }}>Satıcı:</Text>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                onPress={() => {
                  navigation.navigate("Profile", { id: Detail.store.id });
                }}
              >
                <Text style={{ fontSize: 13, color: "green" }}>
                  {Detail?.store?.name}
                </Text>
                <Icon
                  name="arrow-right"
                  size={10}
                  color={"green"}
                  style={{ top: 1 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 20,
              borderBottomWidth: 1,
              borderBottomColor: "#ebebeb",
              paddingBottom: 7,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#EA2C2E",
                padding: 5,
                borderRadius: 2,
                flexDirection: "row",
                gap: 6,
                alignItems: "center",
              }}
            >
              <Icon3 name="store-edit-outline" size={20} color={"white"} />
              <Text style={{ color: "white", fontSize: 12 }}>
                İlanı Değerlendir
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: "#EA2C2E",
                padding: 5,
                borderRadius: 2,
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
              onPress={() => {
                navigation.navigate("Profile", { id: Detail.store.id });
              }}
            >
              <Icon2 name="shopping-store" color={"#EA2C2E"} />
              <Text style={{ color: "#EA2C2E", fontSize: 12 }}>
                Mağazayı Gör
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              paddingTop: 5,
            }}
          >
            {Detail.status == 0 && (
              <View
                style={{
                  backgroundColor: "#FFEFCA",
                  borderWidth: 1,
                  borderColor: "#FFCC85",
                  padding: 5,
                  borderRadius: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <Text
                  style={{
                    color: "#BC3913",
                    textAlign: "center",
                    fontSize: 12,
                  }}
                >
                  Onay Bekliyor
                </Text>
                <FeatherIcon name="clock" color={"#BC3913"} />
              </View>
            )}
            {Detail.status == 1 && (
              <View
                style={{
                  backgroundColor: "#D9F9D0",
                  borderWidth: 1,
                  borderColor: "#BEE8B4",
                  padding: 5,
                  borderRadius: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <Text
                  style={{
                    color: "#4B8F3C",
                    textAlign: "center",
                    fontSize: 12,
                  }}
                >
                  {" "}
                  Ödeme Onaylandı
                </Text>
                <FeatherIcon name="check" color={"#4B8F3C"} size={16} />
              </View>
            )}
            {Detail.status == 2 && (
              <View
                style={{
                  backgroundColor: "#FFE0DB",
                  borderWidth: 1,
                  borderColor: "#FABCB3",
                  paddingLeft: 6,
                  paddingRight: 6,
                  padding: 4,
                  borderRadius: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  overflow: "hidden",
                }}
              >
                <Text
                  style={{
                    color: "#B81911",
                    textAlign: "center",
                    fontSize: 11,
                  }}
                >
                  Ödeme reddedildi
                </Text>
                <StarIcon name="close" color={"#B81911"} />
              </View>
            )}
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 20,
              paddingLeft: 10,
              paddingRight: 10,
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ fontSize: 13 }}>İstanbul / Kartal / Cevizli</Text>
            </View>
            <View
              style={{ borderWidth: 1, padding: 8, borderColor: "#ebebeb" }}
            >
              <Text style={{ fontSize: 13, color: "#EA2C2E" }}>
                Taksitli Ödeme
              </Text>
            </View>
          </View>
          <View style={style.OrderPost}>
            <View style={style.Image}>
              <ImageBackground
                source={{ uri: parsedData?.item?.image }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </View>
            <View style={style.caption}>
              <Text style={{ fontWeight: "500" }}>
                {parsedData?.item?.title}
              </Text>
              {parsedData.type == "project" && (
                <Text style={{ fontWeight: "500" }}>
                  {parsedData?.item?.housing} No'lu Konut
                </Text>
              )}

              <View
                style={{
                  paddingTop: 5,
                  backgroundColor: "#DAFBD0",
                  width: "50%",
                  padding: 5,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#3E8330",
                    fontWeight: "bold",
                  }}
                >
                  {Detail?.amount}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ gap: 14 }}>
            <TouchableOpacity
              style={{
                paddingTop: 10,
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <Icon3 name="comment-question" size={21} color={"red"} />
              <Text>Canlı Destek</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Invoice")}
              style={{
                paddingTop: 10,
                flexDirection: "row",
                gap: 12,
                alignItems: "center",
              }}
            >
              <Icon4 name="file-invoice" size={20} color={"red"} />
              <Text>Faturayı Görüntüle</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[style.PersonalInfoArea]}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              color: "#333",
              fontWeight: "500",
            }}
          >
            Alıcı Bilgileri
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text>İsim Soyisim</Text>
            </View>
            <View>
              <Text>{Detail?.user?.name}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 5,
            }}
          >
            <View>
              <Text>E-Mail:</Text>
            </View>
            <View>
              <Text>{Detail?.user?.email}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 5,
            }}
          >
            <View>
              <Text>Telefon No:</Text>
            </View>
            <View>
              <Text>{Detail?.user?.mobile_phone}</Text>
            </View>
          </View>
        </View>
        <View style={[style.PersonalInfoArea]}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              color: "#333",
              fontWeight: "500",
            }}
          >
            Satıcı Bilgileri
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text>İsim Soyisim</Text>
            </View>
            <View>
              <Text>{Detail?.store?.name}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 5,
            }}
          >
            <View>
              <Text>E-Mail:</Text>
            </View>
            <View>
              <Text>{Detail?.store?.email}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 5,
            }}
          >
            <View>
              <Text>Telefon No:</Text>
            </View>
            <View>
              <Text>{Detail?.store?.mobile_phone}</Text>
            </View>
          </View>
        </View>
        <View style={style.paymentArea}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              color: "#333",
              fontWeight: "500",
            }}
          >
            Özet
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text>Ödeme Yöntemi</Text>
            </View>
            <View>
              {Detail.payment_result === null && <Text>EFT/Havale</Text>}
              {Detail.payment_result === !null && <Text>Kredi Kartı</Text>}
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 15,
            }}
          >
            <View>
              <Text>İlan Fiyatı</Text>
            </View>
            <View>
              <Text>{tam_tutar_formatli} ₺</Text>
            </View>
          </View>
          {tam_tutar !== urun_fiyati && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: 15,
              }}
            >
              <View>
                <Text>İndirimli Fiyatı</Text>
              </View>
              <View>
                <Text>{tam_tutar_formatli} ₺</Text>
              </View>
            </View>
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 5,
              borderBottomWidth: 1,
              paddingBottom: 7,
              borderBottomColor: "#ebebeb",
            }}
          >
            <View>
              <Text>Kapora Oranı:</Text>
            </View>
            <View>
              <Text> %{kapora_orani}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 5,
              borderBottomWidth: 1,
              paddingBottom: 7,
              borderBottomColor: "#ebebeb",
            }}
          >
            <View>
              <Text>Kapora Tutarı:</Text>
            </View>
            <View>
              <Text> {addDotEveryThreeDigits(kapora_tutari)} ₺</Text>
            </View>
          </View>
        </View>
        {user?.id == Detail?.user?.id && (
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: "#E54242",
                padding: 13,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  textAlign: "center",
                  fontWeight: "500",
                }}
              >
                İade Talebi Oluştur
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {user?.id !== Detail?.user?.id && (
          <View style={[style.PersonalInfoArea, { gap: 25 }]}>
            <Text style={{ fontSize: 16 }}>Sözleşme Ekle</Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#E54242",
                padding: 13,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  textAlign: "center",
                  fontWeight: "500",
                }}
              >
                Yükle
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={style.orderInfo}>
          <Text
            style={{
              textAlign: "center",
              textDecorationLine: "underline",
              fontWeight: "bold",
              color: "red",
            }}
          >
            Mesafeli Satış Sözleşmesi
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10,
    paddingLeft: 7,
    paddingRight: 7,
    gap: 11,
    paddingBottom: 20,
  },
  orderInfo: {
    padding: 10,
    width: "100%",
    backgroundColor: "#FFFF",
    borderWidth: 1,
    borderColor: "#ebebeb",
    gap: 10,
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
  orderDetail: {
    padding: 10,
    width: "100%",
    backgroundColor: "#FFFF",
    borderWidth: 1,
    borderColor: "#ebebeb",
    gap: 10,
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
  OrderPost: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#ebebeb",
    paddingTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ebebeb",
    paddingBottom: 5,
  },
  Image: {
    flex: 0.5 / 2,

    padding: 2,
    height: 90,
  },
  caption: {
    flex: 1.4 / 2,

    padding: 2,
    gap: 4,
  },
  paymentArea: {
    padding: 10,
    width: "100%",
    backgroundColor: "#FFFF",
    borderWidth: 1,
    borderColor: "#ebebeb",
    gap: 10,
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
  PersonalInfoArea: {
    padding: 10,
    width: "100%",
    backgroundColor: "#FFFF",
    borderWidth: 1,
    borderColor: "#ebebeb",
    gap: 10,
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
