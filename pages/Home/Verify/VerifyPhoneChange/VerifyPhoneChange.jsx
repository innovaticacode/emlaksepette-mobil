import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { styles } from "./VerifyPhoneChange.styles";
import axios from "axios";
import { apiUrl } from "../../../../components/methods/apiRequest";
import { getValueFor } from "../../../../components/methods/user";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Dialog,
} from "react-native-alert-notification";

const VerifyPhoneChange = ({ route }) => {
  const { phone } = route.params;
  const [seconds, setSeconds] = useState(180);
  const [isActive, setIsActive] = useState(true);
  const [codes, setCodes] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const inputs = useRef([]);
  const navigation = useNavigation();

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  useEffect(() => {
    let interval = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      setIsActive(false);
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Başarısız",
        textBody: "Zaman aşımına uğradı",
        button: "Tamam",
        onHide: () => {
          navigation.navigate("UpdateProfile");
        },
      });
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const handleInputChange = (index, text) => {
    const newCodes = [...codes];
    newCodes[index] = text;
    setCodes(newCodes);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleDelete = (index) => {
    if (codes[index] === "") {
      if (index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  const sendPostRequest = async () => {
    const data = { code: codes.join("") };
    try {
      const response = await axios.post(
        apiUrl + "telefon-numarasi-sms-dogrulamasi",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );
      if (response.data.success) {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Başarılı",
          textBody: "Başarıyla güncellediniz.",
          button: "Tamam",
          onHide: () => {
            navigation.navigate("UpdateProfile");
          },
        });
      } else {
        if (response?.data?.error) {
        }
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Hata",
          textBody: `${response?.data?.error} eğer hata almaya devam ederseniz destek talep bölümünden bize ulaşabilirsiniz`,
          button: "Tamam",
        });
      }
    } catch (error) {
      console.error("error", error);
      if (error.response) {
        console.error("Sunucu Yanıt Hatası:", error.response.data);
        console.error("Status:", error.response.status);
      } else if (error.request) {
        console.error("İstek Gönderildi Ama Yanıt Alınamadı:", error.request);
      } else {
        console.error("Hata Mesajı:", error.message);
      }
      alert("Bir hata oluştu, lütfen tekrar deneyin.");

      navigation.navigate("UpdateProfile");
    }
  };

  return (
    <AlertNotificationRoot>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ paddingLeft: 15, paddingTop: 10 }} // Padding ekleniyor
          >
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Numarayı Doğrula!</Text>
          <View style={styles.instruction}>
            <Text style={styles.instructionText}>
              Lütfen numaranızı doğrulamak için {""}
              <Text style={styles.phoneNumber}>{phone ?? ""}</Text> No'lu
              telefona gönderdiğimiz 6 haneli doğrulama kodunu giriniz.
            </Text>
          </View>
        </View>
        <View style={styles.timerContainer}>
          <View style={styles.timerCircle}>
            <Text style={styles.timerText}>{formatTime(seconds)}</Text>
          </View>
        </View>
        <View style={styles.codeInputContainer}>
          <View style={styles.codeInputRow}>
            {[...Array(6)].map((_, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputs.current[index] = ref)}
                style={styles.input}
                value={codes[index] || ""}
                maxLength={1}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange(index, text)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace" && !codes[index]) {
                    if (index > 0) {
                      inputs.current[index - 1]?.focus();
                    }
                    handleDelete(index);
                  }
                }}
              />
            ))}
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              disabled={codes.length !== 6 || codes.includes("")}
              onPress={() => sendPostRequest()}
              style={[styles.submitButton]}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Onayla</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </AlertNotificationRoot>
  );
};

export default VerifyPhoneChange;
