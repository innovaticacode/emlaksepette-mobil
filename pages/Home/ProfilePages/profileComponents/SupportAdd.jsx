import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { WebView } from "react-native-webview";
import { getValueFor } from "../../../../components/methods/user";
import axios from "axios";
import {
  AlertNotificationRoot,
  Toast,
  ALERT_TYPE,
} from "react-native-alert-notification";

export default function SupportAdd() {
  const [selectedValue, setSelectedValue] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [pdfBase64, setPdfBase64] = useState(null);
  const [user, setuser] = useState({});
  const [pdfUri, setPdfUri] = useState(null);
  const [selectedDocumentName, setSelectedDocumentName] = useState(null);
  const [additionalOption, setAdditionalOption] = useState("");
  const [pickerKey, setPickerKey] = useState(Math.random());

  useEffect(() => {
    getValueFor("user", setuser);
  }, []);

  const submitData = async () => {
    if (!selectedValue || !textAreaValue) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: `Talebiniz Oluşturulmadı`,
        textBody: `Gerekli Alanları Doldurun`,
      });
      return;
    }
    try {
      const formData = new FormData();

      // Form verilerini ekle
      formData.append("category", selectedValue);
      formData.append("description", textAreaValue);

      // Ek seçenek varsa, onu da ekle
      if (selectedValue === "Evrak Gönderimi" && additionalOption) {
        formData.append("sendReason", additionalOption); // sendReason anahtarı kullanılıyor
      }

      // API'ye veri gönder
      const response = await axios.post(
        "https://private.emlaksepette.com/api/support",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
      } else {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: `Talebiniz oluşturuldu`,
          textBody: `gönderi başarılı`,
        });
        // Tüm state'leri sıfırla
        setSelectedValue("");
        setTextAreaValue("");
        setAdditionalOption("");
        setPickerKey(Math.random());
      }
    } catch (error) {
      if (error.response) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: `Talebiniz oluşturuldu`,
          textBody: `gönderi başarılı`,
        });
      } else {
        // Diğer hata durumlarını yönet
        Alert.alert("Gönderim sırasında bir hata oluştu.");
      }
    }
  };

  return (
    <AlertNotificationRoot>
      <View style={{ marginTop: 20 }}>
        <View style={{ paddingRight: 20, paddingLeft: 20 }}>
          <Text style={styles.label}>Kategori Seç</Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedValue(value)}
            items={[
              { label: "Bilgi", value: "Bilgi" },
              { label: "Evrak Gönderimi", value: "Evrak Gönderimi" },
              { label: "Öneri & Teşekkür", value: "Öneri & Teşekkür" },
              { label: "Şikayet", value: "Şikayet" },
              { label: "Talep", value: "Talep" },
            ]}
            placeholder={{
              label: "Bir seçenek belirleyin...",
              value: null,
              color: "#333",
            }}
            style={pickerSelectStyles}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          {selectedValue === "Evrak Gönderimi" && (
            <View style={{ paddingRight: 20, paddingLeft: 20, marginTop: 10 }}>
              <RNPickerSelect
                onValueChange={(value) => setAdditionalOption(value)}
                items={[
                  {
                    label: "Turizm Amaçlı Kiralama",
                    value: "Turizm Amaçlı Kiralama",
                  },
                  {
                    label: "İlan İlgili Belge Talebi",
                    value: "İlan İlgili Belge Talebi",
                  },
                  { label: "Mağaza Açma", value: "Mağaza Açma" },
                  { label: "Marka Tescili", value: "Marka Tescili" },
                  {
                    label: "Yetkili Bayii Belgesi",
                    value: "Yetkili Bayii Belgesi",
                  },
                ]}
                placeholder={{
                  label: "Gönderim nedenini seçiniz...",
                  value: null,
                  color: "#333",
                }}
                style={pickerSelectStyles}
              />
            </View>
          )}
        </View>
        <View style={{ paddingRight: 20, paddingLeft: 20, marginTop: 10 }}>
          <Text style={styles.label}>Bir metin girin:</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            onChangeText={(text) => setTextAreaValue(text)}
            value={textAreaValue}
            placeholder="Metin girin..."
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#ea2b2e",
              justifyContent: "center",
              borderRadius: 5,
              padding: 10,
            }}
            onPress={submitData}
          >
            <Text style={{ textAlign: "center", color: "white" }}>Gönder</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  selectedValue: {
    marginTop: 20,
    fontSize: 18,
    color: "blue",
  },
  textArea: {
    height: 100,
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    marginTop: 20,
  },
  selectedValue: {
    marginTop: 20,
    fontSize: 18,
    color: "blue",
  },
  noPdfText: {
    marginTop: 20,
    fontSize: 16,
    color: "red",
  },
  pdf: {
    flex: 1,
    marginTop: 20,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 100, // Buton ve margin alanı için yer bırakılır
  },
  noPdfText: {
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
  button: {
    backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center", // Buton metnini ortalar
    marginBottom: 20, // Buton ve PDF arasına boşluk bırakır
  },
  buttonText: {
    color: "#fff", // Buton metninin rengini beyaz yapar
    fontSize: 16,
    fontWeight: "bold",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
