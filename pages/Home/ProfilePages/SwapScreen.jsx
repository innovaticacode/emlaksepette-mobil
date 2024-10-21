import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import SwapItem from "./profileComponents/SwapItem";
import Modal from "react-native-modal";
import { getValueFor } from "../../../components/methods/user";
import axios from "axios";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import NoDataScreen from "../../../components/NoDataScreen";
import { apiUrl } from "../../../components/methods/apiRequest";

export default function SwapScreen() {
  const [DetailModal, setDetailModal] = useState(false);
  const [swapSuggestdetails, setswapSuggestdetails] = useState([]);
  const [selectedModalIndex, setselectedModalIndex] = useState(0);
  const [SwapSuggest, setSwapSuggest] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const openModal = () => {
    setDetailModal(true);
  };

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const fetchData = async () => {
    setLoading(true); // Loading'i başlatıyoruz
    try {
      if (user.access_token) {
        const response = await axios.get(
          `${apiUrl}institutional/swap_applications`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        setSwapSuggest(response.data);
        return setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return setLoading(false);
    } finally {
      setLoading(false); // Veri çekimi bitince loading'i kapatıyoruz
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const getDetails = async (id, index) => {
    try {
      if (user?.access_token) {
        const response = await axios.get(
          `${apiUrl}institutional/swap_applications/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        openModal(); // Modal'ı açıyoruz
        setswapSuggestdetails(response?.data?.form); // Detayları state'e set ediyoruz
        setselectedModalIndex(index); // Modal'ı hangi index ile açacağımızı belirliyoruz
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#000"
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
          animating={loading}
        />
      ) : (
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ gap: 15, paddingBottom: 50 }}
        >
          {SwapSuggest.map((item, index) => (
            <SwapItem
              openModal={openModal}
              key={index}
              item={item}
              getDetails={getDetails}
              index={index}
            />
          ))}

          <Modal
            animationType="fade"
            backdropColor="#0000"
            onBackdropPress={() => setDetailModal(!DetailModal)}
            visible={DetailModal}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setDetailModal(!DetailModal);
            }}
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              padding: 15,
              margin: "0",
            }}
          >
            <StatusBar
              backgroundColor="rgba(0, 0, 0, 0.5)"
              barStyle="light-content"
            />
            <View style={{}}>
              <View
                style={[
                  styles.modalView,
                  styles.card,
                  {
                    padding: 0,
                    borderRadius: 10,
                    backgroundColor: "#F8F7F4",
                    gap: 20,
                  },
                ]}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 17 }}>
                    {selectedModalIndex + 1}.Başvuru Detayları
                  </Text>
                  <TouchableOpacity onPress={() => setDetailModal(false)}>
                    <Icon name="closecircle" size={23} />
                  </TouchableOpacity>
                </View>

                <View style={{ gap: 20 }}>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#ebebeb",
                      paddingBottom: 5,
                    }}
                  >
                    <Text style={{ color: "#333" }}>
                      <Text style={{ fontWeight: "bold" }}>Adı:</Text>
                      {swapSuggestdetails.ad}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#ebebeb",
                      paddingBottom: 5,
                    }}
                  >
                    <Text style={{ color: "#333" }}>
                      <Text style={{ fontWeight: "bold" }}>Soyadı:</Text>
                      {swapSuggestdetails.soyad}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#ebebeb",
                      paddingBottom: 5,
                    }}
                  >
                    <Text style={{ color: "#333" }}>
                      <Text style={{ fontWeight: "bold" }}>Telefon:</Text>
                      {swapSuggestdetails.telefon}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#ebebeb",
                      paddingBottom: 5,
                    }}
                  >
                    <Text style={{ color: "#333" }}>
                      {" "}
                      <Text style={{ fontWeight: "bold" }}>Email: </Text>
                      {swapSuggestdetails.email}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#ebebeb",
                      paddingBottom: 5,
                    }}
                  >
                    <Text style={{ color: "#333" }}>
                      {" "}
                      <Text style={{ fontWeight: "bold" }}>Şehir: </Text>
                      {swapSuggestdetails?.city?.title}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#ebebeb",
                      paddingBottom: 5,
                    }}
                  >
                    <Text style={{ color: "#333" }}>
                      {" "}
                      <Text style={{ fontWeight: "bold" }}>İlçe: </Text>
                      {swapSuggestdetails?.county?.title}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#ebebeb",
                      paddingBottom: 5,
                    }}
                  >
                    <Text style={{ color: "#333" }}>
                      {" "}
                      <Text style={{ fontWeight: "bold" }}>
                        Takas Tercihi:{" "}
                      </Text>
                      {swapSuggestdetails.takas_tercihi}
                    </Text>
                  </View>
                  {swapSuggestdetails.takas_tercihi == "araç" && (
                    <>
                      <View
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: "#ebebeb",
                          paddingBottom: 5,
                        }}
                      >
                        <Text style={{ color: "#333" }}>
                          {" "}
                          <Text style={{ fontWeight: "bold" }}>
                            Araç Model Yılı:{" "}
                          </Text>
                          {swapSuggestdetails.arac_model_yili}
                        </Text>
                      </View>
                      <View
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: "#ebebeb",
                          paddingBottom: 5,
                        }}
                      >
                        <Text style={{ color: "#333" }}>
                          {" "}
                          <Text style={{ fontWeight: "bold" }}>
                            Araç Markası:{" "}
                          </Text>
                          {swapSuggestdetails.arac_markasi}
                        </Text>
                      </View>
                      <View
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: "#ebebeb",
                          paddingBottom: 5,
                        }}
                      >
                        <Text style={{ color: "#333" }}>
                          {" "}
                          <Text style={{ fontWeight: "bold" }}>
                            Yakıt Tipi:{" "}
                          </Text>
                          {swapSuggestdetails.yakit_tipi}
                        </Text>
                      </View>
                      <View
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: "#ebebeb",
                          paddingBottom: 5,
                        }}
                      >
                        <Text style={{ color: "#333" }}>
                          {" "}
                          <Text style={{ fontWeight: "bold" }}>
                            Vites Tipi:{" "}
                          </Text>
                          {swapSuggestdetails.vites_tipi}
                        </Text>
                      </View>
                      <View
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: "#ebebeb",
                          paddingBottom: 5,
                        }}
                      >
                        <Text style={{ color: "#333" }}>
                          {" "}
                          <Text style={{ fontWeight: "bold" }}>
                            Araç Satış Rakamı:{" "}
                          </Text>
                          {swapSuggestdetails.arac_satis_rakami}
                        </Text>
                      </View>
                    </>
                  )}
                  {swapSuggestdetails.takas_tercihi == "emlak" &&
                    swapSuggestdetails.emlak_tipi == "arsa" && (
                      <>
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#ebebeb",
                            paddingBottom: 5,
                          }}
                        >
                          <Text style={{ color: "#333" }}>
                            {" "}
                            <Text style={{ fontWeight: "bold" }}>
                              Emlak tipi:{" "}
                            </Text>
                            {swapSuggestdetails.emlak_tipi}
                          </Text>
                        </View>
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#ebebeb",
                            paddingBottom: 5,
                          }}
                        >
                          <Text style={{ color: "#333" }}>
                            {" "}
                            <Text style={{ fontWeight: "bold" }}>
                              Satış Rakamı:{" "}
                            </Text>
                            {swapSuggestdetails.satis_rakami}
                          </Text>
                        </View>
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#ebebeb",
                            paddingBottom: 5,
                          }}
                        >
                          <Text style={{ color: "#333" }}>
                            {" "}
                            <Text style={{ fontWeight: "bold" }}>
                              Arsa İli:{" "}
                            </Text>
                            {swapSuggestdetails?.acity?.title}
                          </Text>
                        </View>
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#ebebeb",
                            paddingBottom: 5,
                          }}
                        >
                          <Text style={{ color: "#333" }}>
                            {" "}
                            <Text style={{ fontWeight: "bold" }}>
                              Arsa İlçe{" "}
                            </Text>
                            {swapSuggestdetails?.acounty?.title}
                          </Text>
                        </View>
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#ebebeb",
                            paddingBottom: 5,
                          }}
                        >
                          <Text style={{ color: "#333" }}>
                            {" "}
                            <Text style={{ fontWeight: "bold" }}>
                              Arsa Mahallesi:{" "}
                            </Text>
                            {swapSuggestdetails?.aneighborhood?.mahalle_title}
                          </Text>
                        </View>
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#ebebeb",
                            paddingBottom: 5,
                          }}
                        >
                          <Text style={{ color: "#333" }}>
                            {" "}
                            <Text style={{ fontWeight: "bold" }}>
                              Ada Parsel Bilgisi:{" "}
                            </Text>
                            {swapSuggestdetails?.ada_parsel}
                          </Text>
                        </View>
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#ebebeb",
                            paddingBottom: 5,
                          }}
                        >
                          <Text style={{ color: "#333" }}>
                            {" "}
                            <Text style={{ fontWeight: "bold" }}>
                              İmar Durumu:{" "}
                            </Text>
                            {swapSuggestdetails?.imar_durumu}
                          </Text>
                        </View>
                      </>
                    )}
                  {swapSuggestdetails.takas_tercihi == "emlak" &&
                    swapSuggestdetails.emlak_tipi == "konut" && (
                      <>
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#ebebeb",
                            paddingBottom: 5,
                          }}
                        >
                          <Text style={{ color: "#333" }}>
                            {" "}
                            <Text style={{ fontWeight: "bold" }}>
                              Emlak tipi:{" "}
                            </Text>
                            {swapSuggestdetails.emlak_tipi}
                          </Text>
                        </View>
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#ebebeb",
                            paddingBottom: 5,
                          }}
                        >
                          <Text style={{ color: "#333" }}>
                            {" "}
                            <Text style={{ fontWeight: "bold" }}>
                              Konut tipi:{" "}
                            </Text>
                            {swapSuggestdetails.konut_tipi}
                          </Text>
                        </View>
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#ebebeb",
                            paddingBottom: 5,
                          }}
                        >
                          <Text style={{ color: "#333" }}>
                            {" "}
                            <Text style={{ fontWeight: "bold" }}>
                              Oda Sayısı:{" "}
                            </Text>
                            {swapSuggestdetails.oda_sayisi}
                          </Text>
                        </View>
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#ebebeb",
                            paddingBottom: 5,
                          }}
                        >
                          <Text style={{ color: "#333" }}>
                            {" "}
                            <Text style={{ fontWeight: "bold" }}>
                              Konut Yaşı:{" "}
                            </Text>
                            {swapSuggestdetails.konut_yasi}
                          </Text>
                        </View>
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#ebebeb",
                            paddingBottom: 5,
                          }}
                        >
                          <Text style={{ color: "#333" }}>
                            {" "}
                            <Text style={{ fontWeight: "bold" }}>
                              Kullanım Durumu{" "}
                            </Text>
                            {swapSuggestdetails.kullanim_durumu}
                          </Text>
                        </View>
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#ebebeb",
                            paddingBottom: 5,
                          }}
                        >
                          <Text style={{ color: "#333" }}>
                            {" "}
                            <Text style={{ fontWeight: "bold" }}>
                              Satış Rakamı:{" "}
                            </Text>
                            {swapSuggestdetails.konut_satis_rakami}₺
                          </Text>
                        </View>
                      </>
                    )}

                  {swapSuggestdetails.takas_tercihi == "emlak" &&
                    swapSuggestdetails.emlak_tipi == "işyeri" && (
                      <>
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#ebebeb",
                            paddingBottom: 5,
                          }}
                        >
                          <Text style={{ color: "#333" }}>
                            {" "}
                            <Text style={{ fontWeight: "bold" }}>
                              Emlak tipi:{" "}
                            </Text>
                            {swapSuggestdetails.emlak_tipi}
                          </Text>
                        </View>
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#ebebeb",
                            paddingBottom: 5,
                          }}
                        >
                          <Text style={{ color: "#333" }}>
                            {" "}
                            <Text style={{ fontWeight: "bold" }}>
                              Ticar Bilgiler:{" "}
                            </Text>
                            {swapSuggestdetails.ticari_bilgiler}
                          </Text>
                        </View>
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#ebebeb",
                            paddingBottom: 5,
                          }}
                        >
                          <Text style={{ color: "#333" }}>
                            {" "}
                            <Text style={{ fontWeight: "bold" }}>
                              İşyeri Satış Rakamı:{" "}
                            </Text>
                            {swapSuggestdetails.isyeri_satis_rakami}₺
                          </Text>
                        </View>
                      </>
                    )}
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      )}
      {SwapSuggest.length === 0 && !loading ? (
        <>
          <View>
            <NoDataScreen
              message="Takas bilgisi bulunamadı."
              iconName="swap-horizontal-bold"
              buttonText="Anasayfaya Dön"
              navigateTo="HomePage"
            />
          </View>
        </>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#F5F5F7",
    gap: 10,
    flex: 1,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 500,
    paddingVertical: 30,
    paddingHorizontal: 10,
    width: "100%",

    borderWidth: 0.7,
    borderColor: "#e6e6e6",
    ...Platform.select({
      ios: {
        shadowColor: " #e6e6e6",
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
