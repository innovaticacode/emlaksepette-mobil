import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";

import RNPickerSelect from "react-native-picker-select";
import { addDotEveryThreeDigits } from "../../../components/methods/merhod";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon3 from "react-native-vector-icons/MaterialIcons";
import Modal from "react-native-modal";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from "react-native-alert-notification";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getValueFor } from "../../../components/methods/user";
import { ActivityIndicator } from "react-native-paper";
import { Platform } from "react-native";

export default function SwapForm({ openModal, color }) {
  const [SwapChoose, setSwapChoose] = useState("");
  const [estateChoose, setestateChoose] = useState("");
  {
    /*/ Konut  */
  }
  const [city, setcity] = useState("");
  const [county, setcounty] = useState("");
  const [houseType, sethouseType] = useState("");
  const [roomCount, setroomCount] = useState("");
  const [houseAge, sethouseAge] = useState("");
  const [useStatus, setuseStatus] = useState("");
  const [YourPrice, setYourPrice] = useState("");
  {
    /*/ Konut  */
  }
  {
    /*/ Arsa */
  }
  const [AreaCity, setAreaCity] = useState("");
  const [AreaCounty, setAreaCounty] = useState("");
  const [AreaNeigbour, setAreaNeigbour] = useState("");
  const [AreaPlaceInfo, setAreaPlaceInfo] = useState("");
  const [AreaStatu, setAreaStatu] = useState("");
  const [YourAreaPrice, setYourAreaPrice] = useState("");
  {
    /*/ Arsa */
  }

  {
    /*/ İş Yeri */
  }
  const [TradeInfo, setTradeInfo] = useState("");
  const [yourPriceShop, setyourPriceShop] = useState("");
  {
    /*/ İş Yeri */
  }

  {
    /*/ Araç */
  }
  const [CarYear, setCarYear] = useState("");
  const [carModal, setcarModal] = useState("");
  const [fuelType, setfuelType] = useState("");
  const [shiftType, setshiftType] = useState("");
  const [Price, setPrice] = useState("");
  {
    /*/ Araç */
  }
  {
    /*/ Barter */
  }
  const [Barter, setBarter] = useState("");
  {
    /*/ Barter */
  }
  {
    /*/ Other*/
  }
  const [OtherInfo, setOtherInfo] = useState("");
  {
    /*/ Other*/
  }
  const [user, setUser] = useState({});
  useEffect(() => {
    getValueFor("user", setUser);
  }, []);
  const [name, setname] = useState("");
  const [surname, setsurname] = useState("");
  const [phoneNmber, setphoneNmber] = useState("");
  const [email, setemail] = useState("");
  const [loading, setloading] = useState(false);
  const route = useRoute();
  const { houseid } = route.params;
  const [data, setData] = useState({});
  const [namFromGetUser, setnamFromGetUser] = useState([]);

  // const GetUserInfo =async ()=>{

  //    try {
  //      if (user?.access_token && user) {
  //        const userInfo = await axios.get(
  //          "http://192.168.18.32:8000/api/users/" + user?.id,
  //          {
  //            headers: {
  //              Authorization: `Bearer ${user?.access_token}`,
  //            },
  //          }
  //        );
  //        const userData = userInfo?.data?.user
  //        setnamFromGetUser(userData)

  //      }

  //    } catch (error) {
  //      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
  //    }finally{

  //    }
  //  }

  const fetchDetails = async () => {
    try {
      setloading(true);
      const response = await axios.get(
        `http://192.168.18.32:8000/api/housing/${houseid}`
      );
      setloading(false);
      // GetUserInfo()
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setloading(false); // İstek tamamlandığında loading durumunu false yap
    }
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  const [loadingPost, setloadingPost] = useState(false);
  const postData = async () => {
    setloadingPost(true);
    try {
      var formData = new FormData();
      formData.append("ad", name);
      formData.append("soyad", surname);
      formData.append("telefon", phoneNmber);
      formData.append("email", email);
      formData.append("sehir", city);
      formData.append("ilce", county);
      formData.append("takas_tercihi", SwapChoose);
      formData.append("store_id", data?.housing?.user?.id);
      formData.append("emlak_tipi", estateChoose);
      formData.append("konut_tipi", houseType);
      formData.append("oda_sayisi", roomCount);
      formData.append("konut_yasi", houseAge);
      formData.append("kullanim_durumu", useStatus);
      formData.append("konut_satis_rakami", YourPrice);
      formData.append("arsa_il", AreaCity);
      formData.append("arsa_ilce", AreaCounty);
      formData.append("arsa_mahalle", AreaNeigbour);
      formData.append("ada_parsel", AreaPlaceInfo);
      formData.append("imar_durumu", AreaStatu);
      formData.append("satis_rakami", addDotEveryThreeDigits(YourAreaPrice));
      formData.append("ticari_bilgiler", TradeInfo);
      formData.append("isyeri_satis_rakami", yourPriceShop);
      formData.append("arac_model_yili", CarYear);
      formData.append("arac_markasi", carModal);
      formData.append("yakit_tipi", fuelType);
      formData.append("vites_tipi", shiftType);
      formData.append("arac_satis_rakami", Price);
      formData.append("barter_detay", Barter);
      if (SwapChoose == "emlak") {
        formData.append(
          "tapu_belgesi",
          image
            ? {
                name: image.fileName,
                type: image.type,
                uri:
                  Platform.OS === "android"
                    ? image.uri
                    : image.uri.replace("file://", ""),
              }
            : null
        );
      }
      if (SwapChoose == "araç") {
        formData.append(
          "ruhsat_belgesi",
          image
            ? {
                name: image.fileName,
                type: image.type,
                uri:
                  Platform.OS === "android"
                    ? image.uri
                    : image.uri.replace("file://", ""),
              }
            : null
        );
      }

      const response = await axios.post(
        "http://192.168.18.32:8000/api/swap",
        formData
      );

      // İsteğin başarılı bir şekilde tamamlandığı durum

      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Başarılı",
        textBody: "Takas Başvurunuz Başarıyla Gönderildi",
        button: "Tamam",
      });

      // openModal(JSON.stringify(response.data.message));

      setname("");
      setsurname("");
      setphoneNmber("");
      setemail("");
      setcity("");
      setcounty("");
      setSwapChoose("");
      setAreaCity("");
      setAreaCounty("");
      setAreaNeigbour("");
      setAreaPlaceInfo("");
      setAreaStatu("");
      setCarYear("");
      setNeigbour("");
      setcarModal("");
      setYourAreaPrice("");
      setYourPrice("");
      sethouseAge("");
      sethouseType("");
      setshiftType("");
      setyourPriceShop("");
      setfuelType("");
      setImage(null);
      setPdfFile(null);
      setselectedPdfUrl(null);
      setSelectedDocumentName(null);
    } catch (error) {
      // Hata durumunda

      console.error("Hata:", error + " post isteği başarısız ");
    } finally {
      setloadingPost(false);
    }
  };

  // Buton tetikleyicisi için bir fonksiyon
  const handleButtonPress = () => {
    GiveOffer();
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.18.32:8000/api/cities"
      );
      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };

  const [citites, setCities] = useState([]);
  useEffect(() => {
    fetchData()
      .then((citites) => setCities(citites.data))
      .catch((error) =>
        console.error("Veri alınırken bir hata oluştu:", error)
      );
  }, []);

  const [counties, setcounties] = useState([]);
  const fetchDataCounty = async (value) => {
    try {
      const response = await axios.get(
        `http://192.168.18.32:8000/api/counties/${value}`
      );
      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
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
  const [areaCounty, setareaCounty] = useState([]);
  const onChangeAreaCity = (value) => {
    setAreaCity(value);
    if (value) {
      fetchDataCounty(value)
        .then((county) => setareaCounty(county.data))
        .catch((error) =>
          console.error("Veri alınırken bir hata oluştu:", error)
        );
    } else {
      setareaCounty([]);
    }
  };
  const [Neigbour, setNeigbour] = useState([]);
  const fetchDataNeigbour = async (value) => {
    try {
      const response = await axios.get(
        `http://192.168.18.32:8000/api/neighborhoods/${value}`
      );
      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };

  const onChangeCounty = (value) => {
    setAreaCounty(value);
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

  const pickerData = [];
  for (let i = 0; i <= 100; i++) {
    pickerData.push({ label: i.toString(), value: i });
  }

  // 1990'dan 2024'e kadar olan yılları içeren bir dizi oluşturuyoruz
  const years = [];
  for (let year = 2024; year >= 1990; year--) {
    years.push({ label: year.toString(), value: year.toString() }); // Her yılı string olarak ekliyoruz
  }
  const roomCounts = [
    { label: "1+0", value: "1+0" },
    { label: "1.5+1", value: "1.5+1" },
    { label: "2+0", value: "2+0" },
    { label: "2+1", value: "2+1" },
    { label: "2.5+1", value: "2.5+1" },
    { label: "3+0", value: "3+0" },
    { label: "3+1", value: "3+1" },
    { label: "3.5+1", value: "3.5+1" },
    { label: "3+2", value: "3+2" },
    { label: "3+3", value: "3+3" },
    { label: "4+0", value: "4+0" },
    { label: "4+1", value: "4+1" },
    { label: "4.5+1", value: "4.5+1" },
    { label: "4+2", value: "4+2" },
    { label: "4+3", value: "4+3" },
    { label: "4+4", value: "4+4" },
    { label: "5+1", value: "5+1" },
    { label: "5.5+1", value: "5.5+1" },
    { label: "5+2", value: "5+2" },
    { label: "5+3", value: "5+3" },
    { label: "5+4", value: "5+4" },
    { label: "6+1", value: "6+1" },
    { label: "6+2", value: "6+2" },
    { label: "6.5+1", value: "6.5+1" },
    { label: "6+3", value: "6+3" },
    { label: "6+4", value: "6+4" },
    { label: "7+1", value: "7+1" },
    { label: "7+2", value: "7+2" },
    { label: "7+3", value: "7+3" },
    { label: "8+1", value: "8+1" },
    { label: "8+2", value: "8+2" },
    { label: "8+3", value: "8+3" },
    { label: "8+4", value: "8+4" },
    { label: "9+1", value: "9+1" },
    { label: "9+2", value: "9+2" },
    { label: "9+3", value: "9+3" },
    { label: "9+4", value: "9+4" },
    { label: "9+5", value: "9+5" },
    { label: "9+6", value: "9+6" },
    { label: "10+1", value: "10+1" },
    { label: "10+2", value: "10+2" },
    { label: "11+1", value: "11+1" },
    { label: "12 ve üzeri", value: "12 ve üzeri" },
  ];
  const carBrands = [
    { label: "Alfa Romeo", value: "Alfa Romeo" },
    { label: "Aston Martin", value: "Aston Martin" },
    { label: "Audi", value: "Audi" },
    { label: "Bentley", value: "Bentley" },
    { label: "BMW", value: "BMW" },
    { label: "Bugatti", value: "Bugatti" },
    { label: "Buick", value: "Buick" },
    { label: "Cadillac", value: "Cadillac" },
    { label: "Chery", value: "Chery" },
    { label: "Chevrolet", value: "Chevrolet" },
    { label: "Chrysler", value: "Chrysler" },
    { label: "Citroen", value: "Citroen" },
    { label: "Cupra", value: "Cupra" },
    { label: "Dacia", value: "Dacia" },
    { label: "DS Automobiles", value: "DS Automobiles" },
    { label: "Daewoo", value: "Daewoo" },
    { label: "Daihatsu", value: "Daihatsu" },
    { label: "Dodge", value: "Dodge" },
    { label: "Ferrari", value: "Ferrari" },
    { label: "Fiat", value: "Fiat" },
    { label: "Ford", value: "Ford" },
    { label: "Geely", value: "Geely" },
    { label: "Honda", value: "Honda" },
    { label: "Hyundai", value: "Hyundai" },
    { label: "Infiniti", value: "Infiniti" },
    { label: "Isuzu", value: "Isuzu" },
    { label: "Iveco", value: "Iveco" },
    { label: "Jaguar", value: "Jaguar" },
    { label: "Jeep", value: "Jeep" },
    { label: "Kia", value: "Kia" },
    { label: "Lada", value: "Lada" },
    { label: "Lamborghini", value: "Lamborghini" },
    { label: "Lancia", value: "Lancia" },
    { label: "Land-rover", value: "Land-rover" },
    { label: "Leapmotor", value: "Leapmotor" },
    { label: "Lexus", value: "Lexus" },
    { label: "Lincoln", value: "Lincoln" },
    { label: "Lotus", value: "Lotus" },
    { label: "Maserati", value: "Maserati" },
    { label: "Mazda", value: "Mazda" },
    { label: "McLaren", value: "McLaren" },
    { label: "Mercedes-Benz", value: "Mercedes-Benz" },
    { label: "MG", value: "MG" },
    { label: "Mini", value: "Mini" },
    { label: "Mitsubishi", value: "Mitsubishi" },
    { label: "Nissan", value: "Nissan" },
    { label: "Opel", value: "Opel" },
    { label: "Peugeot", value: "Peugeot" },
    { label: "Porsche", value: "Porsche" },
    { label: "Proton", value: "Proton" },
    { label: "Renault", value: "Renault" },
    { label: "Rolls Royce", value: "Rolls Royce" },
    { label: "Rover", value: "Rover" },
    { label: "Saab", value: "Saab" },
    { label: "Seat", value: "Seat" },
    { label: "Skoda", value: "Skoda" },
    { label: "Smart", value: "Smart" },
    { label: "Ssangyong", value: "Ssangyong" },
    { label: "Subaru", value: "Subaru" },
    { label: "Suzuki", value: "Suzuki" },
    { label: "Tata", value: "Tata" },
    { label: "Tesla", value: "Tesla" },
    { label: "Tofaş", value: "Tofaş" },
    { label: "Toyota", value: "Toyota" },
    { label: "Volkswagen", value: "Volkswagen" },
    { label: "Volvo", value: "Volvo" },
    { label: "Voyah", value: "Voyah" },
    { label: "Yudo", value: "Yudo" },
  ];
  const apiUrl = "http://192.168.18.32:8000/";
  const [errorMessage, seterrorMessage] = useState("");

  const AlertFunc = (message) => {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: "Tüm Alanları Doldurunuz",
      textBody: `${message}`,
      button: "Tamam",
    });
  };
  const GiveOffer = () => {
    switch (true) {
      case !name:
        AlertFunc("İsim Alanı Boş Bırakılmaz");

        break;
      case !surname:
        AlertFunc("Soyadı Boş Bırakılamaz");
        break;
      case !phoneNmber:
        AlertFunc("Geçerli bir telefon numarası giriniz");
        break;
      case !email:
        AlertFunc("Mail alanı boş bırakılamaz");
        break;
      case !city:
        AlertFunc("Şehir Seçiniz");
        break;
      case !county:
        AlertFunc("İlçe Seçniz");
        break;
      case !SwapChoose:
        AlertFunc("Takas Tercihi Boş Bırakılamaz");
        break;

      default:
        postData();
    }
  };
  const [choose, setchoose] = useState(false);
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // Galeriye erişim izni iste
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "İzin Gerekli",
        "Fotoğraf seçmek için galeri iznine ihtiyacımız var."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0]);
      setchoose(false);
      setPdfFile(null);
      setselectedPdfUrl(null);
      setSelectedDocumentName(null);
    }
  };

  const takePhoto = async () => {
    // Kameraya erişim izni iste
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

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0]);
      setchoose(false);
      setPdfFile(null);
      setselectedPdfUrl(null);
      setSelectedDocumentName(null);
    }
  };
  const [selectedDocumentName, setSelectedDocumentName] = useState(null);

  const [pdfFile, setPdfFile] = useState(null);
  const [selectedPdfUrl, setselectedPdfUrl] = useState(null);
  const pickDocument = async () => {
    DocumentPicker.getDocumentAsync({ type: "application/pdf" })
      .then((result) => {
        console.log(
          "Seçilen PDF Dosyasının İçeriği:",
          JSON.stringify(result, null, 2)
        );

        if (!result.canceled && result.assets && result.assets.length > 0) {
          const pdfAsset = result.assets[0];
          setPdfFile(pdfAsset);
          setSelectedDocumentName(pdfAsset.name);
          console.log(pdfAsset.uri);
          setselectedPdfUrl(pdfAsset.uri);
          setImage(null);
          setchoose(false);
          console.log(selectedDocumentName);
        }
      })
      .catch((error) => {
        alert("hata");
      });
  };
  const openPdf = async () => {
    if (selectedPdfUrl) {
      try {
        const contentUri = await FileSystem.getContentUriAsync(selectedPdfUrl);
        IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: contentUri,
          flags: 1,
          type: "application/pdf",
        });
      } catch (error) {
        console.error("PDF açılırken hata oluştu:", error);
      }
    } else {
      Alert.alert("PDF dosyası bulunamadı");
    }
  };
  const navigation = useNavigation();
  return (
    <AlertNotificationRoot>
      {loading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            backgroundColor: "white",
          }}
        >
          <ActivityIndicator color="#333" size={"large"} />
        </View>
      ) : (
        <KeyboardAwareScrollView
          style={{ padding: 10, gap: 10, backgroundColor: "#ffffff" }}
          contentContainerStyle={{ gap: 10, paddingBottom: 50 }}
        >
          <View style={{ flexDirection: "row", gap: 4 }}>
            <View style={{ flex: 0.5 / 2 }}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: "red",
                  borderRadius: 5,
                }}
              >
                {data && data?.housing && data?.housing?.housing_type_data && (
                  <ImageBackground
                    source={{
                      uri: `${apiUrl}housing_images/${
                        JSON.parse(data?.housing?.housing_type_data)["image"]
                      }`,
                    }}
                    style={{ width: "100%", height: "100%" }}
                    borderRadius={5}
                  />
                )}
              </View>
            </View>
            <View style={{ flex: 1.5 / 2, gap: 4 }}>
              <View style={{ flex: 1 / 2, paddingTop: 2 }}>
                <Text numberOfLines={2} style={{ color: "#333", fontSize: 13 }}>
                  {data?.pageInfo?.meta_title}
                </Text>
              </View>
              <View style={{ flex: 1 / 2, gap: 4, paddingTop: 2, bottom: 0 }}>
                <Text
                  style={{ fontSize: 12, fontWeight: "600", color: "#333" }}
                >
                  Satıcı:{" "}
                  <Text style={{ fontWeight: "400" }}>
                    {data?.housing?.user?.name}
                  </Text>
                </Text>
                <Text
                  style={{ fontSize: 12, fontWeight: "600", color: "#333" }}
                >
                  İlan No:{" "}
                  <Text style={{ fontWeight: "400" }}>
                    2000{data?.housing?.id}
                  </Text>
                </Text>
                <Text
                  style={{ fontSize: 12, color: "#264ABB", fontWeight: "700" }}
                >
                  {data &&
                    data.housing &&
                    addDotEveryThreeDigits(
                      JSON.parse(data.housing.housing_type_data)["price"]
                    )}{" "}
                  ₺
                </Text>
              </View>
            </View>
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>
              Ad:
            </Text>
            <TextInput
              style={styles.Input}
              value={name}
              onChangeText={(value) => setname(value)}
            />
          </View>

          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>
              Soyad
            </Text>
            <TextInput
              style={styles.Input}
              value={surname}
              onChangeText={(value) => setsurname(value)}
            />
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>
              Telefon Numaranız
            </Text>
            <TextInput
              style={styles.Input}
              value={phoneNmber}
              onChangeText={(value) => {
                const numericValue = value.replace(/[^0-9]/g, ""); // Sadece sayı olan karakterleri alır
                setphoneNmber(numericValue);
              }}
              maxLength={11}
              keyboardType="number-pad" // Sadece sayısal giriş için klavye türü
            />
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>
              E-mail
            </Text>
            <TextInput
              style={styles.Input}
              value={email}
              onChangeText={(value) => setemail(value)}
            />
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>
              Şehir
            </Text>
            <RNPickerSelect
              doneText="Tamam"
              placeholder={{
                label: "Şehir Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
              value={city}
              onValueChange={(value) => {
                onChangeCity(value);
              }}
              items={citites}
            />
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>
              İlçe
            </Text>
            <RNPickerSelect
              doneText="Tamam"
              placeholder={{
                label: "İlçe Seçiniz...",
                value: null,
              }}
              value={county}
              style={pickerSelectStyles}
              onValueChange={(value) => setcounty(value)}
              items={counties}
            />
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>
              Takas Tercihiniz
            </Text>
            <RNPickerSelect
              doneText="Tamam"
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              value={SwapChoose}
              style={pickerSelectStyles}
              onValueChange={(value) => setSwapChoose(value)}
              items={[
                { label: "Emlak", value: "emlak" },
                { label: "Araç", value: "araç" },
                { label: "Barter", value: "barter" },
                { label: "Diğer", value: "Diğer" },
              ]}
            />
          </View>
          <View
            style={{ gap: 6, display: SwapChoose == "emlak" ? "flex" : "none" }}
          >
            <Text style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>
              Emlak Tipi
            </Text>
            <RNPickerSelect
              doneText="Tamam"
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
              onValueChange={(value) => setestateChoose(value)}
              items={[
                { label: "Konut", value: "konut" },
                { label: "Arsa", value: "arsa" },
                { label: "İş Yeri", value: "işyeri" },
              ]}
            />
          </View>
          {estateChoose == "konut" && SwapChoose == "emlak" ? (
            <>
              <View style={{ gap: 6 }}>
                <Text style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>
                  Konut Tipi
                </Text>
                <RNPickerSelect
                  doneText="Tamam"
                  placeholder={{
                    label: "Seçiniz...",
                    value: null,
                  }}
                  style={pickerSelectStyles}
                  onValueChange={(value) => sethouseType(value)}
                  items={[
                    { label: "Daire", value: "daire" },
                    { label: "Villa", value: "villa" },
                    { label: "Residance", value: "residance" },
                    { label: "Prefabrik Ev", value: "prefabrik_ev" },
                    { label: "Çiftlik Evi", value: "çiftlik_evi" },
                  ]}
                />
              </View>
              <View style={{ gap: 6 }}>
                <Text style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>
                  Oda Sayısı
                </Text>
                <RNPickerSelect
                  doneText="Tamam"
                  placeholder={{
                    label: "Seçiniz...",
                    value: null,
                  }}
                  style={pickerSelectStyles}
                  onValueChange={(value) => setroomCount(value)}
                  items={roomCounts}
                />
              </View>
              <View style={{ gap: 6 }}>
                <Text style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>
                  Konut Yaşı
                </Text>
                <RNPickerSelect
                  doneText="Tamam"
                  placeholder={{
                    label: "Seçiniz...",
                    value: null,
                  }}
                  style={pickerSelectStyles}
                  onValueChange={(value) => sethouseAge(value)}
                  items={pickerData}
                />
              </View>
              <View style={{ gap: 6 }}>
                <Text style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>
                  Kullanım Durumu
                </Text>
                <RNPickerSelect
                  doneText="Tamam"
                  placeholder={{
                    label: "Seçiniz...",
                    value: null,
                  }}
                  style={pickerSelectStyles}
                  onValueChange={(value) => setuseStatus(value)}
                  items={[
                    { label: "Kiracılı", value: "kiracılı" },
                    { label: "Boş", value: "boş" },
                    { label: "Mülk Sahibi", value: "mülk sahibi" },
                  ]}
                />
              </View>
              <View style={{ gap: 6 }}>
                <Text style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>
                  Düşündüğünüz Satış Rakamı
                </Text>
                <TextInput
                  style={styles.Input}
                  value={YourPrice}
                  onChangeText={(value) => setYourPrice(value)}
                  keyboardType="number-pad"
                />
              </View>
            </>
          ) : (
            <></>
          )}

          {estateChoose == "arsa" && SwapChoose == "emlak" ? (
            <>
              <View style={{ gap: 6 }}>
                <Text style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>
                  Arsa İli
                </Text>
                <RNPickerSelect
                  doneText="Tamam"
                  placeholder={{
                    label: "Seçiniz...",
                    value: null,
                  }}
                  value={AreaCity}
                  style={pickerSelectStyles}
                  onValueChange={(value) => {
                    onChangeAreaCity(value);
                  }}
                  items={citites}
                />
              </View>
              <View style={{ gap: 6 }}>
                <Text style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>
                  Arsa İlçe
                </Text>
                <RNPickerSelect
                  doneText="Tamam"
                  placeholder={{
                    label: "Seçiniz...",
                    value: null,
                  }}
                  value={AreaCounty}
                  style={pickerSelectStyles}
                  onValueChange={(value) => {
                    onChangeCounty(value);
                  }}
                  items={areaCounty}
                />
              </View>
              <View style={{ gap: 6 }}>
                <Text style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>
                  Arsa Mahalle
                </Text>
                <RNPickerSelect
                  doneText="Tamam"
                  placeholder={{
                    label: "Seçiniz...",
                    value: null,
                  }}
                  style={pickerSelectStyles}
                  onValueChange={(value) => setAreaNeigbour(value)}
                  items={Neigbour}
                />
              </View>
              <View style={{ gap: 6 }}>
                <Text style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>
                  Ada Parsel Bilgisi
                </Text>
                <TextInput
                  style={styles.Input}
                  value={AreaPlaceInfo}
                  onChangeText={(value) => setAreaPlaceInfo(value)}
                />
              </View>
              <View style={{ gap: 6 }}>
                <Text style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>
                  Arsa İmar Durumu
                </Text>
                <RNPickerSelect
                  doneText="Tamam"
                  placeholder={{
                    label: "Seçiniz...",
                    value: null,
                  }}
                  style={pickerSelectStyles}
                  onValueChange={(value) => setAreaStatu(value)}
                  items={[
                    { label: "Diğer", value: "Diğer" },
                    { label: "Villa", value: "Villa" },
                    { label: "Konut", value: "Konut" },
                    { label: "Turizm", value: "Turizm" },
                    { label: "Tarla", value: "Tarla" },
                    { label: "Sanayi", value: "Sanayi" },
                    { label: "Ticari", value: "Ticari" },
                    { label: "Bağ Bahçe", value: "Bağ Bahçe" },
                  ]}
                />
              </View>
              <View style={{ gap: 6 }}>
                <Text style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>
                  Düşündüğünüz Satış Rakamı
                </Text>
                <TextInput
                  style={styles.Input}
                  value={YourAreaPrice}
                  onChangeText={(value) => setYourAreaPrice(value)}
                />
                <Text>{}</Text>
              </View>
            </>
          ) : (
            <></>
          )}
          {SwapChoose == "araç" ? (
            <>
              <View style={{ gap: 6 }}>
                <Text style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>
                  Araç Model Yılı
                </Text>
                <RNPickerSelect
                  doneText="Tamam"
                  placeholder={{
                    label: "Seçiniz...",
                    value: null,
                  }}
                  style={pickerSelectStyles}
                  onValueChange={(value) => setCarYear(value)}
                  items={years}
                />
              </View>

              <View style={{ gap: 6 }}>
                <Text style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>
                  Araba Markası
                </Text>
                <RNPickerSelect
                  doneText="Tamam"
                  placeholder={{
                    label: "Seçiniz...",
                    value: null,
                  }}
                  value={carModal}
                  style={pickerSelectStyles}
                  onValueChange={(value) => setcarModal(value)}
                  items={carBrands}
                />
              </View>
              <View style={{ gap: 6 }}>
                <Text style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>
                  Yakıt Tipi
                </Text>
                <RNPickerSelect
                  doneText="Tamam"
                  placeholder={{
                    label: "Seçiniz...",
                    value: null,
                  }}
                  style={pickerSelectStyles}
                  onValueChange={(value) => setfuelType(value)}
                  items={[
                    { label: "Benzin", value: "benzin" },
                    { label: "Dizel", value: "dizel" },
                    { label: "LPG", value: "LPG" },
                    { label: "Elektrik", value: "elektrik" },
                  ]}
                />
              </View>
              <View style={{ gap: 6 }}>
                <Text style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>
                  Vites Tipi
                </Text>
                <RNPickerSelect
                  doneText="Tamam"
                  placeholder={{
                    label: "Seçiniz...",
                    value: null,
                  }}
                  style={pickerSelectStyles}
                  onValueChange={(value) => setshiftType(value)}
                  items={[
                    { label: "Manuel", value: "manuel" },
                    { label: "Otomatik", value: "otomatik" },
                  ]}
                />
              </View>
              <View style={{ gap: 6 }}>
                <Text style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>
                  Satış Rakamı
                </Text>
                <TextInput
                  style={styles.Input}
                  value={Price}
                  onChangeText={(value) => setPrice(value)}
                />
              </View>
              {image ? (
                <View style={{ alignItems: "center" }}>
                  <View style={{ width: 300, height: 150 }}>
                    <ImageBackground
                      source={image}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </View>
                </View>
              ) : (
                <></>
              )}
              <View style={{ gap: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ gap: 10 }}>
                    {!image && (
                      <Text
                        style={{
                          color: "#333",
                          fontSize: 14,
                          fontWeight: "700",
                        }}
                      >
                        Ruhsat Belgesi Yükleyiniz
                      </Text>
                    )}

                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: image ? "center" : "flex-start",
                        gap: 20,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          setchoose(true);
                        }}
                        style={{
                          backgroundColor: "#EC302E",
                          padding: 10,
                          width: image ? "45%" : "80%",
                          borderRadius: 5,
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            color: "white",
                            fontWeight: "600",
                          }}
                        >
                          Yükle
                        </Text>
                      </TouchableOpacity>
                      {image && (
                        <TouchableOpacity
                          onPress={() => {
                            setImage(null);
                          }}
                          style={{
                            backgroundColor: "#EC302E",
                            padding: 10,
                            width: "45%",
                            borderRadius: 5,
                          }}
                        >
                          <Text
                            style={{
                              textAlign: "center",
                              color: "white",
                              fontWeight: "600",
                            }}
                          >
                            Kaldır
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </>
          ) : (
            <></>
          )}
          {estateChoose == "işyeri" && SwapChoose == "emlak" ? (
            <>
              <View style={{ gap: 6 }}>
                <Text style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>
                  Ticari ile ilgili Bilgileri Giriniz
                </Text>
                <TextInput
                  style={styles.Input}
                  value={TradeInfo}
                  onChangeText={(value) => setTradeInfo(value)}
                />
              </View>
              <View style={{ gap: 6 }}>
                <Text style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>
                  Düşündüğünüz Satış Rakamı
                </Text>
                <TextInput
                  style={styles.Input}
                  value={yourPriceShop}
                  onChangeText={(value) => setyourPriceShop(value)}
                />
              </View>
            </>
          ) : (
            <></>
          )}
          {SwapChoose == "barter" ? (
            <>
              <View style={{ gap: 6 }}>
                <Text style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>
                  Lütfen barter durumunuz ile ilgili detaylı bilgileri giriniz
                </Text>
                <TextInput
                  style={styles.Input}
                  value={Barter}
                  onChangeText={(value) => setBarter(value)}
                />
              </View>
            </>
          ) : (
            <></>
          )}
          {SwapChoose == "Diğer" ? (
            <>
              <View style={{ gap: 6 }}>
                <Text style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>
                  Takas ile ilgili ürün/hizmet detayı:
                </Text>
                <TextInput
                  style={styles.Input}
                  value={OtherInfo}
                  onChangeText={(value) => setOtherInfo(value)}
                />
              </View>
            </>
          ) : (
            <></>
          )}

          {SwapChoose == "emlak" &&
            SwapChoose == "emlak" &&
            (estateChoose == "konut" ||
              estateChoose == "arsa" ||
              estateChoose == "işyeri") && (
              <>
                {image ? (
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <View style={{ width: 300, height: 150 }}>
                      <ImageBackground
                        source={image}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </View>
                  </View>
                ) : (
                  <></>
                )}
                <View style={{ gap: 10 }}>
                  {!image && !selectedDocumentName && (
                    <Text
                      style={{ color: "#333", fontSize: 15, fontWeight: "700" }}
                    >
                      Tapu Belgesi Yükleyiniz
                    </Text>
                  )}
                  {selectedDocumentName && !image && (
                    <Text
                      style={{ color: "#333", fontWeight: "700", fontSize: 12 }}
                    >
                      Seçilen Dosya : {selectedDocumentName}
                    </Text>
                  )}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent:
                        image || selectedDocumentName ? "center" : "flex-start",
                      gap: 15,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        if (selectedDocumentName || image) {
                          setImage(null);
                          setSelectedDocumentName(null);
                          setselectedPdfUrl(null);
                        } else {
                          setchoose(true);
                        }
                      }}
                      style={{
                        backgroundColor: "#EC302E",
                        padding: 10,
                        width: "45%",
                        borderRadius: 5,
                      }}
                    >
                      {selectedDocumentName || image ? (
                        <Text
                          style={{
                            textAlign: "center",
                            color: "white",
                            fontWeight: "600",
                          }}
                        >
                          Kaldır
                        </Text>
                      ) : (
                        <Text
                          style={{
                            textAlign: "center",
                            color: "white",
                            fontWeight: "600",
                          }}
                        >
                          Yükle
                        </Text>
                      )}
                    </TouchableOpacity>

                    {selectedDocumentName && !image && (
                      <TouchableOpacity
                        onPress={() => {
                          setImage(null);

                          if (Platform.OS === "android") {
                            openPdf();
                          } else if (Platform.OS === "ios") {
                            navigation.navigate("DecontPdf", {
                              name: selectedDocumentName,
                              pdfUri: selectedPdfUrl,
                            });
                          }
                        }}
                        style={{
                          backgroundColor: "#EC302E",
                          padding: 10,
                          width: "45%",
                          borderRadius: 5,
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            color: "white",
                            fontWeight: "600",
                          }}
                        >
                          Pdf Görüntüle
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </>
            )}

          <View>
            <TouchableOpacity
              onPress={handleButtonPress}
              style={styles.button}
              disabled={loadingPost}
            >
              {loadingPost ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Başvuruyu Tamamla</Text>
              )}
            </TouchableOpacity>
          </View>

          <Modal
            isVisible={choose}
            style={styles.modal2}
            animationIn={"slideInUp"}
            animationOut={"slideOutDown"}
            onBackdropPress={() => setchoose(false)}
            swipeDirection={["down"]}
            onSwipeComplete={() => setchoose(false)}
          >
            <View style={[styles.modalContent2, { paddingBottom: 10 }]}>
              <View style={{ paddingTop: 10, alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    width: "15%",
                    backgroundColor: "#c2c4c6",
                    padding: 4,
                    borderRadius: 50,
                  }}
                ></TouchableOpacity>
              </View>
              <View style={{ padding: 20, gap: 35, marginBottom: 10 }}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                  onPress={pickImage}
                >
                  <Icon3 name="photo" size={23} color={"#333"} />
                  <Text
                    style={{ fontSize: 14, color: "#333", fontWeight: "700" }}
                  >
                    Kütüphaneden Seç
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                  onPress={takePhoto}
                >
                  <Icon3 name="add-a-photo" size={21} color={"#333"} />
                  <Text
                    style={{ fontSize: 14, color: "#333", fontWeight: "700" }}
                  >
                    Fotoğraf Çek
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                  onPress={pickDocument}
                >
                  <Icon3 name="file-open" size={21} color={"#333"} />
                  <Text
                    style={{ fontSize: 14, color: "#333", fontWeight: "700" }}
                  >
                    Pdf Yükle
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </KeyboardAwareScrollView>
      )}
    </AlertNotificationRoot>
  );
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    padding: 10,
    borderWidth: 0.9,
    borderColor: "#DDDDDD",
    borderRadius: 5,
    fontSize: 13,
    backgroundColor: "#fafafafa",
    color: "#333",
    fontWeight: "600",
  },
  inputAndroid: {
    padding: 10,
    borderWidth: 0.9,
    borderColor: "#DDDDDD",
    borderRadius: 5,
    fontSize: 13,
    backgroundColor: "#fafafafa",
    color: "#333",
    fontWeight: "600", // to ensure the text is never behind the icon
  },
});
const styles = StyleSheet.create({
  Input: {
    padding: 10,
    borderWidth: 0.9,
    borderColor: "#DDDDDD",
    borderRadius: 5,
    fontSize: 13,
    backgroundColor: "#fafafafa",
    color: "#717171",
    fontWeight: "600",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#f7f7f7", // isteğe bağlı
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    padding: 20,
  },
  button: {
    backgroundColor: "#EC302E",
    padding: 10,
    borderRadius: 5,
    width: "100%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
  },
  modal2: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent2: {
    gap: 10,
    paddingBottom: 20,
    backgroundColor: "#F8F7F4",
    padding: 10,

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: "white",
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
