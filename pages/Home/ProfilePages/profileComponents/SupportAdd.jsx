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
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import HTML from "react-native-render-html";
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
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { apiUrl } from "../../../../components/methods/apiRequest";
import { checkFileSize } from "../../../../utils";

export default function SupportAdd() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
  const [errorStatu, seterrorStatu] = useState(0);
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [Deals, setDeals] = useState("");
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [choose, setchoose] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedUri, setselectedUri] = useState(null);
  const [selectedIndex, setselectedIndex] = useState(null);
  const [ModalForDeleteFile, setModalForDeleteFile] = useState(false);
  const [image, setImage] = useState([]);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

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
          setImage([...image, result.assets[0]]);
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
      const imageUri = result.assets[0].uri;

      // Dosya boyutunu kontrol et
      const isFileSizeValid = await checkFileSize(imageUri);
      if (!isFileSizeValid) {
        setchoose(false);
        setTimeout(() => {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: "Uyarı",
            textBody: "Çektiğiniz fotoğraf 5 mb den yüksek olamaz",
            button: "Tamam",
            onHide: () => {
              setchoose(true);
            },
          });
        }, 800);
        return;
      }
      // Seçilen resmin uri'si ile ilgili form verisini güncelleme
      setImage([...image, result.assets[0]]);
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
      const imageUri = result.assets[0].uri;

      // Dosya boyutunu kontrol et
      const isFileSizeValid = await checkFileSize(imageUri);
      if (!isFileSizeValid) {
        setchoose(false);
        setTimeout(() => {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: "Uyarı",
            textBody: "Çektiğiniz fotoğraf 5 mb den yüksek olamaz",
            button: "Tamam",
            onHide: () => {
              setchoose(true);
            },
          });
        }, 800);
        return;
      }
      setImage([...image, result.assets[0]]);
      setchoose(false);
    }
  };

  const OpenImage = (uri) => {
    setIsVisible(true);
    setselectedUri(uri);
  };

  const submitData = async () => {
    if (!emailRegex.test(email)) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Hata!",
        textBody: "Lütfen geçerli bir e-posta adresi giriniz.",
        button: "Tamam",
      });
      return;
    }

    // if (!phoneRegex.test(phone)) {
    //   Dialog.show({
    //     type: ALERT_TYPE.DANGER,
    //     title: "Hata!",
    //     textBody: "Lütfen geçerli bir telefon numarası giriniz (10 haneli).",
    //     button: "Tamam",
    //   });
    //   return;
    // }

    if (
      !selectedValue ||
      !textAreaValue ||
      !name ||
      !email ||
      !phone ||
      !checked ||
      !checked1 ||
      !checked2
    ) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Hata!",
        textBody:
          "Lütfen gerekli tüm alanları doldurunuz ve sözleşmeleri onaylayınız.",
        button: "Tamam",
      });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("category", selectedValue);
      formData.append("description", textAreaValue);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);

      if (selectedValue === "Evrak Gönderimi" && additionalOption) {
        formData.append("sendReason", additionalOption);
      }

      if (image && image.length > 0) {
        formData.append("file", {
          uri:
            Platform.OS === "android"
              ? image[0]
              : image[0]?.uri?.replace("file://", ""),
          type: image[0]?.mimeType,
          name:
            image[0]?.name == null
              ? "Image.jpg"
              : image[0]?.name?.slice(-3) == "pdf"
              ? image[0]?.name
              : image?.fileName,
        });
      }

      const response = await axios.post(apiUrl + "support", formData, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status == 200 || 201) {
        if (user.access_token) {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Başarılı",
            textBody: "Talebiniz oluşturuldu.",
            button: "Tamam",
          });
          setSelectedValue(null);
          setTextAreaValue("");
          setAdditionalOption("");
          setImage([]);
          setPickerKey(Math.random());
          setName("");
          setEmail("");
          setPhone("");
          setChecked(false);
          setChecked1(false);
          setChecked2(false);
        } else {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Başarılı",
            textBody: `Talebiniz oluşturuldu. Süreci ${response.data.data.code} 'nolu takip numaranız ile takip edebilirsiniz. `,
            button: "Tamam",
          });
          setSelectedValue(null);
          setTextAreaValue("");
          setAdditionalOption("");
          setImage([]);
          setPickerKey(Math.random());
          setName("");
          setEmail("");
          setPhone("");
          setChecked(false);
          setChecked1(false);
          setChecked2(false);
        }
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

  const openModalAndDeleteFile = (index) => {
    setModalForDeleteFile(true);
    setselectedIndex(index);
  };

  const deleteFile = () => {
    const updatedFiles = [...image];
    updatedFiles.splice(selectedIndex, 1);
    setImage(updatedFiles);
    setModalForDeleteFile(false);
  };

  const handleCheckboxChange = (
    checked,
    setChecked,
    modalVisible,
    setModalVisible,
    deal
  ) => {
    if (checked) {
      setModalVisible(false);
      setChecked(false);
    } else {
      setModalVisible(true);
      if (deal) {
        GetDeal(deal);
      }
    }
  };

  const GetDeal = (deal) => {
    // setDeals(deal)
    fetchData(deal);
  };

  const fetchData = async (deal) => {
    const url = `${apiUrl}sayfa/${deal}`;
    try {
      const data = await fetchFromURL(url);
      setDeals(data.content);
    } catch (error) {
      console.error("İstek hatası:", error);
    }
  };

  const fetchFromURL = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const formatPhoneNumberLive = (text) => {
    // Sadece rakamları al, baştaki sıfırı sil
    let cleaned = ("" + text).replace(/\D/g, "").replace(/^0/, "");

    // 10 rakamdan fazlasına izin verme
    if (cleaned.length > 10) {
      cleaned = cleaned.slice(0, 10);
    }

    // Formatı oluşturmak için rakamları yerleştir
    if (cleaned.length > 6) {
      return (
        "(" +
        cleaned.slice(0, 3) +
        ") " +
        cleaned.slice(3, 6) +
        " " +
        cleaned.slice(6, 8) +
        " " +
        cleaned.slice(8, 10)
      );
    } else if (cleaned.length > 3) {
      return "(" + cleaned.slice(0, 3) + ") " + cleaned.slice(3, 6);
    } else if (cleaned.length > 0) {
      return "(" + cleaned;
    }

    return "";
  };

  const handlePhoneInputChange = (text) => {
    // Silme işlemi yapıldığında formatı bozma
    if (text.length < phone.length) {
      setPhone(text);
      return;
    }

    // Formatlı girişi işlemek için yukarıdaki fonksiyon
    const formattedPhone = formatPhoneNumberLive(text);
    setPhone(formattedPhone);
  };

  return (
    <AlertNotificationRoot>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // iOS için offset ayarı
      >
        <ScrollView>
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
                <Text></Text>
                <View>
                  {selectedValue === "Evrak Gönderimi" && (
                    <View style={{}}>
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
                <Text style={styles.label}>Adınız</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={(text) => setName(text)}
                  placeholder="Adınızı giriniz"
                />
                <Text style={styles.label}>E-Posta</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  placeholder="E-posta adresinizi giriniz"
                  autoCapitalize="none"
                />
                <Text style={styles.label}>Telefon</Text>
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={handlePhoneInputChange}
                  placeholder="Telefon numaranızı giriniz"
                  keyboardType="number-pad"
                  maxLength={15}
                />
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
                <Text style={styles.label}>Açıklama</Text>
                <TextInput
                  style={styles.textArea}
                  multiline
                  numberOfLines={4}
                  onChangeText={(text) => setTextAreaValue(text)}
                  value={textAreaValue}
                  placeholder="Metin girin..."
                />
              </View>
              <View
                style={{ marginTop: 10, paddingRight: 20, paddingLeft: 20 }}
              >
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
                    Dosya Ekle
                  </Text>
                </TouchableOpacity>

                <View>
                  {/* Accept KVKK Checkbox */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        handleCheckboxChange(
                          checked,
                          setChecked,
                          modalVisible,
                          setModalVisible,
                          "kvkk-politikasi"
                        )
                      }
                      style={styles.checkboxContainer}
                    >
                      {checked ? (
                        <FontAwesome5Icon
                          name="check-square"
                          size={18}
                          color="black"
                        />
                      ) : (
                        <FontAwesome5Icon
                          name="square"
                          size={18}
                          color="black"
                        />
                      )}
                      <Text
                        style={[
                          styles.checkboxLabel,
                          { color: errorStatu === 5 ? "red" : "black" },
                        ]}
                      >
                        <Text
                          style={{
                            color: errorStatu === 5 ? "red" : "#027BFF",
                            fontSize: 13,
                          }}
                        >
                          KVKK politakasını
                        </Text>{" "}
                        okudum onaylıyorum.
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Accept Cerez Checkbox */}
                  <TouchableOpacity
                    onPress={() =>
                      handleCheckboxChange(
                        checked1,
                        setChecked1,
                        modalVisible2,
                        setModalVisible2,
                        "cerez-politikasi"
                      )
                    }
                    style={styles.checkboxContainer}
                  >
                    {checked1 ? (
                      <FontAwesome5Icon
                        name="check-square"
                        size={18}
                        color="black"
                      />
                    ) : (
                      <FontAwesome5Icon name="square" size={18} color="black" />
                    )}
                    <Text
                      style={[
                        styles.checkboxLabel,
                        { color: errorStatu === 5 ? "red" : "black" },
                      ]}
                    >
                      <Text
                        style={{
                          color: errorStatu === 5 ? "red" : "#027BFF",
                          fontSize: 13,
                        }}
                      >
                        Çerez politakasını
                      </Text>{" "}
                      okudum onaylıyorum.
                    </Text>
                  </TouchableOpacity>

                  {/* Accept gizlilik Checkbox */}
                  <TouchableOpacity
                    onPress={() =>
                      handleCheckboxChange(
                        checked2,
                        setChecked2,
                        modalVisible3,
                        setModalVisible3,
                        "gizlilik-sozlesmesi-ve-aydinlatma-metni"
                      )
                    }
                    style={styles.checkboxContainer}
                  >
                    {checked2 ? (
                      <FontAwesome5Icon
                        name="check-square"
                        size={18}
                        color="black"
                      />
                    ) : (
                      <FontAwesome5Icon name="square" size={18} color="black" />
                    )}
                    <Text
                      style={[
                        styles.checkboxLabel,
                        { color: errorStatu === 5 ? "red" : "black" },
                      ]}
                    >
                      <Text
                        style={{
                          color: errorStatu === 5 ? "red" : "#027BFF",
                          fontSize: 13,
                        }}
                      >
                        Gizlilik sözleşmesi ve aydınlatma metnini
                      </Text>{" "}
                      okudum onaylıyorum.
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#ea2b2e",
                    justifyContent: "center",
                    borderRadius: 5,
                    padding: 10,
                  }}
                  onPress={submitData}
                  disabled={loading}
                >
                  <Text style={{ textAlign: "center", color: "white" }}>
                    {loading ? "Gönderiliyor..." : "Gönder"}
                  </Text>
                </TouchableOpacity>
              </View>

              <Modal
                isVisible={modalVisible}
                onBackdropPress={() => setModalVisible(false)}
                backdropColor="transparent"
                style={styles.modal2}
                animationIn={"fadeInRightBig"}
                animationOut={"fadeOutRightBig"}
              >
                <SafeAreaView style={styles.modalContent2}>
                  <ScrollView
                    style={{ padding: 20 }}
                    contentContainerStyle={{ gap: 20 }}
                  >
                    <HTML source={{ html: Deals }} contentWidth={100} />

                    <View style={{ alignItems: "center", paddingBottom: 25 }}>
                      <TouchableOpacity
                        style={styles.Acceptbtn}
                        onPress={() => {
                          setChecked(!checked);
                          setModalVisible(false);
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            width: "100%",
                            textAlign: "center",
                          }}
                        >
                          Okudum kabul ediyorum
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </SafeAreaView>
              </Modal>

              <Modal
                isVisible={modalVisible2}
                onBackdropPress={() => setModalVisible2(false)}
                backdropColor="transparent"
                animationIn={"fadeInRightBig"}
                animationOut={"fadeOutRightBig"}
                style={styles.modal2}
              >
                <SafeAreaView style={styles.modalContent2}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ padding: 10 }}
                  >
                    <HTML source={{ html: Deals }} contentWidth={100} />

                    <View style={{ alignItems: "center", paddingBottom: 20 }}>
                      <TouchableOpacity
                        style={styles.Acceptbtn}
                        onPress={() => {
                          setChecked1(true);
                          setModalVisible2(false);
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            width: "100%",
                            textAlign: "center",
                          }}
                        >
                          Okudum kabul ediyorum
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </SafeAreaView>
              </Modal>

              <Modal
                isVisible={modalVisible3}
                onBackdropPress={() => setModalVisible(false)}
                backdropColor="transparent"
                animationIn={"fadeInRightBig"}
                animationOut={"fadeOutRightBig"}
                style={styles.modal2}
              >
                <SafeAreaView style={styles.modalContent2}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ padding: 20 }}
                  >
                    <HTML source={{ html: Deals }} contentWidth={100} />

                    <View style={{ alignItems: "center", paddingBottom: 20 }}>
                      <TouchableOpacity
                        style={styles.Acceptbtn}
                        onPress={() => {
                          setChecked2(true);
                          setModalVisible3(false);
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            width: "100%",
                            textAlign: "center",
                          }}
                        >
                          Okudum kabul ediyorum
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </SafeAreaView>
              </Modal>

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
                        style={{
                          fontSize: 14,
                          color: "#333",
                          fontWeight: "700",
                        }}
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
                        style={{
                          fontSize: 14,
                          color: "#333",
                          fontWeight: "700",
                        }}
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
                        style={{
                          fontSize: 14,
                          color: "#333",
                          fontWeight: "700",
                        }}
                      >
                        Pdf Yükle
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
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
    padding: 10,
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
  input: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    borderWidth: 1,
    borderColor: "#e6e6e6",
  },
  checkboxLabel: {
    fontSize: 13,
    marginLeft: 10,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginBottom: 3,
  },
  Acceptbtn: {
    backgroundColor: "#2aaa46",
    padding: 10,
    width: "100%",
    textAlign: "center",
    borderRadius: 5,
    alignItems: "center",
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
