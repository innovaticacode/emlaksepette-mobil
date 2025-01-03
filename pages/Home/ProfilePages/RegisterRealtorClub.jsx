import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Modal from "react-native-modal";
import { Icon } from "react-native-elements";
import { Platform } from "react-native";
import HTML from "react-native-render-html";
import * as SecureStore from "expo-secure-store";
import { ActivityIndicator } from "react-native-paper";
import { CheckBox } from "@rneui/themed";
import { ScrollView } from "react-native";
import { apiUrl } from "../../../components/methods/apiRequest";
export default function RegisterRealtorClub({ setİsLoggedIn }) {
  const route = useRoute();
  const navigation = useNavigation();

  const [tcNo, setTcNo] = useState("");

  const onChangeTC = (text) => {
    // Girilen metindeki sadece rakamları al
    const cleanedText = text.replace(/[^0-9]/g, "");
    // Temizlenmiş metni 3-2-2-2-2 formatında düzenle
    let formattedTcNo = "";
    for (let i = 0; i < cleanedText.length; i++) {
      if (i === 3 || i === 5 || i === 7 || i === 9) {
        formattedTcNo += " ";
      }
      formattedTcNo += cleanedText[i];
    }
    setTcNo(text);
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [iban, setIban] = useState("TR");

  const formatIban = (text) => {
    // Sadece harfleri ve rakamları içeren bir metin oluştur
    const cleanedText = text.replace(/[^a-zA-Z0-9]/g, "");

    // Eğer metin TR ile başlamıyorsa başa ekle
    let formattedText = cleanedText.startsWith("TR")
      ? cleanedText
      : "TR" + cleanedText;

    // TR sonrası sadece rakamlar olmalı
    formattedText = formattedText.replace(/[^0-9]/g, "");

    // İlk iki rakam TR'den sonra gelecek
    const firstTwo = formattedText.slice(0, 2);
    // Sonraki rakamlar dörderli gruplara ayrılacak
    const rest = formattedText.slice(2);

    // IBAN'ı 4 haneli bloklar halinde gruplandır
    let groups = [];
    for (let i = 0; i < rest.length; i += 4) {
      groups.push(rest.substring(i, i + 4));
    }

    // Gruplandırılmış metni birleştir ve başına 'TR' ve ilk iki rakamı ekle
    let finalIban = `TR${firstTwo} ${groups.join(" ")}`.trim();

    // IBAN maksimum 32 karakter uzunluğunda olmalı (TR dahil)
    return finalIban.substring(0, 32);
  };

  const handleIbanChange = (text) => {
    console.log("Raw input:", text);

    // IBAN'ı formatla
    const formattedText = formatIban(text);

    console.log("Formatted IBAN:", formattedText);

    // Eğer metin tamamen boşsa, IBAN'ı temizle
    setIban(formattedText);
  };

  const [fullName, setFullName] = useState("");

  const onChangeFullName = (text) => {
    const capitalizedText = text
      .split(" ")
      .map((word, index) =>
        index === 1 ? word.charAt(0).toUpperCase() + word.slice(1) : word
      )
      .join(" ");
    setFullName(capitalizedText);
  };

  const [user, setUser] = useState({});
  const [check, setcheck] = useState(false);

  useEffect(() => {
    const fetchInitialUserData = async () => {
      try {
        // Retrieve user data from SecureStore
        const storedUser = await SecureStore.getItemAsync("user");

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error fetching initial user data:", error);
      }
    };

    fetchInitialUserData();
  }, []);

  useEffect(() => {
    user.has_club == 3 ? setIban(user.iban) : setIban("");
  }, [user]);
  useEffect(() => {
    setFullName(user.bank_name);
    setTcNo(user.id_);
  }, [user]);

  const [StatusMessage, setStatusMessage] = useState(false);
  const [succesRegister, setsuccesRegister] = useState(false);
  const [ErrorMEssage, setErrorMEssage] = useState("");
  const sendPutRequest = async () => {
    const data = {
      idNumber: tcNo,
      bank_name: fullName,
      iban: iban,
      "check-d": true,
    };
    setsuccesRegister(true);
    setloading(true);

    try {
      const response = await axios.put(
        apiUrl + "institutional/club/update",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );

      setTcNo("");
      setIban("");
      setFullName("");
      setStatusMessage(true);
      GetUserInfo();
    } catch (error) {
      console.error("Hata:", error);
      setErrorMEssage(error);
    } finally {
      setsuccesRegister(false);
    }
  };

  const [errorStatu, seterrorStatu] = useState(0);
  const [loading, setloading] = useState(false);

  const RegisterClub = () => {
    switch (true) {
      case !fullName:
        seterrorStatu(2);
        setTimeout(() => {
          seterrorStatu(0);
        }, 2000);
        break;
      case iban.length !== 32:
        seterrorStatu(3);
        setTimeout(() => {
          seterrorStatu(0);
        }, 2000);
        break;
      default:
        sendPutRequest();
    }
  };
  const RegisterAgainClub = () => {
    switch (true) {
      case !fullName:
        seterrorStatu(2);
        setTimeout(() => {
          seterrorStatu(0);
        }, 2000);
        break;
      case iban.length !== 32:
        seterrorStatu(3);
        setTimeout(() => {
          seterrorStatu(0);
        }, 2000);
        break;
      default:
        sendPutRequest();
    }
  };
  const [namFromGetUser, setnamFromGetUser] = useState({});
  const GetUserInfo = async () => {
    setloading(true);
    try {
      if (user?.access_token && user) {
        const userInfo = await axios.get(apiUrl + "users/" + user?.id, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });

        setnamFromGetUser(userInfo.data.user);
      }
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    GetUserInfo();
  }, [user]);
  const [Deals, setDeals] = useState("");
  const fetchFromURL = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const fetchDataDeal = async () => {
    const url = `${apiUrl}sayfa/emlaksepette-paylasimci-davranis-kurallari`;
    try {
      const data = await fetchFromURL(url);
      setDeals(data.content);
      // Burada isteğin başarılı olduğunda yapılacak işlemleri gerçekleştirebilirsiniz.
    } catch (error) {
      console.error("İstek hatası:", error);
      // Burada isteğin başarısız olduğunda yapılacak işlemleri gerçekleştirebilirsiniz.
    }
  };
  useEffect(() => {
    fetchDataDeal();
  }, [user]);

  const [checked, setChecked] = useState(false);
  const toggleCheckbox = () => {
    setChecked(!checked);
    setshowAlertForDeal(false);
  };
  const [DealModal, setDealModal] = useState(false);
  const [showAlertForDeal, setshowAlertForDeal] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.header}>
          {namFromGetUser?.has_club == 1 && (
            <View style={{ gap: 10 }}>
              <Text style={styles.headerText}>
                Emlak Sepette | Emlak Kulüp Başvurunuz Onaylandı
              </Text>
              <View
                style={{
                  borderTopWidth: 1,
                  borderColor: "#ebebeb",
                  paddingTop: 20,
                }}
              >
                <Text
                  style={{
                    color: "green",
                    fontSize: 16,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  Üyelik başvurunuz onaylandı. Bilgileriniz onaylandı ve
                  hesabınız aktif edildi.
                </Text>
              </View>
            </View>
          )}
          {namFromGetUser?.has_club == 0 && (
            <>
              <Text style={styles.headerText}>
                Emlak Sepette | Emlak Kulüp Başvurusu
              </Text>
              <Text style={{ textAlign: "center", paddingTop: 10 }}>
                Emlak Kulüp ayrıcalıklarından faydalanmak için lütfen aşağıdaki
                bilgileri eksiksiz doldurun ve üyelik sözleşmesini onaylayın.
              </Text>
            </>
          )}
          {namFromGetUser.has_club == 3 && (
            <>
              <Text style={styles.headerText}>
                Emlak Sepette | Emlak Kulüp Başvurusu
              </Text>
              <Text style={{ textAlign: "center", paddingTop: 10 }}>
                Emlak Kulüp ayrıcalıklarından faydalanmak için lütfen aşağıdaki
                bilgileri eksiksiz doldurun ve üyelik sözleşmesini onaylayın.
              </Text>
            </>
          )}
          {namFromGetUser.has_club == 2 && (
            <View style={{ gap: 10 }}>
              <Text style={styles.headerText}>
                Emlak Sepette | Emlak Kulüp Başvurunuz Alındı
              </Text>
              <View
                style={{
                  borderTopWidth: 1,
                  borderColor: "#ebebeb",
                  paddingTop: 20,
                }}
              >
                <Text
                  style={{
                    color: "green",
                    fontSize: 16,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  Üyelik başvurunuz alındı. Bilgileriniz incelendikten sonra
                  hesabınız aktive edilecek.
                </Text>
              </View>
            </View>
          )}
        </View>
        {namFromGetUser.has_club == 3 && (
          <View>
            <View
              style={{
                backgroundColor: "#EA2A28",
                padding: 10,
                margin: 10,
                borderRadius: 7,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "600",
                }}
              >
                Emlak Kulüp Üyeliğiniz reddedilmiştir lütfen bilgileri
                günncelleyerek tekrar deneyeniz
              </Text>
            </View>
          </View>
        )}

        {namFromGetUser.has_club == 0 || namFromGetUser.has_club == 3 ? (
          <>
            <View style={{ alignItems: "center", height: "100%" }}>
              <View style={styles.FormContainer}>
                <View style={styles.Inputs}>
                  {(user.account_type !== "Limited veya Anonim Şirketi" &&
                    user.role_id == "2") ||
                    (user.role_id == "1" && (
                      <View>
                        <Text style={styles.Label}>TC Kimlik No</Text>
                        <TextInput
                          style={styles.Input}
                          keyboardType="number-pad"
                          value={tcNo}
                          onChangeText={onChangeTC}
                          maxLength={11}
                        />
                        {errorStatu == 1 && (
                          <Text style={{ fontSize: 12, color: "red" }}>
                            Tc kimlik numarası zorunludur
                          </Text>
                        )}
                      </View>
                    ))}
                  <View>
                    <Text style={styles.Label}>Hesap Sahibinin Adı Soyadı</Text>
                    <TextInput
                      style={styles.Input}
                      value={fullName}
                      onChangeText={onChangeFullName}
                    />
                    {errorStatu == 2 && (
                      <Text style={{ fontSize: 12, color: "red" }}>
                        Hesap sahibi adı soyadı zorunludur
                      </Text>
                    )}
                  </View>
                  <View>
                    <Text style={styles.Label}>Iban Numarası</Text>
                    <TextInput
                      style={styles.Input}
                      value={iban}
                      onChangeText={handleIbanChange}
                      keyboardType="number-pad"
                      maxLength={32}
                    />
                    {errorStatu == 3 && (
                      <Text style={{ fontSize: 12, color: "red" }}>
                        {" "}
                        IBAN alanı zorunludur
                      </Text>
                    )}
                  </View>
                </View>

                <View style={{ padding: 5 }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      paddingLeft: 10,
                      alignItems: "center",
                    }}
                    onPress={() => {
                      toggleCheckbox();
                    }}
                  >
                    <CheckBox
                      checked={checked}
                      onPress={toggleCheckbox}
                      // Use ThemeProvider to make change for all checkbox
                      iconType="material-community"
                      checkedIcon="checkbox-marked"
                      uncheckedIcon="checkbox-blank-outline"
                      checkedColor="red"
                      containerStyle={{
                        paddingRight: 0,
                        padding: 0,
                        marginTop: 0,
                        marginBottom: 10,
                        marginLeft: -2,
                        borderColor: "#f27b7d",
                        borderWidth: showAlertForDeal ? 2 : 0,
                        borderRadius: 5,
                        marginRight: 2,
                      }}
                    />
                    <Text>
                      <Text
                        style={{
                          color: "#2F5F9E",
                          textDecorationLine: "underline",
                          fontWeight: "600",
                        }}
                        onPress={() => {
                          setDealModal(true);
                        }}
                      >
                        Emlaksepette Paylaşımcı Davranış Kuralları'nı
                      </Text>{" "}
                      okudum onaylıyorum.
                    </Text>
                  </TouchableOpacity>
                </View>
                {showAlertForDeal && (
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 14,
                      color: "#f27b7d",
                      fontWeight: "700",
                    }}
                  >
                    Lütfen Sözleşmeyi Onaylayın
                  </Text>
                )}
                <View style={{ alignItems: "center", padding: 10 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#E54242",
                      width: "100%",
                      padding: 10,
                      borderRadius: 6,
                    }}
                    onPress={() => {
                      if (checked) {
                        user.account_type == "Limited veya Anonim Şirketi"
                          ? RegisterAgainClub()
                          : RegisterClub();
                        setshowAlertForDeal(false);
                      } else {
                        setshowAlertForDeal(true);
                      }
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 17,
                        fontWeight: "500",
                      }}
                    >
                      Başvuru Yap
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        ) : null}

        <Modal
          isVisible={succesRegister}
          onBackdropPress={() => setsuccesRegister(false)}
          animationIn={"zoomInUp"}
          animationOut={"zoomOutUp"}
          animationInTiming={200}
          animationOutTiming={200}
          backdropColor="transparent"
          style={styles.modal4}
        >
          <View style={styles.modalContent4}>
            <View style={{ padding: 10, gap: 25 }}>
              <View>
                <Icon name="check-circle" color={"green"} size={40} />
              </View>
              <View>
                {loading == true ? (
                  <Text
                    style={{
                      textAlign: "center",
                      color: "green",
                      fontSize: 18,
                      fontWeight: "500",
                    }}
                  >
                    Emlak Kulüp Başvurunuz Alınmıştır!
                  </Text>
                ) : (
                  <ActivityIndicator color="#333" />
                )}
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={DealModal}
          onBackdropPress={() => setDealModal(false)}
          backdropColor="transparent"
          style={styles.modal2}
        >
          <SafeAreaView style={styles.modalContent2}>
            <ScrollView style={{ padding: 10 }}>
              <HTML source={{ html: Deals }} contentWidth={100} />

              <View style={{ alignItems: "center", paddingBottom: 20 }}>
                <TouchableOpacity
                  style={styles.Acceptbtn}
                  onPress={() => {
                    setChecked(true);
                    setDealModal(false);
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Okudum kabul ediyorum
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    width: "100%",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ebebeb",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  FormContainer: {
    backgroundColor: "#FFFFFF",
    margin: 10,
    width: "100%",
    height: "100%",
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
  Inputs: {
    display: "flex",
    justifyContent: "space-around",
    padding: 10,
  },
  Input: {
    backgroundColor: "#ebebebba",
    marginTop: 10,
    padding: 9,
    fontSize: 17,
    borderRadius: 7,
  },
  Label: {
    top: 5,
    color: "#131313",
  },
  modal4: {
    justifyContent: "center",
    margin: 0,
    padding: 20,
    backgroundColor: "#1414148c",
  },
  modalContent4: {
    backgroundColor: "#ffffff",
    padding: 20,
    height: "20%",
    borderRadius: 5,
  },
  modal2: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent2: {
    backgroundColor: "#f4f4f4",
    padding: 20,
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  Acceptbtn: {
    backgroundColor: "#2aaa46",
    padding: 10,
    borderRadius: 5,
  },
});
