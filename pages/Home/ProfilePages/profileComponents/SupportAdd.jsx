import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  Keyboard,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { getValueFor } from "../../../../components/methods/user";
import axios from "axios";
import Icon3 from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import ImageViewing from "react-native-image-viewing";
import Modal from "react-native-modal";
import * as IntentLauncher from "expo-intent-launcher";
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Dialog,
} from "react-native-alert-notification";
import Icon from "react-native-vector-icons/FontAwesome";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";
import AwesomeAlert from "react-native-awesome-alerts";

export default function SupportAdd() {
  const [selectedValue, setSelectedValue] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [user, setUser] = useState({});
  const [additionalOption, setAdditionalOption] = useState("");
  const [pickerKey, setPickerKey] = useState(Math.random());
  const [loading, setLoading] = useState(false);
  const [isPicker1Open, setIsPicker1Open] = useState(false);
  const [isPicker2Open, setIsPicker2Open] = useState(false);
  const [iconName1, setIconName1] = useState("angle-down");
  const [iconName2, setIconName2] = useState("angle-down");
  const [pdfFile, setPdfFile] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const handlePicker1Open = () => {
    setIsPicker1Open(true);
    setIconName1("angle-up"); // Ok yukarı yönlü
    if (isPicker2Open) {
      setIsPicker2Open(false);
      setIconName2("angle-down");
    }
  };

  const handlePicker1Close = () => {
    setIsPicker1Open(false);
    setIconName1("angle-down"); // Ok aşağı yönlü
  };

  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handlePickerOpen = () => {
    setIsPickerOpen(true);
  };

  const handlePickerClose = () => {
    setIsPickerOpen(false);
  };

  const getIconName = () => {
    if (isPickerOpen) {
      return "angle-up"; // Açık olduğunda yukarı ok
    } else if (selectedValue) {
      return "angle-down"; // Seçim yapıldıysa onay işareti
    } else {
      return "angle-down"; // Kapalı olduğunda aşağı ok
    }
  };

  const pickPDF = () => {
    DocumentPicker.getDocumentAsync({ type: "application/pdf" })
      .then((result) => {
        console.log(
          "Seçilen PDF Dosyasının İçeriği:",
          JSON.stringify(result, null, 2)
        );

        if (!result.canceled && result.assets && result.assets.length > 0) {
          const pdfAsset = result.assets[0];
          setimage([...image, result.assets[0]]);
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "PDF Seçildi",
            textBody: `Seçtiğiniz PDF: ${pdfAsset.name}`,
            button: "Tamam",
          });
          Keyboard.dismiss();
          setchoose(false);
        }
      })
      .catch((error) => {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Hata",
          textBody: "PDF seçilirken bir hata oluştu.",
          button: "Tamam",
        });
      });
  };
  const openPdf = async () => {
    if (pdfFile.uri) {
      try {
        const contentUri = await FileSystem.getContentUriAsync(pdfFile.uri);
        IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: contentUri,
          flags: 1,
          type: "application/pdf",
        });
      } catch (error) {
        console.error("PDF açılırken hata oluştu:", error);
      }
    } else {
      Alert.alert("PDF dosyası bulunamadı");
    }
  };

  console.log(pdfFile);
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

  const [image, setimage] = useState([]);
  const pickImage = async () => {
    // Kamera veya galeriden izin isteği
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Resim seçmek için izin vermeniz gerekmektedir.");
      return;
    }

    // Resim seçimi
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Seçilen resmin uri'si ile ilgili form verisini güncelleme
      setimage([...image, result.assets[0]]);
      setchoose(false);
      Keyboard.dismiss();
    }
  };
  const takePhoto = async (key) => {
    // Kameraya erişim izni iste
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "İzin Gerekli",
        "Fotoğraf çekmek için kamera iznine ihtiyacımız var."
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setimage([...image, result.assets[0]]);
      setchoose(false);
    }
  };
  const [choose, setchoose] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedUri, setselectedUri] = useState(null);
  const OpenImage = (uri) => {
    setIsVisible(true);
    setselectedUri(uri);
  };

  const submitData = async () => {
    if (!selectedValue || !textAreaValue) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Hata!",
        textBody: "Lütfen gerekli tüm alanları doldurunuz.",
        button: "Tamam",
      });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("category", selectedValue);
      formData.append("description", textAreaValue);

      if (selectedValue === "Evrak Gönderimi" && additionalOption) {
        formData.append("sendReason", additionalOption);
      }

      if (image) {
        formData.append(
          "file",
          image
            ? {
                uri:
                  Platform.OS === "android"
                    ? image[0]
                    : image[0]?.uri?.replace("file://", ""),
                type: image[0]?.mimeType,
                name:
                  image[0]?.name == null
                    ? "İmage.jpg"
                    : image[0]?.name?.slice(-3) == "pdf"
                    ? image[0]?.name
                    : image?.fileName,
              }
            : null
        );
      }

      const response = await axios.post(
        "http://192.168.18.31:8000/api/support",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("API Yanıtı:", response);

      if (response.status) {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Başarılı",
          textBody: "Talebiniz oluşturuldu.",
          button: "Tamam",
        });
        setSelectedValue(null);
        setTextAreaValue("");
        setAdditionalOption("");
        setimage([]); // PDF dosyasını sıfırla
        setPickerKey(Math.random());
      } else {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Hata!",
          textBody: `Bir hata oluştu: ${
            response.data.message || "Bilinmeyen hata"
          }`,
          button: "Tamam",
        });
      }
    } catch (error) {
      console.error("Hata Detayı:", error);

      if (error.response) {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Hata",
          textBody: `Talebiniz oluşturulamadı: ${
            error.response.data.message || error.message
          }`,
          button: "Tamam",
        });
      } else {
        Alert.alert("Gönderim sırasında bir hata oluştu.");
      }
    } finally {
      setLoading(false);
    }
  };
  const [selectedIndex, setselectedIndex] = useState(null);
  const [ModalForDeleteFile, setModalForDeleteFile] = useState(false);
  const openModalAndDeleteFile = (index) => {
    setModalForDeleteFile(true);
    setselectedIndex(index);
  };
  const deleteFile = () => {
    const updatedFiles = [...image];
    updatedFiles.splice(selectedIndex, 1); // İlgili indexteki öğeyi sil
    setimage(updatedFiles); //
    setModalForDeleteFile(false);
  };
  return (
    <AlertNotificationRoot>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={{ marginTop: 20 }}>
          <View style={{ paddingRight: 20, paddingLeft: 20 }}>
            <Text style={styles.label}>Kategori Seç</Text>
            <RNPickerSelect
              value={selectedValue}
              onValueChange={(value) => {
                setSelectedValue(value);
                handlePickerClose(); // Seçim yapıldığında picker'ı kapat
              }}
              onOpen={handlePickerOpen}
              onClose={handlePickerClose}
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
              useNativeAndroidPickerStyle={false}
              Icon={() => (
                <Icon
                  style={{ marginRight: 20, marginTop: 10 }}
                  name={getIconName()}
                  size={20}
                  color="gray"
                />
              )}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            {selectedValue === "Evrak Gönderimi" && (
              <View
                style={{ paddingRight: 20, paddingLeft: 20, marginTop: 10 }}
              >
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
                  useNativeAndroidPickerStyle={false}
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
            {image.length > 0 && (
              <View style={{ paddingTop: 2, paddingBottom: 14 }}>
                <Text style={{ color: "#333", fontSize: 13 }}>
                  Dosyayı Açmak İçin Üstüne Tıklayın
                </Text>
              </View>
            )}

            <View
              style={{
                flexDirection: "row",
                gap: 13,
                flexWrap: "wrap",
                paddingBottom: 10,
              }}
            >
              {image &&
                image.map((image, _i) => (
                  <TouchableOpacity
                    style={{
                      width: 90,
                      height: 90,
                      backgroundColor: "red",
                      borderRadius: 80,
                    }}
                    onPress={() => {
                      if (image?.name?.slice(-3) !== "pdf") {
                        OpenImage(image.uri);
                      } else {
                        if (Platform.OS === "android") {
                          openPdf();
                        } else if (Platform.OS === "ios") {
                          navigation.navigate("DecontPdf", {
                            name: image.name,
                            pdfUri: image?.uri,
                          });
                        }
                      }
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#cccccc",
                        position: "absolute",
                        zIndex: 1,
                        padding: 5,
                        borderRadius: 50,
                        right: -9,
                        top: -8,
                      }}
                      onPress={() => {
                        openModalAndDeleteFile(_i);
                      }}
                    >
                      <Icon3 name="close" size={18} color={"white"} />
                    </TouchableOpacity>

                    {image?.name?.slice(-3) == "pdf" ? (
                      <View
                        style={{
                          width: "100%",
                          height: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#EA2C2E",
                          borderRadius: 8,
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 18,
                            fontWeight: "700",
                          }}
                        >
                          PDF
                        </Text>
                      </View>
                    ) : (
                      <Image
                        style={{ width: "100%", height: "100%" }}
                        source={{ uri: image?.uri }}
                        borderRadius={8}
                      />
                    )}
                  </TouchableOpacity>
                ))}
            </View>
            <ImageViewing
              images={[{ uri: selectedUri }]}
              imageIndex={0}
              visible={isVisible}
              onRequestClose={() => setIsVisible(false)}
            />
            <AwesomeAlert
              show={ModalForDeleteFile}
              showProgress={false}
              titleStyle={{
                color: "#333",
                fontSize: 13,
                fontWeight: "700",
                textAlign: "center",
                margin: 5,
              }}
              title={"Dosyayı Sil"}
              messageStyle={{ textAlign: "center" }}
              message={`Seçili dosyayı silmek istediğinizden emin misiniz?`}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              showConfirmButton={true}
              cancelText="Hayır"
              confirmText="Evet"
              cancelButtonColor="#ce4d63"
              confirmButtonColor="#1d8027"
              onCancelPressed={() => {
                setModalForDeleteFile(false);
              }}
              onConfirmPressed={() => {
                deleteFile();
              }}
              confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
              cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#FFCE86",
                justifyContent: "center",
                borderRadius: 5,
                padding: 10,
                marginBottom: 10,
              }}
              onPress={() => {
                if (image.length == 0) {
                  setchoose(true);
                } else {
                  Alert.alert("Sadece 1 adet Dosya yükleyebilirsiniz");
                }
              }}
              // PDF seçmek için tıklanabilir
            >
              <Text style={{ textAlign: "center", color: "black" }}>
                Dosya Yükle
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "#ea2b2e",
                justifyContent: "center",
                borderRadius: 5,
                padding: 10,
              }}
              onPress={submitData}
              disabled={loading} // Gönderim sırasında butona tıklanmasını engelle
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                {loading ? "Gönderiliyor..." : "Gönder"}
              </Text>
            </TouchableOpacity>
          </View>
          <Modal
            isVisible={choose}
            style={styles.modal2}
            animationIn={"slideInUp"}
            animationOut={"slideOutDown"}
            onBackdropPress={() => setchoose(false)}
            swipeDirection={["down"]}
            onSwipeComplete={() => setchoose(false)}
          >
            <View style={[styles.modalContent2, { paddingBottom: 10 }]}>
              <View style={{ paddingTop: 10, alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    width: "15%",
                    backgroundColor: "#c2c4c6",
                    padding: 4,
                    borderRadius: 50,
                  }}
                ></TouchableOpacity>
              </View>
              <View style={{ padding: 20, gap: 35, marginBottom: 10 }}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                  onPress={() => pickImage()}
                >
                  <Icon3 name="photo" size={23} color={"#333"} />
                  <Text
                    style={{ fontSize: 14, color: "#333", fontWeight: "700" }}
                  >
                    Kütüphaneden Seç
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                  onPress={() => takePhoto()}
                >
                  <Icon3 name="add-a-photo" size={21} color={"#333"} />
                  <Text
                    style={{ fontSize: 14, color: "#333", fontWeight: "700" }}
                  >
                    Fotoğraf Çek
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                  onPress={() => {
                    pickPDF();
                  }}
                >
                  <Icon3 name="file-open" size={21} color={"#333"} />
                  <Text
                    style={{ fontSize: 14, color: "#333", fontWeight: "700" }}
                  >
                    Pdf Yükle
                  </Text>
                </TouchableOpacity>
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
        elevation: 0,
      },
    }),
  },
  pdf: {
    width: "100%",
    height: 400,
  },
  pdfContainer: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 10,
  },
  pdfText: {
    fontSize: 14,
    color: "black",
  },
  modal2: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent2: {
    gap: 10,
    paddingBottom: 20,
    backgroundColor: "#F8F7F4",
    padding: 10,

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: "white",
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
    paddingRight: 30,
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
    paddingRight: 30,
  },
});
