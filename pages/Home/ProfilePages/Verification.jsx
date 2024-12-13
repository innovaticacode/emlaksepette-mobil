import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { TextInput } from "react-native";
import { getValueFor } from "../../../components/methods/user";
import axios from "axios";
import Modal from "react-native-modal";
import { ActivityIndicator } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { apiUrl } from "../../../components/methods/apiRequest";
export default function Verification({ nextStep, prevStep }) {
  const [codes, setCodes] = useState("");
  const inputs = useRef([]);
  const [Isucces, setIsucces] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      // Kullanıcının sayfadan çıkmasını engellemek için koşulları buraya yazın
      e.preventDefault(); // Kullanıcının çıkmasını iptal et
    });

    return unsubscribe;
  }, [navigation]);

  const handleInputChange = (index, value) => {
    // Sadece bir karakter kabul et
    if (value.length > 1) return;

    // Kodu güncelle
    const newCodes = codes.slice(0, index) + value + codes.slice(index + 1);
    setCodes(newCodes);

    // Bir sonraki veya önceki inputa odaklan
    if (value.length === 0 && index > 0) {
      inputs.current[index - 1].focus();
    } else if (index < 5 && value.length === 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleDelete = (index) => {
    let newCodes = [...codes];
    newCodes[index] = ""; // Clear the current input

    // Update the codes array
    setCodes(newCodes);
  };
  const [falseCodeAlert, setfalseCodeAlert] = useState(false);
  const updateUserData = async () => {
    try {
      const updateResponse = await axios.get(apiUrl + "users/" + user?.id, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      });

      // Mevcut kullanıcı verilerini güncellenmiş verilerle birleştirme
      const updatedUser = {
        ...user,
        ...updateResponse.data.user,
        access_token: user.access_token, // access token'ı koruma
      };

      // Kullanıcı durumunu güncelleme
      setuser(updatedUser);

      // SecureStore ile güncellenmiş kullanıcı verilerini kaydetme
      await SecureStore.setItemAsync("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    }
  };

  const [loading, setloading] = useState(false);

  const handleSubmit = async () => {
    setloading(true);
    try {
      // POST isteği yap
      const response = await axios.post(
        apiUrl + "phone-verification/verify",
        { code: codes },
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.debug("Doğrulama isteği başarılı:", response.data);

      if (response.data.success) {
        // Başarılı doğrulama sonrası işlemler
        updateUserData();
        setCodes("");
        setsucces(true);
        // Doğrulama durumunu kaydet
        await SecureStore.setItemAsync("PhoneVerify", "1");

        setIsucces(true);
        // Başarı mesajını 2 saniye göster
        setTimeout(() => {
          setIsucces(false);
        }, 2000);
        // Başarıyla yönlendir
        navigation.navigate("Home", { screen: "Home" });
      }
    } catch (error) {
      console.error("Doğrulama isteği başarısız:", error);
      setfalseCodeAlert(true);
      setsucces(false);
    } finally {
      // Loading durumunu sonlandır
      setloading(false);
    }
  };

  const [error, setError] = useState(null);
  const [verifyStatu, setverifyStatu] = useState(null);
  const [user, setuser] = useState({});

  const [succes, setsucces] = useState(true);

  const [seconds, setSeconds] = useState(180); // 3 dakika = 180 saniye
  const [isActive, setIsActive] = useState(false);
  const [showSendAgain, setshowSendAgain] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      setIsActive(false);
      setshowSendAgain(true);
      // Zamanlayıcı sıfırlandığında burada başka bir işlem yapabilirsiniz
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const resetTimer = () => {
    setSeconds(180); // 3 dakika = 180 saniye
    setIsActive(false);
  };
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  // Kullanıcı verilerini almak için
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);

  // Telefon doğrulama durumunu almak için
  useEffect(() => {
    if (user && user.access_token) {
      getValueFor("PhoneVerify", setverifyStatu);
    }
  }, [user]);

  // Doğrulama kodu gönderme fonksiyonu
  const sendPostRequest = async () => {
    setIsActive(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      };
      if (user?.access_token) {
        const response = await axios.post(
          apiUrl + "phone-verification/generate",
          {},
          config
        );
        console.log("Kod gönderildi:", response.data);
        setError(null);
      }
    } catch (error) {
      setError("Post isteği başarısız oldu.");
      alert("Kod gönderilemedi");
      console.error("Post isteği başarısız oldu:", error);
    }
  };
  console.log(isActive);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <View style={{ padding: 10 }}>
          <View style={{}}>
            <Text
              style={{
                fontSize: 30,
                color: "#333",
                fontWeight: "800",
                textAlign: "center",
              }}
            >
              Hoş Geldiniz!
            </Text>
            <View style={{ paddingTop: 30 }}>
              <Text
                style={{
                  fontSize: 13,
                  color: "#262020",
                  fontWeight: "400",
                  letterSpacing: 0.8,
                  textAlign: "center",
                }}
              >
                Lütfen hesabınızı doğrulamak için{" "}
                <Text style={{ color: "red" }}>{user?.mobile_phone}</Text> No'lu
                telefona gönderdiğimiz 6 haneli doğrulama kodunu giriniz
              </Text>
            </View>
          </View>
        </View>
        <View style={{ paddingTop: 10, alignItems: "center" }}>
          <View
            style={{
              backgroundColor: "#EA2C2E",
              borderRadius: 50,
              width: 60,
              height: 60,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20, textAlign: "center", color: "white" }}>
              {formatTime(seconds)}
            </Text>
          </View>
        </View>
        <View style={{ paddingTop: 20 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}
          >
            {[...Array(6)].map((_, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputs.current[index] = ref)}
                style={styles.Input}
                value={codes[index] || ""}
                maxLength={1}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange(index, text)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace" && !codes[index]) {
                    if (index > 0) {
                      inputs.current[index - 1].focus();
                    }
                    handleDelete(index);
                  }
                }}
              />
            ))}
          </View>
          <View style={{ padding: 10, paddingTop: 20, gap: 20 }}>
            {isActive ? (
              <TouchableOpacity
                disabled={codes.length == 6 ? false : true}
                onPress={() => {
                  handleSubmit();
                }}
                style={{
                  backgroundColor: "#EA2A28",
                  padding: 9,
                  borderRadius: 5,
                  opacity: codes.length == 6 ? 1 : 0.5,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "600",
                    }}
                  >
                    Onayla
                  </Text>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  resetTimer();
                  sendPostRequest();
                }}
                style={{
                  backgroundColor: "#EA2A28",
                  padding: 9,
                  borderRadius: 5,

                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  Kod Gönder
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Modal
          isVisible={Isucces}
          style={styles.modal}
          animationIn={"fadeIn"}
          animationOut={"fadeOut"}
        >
          <View
            style={[
              styles.modalContent,
              {
                padding: 0,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "transparent",
              },
            ]}
          >
            <View
              style={{
                backgroundColor: "#ffffff94",
                width: "20%",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <ActivityIndicator size="large" color="#333" />
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={falseCodeAlert}
          style={styles.modal}
          animationIn={"fadeIn"}
          animationOut={"fadeOut"}
          onBackdropPress={() => {
            setfalseCodeAlert(false);
          }}
        >
          <View style={styles.modalContent}>
            <View
              style={{
                padding: 10,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#EA2A28",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            >
              <Icon name="exclamationcircle" color={"#fff"} size={40} />
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 15,
                gap: 15,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "500",
                  color: "#EA2A28",
                  fontSize: 18,
                  letterSpacing: 0.7,
                }}
              >
                Uyarı
              </Text>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <View style={{ width: "70%", padding: 4, paddingBottom: 20 }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 14,
                      fontWeight: "500",
                      color: "#333",
                      letterSpacing: 0.7,
                      lineHeight: 20,
                    }}
                  >
                    Girmiş olduğunuz kod hatalı,kontrol ederek tekrar
                    deneyiniz.tekrar göndere basarak kodu yenileyebilirsiniz
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ padding: 10 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#EA2A28",
                  padding: 10,
                  borderRadius: 5,
                }}
                onPress={() => {
                  setfalseCodeAlert(false);
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontWeight: "600",
                  }}
                >
                  Tamam
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFCFC",
    paddingTop: 100,
  },
  Input: {
    backgroundColor: "#ebebeb",

    borderRadius: 6,
    width: 50,
    height: 50,
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  modal: {
    justifyContent: "center",
    margin: 0,
    padding: 30,
  },
  modalContent: {
    backgroundColor: "white",

    borderRadius: 10,
    gap: 15,
  },
});
