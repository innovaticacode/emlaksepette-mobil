import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import Feather from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import Icon3 from "react-native-vector-icons/MaterialIcons";
import { Platform } from "react-native";
import Modal from "react-native-modal";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import * as DocumentPicker from "expo-document-picker";
import AwesomeAlert from "react-native-awesome-alerts";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { documentView } from "../../pages/helper";
import ImageViewing from "react-native-image-viewing";
import { getValueFor } from "../methods/user";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
import { apiUrl, frontEndUriBase } from "../methods/apiRequest";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
} from "react-native-alert-notification";
import { checkFileSize } from "../../utils";
export default function VerifyDocument({ nextStep, prevStep }) {
  const [FormDatas, setFormDatas] = useState({
    approve_website: null,
    identity_document: null,
    tax_document: null,
    record_document: null,
    // Diğer form alanları buraya eklenebilir
  });

  const setData = (key, value) => {
    setFormDatas((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);
  const pickImage = async (key) => {
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
      const imageUri = result.assets[0].uri;

      // Dosya boyutunu kontrol et
      const isFileSizeValid = await checkFileSize(imageUri);
      if (!isFileSizeValid) {
        setchoose(false);
        setTimeout(() => {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: "Uyarı",
            textBody: "Seçtiğiniz fotoğraf 5 mb den yüksek olamaz",
            button: "Tamam",
            onHide: () => {
              setchoose(true);
            },
          });
        }, 800);
        return;
      }
      setData(key, result.assets[0]);
      console.log("seçilen Dosya", key);

      setchoose(false);
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

    console.log(result);

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
      setData(key, result.assets[0]);
      setchoose(false);
      console.log("seçilen Dosya", key);
    }
  };

  const [selectedPick, setselectedPick] = useState(null);
  const [choose, setchoose] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedUrl, setselectedUrl] = useState("");
  const [selectedDocument, setselectedDocument] = useState("");
  const openModalAndChooseDoc = (key, url, document) => {
    setselectedPick(key);
    setchoose(true);
  };
  const showDocument = (url, document, state) => {
    setselectedUrl(url);
    setselectedDocument(document);
    setIsVisible(true);
  };

  const [selectedDocumentName, setSelectedDocumentName] = useState(null);

  const [pdfFile, setPdfFile] = useState(null);
  const [selectedPdfUrl, setselectedPdfUrl] = useState(null);
  const pickDocument = async (key) => {
    DocumentPicker.getDocumentAsync({ type: "application/pdf" })
      .then((result) => {
        console.log(
          "Seçilen PDF Dosyasının İçeriği:",
          JSON.stringify(result, null, 2)
        );

        if (!result.canceled && result.assets && result.assets.length > 0) {
          const imageUri = result.assets[0].uri;

          // Dosya boyutunu kontrol et
          const isFileSizeValid = checkFileSize(imageUri);
          if (!isFileSizeValid) {
            setchoose(false);
            setTimeout(() => {
              Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: "Uyarı",
                textBody: "Seçtiğiniz dosya 5 mb den yüksek olamaz",
                button: "Tamam",
                onHide: () => {
                  setchoose(true);
                },
              });
            }, 800);
            return;
          }
          const pdfAsset = result.assets[0];
          setPdfFile(pdfAsset);

          setData(key, pdfAsset);
          console.log("seçilen Dosya", key);
          setchoose(false);

          alert("gönderildi");
        }
      })
      .catch((error) => {
        alert("hata");
      });
  };

  const [deleteModal, setdeleteModal] = useState(false);
  const deleteDocument = (key) => {
    setData(key, null);
    setdeleteModal(false);
    setselectedPick(null);
  };

  const navigation = useNavigation();

  const [loading, setloading] = useState(false);
  const SetStep = async () => {
    const formData = new FormData();
    try {
      if (user?.access_token) {
        // Gönderilecek JSON verisi
        formData.append("step", 4);
        const response = await axios.post(
          `${apiUrl}set_first_register_step`,
          formData, // JSON verisi doğrudan gönderiliyor
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              "Content-Type": "multipart/form-data", // Raw format için Content-Type
            },
          }
        );
      }
    } catch (error) {
      console.error("Post isteği başarısız dsfdsf", error);
    }
  };
  const sendDocument = (documentName) => {
    setloading(true);
    const formData = new FormData();

    formData.append("key", documentName);
    formData.append(
      `document`,
      FormDatas[documentName]
        ? {
            uri:
              Platform.OS === "android"
                ? FormDatas[documentName]
                : FormDatas[documentName]?.uri.replace("file://", ""), // Android ve iOS için uygun URI
            type: FormDatas[documentName]?.mimeType,
            name:
              FormDatas[documentName]?.name == null
                ? "İmage.jpeg"
                : FormDatas[documentName]?.name?.slice(-3) == "pdf"
                ? FormDatas[documentName]?.name
                : FormDatas[documentName]?.fileName, // Sunucuya gönderilecek dosya adı
          }
        : "safsdfd"
    );

    axios
      .post(apiUrl + "set_document_by_key", formData, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setTimeout(() => {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Başarılı",
            textBody: `Dosya Gönderimi Başarılı`,
            button: "Tamam",
            onHide: () => {
              GetUserInfo();
            },
          });
        }, 400);
        setselectedPick(null);
        if (
          FormDatas.approve_website &&
          FormDatas.identity_document &&
          FormDatas.record_document &&
          FormDatas.tax_document
        ) {
          setTimeout(() => {
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: "Tebrikler",
              textBody: `Tüm Dosyalarınız Başarıyla Gönderildi`,
              button: "Tamam",
              onHide: () => {
                nextStep();
                SetStep();
              },
            });
          }, 3000);
        }
      })
      .catch((err) => {
        if (err.response) {
          // Sunucudan gelen yanıtla ilgili hata
          console.error("Hata yanıtı:", {
            status: err.response.status,
            data: err.response.data,
            headers: err.response.headers,
          });
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Hata",
            textBody: `Hata: ${
              err.response.data?.message || "Bilinmeyen bir hata oluştu."
            }`,
            button: "Tamam",
          });
        } else if (err.request) {
          // İstek gönderildi ancak yanıt alınmadı
          console.error("İstek gönderildi ancak yanıt alınamadı:", err.request);
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Bağlantı Hatası",
            textBody:
              "Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.",
            button: "Tamam",
          });
        } else {
          // İstek oluşturulurken bir hata oluştu
          console.error("Hata:", err.message);
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Hata",
            textBody: `Hata: ${err.message}`,
            button: "Tamam",
          });
        }
      })

      .finally(() => {
        setloading(false);
      });
  };

  const [verifyStatus, setverifyStatus] = useState(null);
  useEffect(() => {
    getValueFor("PhoneVerify", setverifyStatus);
  }, []);

  const [filteredDocuments, setfilteredDocuments] = useState([]);
  const isFocused = useIsFocused();

  const [namFromGetUser, setnamFromGetUser] = useState({});
  const [loadingForUserInfo, setloadingForUserInfo] = useState(false);
  const GetUserInfo = async () => {
    setloadingForUserInfo(true);
    try {
      if (user?.access_token && user) {
        const userInfo = await axios.get(apiUrl + "user", {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });
        const userData = userInfo?.data;
        setnamFromGetUser(userData);
      }
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    } finally {
      setloadingForUserInfo(false);
    }
  };

  useEffect(() => {
    setfilteredDocuments(documentView);
    GetUserInfo();
  }, [user]);

  const openPdf = async () => {
    if (FormDatas[selectedPick]?.uri) {
      try {
        const contentUri = await FileSystem.getContentUriAsync(
          FormDatas[selectedPick]?.uri
        );
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

  useEffect(() => {
    if (FormDatas[selectedPick]) {
      const documentToSend = Object.keys(FormDatas).find(
        (key) => FormDatas[key] !== null
      );
      if (documentToSend) {
        sendDocument(documentToSend);
      }
    }
  }, [FormDatas]);
  const [alertForSkip, setalertForSkip] = useState(false);
  return (
    <AlertNotificationRoot>
      {loadingForUserInfo ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color="#333" size={"large"} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 15 }}
          style={{
            flex: 1,
            backgroundColor: "#FCFCFC",
            margin: 10,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#F2DEA2",
                padding: 15,

                width: "100%",
                borderRadius: 10,
                gap: 5,
              }}
            >
              <View>
                <Text
                  style={{
                    color: "#FF6405",
                    fontSize: 17,
                    fontWeight: "800",
                    textAlign: "center",
                  }}
                >
                  Bilgilendirme
                </Text>
              </View>
              <Text
                style={{
                  color: "#FF6405",
                  fontWeight: "600",
                  textAlign: "center",
                  letterSpacing: 0.3,
                  lineHeight: 18,
                }}
              >
                Eğer isterseniz bu adımı atlayabilirsiniz ancak panelinizde
                işlem yapamaz ve herhangi bir satın alma işlemi
                gerçekleştiremezsiniz!
              </Text>
            </View>
          </View>
          {filteredDocuments.map((item, _i) => (
            <TouchableOpacity
              style={{
                gap: 7,
                width: "100%",
                display:
                  item.isShow == "All"
                    ? "flex"
                    : "none" && item.isShow == namFromGetUser.corporate_type
                    ? "flex"
                    : "none",
              }}
              onPress={() => {
                if (FormDatas[item.state]) {
                  setselectedPick(item.state);
                  setdeleteModal(true);
                } else {
                  openModalAndChooseDoc(item.state);
                }
              }}
            >
              <View
                style={{
                  paddingLeft: 10,
                  flexDirection: "row",
                  gap: 5,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 14, color: "#333", fontWeight: "600" }}
                >
                  {item.text}
                </Text>
                {FormDatas[item.state] && (
                  <Text
                    style={{
                      color: "#008001",
                      fontSize: 12,
                      fontWeight: "600",
                    }}
                  >
                    Gönderildi
                  </Text>
                )}
              </View>

              <View
                style={{
                  width: "100%",
                  height: 150,
                  borderWidth: 1.5,
                  borderStyle: "dashed",
                  borderRadius: 20,
                  borderColor: FormDatas[item.state] ? "#2080113d" : "#FDEAEA",
                }}
              >
                {loading ? (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ActivityIndicator />
                  </View>
                ) : (
                  <View
                    style={{
                      alignItems: "center",
                      backgroundColor: FormDatas[item.state]
                        ? "#2080113d"
                        : "#FDEAEA",
                      width: "100%",
                      height: "100%",
                      justifyContent: "center",
                      borderRadius: 20,
                    }}
                  >
                    {FormDatas[item.state] ? (
                      <View
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: "#E0F2E3",
                          borderRadius: 20,
                          justifyContent: "center",
                        }}
                      >
                        <View
                          style={{
                            gap: 10,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              if (namFromGetUser[item.state]) {
                                if (
                                  namFromGetUser[item.state].slice(-3) == "pdf"
                                ) {
                                  if (Platform.OS === "android") {
                                    openPdf();
                                  } else if (Platform.OS === "ios") {
                                    navigation.navigate("DecontPdf", {
                                      name: namFromGetUser[item.state],
                                      pdfUri: namFromGetUser[item.state],
                                    });
                                  }
                                } else {
                                  // setselectedPick(FormDatas[item.state])
                                  showDocument(
                                    item.url,
                                    namFromGetUser[item.document],
                                    item.state
                                  );
                                }
                              } else {
                                if (
                                  FormDatas[item.state].uri.slice(-3) == "pdf"
                                ) {
                                  if (Platform.OS === "android") {
                                    openPdf();
                                  } else if (Platform.OS === "ios") {
                                    navigation.navigate("DecontPdf", {
                                      name: FormDatas[item.state]?.name,
                                      pdfUri: FormDatas[item.state].uri,
                                    });
                                  }
                                } else {
                                  // setselectedPick(FormDatas[item.state])
                                  showDocument(
                                    item.url,
                                    namFromGetUser[item.document],
                                    item.state
                                  );
                                }
                              }
                            }}
                            style={{
                              backgroundColor: "#0FA958",
                              padding: 9,
                              borderRadius: 9,
                              width: "60%",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 13,
                                color: "white",
                                fontWeight: "700",
                                textAlign: "center",
                              }}
                            >
                              Belgeyi Gör
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              setselectedPick(item.state);
                              setdeleteModal(true);
                            }}
                            style={{
                              backgroundColor: "#EA2A29",
                              padding: 9,
                              borderRadius: 9,
                              width: "60%",
                            }}
                          >
                            <Text
                              style={{
                                color: "white",
                                fontSize: 13,
                                fontWeight: "700",
                                textAlign: "center",
                              }}
                            >
                              Belgeyi Sil
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : (
                      <>
                        <Feather
                          name="cloud-upload-outline"
                          size={60}
                          color={"#EA2B2E"}
                        />
                        <Text style={{ color: "#EA2B2E", fontSize: 13 }}>
                          Dosyanızı buraya yükleyiniz
                        </Text>
                      </>
                    )}
                  </View>
                )}

                <ImageViewing
                  images={[
                    {
                      uri: `${frontEndUriBase}${selectedUrl}/${selectedDocument}`,
                    },
                  ]}
                  imageIndex={0}
                  visible={isVisible}
                  onRequestClose={() => setIsVisible(false)}
                />
              </View>
            </TouchableOpacity>
          ))}

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity
              style={[styles.finishButton]}
              activeOpacity={0.7}
              onPress={() => {
                prevStep();
              }}
            >
              <Text style={styles.finishButtonText}>Önceki Adım</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.skipButton}
              activeOpacity={0.7}
              onPress={() => {
                setalertForSkip(true);
              }}
            >
              <Text style={styles.skipButtonText}>Atla</Text>
            </TouchableOpacity>
          </View>
          <AwesomeAlert
            show={alertForSkip}
            showProgress={false}
            titleStyle={{
              color: "#333",
              fontSize: 13,
              fontWeight: "700",
              textAlign: "center",
              margin: 5,
            }}
            title={"Atlamak istediğinize emin misiniz?"}
            messageStyle={{ textAlign: "center" }}
            message={`Bu adımı atlarsanız panelinizde işlem yapamaz ve herhangi bir satın alma işlemi gerçekleştiremezsiniz!`}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="Devam Et"
            confirmText="Atla"
            cancelButtonColor="#1d8027"
            confirmButtonColor="#ce4d63"
            onCancelPressed={() => {
              setalertForSkip(false);
            }}
            onConfirmPressed={() => {
              nextStep();
            }}
            confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
            cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
          />
          <AwesomeAlert
            show={deleteModal}
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
            message={`Seçili Dosyayı Kaldırmak İstediğinize Emin misiniz?`}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="Vazgeç"
            confirmText="Sil"
            cancelButtonColor="#1d8027"
            confirmButtonColor="#ce4d63"
            onCancelPressed={() => {
              setdeleteModal(false);
            }}
            onConfirmPressed={() => {
              deleteDocument(selectedPick);
            }}
            confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
            cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
          />
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
                  onPress={() => pickImage(selectedPick)}
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
                  onPress={() => takePhoto(selectedPick)}
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
                    pickDocument(selectedPick);
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
        </ScrollView>
      )}
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
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
  approveTrue: {
    backgroundColor: "green",
  },
  finishButton: {
    backgroundColor: "#EA2B2E",
    width: "45%",
    padding: 10,
    borderRadius: 10,
  },
  finishButtonText: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  skipButtonText: {
    color: "#EA2B2E",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  skipButton: {
    borderWidth: 1,
    borderColor: "#EA2B2E",
    width: "45%",
    padding: 10,
    borderRadius: 10,
  },
});
