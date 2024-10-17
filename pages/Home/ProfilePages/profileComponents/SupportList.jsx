import {
  View,
  Text,
  Alert,
  Platform,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import axios from "axios";
import { getValueFor } from "../../../../components/methods/user";
import moment from "moment";
import FeatherIcon from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import ImageViewing from "react-native-image-viewing";
import RenderHtml from "react-native-render-html";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import * as Sharing from "expo-sharing";

import { useNavigation } from "@react-navigation/native";
import { UrlTile } from "react-native-maps";
import NoDataScreen from "../../../../components/NoDataScreen";

export default function SupportList() {
  const [supportData, setSupportData] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSupport, setSelectedSupport] = useState(null);
  const [pdfFile, setPdfFile] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const nav = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedUri, setselectedUri] = useState(null);
  const [trackingCode, setTrackingCode] = useState("");
  const [trackingData, setTrackingData] = useState(null);

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const openModal = (support) => {
    setSelectedSupport(support);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedSupport(null);
  };

  useEffect(() => {
    const fetchSupportData = async () => {
      setLoading(true); // İlk olarak loading durumunu başlat

      if (!user.access_token) {
        setLoading(false); // Token yoksa loading'i durdur
        return; // Token yoksa daha fazla işlem yapma
      }

      try {
        const response = await axios.get(
          "https://private.emlaksepette.com/api/support",
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );

        let data = response.data.data;

        // Verileri oluşturulma tarihine göre sıralama (en yeni en üstte olacak şekilde)
        data = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setSupportData(data);
        const paths = data.map((item) => item.file_path);
        setPdfFile(paths);
      } catch (error) {
        console.error("API Hatası:", error);
        // Hata mesajı kullanıcıya gösterilebilir
        Alert.alert("Hata", "Destek verileri yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false); // Her durumda loading'i durdur
      }
    };

    fetchSupportData(); // Fonksiyonu çağır
  }, [user]); // user değiştiğinde bu effect'i çalıştır

  async function saveFile(uri, filename, mimetype) {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          filename,
          mimetype
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
          })
          .catch((e) => console.log(e));
      } else {
        Sharing.shareAsync(uri);
      }
    } else {
      Sharing.shareAsync(uri);
    }
  }

  async function download(URL) {
    const filename = URL;
    const result = await FileSystem.downloadAsync(
      `https://private.emlaksepette.com/support/${URL}`,
      FileSystem.documentDirectory + filename
    );
    saveFile(result.uri, filename, result.headers["Content-Type"]);
  }

  const OpenImage = (uri) => {
    console.log("Opening image with URI:", uri); // URI'nın doğru olup olmadığını kontrol edin
    setIsVisible(true);
    setselectedUri(uri);
  };

  const openPdf = async (uri) => {
    if (uri) {
      try {
        const contentUri = await FileSystem.getContentUriAsync(uri);
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

  const submitData = async () => {
    if (!trackingCode) {
      Alert.alert("Hata", "Lütfen bir talep numarası giriniz.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://private.emlaksepette.com/api/support?code=${trackingCode}`
      );

      if (response.status === 200) {
        setSupportData(response.data.data);
        setModalVisible(true);
      } else {
        Alert.alert("Hata", "Talep numarası bulunamadı.");
      }
    } catch (error) {
      console.error("Sorgulama Hatası:", error);
      Alert.alert("Hata", "Bir hata oluştu, lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 35,
      }}
    >
      {loading ? (
        <ActivityIndicator size="large" color="#333" />
      ) : user?.access_token ? ( // Kullanıcının token'ı var mı kontrolü
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <View style={{ flex: 1 }}>
            {supportData.length > 0 ? (
              supportData.map((support, index) => (
                <View key={index} style={{ marginTop: 20 }}>
                  <View style={styles.supportItem}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            fontWeight: "700",
                            marginBottom: 10,
                            fontSize: 13,
                          }}
                        >
                          Kategori
                        </Text>
                        <Text style={{ fontSize: 13 }}>{support.category}</Text>
                        {support?.send_reason && (
                          <View style={{ marginTop: 10 }}>
                            <Text
                              style={{
                                fontWeight: "700",
                                marginBottom: 10,
                                fontSize: 13,
                              }}
                            >
                              Evrak Gönderme Nedeni
                            </Text>
                            <Text style={{ fontSize: 13 }}>
                              {support?.send_reason}
                            </Text>
                          </View>
                        )}
                      </View>
                      <View>
                        <Text
                          style={{
                            fontWeight: "700",
                            marginBottom: 10,
                            fontSize: 13,
                          }}
                        >
                          Oluşturulma Tarihi
                        </Text>
                        <Text style={{ textAlign: "right", fontSize: 13 }}>
                          {moment(support.created_at).format("DD/MM/YYYY")}
                        </Text>
                      </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <Text
                        style={{
                          fontWeight: "700",
                          marginBottom: 10,
                          fontSize: 13,
                        }}
                      >
                        Adı:
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          flexShrink: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        {support.name}
                      </Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <Text
                        style={{
                          fontWeight: "700",
                          marginBottom: 10,
                          fontSize: 13,
                        }}
                      >
                        Telefon:
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          flexShrink: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        {support.phone}
                      </Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <Text
                        style={{
                          fontWeight: "700",
                          marginBottom: 10,
                          fontSize: 13,
                        }}
                      >
                        E-Mail
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          flexShrink: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        {support.email}
                      </Text>
                    </View>

                    <View style={{ marginTop: 10 }}>
                      <Text
                        style={{
                          fontWeight: "700",
                          marginBottom: 10,
                          fontSize: 13,
                        }}
                      >
                        Açıklama
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          flexShrink: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        {support.description}
                      </Text>
                    </View>

                    <View
                      style={{
                        marginTop: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        flex: 1,
                      }}
                    >
                      <View style={{ width: "45%" }}>
                        {support.file_path !== null ? (
                          <TouchableOpacity
                            onPress={() => {
                              if (support?.file_path?.slice(-3) == "pdf") {
                                download(support.file_path);
                              } else {
                                OpenImage(support.file_path);
                              }
                            }}
                            style={{
                              backgroundColor: "rgba(234, 43, 46, 0.2)",
                              borderRadius: 5,
                              padding: 10,
                              flex: 1 / 2,
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <AntDesign
                                style={{ marginRight: 0 }}
                                name={
                                  support.file_path.endsWith(".pdf")
                                    ? "pdffile1"
                                    : "picture"
                                }
                                color={
                                  support.file_path.endsWith(".pdf")
                                    ? "red"
                                    : "red"
                                }
                              />
                              <Text
                                style={{
                                  textAlign: "center",
                                  color: "red",
                                  marginLeft: 10,
                                }}
                                numberOfLines={1}
                              >
                                {pdfFile}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        ) : (
                          <></>
                        )}
                      </View>
                      {support.return_support ? (
                        <View style={{ width: "45%" }}>
                          <TouchableOpacity
                            style={{
                              backgroundColor: "rgba(234, 43, 46, 0.2)",
                              justifyContent: "center",
                              borderRadius: 5,
                              padding: 10,
                              flex: 1 / 2,
                              backgroundColor: "#0FA958",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                            onPress={() => openModal(support)}
                          >
                            <FeatherIcon
                              style={{ marginRight: 10 }}
                              name="check-circle"
                              color={"#fff"}
                            />
                            <Text
                              style={{ textAlign: "center", color: "#fff" }}
                            >
                              Yanıtı Gör
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View style={{ width: "45%" }}>
                          <View style={styles.buttonResponse}>
                            <FeatherIcon
                              style={{ marginRight: 10 }}
                              name="clock"
                              color={"#FF9907"}
                            />
                            <Text
                              style={{ textAlign: "center", color: "#FF9907" }}
                            >
                              Yanıt Bekleniyor
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                    <View></View>
                  </View>
                </View>
              ))
            ) : (
              <View
                style={{
                  flexGrow: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <NoDataScreen
                  message="Talep bulunamadı."
                  iconName="rss-box"
                  buttonText="Anasayfaya Dön"
                  navigateTo="HomePage"
                />
              </View>
            )}
          </View>
        </ScrollView>
      ) : (
        // Token yoksa başka bir sayfa göstermek için
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.label}>Talep Sorgulama</Text>
          <TextInput
            style={styles.input}
            onChangeText={setTrackingCode}
            placeholder="Talep numaranızı giriniz."
            keyboardType="number-pad"
            maxLength={15}
          />
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
      )}
      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Yanıt</Text>
                <Text style={styles.modalContent}>
                  {selectedSupport && (
                    <RenderHtml
                      contentWidth={300}
                      source={{ html: selectedSupport.return_support }}
                    />
                  )}
                </Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeModal}
                >
                  <Text style={styles.closeButtonText}>Kapat</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal> */}
      <ImageViewing
        images={[
          {
            uri: `https://private.emlaksepette.com/storage/support_images/${selectedUri}`,
          },
        ]}
        imageIndex={0}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Talep Detayları</Text>
            {supportData ? (
              <View>
                <Text style={styles.modalContent}>
                  Talep Kodu: {supportData.code}
                </Text>
                <Text style={styles.modalContent}>
                  Oluşturulma Tarihi:{" "}
                  {moment(supportData.created_at).format("DD/MM/YYYY")}
                </Text>
                <Text style={styles.modalContent}>Adı: {supportData.name}</Text>
                <Text style={styles.modalContent}>
                  Telefon: {supportData.phone}
                </Text>
                <Text style={styles.modalContent}>
                  E-Mail: {supportData.email}
                </Text>
                <Text style={styles.modalContent}>
                  Kategori: {supportData.category}
                </Text>
                <Text style={styles.modalContent}>
                  Açıklama: {supportData.description}
                </Text>
                {supportData.file_path && (
                  <Text style={styles.modalContent}>
                    Dosya Yolu: {supportData.file_path}
                  </Text>
                )}
                <Text style={styles.modalContent}>
                  Güncellenme Tarihi:{" "}
                  {moment(supportData.updated_at).format("DD/MM/YYYY")}
                </Text>
                <Text style={styles.modalContent}>
                  Yanıt Durumu:{" "}
                  {supportData.return_support ? "Yanıt Var" : "Yanıt Yok"}
                </Text>
              </View>
            ) : (
              <Text style={styles.modalContent}>Veri bulunamadı.</Text>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  supportItem: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
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
  label: {
    fontWeight: "700",
    marginBottom: 10,
    fontSize: 13,
  },
  text: {
    fontSize: 13,
  },
  button: {
    backgroundColor: "rgba(234, 43, 46, 0.2)",
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonResponse: {
    backgroundColor: "rgba(234, 43, 46, 0.2)",
    justifyContent: "center",
    borderRadius: 5,
    padding: 10,
    flex: 1 / 2,
    backgroundColor: "#FFCE86",
    flexDirection: "row",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalContent: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#0FA958",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
  input: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: "200",
    borderRadius: 4,
    color: "black",
    borderWidth: 1,
    borderColor: "#e6e6e6",
  },
});
