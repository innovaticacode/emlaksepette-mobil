import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Linking,
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
import { CheckBox } from "react-native-elements";
export default function UpgradeProfile() {
  const route = useRoute();
  const { name, tab } = route.params;
  const [choose, setchoose] = useState(false);
  const navigation = useNavigation();
  const [approve, setApprove] = useState(false);

  const [image, setImage] = useState(null);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const images = [
    {
      uri: `${frontEndUriBase}images/phone-update-image/phonefile.jpg`,
    },
  ];
  const formatDateInput = (value) => {
    // Sadece rakamları al ve maksimum 8 karakterle sınırla
    const digitsOnly = value.replace(/[^0-9]/g, "").slice(0, 8);

    // Rakamları bölümlere ayırarak tarih formatını uygula
    if (digitsOnly.length <= 2) {
      return digitsOnly; // İlk 2 rakam
    } else if (digitsOnly.length <= 4) {
      return `${digitsOnly.slice(0, 2)}.${digitsOnly.slice(2)}`; // İlk 2 rakam / sonraki 2 rakam
    } else {
      return `${digitsOnly.slice(0, 2)}.${digitsOnly.slice(
        2,
        4
      )}.${digitsOnly.slice(4)}`; // Gün/Ay/Yıl formatı
    }
  };
  const numericChange = (value) => {
    return value.replace(/[^0-9]/g, "").substring(0, 10);
  };

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
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [areaCode, setareaCode] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loadingUpdate, setloadingUpdate] = useState(false);
  const [phoneData, setPhoneData] = useState({});
  const [emailChangeData, setEmailChangeData] = useState({});
  const [personalChange, setPersonalChange] = useState({});
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
    corporate_type: "",
    tax_office_city: "",
    tax_office: "",
    vergi_kimlik_no: "",
    yetki_belgesi_no: "",
    neighborhood: "",
    address_explanation: "",
    sabit_telefon: "",
    latitude: "",
    longitude: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [corporateType, setCorporateType] = useState([]);
  const fetchCorporateType = async () => {
    try {
      const response = await axios.get(`${apiUrl}get-corporate-types`);

      const items = response.data.corporate_types.map((item) => ({
        label: item, // Gelen stringi label olarak kullan
        value: item, // Gelen stringi value olarak kullan
      }));
      setCorporateType(items); // Dönüştürülmüş veriyi kaydet
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  useEffect(() => {
    const fetchPhoneData = async () => {
      if (user?.access_token) {
        try {
          const response = await axios.get(
            "https://private.emlaksepette.com/api/telefon-numarasi-sms-gonderimi-kontrolu",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user?.access_token}`,
              },
            }
          );

          setPhoneData(response?.data); // Gelen veriyi state'e aktar
          setLoading(false); // Yükleme tamam
        } catch (error) {
          // setError("Bir hata oluştu");
          setLoading(false);
        }
      }
    };
    if (user?.access_token) {
      fetchPhoneData(); // API'yi çağır
    }
  }, [user]);

  useEffect(() => {
    const personalChangeData = async () => {
      if (user?.access_token) {
        try {
          const response = await axios.get(
            "https://private.emlaksepette.com/api/kisisel-profil-degisikligi-kontrolu", // API URL
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user?.access_token}`, // Bearer token
              },
            }
          );
          // console.log("API Response: budur", response.data);

          // console.log(
          //   "does_exist: true mi false mi gorcez",
          //   response.data.does_exist
          // );
          setPersonalChange(response?.data?.does_exist); // Gelen veriyi state'e aktar
        } catch (error) {
          console.error("API Hatası:", error);
          // setError("Bir hata oluştu");
        }
      }
    };

    if (user?.access_token) {
      personalChangeData(); // API'yi çağır
    }
  }, [user]);

  useEffect(() => {
    const emailFetchData = async () => {
      if (user?.access_token) {
        try {
          const res = await axios.get(`${apiUrl}e-posta-degisikligi-kontrolu`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.access_token}`,
            },
          });

          setEmailChangeData(res?.data);
        } catch (error) {
          // console.error("Hata Detayı:", err.message);
          if (error?.response) {
            // console.error("Yanıt Hatası:", err.res.data);
          }
        }
      }
    };
    if (user?.access_token) {
      emailFetchData();
    }
  }, [user]);

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

  const fetchTaxOfficesCities = async () => {
    try {
      const response = await axios.get(`${apiUrl}get-tax-offices`);
      if (response.data && Array.isArray(response.data)) {
        setTaxOfficesCities(response.data);
      } else {
        console.error("Beklenmeyen veri formatı:", response.data);
        setTaxOfficesCities([]);
      }
    } catch (error) {
      console.error("Tax offices verisi alınırken bir hata oluştu:", error);
      setTaxOfficesCities([]);
    }
  };

  useEffect(() => {
    if (tab == 5) {
      fetchTaxOfficesCities();
      fetchCorporateType();
    }
  }, [tab]);

  const uniqueCities = TaxOfficesCities?.length
    ? [
        ...new Set(TaxOfficesCities.map((city) => `${city.il}_${city.plaka}`)),
      ].map((uniqueKey) => {
        const [label, value] = uniqueKey.split("_");
        return { label, value };
      })
    : [];

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

      // Seçili mahalleyi sıfırla
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  const onChangeCity = (value) => {
    setSelectedCity(value);
    setNeighborhoods([]);
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
        corporate_type: namFromGetUser.corporate_type || "",
        vergi_kimlik_no: namFromGetUser.taxNumber || "",
        yetki_belgesi_no: namFromGetUser.authority_licence || "",
        address_explanation: namFromGetUser.address_explanation || "",
        sabit_telefon: namFromGetUser.phone || "",
        latitude: namFromGetUser.latitude || "",
        longitude: namFromGetUser.longitude || "",
      });
      setCurrentColor(namFromGetUser.banner_hex_code);
      setareaCode(namFromGetUser.area_code);
      setImage(namFromGetUser?.profile_image);
      onChangeCity(namFromGetUser?.city_id);
      onChangeCounty(namFromGetUser?.county_id);
      onChangeNeighborhood(namFromGetUser?.neighborhood_id);
      onchangeTaxOffice(namFromGetUser.taxOfficeCity);

      setRegion(initialRegion);
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
    // if (key == "city_id") {
    //   onChangeCity(key);
    // }
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
      case "corporate_type":
        return corporateType;
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
    if (user.type == 2) {
      if (image?.uri) {
        data.append("profile_image", {
          uri:
            Platform.OS === "android"
              ? image.uri
              : image.uri.replace("file://", ""),
          type: image.mimeType || "image/jpeg",
          name: image.fileName || "photo.jpg",
        });
      }
      data.append("banner_hex_code", currentColor);
      data.append("username", formData.username); //yetkili isim soyisim
      data.append("name", formData.name); //mağaza adı
      data.append("website", formData.website);
      data.append("year", formData.year);
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
          onHide: () => {
            navigation.navigate("UpdateProfile");
          },
        });

        console.debug("success", response.data);
      } catch (error) {
        handleApiError(error);
      }
    } else {
      if (image?.uri) {
        data.append("profile_image", {
          uri:
            Platform.OS === "android"
              ? image.uri
              : image.uri.replace("file://", ""),
          type: image.mimeType || "image/jpeg",
          name: image.fileName || "photo.jpg",
        });
      }
      data.append("banner_hex_code", currentColor);
      data.append("name", formData.name);
      data.append("iban", formData.iban);
      data.append("id_number", formData.idNumber);
      data.append("birthday", formData.year);
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

        console.debug("success", response.data);
      } catch (error) {
        handleApiError(error);
      }
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

      if (response.status === 200 && response.data) {
        navigation.replace("VerifyPhoneChange", {
          phone: formData.new_mobile_phone,
        });
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleApiError = (error) => {
    if (error.response) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Hata",
        textBody: "Beklenmeyen bir sorun oluştu",
        button: "Tamam",
      });
    } else if (error.request) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Hata",
        textBody: "Beklenmeyen bir sorun oluştu",
        button: "Tamam",
      });
    } else {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Hata",
        textBody: "Beklenmeyen bir sorun oluştu",
        button: "Tamam",
      });
    }
  };

  const handeStoreUpdate = async (data) => {
    data.append("commercial_title", formData.store_name);
    data.append("corporateType", formData.corporate_type);
    data.append("tax_office_city", formData.taxOfficeCity);
    data.append("tax_Office", formData.taxOffice);
    data.append("vergi_kimlik_no", formData.vergi_kimlik_no);
    data.append("yetki_belgesi_no", formData.yetki_belgesi_no);
    data.append("city", formData.city_id);
    data.append("district", formData.county_id);
    data.append("neighborhood", formData.neighborhood_id);
    data.append("address_explanation", formData.address_explanation);
    data.append("sabit_telefon", formData.sabit_telefon);
    data.append("latitude", formData.latitude);
    data.append("longitude", formData.longitude);

    console.log("district", formData.county_id);
    try {
      const response = await axios.post(`${apiUrl}magaza-bilgileri`, data, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

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
      case 5:
        if (approve) {
          await handeStoreUpdate(data);
        } else {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: "Uyarı",
            textBody: "Lütfen onay kutucuğunu işaretleyin.",
            button: "Tamam",
          });
        }
      default:
        null;
    }
    setloadingUpdate(false);
  };

  const linkKvkk = () => {
    Linking.openURL(`${frontEndUriBase}sayfa/kvkk-politikasi`);
  };

  return (
    <AlertNotificationRoot>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS ve Android için farklı davranışlar
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // iOS için klavyenin üstünde kalacak şekilde offset ayarı
      >
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
              {tab == 0 && user.type == 2 && personalChange === true && (
                <View style={styles.mesg}>
                  {tab == 0 && user.type == 2 && personalChange === true ? (
                    <View style={styles.messageBox}>
                      <Text style={styles.messageText}>
                        Profilinizi Güncelleme işlemi yaptınız, onay
                        bekliyorsunuz.
                      </Text>
                    </View>
                  ) : tab == 0 && user.type == 1 && personalChange === true ? (
                    <View style={styles.messageBox}>
                      <Text style={styles.messageText}>
                        Kişisel Bilgilerinizi Güncelleme işlemi yaptınız, onay
                        bekliyorsunuz.
                      </Text>
                    </View>
                  ) : null}
                </View>
              )}

              <View style={{ width: "90%", gap: 25 }}>
                {Forms.map((item, i) => {
                  if (
                    (item?.key == "authority_licence" &&
                      item?.isShow == user?.corporate_type &&
                      !item.isShow) ||
                    !item.isType ||
                    (Array.isArray(item.isType) &&
                      item.isType.includes(String(user.type)))
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
                          <Text style={styles.label}>
                            {user.type == 2 ? item.label : item.label2}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: item.showArea ? "row" : undefined, // "row" yerine undefined kullanmak daha güvenli olabilir
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
                                placeholder={item.placeholder || ""}
                                style={[
                                  styles.input,
                                  item.disabled ? { color: "grey" } : {},
                                ]}
                                value={formData[item.key]}
                                keyboardType={
                                  item.key === "iban" ||
                                  item.key === "phone" ||
                                  item.key === "taxNumber" ||
                                  item.key === "idNumber" ||
                                  item.key === "new_mobile_phone"
                                    ? "number-pad"
                                    : "default"
                                }
                                autoCapitalize={
                                  item.key === "website" ? "none" : "sentences"
                                }
                                onChangeText={(value) => {
                                  if (item.key === "iban") {
                                    handleInputChange(
                                      item.key,
                                      formatIban(value)
                                    );
                                  } else if (item.key === "new_phone_number") {
                                    handleInputChange(
                                      item.key,
                                      formatPhoneNumberNew(value)
                                    );
                                  } else if (item.key === "phone") {
                                    handleInputChange(
                                      item.key,
                                      formatPhoneNumber(value)
                                    );
                                  } else if (item.key === "idNumber") {
                                    handleInputChange(
                                      item.key,
                                      parseInt(value)
                                    );
                                  } else if (item.key === "username") {
                                    // Türkçe harfleri, boşlukları ve özel karakterleri kabul et, yalnızca sayıları engelle
                                    const filteredValue = value.replace(
                                      /[0-9]/g, // Rakamları sil
                                      ""
                                    );
                                    handleInputChange(item.key, filteredValue);
                                  } else if (item.key === "year") {
                                    const formattedValue =
                                      formatDateInput(value);
                                    handleInputChange(item.key, formattedValue);
                                  } else {
                                    handleInputChange(item.key, value);
                                  }
                                  if (item.key === "new_mobile_phone") {
                                    handleInputChange(
                                      item.key,
                                      numericChange(value)
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
              </View>
            </View>
            {tab == 5 && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  margin: 10,
                  justifyContent: "flex-start",
                }}
              >
                <CheckBox
                  checked={approve}
                  onPress={() => setApprove(!approve)}
                  checkedColor="#EA2B2E"
                  uncheckedColor="#EA2B2E"
                  containerStyle={{
                    margin: 0,
                    padding: 0,
                    backgroundColor: "transparent",
                    borderWidth: 0,
                  }}
                />
                <TouchableOpacity onPress={() => linkKvkk()}>
                  <Text
                    style={{
                      color: "#EA2B2E",
                      textDecorationLine: "underline",
                      fontSize: 14,
                    }}
                  >
                    KVKK politikasını
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: "center",
                    marginLeft: 2,
                  }}
                >
                  okudum onaylıyorum.
                </Text>
              </View>
            )}
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
      </KeyboardAvoidingView>
    </AlertNotificationRoot>
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
  mesg: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  messageBox: {
    backgroundColor: "#FFC107", // Sarı arka plan
    padding: 10,
    borderRadius: 10,
    width: "100%",

    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Android için gölge
  },
  messageText: {
    fontSize: 13,
    fontWeight: "regular",
    color: "#333", // Koyu gri renk
    textAlign: "center",
  },
});
