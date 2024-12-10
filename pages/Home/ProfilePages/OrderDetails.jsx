import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import React, { useState, useEffect } from "react";
import HTML from "react-native-render-html";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getValueFor } from "../../../components/methods/user";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native-paper";
import { style } from "../../../styles/OrderDetails.styles";
import { DepositStatusCard, WhiteOrRedButtons } from "../../../components";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { apiUrl } from "../../../components/methods/apiRequest";
import { formatedPrice } from "../../../utils";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

export default function OrderDetails({ item }) {
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
  const [loading, setLoading] = useState(true);
  const [parsedData, setparsedData] = useState("");
  const [Deals, setDeals] = useState("");
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");
  const [approveModal, setApproveModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [rejectText, setRejectText] = useState("");
  const [rejectFile, setRejectFile] = useState(null);

  useEffect(() => {
    console.log("Detail", Detail);
  }, [Detail]);

  const fetchData = async () => {
    try {
      console.log("OrderId", OrderId);
      if (user?.access_token) {
        const response = await axios.get(
          `${apiUrl}institutional/order_detail/${OrderId}`,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        setDetail(response?.data?.order);
        setRefund(response?.data?.order?.refund);
        setprojectDetail(response?.data.project);
        sethousingDetail(response?.data.housing);
        setOrderStatus(response?.data?.order_status);
        return setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
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

  const handleCheckIBAN = async () => {
    if (!user.iban) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Hata",
        description:
          "İade talebi oluşturmadan önce IBAN numaranızı eklemeniz gerekmektedir.",
        button: "Tamam",
      });
    }
  };

  const handleApprove = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}order/approve/${OrderId}`,
        {
          cart_order_id: OrderId,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      );
      if (response?.data?.success) {
        await fetchData();
        setApproveModal(false);
        setTimeout(() => {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Başarılı",
            textBody: response?.data?.message ?? "Sipariş onaylandı.",
            button: "Tamam",
          });
        }, 450);
      }
    } catch (error) {
      console.error("Error approving order:", error);
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Hata",
        description: "Sipariş onaylanırken bir hata oluştu.",
        button: "Tamam",
      });
    }
  };

  const handleReject = async () => {
    try {
      await handleCheckIBAN();
      const formData = new FormData();
      formData.append("cart_order_id", OrderId);
      formData.append("reject_reason", rejectText);

      if (
        rejectFile.type === "image" ||
        rejectFile.mimeType === "application/pdf"
      ) {
        formData.append("reject_document", {
          uri: rejectFile.uri,
          name:
            rejectFile.fileName ||
            (rejectFile.mimeType === "application/pdf"
              ? "document.pdf"
              : "document.jpg"),
          type:
            rejectFile.mimeType ||
            (rejectFile.mimeType === "application/pdf"
              ? "application/pdf"
              : "image/jpeg"),
        });
      }
      const response = await axios.post(
        `${apiUrl}order/unapprove/${OrderId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("response", response.data);
      if (response?.data?.success) {
        await fetchData();
        setRejectModal(false);
        setTimeout(() => {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Başarılı",
            textBody: response?.data?.message ?? "İade talebi oluşturuldu.",
            button: "Tamam",
          });
        }, 450);
      }
    } catch (error) {
      console.error("Error reject order:", error);
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Hata",
        textBody: "İptal talebi oluşturulurken bir hata oluştu.",
        button: "Tamam",
      });
    }
  };

  const pickImage = async () => {
    try {
      let permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          "İzin Gerekli",
          "Fotoğraf çekmek için kamera iznine ihtiyacımız var."
        );
        return;
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setRejectFile(result.assets[0]);
      }
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Hata",
        textBody: "Fotoğraf seçilirken bir hata oluştu.",
        button: "Tamam",
      });
      console.error("Error picking image:", error);
    }
  };
  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "İzin Gerekli",
          "Fotoğraf çekmek için kamera iznine ihtiyacımız var."
        );
        return;
      }

      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        console.log("result", result.assets[0]);
        setRejectFile(result.assets[0]);
      }
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Hata",
        textBody: "Fotoğraf çekilirken bir hata oluştu.",
        button: "Tamam",
      });
      console.error("Error taking photo:", error);
    }
  };

  const pickFileDocument = async () => {
    try {
      // PDF dosyası seçimi
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (!result?.canceled) {
        setRejectFile(result);
      }
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Hata",
        textBody: "Dosya seçilirken bir  hata oluştu.",
        button: "Tamam",
      });
      console.error("Dosya seçilirken hata oluştu:", error);
    }
  };

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

  const createdAt = new Date(Detail?.created_at).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const fetchDataDeal = async () => {
    const url = `${apiUrl}sayfa/mesafeli-guvenli-kapora-sozlesmesi`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      setDeals(data.content);
    } catch (error) {
      console.error("İstek hatası:", error);
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

  useEffect(() => {
    if (Detail.cart) {
      const cartObject = JSON.parse(Detail.cart);
      if (cartObject && cartObject.item && cartObject.item.image) {
        setparsedData(cartObject);
      } else {
        console.error("Cart nesnesi veya item.image bulunamadı");
      }
    }
  }, [Detail]);

  return (
    <View style={{ backgroundColor: "#FFF", flex: 1 }}>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#333" />
        </View>
      ) : (
        <View style={style.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
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
                      Sipariş No:
                    </Text>
                    <Text style={style.boldText}>{OrderId}</Text>
                  </>
                </View>

                <View style={style.orderStateInfo}>
                  <>
                    <Text style={[style.boldText, { color: "#606060" }]}>
                      Sipariş Tarihi:
                    </Text>
                    <Text style={style.boldText}>{formattedDate}</Text>
                  </>
                </View>
                <View style={style.orderStateInfo}>
                  <>
                    <Text style={[style.boldText, { color: "#606060" }]}>
                      Kapora Tutarı:
                    </Text>
                    <Text style={style.boldText}>
                      {formatedPrice(Detail?.amount)}
                    </Text>
                  </>
                </View>
              </>
            </View>
            <>
              <View style={style.orderDetail}>
                <View style={{ gap: 10 }}>
                  {parsedData.type == "project" ? (
                    <Text style={style.boldText}>{`İlan No: #${
                      1000000 + id + "-" + parsedData?.item?.housing
                    }`}</Text>
                  ) : (
                    <Text style={style.boldText}>{`İlan No: #${
                      2000000 + id
                    }`}</Text>
                  )}
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
                  {(parsedData?.type === "housing" || projectDetail) && (
                    <WhiteOrRedButtons
                      text={"İlanı Değerlendir"}
                      bgColor={"#EA2C2E"}
                      onPress={() => {
                        if (parsedData?.type === "housing") {
                          navigation.navigate("AddComment", { HouseID: id });
                        } else if (projectDetail) {
                          navigation.navigate("AddCommentForProject", {
                            projectId: id,
                          });
                        }
                      }}
                    />
                  )}
                </View>
                <View style={{ paddingVertical: 8, flexDirection: "row" }}>
                  <View style={{ width: "28%" }}>
                    <Image
                      source={{ uri: parsedData?.item?.image }}
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 4,
                      }}
                      resizeMode="cover"
                    />
                  </View>

                  <View style={style.info}>
                    <View style={{}}>
                      <Text style={style.boldText}>
                        {parsedData.type !== "project"
                          ? parsedData?.item?.title
                          : `${parsedData?.item?.title} ${parsedData?.item?.housing}  No'lu Konut`}
                      </Text>
                    </View>
                    <Text style={style.boldText}>
                      {formatedPrice(parsedData.item.price)}
                    </Text>
                  </View>
                </View>
                <View style={style.seperator} />
                {Detail.status == 1 && (
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
                )}
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
                    Ünvan:
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
                      {` ${Detail?.payment_method}`}
                    </Text>
                  </Text>

                  <Text style={style.boldText}>
                    İlan Fiyatı:
                    <Text style={[style.boldText, { color: "#606060" }]}>
                      {formatedPrice(parsedData?.item?.amount)}
                    </Text>
                  </Text>

                  <Text style={style.boldText}>
                    İndirim Miktarı:
                    <Text style={[style.boldText, { color: "#606060" }]}>
                      {`${parsedData?.item?.discount_amount}₺`}
                    </Text>
                  </Text>
                </View>
                <>
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <View style={style.amount}>
                      <Text style={style.boldText}>Kapora Oranı</Text>
                      <Text style={[style.boldText, { color: "#606060" }]}>
                        {`${projectDetail?.deposit_rate ?? 2}%`}
                      </Text>
                    </View>
                    <View style={style.amount}>
                      <Text style={style.boldText}>Kapora Tutarı</Text>
                      <Text style={[style.boldText, { color: "#606060" }]}>
                        {formatedPrice(Detail?.amount)}
                      </Text>
                    </View>
                  </View>
                </>
                <TouchableOpacity onPress={() => setModalVisible2(true)}>
                  <Text
                    style={[
                      style.boldText,
                      {
                        color: "#EA2B2E",
                        textDecorationLine: "underline",
                        textAlign: "center",
                        padding: 10,
                        marginTop: 5,
                      },
                    ]}
                  >
                    Mesafeli Güvenli Kapora Sözleşmesi
                  </Text>
                </TouchableOpacity>
              </View>
            </>
            {/*-------------------------------------- ORDERSTATUS START----------------- */}
            {orderStatus == "Admin Onayı Bekliyor" && (
              <DepositStatusCard
                titleColor={"#2F7DF7"}
                iconBgColor={"#2F7DF7"}
                icon={"wallet"}
                cardColor={"#DCE9FE"}
                title={"Ödeme Onay Aşamasındadır"}
                content={
                  "Ödeme şu anda onay aşamasındadır. Sürecin güncel durumunu ve gelişmeleri buradan takip edebilirsiniz."
                }
                date={formattedDate}
              />
            )}

            {orderStatus == "Alıcının Onayı Bekleniyor" && (
              <DepositStatusCard
                titleColor={"#0E713D"}
                iconBgColor={"#0E713D"}
                icon={"shield-check-outline"}
                cardColor={"#BADECB"}
                title={"Kaporanız Emlak Sepette ile Güvende"}
                content={
                  "Sipariş onayınız bekleniyor. 7 gün içerisinde sistem tarafından otomatik olarak onaylanacaktır."
                }
                date={formattedDate}
                showButton={true}
                approveModal={approveModal}
                setApproveModal={setApproveModal}
                rejectModal={rejectModal}
                setRejectModal={setRejectModal}
              />
            )}

            {orderStatus == "Alıcı Onayladı" && (
              <DepositStatusCard
                titleColor={"#0FA958"}
                iconBgColor={"#0FA958"}
                icon={"check-bold"}
                cardColor={"#E0F2E3"}
                title={"Siparişiniz Başarıyla Tamamlandı"}
                content={
                  "Kapora ödemesi satıcıya aktarılacaktır. Satıcı ve ilan hakkında değerlendirme yapabilirsiniz."
                }
                date={formattedDate}
              />
            )}

            {orderStatus == "Admin İade Etti" && (
              <DepositStatusCard
                titleColor={"#606060"}
                iconBgColor={"#A1A1A1"}
                icon={"trash-can-outline"}
                cardColor={"#E2E2E2"}
                title={
                  "Sipariş iptali admin tarafından reddedildi. Siparişiniz iptal edilmedi."
                }
                content={
                  "Kapora ödemesi satıcıya aktarılacaktır. Satıcı ve ilan hakkında değerlendirme yapabilirsiniz."
                }
                date={formattedDate}
              />
            )}

            {orderStatus == "Adminden İade Onayı Bekleniyor" && (
              <DepositStatusCard
                titleColor={"#0E713D"}
                iconBgColor={"#0E713D"}
                icon={"shield-check-outline"}
                cardColor={"#BADECB"}
                title={"Kaporanız Emlak Sepette ile Güvende"}
                content={"İptal talebiniz iletildi."}
                date={formattedDate}
              />
            )}
            {orderStatus == "Admin İadeyi Reddetti" && (
              <DepositStatusCard
                titleColor={"#EA2B2E"}
                iconBgColor={"#EA2B2E"}
                icon={"close"}
                cardColor={"#FFF3F3"}
                title={
                  "Sipariş iptali admin tarafından reddedildi. Siparişiniz iptal edilmedi."
                }
                content={
                  "Kapora ödemesi satıcıya aktarılacaktır. Satıcı ve ilan hakkında değerlendirme yapabilirsiniz."
                }
                date={formattedDate}
              />
            )}
            {orderStatus == "Admin Ödemeyi Reddetti" && (
              <DepositStatusCard
                titleColor={"#EA2B2E"}
                iconBgColor={"#EA2B2E"}
                icon={"close"}
                cardColor={"#FFF3F3"}
                title={"Ödeme Reddedildi"}
                content={
                  "Bir yanlışlık olduğunu düşünüyorsanız lütfen emlaksepette ekibi ile iletişime geçin."
                }
                date={formattedDate}
              />
            )}
            {/*-------------------------------------- ORDERSTATUS END----------------- */}

            {/* {Detail?.can_refund == 1 && (
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
            )} */}

            {/* {(user?.id === Detail?.user?.id && Detail.status == 1 && !refund) ||
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
              )} */}
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
          </ScrollView>
          <Modal
            isVisible={approveModal}
            onBackdropPress={() => setApproveModal(false)}
            backdropColor="rgba(0, 0, 0, 0.5)"
            style={style.modalApprove}
          >
            <>
              <View style={style.approveContainer}>
                <View style={style.headApprove}>
                  <View />
                  <Text style={style.approveTitle}>Siparişi Onayla</Text>
                  <TouchableOpacity onPress={() => setApproveModal(false)}>
                    <Icon3 name="close" size={24} color="black" />
                  </TouchableOpacity>
                </View>

                <View>
                  <Text style={style.approveContent}>
                    Siparişini satıcıyla anlaştığın şekilde sorunsuz teslim
                    aldığını ve ödemeni satıcıya aktarılmasına onaylıyor musun?
                  </Text>

                  <Text style={style.approveInfo}>
                    İş Tamamen bitmeden kesinlikle siparişe onay vermemelisin.
                  </Text>
                </View>

                <TouchableOpacity
                  style={style.approveBtn}
                  onPress={handleApprove}
                >
                  <Text style={{ color: "#FFF", fontWeight: "500" }}>
                    Siparişi Onayla
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          </Modal>

          <>
            <Modal
              isVisible={rejectModal}
              onBackdropPress={() => setRejectModal(false)}
              backdropColor="rgba(0, 0, 0, 0.5)"
              style={style.modalApprove}
              avoidKeyboard={true}
            >
              <View style={style.rejectModalBody}>
                {/* Başlık ve Kapatma İkonu */}
                <View style={style.headApprove}>
                  <Text style={style.approveTitle}>İptal nedeniniz nedir?</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setRejectModal(false);
                      setRejectText("");
                      setRejectFile(null);
                    }}
                  >
                    <Icon3 name="close" size={24} color="black" />
                  </TouchableOpacity>
                </View>

                {/* TextInput ve Ek İçerik */}
                <View style={{ gap: 12 }}>
                  <TextInput
                    multiline
                    numberOfLines={4}
                    style={style.rejectInput}
                    placeholder="Lütfen iptal nedeninizi yazınız..."
                    textAlignVertical="top"
                    maxLength={255}
                    value={rejectText}
                    onChangeText={(text) => setRejectText(text)}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      onPress={pickFileDocument}
                      style={style.rejectFile}
                    >
                      <Text style={style.fileTxt}>Dosya Ekle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={pickImage}
                      style={style.rejectFile}
                    >
                      <Text style={style.fileTxt}>Fotoğraf Ekle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={takePhoto}
                      style={style.rejectFile}
                    >
                      <Text style={style.fileTxt}>Fotoğraf Çek</Text>
                    </TouchableOpacity>
                  </View>
                  <Text>
                    Talebiniz iptal birimine iletilecektir. 48 saat içerisinde
                    incelenip geri dönüş sağlanacaktır.
                  </Text>
                </View>

                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    style={[
                      style.rejectBtnModal,
                      { opacity: rejectText.length < 10 ? 0.5 : 1 },
                    ]}
                    onPress={handleReject}
                    disabled={rejectText.length < 10}
                  >
                    <Text style={{ color: "#000", fontWeight: "500" }}>
                      İptal Talebi Oluştur
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </>
        </View>
      )}
    </View>
  );
}
