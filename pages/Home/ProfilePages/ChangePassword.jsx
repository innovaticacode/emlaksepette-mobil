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

    // İşlem başladığında kullanıcıya bilgi verme
    Dialog.show({
      type: ALERT_TYPE.INFO,
      title: "İşlem Devam Ediyor",
      textBody: "Şifreniz güncelleniyor, lütfen bekleyin...",
      button: "Tamam",
    });

    try {
      var formData = new FormData();
      formData.append("current_password", currentPasword);
      formData.append("new_password", newPassword);
      formData.append("new_password_confirmation", newPasswordconfirmation);

      const response = await axios.post(
        "https://private.emlaksepette.com/api/client/password/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
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

    postData();
  };

  return (
    <AlertNotificationRoot>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.Form}>
            <View>
              <Text style={styles.label}>Mevcut Şifre</Text>
              <TextInput
                style={styles.Input}
                value={currentPasword}
                onChangeText={(value) => setcurrentPasword(value)}
                secureTextEntry={SecureTextForPass1}
              />
              <TouchableOpacity
                style={{ position: "absolute", right: 15, top: 25 }}
                onPress={ToggleForPass1}
              >
                <Eye
                  name={SecureTextForPass1 ? "eye-off-outline" : "eye-outline"}
                  size={22}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.label}>Yeni Şifre</Text>
              <TextInput
                style={styles.Input}
                value={newPassword}
                onChangeText={(value) => setnewPassword(value)}
                secureTextEntry={SecuretextForNewPass}
              />
              <TouchableOpacity
                style={{ position: "absolute", right: 15, top: 25 }}
                onPress={ToggleForPass2}
              >
                <Eye
                  name={
                    SecuretextForNewPass ? "eye-off-outline" : "eye-outline"
                  }
                  size={22}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.label}>Yeni Şifre (Tekrar)</Text>
              <TextInput
                style={styles.Input}
                value={newPasswordconfirmation}
                onChangeText={(value) => setnewPasswordconfirmation(value)}
                secureTextEntry={SecureTextForNewPassAgain}
              />
              <TouchableOpacity
                style={{ position: "absolute", right: 15, top: 25 }}
                onPress={ToggleForPass3}
              >
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
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity style={styles.updatebtn} onPress={HandleSubmit}>
                <Text style={styles.btnText}>Şifre Yenile</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Modal
            isVisible={changeLoading}
            style={styles.modal}
            animationIn={"fadeInRight"}
            animationOut={"fadeOutLeft"}
          >
            <View style={styles.modalContent}>
              <View
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size="large" color="#333" />
              </View>
            </View>
          </Modal>
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
    padding: 9,
    backgroundColor: "transparent",
    borderRadius: 5,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#ebebeb",
  },
  label: {
    fontSize: 14,
    bottom: 5,
    left: 2,
    fontWeight: "300",
    letterSpacing: 0.5,
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
