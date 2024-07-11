import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { React, useState, useEffect, useCallback } from "react";
import BackIcon from "react-native-vector-icons/AntDesign";
import EyeIcon from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import IconSocialMedia from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/Entypo";
import MailCheck from "react-native-vector-icons/MaterialCommunityIcons";
import { CheckBox } from "react-native-elements";
import Modal from "react-native-modal";
import { apiRequestPost } from "../../../components/methods/apiRequest";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

export default function Login({ navigation }) {
  const route = useRoute();

  const [eye, seteye] = useState("eye-off-sharp");
  const [Show, setShow] = useState(false);
  const show = () => {
    setShow(!Show);
  };
  const [checked, setChecked] = useState(false);
  const toggleCheckbox = () => setChecked(!checked);

  {
    /* ınput states*/
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailControl, setemailControl] = useState(false);
  const [passControl, setpassControl] = useState(false);
  const [showMailSendAlert, setshowMailSendAlert] = useState(false);
  {
    /* ınput states*/
  }

  {
    /* ınput control*/
  }

  const handleTextInputChange = (text) => {
    setEmail(text);
  };

  const Submit = () => {
    if (!(email.trim() !== "" && email.includes("@"))) {
      setemailControl(true);
      setTimeout(() => {
        setemailControl(false);
      }, 2000);
    } else if (password.length < 1) {
      setpassControl(true);
      setTimeout(() => {
        setpassControl(false);
      }, 2000);
    } else {
      setTimeout(() => {}, 9000);
    }

    apiRequestPost("login", {
      email: email,
      password: password,
    }).then((res) => {
      if (res.data.status) {
        SecureStore.setItemAsync("user", JSON.stringify(res.data));
        navigation.push("Home", {
          status: "login",
        });
      } else {
        setshowMailSendAlert(true);
        setStatus(false);
        setStatusMessage(res.data.message);
      }
    });
  };

  const [status, setStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState(false);

  const [showLengthAlert, setShowLengthAlert] = useState(false);
  const [showUpperAlert, setShowUpperAlert] = useState(false);
  const [showSymbolAlert, setShowSymbolAlert] = useState(false);
  const [showNumberAlert, setShowNumberAlert] = useState(false);
  const [textfull, settextfull] = useState(false);

  const [submitDisabled, setsubmitDisabled] = useState(false);
  const handlePasswordChange = (text) => {
    setPassword(text);
    // Şifre uzunluğunu kontrol edin ve uyarıyı göstermek/gizlemek için durumu güncelleyin

    if (text.length < 5) {
      setShowLengthAlert(true);
    } else {
      setShowLengthAlert(false);
    }
  };

  {
    /* ınput control*/
  }

  const IsShowAlert = route.params?.showAlert;

  const message = route.params?.message;
  Login.navigationOptions = {
    headerShown: false, // Başlık gizleme
  };

  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);

      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }, [])
  );
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {loading ? (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size={"large"} color="#333" />
          </View>
        ) : (
          <>
            {!IsShowAlert && <View style={[styles.header, {}]}></View>}

            <View style={!IsShowAlert ? { padding: 10 } : null}>
              <View
                style={{
                  backgroundColor: "#E7FCEB",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 10,
                  gap: 15,
                  display: IsShowAlert ? "flex" : "none",
                }}
              >
                <View>
                  <BackIcon name="checkcircle" color={"#1D8027"} size={30} />
                </View>
                <View style={{ flex: 1.9 / 2 }}>
                  <Text style={{ color: "#1D8027", fontSize: 12 }}>
                    Hesabınız oluşturuldu. Hesabınızı etkinleştirmek için lütfen
                    e-posta adresinize gönderilen doğrulama bağlantısını
                    tıklayarak e-postanızı onaylayın
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.logIn}>
              <View style={styles.form}>
                <View style={{ gap: 20 }}>
                  <View>
                    <Text
                      style={{
                        color: "#17243e",
                        fontSize: 24,
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Giriş Yap
                    </Text>
                  </View>

                  <View style={{ gap: 10 }}>
                    <View style={{ paddingLeft: 10 }}>
                      <Text
                        style={{ fontSize: 15, color: "grey", fontWeight: 600 }}
                      >
                        E-Mail
                      </Text>
                    </View>

                    <TextInput
                      style={styles.Input}
                      placeholder="E-Posta Adresi"
                      value={email}
                      onChangeText={handleTextInputChange}
                    />
                    <Text
                      style={{
                        color: "red",
                        fontWeight: "500",
                        fontSize: 12,
                        display: emailControl ? "flex" : "none",
                      }}
                    >
                      Lütfen Geçerli Bir E-Posta Adresi Giriniz!
                    </Text>
                  </View>
                  <View style={{ gap: 10 }}>
                    <View style={{ paddingLeft: 10 }}>
                      <Text
                        style={{ fontSize: 15, color: "grey", fontWeight: 600 }}
                      >
                        Şifre
                      </Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={{
                          position: "absolute",
                          right: 10,
                          top: 15, // Bu değeri TextInput'un yüksekliğine göre ayarlayın
                          zIndex: 1,
                        }}
                        onPress={show}
                      >
                        <EyeIcon
                          name={Show ? "eye" : "eye-off-sharp"}
                          size={20}
                          color={"#333"}
                        />
                      </TouchableOpacity>
                      <TextInput
                        style={styles.Input}
                        placeholder="Şifre"
                        secureTextEntry={Show ? false : true}
                        value={password}
                        onChangeText={handlePasswordChange}
                      />

                      {passControl && (
                        <Text
                          style={{
                            color: "red",
                            fontWeight: "500",
                            fontSize: 12,
                          }}
                        >
                          Lütfen Şifrenizi girin!
                        </Text>
                      )}
                      {showLengthAlert && (
                        <Text style={{ color: "red" }}>
                          Şifreniz en az 5 karakter olmalıdır!
                        </Text>
                      )}
                      {showNumberAlert && (
                        <Text style={{ color: "red" }}>
                          Şifrenizde en az bir rakam olmalıdır.
                        </Text>
                      )}
                      {showUpperAlert && (
                        <Text style={{ color: "red" }}>
                          Şifrenizde en az bir büyük harf olmalıdır!
                        </Text>
                      )}
                      {showSymbolAlert && (
                        <Text style={{ color: "red" }}>
                          Şifrenizde en az bir sembol olmalıdır!
                        </Text>
                      )}
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 15,
                      }}
                    >
                      <TouchableOpacity
                        onPress={toggleCheckbox}
                        style={[
                          styles.checkbox,
                          checked ? styles.checked : null,
                        ]}
                      >
                        {checked ? (
                          <FontAwesome5Icon
                            name="check-square"
                            size={18}
                            color="black"
                          />
                        ) : (
                          <FontAwesome5Icon
                            name="square"
                            size={18}
                            color="black"
                          />
                        )}
                        <Text style={styles.checkboxLabel}>Beni Hatırla</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{}}
                        onPress={() => {
                          navigation.navigate("Forgot");
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            letterSpacing: 0.5,
                            color: "#5D96F1",
                            textDecorationLine: "underline",
                          }}
                        >
                          Şifremi unuttum
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      opacity:
                        showLengthAlert == true ||
                        showNumberAlert == true ||
                        showSymbolAlert == true ||
                        showUpperAlert == true ||
                        textfull == true ||
                        submitDisabled == true
                          ? 0.3
                          : 1,
                      backgroundColor: "#EA2C2E",
                      padding: 8,
                      borderRadius: 5,
                    }}
                    onPress={Submit}
                    disabled={
                      showLengthAlert == true ||
                      showNumberAlert == true ||
                      showSymbolAlert == true ||
                      showUpperAlert == true
                        ? true
                        : false
                    }
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontWeight: "600",
                      }}
                    >
                      Giriş Yap
                    </Text>
                  </TouchableOpacity>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#E7EBEE",
                        height: 1,
                        padding: 1,
                        width: "40%",
                      }}
                    />
                    <Text style={{ color: "#666666" }}>veya</Text>
                    <View
                      style={{
                        backgroundColor: "#E7EBEE",
                        height: 1,
                        padding: 1,
                        width: "40%",
                      }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#EEF4FE",
                        padding: 10,
                        width: "45%",
                        height: 50,
                        borderRadius: 5,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <Image
                        source={require("../../../assets/gogle.png")}
                        style={{ width: "25%", height: "100%" }}
                        resizeMode="contain"
                      />
                      <Text style={{ fontWeight: "bold", color: "#333" }}>
                        Google
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#EEF4FE",
                        padding: 8,
                        width: "45%",
                        height: 50,
                        borderRadius: 5,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <Icon
                        name="facebook-with-circle"
                        size={35}
                        color={"#1A77F3"}
                      />
                      <Text style={{ fontWeight: "bold", color: "#333" }}>
                        Facebook
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={{ textAlign: "center", marginTop: 20 }}>
                      <Text style={{ fontSize: 13, color: "#333" }}>
                        Henüz üye değil misiniz?{" "}
                      </Text>

                      <Text
                        style={{ fontWeight: "bold", color: "#1A77F3" }}
                        onPress={() => {
                          navigation.navigate("Register");
                        }}
                      >
                        Üye Ol
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <Modal isVisible={showMailSendAlert} style={styles.modal}>
              <View style={styles.modalContent}>
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#333",
                      padding: 5,
                      borderRadius: 20,
                    }}
                    onPress={() => setshowMailSendAlert(false)}
                  >
                    <IconSocialMedia name="close" size={20} color={"white"} />
                  </TouchableOpacity>
                </View>

                <View style={{ gap: 10 }}>
                  <View style={{ alignItems: "center" }}>
                    <MailCheck
                      name="close"
                      size={55}
                      color={status ? "green" : "red"}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 14,
                        color: "#333",
                        letterSpacing: 0.5,
                      }}
                    >
                      {statusMessage}
                    </Text>
                  </View>
                </View>
              </View>
            </Modal>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    margin: 0,
  },
  header: {
    flex: 0.2,
    justifyContent: "center",
  },
  logIn: {
    borderTopLeftRadius: 20,
    display: "flex",
    borderTopRightRadius: 20,
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    fontSize: 13,
    color: "#333",
    marginLeft: 5,
  },
  form: {
    padding: 0,
    gap: 20,
    height: "100%",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
  Input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ebebeb",
    borderRadius: 5,
    fontSize: 14,
  },
  modal: {
    justifyContent: "center",
    margin: 0,
    padding: 30,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    paddingBottom: 50,
    borderRadius: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});
