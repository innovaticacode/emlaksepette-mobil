import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import IconIdCard from "react-native-vector-icons/FontAwesome";
import { CheckBox } from "@rneui/themed";
import CreditCardScreen from "./CreditCardScreen";
import EftPay from "./EftPay";
import Modal from "react-native-modal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as DocumentPicker from "expo-document-picker";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { apiRequestGet } from "../../components/methods/apiRequest";
import { useIsFocused, useRoute } from "@react-navigation/native";
import {
  format,
  parseISO,
  eachDayOfInterval,
  isValid,
  differenceInDays,
} from "date-fns";
import { da, he, tr } from "date-fns/locale";
import { ImageBackground } from "react-native";
import * as FileSystem from "expo-file-system";

import Icon from "react-native-vector-icons/FontAwesome";
import { ActivityIndicator } from "react-native-paper";
import CreditCartForReserve from "./ReservationPayment/CreditCartForReserve";
import EftForReserve from "./ReservationPayment/EftForReserve";
import HTMLView from "react-native-htmlview";

export default function PaymentScreenForReserve() {
  const [data, setData] = useState({});
  const route = useRoute();
  const { HouseID, totalNight } = route.params;
  const [loading, setloading] = useState(false);
  useEffect(() => {
    // Başlarken loading true yapılıyor
    setloading(true);

    apiRequestGet("housing/" + HouseID)
      .then((res) => {
        // Veri başarıyla alındı, setData ile veriyi kaydet
        setData(res.data);
        // İşlem tamamlandı, loading false yapılıyor
        setloading(false);
      })
      .catch((error) => {
        // Hata durumunda loading false yapılıyor
        console.error(error);
        setloading(false);
      });
  }, [HouseID]);
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 3000);
  }, []);

  const [checked, setChecked] = React.useState(false);
  const toggleCheckbox = () => setChecked(!checked);
  const [checked2, setChecked2] = React.useState(false);
  const toggleCheckbox2 = () => setChecked2(!checked2);
  const [tabs, settabs] = useState(0);

  {
    /** State Of Inputs **/
  }
  const [IdNumber, setIdNumber] = useState("");
  const [NameAndSurnam, setNameAndSurnam] = useState("");
  const [ePosta, setePosta] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [adress, setadress] = useState("");
  const [notes, setnotes] = useState("");
  const [referanceCode, setreferanceCode] = useState("");

  const [creditCartData, setCreditCartData] = useState({
    amount: 1000,
  });

  const fullınfo = () => {
    setIdNumber("53872475124");
    setNameAndSurnam("Abdurrahman İslamoğlu");
    setePosta("islamoglu.abd@gmail.com");
    setphoneNumber("5511083652");
    setadress("Güzelyalı");
    setnotes("Deneme notu");
  };

  const [paymentModal, setPaymentModal] = useState(false);
  const [paymentModalContent, setPaymentModalContent] = useState("");
  const completeCreditCardPay = () => {
    if (
      IdNumber &&
      NameAndSurnam &&
      ePosta &&
      phoneNumber &&
      adress &&
      notes &&
      checked &&
      checked2
    ) {
      axios.post(apiUrl + "pay", creditCartData).then((res) => {
        setPaymentModal(true);
        setPaymentModalContent(res.data);
      });
    } else {
      alert("tüm alanları doldur");
    }
  };
  {
    /** State Of Inputs **/
  }
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDocumentName, setSelectedDocumentName] = useState(null);
  const [pdfUri, setPdfUri] = useState(null);
  const [pdfBase64, setPdfBase64] = useState(null);
  const pickDocument = async () => {
    try {
      console.log("Belge seçme işlemi başladı.");
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      console.log("Belge seçme işlemi tamamlandı:", result);

      // Eğer result nesnesi varsa ve assets dizisi doluysa veya uri özelliği varsa belge seçilmiştir
      if (
        result &&
        result.assets &&
        result.assets.length > 0 &&
        result.assets[0].uri
      ) {
        const { uri, name } = result.assets[0];
        console.log("Belge seçildi:", uri);
        const fileUri = `${FileSystem.documentDirectory}${
          name || getFileNameFromUri(uri)
        }`;

        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        setPdfBase64(`data:application/pdf;base64,${base64}`);
        setPdfUri(fileUri);
        setSelectedDocumentName(name || getFileNameFromUri(uri));
      } else {
        console.log("Belge seçilmedi veya işlem iptal edildi.");
      }
    } catch (err) {
      console.log("Belge seçerken hata oluştu:", err);
      Alert.alert("Hata", "Belge seçerken bir hata oluştu.");
    }
  };

  const getFileNameFromUri = (uri) => {
    const uriComponents = uri.split("/");
    return uriComponents[uriComponents.length - 1];
  };
  const loadStateFromSecureStore = async (key) => {
    try {
      const value = await SecureStore.getItemAsync(key);
      if (value !== null) {
        console.log("Retrieved data for key", key, ":", value);
        // Veriyi istediğiniz şekilde kullanabilirsiniz
        return value;
      } else {
        console.log("No data found for key", key);
        return null;
      }
    } catch (error) {
      console.log("Error loading data for key", key, ":", error);
      return null;
    }
  };

  useEffect(() => {
    // Örneğin, kaydedilen kullanıcı adını almak için
    loadStateFromSecureStore("startDate");
    loadStateFromSecureStore("totalNight");
  }, []);

  const [username, setUsername] = useState("");
  const [endDate, setendDate] = useState("");
  const [chekedMoneySafe, setchekedMoneySafe] = useState(null);
  useEffect(() => {
    const getUsername = async () => {
      const savedUsername = await loadStateFromSecureStore("startDate");

      if (savedUsername !== null) {
        setUsername(savedUsername);
      }
      const endDate = await loadStateFromSecureStore("endDate");

      if (endDate !== null) {
        setendDate(endDate);
      }
      const chekedMoneySafe = await loadStateFromSecureStore("checked");

      if (chekedMoneySafe !== null) {
        setchekedMoneySafe(chekedMoneySafe);
      }
    };

    getUsername();
  }, [username, endDate, totalNight]);

  const today = new Date();
  const formattedDate = format(today, "dd MMMM yyyy", { locale: tr });
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(amount);
  };

  const totalCost =
    data && data?.housing && data?.housing?.housing_type_data && totalNight
      ? JSON.parse(data?.housing?.housing_type_data)?.daily_rent * totalNight
      : 0;
  const formattedTotalCost = formatCurrency(totalCost);
  const halfTotalCost = totalCost / 2;
  const formattedHalfTotalCost = formatCurrency(halfTotalCost);
  const totalPrice = formatCurrency(
    chekedMoneySafe === "Safe" ? halfTotalCost + 1000 : halfTotalCost
  );

  const isFocused = useIsFocused();
  useEffect(() => {
    Alert.alert(
      "Emin misiniz?",
      "Bilgileriniz Otomatik Doldurulsunmu?",
      [
        {
          text: "Hayır",
          style: "cancel",
        },
        {
          text: "Evet",
          onPress: fullınfo,
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  }, [isFocused]);

  return (
    <>
      {loading ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <ActivityIndicator size={"large"} color="#333" />
        </View>
      ) : (
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ gap: 20, paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View style={[styles.AdvertDetail, { flexDirection: "row" }]}>
              <View style={styles.image}>
                {data && data.housing && data.housing.housing_type_data && (
                  <ImageBackground
                    source={{
                      uri: `http://192.168.1.102:8000/housing_images/${
                        JSON.parse(data?.housing?.housing_type_data).image
                      }`,
                    }}
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
              </View>
              <View style={styles.Description}>
                <View style={{ gap: 2 }}>
                  <Text style={{ fontSize: 12 }}>
                    İlan No: 2000{data?.housing?.id}
                  </Text>
                  <View>
                    <Text style={{ fontSize: 13 }} numberOfLines={3}>
                      {data?.housing?.title}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {data?.housing?.step2_slug == "gunluk-kiralik" && (
                    <View
                      style={{ backgroundColor: "#EA2B2E", borderRadius: 5 }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: "white",
                          padding: 5,
                          fontWeight: "500",
                        }}
                      >
                        Günlük Kiralık Villa
                      </Text>
                    </View>
                  )}
                  {data?.housing?.step2_slug == "kiralik" && (
                    <Text
                      style={{
                        fontSize: 12,
                        color: "white",
                        padding: 5,
                        fontWeight: "500",
                      }}
                    >
                      Kiralık Daire
                    </Text>
                  )}
                  {data?.housing?.step2_slug == "satilik" && (
                    <View
                      style={{ backgroundColor: "#EA2B2E", borderRadius: 5 }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: "white",
                          padding: 5,
                          fontWeight: "500",
                        }}
                      >
                        Satılık Daire
                      </Text>
                    </View>
                  )}

                  <View>
                    <Text style={{ fontSize: 12 }}>
                      {data?.housing?.city?.title} /{" "}
                      {data?.housing?.county?.title}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <Modal
            isVisible={paymentModal}
            onBackdropPress={() => setPaymentModal(false)}
          >
            <View style={{ width: "100%", backgroundColor: "#fff" }}>
              <HTMLView value={paymentModalContent} />
            </View>
          </Modal>
          <View style={[styles.AdvertDetail, { borderRadius: 3 }]}>
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
              <IconIdCard name="id-card-o" size={15} />
              <Text>Satın alan Kişinin Bilgileri</Text>
            </View>
            <View style={{ gap: 15 }}>
              <View style={{ gap: 5 }}>
                <Text style={styles.label}>TC</Text>
                <TextInput
                  value={IdNumber}
                  onChangeText={(value) => setIdNumber(value)}
                  style={styles.Input}
                />
              </View>
              <View style={{ gap: 5 }}>
                <Text style={styles.label}>Ad Soyad</Text>
                <TextInput
                  style={styles.Input}
                  value={NameAndSurnam}
                  onChangeText={(value) => setNameAndSurnam(value)}
                />
              </View>
              <View style={{ gap: 5 }}>
                <Text style={styles.label}>E-posta</Text>
                <TextInput
                  style={styles.Input}
                  value={ePosta}
                  onChangeText={(value) => setePosta(value)}
                />
              </View>
              <View style={{ gap: 5 }}>
                <Text style={styles.label}>Telefon</Text>
                <TextInput
                  style={styles.Input}
                  value={phoneNumber}
                  onChangeText={(value) => setphoneNumber(value)}
                />
              </View>
              <View style={{ gap: 5 }}>
                <Text style={styles.label}>Adres</Text>
                <TextInput
                  style={styles.Input}
                  value={adress}
                  onChangeText={(value) => setadress(value)}
                />
              </View>
              <View style={{ gap: 5 }}>
                <Text style={styles.label}>Notlar</Text>
                <TextInput
                  style={styles.Input}
                  value={notes}
                  onChangeText={(value) => setnotes(value)}
                />
              </View>
              <View style={{ gap: 5 }}>
                <Text style={styles.label}>Referans Kodu (Opsiyonel)</Text>
                <TextInput
                  style={styles.Input}
                  value={referanceCode}
                  onChangeText={(value) => setreferanceCode(value)}
                />
              </View>
            </View>
            <View style={{ gap: 5 }}>
              <CheckBox
                checked={checked2}
                onPress={() => {
                  checked2 ? setModalVisible(false) : setModalVisible(true);
                  setChecked2(false);
                }}
                // Use ThemeProvider to make change for all checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="red"
                size={21}
                containerStyle={{
                  padding: 0,
                  margin: 0,
                  marginRight: 0,
                  marginLeft: 0,
                }}
                title={
                  <View style={{ padding: 5 }}>
                    <Text
                      style={{ textDecorationLine: "underline", fontSize: 12 }}
                    >
                      Mesafeli kapora emanet sözleşmesini
                    </Text>

                    <Text style={{ fontSize: 12 }}>okudum kabul ediyorum</Text>
                  </View>
                }
              />
              <CheckBox
                checked={checked}
                onPress={toggleCheckbox}
                // Use ThemeProvider to make change for all checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                containerStyle={{
                  padding: 0,
                  margin: 0,
                  marginRight: 0,
                  marginLeft: 0,
                }}
                size={21}
                checkedColor="red"
                title={
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 5,
                    }}
                  >
                    <Text numberOfLines={2} style={{ fontSize: 13 }}>
                      Sözleşme aslını imzalamak için 7 iş günü içerisinde
                      geleceğimi kabul ve beyan ediyorum
                    </Text>
                  </View>
                }
              />
            </View>
          </View>

          {data?.housing?.step2_slug == "gunluk-kiralik" ? (
            <>
              <View style={[styles.dateContainer, { gap: 10 }]}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "#ebebeb",
                    paddingBottom: 10,
                  }}
                >
                  <Icon name="calendar" size={15} color={"#333"} />
                  <Text style={{ color: "#333", fontWeight: "500" }}>
                    Rezervasyon Detayı
                  </Text>
                </View>
                <View style={{ gap: 20 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.DetailTitle}>İlan:</Text>
                    <View style={{ width: "50%", alignItems: "flex-end" }}>
                      <Text style={styles.DetailTitle}>
                        {data?.housing?.title}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.DetailTitle}>İlan No:</Text>
                    <View style={{ width: "50%", alignItems: "flex-end" }}>
                      <Text style={styles.DetailTitle}>
                        2000{data?.housing?.id}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.DetailTitle}>Rezervasyon Tarihi:</Text>
                    <View style={{ width: "50%", alignItems: "flex-end" }}>
                      <Text style={styles.DetailTitle}>{formattedDate}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.DetailTitle}>Giriş Tarihi:</Text>
                    <View style={{ width: "50%", alignItems: "flex-end" }}>
                      <Text style={styles.DetailTitle}>{username}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.DetailTitle}>Çıkış Tarihi:</Text>
                    <View style={{ width: "50%", alignItems: "flex-end" }}>
                      <Text style={styles.DetailTitle}>{endDate}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={[styles.dateContainer, { gap: 10 }]}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "#ebebeb",
                    paddingBottom: 10,
                  }}
                >
                  <Icon name="star-o" size={15} color={"#333"} />
                  <Text style={{ color: "#333", fontWeight: "500" }}>
                    Sepet Özeti
                  </Text>
                </View>
                <View style={{ gap: 20 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.DetailTitle}>
                      Gecelik{" "}
                      {JSON.parse(data.housing.housing_type_data).daily_rent} TL
                    </Text>
                    <View style={{ width: "50%", alignItems: "flex-end" }}>
                      <Text style={styles.DetailTitle}>
                        {totalNight} x gece
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.DetailTitle}>Toplam Tutar</Text>
                    <View style={{ width: "50%", alignItems: "flex-end" }}>
                      <Text style={styles.DetailTitle}>
                        {formattedTotalCost}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.DetailTitle}>
                      Kapıda Ödenecek Tutar
                    </Text>
                    <View style={{ width: "50%", alignItems: "flex-end" }}>
                      <Text style={styles.DetailTitle}>
                        {formattedHalfTotalCost}
                      </Text>
                    </View>
                  </View>
                  {chekedMoneySafe == "Safe" && (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={styles.DetailTitle}>Param Güvende:</Text>
                      <View style={{ width: "50%", alignItems: "flex-end" }}>
                        <Text style={styles.DetailTitle}>1000 ₺</Text>
                      </View>
                    </View>
                  )}

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={[styles.DetailTitle, { color: "#208011" }]}>
                      Şimdi Ödenecek Tutar
                    </Text>
                    <View style={{ width: "50%", alignItems: "flex-end" }}>
                      <Text style={[styles.DetailTitle, { color: "#208011" }]}>
                        {totalPrice}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </>
          ) : (
            <></>
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderWidth: 0.5,
              gap: 10,
              borderColor: "#333",
              width: "100%",
              overflow: "hidden",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                settabs(0);
              }}
              style={{
                width: "50%",
                backgroundColor: tabs == 0 ? "#E54242" : "transparent",
                padding: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: tabs == 0 ? "white" : "#333",
                }}
              >
                Kredi Kartı
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                settabs(1);
              }}
              style={{
                width: "50%",
                padding: 10,
                backgroundColor: tabs == 1 ? "#E54242" : "transparent",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: tabs == 1 ? "white" : "#333",
                }}
              >
                EFT / Havale ile Ödeme
              </Text>
            </TouchableOpacity>
          </View>

          {/*{tabs==0 && <CreditCardScreen CompeletePayment={completeCreditCardPay}/>}
      {tabs==1 && <EftPay onPress={pickDocument} selectedDocumentName={selectedDocumentName} pdfUri={pdfUri}/>} */}
          {tabs == 0 && (
            <CreditCartForReserve
              setCreditCartData={setCreditCartData}
              creditCartData={creditCartData}
              CompeletePayment={completeCreditCardPay}
            />
          )}
          {tabs == 1 && (
            <EftForReserve
              onPress={pickDocument}
              selectedDocumentName={selectedDocumentName}
              pdfUri={pdfUri}
            />
          )}
          <Modal
            isVisible={modalVisible}
            onBackdropPress={() => setModalVisible(false)}
            backdropColor="transparent"
            style={styles.modal2}
            animationIn={"fadeInRightBig"}
            animationOut={"fadeOutRightBig"}
          >
            <View style={styles.modalContent2}>
              <SafeAreaView>
                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    style={styles.Acceptbtn}
                    onPress={() => {
                      setChecked2(true);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      Okudum Kabul ediyorum
                    </Text>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            </View>
          </Modal>
        </ScrollView>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7f7f7",
    flex: 1,
    padding: 10,
  },
  AdvertDetail: {
    gap: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
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
  image: {
    backgroundColor: "red",
    width: 70,
    height: 70,
  },
  Description: {
    width: "70%",
    gap: 5,
  },
  Input: {
    borderWidth: 1,
    borderColor: "#ebebeb",
    padding: 9,
    borderRadius: 5,
  },
  label: {
    fontSize: 14,
    color: "grey",
    fontWeight: "600",
  },
  modal2: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent2: {
    backgroundColor: "#f4f4f4",
    padding: 20,
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  Acceptbtn: {
    backgroundColor: "#2aaa46",
    padding: 10,
    borderRadius: 5,
  },
  dateContainer: {
    backgroundColor: "#ffffff",

    borderRadius: 5,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
});
