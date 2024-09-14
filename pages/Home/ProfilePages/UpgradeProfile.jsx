import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/EvilIcons";
import Icon3 from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome2 from "react-native-vector-icons/FontAwesome6";
import Feather from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";

import RNPickerSelect from "react-native-picker-select";
import { Platform } from "react-native";
import Arrow from "react-native-vector-icons/SimpleLineIcons";

import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import ColorPicker from "react-native-wheel-color-picker";
import { getValueFor } from "../../../components/methods/user";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Progress from "react-native-progress";
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Dialog,
} from "react-native-alert-notification";
import { Forms } from "../../../components/ProfileUpgradeComponents/formshelper";
export default function UpgradeProfile() {
  const route = useRoute();
  const { name, tab } = route.params;
  const [choose, setchoose] = useState(false);
  const PhotoUrl = "https://private.emlaksepette.com/storage/profile_images/";
  const [image, setImage] = useState(null);

  const [cities, setCities] = useState([]);
  const [counties, setCounties] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [openAccor, setopenAccor] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [file, setfile] = useState(null);

  const [namFromGetUser, setnamFromGetUser] = useState({});
  const [loading, setloading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
        }
      }
    })();
  }, []);
  //Profil Resmi İçin
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]); // Seçilen fotoğrafı state'e kaydediyoruz
      setchoose(false); // Modal'ı kapatıyoruz
    }
  };
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          // alert('Sorry, we need camera permissions to make this work!');
        }
      }
    })();
  }, []);

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]); // Çekilen fotoğrafı state'e kaydediyoruz
      setchoose(false); // Modal'ı kapatıyoruz
    }
  };

  const removeProfileImage = () => {
    setImage(null); // Fotoğrafı null yaparak yerelde kaldırıyoruz
    setchoose(false); // Modal'ı kapatıyoruz
  };

  //Cep Telefonu Numarası İçin
  const pickImageForfile = async () => {
    setIsLoading(true);
    setProgress(0);

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setfile(result.assets[0].uri);

      // Simulating an image upload with a timeout
      let uploadProgress = 0;
      const interval = setInterval(() => {
        uploadProgress += 0.1;
        setProgress(uploadProgress);
        if (uploadProgress >= 1) {
          clearInterval(interval);
          setIsLoading(false);
        }
      }, 500);
    } else {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          // alert('Sorry, we need camera permissions to make this work!');
        }
      }
    })();
  }, []);

  const takePhotoforFile = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setfile(result.assets[0].uri);
    }
  };

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);
  const [userImage, setuserImage] = useState(null);

  const formatPhoneNumber = (value) => {
    // Sadece rakamları al
    const cleaned = ("" + value).replace(/\D/g, "");

    // Numaranın uzunluğunu kontrol et
    if (cleaned.length > 10) {
      // Burada uygun bir hata mesajı gösterebilirsiniz
      return "Geçersiz numara";
    }

    // 0 ile başlıyorsa, ilk karakteri çıkar
    const cleanedWithoutLeadingZero = cleaned.startsWith("0")
      ? cleaned.substring(1)
      : cleaned;

    // Formatlı numarayı oluştur
    let formattedNumber = "";

    // Numaranın uzunluğuna göre formatı uygula
    for (let i = 0; i < cleanedWithoutLeadingZero.length; i++) {
      if (i === 3) formattedNumber += " ";
      if (i === 5) formattedNumber += " ";
      formattedNumber += cleanedWithoutLeadingZero[i];
    }

    // Formatlı numarayı döndür
    return formattedNumber;
  };

  useEffect(() => {
    GetUserInfo();
  }, [user]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          "https://private.emlaksepette.com/api/cities"
        );
        setCities(response.data.data);
      } catch (error) {
        console.error("Hata:", error);
        Alert.alert("Error", "Could not load cities");
      }
    };
    fetchCities();
  }, []);

  const fetchCounties = async () => {
    try {
      const response = await axios.get(
        `https://private.emlaksepette.com/api/counties/${selectedCity}`
      );
      setCounties(response.data.data);
      setSelectedCounty(null); // Seçili ilçe sıfırla
      setSelectedNeighborhood(null); // Seçili mahalleyi sıfırla
    } catch (error) {
      console.error("Hata:", error);
      Alert.alert("Error", "Could not load counties");
    }
  };
  useEffect(() => {
    fetchCounties();
  }, [selectedCity]);
  const fetchNeighborhoods = async () => {
    try {
      const response = await axios.get(
        `https://private.emlaksepette.com/api/neighborhoods/${selectedCounty}`
      );
      console.log("Neighborhoods Response:", response.data); // Yanıtı kontrol et
      setNeighborhoods(response.data.data);
      setSelectedNeighborhood(null); // Seçili mahalleyi sıfırla
    } catch (error) {
      console.error("Hata:", error);
      Alert.alert("Error", "Could not load neighborhoods");
    }
  };
  useEffect(() => {
    fetchNeighborhoods();
  }, [selectedCounty]);

  const onChangeCity = (value) => {
    setSelectedCity(value);
    setSelectedCounty(null);
    setSelectedNeighborhood(null);
    setCounties([]);
    setNeighborhoods([]);
    if (value) {
      fetchCounties(value);
    }
  };

  const onChangeCounty = (value) => {
    setSelectedCounty(value);
    setSelectedNeighborhood(null);
    setNeighborhoods([]);
    if (value) {
      fetchNeighborhoods(value);
    }
  };

  const onChangeNeighborhood = (value) => {
    setSelectedNeighborhood(value);
    if (value) {
    }
  };

  const areaData = [
    { label: "İstanbul Avrupa (212)", value: 212 },
    { label: "İstanbul Anadolu (216)", value: 216 },
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

  const [openColorPicker, setopenColorPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState(user.banner_hex_code);
  const [swatchesOnly, setSwatchesOnly] = useState(false);
  const [swatchesLast, setSwatchesLast] = useState(false);
  const [swatchesEnabled, setSwatchesEnabled] = useState(true);
  const [disc, setDisc] = useState(false);

  const onColorChange = (color) => {
    setData("backgroundColor", color);
  };
  const onColorChangeComplete = (color) => {
    // Renk değişimi tamamlandığında burada istediğiniz işlemleri yapabilirsiniz
  };
  useEffect(() => {
    setCurrentColor(user?.banner_hex_code);
  }, [user]);

  const [FormDatas, setFormDatas] = useState({
    backgroundColor: null,
    storeName: "",
    tradeName: null,
    userName: "",
    name: "",
    authorityLicence: null,
    Iban: null,
    webSiteLink: null,
    areaCode: null,
    companyPhone: null,
    SectorYear: null,

    taxOfficeCity: null,
    taxOffice: null,
    taxNumber: null,

    oldPhone: null,
    newPhone: null,
    fileForPhone: null,

    // Diğer form alanları buraya eklenebilir
  });

  const setData = (key, value) => {
    setFormDatas((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const updateUserData = async () => {
    try {
      const updateResponse = await axios.get(
        "https://private.emlaksepette.com/api/users/" + user?.id,
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
  const handleIbanChange = (text) => {
    // Harf ve rakamlardan başka karakterlerin girişini engelle
    text = text.replace(/[^A-Za-z0-9]/g, "");

    // Metnin başında TR olup olmadığını kontrol edin
    if (text.startsWith("TR")) {
      text = "TR" + text.substring(2).replace(/^TR/, ""); // Eğer başta TR varsa, fazladan TR'yi kaldırın
    } else {
      text = "TR" + text; // Eğer başta TR yoksa, başına TR ekleyin
    }

    // IBAN'ı 4 haneli gruplar halinde formatla
    const formattedText = text.match(/.{1,4}/g)?.join(" ") ?? text;

    setData("Iban", formattedText);
  };

  const checkInput = () => {
    if (tab === 0) {
      if (FormDatas.userName.length === 0 || FormDatas.Iban.length < 29) {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: "Hata",
          textBody: "Lütfen boş alan bırakmayın.",
          button: "Tamam",
        });
      } else {
        postData();
      }
    } else if (tab === 1) {
      if (
        FormDatas?.newPhone?.length < 15 ||
        FormDatas.oldPhone.length < 15 ||
        file == null
      ) {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: "Hata",
          textBody: "Lütfen girdiğiniz numaraları kontrol ediniz.",
          button: "Tamam",
        });
      } else {
        postData();
      }
    } else if (user.role === "Kurumsal Hesap") {
      if (tab === 2) {
        if (
          FormDatas?.companyName?.length === 0 ||
          FormDatas?.Iban?.length < 29 ||
          FormDatas?.SectorYear?.length === 0
        ) {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: "Hata",
            textBody: "Lütfen boş alan bırakmayınız.",
            button: "Tamam",
          });
        } else {
          postData();
        }
      } else if (tab === 3) {
        if (
          selectedCity == null ||
          selectedCounty == null ||
          selectedNeighborhood == null
        ) {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: "Hata!",
            textBody: "Lütfen il ilçe bilgileri giriniz.",
            button: "Tamam",
          });
        } else {
          postData();
        }
      }
    }
  };

  const postData = async () => {
    try {
      let fullNumber = `${FormDatas.cityCode}${FormDatas.phoneCompany}`;
      let formData = new FormData();

      if (user.role === "Bireysel Hesap") {
        formData.append("name", FormDatas.userName);
        formData.append("iban", FormDatas.Iban);
        formData.append(
          "profile_image",
          image
            ? {
                uri: image.uri,
                name: image.fileName,
                type: image.type,
              }
            : null
        );
        formData.append(
          "mobile_phone",
          FormDatas.newPhone ? FormDatas.newPhone : FormDatas.oldPhone
        );
        formData.append("banner_hex_code", FormDatas.backgroundColor);
        formData.append("_method", "PUT");
      } else {
        formData.append(
          "profile_image",
          image
            ? {
                uri: image.uri,
                name: image.fileName,
                type: image.type,
              }
            : null
        );
        formData.append("city_id", selectedCity);
        formData.append("county_id", selectedCounty);
        formData.append("neighborhood_id", selectedNeighborhood);
        formData.append("name", FormDatas.userName);
        formData.append("username", FormDatas.companyName);
        formData.append("banner_hex_code", FormDatas.backgroundColor);
        formData.append("iban", FormDatas.Iban);
        formData.append("website", FormDatas.webSiteLink);
        formData.append("phone", fullNumber);
        formData.append("year", FormDatas.SectorYear);
        formData.append(
          "mobile_phone",
          FormDatas.newPhone ? FormDatas.newPhone : FormDatas.oldPhone
        );
        formData.append("latitude", selectedLocation.latitude);
        formData.append("longitude", selectedLocation.longitude);
        formData.append("_method", "PUT");
      }

      const response = await axios.post(
        "https://private.emlaksepette.com/api/client/profile/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Başarılı",
        textBody: "Profiliniz başarıyla güncellendi.",
        button: "Tamam",
      });

      GetUserInfo();
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      Dialog.show({
        type: ALERT_TYPE.ERROR,
        title: "Hata",
        textBody: "Profil güncelleme sırasında bir hata oluştu.",
        button: "Tamam",
      });
    }
  };

  const [chooseFile, setchooseFile] = useState(false);
  const GetUserInfo = async () => {
    setloading(true);
    try {
      if (user.access_token && user.id) {
        const userInfo = await axios.get(
          "https://private.emlaksepette.com/api/users/" + user?.id,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        const userData = userInfo?.data?.user;
        setnamFromGetUser(userInfo?.data?.user);
      }
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    const formattedPhoneNumber = formatPhoneNumber(namFromGetUser.phone);
    setData("storeName", namFromGetUser?.name);
    setData("tradeName", namFromGetUser?.store_name);
    setData("userName", namFromGetUser?.username);
    setData("authorityLicence", namFromGetUser?.authority_licence);
    setData("Iban", namFromGetUser?.iban);
    setData("webSiteLink", namFromGetUser?.website);
    setData("companyPhone", namFromGetUser?.phone);
    setData("areaCode", namFromGetUser?.area_code);
    setData("SectorYear", namFromGetUser?.year);
    setData("backgroundColor", namFromGetUser.banner_hex_code);
    setSelectedCity(namFromGetUser.city_id);
    setSelectedCounty(namFromGetUser.county_id);
    setSelectedNeighborhood(namFromGetUser.neighborhood_id);
  }, [namFromGetUser]);
  const initialFormData = Forms.reduce((acc, field) => {
    acc[field.key] = '';
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    // Form gönderme işlemi
    console.log('Form Data:', formData);
  };
  return (
    <AlertNotificationRoot>
      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size={"large"} color={user.banner_hex_code} />
        </View>
      ) : (
        <KeyboardAwareScrollView
          style={styles.container}
          contentContainerStyle={{ gap: 20, paddingBottom: 40 }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: FormDatas.backgroundColor,
              padding: 15,
              alignItems: "center",
            }}
          >
            {(tab == 0 || tab == 2) && (
              <View style={{ width: "100%", alignItems: "flex-start" }}>
                <View
                  style={{
                    backgroundColor: "white",
                    flexDirection: "row",
                    padding: 4,
                    borderRadius: 50,
                    position: "absolute",
                    right: 0,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      padding: 4,
                      backgroundColor: currentColor,

                      borderWidth: 1,
                      borderColor: "#ebebeb",
                      borderRadius: 50,
                    }}
                    onPress={() => setopenColorPicker(!openColorPicker)}
                  >
                    <Feather name="brush" color={"white"} size={25} />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <View>
              <View style={{ width: 96, height: 96 }}>
                <View style={{ borderRadius: 50 }}>
                  {user.access_token ? (
                    <Image
                      source={
                        image
                          ? { uri: image.uri }
                          : { uri: PhotoUrl + namFromGetUser.profile_image }
                      }
                      style={{ width: "100%", height: "100%" }}
                      borderRadius={50}
                    />
                  ) : (
                    <Icon2 name="user" size={65} color="#333" padding={10} />
                  )}
                </View>
              </View>

              {(tab == 0 || tab == 2) && (
                <TouchableOpacity
                  onPress={() => {
                    setchoose(true);
                  }}
                  style={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    backgroundColor: "#777777",
                    borderRadius: 50,
                    padding: 4,
                  }}
                >
                  <View>
                    <Icon name="account-edit" size={25} color={"white"} />
                  </View>
                </TouchableOpacity>
              )}
            </View>

            <View style={{ alignItems: "center", paddingTop: 10, gap: 5 }}>
              {(tab == 0 || tab == 1) && (
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#fff" }}
                >
                  {namFromGetUser?.name}
                </Text>
              )}
              {user.type == 1 && (
                <Text
                  style={{ fontSize: 12, fontWeight: "500", color: "#fff" }}
                >
                  {user?.role}
                </Text>
              )}
              {(tab == 2 || tab == 3 || tab == 4) && (
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#fff" }}
                >
                  {namFromGetUser?.name}
                </Text>
              )}
              {user.type == 2 && (
                <Text
                  style={{ fontSize: 12, fontWeight: "500", color: "#fff" }}
                >
                  {user?.corporate_type}
                </Text>
              )}
              <Text style={{ fontSize: 11, color: "#fff", fontWeight: "700" }}>
                {user.email}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.card,
              { display: openColorPicker ? "flex" : "none" },
            ]}
          >
            <ColorPicker
              color={currentColor}
              swatchesOnly={false}
              onColorChange={onColorChange}
              onColorChangeComplete={onColorChangeComplete}
              thumbSize={50}
              sliderSize={20}
              noSnap={true}
              gapSize={0}
              sliderHidden={true}
              row={false}
              swatchesLast={swatchesLast}
              swatches={swatchesEnabled}
              discrete={false}
              useNativeDriver={true}
              useNativeLayout={false}
            />
          </View>

          <View style={{ width: "100%", alignItems: "center" }}>
           
            <View style={{ padding: 5, width: "90%", gap: 25 }}>
              {Forms.map((item, i) => (
                <View
                  style={{
                    gap: 7,
                    display:
                      Array.isArray(item?.tab) && item.tab.includes(tab)
                        ? "flex"
                        : "none",
                  }}
                >
           
                  <View style={{ paddingLeft: 5 }}>
                    <Text style={styles.label}>{item.label}</Text>
                  </View>
                  <View>
                    {item.type == "input" ? (
                      <TextInput
                        style={styles.input}
                        value={formData[item.key]}
                        onChangeText={(value) => handleInputChange(item.key, value)}
                      />
                    ) : (
                      <RNPickerSelect
                        doneText="Tamam"
                        value={formData[item.key]}
                        placeholder={{
                          label: "Seçiniz...",
                          value: null,
                        }}
                        style={pickerSelectStyles}
                        onValueChange={(value) => {
                          handleInputChange(item.key, value)
                        }}
                        items={cities}
                      />
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={{
                width: "100%",
                backgroundColor: "#EA2B2E",
                width: "90%",
                padding: 10,
                borderRadius: 10,
              }}
              onPress={checkInput}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontWeight: "600",
                }}
              >
                Güncelle
              </Text>
            </TouchableOpacity>
          </View>
          <Modal
            isVisible={choose}
            style={styles.modal2}
            animationIn={"fadeInDown"}
            animationOut={"fadeOutDown"}
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
                  onPress={removeProfileImage} // Yalnızca yerelde kaldırmak isterseniz bu işlevi kullanın
                  // onPress={removeProfileImageFromServer} // Sunucudan da kaldırmak isterseniz bu işlevi kullanın
                >
                  <Icon3
                    name="restore-from-trash"
                    size={22}
                    color={"#d83131"}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#d83131",
                      fontWeight: "700",
                    }}
                  >
                    Mevcut Fotoğrafı Kaldır
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal
            isVisible={chooseFile}
            style={styles.modal2}
            animationIn={"fadeInDown"}
            animationOut={"fadeOutDown"}
            onBackdropPress={() => setchooseFile(false)}
            swipeDirection={["down"]}
            onSwipeComplete={() => setchooseFile(false)}
          >
            <View style={styles.modalContent2}>
              <View style={{ padding: 10, alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    width: "15%",
                    backgroundColor: "#c2c4c6",
                    padding: 4,
                    borderRadius: 50,
                  }}
                ></TouchableOpacity>
              </View>
              <View style={{ padding: 20, gap: 35 }}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                  onPress={pickImageForfile}
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
                  onPress={takePhotoforFile}
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
                >
                  <Icon3
                    name="restore-from-trash"
                    size={22}
                    color={"#d83131"}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#d83131",
                      fontWeight: "700",
                    }}
                  >
                    Mevcut Fotoğrafı Kaldır
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
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#ebebeb",
    borderRadius: 8,
    padding: 8,
    fontSize: 14, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#eaeff5",
    borderRadius: 8,
    padding: 8,
    fontSize: 14, // to ensure the text is never behind the icon
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
  titles: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingLeft: 10,
  },
  input: {
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  label: {
    color: "#777777",
    fontSize: 13,
    fontWeight: "600",
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
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",

    borderWidth: 0.7,
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
  progressContainer: {
    position: "relative",
    width: 200,
    alignItems: "center",
    marginTop: 20,
  },
  progressText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    color: "#000",
    fontWeight: "bold",
  },
});
