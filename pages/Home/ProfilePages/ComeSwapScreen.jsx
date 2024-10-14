import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getValueFor } from "../../../components/methods/user";
import NoDataScreen from "../../../components/NoDataScreen";
import axios from "axios";
import { addDotEveryThreeDigits } from "../../../components/methods/merhod";
import Modal from "react-native-modal";

import RequestItem from "./RequestItem";
import Icon from "react-native-vector-icons/AntDesign";
import { Image } from "react-native-elements";

export default function ComeSwapScreen() {
  const [user, setUser] = useState({});
  const apiUrl = "https://private.emlaksepette.com";
  const openModal = () => {
    setDetailModal(true);
  };
  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const [mySwapRequest, setMySwapRequest] = useState([]);

  const [swapSuggestdetails, setswapSuggestdetails] = useState([]);
  const [swapSuggestdetailsCompany, setswapSuggestdetailsCompany] = useState(
    []
  );
  const [selectedModalIndex, setselectedModalIndex] = useState(0);
  const [DetailModal, setDetailModal] = useState(false);

  const fetchData = async () => {
    try {
      if (user?.access_token) {
        const response = await axios.get(
          "https://private.emlaksepette.com/api/institutional/my-swap-applications",
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );

        setMySwapRequest(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) {
        // Sunucu bir hata döndü
        console.error("Server responded with status:", error.response.status);
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        // İstek yapıldı, ama yanıt alınamadı
        console.error("No response received:", error.request);
      } else {
        // İstek ayarlanırken bir hata oluştu
        console.error("Error message:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const getDetails = async (id, index) => {
    try {
      if (user?.access_token) {
        const response = await axios.get(
          `https://private.emlaksepette.com/api/institutional/my-swap-applications/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        console.log(id + " id budurrr");

        openModal();
        setswapSuggestdetails(response?.data?.form);
        setswapSuggestdetailsCompany(response?.data?.item);

        setselectedModalIndex(index);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {mySwapRequest.length == 0 ? (
        <NoDataScreen
          message="Takas bilgisi bulunamadı."
          iconName="swap-horizontal-bold"
          buttonText="Anasayfaya Dön"
          navigateTo="HomePage"
        />
      ) : (
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ gap: 15, paddingBottom: 50 }}
        >
          {mySwapRequest.map((item, i) => (
            <RequestItem item={item} index={i} getDetails={getDetails} />
          ))}

          <Modal
            animationType="fade"
            backdropColor="#0000"
            onBackdropPress={() => setDetailModal(!DetailModal)}
            visible={DetailModal}
            onRequestClose={() => {
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
                    gap: 21,
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
                          {addDotEveryThreeDigits(
                            swapSuggestdetails.arac_satis_rakami
                          )}
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
                            {addDotEveryThreeDigits(
                              swapSuggestdetails.konut_satis_rakami
                            )}
                            ₺
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
                            {addDotEveryThreeDigits(
                              swapSuggestdetails.isyeri_satis_rakami
                            )}
                            ₺
                          </Text>
                        </View>
                      </>
                    )}
                  {swapSuggestdetails.takas_tercihi == "diğer" && (
                    <Text style={{ color: "#333" }}>
                      {" "}
                      <Text style={{ fontWeight: "bold" }}>
                        Takas ile ilgili ürün/hizmet detayı:
                      </Text>
                      {swapSuggestdetails.takas_tercihi}
                    </Text>
                  )}

                  {/* <View style={{borderBottomWidth:1,borderBottomColor:'#ebebeb',paddingBottom:5}}>
                    <Text style={{color:'#333'}}> <Text style={{fontWeight:'bold'}}>Oda Sayısı: </Text>Araç</Text>
                    </View> */}
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <ImageBackground
                      source={require(".././././Onboarding/onboarding.png")}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        overflow: "hidden",
                      }}
                    />
                    <Text style={{ fontWeight: "700" }}>
                      {swapSuggestdetailsCompany?.title}
                    </Text>
                  </View>
                  <View style={{ marginTop: 21 }}>
                    <Text style={{ fontWeight: "500" }}>
                      {swapSuggestdetailsCompany?.description.replace(
                        /<\/?(p|ol|li|ul)>/g,
                        ""
                      )}
                    </Text>
                  </View>

                  <Image />
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#F5F5F7",
    gap: 10,
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
