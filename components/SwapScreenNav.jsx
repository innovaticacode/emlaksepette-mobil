import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import RNPickerSelect from "react-native-picker-select";
import { getValueFor } from "./methods/user";

const SwapScreenNav = () => {
  const route = useRoute();
  const { roomOrder, projectId } = route.params;
  const [projectData, setProjectData] = useState(null); // Başlangıç değeri null olarak değiştirildi
  const [loading, setLoading] = useState(true);
  const [nameid, setNameId] = useState("");
  const [emailid, setEmailId] = useState("");
  const [errorStatu, seterrorStatu] = useState(0);
  const [city, setcity] = useState("");
  const [county, setcounty] = useState("");
  const [phoneid, setPhoneId] = useState("");
  const [citites, setCities] = useState([]);
  const [counties, setcounties] = useState([]);

  const [titleid, setTitleId] = useState("");
  const [offerid, setOfferId] = useState("");

  const [createdid, setCreatedId] = useState("");
  const [selectedroomId, setselectedroomId] = useState();

  const [formVisible, setFormVisible] = useState(false);
  console.log(projectId);
  const [user, setUser] = useState({});
  useEffect(() => {
    getValueFor("user", setUser);
  }, []);
  const GiveOffer = () => {
    switch (true) {
      case !nameid:
        seterrorStatu(1);
        seterrorMessage("İsim Alanı Boş Bırakılmaz");

        setTimeout(() => {
          seterrorStatu(0);
        }, 5000);
        break;
      case !phoneid:
        seterrorStatu(2);
        seterrorMessage("Telefon Alanı Boş Bırakılmaz");

        setTimeout(() => {
          seterrorStatu(0);
        }, 5000);
        break;
      case phoneid.length < 10:
        seterrorStatu(2);
        seterrorMessage("Geçerli bir telefon numarası giriniz");

        setTimeout(() => {
          seterrorStatu(0);
        }, 5000);
        break;
      case !titleid:
        seterrorStatu(3);
        seterrorMessage("Meslek Alanı Boş Bırakılmaz");

        setTimeout(() => {
          seterrorStatu(0);
        }, 5000);
        break;
      case !city:
        seterrorStatu(4);
        seterrorMessage("Şehir Seçiniz ");

        setTimeout(() => {
          seterrorStatu(0);
        }, 5000);
        break;
      case !county:
        seterrorStatu(5);
        seterrorMessage("İlçe Seçniz");

        setTimeout(() => {
          seterrorStatu(0);
        }, 5000);
        break;
      case !emailid:
        seterrorStatu(6);
        seterrorMessage("Mail Alanı Boş Bırakılmaz");

        setTimeout(() => {
          seterrorStatu(0);
        }, 5000);
        break;
      case !offerid:
        seterrorStatu(7);
        seterrorMessage("Açıklama alanı boş bırakılamaz");

        setTimeout(() => {
          seterrorStatu(0);
        }, 5000);
        break;
      default:
        postData();
    }
  };
  const fetchCity = async () => {
    try {
      const response = await axios.get(
        "https://private.emlaksepette.com/api/cities"
      );
      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };
  useEffect(() => {
    fetchCity()
      .then((citites) => setCities(citites.data))
      .catch((error) =>
        console.error("Veri alınırken bir hata oluştu:", error)
      );
  }, []);
  const postData = async () => {
    try {
      var formData = new FormData();

      formData.append("userid", user.id);
      formData.append("projectUserId", data.project.user.id);
      formData.append("projectId", data.project.id);
      formData.append("roomId", selectedroomId);
      formData.append("name", nameid);
      formData.append("phone", phoneid);
      formData.append("email", emailid);
      formData.append("city_id", city);
      formData.append("county_id", county);
      formData.append("title", titleid);
      formData.append("offer_description", offerid);

      const response = await axios.post(
        "https://private.emlaksepette.com/api/institutional/give_offer",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            "Content-Type": "multipart/form-data", // İçerik tipini belirtmek
          },
        }
      );
      setFormVisible(false);
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Başvurunuz Gönderildi",
        textBody: "1-2 İş günü içerisinde haber verilecektir",
      });

      // color("#d4edda");
      setNameId("");
      setPhoneId("");
      setEmailId("");
      setcity("");
      setcounty("");
      setTitleId("");
      setOfferId("");
    } catch (error) {
      if (error.response) {
        // Sunucudan gelen hata yanıtı
        console.error("Sunucu Hatası:", error.response.data);
        console.error("Hata Kodu:", error.response.status);
      } else if (error.request) {
        // İstek yapıldı, ancak cevap alınamadı
        console.error("Sunucudan cevap alınamadı:", error.request);
      } else {
        // İstek ayarları sırasında bir hata oluştu
        console.error("İstek Ayar Hatası:", error.message);
      }
      console.error("Post isteği başarısız:", error);
    }
  };

  const formatPhoneNumber = (value) => {
    // Sadece rakamları al
    const cleaned = ("" + value).replace(/\D/g, "");

    // 0 ile başlıyorsa, ilk karakteri çıkar
    const cleanedWithoutLeadingZero = cleaned.startsWith("0")
      ? cleaned.substring(1)
      : cleaned;

    let formattedNumber = "";

    for (let i = 0; i < cleanedWithoutLeadingZero.length; i++) {
      if (i === 0) formattedNumber += "(";
      if (i === 3) formattedNumber += ") ";
      if (i === 6 || i === 8) formattedNumber += " ";
      formattedNumber += cleanedWithoutLeadingZero[i];
    }

    return formattedNumber;
  };
  const handlePhoneNumberChange = (value) => {
    const formattedPhoneNumber = formatPhoneNumber(value);
    setPhoneId(formattedPhoneNumber);
  };

  const onChangeCity = (value) => {
    setcity(value);
    if (value) {
      fetchDataCounty(value)
        .then((county) => setcounties(county.data))
        .catch((error) =>
          console.error("Veri alınırken bir hata oluştu:", error)
        );
    } else {
      setcounties([]);
    }
  };
  const fetchDataCounty = async (value) => {
    try {
      const response = await axios.get(
        `https://private.emlaksepette.com/api/counties/${value}`
      );
      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };

  const [errorMessage, seterrorMessage] = useState("");

  useEffect(() => {
    const fetchProjectTitle = async () => {
      try {
        const response = await axios.get(
          `https://private.emlaksepette.com/api/project/${projectId}`
        );
        setProjectData(response.data.project); // Başlığı state'e aktarma
      } catch (error) {
        console.error("API isteği sırasında bir hata oluştu:", error);
      } finally {
        setLoading(false); // Yükleme durumunu güncelle
      }
    };

    fetchProjectTitle(); // API isteğini başlat
  }, [projectId]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.text}>{projectData?.id}</Text>
        <View style={[styles.centeredView, { padding: 10 }]}>
          <View style={[styles.modalView, { height: "90%" }]}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 12,
                textAlign: "center",
              }}
            >
              {projectData.project_title} projesinde No'lu Konut Başvuru Formu
            </Text>
            <View showsVerticalScrollIndicator={false}>
              <View style={{ gap: 15 }}>
                <View style={{ gap: 7 }}>
                  <Text style={styles.label}>Ad Soyad</Text>
                  <TextInput
                    style={styles.Input}
                    value={nameid}
                    onChangeText={(value) => setNameId(value)}
                  />
                  {errorStatu == 1 && (
                    <Text style={{ color: "red", fontSize: 12 }}>
                      {errorMessage}
                    </Text>
                  )}
                </View>
                <View style={{ gap: 7 }}>
                  <Text style={styles.label}>Telefon Numarası</Text>
                  <TextInput
                    style={styles.Input}
                    value={phoneid}
                    keyboardType="number-pad"
                    onChangeText={handlePhoneNumberChange}
                  />
                  {errorStatu == 2 && (
                    <Text style={{ color: "red", fontSize: 12 }}>
                      {errorMessage}
                    </Text>
                  )}
                </View>
                <View style={{ gap: 7 }}>
                  <Text style={styles.label}>E-Posta</Text>
                  <TextInput
                    style={styles.Input}
                    value={emailid}
                    onChangeText={(value) => setEmailId(value)}
                  />
                  {errorStatu == 6 && (
                    <Text style={{ color: "red", fontSize: 12 }}>
                      {errorMessage}
                    </Text>
                  )}
                </View>
                <View style={{ gap: 7 }}>
                  <Text style={styles.label} value={titleid}>
                    Meslek
                  </Text>
                  <TextInput
                    style={styles.Input}
                    value={titleid}
                    onChangeText={(value) => setTitleId(value)}
                  />
                  {errorStatu == 3 && (
                    <Text style={{ color: "red", fontSize: 12 }}>
                      {errorMessage}
                    </Text>
                  )}
                </View>
                <View style={{ gap: 7 }}>
                  <Text style={styles.label}>Açıklama</Text>
                  <TextInput
                    style={styles.Input}
                    value={offerid}
                    onChangeText={(value) => setOfferId(value)}
                  />
                  {errorStatu == 7 && (
                    <Text style={{ color: "red", fontSize: 12 }}>
                      {errorMessage}
                    </Text>
                  )}
                </View>

                <View style={{ gap: 6 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "grey",
                      fontWeight: 600,
                    }}
                  >
                    Şehir
                  </Text>
                  <RNPickerSelect
                    doneText="Tamam"
                    placeholder={{
                      label: "Şehir Seçiniz...",
                      value: null,
                    }}
                    style={pickerSelectStyles}
                    value={city}
                    onValueChange={(value) => {
                      onChangeCity(value);
                    }}
                    items={citites}
                  />
                  {errorStatu == 4 && (
                    <Text style={{ color: "red", fontSize: 12 }}>
                      {errorMessage}
                    </Text>
                  )}
                </View>
                <View style={{ gap: 6 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "grey",
                      fontWeight: 600,
                    }}
                  >
                    İlçe
                  </Text>
                  <RNPickerSelect
                    doneText="Tamam"
                    placeholder={{
                      label: "İlçe Seçiniz...",
                      value: null,
                    }}
                    value={county}
                    style={pickerSelectStyles}
                    onValueChange={(value) => setcounty(value)}
                    items={counties}
                  />
                  {errorStatu == 5 && (
                    <Text style={{ color: "red", fontSize: 12 }}>
                      {errorMessage}
                    </Text>
                  )}
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#28A745",
                  width: "40%",
                  padding: 15,
                  borderRadius: 5,
                }}
                onPress={GiveOffer}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Gönder
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#DC3545",
                  width: "40%",
                  padding: 15,
                  borderRadius: 5,
                }}
                onPress={() => {
                  setFormVisible(false);
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Kapat
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 1,
    borderColor: "#eaeff5",
    borderRadius: 5,
    padding: 10,
    fontSize: 14, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    fontSize: 14, // to ensure the text is never behind the icon
  },
});

export default SwapScreenNav;
