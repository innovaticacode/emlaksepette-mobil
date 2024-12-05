import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/EvilIcons";
import Icon3 from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import RNPickerSelect from "react-native-picker-select";
import { Platform } from "react-native";
import Arrow from "react-native-vector-icons/SimpleLineIcons";
import * as ImagePicker from "expo-image-picker";
import ColorPicker from "react-native-wheel-color-picker";
import { getValueFor } from "../../../components/methods/user";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
import * as Progress from "react-native-progress";
import AdduserIcon from "react-native-vector-icons/AntDesign";
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Dialog,
} from "react-native-alert-notification";
import { Forms } from "../../../components/ProfileUpgradeComponents/formshelper";
import ImageView from "react-native-image-viewing";
import {
  apiRequestPostWithBearer,
  apiUrl,
  frontEndUriBase,
} from "../../../components/methods/apiRequest";
import {
  formatPhoneNumber,
  formatPhoneNumberNew,
} from "../../../utils/FormatPhoneNumber";
import { areaData } from "../../helper";
import ImageViewing from "react-native-image-viewing";
export default function UpgradeProfile() {
  const route = useRoute();
  const { name, tab } = route.params;
  const [choose, setchoose] = useState(false);
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const images = [
    {
      uri: `${frontEndUriBase}images/phone-update-image/phonefile.jpg`,
    },
  ];
  const [cities, setCities] = useState([]);
  const [counties, setCounties] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);
  const [openAccor, setopenAccor] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setfile] = useState(null);
  const [TaxOfficesCities, setTaxOfficesCities] = useState([]);
  const [TaxOffice, setTaxOffice] = useState([]);
  const [openColorPicker, setopenColorPicker] = useState(false);
  const [swatchesLast, setSwatchesLast] = useState(false);
  const [swatchesEnabled, setSwatchesEnabled] = useState(true);
  const [chooseFile, setchooseFile] = useState(false);
  const [user, setUser] = useState({});
  const [namFromGetUser, setnamFromGetUser] = useState({});
  const [currentColor, setCurrentColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [region, setRegion] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [areaCode, setareaCode] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loadingUpdate, setloadingUpdate] = useState(false);
  const initialFormData = {
    name: "",
    mobile_phone: "",
    new_phone_number: "",
    store_name: "",
    username: "",
    authority_licence: "",
    iban: "",
    website: "",
    phone: "",
    year: "",
    city_id: "",
    county_id: "",
    neighborhood_id: "",
    taxOfficeCity: "",
    taxOffice: "",
    taxNumber: "",
    email: "",
    idNumber: "",
    new_mobile_phone: "",
  };
  const [formData, setFormData] = useState(initialFormData);

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

  const takePhoto = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log("Camera Result:", result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const photo = result.assets[0];
        console.log("Selected Photo Details:", {
          uri: photo.uri,
          type: photo.type,
          name: photo.fileName || "photo.jpg",
          width: photo.width,
          height: photo.height,
        });

        setImage(photo); // Çekilen fotoğrafı state'e kaydediyoruz
        setchoose(false); // Modal'ı kapatıyoruz
      } else {
        console.log("Photo capture was canceled or no photo was taken.");
      }
    } catch (error) {
      console.error("Camera Error:", error);
      alert("Kamera kullanılırken bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const removeProfileImage = () => {
    setImage(null); // Fotoğrafı null yaparak yerelde kaldırıyoruz
    setchoose(false); // Modal'ı kapatıyoruz
  };

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
      setchooseFile(false);
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

  const takePhotoforFile = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setfile(result.assets[0].uri);
      setchooseFile(false);
    }
  };

  const uniqueCities = TaxOfficesCities.map((city) => ({
    label: city.il,
    value: city.plaka,
  })) // Şehir isimlerini ve plakalarını map'le
    .filter(
      (city, index, self) =>
        index ===
        self.findIndex((c) => c.label === city.label && c.value === city.value) // Benzersiz olmasını kontrol et
    );
  const fetchTaxOffice = async (value) => {
    try {
      const response = await axios.get(`${apiUrl}get-tax-office/${value}`);
      setTaxOffice(response.data);
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };

  const onchangeTaxOffice = (value) => {
    fetchTaxOffice(value);
  };
  const fetchCity = async () => {
    try {
      const response = await axios.get(`${apiUrl}cities`);

      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchCity()
      .then((citites) => setCities(citites.data))
      .catch((error) =>
        console.error("Veri alınırken bir hata oluştu:", error)
      );
  }, []);
  const fetchCounties = async (value) => {
    try {
      const response = await axios.get(`${apiUrl}counties/${value}`);
      setCounties(response.data.data);
      setSelectedCounty(null); // Seçili ilçe sıfırla
      setSelectedNeighborhood(null); // Seçili mahalleyi sıfırla
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  const fetchNeighborhoods = async (value) => {
    try {
      const response = await axios.get(`${apiUrl}neighborhoods/${value}`);
      setNeighborhoods(response.data.data); // Gelen mahalle verisini set et

      setSelectedNeighborhood(null); // Seçili mahalleyi sıfırla
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  const onChangeCity = (value) => {
    setSelectedCity(value);
    setTimeout(() => {
      if (value) {
        fetchCounties(value);
      }
    }, 600);
  };

  const onChangeCounty = (value) => {
    setTimeout(() => {
      if (value) {
        fetchNeighborhoods(value);
      }
    }, 900);
  };

  const onChangeNeighborhood = (value) => {
    setTimeout(() => {
      if (value) {
      }
    }, 800);
  };

  const onColorChangeComplete = (color) => {
    // Renk değişimi tamamlandığında burada istediğiniz işlemleri yapabilirsiniz
  };
  const initialRegion = {
    latitude: parseFloat(39.9334),
    longitude: parseFloat(32.8597),
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const GetUserInfo = async () => {
    setLoading(true);
    try {
      if (user.access_token) {
        const userInfo = await axios.get(`${apiUrl}user`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });

        setnamFromGetUser(userInfo?.data);
      }
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Eğer user bilgileri geldiyse, GetUserInfo fonksiyonunu çalıştır
    GetUserInfo();
  }, [user]);

  useEffect(() => {
    if (Object.keys(namFromGetUser).length > 0) {
      setFormData({
        name: namFromGetUser.name || "",
        mobile_phone: namFromGetUser.mobile_phone || "",
        new_phone_number: namFromGetUser.new_phone_number || "",
        store_name: namFromGetUser.store_name || "",
        username: namFromGetUser.username || "",
        authority_licence: namFromGetUser.authority_licence || "",
        iban: namFromGetUser.iban || "",
        website: namFromGetUser.website || "",
        phone: formatPhoneNumber(namFromGetUser.phone) || "",
        year: namFromGetUser.year || "",
        city_id: namFromGetUser.city_id || "",
        county_id: namFromGetUser.county_id || "",
        neighborhood_id: namFromGetUser.neighborhood_id || "",
        taxOfficeCity: namFromGetUser.taxOfficeCity || "",
        taxOffice: namFromGetUser.taxOffice || "",
        taxNumber: namFromGetUser.taxNumber || "",
        email: namFromGetUser?.email || "",
        idNumber: namFromGetUser.idNumber || "",
      });
      setCurrentColor(namFromGetUser.banner_hex_code);
      setareaCode(namFromGetUser.area_code);
      setImage(namFromGetUser?.profile_image);
      setTimeout(() => {
        onChangeCity(namFromGetUser.city_id);
        onChangeCounty(namFromGetUser.county_id);
        onChangeNeighborhood(namFromGetUser.neighborhood_id);
        onchangeTaxOffice(namFromGetUser.taxOfficeCity);
        setRegion(initialRegion);
      }, 500);
    }
  }, [namFromGetUser]);
  const formatIban = (text) => {
    // Sadece harfleri ve rakamları içeren bir metin oluştur
    const cleanedText = text.replace(/[^a-zA-Z0-9]/g, "");

    // Eğer metin TR ile başlamıyorsa başa ekle
    let formattedText = cleanedText.startsWith("TR")
      ? cleanedText
      : "TR" + cleanedText;

    // TR sonrası sadece rakamlar olmalı
    formattedText = formattedText.replace(/[^0-9]/g, "");

    // İlk iki rakam TR'den sonra gelecek
    const firstTwo = formattedText.slice(0, 2);
    // Sonraki rakamlar dörderli gruplara ayrılacak
    const rest = formattedText.slice(2);

    // IBAN'ı 4 haneli bloklar halinde gruplandır
    let groups = [];
    for (let i = 0; i < rest.length; i += 4) {
      groups.push(rest.substring(i, i + 4));
    }

    // Gruplandırılmış metni birleştir ve başına 'TR' ve ilk iki rakamı ekle
    let finalIban = `TR${firstTwo} ${groups.join(" ")}`.trim();

    // IBAN maksimum 32 karakter uzunluğunda olmalı (TR dahil)
    return finalIban.substring(0, 32);
  };

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
    if (key == "city_id") {
      onChangeCity(key);
    }
  };

  const onColorChange = (color) => {
    setCurrentColor(color);
  };

  const formattedTaxOfficePlace = TaxOffice.map((item) => ({
    label: item.daire,
    value: item.id.toString(), // id değerini string olarak çevirme
  }));

  const getItemsForKey = (key) => {
    switch (key) {
      case "city_id":
        return cities;
      case "county_id":
        return counties;
      case "neighborhood_id":
        return neighborhoods;
      case "taxOfficeCity":
        return uniqueCities;
      case "taxOffice":
        return formattedTaxOfficePlace;
      default:
        return [];
    }
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });
  };

  const handleProfileUpdate = async (data) => {
    if (image?.uri) {
      console.log("Valid Image Details:", {
        uri: image.uri,
        type: image.mimeType || "image/jpeg",
        name: image.fileName || "photo.jpg",
        size: image.size,
        width: image.width,
        height: image.height,
      });
    } else {
      console.error("Image is missing or invalid.");
      return;
    }

    data.append("banner_hex_code", currentColor);
    data.append("profile_image", {
      uri:
        Platform.OS === "android"
          ? image.uri
          : image.uri.replace("file://", ""),
      type: image.mimeType || "image/jpeg",
      name: image.fileName || "photo.jpg",
    });

    try {
      const response = await axios.post(`${apiUrl}profil-duzenleme`, data, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.debug("Profil düzenleme çalıştı", response.data);
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Başarılı",
        textBody: response?.data?.message || "Profil başarıyla güncellendi.",
        button: "Tamam",
        onHide: () => GetUserInfo(),
      });
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleEmailUpdate = async (data) => {
    console.debug("E-posta güncelleme işlemi başlatıldı.");

    try {
      const response = await axios.post(
        `${apiUrl}e-posta-adresimi-degistir`,
        { new_email: formData.new_email },
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      );
      if (response.data) {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Başarılı",
          textBody: "E-posta adresiniz başarıyla güncellendi.",
          button: "Tamam",
        });
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const handlePhoneUpdate = async () => {
    const data = new FormData();
    data.append("mobile_phone", formData.mobile_phone);
    data.append("new_mobile_phone", formData.new_mobile_phone);
    data.append("change_reason", formData.change_reason);

    if (file) {
      data.append("verify_document", {
        uri: Platform.OS === "android" ? file : file.uri.replace("file://", ""),
        type: file.mimeType || "application/octet-stream",
        name: file.name || "Document.jpeg",
      });
    }

    try {
      const response = await axios.post(
        `${apiUrl}telefon-numarasi-sms-gonderimi`,
        data,
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        navigation.replace("VerifyPhoneChange", {
          phone: formData.new_mobile_phone,
        });
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleGeneralUpdate = async (data) => {
    //  data.append("_method", "PUT");
    data.append("banner_hex_code", currentColor);

    try {
      const response = await axios.post(`${apiUrl}magaza-bilgileri`, data, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.debug("response", response.data);
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Başarılı",
        textBody: response?.data?.message,
        button: "Tamam",
        onHide: () => {
          GetUserInfo();
        },
      });
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleApiError = (error) => {
    if (error.response) {
      console.error("Sunucu Yanıt Hatası:", error.response.data);
      console.error("Status:", error.response.status);
      Dialog.show({
        type: ALERT_TYPE.ERROR,
        title: "Hata",
        textBody: error.response.data.message,
        button: "Tamam",
      });
    } else if (error.request) {
      console.error("İstek Gönderildi Ama Yanıt Alınamadı:", error.request);
      Dialog.show({
        type: ALERT_TYPE.ERROR,
        title: "Hata",
        textBody: error.response.data.message,
        button: "Tamam",
      });
    } else {
      console.error("Hata Mesajı:", error.message);
      Dialog.show({
        type: ALERT_TYPE.ERROR,
        title: "Hata",
        textBody: error.response.data.message,
        button: "Tamam",
      });
    }
  };
  const handeStoreUpdate = async (data) => {
    try {
      const response = await axios.post(`${apiUrl}magaza-bilgileri`, data, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.debug("response", response.data);
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Başarılı",
        textBody: "Mağaza Bilgileriniz başarıyla güncellendi.",
        button: "Tamam",
        onHide: () => GetUserInfo(),
      });
    } catch (error) {
      handleApiError(error);
    }
  };
  const postData = async (param) => {
    setloadingUpdate(true);
    const data = new FormData();

    // Form verilerini ekliyoruz
    Forms.filter(
      (item) => Array.isArray(item.tab) && item.tab.includes(tab)
    ).forEach((item) => {
      data.append(item.key, formData[item.key]);
    });

    // Tab'a göre işlem
    switch (tab) {
      case 0:
        await handleProfileUpdate(data);
        break;
      case 1:
        await handleEmailUpdate(data);
        break;
      case 2:
        await handlePhoneUpdate(data);
        break;

      default:
        await handleGeneralUpdate(data);
    }
    setloadingUpdate(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS ve Android için farklı davranışlar
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // iOS için klavyenin üstünde kalacak şekilde offset ayarı
    >
      <AlertNotificationRoot>
        {loading ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size={"large"} color={user.banner_hex_code} />
          </View>
        ) : (
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40, gap: 20 }}
          >
            <ImageViewing
              images={[
                {
                  uri: `${frontEndUriBase}storage/profile_images/${namFromGetUser.profile_image}`,
                },
              ]}
              imageIndex={0}
              visible={isVisible}
              onRequestClose={() => setIsVisible(false)}
            />
            <View
              style={{
                width: "100%",
                backgroundColor: currentColor,
                padding: 15,
                alignItems: "center",
              }}
            >
              {(tab == 0 || tab == 4) && (
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
                      <TouchableOpacity
                        onPress={() => {
                          setIsVisible(true);
                        }}
                      >
                        {image || image?.uri ? (
                          image?.uri ? (
                            <Image
                              source={{ uri: image.uri }}
                              style={{ width: "100%", height: "100%" }}
                              borderRadius={50}
                            />
                          ) : (
                            <Image
                              source={{
                                uri: `${frontEndUriBase}storage/profile_images/${namFromGetUser.profile_image}`,
                              }}
                              style={{ width: "100%", height: "100%" }}
                              borderRadius={50}
                            />
                          )
                        ) : (
                          <AdduserIcon
                            name="adduser"
                            size={30}
                            color={"#737373"}
                          />
                        )}
                      </TouchableOpacity>
                    ) : (
                      <Icon2 name="user" size={65} color="#333" padding={10} />
                    )}
                  </View>
                </View>

                {tab == 0 && (
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
                <Text
                  style={{ fontSize: 11, color: "#fff", fontWeight: "700" }}
                >
                  {namFromGetUser.email}
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
                {Forms.map((item, i) => {
                  if (
                    (item?.key == "authority_licence" &&
                      item?.isShow == user?.corporate_type) ||
                    !item.isShow
                  ) {
                    return (
                      <View
                        key={i}
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
                        <View
                          style={{
                            flexDirection: item.showArea ? "row" : "",
                            overflow: "hidden",
                            borderRadius: 8,
                          }}
                        >
                          {item.showArea && (
                            <View style={{ width: "45%" }}>
                              <RNPickerSelect
                                doneText="Tamam"
                                value={areaCode}
                                placeholder={{
                                  label: "Seçiniz...",
                                  value: null,
                                }}
                                style={pickerSelectStyles}
                                onValueChange={(value) => {
                                  setareaCode(value);
                                }}
                                items={areaData}
                              />
                            </View>
                          )}

                          {item.type == "input" ? (
                            <View
                              style={{ width: item.showArea ? "55%" : "100%" }}
                            >
                              <TextInput
                                editable={item.disabled ? false : true}
                                maxLength={item.maxlength ? item.maxlength : 90}
                                placeholder={
                                  item.placeholder ? item.placeholder : ""
                                }
                                style={[
                                  styles.input,
                                  item.disabled ? { color: "grey" } : {},
                                ]}
                                value={formData[item.key]}
                                keyboardType={
                                  item.key === "iban" ||
                                  item.key === "phone" ||
                                  item.key === "taxNumber" ||
                                  item.key === "idNumber"
                                    ? "number-pad"
                                    : "default"
                                }
                                autoCapitalize={
                                  item.key === "website" ? "none" : "sentences"
                                }
                                onChangeText={(value) => {
                                  if (item.key === "iban") {
                                    // Eğer IBAN alanıysa formatlamayı uygula
                                    handleInputChange(
                                      item.key,
                                      formatIban(value)
                                    );
                                  } else {
                                    // Diğer alanlar için normal input değişikliği
                                    handleInputChange(item.key, value);
                                  }
                                  if (item.key === "new_phone_number") {
                                    handleInputChange(
                                      item.key,
                                      formatPhoneNumberNew(value)
                                    );
                                  }
                                  if (item.key === "phone") {
                                    handleInputChange(
                                      item.key,
                                      formatPhoneNumber(value)
                                    );
                                  }
                                  if (item.key === "idNumber") {
                                    handleInputChange(
                                      item.key,
                                      parseInt(value)
                                    );
                                  }
                                }}
                              />
                            </View>
                          ) : (
                            <View
                              style={{
                                borderRadius: 8,
                                overflow: "hidden",
                                borderColor: "#eaeff5",
                                borderWidth: 1,
                              }}
                            >
                              <RNPickerSelect
                                doneText="Tamam"
                                value={formData[item.key]}
                                placeholder={{
                                  label: "Seçiniz...",
                                  value: null,
                                }}
                                style={pickerSelectStyles}
                                onValueChange={(value) => {
                                  handleInputChange(item.key, value);
                                  if (item.key === "city_id") {
                                    onChangeCity(value);
                                  } else if (item.key === "county_id") {
                                    onChangeCounty(value);
                                  } else if (item.key === "neighborhood_id") {
                                    onChangeNeighborhood(value);
                                  } else if (item.key === "taxOfficeCity") {
                                    onchangeTaxOffice(value);
                                  }
                                }}
                                items={getItemsForKey(item.key)}
                              />
                            </View>
                          )}
                        </View>
                      </View>
                    );
                  }
                })}
                {tab == 2 && (
                  <>
                    <View style={[styles.card, { gap: 10 }]}>
                      <TouchableOpacity
                        onPress={() => {
                          setchooseFile(true);
                        }}
                      >
                        <View
                          style={{
                            width: "100%",
                            height: 150,
                            borderWidth: 1,
                            borderStyle: "dashed",
                            borderColor: "#F27B7D",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 9,
                          }}
                        >
                          {file && !isLoading ? (
                            <View style={{ width: "100%", height: "100%" }}>
                              <Image
                                source={{ uri: file }}
                                style={{ width: "100%", height: "100%" }}
                                borderRadius={9}
                              />
                            </View>
                          ) : (
                            <View
                              style={{
                                alignItems: "center",
                                backgroundColor: "#FDEAEA",
                                width: "100%",
                                height: "100%",
                                justifyContent: "center",
                              }}
                            >
                              <Feather
                                name="cloud-upload-outline"
                                size={60}
                                color={"#EA2B2E"}
                              />
                              <Text style={{ color: "#EA2B2E", fontSize: 13 }}>
                                Dosyanızı buraya yükleyiniz
                              </Text>
                            </View>
                          )}
                        </View>
                      </TouchableOpacity>
                      {isLoading && (
                        <View style={{ width: "100%" }}>
                          <Progress.Bar
                            color="#FDEAEA"
                            height={20}
                            progress={progress}
                            width={null}
                            style={{ flex: 1 }}
                            animated={true}
                            indeterminate={false}
                            indeterminateAnimationDuration={1000}
                          />
                          <View
                            style={{
                              position: "absolute",
                              right: 10,
                              justifyContent: "center",
                              top: 3,
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                gap: 10,
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "100%",
                              }}
                            >
                              <View style={{ paddingLeft: 30 }}>
                                <Text style={{ color: "#333", fontSize: 10 }}>
                                  Belge Yükleniyor...
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  gap: 5,
                                  alignItems: "center",
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 11,
                                    color: "#333",
                                    textAlign: "center",
                                  }}
                                >
                                  {Math.round(progress * 100)}%
                                </Text>
                                <TouchableOpacity
                                  style={{}}
                                  hitSlop={{
                                    top: 10,
                                    bottom: 10,
                                    left: 10,
                                    right: 10,
                                  }}
                                >
                                  <Icon name="close" size={17} color={"#333"} />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                    <Collapse onToggle={() => setopenAccor(!openAccor)}>
                      <CollapseHeader>
                        <View
                          style={[
                            styles.card,
                            {
                              padding: 0,
                              flexDirection: "row",
                              justifyContent: "space-between",
                              paddingVertical: 10,
                            },
                          ]}
                        >
                          <Text style={{ color: "#333" }}>
                            Yüklemeniz Gereken Belge Örneği
                          </Text>
                          <Arrow
                            name={openAccor ? "arrow-down" : "arrow-right"}
                            size={15}
                            color={"grey"}
                          />
                        </View>
                      </CollapseHeader>
                      <CollapseBody style={{}}>
                        <View
                          style={[
                            styles.card,
                            {
                              gap: 15,
                              paddingHorizontal: 4,
                              paddingVertical: 8,
                              alignItems: "center",
                            },
                          ]}
                        >
                          <TouchableOpacity
                            onPress={() => setIsImageVisible(true)}
                          >
                            <View style={{ width: 250, height: 200 }}>
                              <Image
                                source={{
                                  uri: `${frontEndUriBase}images/phone-update-image/phonefile.jpg`,
                                }}
                                style={{ width: "100%", height: "100%" }}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                      </CollapseBody>
                    </Collapse>
                    <ImageView
                      images={images}
                      imageIndex={0}
                      visible={isImageVisible}
                      onRequestClose={() => setIsImageVisible(false)}
                    />
                  </>
                )}
              </View>
            </View>

            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => postData()}
                style={{
                  width: "100%",
                  backgroundColor: "#EA2B2E",
                  width: "90%",
                  padding: 10,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {loadingUpdate ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#fff",
                      fontWeight: "600",
                    }}
                  >
                    Güncelle
                  </Text>
                )}
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
                    onPress={() => takePhoto()}
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
                    onPress={() => {
                      removeProfileImage();
                      postData(1);
                    }} // Yalnızca yerelde kaldırmak isterseniz bu işlevi kullanın
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
                    onPress={() => pickImageForfile()}
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
                    onPress={() => takePhotoforFile()}
                  >
                    <Icon3 name="add-a-photo" size={21} color={"#333"} />
                    <Text
                      style={{ fontSize: 14, color: "#333", fontWeight: "700" }}
                    >
                      Fotoğraf Çek
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setfile(null);
                      setchooseFile(false);
                    }}
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
          </ScrollView>
        )}
      </AlertNotificationRoot>
    </KeyboardAvoidingView>
  );
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: "100%",
    backgroundColor: "#F3F3F3",
    borderWidth: 1,
    borderColor: "#ebebeb",
    borderRadius: 8,
    padding: 8,
    fontSize: 14, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    width: "100%",
    backgroundColor: "#F3F3F3",
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
    backgroundColor: "#fff",
  },
  titles: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingLeft: 10,
  },
  input: {
    padding: 10,
    backgroundColor: "#F3F3F3",
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
