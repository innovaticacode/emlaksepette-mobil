import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
export default function ForgotPassword() {
  const nav = useNavigation();
  const [email, setemail] = useState("");
  const [status, setstatus] = useState("");
  const [showAlert, setshowAlert] = useState(false);
  const [showSucces, setshowSucces] = useState(false);
  const postData = async () => {
    setshowAlert(true);
    try {
      var formData = new FormData();
      formData.append("email", email);
      const response = await axios.post(
        "https://emlaksepette.com/api/password/email",
        formData
      );

      // İsteğin başarılı bir şekilde tamamlandığı durum

      setstatus(response.data.success);
      setshowSucces(true);
      setTimeout(() => {
        setshowSucces(false);
      }, 10000);
    } catch (error) {
      // Hata durumunda

      console.log(error);
    } finally {
      setshowAlert(false);
    }
  };

  return (
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
              display: showSucces ? "flex" : "none",
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
            Şifrenimi Unuttun?
          </Text>
          <Text style={{ color: "grey", fontSize: 13, textAlign: "center" }}>
            Şifre Yenileme Bağlantısı Gönder
          </Text>
        </View>
        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
          <View style={{ gap: 5 }}>
            <View style={{ paddingLeft: 0 }}>
              <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                E-Posta
              </Text>
            </View>
            <TextInput
              style={[styles.Input]}
              value={email}
              onChangeText={(value) => setemail(value)}
              placeholder="E-posta adresi"
              keyboardType="email-address"
            />
          </View>
        </View>
        <View style={{ padding: 10 }}>
          <TouchableOpacity style={styles.btn} onPress={postData}>
            <Text style={{ color: "#FAFAFA", textAlign: "center" }}>
              Gönder
            </Text>
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
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
});
