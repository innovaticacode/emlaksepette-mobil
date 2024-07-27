import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  apiRequestGet,
  frontEndUri,
} from "../../components/methods/apiRequest";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/Entypo";
import { CheckBox } from "react-native-elements";
import { addDotEveryThreeDigits } from "../../components/methods/merhod";
import { ImageBackground } from "expo-image";
import axios from "axios";
import { getValueFor } from "../../components/methods/user";
import {
  ALERT_TYPE,
  AlertNotificationDialog,
  Dialog,
} from "react-native-alert-notification";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import HTML from "react-native-render-html";
import Modal from "react-native-modal";

export default function AddComment() {
  const [data, setData] = useState({});
  const route = useRoute();
  const nav = useNavigation();
  const { HouseID } = route.params;
  const [loading, setloading] = useState(true);
  useEffect(() => {
    apiRequestGet("housing/" + HouseID).then((res) => {
      setData(res.data.housing);
      setloading(false);
    });
  }, []);

  const [rating, setRating] = useState(0); // Başlangıçta hiçbir yıldız dolu değil
  const [rate, setrate] = useState(0);
  const handleStarPress = (index) => {
    // Tıklanan yıldıza kadar olan tüm yıldızları dolu yap
    setRating(index + 1);

    // Sarı yıldızların sayısını hesapla ve konsola yazdır
    const yellowStars = index + 1;
    setrate(yellowStars);
  };
  console.log(rate);
  const [checkedForm, setCheckedForm] = React.useState(false);
  const toggleCheckboxForm = () => {
    setCheckedForm(!checkedForm);
  };
  const apiUrl = "https://private.emlaksepette.com/";
  const [user, setUser] = useState({});

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);
  const [comment, setcomment] = useState("");
  const shareComment = async () => {
    const formData = new FormData();
    formData.append("rate", rate);
    formData.append("comment", comment);

    try {
      if (user?.access_token && rating > 0) {
        const response = await axios.post(
          `https://private.emlaksepette.com/api/housing/${HouseID}/send-comment`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        setcomment("");
        setrate(0);
        setRating(0);
        nav.navigate("Success", {
          name: "Yorum başarılı",
          message: "Değerlendirmeniz İçin Teşekkürler",
          HouseID: HouseID,
          type:'House'
        });
      } else {
        alert("yorum boş");
      }
    } catch (error) {
      console.error("post isteği olmadı", error);
    }
  };

  const [modalVisible2, setModalVisible2] = useState(false);
  const [Deals, setDeals] = useState("");
  useEffect(() => {
    fetchDataDeal();
  }, []);
  const fetchDataDeal = async () => {
    const url = `https://private.emlaksepette.com/api/sayfa/yorum-yazma-kurallari`;
    try {
      const response = await fetch(url);
      // const data = await fetchFromURL(url);
      const data = await response.json();
      console.log(data);
      setDeals(data.content);
      // Burada isteğin başarılı olduğunda yapılacak işlemleri gerçekleştirebilirsiniz.
    } catch (error) {
      console.error("İstek hatası:", error);
      // Burada isteğin başarısız olduğunda yapılacak işlemleri gerçekleştirebilirsiniz.
    }
  };
  return (
    <ScrollView
      style={style.container}
      contentContainerStyle={{
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator color="#333" />
        </View>
      ) : (
        <>
          <View style={[style.card, { flexDirection: "row" }]}>
            <View style={style.Image}>
              <ImageBackground
                source={{
                  uri:
                    data &&
                    data.housing_type_data &&
                    `${apiUrl}/housing_images/${
                      JSON.parse(data.housing_type_data)["images"]
                    }`,
                }}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
            <View style={{ flexDirection: "column", gap: 5 }}>
              <View style={{ paddingLeft: 5, width: "80%" }}>
                <Text
                  numberOfLines={2}
                  style={{ fontSize: 13, fontWeight: "600" }}
                >
                  {data?.title}
                </Text>
              </View>
              <View style={{ paddingLeft: 5, gap: 5, width: "70%" }}>
                <Text
                  style={{ fontSize: 12, color: "grey", fontWeight: "600" }}
                  numberOfLines={2}
                >
                  Satıcı:{" "}
                  <Text style={{ color: "#274ABB" }}>{data?.user?.name}</Text>
                </Text>
                <Text
                  style={{ fontSize: 13, color: "green", fontWeight: "600" }}
                >
                  {data &&
                    data.housing_type_data &&
                    addDotEveryThreeDigits(
                      JSON.parse(data.housing_type_data)["price"]
                    )}{" "}
                  TL
                </Text>
              </View>
            </View>
          </View>

          <View style={[style.card, {}]}>
            <View style={{ padding: 10, paddingBottom: 15 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#333",
                }}
              >
                İlanı aşağıdan puanlayabilir ve yorum yapabilirsin
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 40,
              }}
            >
              {[...Array(5)].map((_, index) => (
                <View key={index}>
                  <TouchableOpacity onPress={() => handleStarPress(index)}>
                    <Icon
                      name={index < rating ? "star" : "staro"}
                      size={32}
                      color={index < rating ? "gold" : "gray"}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <View style={{ paddingTop: 30, gap: 0 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 6,
                }}
              >
                <Text
                  style={{ fontSize: 13, fontWeight: "600", color: "#333" }}
                >
                  İlanı Değerlendir
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      textDecorationLine: "underline",
                      fontSize: 12,
                      color: "grey",
                    }}
                    onPress={() => setModalVisible2(true)}
                  >
                    Yorum Kuralları
                  </Text>
                </TouchableOpacity>

                <Modal
                  isVisible={modalVisible2}
                  onBackdropPress={() => setModalVisible2(false)}
                  backdropColor="rgba(0, 0, 0, 0.5)"
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 0,
                  }}
                >
                  <SafeAreaView
                    style={{
                      backgroundColor: "white",
                      borderRadius: 10,
                      padding: 20,
                      width: "90%",
                      maxHeight: "80%",
                    }}
                  >
                    <View
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        zIndex: 1,
                      }}
                    >
                      <TouchableOpacity onPress={() => setModalVisible2(false)}>
                        <Icon3 name="close-circle" size={31} color={"red"} />
                      </TouchableOpacity>
                    </View>
                    <ScrollView>
                      {Deals ? (
                        <HTML
                          source={{ html: Deals }}
                          contentWidth={Dimensions.get("window").width * 0.8}
                        />
                      ) : (
                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                            height: 200,
                          }}
                        >
                          <Text>Yükleniyor...</Text>
                        </View>
                      )}
                    </ScrollView>
                  </SafeAreaView>
                </Modal>
              </View>
              <View>
                <TextInput
                  style={style.Input}
                  multiline
                  placeholder="İlanı değerlendirin..."
                  placeholderTextColor={"grey"}
                  value={comment}
                  onChangeText={(value) => setcomment(value)}
                />
              </View>
              <View style={{}}>
                <View style={{ padding: 6, marginTop: 10 }}>
                  <Text
                    style={{ fontSize: 13, fontWeight: "600", color: "#333" }}
                  >
                    Konut Fotoğrafı Ekle
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    style={[
                      style.Input,
                      {
                        width: "32%",
                        alignItems: "center",
                        justifyContent: "center",
                      },
                    ]}
                  >
                    <Icon2 name="camera" size={25} color={"#babbbc"} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      style.Input,
                      {
                        width: "32%",
                        alignItems: "center",
                        justifyContent: "center",
                      },
                    ]}
                  >
                    <Icon2 name="camera" size={25} color={"#babbbc"} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      style.Input,
                      {
                        width: "32%",
                        alignItems: "center",
                        justifyContent: "center",
                      },
                    ]}
                  >
                    <Icon2 name="camera" size={25} color={"#babbbc"} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <CheckBox
              checked={checkedForm}
              onPress={toggleCheckboxForm}
              // Use ThemeProvider to make change for all checkbox
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="red"
              title={<Text style={{ fontSize: 12 }}>Sözleşme</Text>}
              size={20}
              containerStyle={{
                backgroundColor: "white",
                borderWidth: 0,
                width: "100%",
              }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#EB2B2E",
                padding: 10,
                borderRadius: 5,
              }}
              onPress={shareComment}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#ffffff",
                  fontWeight: "700",
                }}
              >
                Paylaş
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  card: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 15,
    width: "100%",

    ...Platform.select({
      ios: {
        shadowColor: " #e6e6e6",
      },
      android: {
        elevation: 5,
      },
    }),
  },
  Image: {
    backgroundColor: "red",
    width: 80,
    height: 70,
  },
  Input: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    height: 80,
    borderWidth: 0.3,
    borderColor: "#dce1ea",
    borderRadius: 4,
  },
});
