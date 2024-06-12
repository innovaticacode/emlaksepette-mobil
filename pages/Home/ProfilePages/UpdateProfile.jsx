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
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useRef, useState, useEffect } from "react";
import Editıcon from "react-native-vector-icons/MaterialCommunityIcons";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import ShareIcon from "react-native-vector-icons/Entypo";
import DeleteIcon from "react-native-vector-icons/MaterialIcons";
import Modal from "react-native-modal";
import ColorPicker from "react-native-wheel-color-picker";
import { getValueFor } from "../../../components/methods/user";
import axios from "axios";
import Icon from "react-native-vector-icons/Fontisto";
import { CheckBox } from "@rneui/themed";
import RNPickerSelect from "react-native-picker-select";
import { Platform } from "react-native";
import * as Location from 'expo-location';
export default function UpdateProfile() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
  
  };
console.log(selectedLocation,'dfsddfsdf')
  const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
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

  const postData = async () => {
    try {
      let fullNumber = `${cityCode}${phone} `;
      var formData = new FormData();

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

      const response = await axios.post(
        "https://mobil.emlaksepette.com/api/client/profile/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );
      setName("");

      setUpdateSuccess(true);
      500;

      setTimeout(() => {
        setUpdateSuccess(false);
      }, 1500);
      // İsteğin başarılı bir şekilde tamamlandığı durum
    } catch (error) {
      // Hata durumunda

      console.error("Hata:", error + "post isteği başarısız ");
    } finally {
      setloadingModal(false);
    }
  };

  useEffect(() => {
    setCurrentColor(user?.banner_hex_code);
  }, [user]);

  const handleUpdate = () => {
    if (name) {
      postData();
    }
  };
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
  const PhotoUrl = "https://mobil.emlaksepette.com/storage/profile_images/";
  const [ChoosePhotoModal, setChoosePhotoModal] = useState(false);
  const userLocation = user && { latitude: parseFloat(user?.latitude) == null ? latitude : parseFloat(user.latitude), longitude: parseFloat(user?.longitude) == null ? longitude:parseFloat(user.longitude) };

  const [latitude, setLatitude] = useState(39.1667);
  const [longitude, setLongitude] = useState(35.6667);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (user.access_token) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Konum izni reddedildi');
          return;
        }
  
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLatitude(parseFloat(currentLocation.coords.latitude));
        setLongitude(parseFloat(currentLocation.coords.longitude));
      })();
    }
   
  }, [user, userLocation]);
console.log(userLocation)
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.ProfileEditArea}>
        
          <View style={{ width: 90, height: 90 }}>
            <TouchableOpacity
              style={styles.ProfilImage}
              onPress={() => {
                setChoosePhotoModal(true);
              }}
            >
              <Image
                source={{ uri: `${PhotoUrl}${user.profile_image}` }}
                style={{ width: "100%", height: "100%" }}
                borderRadius={50}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "#EA2A29",
                padding: 4,
                borderRadius: 50,
              }}
            >
              <Editıcon name="account-edit" size={20} color={"white"} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ padding: 10 }}>
          <View style={styles.Form}>
            <View>
              <Text style={styles.label}>İsim</Text>
              <TextInput
                style={styles.Input}
                value={name}
                onChangeText={(value) => setName(value)}
                selectTextOnFocus={true}
                placeholder={user.name}
              />
            </View>

            {user.role == "Kurumsal Hesap" ? (
              <>
                <View>
                  <Text style={styles.label}>Iban Numarası</Text>
                  <TextInput
                    style={styles.Input}
                    value={iban}
                    onChangeText={(value) => setiban(value)}
                  />
                </View>
                <View>
                  <Text style={styles.label}>Website Linki</Text>
                  <TextInput
                    style={styles.Input}
                    value={link}
                    onChangeText={(value) => setlink(value)}
                  />
                </View>
                <View>
                  <Text style={styles.label}>Sabit Telefon (Opsiyonel)</Text>

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
                        style={[
                          styles.Input,
                          { width: "100%", borderRadius: 0 },
                        ]}
                        value={`${phone}`}
                        onChangeText={(value) => setphone(value)}
                        keyboardType="name-phone-pad"
                      />
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={styles.label}>Kaç yıldır sektördesiniz?</Text>
                  <TextInput
                    style={styles.Input}
                    value={yearsOfSector}
                    onChangeText={(value) => setyearsOfSector(value)}
                  />
                </View>
              </>
            ) : (
              ""
            )}

            {/* <View>
            <Text style={styles.label}>Cep Telefonu</Text>
            <TextInput style={styles.Input} keyboardType='number-pad' value={phoneNumber} onChangeText={onChangeText} placeholder='0544 444 44 44' maxLength={14}/>
          </View> */}
            <View style={{ gap: 10 }}>
              <Text style={{ fontSize: 13, color: "#333" }}>
                Profil arka plan rengi
              </Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 20 }}
              >
                <TouchableOpacity
                  style={{
                    padding: 20,
                    backgroundColor: currentColor,
                    width: "20%",
                    borderWidth: 1,
                  }}
                  onPress={() => setopenColorPicker(!openColorPicker)}
                ></TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#E54242",
                    padding: 10,
                    borderRadius: 10,
                  }}
                  onPress={() => setopenColorPicker(!openColorPicker)}
                >
                  <Text style={{ color: "white" }}>
                    {openColorPicker == true ? "Kapat" : "Seç"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={[
                styles.card,
                {
                  opacity: openColorPicker ? 1 : 0,
                  visibility: openColorPicker ? 'visible' : 'hidden',
                },
            
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

            {user?.role === "Kurumsal Hesap" &&  (
              <View style={{ height: 300 }}>
                <MapView
                  style={{ flex: 1 }}
                  zoomControlEnabled={true}
                  region={{
                    latitude: parseFloat(user?.latitude) == null ? parseFloat(latitude) : parseFloat(user.latitude) , // Türkiye'nin merkezi Ankara'nın enlemi
                    longitude:parseFloat(user?.longitude) == null ? parseFloat(longitude) : parseFloat(user.longitude), // Türkiye'nin merkezi Ankara'nın boylamı
                    latitudeDelta: 9, // Harita yakınlığı
                    longitudeDelta: 9,
                  }}
                  onPress={handleMapPress}
                >
                       {selectedLocation ? (
              <Marker coordinate={selectedLocation} />
            ) : (
              <Marker coordinate={userLocation} />
            )}
      
               
                  
                </MapView> 
              
              </View>
            )}

            <View>
              <Text style={styles.label}>Cep Numarası</Text>
              <TextInput
                style={[styles.Input, { color: checked ? "#333" : "grey" }]}
                value={mobilPhone}
                onChangeText={(value) => setmobilPhone(value)}
                editable={checked ? true : false}
              />
              <CheckBox
                checked={checked}
                onPress={toggleCheckbox}
                // Use ThemeProvider to make change for all checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="red"
                title={"Güncellemek İstiyorum"}
                containerStyle={{ marginRight: 0, paddingRight: 0 }}
                style={{ margin: 0 }}
              />
            </View>
            <View
              style={{
                paddingLeft: 10,
                display: checked ? "flex" : "none",
                gap: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#E54242",
                  padding: 10,
                  width: "50%",
                  borderRadius: 6,
                }}
              >
                <Text style={{ textAlign: "center", color: "white" }}>
                  Dosya Seç
                </Text>
              </TouchableOpacity>
              <Text style={{ color: "red", fontSize: 12 }}>
                Lütfen Belge Formatına Uygun Şeklinde Ekleyiniz
              </Text>

              <View style={[styles.card, { gap: 15, height: "auto" }]}>
                <Text>Belge Formatı:</Text>
                <Text>
                  xxxx mail adresim ve xxxx telefon numarası ile kayıtlı olan
                  üyeliğimdeki
                </Text>
                <Text>
                  xxxx mail addresim ve xxxx telefon numarasıyla
                  değiştirilmesini talep ediyorum
                </Text>
                <Text>isim soyisim</Text>
                <Text>İmza</Text>
                <View style={{ width: "100%", alignItems: "center" }}>
                  <View
                    style={{
                      width: 250,
                      height: 200,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={require("./tcpng.png")}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={styles.updatebtn} onPress={handleUpdate}>
              <Text style={styles.btnText}>Güncelle</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          isVisible={UpdateSuccess}
          style={styles.modal}
          animationIn={"fadeInRight"}
          animationOut={"fadeOutLeft"}
        >
          <View style={styles.modalContent}>
            <Icon name="check" size={25} color={"green"} />
            <Text style={{ textAlign: "center", color: "green" }}>
              Profiliniz Başarıyla Güncellendi
            </Text>
          </View>
        </Modal>
        <Modal
          isVisible={loadingModal}
          style={styles.modal}
          animationIn={"fadeInRight"}
          animationOut={"fadeOutLeft"}
        >
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" />
            <Text style={{ textAlign: "center", color: "green" }}>
              Profiliniz Güncelleniyor
            </Text>
          </View>
        </Modal>
      </ScrollView>
    </TouchableWithoutFeedback>
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
    backgroundColor: "#F7F7F9",
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
});
