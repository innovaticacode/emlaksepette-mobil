import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Modal from "react-native-modal";
import { getValueFor } from "../../../components/methods/user";
import { Icon } from "react-native-elements";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
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

  const [iban, setIban] = useState("TR");
  const [phoneNumber, setPhoneNumber] = useState("");

  const onChangeText = (text2) => {
    // Girilen metindeki sadece rakamları al
    const cleanedText = text2.replace(/[^0-9]/g, "");
    // Temizlenmiş metni 3-3-2-2 formatında düzenle
    let formattedPhoneNumber = "";
    for (let i = 0; i < cleanedText.length; i++) {
      if (i === 4 || i === 7 || i === 9) {
        formattedPhoneNumber += " ";
      }
      formattedPhoneNumber += cleanedText[i];
    }
    setPhoneNumber(formattedPhoneNumber);
  };

  const onChangeText2 = (text) => {
    // Girilen metindeki harf ve rakamları temizle
    const cleanedText = text.replace(/[^a-zA-Z0-9]/g, "");
    // Temizlenmiş metni dört karakterden bir boşluk ekleyerek formatla
    let formattedIban = "";
    for (let i = 0; i < cleanedText.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedIban += " ";
      }
      formattedIban += cleanedText[i];
    }
    setIban(formattedIban);
  };

  const onFocus = () => {
    // IBAN alanı boşsa, varsayılan değeri göster
    if (iban.length < 2) {
      setIban("TR");
    }
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

  const updateUserData = async () => {
    try {
      const updateResponse = await axios.get(
        "https://mobil.emlaksepette.com/api/users/" + user?.id,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );
  
      // Mevcut kullanıcı verilerini güncellenmiş verilerle birleştirme
      const updatedUser = {
        ...user,
        ...updateResponse.data.user,
        access_token: user.access_token, // access token'ı koruma
      };
  
      // Kullanıcı durumunu güncelleme
      setUser(updatedUser);
  
      // SecureStore ile güncellenmiş kullanıcı verilerini kaydetme
      await SecureStore.setItemAsync("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    }
  };
  

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
        "https://mobil.emlaksepette.com/api/institutional/club/update",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );

      updateUserData();

      setTcNo("");
      setIban("");
      setFullName("");
      setStatusMessage(true);
    } catch (error) {
      console.error("Hata:", error);
      setErrorMEssage(error);
    } finally {
      setloading(false);
      setsuccesRegister(false);
    }
  };

  const [errorStatu, seterrorStatu] = useState(0);
  const [loading, setloading] = useState(false);

  const RegisterClub = () => {
    switch (true) {
      case !tcNo:
        seterrorStatu(1);
        setTimeout(() => {
          seterrorStatu(0);
        }, 2000);
        break;
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
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.header}>
          {user.has_club == 0 && (
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
          {user.has_club == 3 && (
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
          {user.has_club == 2 && (
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
        {user.has_club == 3 && (
          <View
            style={{
              backgroundColor: "#EA2A28",
              padding: 10,
              margin: 10,
              borderRadius: 7,
            }}
          >
            <Text
              style={{ textAlign: "center", color: "white", fontWeight: "600" }}
            >
              Emlak Kulüp Üyeliğiniz reddedilmiştir lütfen bilgileri
              günncelleyerek tekrar deneyeniz
            </Text>
          </View>
        )}

        {user.has_club == "0" || user.has_club == "3" ? (
          <>
            <View style={{ alignItems: "center", height: "100%" }}>
              <View style={styles.FormContainer}>
                <View style={styles.Inputs}>
                  {(user.account_type !== "Limited veya Anonim Şirketi" &&
                    user.role_id == "2") ||
                    (user.role_id == "1" && (
                      <View>
                        <Text style={styles.Label}>Tc Kimlik No</Text>
                        <TextInput
                          style={styles.Input}
                          keyboardType="number-pad"
                          value={tcNo}
                          onChangeText={onChangeTC}
                          maxLength={15}
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
                      keyboardType="number-pad"
                      value={iban}
                      onChangeText={onChangeText2}
                      onFocus={onFocus}
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
                <View style={{ alignItems: "center", padding: 10 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#E54242",
                      width: "100%",
                      padding: 10,
                      borderRadius: 6,
                    }}
                    onPress={
                      user.account_type == "Limited veya Anonim Şirketi"
                        ? RegisterAgainClub
                        : RegisterClub
                    }
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
                  <ActivityIndicator />
                )}
              </View>
            </View>
          </View>
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
});
