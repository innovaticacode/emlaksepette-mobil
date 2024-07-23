import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { getValueFor } from "../../../../components/methods/user";
import axios from "axios";
import {
  AlertNotificationRoot,
  Toast,
  ALERT_TYPE,
} from "react-native-alert-notification";
import Icon from "react-native-vector-icons/FontAwesome";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

export default function SupportAdd() {
  const [selectedValue, setSelectedValue] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [user, setUser] = useState({});
  const [additionalOption, setAdditionalOption] = useState("");
  const [pickerKey, setPickerKey] = useState(Math.random());
  const [loading, setLoading] = useState(true);
  const [isPicker1Open, setIsPicker1Open] = useState(false);
  const [isPicker2Open, setIsPicker2Open] = useState(false);
  const [iconName1, setIconName1] = useState("angle-down");
  const [iconName2, setIconName2] = useState("angle-down");

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const handlePicker1Open = () => {
    setIsPicker1Open(true);
    setIconName1("angle-up");
    if (isPicker2Open) {
      setIsPicker2Open(false);
      setIconName2("angle-down");
    }
  };

  const handlePicker1Close = () => {
    setIsPicker1Open(false);
    setIconName1("angle-down");
  };

  const handlePicker2Open = () => {
    setIsPicker2Open(true);
    setIconName2("angle-up");
    if (isPicker1Open) {
      setIsPicker1Open(false);
      setIconName1("angle-down");
    }
  };

  const handlePicker2Close = () => {
    setIsPicker2Open(false);
    setIconName2("angle-down");
  };

  const submitData = async () => {
    if (!selectedValue || !textAreaValue) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Talebiniz Oluşturulmadı",
        textBody: "Gerekli Alanları Doldurun",
      });
      return;
    }

    setLoading(true); // Loading state'ini true yap

    try {
      const formData = new FormData();

      // Form verilerini ekle
      formData.append("category", selectedValue);
      formData.append("description", textAreaValue);

      // Ek seçenek varsa, onu da ekle
      if (selectedValue === "Evrak Gönderimi" && additionalOption) {
        formData.append("sendReason", additionalOption); // sendReason anahtarı kullanılıyor
      }

      // PDF dosyasını ekle
      if (pdfFile) {
        formData.append("file", {
          uri: pdfFile.uri,
          name: pdfFile.name,
          type: "application/pdf",
        });
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

      console.log("API Yanıtı:", response); // API yanıtını konsola yazdır

      if (response.status === 200 || response.status === 201) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Talebiniz oluşturuldu",
          textBody: "Gönderi başarılı",
        });
        // Tüm state'leri sıfırla
        setSelectedValue("");
        setTextAreaValue("");
        setAdditionalOption("");
        setPickerKey(Math.random());
        setPdfFile(null); // PDF dosyasını sıfırla
      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Talebiniz oluşturulamadı",
          textBody: `Bir hata oluştu: ${
            response.data.message || "Bilinmeyen hata"
          }`,
        });
      }
    } catch (error) {
      console.error("Hata Detayı:", error); // Hata detaylarını konsola yazdır

      if (error.response) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Talebiniz oluşturulamadı",
          textBody: `Hata: ${error.response.data.message || error.message}`,
        });
      } else {
        Alert.alert("Gönderim sırasında bir hata oluştu.");
      }
    } finally {
      setLoading(false); // Loading state'ini false yap
    }
  };

  return (
    <AlertNotificationRoot>
      <View style={{ marginTop: 20 }}>
        <View style={{ paddingRight: 20, paddingLeft: 20 }}>
          <Text style={styles.label}>Kategori Seç</Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedValue(value)}
            key={pickerKey}
            onOpen={handlePicker1Open}
            onClose={handlePicker1Close}
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
            Icon={() => {
              return (
                <Icon
                  style={{ marginRight: 20, marginTop: 10 }}
                  name={iconName1}
                  size={20}
                  color="gray"
                />
              );
            }}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          {selectedValue === "Evrak Gönderimi" && (
            <View style={{ paddingRight: 20, paddingLeft: 20, marginTop: 10 }}>
              <RNPickerSelect
                onValueChange={(value) => setAdditionalOption(value)}
                onOpen={handlePicker2Open}
                onClose={handlePicker2Close}
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
                Icon={() => {
                  return (
                    <Icon
                      style={{ marginRight: 20, marginTop: 10 }}
                      name={iconName2}
                      size={20}
                      color="gray"
                    />
                  );
                }}
              />
            </View>
          )}
        </View>
        <View
          style={{
            paddingRight: 20,
            paddingLeft: 20,
            marginTop: 10,
            borderRadius: 50,
            borderColor: "#e6e6e6",
          }}
        >
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            onChangeText={(text) => setTextAreaValue(text)}
            value={textAreaValue}
            placeholder="Metin girin..."
          />
        </View>
        <View style={{ marginTop: 10, paddingRight: 20, paddingLeft: 20 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#FFCE86",
              justifyContent: "center",
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ textAlign: "center", color: "black" }}>PDF Seç</Text>
          </TouchableOpacity>

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
    borderColor: "#e6e6e6",
    ...Platform.select({
      ios: {
        shadowColor: "gray",
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    borderWidth: 1,
    borderColor: "#e6e6e6",
    ...Platform.select({
      ios: {
        shadowColor: "gray",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
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
