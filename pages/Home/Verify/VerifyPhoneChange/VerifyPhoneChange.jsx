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

const VerifyPhoneChange = ({ route }) => {
  const { phone } = route.params;
  const [seconds, setSeconds] = useState(180);
  const [isActive, setIsActive] = useState(true);
  const [codes, setCodes] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);

  useEffect(() => {
    let interval = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const resetTimer = () => {
    setSeconds(180);
    setIsActive(true);
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

  const handleSubmit = () => {
    const enteredCode = codes.join("");
    if (enteredCode === "123456") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        alert("Telefon doğrulandı!");
      }, 2000);
    } else {
      alert("Geçersiz kod, lütfen tekrar deneyin.");
    }
  };

  const sendPostRequest = () => {
    alert("Kod gönderildi!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Numarayı Doğrula!</Text>
        <View style={styles.instruction}>
          <Text style={styles.instructionText}>
            Lütfen numaranızı doğrulamak için
            <Text style={styles.phoneNumber}>{phone ?? ""}</Text> No'lu telefona
            gönderdiğimiz 6 haneli doğrulama kodunu giriniz
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
          {isActive ? (
            <TouchableOpacity
              disabled={codes.length !== 6 || codes.includes("")}
              onPress={handleSubmit}
              style={[
                styles.submitButton,
                codes.length === 6 && !codes.includes("")
                  ? {}
                  : styles.disabledButton,
              ]}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Onayla</Text>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                resetTimer();
                sendPostRequest();
              }}
              style={styles.sendButton}
            >
              <Text style={styles.buttonText}>Onayla</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerifyPhoneChange;
