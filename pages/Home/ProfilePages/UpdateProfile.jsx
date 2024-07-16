import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  Animated,
  TouchableWithoutFeedback,

  ScrollView,
  Alert,
} from "react-native";
import { useRef, useState, useEffect } from "react";
import Editıcon from "react-native-vector-icons/MaterialCommunityIcons";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Modal from "react-native-modal";
import ColorPicker from "react-native-wheel-color-picker";
import userData, { getValueFor } from "../../../components/methods/user";
import axios from "axios";
import Icon from "react-native-vector-icons/Fontisto";
import Icon3 from "react-native-vector-icons/MaterialIcons";
import Arrow from "react-native-vector-icons/SimpleLineIcons";
import { CheckBox } from "@rneui/themed";
import RNPickerSelect from "react-native-picker-select";
import { Platform } from "react-native";
import * as Location from "expo-location";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from 'expo-image-picker';

import * as Camera from 'expo-camera';
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
export default function UpdateProfile() {
    const navigation=useNavigation()



  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchInitialUserData = async () => {
      setloadingModal(true)
      try {
        // Retrieve user data from SecureStore
        const storedUser = await SecureStore.getItemAsync("user");

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error fetching initial user data:", error);
      }finally{
        setTimeout(() => {
          setloadingModal(false)
        }, 500);

      }
    };

    fetchInitialUserData();
  }, []);
  const [currentColor, setCurrentColor] = useState(user.banner_hex_code);
  const [swatchesOnly, setSwatchesOnly] = useState(false);
  const [swatchesLast, setSwatchesLast] = useState(false);
  const [swatchesEnabled, setSwatchesEnabled] = useState(true);
  const [disc, setDisc] = useState(false);

  const onColorChange = (color) => {
    setCurrentColor(color);
  };

  const onColorChangeComplete = (color) => {
    // Renk değişimi tamamlandığında burada istediğiniz işlemleri yapabilirsiniz
  };
  const [openColorPicker, setopenColorPicker] = useState(false);

  const [UpdateSuccess, setUpdateSuccess] = useState(false);
  const [loadingModal, setloadingModal] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    setCurrentColor(user?.banner_hex_code);
  }, [user]);

  const [iban, setiban] = useState("");
  const [link, setlink] = useState("");
  const [yearsOfSector, setyearsOfSector] = useState("");
  const [phone, setphone] = useState("");
  const [mobilPhone, setmobilPhone] = useState("");

  const [checked, setChecked] = useState(false);
  const toggleCheckbox = () => setChecked(!checked);

  const cityData = [
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
    { label: "İstanbul Avrupa Yakası (212)", value: 212 },
    { label: "İstanbul Anadolu Yakası (216)", value: 216 },
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

  useEffect(() => {
    setName(user.name);
    setiban(user.iban);
    setmobilPhone(user.mobile_phone);
    
  }, [user]);
  const PhotoUrl = "https://private.emlaksepette.com/storage/profile_images/";
  const [ChoosePhotoModal, setChoosePhotoModal] = useState(false);
 


  const [errorMsg, setErrorMsg] = useState(null);
  const [city, setcity] = useState(null);
  const [county, setcounty] = useState(null);
  const [neigbourhod, setneigbourhod] = useState(null);


 

  const updateUserData = async () => {
      setloadingModal(true)
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
    }finally{
      setloadingModal(false)
      setUpdateSuccess(true)
      setTimeout(() => {
          setUpdateSuccess(false)
      }, 2000);
    }
  };

  const postData = async () => {
    try {
      if (name) {
        setUpdateSuccess(false);
        let fullNumber = `${cityCode}${phone}`;
        var formData = new FormData();
        formData.append('profile_image',image)
        formData.append('city_id', selectedCity)
        formData.append('county_id',selectedCounty)
       formData.append('neighborhood_id',selectedNeighborhood)
        formData.append("name", name);
        formData.append("banner_hex_code", currentColor);
        formData.append("iban", iban);
        formData.append("website", link);
        formData.append("phone", fullNumber);
        formData.append("year", yearsOfSector);
        formData.append("mobile_phone", mobilPhone);
        formData.append("latitude", selectedLocation.latitude);
        formData.append("longitude", selectedLocation.longitude);
        formData.append("_method", "PUT");

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

        // Clear the form field after successful update
        setName("");

        updateUserData();

        setUpdateSuccess(true);
        setTimeout(() => {
          setUpdateSuccess(false);
        }, 1500);
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    } finally {
     
    }
  };

  // Print the entire refactored postData function
  console.log(postData.toString());

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
    const [choose, setchoose] = useState(false)

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
  
    const takePhoto = async () => {
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
    const [region, setRegion] = useState(null);
    const [marker, setMarker] = useState(null);
  
    
    const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState('');

  const handleSelectLocation = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    console.log('Selected coordinates:', latitude, longitude); // Koordinatları konsola yazdırın
    setSelectedLocation({ latitude, longitude });
    fetchAddress(latitude, longitude);
  };

  const fetchAddress = async (latitude, longitude) => {
    try {
      const apiKey = 'AIzaSyB-ip8tV3D9tyRNS8RMUwxU8n7mCJ9WCl0'; // API anahtarınızı buraya ekleyin
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      );
      console.log('API response:', response.data); // Yanıtı konsola yazdırın

      if (response.data.results.length > 0) {
        const addressComponents = response.data.results[0].address_components;
        const city = addressComponents.find(component =>
          component.types.includes('administrative_area_level_2')
        )?.long_name || 'Bilinmiyor';
        const state = addressComponents.find(component =>
          component.types.includes('administrative_area_level_1')
        )?.long_name || 'Bilinmiyor';
        console.log('Parsed address:', city, state); // Adres bilgisini konsola yazdırın
        setAddress(`${city}, ${state}`);
      
      } else {
        setAddress('Adres bulunamadı');
      }
    } catch (error) {
      console.error(error);
      setAddress('Adres alınamadı');
    }
  };
  const userLocation = user && { latitude: parseFloat(user?.latitude) == null ? latitude : parseFloat(user.latitude), longitude: parseFloat(user?.longitude) == null ? longitude:parseFloat(user.longitude) };
  const [latitude, setLatitude] = useState(39.1667);
  const [longitude, setLongitude] = useState(35.6667);

  const SettingItem = ({text, tab}) => {
    return (
      <TouchableOpacity
      onPress={()=>{
          navigation.navigate('Upgrade',{name:text,tab:tab})
      }}
       style={{
        borderColor:'#ebebeb',
        paddingLeft:10,
        paddingRight:10,
        paddingTop:10,
        paddingBottom:4,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
      }}>
        <View style={{}}>
        <Text style={{color:'#333',fontWeight:'600',fontSize:13}}>{text}</Text>
        </View>
       <View>
            <Icon3 name="arrow-forward-ios" size={20} color={'#333'}/>
       </View>
      </TouchableOpacity>
    );
  };
  
 

  return (
    <View style={styles.container}>

        <View style={styles.card3}>
          <View style={{borderBottomWidth:1,borderBottomColor:'#ebebeb',paddingTop:15,paddingLeft:15,paddingBottom:10}}>
                <Text style={{color:'#333',fontSize:16,fontWeight:'700'}}>Profil</Text>
            </View> 
            <View style={{gap:10,paddingBottom:5}} >
              <SettingItem text={'Genel Bilgiler'} tab={0}/>
              <SettingItem text={'Cep Telefonu'} tab={1} />
       
              
            </View>
        </View>
          {
                user.role == 'Kurumsal Hesap' && 
                <View style={styles.card3}>
                <View style={{borderBottomWidth:1,borderBottomColor:'#ebebeb',paddingTop:15,paddingLeft:15,paddingBottom:10}}>
                      <Text style={{color:'#333',fontSize:16,fontWeight:'700'}}>Firma</Text>
                  </View> 
                  <View style={{gap:10,paddingBottom:5}}>
                    <SettingItem text={'Genel Bilgiler'} tab={2}/>
                    <SettingItem text={'Konum'} tab={3}/>
                    
                  </View>
              </View>
          }
     

    </View>


//     <>
//     {
//       loadingModal ? 
 
//         <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
//           <ActivityIndicator size={'large'} color="#333"/>
//         </View>
// :
  
//     <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
     
//       <ScrollView
//         style={{ flex: 1, backgroundColor: "white" }}
//         scrollEnabled={!openColorPicker}
//       >
//         <View style={styles.ProfileEditArea}>
//           <View style={{ width: 90, height: 90 }}>
//             <TouchableOpacity
//               style={styles.ProfilImage}
//               onPress={() => {
//                 setchoose(true);
//               }}
//             >
//               <Image
//                 source={{ uri: image ? image : `${PhotoUrl}${user.profile_image}` }}
//                 style={{ width: "100%", height: "100%" }}
//                 borderRadius={50}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={()=>setchoose(true)}
//               style={{
//                 position: "absolute",
//                 bottom: 0,
//                 right: 0,
//                 backgroundColor: "#EA2A29",
//                 padding: 4,
//                 borderRadius: 50,
//               }}
//             >
//               <Editıcon name="account-edit" size={20} color={"white"} />
//             </TouchableOpacity>
//           </View>
//         </View>
//         <View style={{ padding: 10 }}>
//           <View style={styles.Form}>
//             <View>
//               <Text style={styles.label}>Ad Soyad</Text>
//               <TextInput
//                 style={styles.Input}
//                 value={name}
//                 onChangeText={(value) => setName(value)}
//                 selectTextOnFocus={true}
//                 placeholder={user.name}
//               />
//             </View>

//             {user.role == "Kurumsal Hesap" ? (
//               <>
//                 <View>
//                   <Text style={styles.label}>IBAN Numarası</Text>
//                   <TextInput
//                     style={styles.Input}
//                     value={iban}
//                     onChangeText={(value) => setiban(value)}
//                   />
//                 </View>
//                 <View>
//                   <Text style={styles.label}>Website Linki</Text>
//                   <TextInput
//                     style={styles.Input}
//                     value={link}
//                     onChangeText={(value) => setlink(value)}
//                   />
//                 </View>
//                 <View>
//                   <Text style={styles.label}>Sabit Telefon (Opsiyonel)</Text>

//                   <View style={{ flexDirection: "row" }}>
//                     <View style={{ width: "32%" }}>
//                       <RNPickerSelect
//                         doneText="Tamam"
//                         value={cityCode}
                        
//                         placeholder={{
//                           label: "Alan Kodu",
//                           value: null,
                          
//                         }}
//                         style={pickerSelectStyles}
//                         onValueChange={(value) => {
//                           setcityCode(value);
//                         }}
//                         items={cityData}
//                       />
//                     </View>
//                     <View style={{ width: "70%" }}>
//                       <TextInput
//                         style={[
//                           styles.Input,
//                           { width: "100%", borderRadius: 0 },
//                         ]}
//                         value={`${phone}`}
//                         onChangeText={(value) => setphone(value)}
//                         keyboardType="name-phone-pad"
//                       />
//                     </View>
//                   </View>
//                 </View>
//                 <View>
//                   <Text style={styles.label}>Kaç yıldır sektördesiniz?</Text>
//                   <TextInput
//                     style={styles.Input}
//                     value={yearsOfSector}
//                     onChangeText={(value) => setyearsOfSector(value)}
//                   />
//                 </View>
//               </>
//             ) : (
//               ""
//             )}

//             {/* <View>
//             <Text style={styles.label}>Cep Telefonu</Text>
//             <TextInput style={styles.Input} keyboardType='number-pad' value={phoneNumber} onChangeText={onChangeText} placeholder='0544 444 44 44' maxLength={14}/>
//           </View> */}
//             <View style={{ gap: 10 }}>
//               <Text style={{ fontSize: 13, color: "#333" }}>
//                 Profil arka plan rengi
//               </Text>
//               <View
//                 style={{ flexDirection: "row", alignItems: "center", gap: 20 }}
//               >
//                 <TouchableOpacity
//                   style={{
//                     padding: 20,
//                     backgroundColor: currentColor,
//                     width: "20%",
//                     borderWidth: 1,
//                   }}
//                   onPress={() => setopenColorPicker(!openColorPicker)}
//                 ></TouchableOpacity>
//                 <TouchableOpacity
//                   style={{
//                     backgroundColor: "#E54242",
//                     padding: 10,
//                     borderRadius: 10,
//                   }}
//                   onPress={() => setopenColorPicker(!openColorPicker)}
//                 >
//                   <Text style={{ color: "white" }}>
//                     {openColorPicker == true ? "Kapat" : "Seç"}
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>

//             <View
//               style={[
//                 styles.card,
//                 { display: openColorPicker ? "flex" : "none" },
//               ]}
//             >
//               <ColorPicker
//                 color={currentColor}
//                 swatchesOnly={false}
//                 onColorChange={onColorChange}
//                 onColorChangeComplete={onColorChangeComplete}
//                 thumbSize={50}
//                 sliderSize={20}
//                 noSnap={true}
//                 gapSize={0}
//                 sliderHidden={true}
//                 row={false}
//                 swatchesLast={swatchesLast}
//                 swatches={swatchesEnabled}
//                 discrete={false}
//                 useNativeDriver={true}
//                 useNativeLayout={false}
//               />
//             </View>
//             <View style={{ gap: 15 }}>
//               <View>
//                 <Text style={styles.label}>İl</Text>
//                 <RNPickerSelect
//                   doneText="Tamam"
//                   value={selectedCity}
//                   placeholder={{
//                     label: "Seçiniz...",
//                     value: null,
//                   }}
//                   style={pickerSelectStyles}
//                   onValueChange={(value) => {
//                     onChangeCity(value);
//                   }}
//                   items={cities}
//                 />
//               </View>
//               <View>
//                 <Text style={styles.label}>İlçe</Text>
//                 <RNPickerSelect
//                   doneText="Tamam"
//                   value={selectedCounty}
//                   placeholder={{
//                     label: "Seçiniz...",
//                     value: null,
//                   }}
//                   style={pickerSelectStyles}
//                   onValueChange={(value) => {
//                     onChangeCounty(value);
//                   }}
//                   items={counties}
//                 />
//               </View>
//               <View>
//                 <Text style={styles.label}>Mahalle</Text>
//                 <RNPickerSelect
//                   doneText="Tamam"
//                   value={selectedNeighborhood}
//                   placeholder={{
//                     label: "Seçiniz...",
//                     value: null,
//                   }}
//                   style={pickerSelectStyles}
//                   onValueChange={(value) => {
//                     onChangeNeighborhood(value);
//                   }}
//                   items={neighborhoods}
//                 />
//               </View>
//             </View> 
//             {user?.role === "Kurumsal Hesap" && (
//               <View style={{ height: 300 }}>
//             <MapView
//         style={{ flex: 1 }}
//         onPress={handleSelectLocation}
//         region={{
//           latitude: parseFloat(user?.latitude) == null ? parseFloat(latitude) : parseFloat(user.latitude) , // Türkiye'nin merkezi Ankara'nın enlemi
//           longitude:parseFloat(user?.longitude) == null ? parseFloat(longitude) : parseFloat(user.longitude), // Türkiye'nin merkezi Ankara'nın boylamı
//           latitudeDelta: 9, // Harita yakınlığı
//           longitudeDelta: 9,
//         }}
//       >
//                   {selectedLocation ? (
//               <Marker coordinate={selectedLocation} />
//             ) : (
//               <Marker coordinate={userLocation} />
//             )}
//       </MapView>
    

//               </View>
//             )}

//             <View>
//               <Text style={styles.label}>Cep Numarası</Text>
//               <TextInput
//                 style={[styles.Input, { color: checked ? "#333" : "grey" }]}
//                 value={mobilPhone}
//                 onChangeText={(value) => setmobilPhone(value)}
//                 editable={checked ? true : false}
//               />
//               <CheckBox
//                 checked={checked}
//                 onPress={toggleCheckbox}
//                 // Use ThemeProvider to make change for all checkbox
//                 iconType="material-community"
//                 checkedIcon="checkbox-marked"
//                 uncheckedIcon="checkbox-blank-outline"
//                 checkedColor="red"
//                 title={"Güncellemek İstiyorum"}
//                 containerStyle={{ marginRight: 0, paddingRight: 0,marginLeft:-10}}
//                 style={{ margin: 0 }}
//               />
//             </View>
//             <View
//               style={{
//                 paddingLeft: 10,
//                 display: checked ? "flex" : "none",
//                 gap: 10,
//               }}
//             >
//               <TouchableOpacity
//                 style={{
//                   backgroundColor: "#E54242",
//                   padding: 10,
//                   width: "50%",
//                   borderRadius: 6,
//                 }}
//               >
//                 <Text style={{ textAlign: "center", color: "white" }}>
//                   Dosya Seç
//                 </Text>
//               </TouchableOpacity>
//               <Text style={{ color: "red", fontSize: 12 }}>
//                 Lütfen Belge Formatına Uygun Şeklinde Ekleyiniz
//               </Text>

//               <View style={[styles.card, { gap: 15, height: "auto" }]}>
//                 <Text>Belge Formatı:</Text>
//                 <Text>
//                   xxxx mail adresim ve xxxx telefon numarası ile kayıtlı olan
//                   üyeliğimdeki
//                 </Text>
//                 <Text>
//                   xxxx mail addresim ve xxxx telefon numarasıyla
//                   değiştirilmesini talep ediyorum
//                 </Text>
//                 <Text>isim soyisim</Text>
//                 <Text>İmza</Text>
//                 <View style={{ width: "100%", alignItems: "center" }}>
//                   <View
//                     style={{
//                       width: 250,
//                       height: 200,
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <Image
//                       source={require("./tcpng.png")}
//                       style={{ width: "100%", height: "100%" }}
//                     />
//                   </View>
//                 </View>
//               </View>
//             </View>
//           </View>
//           <View style={{ alignItems: "center",paddingBottom:40 }}>
//             <TouchableOpacity style={styles.updatebtn} onPress={postData}>
//               <Text style={styles.btnText}>Güncelle</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <Modal
//           isVisible={UpdateSuccess}
//           style={styles.modal}
//           animationIn={"fadeInRight"}
//           animationOut={"fadeOutLeft"}
//         >
//           <View style={styles.modalContent}>
//             <Icon name="check" size={25} color={"green"} />
//             <Text style={{ textAlign: "center", color: "green" }}>
//               Profiliniz Başarıyla Güncellendi
//             </Text>
//           </View>
//         </Modal>
//         <Modal
//           isVisible={loadingModal}
//           style={styles.modal}
//           animationIn={"fadeInRight"}
//           animationOut={"fadeOutLeft"}
        
//         >
//           <View style={styles.modalContent}>
//             <ActivityIndicator size="large" color="#333"/>
//             <Text style={{ textAlign: "center", color: "green" }}>
//               Profiliniz Güncelleniyor
//             </Text>
//           </View>
//         </Modal>
//         <Modal
//           isVisible={choose}
//           style={styles.modal2}
//           animationIn={"fadeInDown"}
//           animationOut={"fadeOutDown"}
//           onBackdropPress={()=>setchoose(false)}
//           swipeDirection={['down']}
//           onSwipeComplete={()=>setchoose(false)}
//         >
//           <View style={styles.modalContent2}>
//             <View style={{padding:10,alignItems:'center'}}>
//               <TouchableOpacity style={{width:'15%',backgroundColor:'#c2c4c6',padding:4,borderRadius:50}}>

//               </TouchableOpacity>
//             </View>
//             <View style={{padding:20,gap:35}}>
//             <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:10}} onPress={pickImage}>
//                       <Icon3 name="photo" size={23} color={'#333'}/>
//                       <Text style={{fontSize:14,color:'#333',fontWeight:'700'}}>Kütüphaneden Seç</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:10}} onPress={takePhoto}>
//                       <Icon3 name="add-a-photo" size={21} color={'#333'}/>
//                       <Text style={{fontSize:14,color:'#333',fontWeight:'700'}}>Fotoğraf Çek</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:10}}>
//                       <Icon3 name="restore-from-trash" size={22} color={'#d83131'}/>
//                       <Text style={{fontSize:14,color:'#d83131',fontWeight:'700'}}>Mevcut Fotoğrafı Kaldır</Text>
//               </TouchableOpacity>
//             </View>
            
//           </View>
//         </Modal>
//       </ScrollView>
//     </TouchableWithoutFeedback>
//     } 
//     </>
  );
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#ebebeb",
    borderRadius: 5,
    padding: 10,
    fontSize: 14, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#eaeff5",
    borderRadius: 5,
    padding: 10,
    fontSize: 14, // to ensure the text is never behind the icon
  },
});
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    gap:10,
    padding:10
  },
  ProfileEditArea: {
    width: "100%",
    paddingTop: width > 400 ? 20 : 10,

    alignItems: "center",
  },
  ProfilImage: {},
  Form: {
    gap: 30,
    width: "100%",
    paddingTop: 14,

    borderRadius: 5,
    paddingVertical: 22,
    paddingHorizontal: 10,
    width: "100%",
    marginVertical: 10,
  },
  Input: {
    padding: 10,
    backgroundColor: "transparent",
    borderRadius: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#ebebeb",
    color: "#333",
  },
  label: {
    fontSize: 13,
    bottom: 5,
    left: 2,
    letterSpacing: 0.5,
    fontSize: 14,
    color: "grey",
    fontWeight: "500",
  },

  updatebtn: {
    width: "90%",
    backgroundColor: "#E54242",
    padding: 13,
    borderRadius: 10,
  },
  btnText: {
    textAlign: "center",
    color: "white",

    fontSize: 13,
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    paddingVertical: 22,
    paddingHorizontal: 30,
    width: "100%",

    height: 240,
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
  modal: {
    justifyContent: "center",
    margin: 0,
    padding: 30,
  },
  modalContent: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 25,

    borderRadius: 10,
    alignItems: "center",
    gap: 20,
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
  card3: {
    backgroundColor: "#FFFFFF",
      paddingBottom:2,
    borderRadius:6,
    width: "100%",
 
    marginTop:5,
    borderWidth: 0,
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
  }
});
