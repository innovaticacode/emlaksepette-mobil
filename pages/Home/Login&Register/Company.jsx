import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { React, useState, useEffect, useRef } from "react";
import Modal from "react-native-modal";
import EyeIcon from "react-native-vector-icons/Ionicons";
import { CheckBox } from "@rneui/themed";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import MailCheck from "react-native-vector-icons/MaterialCommunityIcons";
import HTML from "react-native-render-html";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { ActivityIndicator } from "react-native-paper";
import { apiUrl } from "../../../components/methods/apiRequest";
import { Dialog } from "react-native-alert-notification";
import { sanitizeEmail } from "../../../utils";
export default function Company() {
  const Navigation = useNavigation();
  const [selectedIndexRadio, setIndexRadio] = useState(0);
  {
    /* Input States */
  }
  const [eposta, seteposta] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setpassword] = useState("");
  const [bossName, setbossName] = useState("");
  const [companyName, setcompanyName] = useState("");
  const [companyPhone, setcompanyPhone] = useState("");
  const [focusArea, setfocusArea] = useState(null);
  const [city, setcity] = useState(null);
  const [county, setcounty] = useState(null);
  const [neigbourhod, setneigbourhod] = useState(null);
  const [TaxPlaceCity, setTaxPlaceCity] = useState(null);
  const [TaxPlace, setTaxPlace] = useState(null);
  const [taxNumber, settaxNumber] = useState("");
  const [IdCardNo, setIdCardNo] = useState("");
  const [ShoppingName, setShoppingName] = useState("");
  const [licence, setlicence] = useState("");
  const [acccountType, setacccountType] = useState("");
  const [cityCode, setcityCode] = useState("");
  const [IsGiveFrancheise, setIsGiveFrancheise] = useState(null);
  const [IsConnectFranchaise, setIsConnectFranchaise] = useState(null);
  const [MarcaName, setMarcaName] = useState("");
  const [FrancheiseMarc, setFrancheiseMarc] = useState(null);
  {
    /* cheked documents */
  }
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const toggleCheked = () => setChecked(!checked);
  const toggleCheked1 = () => setChecked1(!checked1);
  const toggleCheked2 = () => setChecked2(!checked2);
  const toggleCheked3 = () => setChecked3(!checked3);
  const [showMailSendAlert, setshowMailSendAlert] = useState(false);
  const [succesRegister, setsuccesRegister] = useState(false);
  {
    /* Functions */
  }
  const [Show, setShow] = useState(false);
  const [Neigbour, setNeigbour] = useState([]);
  const scrollViewRef = useRef();
  const [message, setmessage] = useState("");
  const [IsSucces, setIsSucces] = useState(null);
  const [citites, setCities] = useState([]);
  const [counties, setcounties] = useState([]);
  const [errorStatu, seterrorStatu] = useState(0);
  const [errorMessage, seterrorMessage] = useState("");
  const [TaxOfficesCity, setTaxOfficesCity] = useState([]);
  const [TaxOffices, setTaxOffices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [Deals, setDeals] = useState("");
  const [passControl, setpassControl] = useState(false);
  const [showLengthAlert, setShowLengthAlert] = useState(false);
  const [showUpperAlert, setShowUpperAlert] = useState(false);
  const [showSymbolAlert, setShowSymbolAlert] = useState(false);
  const [showNumberAlert, setShowNumberAlert] = useState(false);
  const [colorForLength, setcolorForLength] = useState(false);
  const [colorForNumberAlert, setcolorForNumberAlert] = useState(false);
  const [colorForUpper, setcolorForUpper] = useState(false);
  const [colorForSymbol, setcolorForSymbol] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const show = () => {
    setShow(!Show);
  };
  const handleCheckboxChange = (
    checked,
    setChecked,
    modalVisible,
    setModalVisible,
    deal
  ) => {
    if (checked) {
      setModalVisible(false);
      setChecked(false);
    } else {
      setModalVisible(true);
      if (deal) {
        GetDeal(deal);
      }
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl + "cities");
      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData()
      .then((citites) => setCities(citites.data))
      .catch((error) =>
        console.error("Veri alınırken bir hata oluştu:", error)
      );
  }, []);

  const fetchDataCounty = async (value) => {
    try {
      const response = await axios.get(`${apiUrl}counties/${value}`);
      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };
  // useEffect(() => {
  //   fetchDataCounty()
  //     .then(county => setcounties(county.data))
  //     .catch(error => console.error('Veri alınırken bir hata oluştu:', error));
  // },[city]);

  // Bu fonksiyon sayfanın en üstüne scroll etmek için kullanılabilir

  const scrollToTop = () => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  const onChangeCity = (value) => {
    setcity(value);
    if (value) {
      fetchDataCounty(value)
        .then((county) => setcounties(county.data))
        .catch((error) =>
          console.error("Veri alınırken bir hata oluştu:", error)
        );
    } else {
      setcounties([]);
    }
  };
  const fetchDataNeigbour = async (value) => {
    try {
      const response = await axios.get(`${apiUrl}neighborhoods/${value}`);
      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };

  const onChangeCounty = (value) => {
    setcounty(value);
    if (value) {
      fetchDataNeigbour(value)
        .then((county) => setNeigbour(county.data))
        .catch((error) =>
          console.error("Veri alınırken bir hata oluştu:", error)
        );
    } else {
      setNeigbour([]);
    }
  };

const handleEpostaChange = (value) => {
  // Türkçe karakterleri engelleyen regex
  const filteredValue = sanitizeEmail(value);
  seteposta(filteredValue);
};

  const postData = async () => {
    setsuccesRegister(true);
    let fullNumber = `${cityCode}${companyPhone}`;
    try {
      const data = {
        type: 2,
        username: bossName,
        email: eposta,
        mobile_phone: phoneNumber,
        password: password,
        store_name: companyName,
        name: ShoppingName,
        phone: fullNumber,
        "corporate-account-type": focusArea,
        city_id: city,
        county_id: county,
        neighborhood_id: neigbourhod,
        taxOfficeCity: TaxPlaceCity,
        taxOffice: TaxPlace,
        taxNumber: taxNumber,
        idNumber: IdCardNo,
        "check-d": checked,
        "check-b": checked1,
        "check-c": checked2,
        account_type: null,
        authority_licence: licence,
        is_brand: IsGiveFrancheise,
        other_brand_name: MarcaName,
        "Franchise-question": IsConnectFranchaise,
        brand_id: FrancheiseMarc,
      };

      const response = await axios.post(apiUrl + "register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle success
      setmessage(response.data.message);
      setIsSucces(response.data.status);

      // Clear form fields
      seteposta("");
      setphoneNumber("");
      setpassword("");
      setbossName("");
      setcompanyName("");
      setcompanyPhone("");
      setShoppingName("");
      setfocusArea(null);
      setcity(null);
      setcounty(null);
      setneigbourhod(null);
      setTaxPlaceCity(null);
      setTaxPlace(null);
      settaxNumber("");
      setIdCardNo("");
      setlicence("");
      setChecked(false);
      setChecked1(false);
      setChecked2(false);
      setChecked3(false);
      setcityCode("");

      setTimeout(() => {
        Navigation.replace("Login", { showAlert: true });
      }, 700);
    } catch (error) {
      // Handle error
      Dialog.show({
        title: "Hata",
        description: error.response.data.message,
        animationType: "fade",
      });
      scrollToTop();
      if (error.response.data.errors.email) {
        seterrorStatu(2);
        seterrorMessage(error.response.data.errors.email);
        setTimeout(() => {
          seterrorStatu(0);
        }, 10000);
      }
    } finally {
      setsuccesRegister(false);
    }
  };

  const register = () => {
    switch (true) {
      case !bossName:
        seterrorStatu(1);
        seterrorMessage("İsim Alanı Boş Bırakılmaz");

        scrollToTop();
        setTimeout(() => {
          seterrorStatu(0);
        }, 10000);
        break;

      case !eposta:
        seterrorStatu(2);
        seterrorMessage("Email alanı Boş Bırakılmaz");
        scrollToTop();
        setTimeout(() => {
          seterrorStatu(0);
        }, 10000);
        break;
      case !password:
        seterrorStatu(3);
        seterrorMessage("Şifre Alanı Boş Bırakılamaz");
        scrollToTop();
        setTimeout(() => {
          seterrorStatu(0);
        }, 10000);
        break;
      case !phoneNumber:
        seterrorStatu(4);
        seterrorMessage("Telefon Numarası Boş Bırakılamaz");
        scrollToTop();
        setTimeout(() => {
          seterrorStatu(0);
        }, 10000);
        break;
      case !focusArea:
        seterrorStatu(7);
        seterrorMessage("Faaliyet Alanı Boş Bırakılamaz");
        scrollToTop();
        setTimeout(() => {
          seterrorStatu(0);
        }, 10000);
        break;
      case focusArea == "Emlak Ofisi" && !licence:
        seterrorStatu(14);
        seterrorMessage("Yetki Belgesi zorunludur");
        scrollToTop();
        setTimeout(() => {
          seterrorStatu(0);
        }, 10000);
        break;
      case focusArea == "Emlak Ofisi" && IsConnectFranchaise == null:
        seterrorStatu(16);
        seterrorMessage("Bu Alan Zorunludur");
        scrollToTop();
        setTimeout(() => {
          seterrorStatu(0);
        }, 10000);
        break;
      case focusArea == "Emlak Ofisi" && IsConnectFranchaise == 0 && !MarcaName:
        seterrorStatu(17);
        seterrorMessage("Marka Alanı Zorundludur");
        scrollToTop();
        setTimeout(() => {
          seterrorStatu(0);
        }, 10000);
        break;
      case focusArea == "Emlak Ofisi" &&
        IsConnectFranchaise == 1 &&
        !FrancheiseMarc:
        seterrorStatu(18);
        seterrorMessage("Bu Alan Zorunludur");
        scrollToTop();
        setTimeout(() => {
          seterrorStatu(0);
        }, 10000);
        break;
      case !companyName:
        seterrorStatu(5);
        seterrorMessage("Ticaret Ünvanı Boş Bırakılamaz");
        scrollToTop();
        setTimeout(() => {
          seterrorStatu(0);
        }, 10000);
        break;
      case !ShoppingName:
        seterrorStatu(6);
        seterrorMessage("Mağaza Adı Boş Bırakılamaz");
        scrollToTop();
        setTimeout(() => {
          seterrorStatu(0);
        }, 10000);
        break;
      case !city:
        seterrorStatu(8);
        seterrorMessage("Şehir Seçimi Zorunludur");
        scrollToTop();
        setTimeout(() => {
          seterrorStatu(0);
        }, 10000);
        break;
      case !county:
        seterrorStatu(9);
        seterrorMessage("İlçe Seçimi Zorunludur");
        scrollToTop();
        setTimeout(() => {
          seterrorStatu(0);
        }, 10000);
        break;
      case !neigbourhod:
        seterrorStatu(10);
        seterrorMessage("Mahalle Seçimi Zorunludur");
        scrollToTop();
        setTimeout(() => {
          seterrorStatu(0);
        }, 10000);
        break;
      case !TaxPlaceCity:
        seterrorStatu(11);
        seterrorMessage("Vergi dairesi ili zorunludur");
        scrollToTop();
        setTimeout(() => {
          seterrorStatu(0);
        }, 10000);
        break;
      case !TaxPlace:
        seterrorStatu(12);
        seterrorMessage("Vergi dairesi adı zorunludur");
        scrollToTop();
        setTimeout(() => {
          seterrorStatu(0);
        }, 10000);
        break;
      case !taxNumber:
        seterrorStatu(13);
        seterrorMessage("Vergi numarası zorunludur");
        scrollToTop();
        setTimeout(() => {
          seterrorStatu(0);
        }, 10000);
        break;
      case !checked || !checked1 || !checked2:
        seterrorStatu(15);
        seterrorMessage("Sözleşmeleri Onaylamayı Unutmayın");
        setTimeout(() => {
          seterrorStatu(0);
        }, 5000);
        break;

      default:
        postData();
    }
  };

  const fetchTaxOfficeCity = async () => {
    try {
      const response = await axios.get(apiUrl + "get-tax-offices");
      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchTaxOfficeCity()
      .then((TaxOffice) => setTaxOfficesCity(TaxOffice))
      .catch((error) =>
        console.error("Veri alınırken bir hata oluştu:", error)
      );
  }, []);
  const Cityies = Array.from(new Set(TaxOfficesCity.map((item) => item.il)));
  const onChangeTaxOfficesSity = (value) => {
    setTaxPlaceCity(value);
    if (value) {
      fetchTaxOffice(value)
        .then((TaxOffice) => setTaxOffices(TaxOffice))
        .catch((error) =>
          console.error("Veri alınırken bir hata oluştu:", error)
        );
    } else {
    }
  };
  const fetchTaxOffice = async (value) => {
    try {
      const response = await axios.get(`${apiUrl}get-tax-office/${value}`);
      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };

  const TaxOfficePlace = Array.from(
    new Set(TaxOffices.map((item) => item.daire))
  );

  // RNPickerSelect için uygun formata dönüştürme
  const formattedTaxOfficePlace = TaxOffices.map((item) => ({
    label: item.daire,
    value: item.id.toString(), // id değerini string olarak çevirme
  }));

  const formatPhoneNumber = (value) => {
    // Sadece rakamları al
    const cleaned = ("" + value).replace(/\D/g, "");

    // 0 ile başlıyorsa, ilk karakteri çıkar
    const cleanedWithoutLeadingZero = cleaned.startsWith("0")
      ? cleaned.substring(1)
      : cleaned;

    let formattedNumber = "";

    for (let i = 0; i < cleanedWithoutLeadingZero.length; i++) {
      if (i === 0) formattedNumber += "(";
      if (i === 3) formattedNumber += ") ";
      if (i === 6 || i === 8) formattedNumber += " ";
      formattedNumber += cleanedWithoutLeadingZero[i];
    }

    return formattedNumber;
  };
  const handlePhoneNumberChange = (value) => {
    const formattedPhoneNumber = formatPhoneNumber(value);
    setphoneNumber(formattedPhoneNumber);
  };

  const GetDeal = (deal) => {
    fetchDataDeal(deal);
  };
  const fetchFromURL = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Örnek kullanım

  const fetchDataDeal = async (deal) => {
    const url = `${apiUrl}sayfa/${deal}`;
    try {
      const data = await fetchFromURL(url);
      setDeals(data.content);
      // Burada isteğin başarılı olduğunda yapılacak işlemleri gerçekleştirebilirsiniz.
    } catch (error) {
      console.error("İstek hatası:", error);
      // Burada isteğin başarısız olduğunda yapılacak işlemleri gerçekleştirebilirsiniz.
    }
  };
  const chooseType = (title) => {
    setacccountType(title);
  };
  const cityData = [
    { label: "İstanbul Avrupa Yakası (212)", value: 212 },
    { label: "İstanbul Anadolu Yakası (216)", value: 216 },
    { label: "Adana (322)", value: 322 },
    { label: "Adıyaman (416)", value: 416 },
    { label: "Afyon (272)", value: 272 },
    { label: "Ağrı (472)", value: 472 },
    { label: "Aksaray (382)", value: 382 },
    { label: "Amasya (358)", value: 358 },
    { label: "Ankara (312)", value: 312 },
    { label: "Antalya (242)", value: 242 },
    { label: "Ardahan (478)", value: 478 },
    { label: "Artvin (466)", value: 466 },
    { label: "Aydın (256)", value: 256 },
    { label: "Balıkesir (266)", value: 266 },
    { label: "Bartın (378)", value: 378 },
    { label: "Batman (488)", value: 488 },
    { label: "Bayburt (458)", value: 458 },
    { label: "Bilecik (228)", value: 228 },
    { label: "Bingöl (426)", value: 426 },
    { label: "Bitlis (434)", value: 434 },
    { label: "Bolu (374)", value: 374 },
    { label: "Burdur (248)", value: 248 },
    { label: "Bursa (224)", value: 224 },
    { label: "Çanakkale (286)", value: 286 },
    { label: "Çankırı (376)", value: 376 },
    { label: "Çorum (364)", value: 364 },
    { label: "Denizli (258)", value: 258 },
    { label: "Diyarbakır (412)", value: 412 },
    { label: "Düzce (380)", value: 380 },
    { label: "Edirne (284)", value: 284 },
    { label: "Elazığ (424)", value: 424 },
    { label: "Erzincan (446)", value: 446 },
    { label: "Erzurum (442)", value: 442 },
    { label: "Eskişehir (222)", value: 222 },
    { label: "Gaziantep (342)", value: 342 },
    { label: "Giresun (454)", value: 454 },
    { label: "Gümüşhane (456)", value: 456 },
    { label: "Hakkari (438)", value: 438 },
    { label: "Hatay (326)", value: 326 },
    { label: "Iğdır (476)", value: 476 },
    { label: "Isparta (246)", value: 246 },
    { label: "İçel (Mersin) (324)", value: 324 },

    { label: "İzmir (232)", value: 232 },
    { label: "Kahramanmaraş (344)", value: 344 },
    { label: "Karabük (370)", value: 370 },
    { label: "Karaman (338)", value: 338 },
    { label: "Kars (474)", value: 474 },
    { label: "Kastamonu (366)", value: 366 },
    { label: "Kayseri (352)", value: 352 },
    { label: "Kırıkkale (318)", value: 318 },
    { label: "Kırklareli (288)", value: 288 },
    { label: "Kırşehir (386)", value: 386 },
    { label: "Kilis (348)", value: 348 },
    { label: "Kocaeli (262)", value: 262 },
    { label: "Konya (332)", value: 332 },
    { label: "Kütahya (274)", value: 274 },
    { label: "Malatya (422)", value: 422 },
    { label: "Manisa (236)", value: 236 },
    { label: "Mardin (482)", value: 482 },
    { label: "Muğla (252)", value: 252 },
    { label: "Muş (436)", value: 436 },
    { label: "Nevşehir (384)", value: 384 },
    { label: "Niğde (388)", value: 388 },
    { label: "Ordu (452)", value: 452 },
    { label: "Osmaniye (328)", value: 328 },
    { label: "Rize (464)", value: 464 },
    { label: "Sakarya (264)", value: 264 },
    { label: "Samsun (362)", value: 362 },
    { label: "Siirt (484)", value: 484 },
    { label: "Sinop (368)", value: 368 },
    { label: "Sivas (346)", value: 346 },
    { label: "Şanlıurfa (414)", value: 414 },
    { label: "Şırnak (486)", value: 486 },
    { label: "Tekirdağ (282)", value: 282 },
    { label: "Tokat (356)", value: 356 },
    { label: "Trabzon (462)", value: 462 },
    { label: "Tunceli (428)", value: 428 },
    { label: "Uşak (276)", value: 276 },
    { label: "Van (432)", value: 432 },
    { label: "Yalova (226)", value: 226 },
    { label: "Yozgat (354)", value: 354 },
    { label: "Zonguldak (372)", value: 372 },
  ];
  const formatNumber = (text) => {
    // Sadece rakamları filtrele
    let cleaned = text.replace(/[^0-9]/g, "");

    // 7 karakterden fazla olmamalı
    if (cleaned.length > 7) {
      cleaned = cleaned.slice(0, 7);
    }

    // 3-2-2 formatında düzenle
    let formatted = cleaned;
    if (cleaned.length > 3) {
      formatted = cleaned.slice(0, 3) + "-" + cleaned.slice(3, 5);
    }
    if (cleaned.length > 5) {
      formatted += "-" + cleaned.slice(5, 7);
    }

    setcompanyPhone(formatted);
  };

  // API'ye GET isteği atan fonksiyon
  const fetchFranchiseMarkalari = async () => {
    try {
      const response = await axios.get(apiUrl + "franchise-markalari");
      setData(response.data.data); // 'data' alanına erişiyoruz
    } catch (error) {
      console.error("API isteği başarısız:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sayfa yüklendiğinde API isteği atılır
  useEffect(() => {
    fetchFranchiseMarkalari();
  }, []);
  const pickerItems = data.map((item) => ({
    label: item.title,
    value: item?.id,
  }));

  const handlePasswordChange = (text) => {
    setpassword(text);
    // Şifre uzunluğunu kontrol edin ve uyarıyı göstermek/gizlemek için durumu güncelleyin

    if (text.length + 1 <= 8) {
      setShowLengthAlert(true);
      setcolorForLength(false);
    } else {
      setcolorForLength(true);
    }

    //rakam kontrölü
    const numberRegex = /[0-9]/;
    if (!numberRegex.test(text)) {
      setShowNumberAlert(true);
      setcolorForNumberAlert(false);
    } else {
      setcolorForNumberAlert(true);
    }
    //Büyük harf kontrolü
    const upperCaseRegex = /[A-Z]/;
    if (!upperCaseRegex.test(text)) {
      setShowUpperAlert(true);
      setcolorForUpper(false);
    } else {
      setcolorForUpper(true);
    }
    // Sembole kontrolü
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!symbolRegex.test(text)) {
      setShowSymbolAlert(true);
      setcolorForSymbol(false);
    } else {
      setcolorForSymbol(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "transparent" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS ve Android için farklı davranışlar
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // iOS için klavyenin üstünde kalacak şekilde offset ayarı
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        behavior="padding"
        style={{ flex: 1 }}
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={{ padding: 15, gap: 20 }}>
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "black", fontWeight: 600 }}>
                  Yetkili İsim Soyisim
                </Text>
              </View>
              <TextInput
                style={[
                  styles.Input,
                  {
                    borderColor: errorStatu == 1 ? "red" : "#ebebeb",
                  },
                ]}
                value={bossName}
                onChangeText={(value) => setbossName(value)}
                placeholder="Yetkili İsim Soyisim"
              />
              {errorStatu == 1 ? (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errorMessage}
                </Text>
              ) : (
                ""
              )}
            </View>

            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "black", fontWeight: 600 }}>
                  E-Posta
                </Text>
              </View>
              <TextInput
                style={[
                  styles.Input,
                  {
                    borderColor: errorStatu === 2 ? "red" : "#ebebeb",
                  },
                ]}
                value={eposta}
                onChangeText={handleEpostaChange }
                placeholder="E-Posta Adresi"
                autoCapitalize="none" // İlk harfin büyük olmasını engeller
              />
              {errorStatu == 2 ? (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errorMessage}
                </Text>
              ) : (
                ""
              )}
            </View>
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "black", fontWeight: 600 }}>
                  Cep Telefonu
                </Text>
              </View>
              <TextInput
                value={phoneNumber}
                style={[
                  styles.Input,
                  {
                    borderColor: errorStatu == 4 ? "red" : "#ebebeb",
                  },
                ]}
                onChangeText={(value) => {
                  handlePhoneNumberChange(value);
                }}
                placeholder="Cep Telefonu"
                keyboardType="number-pad"
                maxLength={15}
              />
              {errorStatu == 4 ? (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errorMessage}
                </Text>
              ) : (
                ""
              )}
            </View>
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "black", fontWeight: 600 }}>
                  Şifre
                </Text>
              </View>
              <View>
                <TextInput
                  value={password}
                  onChangeText={(value) => handlePasswordChange(value)}
                  style={[
                    styles.Input,
                    {
                      borderColor: errorStatu === 3 ? "red" : "#ebebeb",
                    },
                  ]}
                  placeholder="Şifre"
                  secureTextEntry={Show ? false : true}
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: "21%",
                    right: 9,
                  }}
                  onPress={show}
                >
                  <EyeIcon
                    name={Show ? "eye" : "eye-off-sharp"}
                    size={23}
                    color={"#333"}
                  />
                </TouchableOpacity>
              </View>
              {showLengthAlert && (
                <Text style={{ color: colorForLength ? "green" : "red" }}>
                  Şifreniz en az 8 karakter olmalıdır!
                </Text>
              )}
              {showNumberAlert && (
                <Text style={{ color: colorForNumberAlert ? "green" : "red" }}>
                  Şifrenizde en az bir rakam olmalıdır.
                </Text>
              )}
              {showUpperAlert && (
                <Text style={{ color: colorForUpper ? "green" : "red" }}>
                  Şifrenizde en az bir büyük harf olmalıdır!
                </Text>
              )}
              {showSymbolAlert && (
                <Text style={{ color: colorForSymbol ? "green" : "red" }}>
                  Şifrenizde en az bir özel karakter olmalıdır!
                </Text>
              )}
            </View>

            <View style={{ gap: 5 }}>
              <Text style={{ fontSize: 14, color: "black", fontWeight: 600 }}>
                Faaliyet Alanınız
              </Text>
              <RNPickerSelect
                doneText="Tamam"
                value={focusArea}
                placeholder={{
                  label: "Seçiniz...",
                  value: null,
                }}
                style={pickerSelectStyles}
                onValueChange={(value) => setfocusArea(value)}
                items={[
                  { label: "Emlak Ofisi", value: "Emlak Ofisi" },
                  { label: "İnşaat Ofisi", value: "İnşaat Ofisi" },
                  { label: "Banka", value: "Banka" },
                  { label: "Turizm", value: "Turizm Amaçlı Kiralama" },
                  { label: "Üretici", value: "Üretici" },
                  {
                    label: "Gayrimenkul Franchise",
                    value: "Gayrimenkul Franchise",
                  },
                ]}
              />
              {errorStatu == 7 ? (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errorMessage}
                </Text>
              ) : (
                ""
              )}
            </View>

            {focusArea == "Emlak Ofisi" && (
              <>
                <View style={{ gap: 5 }}>
                  <View style={{ paddingLeft: 5 }}>
                    <Text
                      style={{ fontSize: 14, color: "black", fontWeight: 600 }}
                    >
                      Taşınmaz Ticareti Yetki Belgesi No
                    </Text>
                  </View>
                  <TextInput
                    value={licence}
                    onChangeText={(value) => setlicence(value)}
                    style={styles.Input}
                    placeholder="Yetki Belgesi No"
                    keyboardType="number-pad"
                    maxLength={7}
                  />
                  {errorStatu == 14 ? (
                    <Text style={{ fontSize: 12, color: "red" }}>
                      {errorMessage}
                    </Text>
                  ) : (
                    ""
                  )}
                </View>

                {/* <View style={{ gap: 5 }}>
                  <Text
                    style={{ fontSize: 14, color: "black", fontWeight: 600 }}
                  >
                   Franchise Ofisine Bağlı Mısın?
                  </Text>
                  <RNPickerSelect
                    doneText="Tamam"
                    value={IsGiveFrancheise}
                    placeholder={{
                      label: "Seçiniz...",
                      value: null,
                    }}
                    style={pickerSelectStyles}
                    onValueChange={(value) => setIsGiveFrancheise(value)}
                    items={[
                      { label: "Evet", value: 1 },
                      { label: "Hayır", value: 0 },
                    ]}
                  />
                  {errorStatu == 15 ? (
                    <Text style={{ fontSize: 12, color: "red" }}>
                      {errorMessage}
                    </Text>
                  ) : (
                    ""
                  )}
                </View> */}

                {focusArea == "Emlak Ofisi" && (
                  <View style={{ gap: 5 }}>
                    <Text
                      style={{ fontSize: 14, color: "black", fontWeight: 600 }}
                    >
                      Franchise Ofisine Bağlı Mısın?
                    </Text>
                    <RNPickerSelect
                      doneText="Tamam"
                      value={IsConnectFranchaise}
                      placeholder={{
                        label: "Seçiniz...",
                        value: null,
                      }}
                      style={pickerSelectStyles}
                      onValueChange={(value) => setIsConnectFranchaise(value)}
                      items={[
                        { label: "Evet", value: 1 },
                        { label: "Hayır", value: 0 },
                      ]}
                    />
                    {errorStatu == 16 ? (
                      <Text style={{ fontSize: 12, color: "red" }}>
                        {errorMessage}
                      </Text>
                    ) : (
                      ""
                    )}
                  </View>
                )}

                {IsConnectFranchaise == 1 && (
                  <View style={{ gap: 5 }}>
                    <Text
                      style={{ fontSize: 14, color: "black", fontWeight: 600 }}
                    >
                      Bağlı Olduğun Franchise Markasını Seç
                    </Text>
                    <RNPickerSelect
                      doneText="Tamam"
                      value={FrancheiseMarc}
                      placeholder={{
                        label: "Seçiniz...",
                        value: null,
                      }}
                      style={pickerSelectStyles}
                      onValueChange={(value) => setFrancheiseMarc(value)}
                      items={pickerItems}
                    />
                    {errorStatu == 18 ? (
                      <Text style={{ fontSize: 12, color: "red" }}>
                        {errorMessage}
                      </Text>
                    ) : (
                      ""
                    )}
                  </View>
                )}
                {IsConnectFranchaise == 0 && (
                  <View style={{ gap: 5 }}>
                    <View style={{ paddingLeft: 5 }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "black",
                          fontWeight: "600",
                        }}
                      >
                        Marka Adı
                      </Text>
                    </View>
                    <TextInput
                      style={[
                        styles.Input,
                        {
                          borderColor: errorStatu == 17 ? "red" : "#ebebeb",
                        },
                      ]}
                      value={MarcaName}
                      onChangeText={(value) => setMarcaName(value)}
                      placeholder="Marka Adı"
                    />
                    {errorStatu == 17 ? (
                      <Text style={{ fontSize: 12, color: "red" }}>
                        {errorMessage}
                      </Text>
                    ) : (
                      ""
                    )}
                  </View>
                )}
              </>
            )}

            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "black", fontWeight: 600 }}>
                  Ticari Ünvan{" "}
                  <Text style={{ color: "#888888", fontSize: 12 }}>
                    (Vergi Levhasında Yazan Firma Adı)
                  </Text>
                </Text>
              </View>
              <TextInput
                style={[
                  styles.Input,
                  {
                    borderColor: errorStatu == 5 ? "red" : "#ebebeb",
                  },
                ]}
                value={companyName}
                onChangeText={(value) => setcompanyName(value)}
                placeholder="Ticari Ünvan"
              />
              {errorStatu == 5 ? (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errorMessage}
                </Text>
              ) : (
                ""
              )}
            </View>
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "black", fontWeight: 600 }}>
                  Mağaza Adı{" "}
                  <Text style={{ fontSize: 12, color: "#888888" }}>
                    (Ofisinizin tabela adı ile aynı olmalıdır)
                  </Text>
                </Text>
              </View>
              <TextInput
                style={[
                  styles.Input,
                  {
                    borderColor: errorStatu == 6 ? "red" : "#ebebeb",
                  },
                ]}
                value={ShoppingName}
                onChangeText={(value) => setShoppingName(value)}
                placeholder="Mağaza Adı"
              />
              {errorStatu == 6 ? (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errorMessage}
                </Text>
              ) : (
                ""
              )}
            </View>
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "black", fontWeight: 600 }}>
                  Sabit Telefon (Opsiyonel)
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View style={{ width: "32%" }}>
                  <RNPickerSelect
                    doneText="Tamam"
                    value={cityCode}
                    placeholder={{
                      label: "Alan Kodu",
                      value: null,
                    }}
                    style={pickerSelectStyles}
                    onValueChange={(value) => {
                      setcityCode(value);
                    }}
                    items={cityData}
                  />
                </View>
                <View style={{ width: "70%" }}>
                  <TextInput
                    value={companyPhone}
                    onChangeText={(value) => formatNumber(value)}
                    style={styles.Input}
                    placeholder="Sabit Telefon"
                    keyboardType="number-pad"
                    maxLength={9}
                  />
                </View>
              </View>
            </View>
            {/* <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "black", fontWeight: 600 }}>
                  Sabit Telefon (Opsiyonel)
                </Text>
              </View>
              <TextInput
                value={companyPhone}
                onChangeText={(value) => setcompanyPhone(value)}
                style={styles.Input}
                placeholder="Sabit Telefon"
                keyboardType="number-pad"
              />
            </View> */}

            <View style={{ gap: 6 }}>
              <Text style={{ fontSize: 14, color: "black", fontWeight: 600 }}>
                İl
              </Text>
              <RNPickerSelect
                doneText="Tamam"
                value={city}
                placeholder={{
                  label: "Seçiniz...",
                  value: null,
                }}
                style={pickerSelectStyles}
                onValueChange={(value) => {
                  onChangeCity(value);
                }}
                items={citites}
              />
              {errorStatu == 8 ? (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errorMessage}
                </Text>
              ) : (
                ""
              )}
            </View>
            <View style={{ gap: 6 }}>
              <Text style={{ fontSize: 14, color: "black", fontWeight: 600 }}>
                İlçe
              </Text>
              <RNPickerSelect
                doneText="Tamam"
                value={county}
                placeholder={{
                  label: "Seçiniz...",
                  value: null,
                }}
                style={pickerSelectStyles}
                onValueChange={(value) => {
                  onChangeCounty(value);
                }}
                items={counties}
              />
              {errorStatu == 9 ? (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errorMessage}
                </Text>
              ) : (
                ""
              )}
            </View>
            <View style={{ gap: 6 }}>
              <Text style={{ fontSize: 14, color: "black", fontWeight: 600 }}>
                Mahalle
              </Text>
              <RNPickerSelect
                doneText="Tamam"
                value={neigbourhod}
                placeholder={{
                  label: "Seçiniz...",
                  value: null,
                }}
                style={pickerSelectStyles}
                onValueChange={(value) => setneigbourhod(value)}
                items={Neigbour}
              />
              {errorStatu == 10 ? (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errorMessage}
                </Text>
              ) : (
                ""
              )}
            </View>
            <View>
              <Text>İşletme Türü</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <CheckBox
                  checked={selectedIndexRadio === 1}
                  onPress={() => {
                    chooseType("Şahıs Şirketi");
                    setIndexRadio(1);
                  }}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checkedColor="#E54242"
                  title={<Text style={{ fontSize: 12 }}>Şahıs Şirketi</Text>}
                  containerStyle={{
                    padding: 0,
                    backgroundColor: "transparent",
                    borderWidth: 0,
                    borderTopWidth: 1,
                  }}
                />
                <CheckBox
                  checked={selectedIndexRadio === 2}
                  onPress={() => {
                    setIndexRadio(2);
                    chooseType("Limited veya Anonim Şirketi");
                  }}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checkedColor="#E54242"
                  title={
                    <View style={{}}>
                      <Text style={{ fontSize: 12 }}>LTD.ŞTİ veya A.Ş </Text>
                    </View>
                  }
                  containerStyle={{
                    padding: 0,
                    backgroundColor: "transparent",
                    borderWidth: 0,
                    borderTopWidth: 1,
                  }}
                />
                <CheckBox
                  checked={selectedIndexRadio === 3}
                  onPress={() => {
                    setIndexRadio(3);
                    chooseType("Limited veya Anonim Şirketi");
                  }}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checkedColor="#E54242"
                  title={
                    <View style={{}}>
                      <Text style={{ fontSize: 12 }}>Diğer </Text>
                    </View>
                  }
                  containerStyle={{
                    padding: 0,
                    backgroundColor: "transparent",
                    borderWidth: 0,
                    borderTopWidth: 1,
                  }}
                />
              </View>
            </View>
            <View style={{ gap: 6 }}>
              <Text style={{ fontSize: 14, color: "black", fontWeight: 600 }}>
                Vergi Dairesi İli
              </Text>
              <RNPickerSelect
                doneText="Tamam"
                value={TaxPlaceCity}
                placeholder={{
                  label: "Seçiniz...",
                  value: null,
                }}
                style={pickerSelectStyles}
                onValueChange={(value) => {
                  onChangeTaxOfficesSity(value);
                }}
                items={Cityies.map((il) => ({ label: il, value: il }))}
              />
              {errorStatu == 11 ? (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errorMessage}
                </Text>
              ) : (
                ""
              )}
            </View>
            <View style={{ gap: 6 }}>
              <Text style={{ fontSize: 14, color: "black", fontWeight: 600 }}>
                Vergi Dairesi
              </Text>
              <RNPickerSelect
                doneText="Tamam"
                value={TaxPlace}
                placeholder={{
                  label: "Seçiniz...",
                  value: null,
                }}
                style={pickerSelectStyles}
                onValueChange={(value) => setTaxPlace(value)}
                items={formattedTaxOfficePlace}
              />
              {errorStatu == 12 ? (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errorMessage}
                </Text>
              ) : (
                ""
              )}
            </View>
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "black", fontWeight: 600 }}>
                  Vergi No
                </Text>
              </View>
              <TextInput
                value={taxNumber}
                onChangeText={(value) => settaxNumber(value)}
                style={styles.Input}
                placeholder="Vergi No"
                keyboardType="number-pad"
                maxLength={10}
              />
              {errorStatu == 13 ? (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errorMessage}
                </Text>
              ) : (
                ""
              )}
            </View>

            <View
              style={{
                gap: 5,
              }}
            >
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "black", fontWeight: 600 }}>
                  TC Kimlik No
                </Text>
              </View>
              <TextInput
                value={IdCardNo}
                onChangeText={(value) => setIdCardNo(value)}
                style={styles.Input}
                placeholder="Tc Kimlik No"
                keyboardType="number-pad"
                maxLength={11}
              />
            </View>
            {/* Contracts */}
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() =>
                  handleCheckboxChange(
                    checked,
                    setChecked,
                    modalVisible,
                    setModalVisible,
                    "kurumsal-uyelik-sozlesmesi"
                  )
                }
                style={styles.checkboxContainer}
              >
                {checked ? (
                  <FontAwesome5Icon
                    name="check-square"
                    size={18}
                    color="black"
                  />
                ) : (
                  <FontAwesome5Icon name="square" size={18} color="black" />
                )}
                <Text
                  style={[
                    styles.checkboxLabel,
                    { color: errorStatu === 15 ? "red" : "black" },
                  ]}
                >
                  <Text
                    style={{
                      color: errorStatu === 15 ? "red" : "#027BFF",
                      fontSize: 13,
                    }}
                  >
                    Kurumsal üyelik sözleşmesini
                  </Text>{" "}
                  okudum onaylıyorum
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  handleCheckboxChange(
                    checked1,
                    setChecked1,
                    modalVisible2,
                    setModalVisible2,
                    "kvkk-politikasi"
                  )
                }
                style={[styles.checkboxContainer]}
              >
                {checked1 ? (
                  <FontAwesome5Icon
                    name="check-square"
                    size={18}
                    color="black"
                  />
                ) : (
                  <FontAwesome5Icon name="square" size={18} color="black" />
                )}
                <Text
                  style={[
                    styles.checkboxLabel,
                    { color: errorStatu === 15 ? "red" : "black" },
                  ]}
                >
                  <Text
                    style={{
                      color: errorStatu === 15 ? "red" : "#027BFF",
                      fontSize: 13,
                    }}
                  >
                    KVKK metnini
                  </Text>{" "}
                  okudum onaylıyorum
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  handleCheckboxChange(
                    checked2,
                    setChecked2,
                    modalVisible3,
                    setModalVisible3,
                    "gizlilik-sozlesmesi-ve-aydinlatma-metni"
                  )
                }
                style={styles.checkboxContainer}
              >
                {checked2 ? (
                  <FontAwesome5Icon
                    name="check-square"
                    size={18}
                    color="black"
                  />
                ) : (
                  <FontAwesome5Icon name="square" size={18} color="black" />
                )}
                <Text
                  style={[
                    styles.checkboxLabel,
                    { color: errorStatu === 15 ? "red" : "black" },
                  ]}
                >
                  <Text
                    style={{
                      color: errorStatu === 15 ? "red" : "#027BFF",
                      fontSize: 13,
                    }}
                  >
                    Gizlilik sözleşmesi ve aydınlatma metnini
                  </Text>{" "}
                  okudum onaylıyorum
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={toggleCheked3}
                style={styles.checkboxContainer}
              >
                {checked3 ? (
                  <FontAwesome5Icon
                    name="check-square"
                    size={18}
                    color="black"
                  />
                ) : (
                  <FontAwesome5Icon name="square" size={18} color="black" />
                )}
                <Text style={styles.checkboxLabel}>
                  İletişim bilgilerime kampanya, tanıtım ve reklam içerikli
                  ticari elektronik ileti gönderilmesine, bu amaçla kişisel
                  verilerimin “Emlaksepette” tarafından işlenmesine ve
                  tedarikçileri ve işbirlikçileri ile paylaşılmasına, bu
                  amaçlarla verilerimin yurt dışına aktarılmasına izin
                  veriyorum.
                </Text>
              </TouchableOpacity>
            </View>

            {/* Contract Finish */}

            {/* Register Button */}
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity style={styles.btnRegister} onPress={register}>
                <Text style={styles.btnRegisterText}>Üye Ol</Text>
              </TouchableOpacity>
            </View>
            {/* Register Button */}
          </View>
        </View>
        <Modal
          isVisible={showMailSendAlert}
          animationIn={"fadeInRightBig"}
          animationOut={"fadeOutLeftBig"}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <View style={{ gap: 10 }}>
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    backgroundColor: "#E54242",
                    borderRadius: 40,
                    padding: 6,
                  }}
                >
                  <MailCheck name="close" size={40} color={"#fff"} />
                </View>
              </View>
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    color: "#333",
                    letterSpacing: 0.5,
                  }}
                >
                  Lütfen Tüm Alanları Doldurunuz!
                </Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#E54242",
                    padding: 10,
                    width: "100%",
                    borderRadius: 5,
                  }}
                  onPress={() => setshowMailSendAlert(false)}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#ffff",
                      fontWeight: 500,
                    }}
                  >
                    Tamam
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={succesRegister}
          animationIn={"fadeInRightBig"}
          animationOut={"fadeOutLeftBig"}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#333" />
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              Giriş Sayfasına Yönlendiriliyorsunuz
            </Text>
          </View>
        </Modal>

        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          backdropColor="transparent"
          style={styles.modal2}
        >
          <SafeAreaView style={styles.modalContent2}>
            <ScrollView style={{ padding: 10 }}>
              <HTML source={{ html: Deals }} contentWidth={100} />

              <View style={{ alignItems: "center", paddingBottom: 20 }}>
                <TouchableOpacity
                  style={styles.Acceptbtn}
                  onPress={() => {
                    setChecked(!checked);
                    setModalVisible(false);
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Okudum kabul ediyorum
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </Modal>
        <Modal
          isVisible={modalVisible2}
          onBackdropPress={() => setModalVisible2(false)}
          backdropColor="transparent"
          style={styles.modal2}
        >
          <SafeAreaView style={styles.modalContent2}>
            <ScrollView style={{ padding: 10 }}>
              <HTML source={{ html: Deals }} contentWidth={100} />

              <View style={{ alignItems: "center", paddingBottom: 20 }}>
                <TouchableOpacity
                  style={styles.Acceptbtn}
                  onPress={() => {
                    setChecked1(true);
                    setModalVisible2(false);
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Okudum kabul ediyorum
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </Modal>
        <Modal
          isVisible={modalVisible3}
          onBackdropPress={() => setModalVisible3(false)}
          backdropColor="transparent"
          style={styles.modal2}
        >
          <SafeAreaView style={styles.modalContent2}>
            <ScrollView style={{ padding: 10 }}>
              <HTML source={{ html: Deals }} contentWidth={100} />

              <View style={{ alignItems: "center", paddingBottom: 20 }}>
                <TouchableOpacity
                  style={styles.Acceptbtn}
                  onPress={() => {
                    setChecked2(true);
                    setModalVisible3(false);
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Okudum kabul ediyorum
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#ebebeb",
    borderRadius: 5,
    padding: 8,
    fontSize: 14, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#eaeff5",
    borderRadius: 5,
    padding: 6,
    fontSize: 14, // to ensure the text is never behind the icon
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  Input: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#ebebeb",
    borderRadius: 5,
    fontSize: 13,
    backgroundColor: "#FAFAFA",
    color: "#717171",
    fontWeight: "600",
  },
  btnRegister: {
    backgroundColor: "#E54242",
    padding: 9,
    borderRadius: 5,
    width: "90%",
  },
  btnRegisterText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  modal: {
    justifyContent: "center",
    margin: 0,
    padding: 30,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 40,
    gap: 20,
    borderRadius: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  itemContainer: {
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "#ebebeb",
    marginTop: 10,
    padding: 10,
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
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 13,
    flex: 1,
    marginLeft: 5,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxInner: {
    width: 18,
    height: 18,
    backgroundColor: "green",
  },
});
