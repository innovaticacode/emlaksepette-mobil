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
import IconIdCard from "react-native-vector-icons/FontAwesome";
import HTML from "react-native-render-html";
import { CheckBox } from "@rneui/themed";
import CreditCardScreen from "./CreditCardScreen";
import EftPay from "./EftPay";
import Modal from "react-native-modal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as DocumentPicker from "expo-document-picker";
import { addDotEveryThreeDigits } from "../../components/methods/merhod";

import { Platform } from "react-native";
import { apiRequestGet} from "../../components/methods/apiRequest";
import { useRoute } from "@react-navigation/native";
import {WebView} from "react-native-webview";
import HTMLView from "react-native-htmlview";
import { io } from "socket.io-client";
import {  useSelector } from "react-redux";
export default function PaymentScreen() {
  // Kullanarak bu değerleri göstermek için devam edin

  const route = useRoute();
  const {
    slug,
    id,
    roomOrder,
    price,
    totalPrice,
    deposit,
    kapora,
    isInstallament,
    installementPrice,
    paymentMethod,
    Cart,
    payDec,
    formatDate,
    type,
    offerControl,
  } = route.params;

  const [checked, setChecked] = React.useState(false);
  const [cartInfoHeight,setCartInfoHeight] = useState(0);
  const toggleCheckbox = () => setChecked(!checked);
  const [checked2, setChecked2] = React.useState(false);
  const [tabs, settabs] = useState(0);
  const [paymentModal, setPaymentModal] = useState(false);
  const [paymentModalContent, setPaymentModalContent] = useState("");
  const [paymentModalShow,setPaymentModalShow] = useState(false);
  const [errors,setErrors] = useState([]);
  const scrollViewRef = useRef();
  const socket = io("http://192.168.18.31:3000/");
  const [inputPositions, setInputPositions] = useState({}); // Her input'un pozisyonunu tutacak
  const [approximatelyTop,setApproximatelyTop] = useState(0);
  const [approximatelyInputHeight,setApproximatelyInputHeight] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const handleScrollViewLayout = (event) => {
    setScrollOffset(event.nativeEvent.layout.y);
  };

  const user = useSelector((state) => {
    return state.user.user
  })


  const handleLayout = (key, event) => {
    const { y } = event.nativeEvent.layout;
    const adjustedY = y + scrollOffset; // Y konumunu kaydırma ile ayarlama
    setInputPositions((prevPositions) => ({
      ...prevPositions,
      [key]: adjustedY,
    }));
  };

  useEffect(() => {
    function onConnect() {
    }

    function onDisconnect() {
    }

    function paymentCheck(value) {
      setPaymentModalShow(false);
      alert(value.message)
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('result_api_payment_cart', paymentCheck);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('result_api_payment_cart', paymentCheck);
    };
  }, []);

  useEffect(() => {
    if(user?.name){
      setIdNumber(user?.IdNumber);
      setNameAndSurnam(user?.name);
      setePosta(user?.email);
      setphoneNumber(user?.mobile_phone);
    }
  }, [user]);

  const getError = (key,itemType) => {
    if(errors.find((error) => {return error.key == key})){
      return 'red'
    }else{
      if(itemType == "checkbox"){
        return '#bfbfbf';
      }else{
        return '#ebebeb';
      }
    }
  }

  const completeCreditCardPay = () => {
    var tempErrors = [];
    var scrollPositionsTemp = [];
    if(!IdNumber){
      tempErrors.push({
        key : "IdNumber",
        message : "TC Kimlik alanı zorunludur"
      });
      scrollPosition = ((approximatelyInputHeight * 1) + approximatelyTop); 
      scrollPositionsTemp.push(scrollPosition)
    }

    if(!NameAndSurnam){
      tempErrors.push({
        key : "NameAndSurnam",
        message : "Ad Soyad alanı zorunludur"
      });
      scrollPosition = ((approximatelyInputHeight * 2) + approximatelyTop); 
      scrollPositionsTemp.push(scrollPosition)
    }

    if(!ePosta){
      tempErrors.push({
        key : "ePosta",
        message : "E-posta alanı zorunludur"
      });
      scrollPosition = ((approximatelyInputHeight * 3) + approximatelyTop); 
      scrollPositionsTemp.push(scrollPosition)
    }

    if(!phoneNumber){
      tempErrors.push({
        key : "phoneNumber",
        message : "Telefon alanı zorunludur"
      });
      scrollPosition = inputPositions['phoneNumber']; 
      scrollPosition = ((approximatelyInputHeight * 4) + approximatelyTop); 
      scrollPositionsTemp.push(scrollPosition)
    }

    if(!adress){
      tempErrors.push({
        key : "adress",
        message : "Adres alanı zorunludur"
      });
      scrollPosition = ((approximatelyInputHeight * 5) + approximatelyTop); 
      scrollPositionsTemp.push(scrollPosition)
    }

    if(!checked){
      tempErrors.push({
        key : "checked",
        message : "Mesafeli kapora emanet sözleşmesi onay kutucuğunu işaretleyiniz"
      });
      scrollPosition = ((approximatelyInputHeight * 8) + approximatelyTop); 
      scrollPositionsTemp.push(scrollPosition)
    }

    if(!checked2){
      tempErrors.push({
        key : "checked2",
        message : "Sözleşme aslını imzalamak için 7 iş günü içerisinde geleceğinizi belirten kutucuğu işaretleyiniz"
      });
      scrollPosition = ((approximatelyInputHeight * 9) + approximatelyTop); 
      scrollPositionsTemp.push(scrollPosition)
    }


    if(!creditCartData.card_number){
      tempErrors.push({
        key : "card_number",
        message : "Kart numaranızı giriniz"
      });

      scrollPosition = ((approximatelyInputHeight * 9) + approximatelyTop + cartInfoHeight); 
      scrollPositionsTemp.push(scrollPosition)
    }

    if(!creditCartData.month){
      tempErrors.push({
        key : "month",
        message : "Ay değerini giriniz"
      });
      scrollPosition = inputPositions['month']; 
    }

    if(!creditCartData.year){
      tempErrors.push({
        key : "year",
        message : "Yıl değerini giriniz"
      });
      scrollPosition = inputPositions['year']; 
    }
    scrollViewRef.current?.scrollToPosition(0, scrollPositionsTemp[0], true);
    setErrors(tempErrors)
    if (
      tempErrors.length == 0
    ) {
      setPaymentModalShow(true)
    } else {

      alert("tüm alanları doldur");
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
  const [referanceCode, setreferanceCode] = useState("");
  {
    /** State Of Inputs **/
  }
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDocumentName, setSelectedDocumentName] = useState(null);

  const [pdfFile, setPdfFile] = useState(null);
  const [selectedPdfUrl, setselectedPdfUrl] = useState(null);

  const [creditCartData, setCreditCartData] = useState({
    credit_cart_number : "5218487962459752",
    exp_month : 12,
    exp_year : 2026,
    cvc : 246,
    name : "Abdurrahman İslamoğlu"
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

  const [data, setData] = useState({});
  const [project, setproject] = useState({});
  const [housing, sethousing] = useState({});

  useEffect(() => {
    apiRequestGet(`${slug}/` + id).then((res) => {
      if (slug == "housing") {
        sethousing(res.data);
      } else {
        setproject(res?.data?.projectHousingsList[roomOrder]);
        setData(res.data);
      }
    });
  }, []);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("tr-TR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  const [Deals, setDeals] = useState("");

  const fetchDataDeal = async () => {
    const url = `http://192.168.18.31:8000/api/sayfa/mesafeli-guvenli-kapora-sozlesmesi`;
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
      <body>
        <form id="paymentForm" action="http://192.168.18.31:8000/api/pay-cart" method="POST">
          <input type="hidden" name="name" value="${creditCartData.name}" />
          <input type="hidden" name="creditcard" value="${creditCartData.credit_cart_number}" />
          <input type="hidden" name="month" value="${creditCartData.exp_month}" />
          <input type="hidden" name="year" value="${creditCartData.exp_year}" />
          <input type="hidden" name="cvc" value="${creditCartData.cvc}" />
          <input type="hidden" name="user_id" value="${user?.id}" />
          <input type="hidden" name="payable_amount" value="${route.params.deposit}" />
          <input type="submit" value="Submit" />
        </form>
        <script>
          document.getElementById('paymentForm').submit();
        </script>
      </body>
    </html>
  `;

  const { height } = Dimensions.get('window');

  useEffect(() => {
    fetchDataDeal();
  }, [modalVisible]);

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ gap: 20, paddingBottom: 50 }}
      showsVerticalScrollIndicator={false}
      ref={scrollViewRef}
      onLayout={(e) => handleScrollViewLayout(e)} // Ana ScrollView için onLayout ekliyoruz
    >
      
      <Modal isVisible={paymentModalShow} onBackdropPress={() => setPaymentModalShow(false)}>
        <View style={{height:height - 200}}>
          <WebView
            style={{height : 2,width:'100%'}}
            originWhitelist={['*']}
            automaticallyAdjustContentInsets={false}
            source={{ html: formHtml }} // WebView'e HTML formu yüklüyoruz ve otomatik gönderiliyor
            onNavigationStateChange={(navState) => {
              if (navState.url !== "http://192.168.18.31:8000/api/pay-cart") {
              }
            }}
          />
        </View>
      </Modal>
      <Modal
        isVisible={paymentModal}
        onBackdropPress={() => setPaymentModal(false)}
      >
        <View style={{ width: "100%", backgroundColor: "#fff" }}>
          <HTMLView value={paymentModalContent} />
        </View>
      </Modal>
      <View>
        <View style={[styles.AdvertDetail, { flexDirection: "row" }]} onLayout={(e) => {setApproximatelyTop(e.nativeEvent.layout.height)}}>
          <View style={styles.image}>
            <ImageBackground
              source={{
                uri: `http://192.168.18.31:8000/project_housing_images/${project["image[]"]}`,
              }}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <View style={styles.Description}>
            <View style={{ gap: 2 }}>
              {slug == "housing" ? (
                <Text style={{ fontSize: 12 }}>
                  İlan No:2000{housing?.housing?.id}
                </Text>
              ) : (
                <Text style={{ fontSize: 12 }}>
                  İlan No:1000{data?.project?.id}
                </Text>
              )}

              <View>
                {slug == "housing" ? (
                  <Text style={{ fontSize: 12 }}>
                    {housing?.housing?.title}
                  </Text>
                ) : (
                  <Text style={{ fontSize: 13 }} numberOfLines={3}>
                    {data?.project?.project_title} Projesinde {roomOrder} No'lu
                    Konut
                  </Text>
                )}
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ backgroundColor: "#EA2B2E", borderRadius: 5 }}>
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
              </View>
              <View>
                {slug == "housing" ? (
                  <Text style={{ fontSize: 12 }}>
                    {housing?.housing?.city?.title} /{" "}
                    {housing?.housing?.county?.title}
                  </Text>
                ) : (
                  <Text style={{ fontSize: 12 }}>
                    {data?.project?.city?.title} /{" "}
                    {data?.project?.county?.ilce_title}
                  </Text>
                )}
              </View>
            </View>
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
        <View  style={{ gap: 15 }}>
          <View onLayout={(event) => setApproximatelyInputHeight(event.nativeEvent.layout.height)} style={{ gap: 5 }}>
            <Text style={styles.label}>TC</Text>
            <TextInput
              value={IdNumber}
              onChangeText={(value) => setIdNumber(value)}
              style={{...styles.Input,borderColor : getError('IdNumber')}}
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={styles.label}>Ad Soyad</Text>
            <TextInput
              style={{...styles.Input,borderColor :getError('NameAndSurnam')}}
              value={NameAndSurnam}
              onLayout={(event) => {handleLayout('NameAndSurnam', event)}}
              onChangeText={(value) => setNameAndSurnam(value)}
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={styles.label}>E-posta</Text>
            <TextInput
              style={{...styles.Input,borderColor : getError('ePosta')}}
              value={ePosta}
              onLayout={(event) => {handleLayout('ePosta', event)}}
              onChangeText={(value) => setePosta(value)}
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={styles.label}>Telefon</Text>
            <TextInput
              style={{...styles.Input,borderColor : getError('phoneNumber') }}
              value={phoneNumber}
              onLayout={(event) => handleLayout('phoneNumber', event)}
              onChangeText={(value) => setphoneNumber(value)}
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={styles.label}>Adres</Text>
            <TextInput
              style={{...styles.Input,borderColor : getError('adress')}}
              value={adress}
              onLayout={(event) => handleLayout('adress', event)}
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
            onLayout={(event) => handleLayout('checked2', event)}
            // Use ThemeProvider to make change for all checkbox
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checkedColor="red"
            size={21}
            uncheckedColor={getError('checked2','checkbox')}
            containerStyle={{
              padding: 0,
              margin: 0,
              marginRight: 0,
              marginLeft: 0,
            }}
            title={
              <View style={{ padding: 5 }}>
                <Text style={{ textDecorationLine: "underline", fontSize: 12 }}>
                  Mesafeli kapora emanet sözleşmesini
                </Text>

                <Text style={{ fontSize: 12 }}>okudum kabul ediyorum</Text>
              </View>
            }
          />
          <CheckBox
            checked={checked}
            onLayout={(event) => handleLayout('checked', event)}
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
            uncheckedColor={getError('checked','checkbox')}
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
                  Sözleşme aslını imzalamak için 7 iş günü içerisinde geleceğimi
                  kabul ve beyan ediyorum
                </Text>
              </View>
            }
          />
        </View>
      </View>
      {slug == "housing" ? (
        <View style={[styles.AdvertDetail, { borderRadius: 3 }]} onLayout={(event) => {setCartInfoHeight(event.nativeEvent.layout.height)}}>
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
          <Text>{project.price}</Text>
          <View style={{ gap: 20 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>İlan Fiyatı:</Text>
              <Text> {formatAmount(route.params.price)} ₺ </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>Toplam Fiyat:</Text>
              <Text>{formatAmount(route.params.totalPrice)} ₺ </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>Bir Kira Kapora</Text>
              <Text>{formatAmount(route.params.deposit)} ₺ </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: "green" }}>Ödenecek Tutar:</Text>
              <Text style={{ color: "green" }}>
                {formatAmount(route.params.deposit)} ₺
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={[styles.AdvertDetail, { borderRadius: 3 }]}>
          {1 && (
            <View>
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
                          {addDotEveryThreeDigits(
                            item[`pay_dec_price${_index}`]
                          )}{" "}
                          ₺
                        </Text>
                        <Text style={{ color: "#7E7E7E", fontWeight: "600" }}>
                          {formatDate(item[`pay_dec_date${_index}`])}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
              <View
                style={[
                  styles.AdvertDetail,
                  { borderRadius: 3, marginTop: 10 },
                ]}
              >
                {type.type == "project" ? (
                  <View style={[styles.acceptCart, { borderRadius: 3 }]}>
                    <View
                      style={{
                        flexDirection: "row",

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
                          marginTop: 10,
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
                        <Text>
                          %{offerControl?.project?.deposit_rate} Kapora:
                        </Text>
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
                                {addDotEveryThreeDigits(
                                  Math.round(Cart?.price)
                                )}{" "}
                                ₺
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
              </View>
            </View>
          )}
        </View>
      )}

      {/* {paymentMethod === "credit_card" && (
        <Text>Kredi Kartı ile ödeme seçtiniz.</Text>
      )}
      {paymentMethod === "installment" && (
        <View>
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
                      {addDotEveryThreeDigits(item[`pay_dec_price${_index}`])} ₺
                    </Text>
                    <Text style={{ color: "#7E7E7E", fontWeight: "600" }}>
                      {formatDate(item[`pay_dec_date${_index}`])}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

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
                      isInstallament == 2 ? Cart.installmentPrice : Cart.amount
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
                          (Cart?.amount * offerControl?.project?.deposit_rate) /
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
        </View>
      )} */}

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
          errors={errors}
          getError={getError}
          CompeletePayment={completeCreditCardPay}
        />
      )}
      {tabs == 1 && (
        <EftPay
          onPress={pickDocument}
          selectedDocumentName={selectedDocumentName}
          url={selectedPdfUrl}
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
});
