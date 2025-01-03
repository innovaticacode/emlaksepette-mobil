import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  TouchableOpacity,
  Switch,
  Modal,
  Touchable,
  ImageBackground,
  Alert,
  BackHandler,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import ModalEdit from "react-native-modal";
import DotIcon from "react-native-vector-icons/Entypo";
import RNPickerSelect from "react-native-picker-select";
import { getValueFor } from "../../../components/methods/user";
import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from "react-native-alert-notification";
import { ActivityIndicator } from "react-native-paper";
import { apiUrl } from "../../../components/methods/apiRequest";
import mime from "mime";
import { checkFileSize } from "../../../utils";

export default function UpdateUsers() {
  const route = useRoute();
  const navigation = useNavigation();
  const { UserID, fetcData } = route.params;
  const [display, setdisplay] = useState(false);
  const translateY = useRef(new Animated.Value(400)).current;
  const [UserTypeValue, setUserTypeValue] = useState("");
  const [isSelected, setisSelected] = useState(false);
  const [isShowSheet, setisShowSheet] = useState(false);
  const [isShowText, setisShowText] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setmessage] = useState({});
  const [nameAndSurname, setnameAndSurname] = useState("");
  const [title, settitle] = useState("");
  const [email, setemail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setpassword] = useState("");
  const [UserType, setUserType] = useState("");
  const [isActive, setisActive] = useState(0);
  const [loadingUpdate, setloadingUpdate] = useState(false);
  const [user, setuser] = useState({});
  const [roles, setroles] = useState([]);
  const [userDetail, setuserDetail] = useState([]);
  const [loading, setloading] = useState(false);
  const [userImage, setuserImage] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [showPassword, setshowPassword] = useState(true);
  const [choose, setchoose] = useState(false);
  const [image, setImage] = useState(null);
  const [fileSize, setfileSize] = useState(null);
  const [selectedImage, setselectedImage] = useState(false);

  const isAnyFieldFilled = () => {
    return (
      title !== userDetail?.title ||
      email !== userDetail.email ||
      phoneNumber !== userDetail.mobile_phone ||
      password !== "" ||
      nameAndSurname !== userDetail.name
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      // En az bir alanın dolu olup olmadığını kontrol et
      if (isAnyFieldFilled()) {
        // Eğer en az bir alan doluysa, kullanıcıya uyarı göster
        e.preventDefault(); // Geri gitmeyi engelle

        Alert.alert("Uyarı", "Sayfadan çıkmak istediğinizden emin misiniz?", [
          {
            text: "Hayır",
            onPress: () => null,
            style: "cancel",
          },
          {
            text: "Evet",
            onPress: () => {
              navigation.dispatch(e.data.action);
            },
          },
        ]);
      } else {
        navigation.dispatch(e.data.action);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigation, route, title, email, phoneNumber, password, nameAndSurname]);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => {
      const newState = !previousState; // Mevcut durumun tersini alıyoruz
      const newActive = newState ? 5 : 0; // True ise 5 (engelli), false ise 0 (aktif) olacak
      setisActive(newActive); // Güncellenmiş isActive değeri
      return newState;
    });
  };

  useEffect(() => {
    getValueFor("user", setuser);
  }, []);

  const fetchData = async () => {
    try {
      if (user?.access_token) {
        const response = await axios.get(`${apiUrl}institutional/roles`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });

        // Dönüştürülmüş veriyi state'e atama
        setroles(response.data.roles);
      }
    } catch (error) {
      console.error("Veri getirme hatası:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const roleItems = roles.map((role) => ({
    label: role.name,
    value: role.id.toString(), // ID'yi string olarak belirtmek önemlidir.
  }));

  const updateUser = async () => {
    setloadingUpdate(true);
    let formdata = new FormData();
    formdata.append("_method", "POST");
    formdata.append("name", nameAndSurname);
    formdata.append("title", title);
    formdata.append("email", email);
    formdata.append("mobile_phone", phoneNumber);
    formdata.append("password", password);
    formdata.append("type", UserType);
    formdata.append("is_active", isActive);

    if (image && image.uri) {
      const newImageUri =
        Platform.OS === "android"
          ? image.uri.replace("file:/", "file://") // Add "file://" for Android
          : image.uri.replace("file://", ""); // Clean for iOS

      const mimeType = mime.getType(newImageUri) || "image/jpeg";
      formdata.append("profile_image", {
        uri: newImageUri,
        type: mimeType,
        name: image.fileName || "Image.jpeg",
      });
    }

    if (user?.access_token) {
      console.debug("formdata", formdata);

      try {
        const response = await axios.post(
          `${apiUrl}institutional/users/${UserID}`, // URL
          formdata, // Güncellenen form verisi
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
              "Content-Type": "multipart/form-data",
            },
            timeout: 10000,
          }
        );

        setmessage(response.data.success);
        if (response.data.includes("başarıyla güncellendi")) {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Başarılı",
            textBody: response.data.success,
            button: "Tamam",
            onHide: () => {
              // Navigate to UsersList
              navigation.navigate("UsersList");
            },
          });

          // Durumları sıfırla
          setnameAndSurname("");
          setemail("");
          setpassword("");
          settitle("");
          setphoneNumber("");
          setUserType("");
        }
      } catch (error) {
        // Hata ayrıntılarını yazdır
        if (error.response) {
          console.error("Sunucudan dönen hata:", error.response.data);
        } else {
          console.error("İstek sırasında hata oluştu:", error.message);
        }

        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: "Hata!",
          textBody:
            error.response?.data?.message ||
            "Veri gönderimi sırasında bir hata oluştu.",
          button: "Tamam",
        });
      } finally {
        setloadingUpdate(false);
      }
    }
  };

  const getUserDetail = async () => {
    console.log("user", UserID);
    setloading(true);
    try {
      if (user?.access_token) {
        const response = await axios.get(`${apiUrl}users/${UserID}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        // Dönüştürülmüş veriyi state'e atama
        setuserDetail(response.data.user);
      }
    } catch (error) {
      console.error("Veri getirme hatası:", error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getUserDetail();
  }, [user]);

  useEffect(() => {
    if (userDetail && typeof userDetail.status !== "undefined") {
      setIsEnabled(userDetail.status === 5); // Eğer status 5 ise true yapıyoruz
      setisActive(userDetail.status); // isActive'ı userDetail'den al
    }

    setnameAndSurname(userDetail?.name);
    settitle(userDetail?.title);
    setemail(userDetail?.email);
    setphoneNumber(userDetail?.mobile_phone);
    setUserType(userDetail?.role_id);
    setuserImage(userDetail?.profile_image);
    setImage(userDetail?.profile_image);
  }, [userDetail]);

  const formatPhoneNumber = (value) => {
    // Sadece sayısal karakterleri kabul eder
    const numericValue = value.replace(/[^0-9]/g, "");

    // Telefon numarası tamamen silindiyse, boş bir dize döndür
    if (numericValue.length === 0) {
      return "";
    }

    // İlk karakteri zorunlu olarak 5 ile sınırla
    if (numericValue.length > 0 && numericValue[0] !== "5") {
      return "5";
    }

    // Telefon numarasını formatla: (5XX) XXX XX XX
    if (numericValue.length <= 3) {
      return `(${numericValue}`;
    } else if (numericValue.length <= 6) {
      return `(${numericValue.slice(0, 3)}) ${numericValue.slice(3)}`;
    } else if (numericValue.length <= 8) {
      return `(${numericValue.slice(0, 3)}) ${numericValue.slice(
        3,
        6
      )} ${numericValue.slice(6)}`;
    } else {
      return `(${numericValue.slice(0, 3)}) ${numericValue.slice(
        3,
        6
      )} ${numericValue.slice(6, 8)} ${numericValue.slice(8, 10)}`;
    }
  };

  const handlePhoneNumberChange = (value) => {
    // Formatlama işlemi sırasında sayıların doğru şekilde yerleştirilmesini sağlar
    const formattedValue = formatPhoneNumber(value);
    setphoneNumber(formattedValue);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;

      // Dosya boyutunu kontrol et
      const isFileSizeValid = await checkFileSize(imageUri);
      if (!isFileSizeValid) {
        setchoose(false);
        setTimeout(() => {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: "Uyarı",
            textBody: "Seçtiğiniz fotoğraf 5 mb den yüksek olamaz",
            button: "Tamam",
            onHide: () => {
              setchoose(true);
            },
          });
        }, 800);
        return;
      }
      setImage(result.assets[0]); // Seçilen fotoğrafı state'e kaydediyoruz
      setchoose(false); // Modal'ı kapatıyoruz
      setselectedImage(true);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;

      // Dosya boyutunu kontrol et
      const isFileSizeValid = await checkFileSize(imageUri);
      if (!isFileSizeValid) {
        setchoose(false);
        setTimeout(() => {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: "Uyarı",
            textBody: "Çektiğiniz fotoğraf 5 mb den yüksek olamaz",
            button: "Tamam",
            onHide: () => {
              setchoose(true);
            },
          });
        }, 800);
        return;
      }
      setImage(result.assets[0]); // Çekilen fotoğrafı state'e kaydediyoruz
      setchoose(false); // Modal'ı kapatıyoruz
      setselectedImage(true);
    }
  };

  const removeProfileImage = () => {
    setImage(null); // Fotoğrafı null yaparak yerelde kaldırıyoruz
    setchoose(false); // Modal'ı kapatıyoruz
  };
  return (
    <AlertNotificationRoot>
      {loading ? (
        <View
          style={{
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator color="#333" size={"large"} />
        </View>
      ) : (
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={style.container}>
            <View style={[style.Form]}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: 10,
                }}
              >
                <View>
                  <TouchableOpacity
                    style={{
                      width: 96,
                      height: 96,
                      backgroundColor: "#fafafafa",
                      borderRadius: 50,
                      borderWidth: 2,
                      borderColor: "#DDDDDD",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      setchoose(true);
                    }}
                  >
                    {selectedImage ? (
                      <ImageBackground
                        source={{ uri: selectedImage?.uri }}
                        style={{ width: "100%", height: "100%" }}
                        borderRadius={50}
                      />
                    ) : image ? (
                      <ImageBackground
                        source={{
                          uri: `${apiUrl}storage/profile_images/${userImage}`,
                        }}
                        style={{ width: "100%", height: "100%" }}
                        borderRadius={50}
                      />
                    ) : (
                      <Icon name="add-a-photo" size={30} color={"#333"} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={style.Inputs}>
                <View>
                  <Text style={style.Label}>İsim Soyisim</Text>
                  <TextInput
                    style={style.Input}
                    value={nameAndSurname}
                    onChangeText={(value) => setnameAndSurname(value)}
                  />
                </View>
                <View>
                  <Text style={style.Label}>Unvan</Text>
                  <TextInput
                    style={style.Input}
                    value={title}
                    onChangeText={(value) => settitle(value)}
                  />
                </View>
                <View>
                  <Text style={style.Label}>Email</Text>
                  <TextInput
                    style={style.Input}
                    value={email}
                    onChangeText={(value) => setemail(value)}
                  />
                </View>
                <View>
                  <Text style={style.Label}>Cep No</Text>
                  <TextInput
                    style={style.Input}
                    keyboardType="phone-pad"
                    value={
                      phoneNumber === "null"
                        ? "Telefon numarası girilmemiştir"
                        : phoneNumber
                    }
                    onChangeText={handlePhoneNumberChange}
                  />
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 7,
                      alignItems: "center",
                    }}
                  >
                    <Text style={style.Label}>Şifre</Text>
                    <Text style={[style.Label, { fontSize: 12 }]}>
                      (Değiştirmek İstemiyorsanız Boş bırakın)
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        setshowPassword(!showPassword);
                      }}
                      style={{
                        position: "absolute",
                        right: 10,
                        top: 10,
                        zIndex: 999,
                        justifyContent: "center",
                      }}
                    >
                      <DotIcon
                        name={showPassword ? "eye-with-line" : "eye"}
                        size={23}
                        color={"#333"}
                      />
                    </TouchableOpacity>
                    <TextInput
                      style={style.Input}
                      value={password}
                      onChangeText={(value) => setpassword(value)}
                      secureTextEntry={showPassword}
                    />
                  </View>
                </View>
                <View>
                  <Text style={style.Label}>Kullanıcı Tipi</Text>
                  <RNPickerSelect
                    doneText="Tamam"
                    value={UserType}
                    placeholder={{
                      label: "Seçiniz...",
                      value: null,
                    }}
                    style={pickerSelectStyles}
                    onValueChange={(value) => setUserType(value)}
                    items={roleItems}
                  />
                </View>

                <View style={{ flexDirection: "row", gap: 20 }}>
                  <Switch
                    style={{ left: 7 }}
                    trackColor={{ false: "#f4f3f4", true: "#E54242" }}
                    thumbColor={isEnabled ? "#FFF" : "#f4f3f4"}
                    ios_backgroundColor="#9FA6BC"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                  <Text style={[style.Label, { top: 5 }]}>
                    Hesabı Pasife Al
                  </Text>
                </View>
              </View>
              <View style={{ width: "100%", alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#EA2A29",
                    padding: 9,
                    width: "90%",
                    borderRadius: 5,
                    opacity: loadingUpdate ? 0.5 : 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={updateUser}
                >
                  {loadingUpdate ? (
                    <ActivityIndicator color="white" size={"small"} />
                  ) : (
                    <Text
                      style={[
                        style.label2,
                        {
                          color: "white",
                          textAlign: "center",
                          fontSize: 14,
                          fontWeight: "700",
                        },
                      ]}
                    >
                      Kaydet
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/**/}
            <ModalEdit
              isVisible={modalVisible}
              onBackdropPress={() => setModalVisible(false)}
              swipeDirection={["down"]}
              onSwipeComplete={() => setModalVisible(false)}
              backdropColor="transparent"
              style={style.modal3}
            >
              <View style={[style.modalContent3, { gap: 10 }]}>
                <View style={{ alignItems: "center", paddingTop: 15 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#eaeff5",
                      padding: 4,
                      width: "15%",
                      borderRadius: 20,
                    }}
                  />
                </View>
                <View style={{ gap: 10, padding: 10 }}>
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      backgroundColor: "#EA2A28",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ color: "white" }}>Kullanıcıyı Sil</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      backgroundColor: "#79ad69",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ color: "white" }}>Kullanıcıyı Düzenle</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ModalEdit>
            <ModalEdit
              isVisible={choose}
              style={style.modal2}
              animationIn={"fadeInDown"}
              animationOut={"fadeOutDown"}
              onBackdropPress={() => setchoose(false)}
              swipeDirection={["down"]}
              onSwipeComplete={() => setchoose(false)}
            >
              <View style={[style.modalContent2, { paddingBottom: 10 }]}>
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
                    <Icon name="photo" size={23} color={"#333"} />
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
                    <Icon name="add-a-photo" size={21} color={"#333"} />
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
                    onPress={() => removeProfileImage()} // Yalnızca yerelde kaldırmak isterseniz bu işlevi kullanın
                    // onPress={removeProfileImageFromServer} // Sunucudan da kaldırmak isterseniz bu işlevi kullanın
                  >
                    <Icon
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
            </ModalEdit>
          </View>
        </TouchableWithoutFeedback>
      )}
    </AlertNotificationRoot>
  );
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#ebebeb",
    borderRadius: 5,
    padding: 9,
    fontSize: 14, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#eaeff5",
    borderRadius: 5,
    padding: 9,
    fontSize: 14, // to ensure the text is never behind the icon
  },
});
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  Form: {
    width: "100%",
    padding: 2,
  },
  Inputs: {
    gap: 20,
    padding: 10,
  },
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
  Label: {
    fontSize: 13,
    bottom: 3,
    left: 6,
    fontWeight: "600",
    letterSpacing: 0.5,
    color: "#333",
  },
  bottomSheetItem: {
    width: "100%",
    padding: 5,
  },
  animatedView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#FFFF",
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
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 20,
  },
  label2: {
    fontSize: 14,

    fontWeight: "300",
    letterSpacing: 0.5,
  },
  card: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "90%",
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    gap: 10,

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
  profileImage: {
    width: 60,
    height: 60,
    backgroundColor: "red",

    alignItems: "center",
    justifyContent: "center",
  },
  profileName: {
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
  modalView: {
    width: "70%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    gap: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  Btn: {
    backgroundColor: "#E54242",
    paddingLeft: 20,
    paddingRight: 20,
    padding: 8,
    justifyContent: "center",
    borderRadius: 5,
  },
  btnText: {
    color: "white",

    letterSpacing: 0.5,
  },
  modal3: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent3: {
    backgroundColor: "#f5f5f7",

    height: "30%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
