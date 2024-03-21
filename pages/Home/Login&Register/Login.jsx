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
import { React, useState } from "react";
import BackIcon from "react-native-vector-icons/AntDesign";
import EyeIcon from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import IconSocialMedia from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/Entypo";
import MailCheck from "react-native-vector-icons/MaterialCommunityIcons";
import { CheckBox } from "react-native-elements";
import Modal from "react-native-modal";
export default function Login({ navigation }) {
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
      setshowMailSendAlert(true);
      setTimeout(() => {
        setshowMailSendAlert(false);
      }, 9000);
      setEmail('')
      setPassword('')
    }
  };


  const [showLengthAlert, setShowLengthAlert] = useState(false);
  const [showUpperAlert, setShowUpperAlert] = useState(false);
  const [showSymbolAlert, setShowSymbolAlert] = useState(false);
  const [showNumberAlert, setShowNumberAlert] = useState(false);
  const [textfull, settextfull] = useState(false);

  const [submitDisabled, setsubmitDisabled] = useState(false);
  const handlePasswordChange = (text) => {
    setPassword(text);
    // Şifre uzunluğunu kontrol edin ve uyarıyı göstermek/gizlemek için durumu güncelleyin

    if (text.length < 6) {
      setShowLengthAlert(true);
    } else {
      setShowLengthAlert(false);
    }

    //rakam kontrölü
    const numberRegex = /[0-9]/;
    if (!numberRegex.test(text)) {
      setShowNumberAlert(true);
    } else {
      setShowNumberAlert(false);
    }
    //Büyük harf kontrolü
    const upperCaseRegex = /[A-Z]/;
    if (!upperCaseRegex.test(text)) {
      setShowUpperAlert(true);
    } else {
      setShowUpperAlert(false);
    }
    // Sembole kontrolü
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!symbolRegex.test(text)) {
      setShowSymbolAlert(true);
    } else {
      setShowSymbolAlert(false);
    }
  };

  {
    /* ınput control*/
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.logIn}>
          <KeyboardAwareScrollView>
            <View style={styles.form}>
              <View>
                <Text
                  style={{ color: "#17243e", fontSize: 20, fontWeight: "bold" }}
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
                  placeholder="example@gmail.com"
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
                    style={{ position: "absolute", right: 10, top: 7 }}
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
                    placeholder="Şifrenizi Girin"
                    secureTextEntry={Show ? false : true}
                    value={password}
                    onChangeText={handlePasswordChange}
                  />

                  {passControl && (
                    <Text
                      style={{ color: "red", fontWeight: "500", fontSize: 12 }}
                    >
                      Lütfen Şifrenizi girin!
                    </Text>
                  )}
                  {showLengthAlert && (
                    <Text style={{ color: "red" }}>
                      Şifreniz en az 6 karakter olmalıdır!
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
                  <View>
                    <CheckBox
                      checked={checked}
                      onPress={toggleCheckbox}
                      // Use ThemeProvider to make change for all checkbox
                      iconType="material-community"
                      checkedIcon="checkbox-marked"
                      uncheckedIcon="checkbox-blank-outline"
                      checkedColor="#EA2C2E"
                      title={"Beni Hatırla"}
                      textStyle={{ fontSize: 13, fontWeight: 400 }}
                      size={22}
                      containerStyle={{
                        padding: 0,
                        backgroundColor: "transparent",
                        borderWidth: 0,
                      }}
                    />
                  </View>
                  <TouchableOpacity style={{}}>
                    <Text
                      style={{
                        fontSize: 13,
                        letterSpacing: 0.5,
                        color: "#5D96F1",
                        textDecorationLine: "underline",
                      }}
                    >
                      Şifremi Unuttum?
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
                  borderRadius: 10,
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
                <Text>OR</Text>
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
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#EEF4FE",
                    padding: 10,
                    width: "45%",
                    height: 50,
                    borderRadius: 10,
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
                    borderRadius: 10,
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
            </View>
            <View>
              <Text style={{ textAlign: "center" }}>
                <Text style={{ fontSize: 13, color: "#333" }}>
                  Henüz Üye Değilmisiniz?{" "}
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
          </KeyboardAwareScrollView>
        </View>
        <Modal isVisible={showMailSendAlert} style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
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

            <View style={{gap:10}}>
              <View style={{ alignItems: "center" }}>
                <MailCheck name="email-check" size={55} color={"green"} />
              </View>
              <View>
                <Text style={{textAlign:'center',fontSize:14,color:'#333',letterSpacing:0.5}}>
                  Hesabınız oluşturuldu. Hesabınızı etkinleştirmek için lütfen
                  e-posta adresinize gönderilen doğrulama bağlantısını
                  tıklayarak e-postanızı onaylayın.
                </Text>
              </View>
            </View>

          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flex: 0.2,
    justifyContent: "center",
    paddingLeft: 35,
    paddingRight: 35,
  },
  logIn: {
    backgroundColor: "#FFFFFF",
    flex: 1.8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  form: {
    padding: 40,
    gap: 20,
  },
  Input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ebebeb",
    borderRadius: 10,
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
    height: 300,
    borderRadius: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});
