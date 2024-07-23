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
} from "react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import axios from "axios";
import { getValueFor } from "../../../../components/methods/user";
import moment from "moment";
import FeatherIcon from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import RenderHtml from "react-native-render-html";

export default function SupportList() {
  const [supportData, setSupportData] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSupport, setSelectedSupport] = useState(null);

  const openModal = (support) => {
    setSelectedSupport(support);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedSupport(null);
  };

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  useEffect(() => {
    if (user.access_token) {
      // API'den veriyi çekme
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "https://private.emlaksepette.com/api/support",
            {
              headers: {
                Authorization: `Bearer ${user.access_token}`,
              },
            }
          ); // API URL'ini buraya girin

          setSupportData(response.data.data); // Gelen veriyi state'e kaydedin
        } catch (error) {
          console.error("API Hatası:", error); // Hata detaylarını konsola yazdır
          Alert.alert(
            "Veri çekme sırasında bir hata oluştu.",
            error.message || "Bilinmeyen bir hata oluştu."
          ); // Hata mesajını göster
        } finally {
          setLoading(false); // Loading state'ini kapat
        }
      };
      fetchData();
    }
  }, [user]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {loading ? (
        <ActivityIndicator size="large" color="#333" />
      ) : (
        <ScrollView>
          <View style={{}}>
            {supportData.map((support, index) => (
              <View key={index} style={{ padding: 20 }}>
                <TouchableOpacity
                  style={{
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
                  }}
                >
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
                      Açıklama
                    </Text>
                    <Text
                      style={{ fontSize: 13, flexShrink: 1, flexWrap: "wrap" }}
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
                      <TouchableOpacity
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
                            style={{ marginRight: 10 }}
                            name="pdffile1"
                            color={"red"}
                          />
                          <Text style={{ textAlign: "center", color: "red" }}>
                            Belge1.pdf
                          </Text>
                        </View>
                      </TouchableOpacity>
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
                            color={"#107641"}
                          />
                          <Text
                            style={{ textAlign: "center", color: "#107641" }}
                          >
                            Yanıtı Gör
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View style={{ width: "45%" }}>
                        <TouchableOpacity
                          style={{
                            backgroundColor: "rgba(234, 43, 46, 0.2)",
                            justifyContent: "center",
                            borderRadius: 5,
                            padding: 10,
                            flex: 1 / 2,
                            backgroundColor: "#FFCE86",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
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
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
      <Modal
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
});
