import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import HTML from "react-native-render-html";
import { CheckBox } from "@rneui/themed";
import CreditCardScreen from "./CreditCardScreen";
import EftPay from "./EftPay";
import Modal from "react-native-modal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as DocumentPicker from "expo-document-picker";
import IconIdCard from "react-native-vector-icons/FontAwesome";
import WarningIcon from "react-native-vector-icons/AntDesign";
import AbsoluteErrorInput from "../../components/custom_inputs/AbsoluteErrorInput";

import { Platform } from "react-native";
import { apiUrl, socketIO } from "../../components/methods/apiRequest";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { io } from "socket.io-client";

import WebView from "react-native-webview";
import HTMLView from "react-native-htmlview";
import { getValueFor } from "../../components/methods/user";
export default function PaymentScreen2() {
  // Kullanarak bu değerleri göstermek için devam edin

  const route = useRoute();
  const { title, amount, imageUrl, neightboord, ilanNo, roomOrder } =
    route.params;

  console.log("route.params", route.params);

  const [checked, setChecked] = React.useState(false);
  const [cartInfoHeight, setCartInfoHeight] = useState(0);
  const toggleCheckbox = () => setChecked(!checked);
  const [checked2, setChecked2] = React.useState(false);
  const [tabs, settabs] = useState(0);
  const [paymentModal, setPaymentModal] = useState(false);
  const [paymentModalContent, setPaymentModalContent] = useState("");
  const [paymentModalShow, setPaymentModalShow] = useState(false);
  const [errors, setErrors] = useState([]);
  const scrollViewRef = useRef();
  const [btnLoading, setBtnLoading] = useState(false);

  const [inputPositions, setInputPositions] = useState({}); // Her input'un pozisyonunu tutacak
  const [approximatelyTop, setApproximatelyTop] = useState(0);
  const [approximatelyInputHeight, setApproximatelyInputHeight] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const handleScrollViewLayout = (event) => {
    setScrollOffset(event.nativeEvent.layout.y);
  };
  const nav = useNavigation();
  // const user = useSelector((state) => {
  //   return state.user.user;
  // });

  const [user, setUser] = useState({});
  const [payResponse, setPayResponse] = useState({
    Ecom_Payment_Card_ExpDate_Month: 0,
    Ecom_Payment_Card_ExpDate_Year: 0,
    amount: 0,
    callbackurl: "",
    clientid: "",
    currency: "",
    failurl: "",
    hash: "",
    hashAlgorithm: "",
    islemtipi: "",
    lang: "",
    oid: "",
    okurl: "",
    pan: "",
    rnd: "",
    storetype: "",
    taksit: "",
  });

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);
  const [IdNumberWarningText, setIdNumberWarningText] = useState("Zorunlu");
  const [tcWarningColor, setTcWarningColor] = useState("#cc3300");

  const [addressWarningText, setAddressWarningText] = useState("Zorunlu");
  const [addressWarningColor, setAddressWarningColor] = useState("#cc3300");

  const handleLayout = (key, event) => {
    const { y } = event.nativeEvent.layout;
    const adjustedY = y + scrollOffset; // Y konumunu kaydırma ile ayarlama
    setInputPositions((prevPositions) => ({
      ...prevPositions,
      [key]: adjustedY,
    }));
  };

  const socketRef = useRef(null);
  useEffect(() => {
    socketRef.current = io(socketIO, {
      transports: ["polling", "websocket"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 5000,
      timeout: 20000,
    });

    socketRef.current.on("result-api-payment-cart", (data) => {
      paymentCheck(data);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const paymentCheck = (value) => {
    if (!value?.status) {
      setPaymentModalShow(false);
      console.log("Payment failed!");
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Hata",
        textBody: "Ödeme işlemi sırasında bir hata oluştu.",
        button: "Tamam",
      });
    } else {
      nav.navigate("PaymentSuccess", {
        title: "SİPARİŞ İÇİN TEŞEKKÜRLER!",
        message: "Siparişiniz başarıyla oluşturuldu.",
        primaryButtonText: "Siparişlerim",
        secondaryButtonText: "Ana Sayfa",
        icon: "check-circle",
      });
    }
  };

  useEffect(() => {
    if (user?.name) {
      setIdNumber(user?.IdNumber);
      setNameAndSurnam(user?.name);
      setePosta(user?.email);
      setphoneNumber(user?.mobile_phone);
    }
  }, [user]);

  const getError = (key, itemType) => {
    if (
      errors.find((error) => {
        return error.key == key;
      })
    ) {
      return "red";
    } else {
      if (itemType == "checkbox") {
        return "#bfbfbf";
      } else {
        return "#ebebeb";
      }
    }
  };

  function tcKimlikDogrula(tcKimlik) {
    // TC Kimlik numarası 11 haneli olmalı ve ilk hanesi sıfır olamaz
    if (tcKimlik.length !== 11 || tcKimlik[0] === "0") {
      return false;
    }

    // TC Kimlik numarasının rakamlardan oluştuğunu kontrol et
    if (!/^\d+$/.test(tcKimlik)) {
      return false;
    }

    const digits = tcKimlik.split("").map(Number);

    // 1. 3. 5. 7. 9. basamakların toplamı
    const oddSum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
    // 2. 4. 6. 8. basamakların toplamı
    const evenSum = digits[1] + digits[3] + digits[5] + digits[7];

    // 10. basamak kontrolü
    const tenthDigit = (7 * oddSum - evenSum) % 10;
    if (tenthDigit !== digits[9]) {
      return false;
    }
    // 11. basamak kontrolü
    const sumOfFirstTen = digits.slice(0, 10).reduce((a, b) => a + b, 0);
    const eleventhDigit = sumOfFirstTen % 10;
    if (eleventhDigit !== digits[10]) {
      return false;
    }

    return true;
  }

  // credit cart methods
  const completeCreditCardPay = () => {
    var tempErrors = [];
    var scrollPositionsTemp = [];
    if (!IdNumber) {
      tempErrors.push({
        key: "IdNumber",
        message: "TC Kimlik alanı zorunludur",
      });
      scrollPosition = approximatelyInputHeight * 1 + approximatelyTop;
      scrollPositionsTemp.push(scrollPosition);
    }

    if (!NameAndSurnam) {
      tempErrors.push({
        key: "NameAndSurnam",
        message: "Ad Soyad alanı zorunludur",
      });
      scrollPosition = approximatelyInputHeight * 2 + approximatelyTop;
      scrollPositionsTemp.push(scrollPosition);
    }

    if (!ePosta) {
      tempErrors.push({
        key: "ePosta",
        message: "E-posta alanı zorunludur",
      });
      scrollPosition = approximatelyInputHeight * 3 + approximatelyTop;
      scrollPositionsTemp.push(scrollPosition);
    }

    if (!phoneNumber) {
      tempErrors.push({
        key: "phoneNumber",
        message: "Telefon alanı zorunludur",
      });
      scrollPosition = inputPositions["phoneNumber"];
      scrollPosition = approximatelyInputHeight * 4 + approximatelyTop;
      scrollPositionsTemp.push(scrollPosition);
    }

    if (!adress) {
      tempErrors.push({
        key: "adress",
        message: "Adres alanı zorunludur",
      });
      scrollPosition = approximatelyInputHeight * 5 + approximatelyTop;
      scrollPositionsTemp.push(scrollPosition);
    }

    if (!checked2) {
      tempErrors.push({
        key: "checked2",
        message:
          "Komşunu Gör Bilgi Güvenliği Politikası sözleşmesi onay kutucuğunu işaretleyiniz",
      });
      scrollPosition = approximatelyInputHeight * 9 + approximatelyTop;
      scrollPositionsTemp.push(scrollPosition);
    }

    if (!creditCartData.credit_cart_number) {
      tempErrors.push({
        key: "card_number",
        message: "Kart numaranızı giriniz",
      });

      scrollPosition =
        approximatelyInputHeight * 9 + approximatelyTop + cartInfoHeight;
      scrollPositionsTemp.push(scrollPosition);
    }

    if (!creditCartData.exp_month) {
      tempErrors.push({
        key: "month",
        message: "Ay değerini giriniz",
      });
      scrollPosition = inputPositions["month"];
    }

    if (!creditCartData.exp_year) {
      tempErrors.push({
        key: "year",
        message: "Yıl değerini giriniz",
      });
      scrollPosition = inputPositions["year"];
    }

    console.log("tempErrors", tempErrors);
    scrollViewRef.current?.scrollToPosition(0, scrollPositionsTemp[0], true);
    setErrors(tempErrors);
    if (tempErrors.length == 0) {
      sendPaymentRequest();
    }
  };

  {
    /** State Of Inputs **/
  }
  const [IdNumber, setIdNumber] = useState("");
  const [NameAndSurnam, setNameAndSurnam] = useState("");
  const [ePosta, setePosta] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [adress, setadress] = useState("");
  const [notes, setnotes] = useState("");
  const [selectedBank, setSelectedBank] = useState(0);
  {
    /** State Of Inputs **/
  }
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDocumentName, setSelectedDocumentName] = useState(null);

  const [pdfFile, setPdfFile] = useState(null);
  const [selectedPdfUrl, setselectedPdfUrl] = useState(null);

  const [creditCartData, setCreditCartData] = useState({
    credit_cart_number: "",
    exp_month: "",
    exp_year: "",
    name: "",
  });

  const pickDocument = async () => {
    DocumentPicker.getDocumentAsync({ type: "application/pdf" })
      .then((result) => {
        if (!result.canceled && result.assets && result.assets.length > 0) {
          const pdfAsset = result.assets[0];
          setPdfFile(pdfAsset);
          setSelectedDocumentName(pdfAsset.name);
          setselectedPdfUrl(pdfAsset.uri);
        }
      })
      .catch((error) => {
        alert("hata");
      });
  };

  const [Deals, setDeals] = useState("");

  const fetchDataDeal = async () => {
    const url = `${apiUrl}sayfa/mesafeli-kiralama-sozlesmesi`;
    try {
      const response = await fetch(url);
      // const data = await fetchFromURL(url);
      const data = await response.json();
      setDeals(data.content);
      // Burada isteğin başarılı olduğunda yapılacak işlemleri gerçekleştirebilirsiniz.
    } catch (error) {
      console.error("İstek hatası:", error);
      // Burada isteğin başarısız olduğunda yapılacak işlemleri gerçekleştirebilirsiniz.
    }
  };

  const formHtml = `
  <html>
      <body onload="javascript:moveWindow()">
          <form name="pay_form" method="post" action=${process.env.EXPO_PUBLIC_PAYMENT_URL}>
              <input type="hidden" name="clientid" value="${payResponse?.clientid}"/>
              <input type="hidden" name="callbackurl" value="${payResponse?.callbackurl}"/>
              <input type="hidden" name="amount" value="${payResponse?.amount}"/>
              <input type="hidden" name="Ecom_Payment_Card_ExpDate_Year" value="${payResponse?.Ecom_Payment_Card_ExpDate_Year}"/>
              <input type="hidden" name="Ecom_Payment_Card_ExpDate_Month" value="${payResponse?.Ecom_Payment_Card_ExpDate_Month}"/>
              <input type="hidden" name="currency" value="${payResponse?.currency}"/>
              <input type="hidden" name="hashAlgorithm" value="${payResponse?.hashAlgorithm}"/>
              <input type="hidden" name="hash" value="${payResponse?.hash}"/>
              <input type="hidden" name="islemtipi" value="${payResponse?.islemtipi}"/>
              <input type="hidden" name="lang" value="${payResponse?.lang}"/>
              <input type="hidden" name="oid" value="${payResponse?.oid}"/>
              <input type="hidden" name="okurl" value="${payResponse?.okurl}"/>
              <input type="hidden" name="pan" value="${payResponse?.pan}"/>
              <input type="hidden" name="rnd" value="${payResponse?.rnd}"/>
              <input type="hidden" name="storetype" value="${payResponse?.storetype}"/>
              <input type="hidden" name="taksit" value="${payResponse?.taksit}"/>
              <input type="hidden" name="failurl" value="${payResponse?.failurl}"/>
          </form>
          <script type="text/javascript">
              function moveWindow() {
                document.pay_form.submit();
              }
          </script>
      </body>
    </html>`;

  /**
   * Sends a payment request to the server.
   *
   * This function collects payment-related data, including user information and credit card details,
   * and sends it to the server for processing. If the payment is successful, a modal is displayed
   * to inform the user.
   *
   * 3d security is shown in webview according to the returned response
   *
   * @async
   * @function sendPaymentRequest
   * @returns {Promise<Object>} The response data from the server if the payment is successful.
   * @throws {Error} Throws an error if the payment request fails.
   */

  const sendPaymentRequest = async () => {
    setBtnLoading(true);
    const paymentData = {
      key: "order_key_app",
      payable_amount: amount,
      is_show_user: true,
      fullName: creditCartData.name,
      email: ePosta,
      phone: phoneNumber,
      address: adress,
      tc: IdNumber,
      notes: notes,
      creditcard: creditCartData.credit_cart_number,
      month: creditCartData.exp_month,
      year: creditCartData.exp_year,
    };
    const token = user?.access_token;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.post(apiUrl + "pay-cart", paymentData, {
        headers,
      });
      console.log("Ödeme başarılı:", response);
      if (response.status == 200) {
        setPaymentModalShow(true);
      }
      return setPayResponse(response.data);
    } catch (error) {
      console.error(
        "Ödeme işlemi sırasında hata:",
        error.response?.data || error.message
      );
      throw error;
    } finally {
      setBtnLoading(false);
    }
  };

  const { height } = Dimensions.get("window");

  useEffect(() => {
    fetchDataDeal();
  }, [modalVisible]);

  const eftPay = ({}) => {
    var tempErrors = [];
    var scrollPositionsTemp = [];
    if (!IdNumber) {
      tempErrors.push({
        key: "IdNumber",
        message: "TC Kimlik alanı zorunludur",
      });
      scrollPosition = approximatelyInputHeight * 1 + approximatelyTop;
      scrollPositionsTemp.push(scrollPosition);
    }

    if (!NameAndSurnam) {
      tempErrors.push({
        key: "NameAndSurnam",
        message: "Ad Soyad alanı zorunludur",
      });
      scrollPosition = approximatelyInputHeight * 2 + approximatelyTop;
      scrollPositionsTemp.push(scrollPosition);
    }

    if (!ePosta) {
      tempErrors.push({
        key: "ePosta",
        message: "E-posta alanı zorunludur",
      });
      scrollPosition = approximatelyInputHeight * 3 + approximatelyTop;
      scrollPositionsTemp.push(scrollPosition);
    }

    if (!phoneNumber) {
      tempErrors.push({
        key: "phoneNumber",
        message: "Telefon alanı zorunludur",
      });
      scrollPosition = inputPositions["phoneNumber"];
      scrollPosition = approximatelyInputHeight * 4 + approximatelyTop;
      scrollPositionsTemp.push(scrollPosition);
    }

    if (!adress) {
      tempErrors.push({
        key: "adress",
        message: "Adres alanı zorunludur",
      });
      scrollPosition = approximatelyInputHeight * 5 + approximatelyTop;
      scrollPositionsTemp.push(scrollPosition);
    }

    if (!checked2) {
      tempErrors.push({
        key: "checked2",
        message:
          "Komşunu Gör Bilgi Güvenliği Politikası sözleşmesi onay kutucuğunu işaretleyiniz",
      });
      scrollPosition = approximatelyInputHeight * 8 + approximatelyTop;
      scrollPositionsTemp.push(scrollPosition);
    }

    if (tempErrors.length == 0) {
      if (!selectedBank) {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: "Uyarı",
          textBody: "Lütfen havale yapacağınız bankayı seçiniz",
          button: "Tamam",
        });
      } else {
        if (!pdfFile) {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: "Uyarı",
            textBody: "Lütfen dekont ekleyiniz",
            button: "Tamam",
          });
        } else {
          if (tempErrors.length == 0) {
            setBtnLoading(true);
            payEft({
              bank_id: selectedBank,
              pdf: pdfFile,
              payableAmount: amount,
            })
              .then((res) => {
                if (res.status == 200) {
                  nav.navigate("PaymentSuccess", {
                    title: "SİPARİŞ İÇİN TEŞEKKÜRLER!",
                    message: "Siparişiniz başarıyla oluşturuldu.",
                    primaryButtonText: "Siparişlerim",
                    secondaryButtonText: "Ana Sayfa",
                    icon: "check-circle",
                  });
                }
              })
              .catch((err) => {
                Dialog.show({
                  type: ALERT_TYPE.DANGER,
                  title: "Hata",
                  textBody: "Ödeme işlemi sırasında bir hata oluştu.",
                  button: "Tamam",
                });
              });
            setBtnLoading(false);
          }
        }
      }
    }

    if (tempErrors.length > 0) {
      scrollViewRef.current?.scrollToPosition(0, scrollPositionsTemp[0], true);
    }
    setErrors(tempErrors);
  };

  const filterErrors = (key) => {
    var newErrors = errors.filter((error) => error.key != key);
    return newErrors;
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ gap: 20, paddingBottom: 50 }}
      showsVerticalScrollIndicator={false}
      ref={scrollViewRef}
      scrollEventThrottle={16}
      onLayout={(e) => handleScrollViewLayout(e)}
    >
      <Modal
        isVisible={paymentModalShow}
        onBackdropPress={() => setPaymentModalShow(false)}
      >
        <View style={{ height: height - 200 }}>
          <WebView
            source={{ html: formHtml }}
            originWhitelist={["*"]}
            automaticallyAdjustContentInsets={false}
            javaScriptEnabled={true} // JavaScript'i etkinleştir
            domStorageEnabled={true} // DOM depolamayı etkinleştir
          />
        </View>
      </Modal>
      <View>
        <View style={[styles.AdvertDetail, { flexDirection: "row" }]}>
          <View style={styles.image}>
            <ImageBackground
              source={{
                uri: imageUrl,
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
          <View style={styles.Description}>
            <View style={{ gap: 5 }}>
              <Text style={{ fontSize: 12 }}>İlan No: {ilanNo}</Text>
              <View>
                <Text style={{ fontWeight: "700" }}>{title}</Text>
              </View>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                {roomOrder} No'lu konut için komşumu gör satın alım
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            ></View>
          </View>
        </View>
      </View>
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
          <View
            onLayout={(event) =>
              setApproximatelyInputHeight(event.nativeEvent.layout.height)
            }
            style={{ gap: 5 }}
          >
            <Text style={styles.label}>TC</Text>
            <View
              style={{
                position: "absolute",
                right: 0,
                top: 11,
                backgroundColor: tcWarningColor,
                zIndex: 222,
                padding: 5,
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                borderRadius: 5,
              }}
            >
              {tcWarningColor == "green" ? (
                <WarningIcon
                  style={{ fontSize: 9, color: "#fff" }}
                  name="check"
                />
              ) : (
                <WarningIcon
                  style={{ fontSize: 9, color: "#fff" }}
                  name="warning"
                />
              )}
              <Text style={{ fontSize: 9, color: "#fff", marginLeft: 3 }}>
                {IdNumberWarningText}
              </Text>
            </View>
            <TextInput
              keyboardType="numeric"
              value={IdNumber}
              onChangeText={(value) => {
                const numericValue = value.replace(/[^0-9]/g, "");
                if (numericValue == value) {
                  setIdNumber(value);
                  if (value.length == 11) {
                    if (tcKimlikDogrula(value)) {
                      setTcWarningColor("green");
                      setIdNumberWarningText("Başarılı");
                      setErrors([...filterErrors("IdNumber")]);
                    } else {
                      setIdNumberWarningText("Geçersiz TC");
                      setTcWarningColor("#cc3300");
                      setErrors([
                        ...filterErrors("IdNumber"),
                        {
                          key: "IdNumber",
                          message: "Geçersiz TC",
                        },
                      ]);
                    }
                  } else {
                    if (value.length <= 11) {
                      setIdNumberWarningText("11 Hane Olmalıdır");
                      setTcWarningColor("#cc3300");
                      setIdNumber(numericValue);
                      setErrors([
                        ...filterErrors("IdNumber"),
                        {
                          key: "IdNumber",
                          message: "11 Hane Olmalıdır",
                        },
                      ]);
                    } else {
                      setIdNumberWarningText(
                        "Maksimum karakter sayısına ulaştınız"
                      );
                      setTcWarningColor("#cc3300");
                      setIdNumber(numericValue.substring(0, 11));
                      setErrors([
                        ...filterErrors("IdNumber"),
                        {
                          key: "IdNumber",
                          message: "Maksimum karakter sayısına ulaştınız",
                        },
                      ]);
                      setTimeout(() => {
                        if (tcKimlikDogrula(numericValue.substring(0, 11))) {
                          setTcWarningColor("green");
                          setIdNumberWarningText("Başarılı");
                          setErrors([...filterErrors("IdNumber")]);
                        } else {
                          setIdNumberWarningText("Geçersiz TC");
                          setTcWarningColor("#cc3300");
                          setErrors([
                            ...filterErrors("IdNumber"),
                            {
                              key: "IdNumber",
                              message: "Geçersiz TC",
                            },
                          ]);
                        }
                      }, 1000);
                    }
                  }
                } else {
                  setIdNumberWarningText("Sadece sayı giriniz");
                  setTcWarningColor("#cc3300");
                  setIdNumber(numericValue);
                  setErrors([
                    ...filterErrors("IdNumber"),
                    {
                      key: "IdNumber",
                      message: "Sadece sayı giriniz",
                    },
                  ]);
                }
              }}
              style={{ ...styles.Input, borderColor: getError("IdNumber") }}
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={styles.label}>Ad Soyad</Text>
            <TextInput
              editable={false}
              style={{
                ...styles.Input,
                borderColor: getError("NameAndSurnam"),
                backgroundColor: "lightgrey",
              }}
              value={NameAndSurnam}
              onLayout={(event) => {
                handleLayout("NameAndSurnam", event);
              }}
              onChangeText={(value) => setNameAndSurnam(value)}
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={styles.label}>E-posta</Text>
            <TextInput
              style={{
                ...styles.Input,
                borderColor: getError("ePosta"),
                backgroundColor: "lightgrey",
              }}
              value={ePosta}
              onLayout={(event) => {
                handleLayout("ePosta", event);
              }}
              onChangeText={(value) => setePosta(value)}
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={styles.label}>Telefon</Text>
            <TextInput
              style={{
                ...styles.Input,
                borderColor: getError("phoneNumber"),
                backgroundColor: "lightgrey",
              }}
              value={phoneNumber}
              onLayout={(event) => handleLayout("phoneNumber", event)}
              onChangeText={(value) => setphoneNumber(value)}
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={styles.label}>Adres</Text>
            <AbsoluteErrorInput
              warningColor={addressWarningColor}
              warningText={addressWarningText}
              show={true}
            />
            <TextInput
              style={{ ...styles.Input, borderColor: getError("adress") }}
              value={adress}
              onLayout={(event) => handleLayout("adress", event)}
              onChangeText={(value) => {
                if (value) {
                  if (value.length >= 5) {
                    setadress(value);
                    setAddressWarningText("Başarılı");
                    setAddressWarningColor("green");
                  } else {
                    setadress(value);
                    setAddressWarningText("Minimum 5 karakter olmalıdır");
                    setAddressWarningColor("#cc3300");
                  }
                } else {
                  setadress(value);
                  setAddressWarningText("Zorunlu");
                  setAddressWarningColor("#cc3300");
                }
              }}
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
          <View style={{ gap: 5 }}></View>
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
                <Text style={{ textDecorationLine: "underline", fontSize: 12 }}>
                  Komşunu Gör Bilgi Güvenliği Politikası
                </Text>

                <Text style={{ fontSize: 12 }}>okudum ve kabul ediyorum</Text>
              </View>
            }
          />
        </View>
      </View>

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
          <IconIdCard name="star-o" size={15} />
          <Text>Sepet Özeti</Text>
        </View>
        <View style={{ gap: 20 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Toplam Fiyat:</Text>
            <Text> {amount} ₺ </Text>
          </View>
        </View>
      </View>

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
            style={{ textAlign: "center", color: tabs == 0 ? "white" : "#333" }}
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
            style={{ textAlign: "center", color: tabs == 1 ? "white" : "#333" }}
          >
            EFT / Havale ile Ödeme
          </Text>
        </TouchableOpacity>
      </View>
      {selectedDocumentName && (
        <Text>Seçilen Belge: {selectedDocumentName}</Text>
      )}

      {tabs == 0 && (
        <CreditCardScreen
          setCreditCartData={setCreditCartData}
          creditCartData={creditCartData}
          CompeletePayment={completeCreditCardPay}
          getError={getError}
          errors={errors}
          loading={btnLoading}
        />
      )}
      {tabs == 1 && (
        <EftPay
          onPress={pickDocument}
          selectedDocumentName={selectedDocumentName}
          url={selectedPdfUrl}
          onHandlePayment={eftPay}
          setSelectedBank={setSelectedBank}
          selectedBank={selectedBank}
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
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <TouchableOpacity
                  style={styles.Acceptbtn}
                  onPress={() => {
                    setChecked2(true);
                    setModalVisible(false);
                  }}
                >
                  <Text style={{ color: "white" }}>Okudum, kabul ediyorum</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </Modal>
    </KeyboardAwareScrollView>
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
});
