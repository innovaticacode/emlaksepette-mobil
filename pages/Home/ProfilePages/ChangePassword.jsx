import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Eye from "react-native-vector-icons/Ionicons";
import { getValueFor } from "../../../components/methods/user";
import axios from "axios";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from "react-native-alert-notification";
import Modal from "react-native-modal";
import { ActivityIndicator } from "react-native-paper";
import { apiUrl } from "../../../components/methods/apiRequest";

export default function ChangePassword() {
  const navigation = useNavigation();

  const [SecureTextForPass1, setSecureTextForPass1] = useState(true);
  const [SecuretextForNewPass, setSecuretextForNewPass] = useState(true);
  const [SecureTextForNewPassAgain, setSecureTextForNewPassAgain] =
    useState(true);

  const ToggleForPass1 = () => setSecureTextForPass1(!SecureTextForPass1);
  const ToggleForPass2 = () => setSecuretextForNewPass(!SecuretextForNewPass);
  const ToggleForPass3 = () =>
    setSecureTextForNewPassAgain(!SecureTextForNewPassAgain);

  const [currentPasword, setcurrentPasword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [newPasswordconfirmation, setnewPasswordconfirmation] = useState("");
  const [changeLoading, setchangeLoading] = useState(false);
  const [user, setuser] = useState({});

  useEffect(() => {
    getValueFor("user", setuser);
  }, []);

  const postData = async () => {
    setchangeLoading(true);

    try {
      var formData = new FormData();
      formData.append("current_password", currentPasword);
      formData.append("new_password", newPassword);
      formData.append("new_password_confirmation", newPasswordconfirmation);

      const response = await axios.post(
        apiUrl + "client/password/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Başarılı",
        textBody: "Şifreniz başarıyla güncellendi.",
        button: "Tamam",
      });

      // Success durumunda Dialog'u belli bir süre sonra otomatik kapatma
      setTimeout(() => {
        Dialog.hide();
      }, 5000); // 5 saniye sonra otomatik kapanma
      setcurrentPasword("");
      setnewPassword("");
      setnewPasswordconfirmation("");
    } catch (error) {
      console.log("Error Response:", error.message); // Hata objesini konsola yazdır
      let errorMessage = "Bilinmeyen bir hata oluştu.";

      // Error mesajını daha kapsamlı kontrol et
      if (error.response?.data?.errors) {
        errorMessage = Object.values(error.response.data.errors)
          .flat()
          .join(", ");
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Hata",
        textBody: errorMessage || "Şifrenizin karakterleri uygun değil.",
        button: "Tamam",
      });
      console.log(errorMessage);

      // Hata durumunda özel mesaj gösterimi
    } finally {
      setchangeLoading(false);
    }
  };

  const HandleSubmit = () => {
    // Şifre koşullarının kontrolü
    if (!currentPasword || !newPassword || !newPasswordconfirmation) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Eksik Bilgi",
        textBody: "Lütfen tüm alanları doldurduğunuzdan emin olun.",
        button: "Tamam",
      });
      return;
    }

    if (newPassword !== newPasswordconfirmation) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Şifreler Uyuşmuyor",
        textBody: "Yeni şifreleriniz eşleşmiyor. Lütfen tekrar deneyin.",
        button: "Tamam",
      });
      return;
    }

    // Şifre koşulları kontrolü
    if (
      !colorForLength ||
      !colorForNumberAlert ||
      !colorForUpper ||
      !colorForSymbol
    ) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Geçersiz Şifre",
        textBody: "Şifreniz gerekli kriterlere uymuyor. Lütfen kontrol edin.",
        button: "Tamam",
      });
      return;
    }

    // Eğer tüm kontroller geçerliyse, veri gönderimini başlat
    postData();
  };

  const [showLengthAlert, setShowLengthAlert] = useState(false);
  const [showUpperAlert, setShowUpperAlert] = useState(false);
  const [showSymbolAlert, setShowSymbolAlert] = useState(false);
  const [showNumberAlert, setShowNumberAlert] = useState(false);
  const [passControl, setpassControl] = useState(false);
  const [colorForLength, setcolorForLength] = useState(false);
  const [colorForNumberAlert, setcolorForNumberAlert] = useState(false);
  const [colorForUpper, setcolorForUpper] = useState(false);
  const [colorForSymbol, setcolorForSymbol] = useState(false);

  const handlePasswordChange = (text) => {
    setnewPassword(text);
    // Şifre uzunluğunu kontrol edin ve uyarıyı göstermek/gizlemek için durumu güncelleyin

    if (text.length + 1 <= 8) {
      setShowLengthAlert(true);
      setcolorForLength(false);
    } else {
      setcolorForLength(true);
    }

    //rakam kontrölü
    const numberRegex = /[0-9]/;
    if (!numberRegex.test(text)) {
      setShowNumberAlert(true);
      setcolorForNumberAlert(false);
    } else {
      setcolorForNumberAlert(true);
    }
    //Büyük harf kontrolü
    const upperCaseRegex = /[A-Z]/;
    if (!upperCaseRegex.test(text)) {
      setShowUpperAlert(true);
      setcolorForUpper(false);
    } else {
      setcolorForUpper(true);
    }
    // Sembole kontrolü
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!symbolRegex.test(text)) {
      setShowSymbolAlert(true);
      setcolorForSymbol(false);
    } else {
      setcolorForSymbol(true);
    }
  };
  return (
    <AlertNotificationRoot>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.Form}>
            <View>
              <View>
                <Text style={styles.label}>Mevcut Şifre</Text>
              </View>
              <View>
                <View
                  style={{
                    position: "absolute",
                    right: 12,
                    zIndex: 1,
                    height: "100%",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity onPress={() => ToggleForPass1()}>
                    <Eye
                      name={
                        SecureTextForPass1 ? "eye-off-outline" : "eye-outline"
                      }
                      size={22}
                    />
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={styles.Input}
                  value={currentPasword}
                  onChangeText={(value) => setcurrentPasword(value)}
                  secureTextEntry={SecureTextForPass1}
                />
              </View>
            </View>
            <View>
              <View>
                <View>
                  <Text style={styles.label}>Yeni Şifre</Text>
                </View>
                <View>
                  <View
                    style={{
                      position: "absolute",
                      right: 12,
                      zIndex: 1,
                      height: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <TouchableOpacity onPress={ToggleForPass2}>
                      <Eye
                        name={
                          SecuretextForNewPass
                            ? "eye-off-outline"
                            : "eye-outline"
                        }
                        size={22}
                      />
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={styles.Input}
                    value={newPassword}
                    onChangeText={(value) => handlePasswordChange(value)}
                    secureTextEntry={SecuretextForNewPass}
                    autoCapitalize="none"
                  />
                </View>
              </View>
              {newPassword.length !== 0 && (
                <View style={{ gap: 5, paddingTop: 5 }}>
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
                    <Text style={{ color: colorForLength ? "green" : "red" }}>
                      Şifreniz en az 8 karakter olmalıdır!
                    </Text>
                  )}
                  {showNumberAlert && (
                    <Text
                      style={{ color: colorForNumberAlert ? "green" : "red" }}
                    >
                      Şifrenizde en az bir rakam olmalıdır.
                    </Text>
                  )}
                  {showUpperAlert && (
                    <Text style={{ color: colorForUpper ? "green" : "red" }}>
                      Şifrenizde en az bir büyük harf olmalıdır!
                    </Text>
                  )}
                  {showSymbolAlert && (
                    <Text style={{ color: colorForSymbol ? "green" : "red" }}>
                      Şifrenizde en az bir özel karakter olmalıdır!
                    </Text>
                  )}
                </View>
              )}
            </View>
            <View>
              <View>
                <Text style={styles.label}>Yeni Şifre (Tekrar)</Text>
              </View>
              <View>
                <View
                  style={{
                    position: "absolute",
                    right: 12,
                    zIndex: 1,
                    height: "100%",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity onPress={() => ToggleForPass3()}>
                    <Eye
                      name={
                        SecureTextForNewPassAgain
                          ? "eye-off-outline"
                          : "eye-outline"
                      }
                      size={22}
                    />
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={styles.Input}
                  value={newPasswordconfirmation}
                  onChangeText={(value) => setnewPasswordconfirmation(value)}
                  secureTextEntry={SecureTextForNewPassAgain}
                />
              </View>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {changeLoading ? (
                <ActivityIndicator color="#000" size={"small"} />
              ) : (
                <TouchableOpacity
                  style={styles.updatebtn}
                  onPress={() => HandleSubmit()}
                >
                  <Text style={styles.btnText}>Yeni Şifre Oluştur</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  Form: {
    gap: 30,
    width: "100%",
    paddingTop: 14,
    borderRadius: 5,
    paddingVertical: 22,
    paddingHorizontal: 10,
    marginVertical: 10,
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
  label: {
    fontSize: 13,
    bottom: 3,
    left: 6,
    fontWeight: "600",
    letterSpacing: 0.5,
    color: "#333",
  },
  updatebtn: {
    width: "100%",
    backgroundColor: "#E54242",
    padding: 13,
    borderRadius: 5,
  },
  btnText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
