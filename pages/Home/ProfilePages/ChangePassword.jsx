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
  Toast,
} from "react-native-alert-notification";
import Modal from "react-native-modal";
import { Platform } from "react-native";
import { ActivityIndicator } from "react-native-paper";
export default function ChangePassword() {
  const navigation = useNavigation();

  const [SecureTextForPass1, setSecureTextForPass1] = useState(true);
  const [SecuretextForNewPass, setSecuretextForNewPass] = useState(true);
  const [SecureTextForNewPassAgain, setSecureTextForNewPassAgain] =
    useState(true);
  const ToggleForPass1 = () => {
    setSecureTextForPass1(!SecureTextForPass1);
  };
  const ToggleForPass2 = () => {
    setSecuretextForNewPass(!SecuretextForNewPass);
  };
  const ToggleForPass3 = () => {
    setSecureTextForNewPassAgain(!SecureTextForNewPassAgain);
  };
  const [currentPasword, setcurrentPasword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [newPasswordconfirmation, setnewPasswordconfirmation] = useState("");
  const [changeLoading, setchangeLoading] = useState(false);
  const [changeSuccess, setchangeSuccess] = useState(false);
  const [user, setuser] = useState({});

  useEffect(() => {
    getValueFor("user", setuser);
  }, []);
  const [message, setmessage] = useState({});

  const postData = async () => {
    setchangeLoading(true);

    try {
      var formData = new FormData();
      formData.append("current_password", currentPasword);
      formData.append("new_password", newPassword);
      formData.append("new_password_confirmation", newPasswordconfirmation);

      const response = await axios.post(
        "https://emlaksepette.com/api/client/password/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );

      setcurrentPasword("");
      setnewPassword("");
      setnewPasswordconfirmation("");

      // Başarılı şifre değişikliği mesajı
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Başarılı",
      textBody: "Şifreniz başarıyla güncellendi.",
    });

      setchangeSuccess(true);
      setTimeout(() => {
        setchangeSuccess(false);
      }, 5000);
    } catch (error) {
      // Hata nesnesini konsola yazdır
      console.error("Hata:", error);
      console.error("Hata yanıtı verisi:", error.response?.data);
    
      const errorMessage =
        error.response?.data?.errors?.current_password ||
        error.response?.data?.message ||
        "Bilinmeyen bir hata oluştu.";
    
      // Mevcut şifre hatalıysa gösterilecek özel mesaj
      if (errorMessage === "Mevcut şifre hatalı.") {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Hata",
          textBody: "Mevcut şifreniz hatalı. Lütfen doğru şifreyi giriniz.",
        });
      } else {
        // Genel hata mesajı
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Hata",
          textBody: errorMessage,
        });
      }
    
      console.error("Hata:", error + " post isteği başarısız ");
    }
     finally {
      setchangeLoading(false);
    }
  };
  const HandleSunmit = () => {
    if (currentPasword && newPassword && newPasswordconfirmation) {
      postData();
    }
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
              <TouchableOpacity style={styles.updatebtn} onPress={HandleSunmit}>
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
    width: "100%",
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

    fontSize: 12,
    fontWeight: "500",
  },
  modal: {
    justifyContent: "center",
    margin: 0,
    padding: 30,
  },
  modalContent: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "transparent",
    padding: 25,

    borderRadius: 5,
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
