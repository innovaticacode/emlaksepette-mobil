import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused, useRoute } from "@react-navigation/native";
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
import MapView, { Marker,PROVIDER_GOOGLE  } from "react-native-maps";
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
  

  const [openAccor, setopenAccor] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [file, setfile] = useState(null);
 

 

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


  const [TaxOfficesCities, setTaxOfficesCities] = useState([])
  const [TaxOffice, setTaxOffice] = useState([])
  useEffect(() => {
    const fetchTaxOfficeCity = async () => {
      try {
        const response = await axios.get(
          "https://private.emlaksepette.com/api/get-tax-offices"
        );
        setTaxOfficesCities(response.data)
      } catch (error) {
        console.error("Hata:", error);
        throw error;
      }
    };
    fetchTaxOfficeCity()
  }, [])
 
  const uniqueCities = TaxOfficesCities
  .map(city => ({ label: city.il, value: city.plaka })) // Şehir isimlerini ve plakalarını map'le
  .filter((city, index, self) => 
    index === self.findIndex((c) => c.label === city.label && c.value === city.value) // Benzersiz olmasını kontrol et
  );
  const fetchTaxOffice = async (value) => {
    try {
      const response = await axios.get(
        `https://private.emlaksepette.com/api/get-tax-office/${value}`
      );
      setTaxOffice(response.data)
    
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  }; 
  const onchangeTaxOffice=(value)=>{
    fetchTaxOffice(value)
  }
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

    
  const fetchCounties = async (value) => {
    try {
      const response = await axios.get(
        `https://private.emlaksepette.com/api/counties/${value}`
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
  }, []);
  const fetchNeighborhoods = async (value) => {
    try {
      const response = await axios.get(
        `https://private.emlaksepette.com/api/neighborhoods/${value}`
      );
   // Yanıtı kontrol et
      setNeighborhoods(response.data.data);
      setSelectedNeighborhood(null); // Seçili mahalleyi sıfırla
    } catch (error) {
      console.error("Hata:", error);
      Alert.alert("Error", "Could not load neighborhoods");
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

  const [swatchesOnly, setSwatchesOnly] = useState(false);
  const [swatchesLast, setSwatchesLast] = useState(false);
  const [swatchesEnabled, setSwatchesEnabled] = useState(true);
  const [disc, setDisc] = useState(false);


  const onColorChangeComplete = (color) => {
    // Renk değişimi tamamlandığında burada istediğiniz işlemleri yapabilirsiniz
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





  const [chooseFile, setchooseFile] = useState(false);


  const initialFormData = {
    name: '',
    mobile_phone: '',
    new_phone_number: '',
    store_name: '',
    username: '',
    authority_licence: '',
    iban: '',
    website: '',
    phone: '',
    year: '',
    city_id: '',
    county_id: '',
    neighborhood_id: '',
    taxOfficeCity: '',
    taxOffice: '',
    taxNumber: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false); // Yüklenme durumu
  const formatIban = (text) => {
    // Sadece harfleri ve rakamları içeren bir metin oluştur
    const cleanedText = text.replace(/[^a-zA-Z0-9]/g, '');

    // Eğer metin TR ile başlamıyorsa başa ekle
    let formattedText = cleanedText.startsWith('TR') ? cleanedText : 'TR' + cleanedText;

    // TR sonrası sadece rakamlar olmalı
    formattedText = formattedText.replace(/[^0-9]/g, '');

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
    let finalIban = `TR${firstTwo} ${groups.join(' ')}`.trim();

    // IBAN maksimum 32 karakter uzunluğunda olmalı (TR dahil)
    return finalIban.substring(0, 32);
  };

  const formatPhoneNumberNew = (value) => {
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
 

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
    if (key=='city_id') {
      onChangeCity(key)
    }
   
   
  };
  const [user, setUser] = useState({});
const [namFromGetUser, setnamFromGetUser] = useState({});
const [currentColor, setCurrentColor] = useState('');

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);
  
 
 
  useEffect(() => {
    const GetUserInfo = async () => {
      setLoading(true);
      try {
        if (user.access_token) {
          const userInfo = await axios.get(
            `https://private.emlaksepette.com/api/users/${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${user.access_token}`,
              },
            }
          );
          
          setnamFromGetUser(userInfo?.data?.user);
        }
      } catch (error) {
        console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };
  
    if (user.access_token) {
      // Eğer user bilgileri geldiyse, GetUserInfo fonksiyonunu çalıştır
      GetUserInfo();
    }
  }, [user]);
  
  // namFromGetUser güncellendiğinde form verilerini ve rengi güncelle

  useEffect(() => {
    
    if (Object.keys(namFromGetUser).length > 0) {
      setFormData({
        name: namFromGetUser.name || '',
        mobile_phone: namFromGetUser.mobile_phone || '',
        new_phone_number: namFromGetUser.new_phone_number || '',
        store_name: namFromGetUser.store_name || '',
        username: namFromGetUser.username || '',
        authority_licence: namFromGetUser.authority_licence || '',
        iban: namFromGetUser.iban || '',
        website: namFromGetUser.website || '',
        phone: formatPhoneNumber(namFromGetUser.phone)|| '',
        year: namFromGetUser.year || '',
        city_id: namFromGetUser.city_id || '',
        county_id: namFromGetUser.county_id || '',
        neighborhood_id: namFromGetUser.neighborhood_id || '',
        taxOfficeCity: namFromGetUser.taxOfficeCity || '',
        taxOffice: namFromGetUser.taxOffice || '',
        taxNumber: namFromGetUser.taxNumber || '',
      });
      setCurrentColor(namFromGetUser.banner_hex_code);
      setareaCode(namFromGetUser.area_code)
      setTimeout(() => {
       
        onChangeCity(namFromGetUser.city_id)
        onChangeCounty(namFromGetUser.county_id )
        onChangeNeighborhood(namFromGetUser.neighborhood_id)
        onchangeTaxOffice(namFromGetUser.taxOfficeCity)
     
      }, 500);
    
      
    }
  }, [namFromGetUser]);
 
  
  const onColorChange = (color) => {
    setCurrentColor(color)
   };
  

   const formattedTaxOfficePlace = TaxOffice.map((item) => ({
    label: item.daire,
    value: item.id.toString(), // id değerini string olarak çevirme
  }));
 
  const getItemsForKey = (key) => {
    switch (key) {
      case 'city_id':
        return cities;
      case 'county_id':
        return counties;
      case 'neighborhood_id':
        return neighborhoods;
        case 'taxOfficeCity':
          return uniqueCities;
          case 'taxOffice':
            return formattedTaxOfficePlace;
      default:
        return [];
    }
  }
  const [region, setRegion] = useState(null); 
  const initialRegion = {
    latitude: 39.9334,
    longitude: 32.8597,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };
  useEffect(() => {
    // API'den gelen koordinatları kontrol et, null ise varsayılanı kullan
    if (namFromGetUser.latitude != null && namFromGetUser.longitude != null) {
      setRegion({
        latitude:namFromGetUser.latitude  ,
        longitude: namFromGetUser.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    } else {
      // API'den değer gelmezse varsayılan konumu kullan
      setRegion(initialRegion);
    }
  }, [namFromGetUser]);
  const [selectedLocation, setSelectedLocation] = useState(null); 
  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };
  // Eğer region henüz belirlenmediyse (API'den veri gelmemişse) bir yükleniyor göstergesi göster
  const [areaCode, setareaCode] = useState(null)
  if (!region) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  const postData = async () => {
    try {
      let fullNumber = `${areaCode}${formData.phone}`;
      let FormData = new FormData();

      if (user.role === "Bireysel Hesap") {
        formData.append("name", formData.name);
        formData.append("iban",formData.iban);
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
          formData.new_phone_number? formData.new_phone_number : formData.mobile_phone
        );
        formData.append("banner_hex_code", currentColor);
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
        formData.append("city_id", formData.city_id);
        formData.append("county_id", formData.county_id);
        formData.append("neighborhood_id", formData.neighborhood_id);
        formData.append("name", formData.name);
        formData.append("username", formData.username);
        formData.append("banner_hex_code", currentColor);
        formData.append("iban", formData.iban);
        formData.append("website",formData.website);
        formData.append("phone", fullNumber);
        formData.append("year", formData.year);
        formData.append(
          "mobile_phone",
          formData.new_phone_number? formData.new_phone_number : formData.mobile_phone
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
  return (
    <AlertNotificationRoot>
      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size={"large"} color={user.banner_hex_code} />
        </View>
      ) : (
     <ScrollView style={styles.container}
     showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:40,gap:20}}
     >
    
          <View
            style={{
              width: "100%",
              backgroundColor: currentColor,
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
                  <View style={{
                    flexDirection: item.showArea?'row':'',
                  
                  }}>
                {
                  item.showArea&&
                  <View style={{width:'30%'}}>
                        <RNPickerSelect
                        doneText="Tamam"
                        value={areaCode}
                        placeholder={{
                          label: "Seçiniz...",
                          value: null,
                        }}
                        style={pickerSelectStyles}
                        onValueChange={(value) => {
                        setareaCode(value)
                      
                        }}
                        items={areaData}
                      />
                  </View>
              
                }
                    
                   
                  
                    {item.type == "input" ? (
                      <View style={{width:item.showArea?'68%':'100%'}}>
                           <TextInput
                      editable={item.disabled? false:true}
                      maxLength={item.maxlength ? item.maxlength:90}
                      placeholder={item.placeholder ? item.placeholder :''}
                        style={[styles.input,item.disabled?{color:'grey'}:{},]}
                        value={formData[item.key]}
                        onChangeText={(value) => {
                          if (item.key === "iban") {
                            // Eğer IBAN alanıysa formatlamayı uygula
                            handleInputChange(item.key, formatIban(value));
                          } else {
                            // Diğer alanlar için normal input değişikliği
                            handleInputChange(item.key, value);
                          } 
                          if (item.key==='new_phone_number') {
                              handleInputChange(item.key ,formatPhoneNumberNew(value))
                          }
                          if (item.key==='phone') {
                              handleInputChange(item.key,formatPhoneNumber(value))
                          }
                        }}
                      />
                      </View>
                   
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
                          handleInputChange(item.key, value);
                          if (item.key === 'city_id') {
                            onChangeCity(value); // Şehir seçilince ilçe verilerini almak için
                          } else if (item.key === 'county_id') {
                            onChangeCounty(value); // İlçe seçilince mahalle verilerini almak için
                          } else if (item.key === 'neighborhood_id') {
                            onChangeNeighborhood(value); // Mahalle seçimi
                          }else if (item.key==='taxOfficeCity'){
                            onchangeTaxOffice(value)
                          }
                        }}
                        items={getItemsForKey(item.key)}
                      />
                    )}
                  </View>
                </View>
              ))}
                 { //Harita
                    tab==3 &&
                    <View style={{alignItems:'center',height:300,width:'100%'}}>
             <MapView
        style={{width:'100%',height:'100%'}}
        initialRegion={region}
        onPress={handleMapPress}
      >
        {/* Marker örneği */}
        {selectedLocation ? (
          <Marker
            coordinate={selectedLocation}
            title="Selected Location"
          />
        )
      :
      <Marker
      coordinate={{ latitude: region.latitude, longitude: region.longitude }}
      title="Marker Title"
      description="Marker description"
    />
      }
      
      </MapView>
                    </View>
                  }
                  {
                    tab==1&&
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
                        <View style={{ width: 250, height: 200 }}>
                          <Image
                            source={{
                              uri: "https://private.emlaksepette.com/images/phone-update-image/phonefile.jpg",
                            }}
                            style={{ width: "100%", height: "100%" }}
                          />
                        </View>
                      </View>
                    </CollapseBody>
                  </Collapse>
                    </>
                  }
            </View>
          </View>
       
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
            onPress={postData}
              style={{
                width: "100%",
                backgroundColor: "#EA2B2E",
                width: "90%",
                padding: 10,
                borderRadius: 10,
              }}
            
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
          </ScrollView>
      )}
    </AlertNotificationRoot>
  );
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width:'100%',
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#ebebeb",
    borderRadius: 8,
    padding: 8,
    fontSize: 14, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    width:'100%',
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
