import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import React, { useState, useEffect } from "react";
import HTML from "react-native-render-html";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Icon2 from "react-native-vector-icons/Fontisto";

import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon4 from "react-native-vector-icons/FontAwesome5";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getValueFor } from "../../../components/methods/user";
import axios from "axios";
import { addDotEveryThreeDigits } from "../../../components/methods/merhod";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native-paper";
import { style } from "../../styles/OrderDetails.styles";
import { WhiteOrRedButtons } from "../../../components";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import SecurityBlue from "../../../assets/securityBlue.png";
import SecurityGreen from "../../../assets/securityGreen.png";

export default function OrderDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { OrderId, id } = route.params;

  const [user, setUser] = useState({});

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);
  const [Detail, setDetail] = useState({});
  const [refund, setRefund] = useState({});
  const [projectDetail, setprojectDetail] = useState({});
  const [housingDetail, sethousingDetail] = useState({});
  const [housing, setHousing] = useState({});
  const [loading, setLoading] = useState(true);
  const [parsedData, setparsedData] = useState("");
  const [Deals, setDeals] = useState("");
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.access_token) {
          const response = await axios.get(
            `https://private.emlaksepette.com/api/institutional/order_detail/${OrderId}`,
            {
              headers: {
                Authorization: `Bearer ${user?.access_token}`,
              },
            }
          );
          setDetail(response?.data?.order);
          setHousing(response?.data?.housing);
          setRefund(response?.data?.order?.refund);
          setprojectDetail(response.data.project);
          sethousingDetail(response.data.housing);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user, OrderId]);

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
  let kapora_tutari = parseFloat(Detail?.amount) / 100;

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

  const fetchDataDeal = async () => {
    const url = `https://private.emlaksepette.com/api/sayfa/mesafeli-guvenli-kapora-sozlesmesi`;
    try {
      const response = await fetch(url);
      // const data = await fetchFromURL(url);
      const data = await response.json();
      console.log(data);
      setDeals(data.content);
      // Burada isteğin başarılı olduğunda yapılacak işlemleri gerçekleştirebilirsiniz.
    } catch (error) {
      console.error("İstek hatası:", error);
      // Burada isteğin başarısız olduğunda yapılacak işlemleri gerçekleştirebilirsiniz.
    }
  };
  useEffect(() => {
    fetchDataDeal();
  }, []);

  const handlePress = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const calculatePaymentStatusColor = () => {
    const success = "#00B84B";
    const pending = "#FC9B00";
    const failed = "#FF0000";

    if (Detail.status == 0) {
      return pending;
    }
    if (Detail.status == 1) {
      return success;
    }
    if (Detail.status == 2) {
      return failed;
    }
    return "#000000";
  };

  return (
    <View style={{ backgroundColor: "#FFF", flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator />
          </View>
        ) : (
          <View style={style.container}>
            <View style={style.orderStateBody}>
              <View style={style.statusBody}>
                <>
                  <Text style={style.boldText}>Sipariş Durumu</Text>
                  <Text
                    style={[
                      style.paymentStatus,
                      { color: calculatePaymentStatusColor() },
                    ]}
                  >
                    {!refund
                      ? Detail?.status == 0
                        ? "Ödeme Onayı Bekliyor"
                        : Detail?.status == 1
                        ? "Ödeme Onaylandı"
                        : Detail?.status == 2
                        ? "Ödeme İptal Edildi"
                        : "Bilinmeyen Durum"
                      : refund?.status == 0
                      ? "İade Talebiniz İnceleniyor"
                      : refund?.status == 1
                      ? "İade Talebiniz Onaylandı"
                      : refund?.status == 2
                      ? "İade Talebiniz Reddedildi"
                      : "Bilinmeyen Durum"}
                  </Text>
                </>
              </View>
              <>
                <View style={style.orderStateInfo}>
                  <>
                    <Text style={[style.boldText, { color: "#606060" }]}>
                      Sipariş No
                    </Text>
                    <Text style={style.boldText}>{OrderId}</Text>
                  </>
                </View>

                <View style={style.orderStateInfo}>
                  <>
                    <Text style={[style.boldText, { color: "#606060" }]}>
                      Sipariş Tarihi
                    </Text>
                    <Text style={style.boldText}>{formattedDate}</Text>
                  </>
                </View>
                <View style={style.orderStateInfo}>
                  <>
                    <Text style={[style.boldText, { color: "#606060" }]}>
                      Kapora Tutarı
                    </Text>
                    <Text style={style.boldText}>{Detail?.amount} ₺</Text>
                  </>
                </View>
              </>
            </View>
            <>
              <View style={style.orderDetail}>
                <View style={{ gap: 10 }}>
                  <Text style={style.boldText}>{`İlan No: #${
                    1000000 + id + "-" + parsedData?.item?.housing
                  }`}</Text>
                  <Text
                    style={style.boldText}
                  >{`Satıcı: ${Detail?.store?.name}`}</Text>
                </View>
                <View style={style.btnArea}>
                  <WhiteOrRedButtons
                    text={"Mağazayı Gör"}
                    icon={true}
                    onPress={() =>
                      navigation.navigate("Profile", { id: Detail?.store?.id })
                    }
                  />

                  {parsedData?.type == "housing" && (
                    <WhiteOrRedButtons
                      text={"İlanı Değerlendir"}
                      bgColor={"#EA2C2E"}
                      onPress={() =>
                        navigation.navigate("AddComment", { HouseID: id })
                      }
                    />
                  )}
                </View>
                <View style={{ paddingVertical: 8, flexDirection: "row" }}>
                  <Image
                    source={{ uri: parsedData?.item?.image }}
                    width={100}
                    height={100}
                    borderRadius={4}
                  />
                  <View style={style.info}>
                    <View>
                      <Text style={style.boldText}>
                        {parsedData?.item?.title}
                      </Text>
                      {parsedData.type == "project" && (
                        <Text style={style.boldText}>
                          {parsedData?.item?.housing} No'lu Konut
                        </Text>
                      )}
                    </View>
                    <Text style={style.boldText}>{Detail?.amount} ₺</Text>
                  </View>
                </View>
                <View style={style.seperator} />
                <>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={style.invoiceBody}
                    onPress={() =>
                      navigation.navigate("Invoice", { OrderId: Detail.id })
                    }
                  >
                    <FontAwesome5
                      name="file-invoice"
                      size={18}
                      color="#EA2B2E"
                    />
                    <Text style={[style.normalText, { color: "#EA2B2E" }]}>
                      Faturayı Görüntüle
                    </Text>
                  </TouchableOpacity>
                </>
              </View>
            </>
            <>
              <View style={style.customerBody}>
                <Text style={style.largeBoldtext}>Alıcı Bilgileri</Text>
                <View style={{ gap: 20, paddingTop: 10 }}>
                  <Text style={style.boldText}>
                    İsim Soyisim:
                    <Text style={[style.boldText, { color: "#606060" }]}>
                      {Detail?.user?.name}
                    </Text>
                  </Text>

                  <Text style={style.boldText}>
                    E-Posta:
                    <Text style={[style.boldText, { color: "#606060" }]}>
                      {Detail?.user?.email}
                    </Text>
                  </Text>
                  <Text style={style.boldText}>
                    Telefon No:
                    <Text style={[style.boldText, { color: "#606060" }]}>
                      {Detail?.user?.mobile_phone}
                    </Text>
                  </Text>
                </View>
              </View>
            </>
            <>
              <View style={style.customerBody}>
                <Text style={style.largeBoldtext}>Satıcı Bilgileri</Text>
                <View style={{ gap: 20, paddingTop: 10 }}>
                  <Text style={style.boldText}>
                    İsim Soyisim:
                    <Text style={[style.boldText, { color: "#606060" }]}>
                      {Detail?.store?.name}
                    </Text>
                  </Text>

                  <Text style={style.boldText}>
                    E-Posta:
                    <Text style={[style.boldText, { color: "#606060" }]}>
                      {Detail?.store?.email}
                    </Text>
                  </Text>
                  <Text style={style.boldText}>
                    Telefon No:
                    <Text style={[style.boldText, { color: "#606060" }]}>
                      {Detail?.store?.mobile_phone}
                    </Text>
                  </Text>
                </View>
              </View>
            </>

            <>
              <View style={style.orderSummaryBody}>
                <Text style={style.largeBoldtext}>Ödeme Bilgileri</Text>
                <View style={{ gap: 20, paddingTop: 10 }}>
                  <Text style={style.boldText}>
                    Ödeme Yöntemi:
                    <Text style={[style.boldText, { color: "#606060" }]}>
                      {(Detail.payment_result === null && "EFT/Havale") ||
                        (Detail.payment_result === !null && "Kredi Kartı")}
                    </Text>
                  </Text>

                  <Text style={style.boldText}>
                    İlan Fiyatı:
                    <Text style={[style.boldText, { color: "#606060" }]}>
                      {`${tam_tutar_formatli}₺`}
                    </Text>
                  </Text>
                  <Text style={style.boldText}>
                    İndirimli Fiyatı:
                    <Text style={[style.boldText, { color: "#606060" }]}>
                      {`${tam_tutar_formatli}₺`}
                    </Text>
                  </Text>
                </View>
                <>
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <View style={style.amount}>
                      <Text style={style.boldText}>Kapora Oranı</Text>
                      <Text style={[style.boldText, { color: "#606060" }]}>
                        Kapora Oranı
                      </Text>
                    </View>
                    <View style={style.amount}>
                      <Text style={style.boldText}>Kapora Tutarı</Text>
                      <Text style={[style.boldText, { color: "#606060" }]}>
                        Kapora Oranı
                      </Text>
                    </View>
                  </View>
                </>
              </View>
            </>
            <>
              <TouchableOpacity onPress={() => setModalVisible2(true)}>
                <Text
                  style={[
                    style.boldText,
                    {
                      color: "#EA2B2E",
                      textDecorationLine: "underline",
                      textAlign: "center",
                    },
                  ]}
                >
                  Mesafeli Güvenli Kapora Sözleşmesi
                </Text>
              </TouchableOpacity>
            </>

            <>
              <View style={style.blueCardBody}>
                <Image
                  source={SecurityBlue}
                  style={style.blueCardImg}
                  resizeMode="cover"
                />
                <View style={style.textArea}>
                  <Text
                    style={[
                      style.largeBoldtext,
                      { textAlign: "center", color: "#2F7DF7" },
                    ]}
                  >
                    Ödemenizi Aldık. Teşekkür Ederiz!
                  </Text>
                  <Text style={[style.boldText, { textAlign: "center" }]}>
                    Ödeme şu an da havuz hesabında. Satıcı ücretini sipariş
                    tamamlandığında alacak.
                  </Text>
                  <Text
                    style={[
                      style.boldText,
                      { textAlign: "center", color: "#606060", fontSize: 12 },
                    ]}
                  >
                    11 Eylül 2024, 11:07
                  </Text>
                </View>
              </View>
            </>

            <>
              <View style={style.greenCardBody}>
                <Image
                  source={SecurityGreen}
                  style={style.blueCardImg}
                  resizeMode="cover"
                />
                <View style={style.textArea}>
                  <Text
                    style={[
                      style.largeBoldtext,
                      { textAlign: "center", color: "#0E713D" },
                    ]}
                  >
                    Kaporanız Emlak Sepette İle Güvende!{" "}
                  </Text>
                  <Text style={[style.boldText, { textAlign: "center" }]}>
                    Sipariş onayınız bekleniyor.
                  </Text>
                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <TouchableOpacity style={style.okeyBtn}>
                      <Text
                        style={[
                          style.boldText,
                          { textAlign: "center", color: "#FFF" },
                        ]}
                      >
                        Onayla
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.rejectBtn}>
                      <Text
                        style={[
                          style.boldText,
                          { textAlign: "center", color: "#FFF" },
                        ]}
                      >
                        İptal Et
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={[
                      style.boldText,
                      { textAlign: "center", color: "#606060", fontSize: 12 },
                    ]}
                  >
                    11 Eylül 2024, 11:07
                  </Text>
                </View>
              </View>
            </>

            {user?.id == Detail?.user?.id && Detail.status == 1 && !refund && (
              <View>
                <WhiteOrRedButtons
                  bgColor={"#EA2B2E"}
                  text={"İade Talebi Oluştur"}
                  onPress={() =>
                    navigation.navigate("ExtraditionRequest", {
                      OrderId: OrderId,
                    })
                  }
                />
              </View>
            )}

            {(user?.id === Detail?.user?.id && Detail.status == 1 && !refund) ||
              (user?.id === Detail?.user?.id && refund?.status == "2" && (
                <View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "red",
                      padding: 13,
                      borderRadius: 5,
                    }}
                    onPress={() =>
                      navigation.navigate("ExtraditionRequest", {
                        OrderId: OrderId,
                      })
                    }
                  >
                    <Text
                      style={{
                        color: "#ffffff",
                        textAlign: "center",
                        fontWeight: "500",
                      }}
                    >
                      Tekrar İade Talebi Oluştur
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            {user?.id === Detail?.user?.id &&
              Detail.status == 2 &&
              refund &&
              refund.status == 1 && (
                <View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "green",
                      padding: 13,
                      borderRadius: 5,
                    }}
                    onPress={() => {}}
                  >
                    <Text
                      style={{
                        color: "#ffffff",
                        textAlign: "center",
                        fontWeight: "500",
                      }}
                      onPress={handlePress}
                    >
                      İade Talebiniz Onaylandı
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={closeModal}
            >
              <View style={style.modalContainer}>
                <View style={style.modalView}>
                  <TouchableOpacity
                    onPress={closeModal}
                    style={style.closeButton}
                  >
                    <Icon3 name="close-circle" size={30} color="black" />
                  </TouchableOpacity>
                  <Text style={style.modalText}>
                    İade talebiniz inceleniyor
                  </Text>
                  {refund && (
                    <View style={style.modalContent}>
                      <Text style={style.modalText}>İsim: {refund.name}</Text>
                      <Text style={style.modalText}>
                        Telefon: {refund.phone}
                      </Text>
                      <Text style={style.modalText}>Email: {refund.email}</Text>
                      <Text style={style.modalText}>
                        Banka: {refund.return_bank}
                      </Text>
                      <Text style={style.modalText}>
                        IBAN: {refund.return_iban}
                      </Text>
                      <Text style={style.modalText}>
                        Notlar: {refund.ekNotlar}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </Modal>
            {/* {user?.id === Detail?.user?.id && refund && refund.status == 0 && (
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#FFBF00",
                  padding: 13,
                  borderRadius: 5,
                }}
                onPress={handlePress}
              >
                <Text
                  style={{
                    color: "#333",
                    textAlign: "center",
                    fontWeight: "500",
                  }}
                >
                  İade Talebiniz İnceleniyor
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
          )} */}

            <Modal
              isVisible={modalVisible2}
              onBackdropPress={() => setModalVisible2(false)}
              backdropColor="rgba(0, 0, 0, 0.5)"
              style={{
                justifyContent: "center",
                alignItems: "center",
                margin: 0,
              }}
            >
              <SafeAreaView
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  padding: 20,
                  width: "90%",
                  maxHeight: "80%",
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    zIndex: 1,
                  }}
                >
                  <TouchableOpacity onPress={() => setModalVisible2(false)}>
                    <Icon3 name="close-circle" size={31} color={"red"} />
                  </TouchableOpacity>
                </View>
                <ScrollView>
                  {Deals ? (
                    <HTML
                      source={{ html: Deals }}
                      contentWidth={Dimensions.get("window").width * 0.8}
                    />
                  ) : (
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        height: 200,
                      }}
                    >
                      <Text>Yükleniyor...</Text>
                    </View>
                  )}
                </ScrollView>
              </SafeAreaView>
            </Modal>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
