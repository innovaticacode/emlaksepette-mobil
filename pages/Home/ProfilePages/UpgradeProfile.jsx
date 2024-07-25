import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState,useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome2 from 'react-native-vector-icons/FontAwesome6'
import Feather from 'react-native-vector-icons/Ionicons'
import Modal from "react-native-modal";
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import Icon3 from "react-native-vector-icons/MaterialIcons";
import RNPickerSelect from "react-native-picker-select";
import { Platform } from "react-native";
import Arrow from "react-native-vector-icons/SimpleLineIcons";

import * as SecureStore from "expo-secure-store";
import * as ImagePicker from 'expo-image-picker';
import ColorPicker from "react-native-wheel-color-picker";
import { getValueFor } from "../../../components/methods/user";
import { Image } from "react-native-elements";
import MapView,{Marker} from "react-native-maps";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Progress from 'react-native-progress';
import { AlertNotificationRoot, Toast ,ALERT_TYPE, Dialog} from "react-native-alert-notification";
export default function UpgradeProfile() {
  const route = useRoute();
  const { name, tab } = route.params;
  const [choose, setchoose] = useState(false)
  const PhotoUrl = "https://private.emlaksepette.com/storage/profile_images/";
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
        
        }
      }
    })();
  }, []);
  const [user, setUser] = useState({});
  useEffect(() => {
    getValueFor("user", setUser);
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          // alert('Sorry, we need camera permissions to make this work!');
        }
      }
    })();
  }, []);

      const [file, setfile] = useState(null)

  const takePhoto= async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const pickImageForfile = async () => {
    setIsLoading(true);
    setProgress(0);

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

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
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
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

    console.log(result);

    if (!result.canceled) {
      setfile(result.assets[0].uri);
    }
  };
  const [userName, setuserName] = useState("")
  const [iban, setiban] = useState("");
  const [link, setlink] = useState("");
  const [yearsOfSector, setyearsOfSector] = useState("");
  const [phone, setphone] = useState("");
  const [mobilPhone, setmobilPhone] = useState("");
const [namFromGetUser, setnamFromGetUser] = useState({})
const [loading, setloading] = useState(false)
  const GetUserInfo =async ()=>{
    setloading(true)
    try {
      if (user.access_token) {
        const userInfo = await axios.get(
          "https://private.emlaksepette.com/api/users/" + user?.id,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        const userData= userInfo?.data?.user
        setnamFromGetUser(userInfo?.data?.user)
          console.log(userData)
          setData('Iban',userData?.iban)
          setData('backgroundColor',userData?.banner_hex_code)
          setData('webSiteLink',userData.website)
          setData('userName',userData.name)
          setData('shoopingName',userData.username)
          setData('SectorYear',userData.year)
          setData('webSiteLink',userData.website)
          setData('phoneCompany',userData.phone.substring(3))
          setData('cityCode',userData.taxOffice)
          setSelectedLocation({
            latitude: userData.latitude,
            longitude: userData.longitude
          });
          handlePhoneNumberChange(userData?.mobile_phone)

      
            setSelectedCity(userData.city_id)
            setSelectedCounty(userData.county_id)
            setSelectedNeighborhood(userData.neighborhood_id)
      }
    
  
    
  
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    }finally{
      setloading(false)
    }
  }
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
    setData('oldPhone',formattedPhoneNumber);

  };
  const handlePhoneNumberChangeFornewPhone = (value) => {
    const formattedPhoneNumber = formatPhoneNumber(value);
    setData('newPhone',formattedPhoneNumber);

  };
  const handlePhoneChange = (value) => {
    const formattedPhoneNumber = formatPhoneNumber(value);
    setData('phoneCompany',formattedPhoneNumber);

  };
  useEffect(() => {
        GetUserInfo()
  }, [user,selectedCity,selectedCounty,selectedNeighborhood])

  const [openAccor, setopenAccor] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapPress = (event) => {
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };
  const userLocation = user && { latitude: parseFloat(user?.latitude) == null ? latitude : parseFloat(user.latitude), longitude: parseFloat(user?.longitude) == null ? longitude:parseFloat(user.longitude) };
 
  
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [counties, setCounties] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);
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

  const fetchCounties = async (cityId) => {
    try {
      const response = await axios.get(
        `https://private.emlaksepette.com/api/counties/${cityId}`
      );
      setCounties(response.data.data);
    } catch (error) {
      console.error("Hata:", error);
      Alert.alert("Error", "Could not load counties");
    }
  };

  const fetchNeighborhoods = async (countyId) => {
    try {
      const response = await axios.get(
        `https://private.emlaksepette.com/api/neighborhoods/${countyId}`
      );
      setNeighborhoods(response.data.data);
    } catch (error) {
      console.error("Hata:", error);
  Alert.alert("Error", "Could not load neighborhoods");
 }
  };



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
  const [cityCode, setcityCode] = useState("");
  const [openColorPicker, setopenColorPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState(user.banner_hex_code);
  const [swatchesOnly, setSwatchesOnly] = useState(false);
  const [swatchesLast, setSwatchesLast] = useState(false);
  const [swatchesEnabled, setSwatchesEnabled] = useState(true);
  const [disc, setDisc] = useState(false);

  const onColorChange = (color) => {
      setData('backgroundColor',color)
  };
  const onColorChangeComplete = (color) => {
    // Renk değişimi tamamlandığında burada istediğiniz işlemleri yapabilirsiniz
  };
  useEffect(() => {
    setCurrentColor(user?.banner_hex_code);
  }, [user]);



  const [FormDatas, setFormDatas] = useState({
    userName: '',
    shoopingName:'',
    Iban: null,
    oldPhone: null,
    newPhone:null,
    fileForPhone:null,
    phoneCompany:null,
    cityCode:null,
    webSiteLink:null,
    SectorYear:null,
    backgroundColor:null
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
  text = text.replace(/[^A-Za-z0-9]/g, '');
  
  // Metnin başında TR olup olmadığını kontrol edin
  if (text.startsWith('TR')) {
    text = 'TR' + text.substring(2).replace(/^TR/, ''); // Eğer başta TR varsa, fazladan TR'yi kaldırın
  } else {
    text = 'TR' + text; // Eğer başta TR yoksa, başına TR ekleyin
  }

  // IBAN'ı 4 haneli gruplar halinde formatla
  const formattedText = text.match(/.{1,4}/g)?.join(' ') ?? text;

  setData('Iban', formattedText);
};

const postData = async () => {
  try {
   
   
      let fullNumber = `${FormDatas.cityCode}${FormDatas.phoneCompany}`;
      var formData = new FormData();
      if (user.role =='Bireysel Hesap') {
        formData.append("name", FormDatas.userName);
        formData.append("iban", FormDatas.Iban);
        formData.append('profile_image',image)
        formData.append("mobile_phone", FormDatas.newPhone  ? FormDatas.newPhone :FormDatas.newPhone);
        formData.append("banner_hex_code", FormDatas.backgroundColor);
        formData.append("_method", "PUT");
      }else{
        formData.append('profile_image',image)
        formData.append('city_id', selectedCity)
        formData.append('county_id',selectedCounty)
       formData.append('neighborhood_id',selectedNeighborhood)
        formData.append("name", FormDatas.userName);
        formData.append("username", FormDatas.shoopingName)
        formData.append("banner_hex_code", FormDatas.backgroundColor);
        formData.append("iban", FormDatas.Iban);
        formData.append("website", FormDatas.webSiteLink);
        formData.append("phone", fullNumber);
        formData.append("year",FormDatas.SectorYear );
        formData.append("mobile_phone", FormDatas.newPhone  ? FormDatas.newPhone :FormDatas.newPhone);
        formData.append("latitude", selectedLocation.latitude);
        formData.append("longitude", selectedLocation.longitude);
       
        formData.append("_method", "PUT");
      }


      // Perform the profile update
      const response = await axios.post(
        "https://private.emlaksepette.com/api/client/profile/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      );
        Dialog.show({
          type:ALERT_TYPE.SUCCESS,
          textBody:'Profiliniz başarıyla güncellendi',
          button: 'Tamam',
          
        })
      // Clear the form field after successful update
      setFormDatas({
        userName: '',
        shoopingName: '',
        Iban: 'TR',
        oldPhone: '',
        newPhone: null,
        fileForPhone: '',
        phoneCompany: '',
        cityCode: null,
        webSiteLink: '',
        SectorYear: null,
        backgroundColor: null,
        // Diğer form alanları buraya eklenebilir
      })
      GetUserInfo()
      updateUserData();

    
    
  } catch (error) {
    console.error("Error:", error);
    // Handle error
  } finally {
   
  }
};
const [chooseFile, setchooseFile] = useState(false)
  return (
    <AlertNotificationRoot>
        {
          loading ?
          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <ActivityIndicator size={'large'} color={user.banner_hex_code} />
          </View>
          :
          <KeyboardAwareScrollView style={styles.container} contentContainerStyle={{gap:20,paddingBottom:40}} >
          <View
            style={{
              width: "100%",
              backgroundColor:FormDatas.backgroundColor,
              padding: 15,
              alignItems: "center",
            }}
                >
                  {
                    (tab == 0 || tab==2) && 
                    <View style={{width:'100%',alignItems:'flex-start'}}>
                    <View style={{backgroundColor:'white',flexDirection:'row',padding:4,borderRadius:50,position:'absolute',right:0}}>
               
                    <TouchableOpacity
                            style={{
                              padding:4,
                              backgroundColor: currentColor,
                              
                              
                              borderWidth: 1,
                              borderColor:'#ebebeb',
                              borderRadius:50
                            }}
                            onPress={() => setopenColorPicker(!openColorPicker)}
                          >
                             <Feather name="brush" color={'white'} size={25}/>
                          </TouchableOpacity>
                  
                    </View>
                   
                    </View>
                  }
                
            <View>
              <View
                style={{
                  width: 96,
                  height: 96,
                 
                  borderRadius: 50,
                }}
              >
    {
      user?.profile_image && image?
    
    
      <Image
                    source={{ uri: image ? image : `${PhotoUrl}${user.profile_image}` }}
                    style={{ width: "100%", height: "100%",borderRadius:50}}
                   borderRadius={50}
                   />:
                   <View style={{backgroundColor:'white',borderRadius:50,alignItems:'center',padding:2}}>
                       <FontAwesome name="user-circle-o" size={'90'} color={'#ebebeb'}/>
                   </View>
                
    }
    
              </View>
              {
                (tab == 0 || tab==2) &&
                <TouchableOpacity
                onPress={()=>{
                setchoose(true)
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
              }
          
          
            </View>
          
            <View style={{ alignItems: "center", paddingTop: 10, gap: 5 }}>
              {
                  (tab ==0 || tab==1) &&
                <Text style={{ fontSize: 14, fontWeight: "600", color: "#fff" }}>
                {namFromGetUser?.name}
              </Text>
              }
              
                {
                  (tab ==2 || tab==3 || tab==4)  && 
                  <Text style={{ fontSize: 14, fontWeight: "600", color: "#fff" }}>
                  {namFromGetUser?.username}
                </Text>
                }
              <Text style={{ fontSize: 12, fontWeight: "500", color: "#fff" }}>
                {user?.role}
              </Text>
            </View>
           
          </View>
         
          <View style={{ width: "100%", alignItems: "center" }}>
         
            <View style={{ padding: 5, width: "90%", gap: 25 }}>
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
                {
                    tab ==1 && 
                    <>
                            <View style={{ width: "100%",gap:10 }}>
              <View style={{flexDirection:'row',alignItems:'center',gap:5,paddingLeft:10}}>
                  <Entypo name="old-phone" size={15} color={'#777777'}/>
                <Text style={styles.label}>Mevcut Telefon Numarası</Text>
              </View>
              <View>
                <TextInput style={styles.ınput} value={FormDatas.oldPhone} onChangeText={handlePhoneNumberChange} maxLength={15} placeholder="5**********"/>
              </View>
            </View>
    
            <View style={{ width: "100%" ,gap:10}}>
              <View style={{flexDirection:'row',alignItems:'center',gap:5,paddingLeft:10}}>
              <Entypo name="old-phone" size={15} color={'#777777'}/>
                <Text style={styles.label}>Yeni Telefon Numarası</Text>
              </View>
              <View>
                <TextInput style={styles.ınput} keyboardType='numeric' value={FormDatas.newPhone} onChangeText={handlePhoneNumberChangeFornewPhone} editable={file==null ? false:true}
                maxLength={15} placeholder="5**********"
                 onPress={()=>{
                  if (file==null) {
                    Toast.show({
                      type: ALERT_TYPE.WARNING,
                      title: 'Dosya Yükleyiniz',
                    textBody:'Aşşağıda örnek belge formatı bulunmaktadır'
                    })
                  }
                }} />
              </View>
            </View> 
            <View style={[styles.card,{gap:10}]}>
            <TouchableOpacity 
                onPress={()=>{
                  setchooseFile(true)
                }}
            > 
           
            <View style={{width:'100%',height:150,borderWidth:1,borderStyle:'dashed',borderColor:'#F27B7D',alignItems:'center',justifyContent:'center',borderRadius:9}}>
                  {
                    file &&!isLoading ?
                    <View style={{width:'100%',height:'100%'}}>
                      <Image source={{uri:file}} style={{width:'100%',height:'100%'}} borderRadius={9}/>
                    </View>
                    :
                    <View style={{alignItems:'center',backgroundColor:'#FDEAEA',width:'100%',height:'100%',justifyContent:'center'}}>
                    <Feather name="cloud-upload-outline" size={60} color={'#EA2B2E'}/>
                    <Text style={{color:'#EA2B2E',fontSize:13}}>Dosyanızı buraya yükleyiniz</Text>
                </View>
                  }
           
            </View>
                       
                       
            </TouchableOpacity>
            {isLoading && (
              <View style={{width:'100%'}}>
                   <Progress.Bar
        color="#FDEAEA"
           height={20}
          progress={progress}
          width={null}
              style={{flex:1}}
          
          animated={true}
          indeterminate={false}
          indeterminateAnimationDuration={1000}
       />
       <View style={{position:'absolute',right:10,justifyContent:'center',top:3}}>
        <View  style={{flexDirection:'row',gap:10,alignItems:'center',justifyContent:'space-between',width:'100%'}}>
          <View style={{paddingLeft:30}}>
            <Text style={{color:'#333',fontSize:10}}>Belge Yükleniyor...</Text>
          </View>
          <View style={{flexDirection:'row',gap:5,alignItems:'center'}}>
          <Text style={{fontSize:11,color:'#333',textAlign:'center'}}>{Math.round(progress * 100)}%</Text>
        <TouchableOpacity style={{}}  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <Icon name="close" size={17} color={'#333'}/>
                        </TouchableOpacity>
          </View>
   
        </View>
       
       </View>
              </View>
     
        
        
      )}
            {/* <View style={{flexDirection:'row',width:'100%',backgroundColor:'#FDEAEA',padding:10,borderRadius:5,gap:10,alignItems:'center',justifyContent:'space-between'}}>
                <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                <FontAwesome name="file-text-o" color={'#EB373A'} size={15}/>
                    <Text style={{fontSize:13,color:'grey'}}>Belge Yükleniyor</Text>
                   
                </View>
              
    
                    <View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
                        <Text style={{fontSize:12,color:'#333',fontWeight:'600'}}>70%</Text>
                        <TouchableOpacity style={{padding:5}}>
                        <Icon name="close" size={15} color={'#333'}/>
                        </TouchableOpacity>
                       
                    </View>
    
            </View>  */}
      
    
            </View>
            <Collapse onToggle={()=>setopenAccor(!openAccor)} >
        <CollapseHeader>
          <View style={[styles.card,{padding:0,flexDirection:'row',justifyContent:'space-between',paddingVertical:10}]}>
            <Text style={{color:'#333',}}>Yüklemeniz Gereken Belge Örneği</Text>
            <Arrow name=  {openAccor? 'arrow-down' :'arrow-right'}size={15} color={'grey'}/>
          </View>
        </CollapseHeader>
        <CollapseBody style={{}} >
        <View style={[styles.card, { gap: 15, paddingHorizontal:4,paddingVertical:8,alignItems:'center'}]}>
              <View style={{width:250,height:200}}>
                        <Image source={{uri:'https://private.emlaksepette.com/images/phone-update-image/phonefile.jpg'}} style={{width:'100%',height:'100%'}}/>
              </View>
                   
                  </View>
        </CollapseBody>
    </Collapse>
                    </>
                }
            {
            tab == 2 &&
            <>
                <View style={{ width: "100%" ,gap:10}}>
                <View  style={{flexDirection:'row',alignItems:'center',gap:5,paddingLeft:10}}>
                    <FontAwesome2 name="user-tie" size={17} color={'#777777'}/>
                  <Text style={styles.label}>Firma Adı</Text>
                </View>
                <View>
               
                  <TextInput style={styles.ınput} value={FormDatas.shoopingName} onChangeText={(value)=>setData('shoopingName',value)}/>
                </View>
              </View>
                <View>
                      <Text style={styles.label}>Sabit Telefon (Opsiyonel)</Text>
    
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ width: "32%" }}>
                          <RNPickerSelect
                            doneText="Tamam"
                            value={FormDatas.cityCode}
                            
                            placeholder={{
                              label: "Alan Kodu",
                              value: null,
                              
                            }}
                            style={pickerSelectStyles}
                            onValueChange={(value) => {
                              setData('cityCode',value)
                            }}
                            items={cityData}
                          />
                        </View>
                        <View style={{ width: "70%" }}>
                          <TextInput
                            style={styles.ınput}

                            value={FormDatas.phoneCompany}
                            onChangeText={(value) => handlePhoneChange(value)}
                            keyboardType='number-pad'
                            maxLength={12}
                          />
                        </View>
                      </View>
                    </View>
    
            <View style={{ width: "100%" ,gap:10}}>
              <View style={{flexDirection:'row',alignItems:'center',gap:5,paddingLeft:10}}>
                  <FontAwesome name="credit-card-alt" color={'#777777'} size={13}/>
                <Text style={styles.label}>Iban Numarası</Text>
              </View>
              <View>
                <TextInput style={styles.ınput} keyboardType='number-pad' value={FormDatas.Iban} onChangeText={(value)=>handleIbanChange(value)}  maxLength={29} />
              </View>
            </View>
            <View style={{ width: "100%" ,gap:10}}>
              <View style={{flexDirection:'row',alignItems:'center',gap:5,paddingLeft:10}}>
                  <View style={{backgroundColor:'#777777',padding:4,borderRadius:50}}>
                      <Entypo name="link" color={'#ffff'}/>
                  </View>
                <Text style={styles.label}>Website Linki</Text>
              </View>
              <View>
                <TextInput style={styles.ınput} value={FormDatas.webSiteLink} onChangeText={(value)=>setData('webSiteLink',value)} />
              </View>
            </View>
            <View style={{ width: "100%" ,gap:10}}>
              <View  style={{flexDirection:'row',alignItems:'center',gap:5,paddingLeft:10}}>
                  <FontAwesome2 name="user-tie" size={17} color={'#777777'}/>
                <Text style={styles.label}>Kaç yıldır sektördesiniz</Text>
              </View>
              <View>
                <TextInput style={styles.ınput} value={FormDatas.SectorYear} onChangeText={(value)=>setData('SectorYear',value)}/>
              </View>
            </View>
            </>
                }
            {
                tab== 0 &&
                <>
                <View style={{ width: "100%" ,gap:10}}>
                <View  style={{flexDirection:'row',alignItems:'center',gap:5,paddingLeft:10}}>
                    <FontAwesome2 name="user-tie" size={17} color={'#777777'}/>
                  <Text style={styles.label}>Kullanıcı Adı</Text>
                </View>
                <View>
               
                  <TextInput style={styles.ınput} value={FormDatas.userName} onChangeText={(value)=>setData('userName',value)}/>
                </View>
              </View>
                <View style={{ width: "100%" ,gap:10}}>
             <View style={{flexDirection:'row',alignItems:'center',gap:5,paddingLeft:10}}>
                 <FontAwesome name="credit-card-alt" color={'#777777'} size={13}/>
               <Text style={styles.label}>Iban Numarası</Text>
             </View>
             <View>
               <TextInput style={styles.ınput} keyboardType='number-pad' value={FormDatas.Iban} onChangeText={(value)=>handleIbanChange(value)}    maxLength={29}/>
             </View>
           </View>
     
              </>
            }
            {
                tab ==3 &&
                <>
               
                   <View style={{ gap: 15 }}>
                  <View style={{gap:10}}>
                    <View style={{paddingLeft:10}}>
                    <Text style={styles.label}>İl</Text>
                    </View>
                    
                    <RNPickerSelect
                      doneText="Tamam"
                      value={selectedCity}
                      placeholder={{
                        label: "Seçiniz...",
                        value: null,
                      }}
                      style={pickerSelectStyles}
                      onValueChange={(value) => {
                        onChangeCity(value);
                      }}
                      items={cities}
                    />
                  </View>
                  <View style={{gap:10}}>
                    <View style={{paddingLeft:10}}>
                    <Text style={styles.label}>İlçe</Text>
                    </View>
                 
                    <RNPickerSelect
                      doneText="Tamam"
                      value={selectedCounty}
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
                  </View>
                  <View style={{gap:10}}>
                    <View style={{paddingLeft:10}}>
                    <Text style={styles.label}>Mahalle</Text>
                    </View>
                 
                    <RNPickerSelect
                      doneText="Tamam"
                      value={selectedNeighborhood}
                      placeholder={{
                        label: "Seçiniz...",
                        value: null,
                      }}
                      style={pickerSelectStyles}
                      onValueChange={(value) => {
                        onChangeNeighborhood(value);
                      }}
                      items={neighborhoods}
                    />
                  </View>
                </View> 
                <View style={{height:300}}>
                
                <MapView
            style={{flex:1}}
            initialRegion={{
              latitude: parseFloat(user.latitude) ? parseFloat(user.latitude) : 39.9334, // Türkiye'nin merkezi
              longitude:parseFloat(user.longitude)? parseFloat(user.longitude): 32.8597, // Türkiye'nin merkezi
              latitudeDelta: selectedLocation ? 0.05 : 8.5,
              longitudeDelta: selectedLocation ? 0.05 : 8.5,
            }}
            onPress={handleMapPress}
          >
            {selectedLocation && (
              <Marker
                coordinate={selectedLocation}
              />
            )}
          </MapView>
                </View>
                </>
            }
      
       
      
             
          </View>
     
    
        
         
    
          </View>
          <View style={{alignItems:'center'}}>
            <TouchableOpacity style={{width:'100%',backgroundColor:'#EA2B2E',width:'90%',padding:10,borderRadius:10}}
              onPress={postData}
            >
                <Text style={{textAlign:'center',color:'#fff',fontWeight:'600'}}>Güncelle</Text>
            </TouchableOpacity>
          </View>
          <Modal
              isVisible={choose}
              style={styles.modal2}
              animationIn={"fadeInDown"}
              animationOut={"fadeOutDown"}
              onBackdropPress={()=>setchoose(false)}
              swipeDirection={['down']}
              onSwipeComplete={()=>setchoose(false)}
            >
              <View style={styles.modalContent2}>
                <View style={{padding:10,alignItems:'center'}}>
                  <TouchableOpacity style={{width:'15%',backgroundColor:'#c2c4c6',padding:4,borderRadius:50}}>
    
                  </TouchableOpacity>
                </View>
                <View style={{padding:20,gap:35}}>
                <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:10}} onPress={pickImage}>
                          <Icon3 name="photo" size={23} color={'#333'}/>
                          <Text style={{fontSize:14,color:'#333',fontWeight:'700'}}>Kütüphaneden Seç</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:10}} onPress={takePhoto}>
                          <Icon3 name="add-a-photo" size={21} color={'#333'}/>
                          <Text style={{fontSize:14,color:'#333',fontWeight:'700'}}>Fotoğraf Çek</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:10}}>
                          <Icon3 name="restore-from-trash" size={22} color={'#d83131'}/>
                          <Text style={{fontSize:14,color:'#d83131',fontWeight:'700'}}>Mevcut Fotoğrafı Kaldır</Text>
                  </TouchableOpacity>
                </View>
                
              </View>
            </Modal>
            <Modal
              isVisible={chooseFile}
              style={styles.modal2}
              animationIn={"fadeInDown"}
              animationOut={"fadeOutDown"}
              onBackdropPress={()=>setchooseFile(false)}
              swipeDirection={['down']}
              onSwipeComplete={()=>setchooseFile(false)}
            >
              <View style={styles.modalContent2}>
                <View style={{padding:10,alignItems:'center'}}>
                  <TouchableOpacity style={{width:'15%',backgroundColor:'#c2c4c6',padding:4,borderRadius:50}}>
    
                  </TouchableOpacity>
                </View>
                <View style={{padding:20,gap:35}}>
                <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:10}} onPress={pickImageForfile}>
                          <Icon3 name="photo" size={23} color={'#333'}/>
                          <Text style={{fontSize:14,color:'#333',fontWeight:'700'}}>Kütüphaneden Seç</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:10}} onPress={takePhotoforFile}>
                          <Icon3 name="add-a-photo" size={21} color={'#333'}/>
                          <Text style={{fontSize:14,color:'#333',fontWeight:'700'}}>Fotoğraf Çek</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:10}}>
                          <Icon3 name="restore-from-trash" size={22} color={'#d83131'}/>
                          <Text style={{fontSize:14,color:'#d83131',fontWeight:'700'}}>Mevcut Fotoğrafı Kaldır</Text>
                  </TouchableOpacity>
                </View>
                
              </View>
            </Modal>
        </KeyboardAwareScrollView>
        }
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
  ınput: {
    padding: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  label:{
    color:'#777777',
    fontSize:13,
    fontWeight:'600'
  },
  modal2: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent2: {
    gap: 10,
  
    backgroundColor: "#F8F7F4",
    padding: 10,
    height: "30%",

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
    position: 'relative',
    width: 200,
    alignItems: 'center',
    marginTop: 20,
  },
  progressText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    color: '#000',
    fontWeight: 'bold',
  },
});
