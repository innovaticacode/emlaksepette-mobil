import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import RNPickerSelect from "react-native-picker-select";
import { getValueFor } from "./methods/user";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from "react-native-alert-notification";
const { width, height } = Dimensions.get("window");

const SwapScreenNav = () => {
  const route = useRoute();
  const { roomOrder, projectId } = route.params;
  const [projectData, setProjectData] = useState({}); // Başlangıç değeri null olarak değiştirildi
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
  console.log(projectData?.project?.user_id + "sdfmsdn");

  useEffect(() => {
    const fetchProjectTitle = async () => {
      try {
        const response = await axios.get(
          `https://private.emlaksepette.com/api/project/${projectId}`
        );
        setProjectData(response.data); // Başlığı state'e aktarma
      } catch (error) {
        console.error("API isteği sırasında bir hata oluştu:", error);
      } finally {
        setLoading(false); // Yükleme durumunu güncelle
      }
    };

    fetchProjectTitle(); // API isteğini başlat
  }, [projectId]);
  const postData = () => {
    const formData = new FormData();
    formData.append("userid", user.id);
    formData.append("projectUserId", projectData.project.user_id);
    formData.append("projectId", projectData.project.id);
    formData.append("roomId", roomOrder);
    formData.append("name", nameid);
    formData.append("phone", phoneid);
    formData.append("email", emailid);
    formData.append("city_id", city);
    formData.append("county_id", county);
    formData.append("title", titleid);
    formData.append("offer_description", offerid);

    axios
      .post(
        "https://private.emlaksepette.com/api/institutional/give_offer",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            "Content-Type": "multipart/form-data", // İçerik tipini belirtmek
          },
        }
      )
      .then((response) => {
        setFormVisible(false);

        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Başvurunuz Gönderildi.",
          textBody: "1-2 İş günü içerisinde haber verilecektir",
          button: "Tamam",
        });

        // color("#d4edda");
        setNameId("");
        setPhoneId("");
        setEmailId("");
        setcity("");
        setcounty("");
        setTitleId("");
        setOfferId("");
      })
      .catch((error) => {
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
      });
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

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <AlertNotificationRoot>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={[styles.centeredView, {}]}>
            <View style={[styles.modalView, { height: "90%" }]}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  textAlign: "center",
                  color: "#EA2B2E",
                  fontWeight: "600",
                }}
              >
                {projectData.project.project_title} projesinde {roomOrder} No'lu
                Konut Başvuru Formu
              </Text>
              <View showsVerticalScrollIndicator={false}>
                <View style={{ gap: 10, marginTop: 20 }}>
                  <View>
                    <Text style={styles.label}>Ad Soyad</Text>
                    <TextInput
                      style={styles.input}
                      value={nameid}
                      onChangeText={(value) => setNameId(value)}
                      placeholder="Adınız Soyadınız"
                    />
                    {errorStatu == 1 && (
                      <Text style={styles.errorStyle}>{errorMessage}</Text>
                    )}
                  </View>
                  <View>
                    <Text style={styles.label}>Telefon Numarası</Text>
                    <TextInput
                      style={styles.input}
                      value={phoneid}
                      keyboardType="number-pad"
                      onChangeText={handlePhoneNumberChange}
                      placeholder="Telefon Numaranız"
                    />
                    {errorStatu == 2 && (
                      <Text style={styles.errorStyle}>{errorMessage}</Text>
                    )}
                  </View>
                  <View>
                    <Text style={styles.label}>E-Posta</Text>
                    <TextInput
                      style={styles.input}
                      value={emailid}
                      onChangeText={(value) => setEmailId(value)}
                      placeholder="Email Adresiniz"
                    />
                    {errorStatu == 6 && (
                      <Text style={styles.errorStyle}>{errorMessage}</Text>
                    )}
                  </View>
                  <View>
                    <Text style={styles.label} value={titleid}>
                      Meslek
                    </Text>
                    <TextInput
                      style={styles.input}
                      value={titleid}
                      onChangeText={(value) => setTitleId(value)}
                      placeholder="Mesleğiniz"
                    />
                    {errorStatu == 3 && (
                      <Text style={styles.errorStyle}>{errorMessage}</Text>
                    )}
                  </View>
                  <View>
                    <Text style={styles.label}>Açıklama</Text>
                    <TextInput
                      style={styles.input}
                      value={offerid}
                      onChangeText={(value) => setOfferId(value)}
                      placeholder="Açıklamanız"
                    />
                    {errorStatu == 7 && (
                      <Text style={styles.errorStyle}>{errorMessage}</Text>
                    )}
                  </View>

                  <View>
                    <Text style={styles.label}>Şehir</Text>
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
                      <Text style={styles.errorStyle}>{errorMessage}</Text>
                    )}
                  </View>
                  <View>
                    <Text style={styles.label}>İlçe</Text>
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
                      <Text style={styles.errorStyle}>{errorMessage}</Text>
                    )}
                  </View>
                </View>
              </View>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#EA2B2E",
                    width: "100%",
                    padding: 10,
                    borderRadius: 10,
                    marginVertical: 10,
                  }}
                  onPress={GiveOffer}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    Gönder
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  errorStyle: {
    color: "#EA2B2E",
    fontSize: 13,
    fontWeight: "600",
    padding: 2,
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
  label: {
    color: "#777777",
    fontSize: 13,
    fontWeight: "600",
    padding: 5,
    gap: 10,
  },
  input: {
    height: 35,
    width: "100%",
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "black",
    backgroundColor: "#F3F3F3",
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 35,
    width: "100%",
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "black",
    backgroundColor: "#F3F3F3",
    fontSize: 16,
  },
  inputAndroid: {
    height: 35,
    width: "100%",
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "black",
    backgroundColor: "#F3F3F3",
    fontSize: 16,
  },
});

export default SwapScreenNav;
