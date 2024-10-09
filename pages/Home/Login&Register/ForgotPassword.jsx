import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  // Loading indicator
} from "react-native";
import axios from "axios";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from "react-native-alert-notification";
import { ActivityIndicator } from "react-native-paper";

export default function ForgotPassword() {
  const nav = useNavigation();
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false); // Soğuma süresi durumu
  const [cooldownTime, setCooldownTime] = useState(0); // Soğuma süresi
  const [loading, setLoading] = useState(false); // Loading durumu

  // Soğuma süresini kontrol eden useEffect
  useEffect(() => {
    let timer;
    if (isCooldown) {
      timer = setInterval(() => {
        setCooldownTime((prevTime) => {
          if (prevTime <= 0) {
            setIsCooldown(false);
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCooldown]);
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const postData = async () => {
    setLoading(true); // Butonu loading durumuna al

    try {
      if (!validateEmail(email)) {
        console.log("Geçersiz e-posta formatı.");
        setShowAlert(false); // Modal kapanır
        setTimeout(() => {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: "Hata",
            textBody: "Geçersiz e-posta formatı.",
            button: "Tamam",
          });
        }, 500); // Modal kapanırken zamanlama ekleyin
        setLoading(false); // Loading durumu kapat
        return;
      }

      var formData = new FormData();
      formData.append("email", email);

      console.log("API çağrısı yapılıyor...");
      const response = await axios.post(
        "https://private.emlaksepette.com/api/password/email",
        formData
      );
      console.log("API çağrısı başarılı. Yanıt:", response.data);

      // Modal kapanır

      setTimeout(() => {
        if (response.data.success) {
          setbuttonDisabled(true);
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Başarılı",
            textBody: "Şifre yenileme linki e-posta adresinize gönderildi.",
            button: "Tamam",
          });
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
          }, 10000);

          // Soğuma süresini başlat
          setIsCooldown(true);
          setCooldownTime(5 * 60 * 1000); // 5 dakika (milisaniye cinsinden)
        } else {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: "Hata",
            textBody: "Böyle bir mail adresi sisteme kayıtlı değildir.",
            button: "Tamam",
          });
        }
        // Loading durumu kapat
      }, 500); // Modal kapanırken zamanlama ekleyin
    } catch (error) {
      // "errors" yerine "error"
      console.log("Hata oluştu:", error?.response);
      setShowAlert(false); // Modal kapanır

      setTimeout(() => {
        if (error) {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: "Hata",
            textBody: error?.response?.data?.message, // "error" ile değiştirildi
            button: "Tamam",
          });
        }
      }, 500); // Modal kapanırken zamanlama ekleyin
    } finally {
      setLoading(false);
    }
  };

  // E-posta formatını kontrol eden fonksiyon
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <AlertNotificationRoot>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={{ padding: 10, justifyContent: "center" }}
            onPress={() => nav.goBack()}
          >
            <Icon name="chevron-back-outline" size={33} />
          </TouchableOpacity>
          <View style={{ padding: 10, gap: 10 }}>
            <Text
              style={{
                color: "green",
                textAlign: "center",
                display: showSuccess ? "flex" : "none",
              }}
            >
              {email} adresine Şifre Yenileme bağlantısı gönderildi!
            </Text>
            <Text
              style={{
                color: "#333",
                fontSize: 23,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Şifreni mi Unuttun?
            </Text>
            <Text style={{ color: "grey", fontSize: 13, textAlign: "center" }}>
              Şifre Yenileme Bağlantısı Gönder
            </Text>
          </View>
          <View style={{ paddingLeft: 10, paddingRight: 10 }}>
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 0 }}>
                <Text
                  style={{ fontSize: 14, color: "grey", fontWeight: "600" }}
                >
                  E-Posta
                </Text>
              </View>
              <TextInput
                style={[styles.Input]}
                value={email}
                onChangeText={(value) => setEmail(value)}
                placeholder="E-posta adresi"
                keyboardType="email-address"
                autoCapitalize="none" // İlk harfin büyük olmasını engeller
              />
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <TouchableOpacity
              style={[
                styles.btn,
                loading && styles.btnDisabled,
                { opacity: buttonDisabled ? 0.5 : 1 },
              ]}
              onPress={postData}
              disabled={buttonDisabled} // Butonu disable et
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" /> // Loading göstergesi
              ) : (
                <Text style={{ color: "#FAFAFA", textAlign: "center" }}>
                  Gönder
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <Modal
            isVisible={showAlert}
            animationIn={"fadeInRightBig"}
            animationOut={"fadeOutLeftBig"}
            style={styles.modal}
          >
            <View style={styles.modalContent}>
              <Text>Doğrulanıyor...</Text>
            </View>
          </Modal>

          <Dialog
            isVisible={showSuccess}
            animationIn={"fadeInRightBig"}
            animationOut={"fadeOutLeftBig"}
            style={styles.dialog} // Z-index ekleyebilirsiniz
          >
            <View style={styles.dialogContent}>
              <Text>Başarıyla gönderildi!</Text>
            </View>
          </Dialog>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    gap: 20,
  },
  Input: {
    padding: 9,
    borderWidth: 1,
    borderColor: "#ebebeb",
    borderRadius: 5,
    backgroundColor: "#FAFAFA",
  },
  btn: {
    backgroundColor: "#EA2B2E",
    padding: 10,
    borderRadius: 6,
    alignItems: "center", // İçeriği ortalar
    justifyContent: "center", // İçeriği ortalar
  },
  btnDisabled: {
    opacity: 0.5, // Disable durumunda buton rengi
  },
  modal: {
    justifyContent: "center",
    margin: 0,
    padding: 30,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 40,
    gap: 20,
    borderRadius: 10,
  },
  dialog: {
    justifyContent: "center",
    margin: 0,
    padding: 30,
  },
  dialogContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});
