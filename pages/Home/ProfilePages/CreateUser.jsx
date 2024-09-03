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
  ScrollView,
} from "react-native";
import { Platform } from "react-native";
import { useState, useRef, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native";
import UserTypes from "./profileComponents/UserTypes";
import Icon from "react-native-vector-icons/MaterialIcons";
import ModalEdit from "react-native-modal";
import DotIcon from "react-native-vector-icons/Entypo";
import RNPickerSelect from "react-native-picker-select";
import { getValueFor } from "../../../components/methods/user";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ActivityIndicator } from "react-native-paper";
export default function CreateUser() {
  const route = useRoute();
  const navigation = useNavigation();

  const [display, setdisplay] = useState(false);
  const translateY = useRef(new Animated.Value(400)).current;

  const [UserTypeValue, setUserTypeValue] = useState("");
  const [isSelected, setisSelected] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    setisActive(isEnabled ? 0 : 1);
  };
  const [isShowSheet, setisShowSheet] = useState(false);
  const [isShowText, setisShowText] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);

  const [roles, setroles] = useState([]);

  const fetchData = async () => {
    try {
      if (user?.access_token) {
        const response = await axios.get(
          `https://emlaksepette.com/api/institutional/roles`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );

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
  // roles state'i güncellendikten sonra yazdırılmalı

  const [message, setmessage] = useState({});
  const [nameAndSurname, setnameAndSurname] = useState("");
  const [title, settitle] = useState("");
  const [email, setemail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setpassword] = useState("");
  const [UserType, setUserType] = useState(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isActive, setisActive] = useState(1);
  const [Succesalert, setSuccesalert] = useState(false);
  const [errorMessage, seterrorMessage] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!nameAndSurname) errors.nameAndSurname = "Bu alan zorunludur";
    if (!title) errors.title = "Bu alan zorunludur";
    if (!email) {
      errors.email = "Bu alan zorunludur";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Geçerli bir email adresi giriniz";
    }
    if (!phoneNumber) errors.phoneNumber = "Bu alan zorunludur";
    if (!password) {
      errors.password = "Bu alan zorunludur";
    } else if (password.length < 5)
      errors.password = "Şifre en az 5 karakter olmalıdır";
    if (!UserType) errors.UserType = "Bu alan zorunludur";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const [loadingUpdate, setloadingUpdate] = useState(false);
  const createUser = () => {
    if (!validateForm()) return;
    setloadingUpdate(true);
    let formdata = new FormData();
    formdata.append("name", nameAndSurname);
    formdata.append("title", title);
    formdata.append("email", email);
    formdata.append("mobile_phone", phoneNumber);
    formdata.append("password", password);
    formdata.append("type", UserType);

    if (user?.access_token) {
      axios
        .post(
          `https://emlaksepette.com/api/institutional/users`,
          formdata,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        )
        .then((response) => {
          setmessage(response.data.message);

          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Başarılı",
            textBody: response.data.message,
            button: "Tamam",
            onPressButton: () => {
              navigation.goBack();
              Dialog.hide();
            },
          });
          setnameAndSurname("");
          setemail("");
          setpassword("");
          settitle("");
          setphoneNumber("");
          setUserType("");
        })
        .catch((error) => {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Hata",
            textBody: error.response?.data?.errors.email[0],
            button: "Tamam",
            onPressButton: () => {
              Dialog.hide();
            },
          });

          console.error("API Hatası:", error);
        })
        .finally(() => {
          setloadingUpdate(false);
        });
    }
  };
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
  const [showPassword, setshowPassword] = useState(true);
  return (
    <AlertNotificationRoot>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        style={{ backgroundColor: "white" }}
      >
        <View style={style.container}>
          <View style={[style.Form]}>
            <View style={style.Inputs}>
              <View>
                <Text style={style.Label}>İsim Soyisim</Text>
                <TextInput
                  style={style.Input}
                  value={nameAndSurname}
                  onChangeText={(value) => setnameAndSurname(value)}
                />
                {validationErrors.nameAndSurname && (
                  <Text style={style.errorText}>
                    {validationErrors.nameAndSurname}
                  </Text>
                )}
              </View>
              <View>
                <Text style={style.Label}>Unvan</Text>
                <TextInput
                  style={style.Input}
                  value={title}
                  onChangeText={(value) => settitle(value)}
                />
                {validationErrors.title && (
                  <Text style={style.errorText}>
                    {" "}
                    {validationErrors.title}{" "}
                  </Text>
                )}
              </View>
              <View>
                <Text style={style.Label}>Email</Text>
                <TextInput
                  style={style.Input}
                  value={email}
                  onChangeText={(value) => setemail(value)}
                />
                {validationErrors.email && (
                  <Text style={style.errorText}>
                    {" "}
                    {validationErrors.email}{" "}
                  </Text>
                )}
              </View>
              <View>
                <Text style={style.Label}>Cep No</Text>
                <TextInput
                  style={style.Input}
                  value={phoneNumber}
                  onChangeText={handlePhoneNumberChange}
                  keyboardType="number-pad"
                />
                {validationErrors.phoneNumber && (
                  <Text style={style.errorText}>
                    {" "}
                    {validationErrors.phoneNumber}{" "}
                  </Text>
                )}
              </View>
              <View>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Text style={style.Label}>Şifre</Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setshowPassword(!showPassword);
                    }}
                    style={{
                      position: "absolute",
                      zIndex: 1,
                      right: 10,
                      top: 6,
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
                    secureTextEntry={showPassword}
                    value={password}
                    onChangeText={(value) => setpassword(value)}
                  />
                  {validationErrors.password && (
                    <Text style={style.errorText}>
                      {" "}
                      {validationErrors.password}{" "}
                    </Text>
                  )}
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
                {validationErrors.UserType && (
                  <Text style={style.errorText}>
                    {validationErrors.UserType}
                  </Text>
                )}
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
                onPress={createUser}
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
            isVisible={Succesalert}
            animationIn={"zoomInUp"}
            animationOut={"zoomOutUp"}
            onBackdropPress={() => setSuccesalert(false)}
            swipeDirection={["down"]}
            onSwipeComplete={() => setSuccesalert(false)}
            backdropColor="transparent"
            style={style.modal4}
          >
            <View style={[style.modalContent4, { gap: 10 }]}>
              <View style={{ alignItems: "center", padding: 15 }}>
                <Icon name="check-circle" size={35} color={"green"} />
              </View>
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  Kullanıcı oluşturuldu
                </Text>
              </View>
            </View>
          </ModalEdit>
        </View>
      </ScrollView>
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
    color: "#717171",
    fontWeight: "600", // to ensure the text is never behind the icon
  },
  inputAndroid: {
    padding: 10,
    borderWidth: 0.9,
    borderColor: "#DDDDDD",
    borderRadius: 5,
    fontSize: 13,
    backgroundColor: "#fafafafa",
    color: "#717171",
    fontWeight: "600", // to ensure the text is never behind the icon
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
  modal4: {
    backgroundColor: "#14141497",
    justifyContent: "center",
    margin: 0,
  },
  modalContent4: {
    backgroundColor: "#ffffff",
    margin: 10,
    borderRadius: 5,
    height: "15%",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 10,
  },
});
