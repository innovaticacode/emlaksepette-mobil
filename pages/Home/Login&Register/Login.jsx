import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { React, useState, useEffect, useCallback } from "react";
import BackIcon from "react-native-vector-icons/AntDesign";
import EyeIcon from "react-native-vector-icons/Ionicons";
import IconSocialMedia from "react-native-vector-icons/AntDesign";
import MailCheck from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import { apiRequestPost, apiUrl } from "../../../components/methods/apiRequest";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import HTML from "react-native-render-html";
import { ActivityIndicator } from "react-native-paper";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { getValueFor } from "../../../components/methods/user";
import axios from "axios";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from "react-native-alert-notification";
import { useDispatch } from "react-redux";
import { setShoppingProfile } from "../../../store/slices/Menu/MenuSlice";
import { sanitizeEmail } from "../../../utils";

export default function Login({ navigation }) {
  const route = useRoute();
  const dispatch = useDispatch();
  const [status, setStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState(false);
  const [showLengthAlert, setShowLengthAlert] = useState(false);
  const [showUpperAlert, setShowUpperAlert] = useState(false);
  const [showSymbolAlert, setShowSymbolAlert] = useState(false);
  const [showNumberAlert, setShowNumberAlert] = useState(false);
  const [textfull, settextfull] = useState(false);
  const [submitDisabled, setsubmitDisabled] = useState(false);
  const [eye, seteye] = useState("eye-off-sharp");
  const [Show, setShow] = useState(false);
  const [checked, setChecked] = useState(false);
  const toggleCheckbox = () => setChecked(!checked);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailControl, setemailControl] = useState(false);
  const [passControl, setpassControl] = useState(false);
  const [showMailSendAlert, setshowMailSendAlert] = useState(false);
  const [user, setUser] = useState({});
  const [loadingForLogin, setloadingForLogin] = useState(false);
  const IsShowAlert = route.params?.showAlert;
  const message = route.params?.message;
  const [loading, setLoading] = useState(true);
  const [Deals, setDeals] = useState("");
  const [loadingDeal, setloadingDeal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const show = () => {
    setShow(!Show);
  };

  const handleTextInputChange = (text) => {
    const filteredValue = sanitizeEmail(text);
    setEmail(filteredValue);
  };

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const Login = () => {
    setloadingForLogin(true);
    apiRequestPost("login", {
      email: email,
      password: password,
    })
      .then((res) => {
        if (res.data.status) {
          SecureStore.setItemAsync("user", JSON.stringify(res.data));
          SecureStore.setItemAsync(
            "PhoneVerify",
            JSON.stringify(res.data.phone_verification_status)
          );
          if (res.data.phone_verification_status == 0) {
            setUser(res.data); // Kullanıcı durumunu günceller
            navigation.goBack();
            navigation.navigate("PhoneVerify");
          } else {
            setUser(res.data); // Kullanıcı durumunu günceller
            navigation.goBack(); // Modalı kapatır ve bir önceki sayfaya döner
            dispatch(setShoppingProfile({ isShoppingProfile: false }));
            navigation.replace("Drawer", { screen: "Home" });
          }
        } else {
          // setshowMailSendAlert(true);
          setStatus(false);
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Hata!",
            textBody: `${res.data.message}`,
            button: "Tamam",
          });
          // setStatusMessage(res.data.message);
        }
      })
      .finally(() => {
        setloadingForLogin(false);
      });
  };

  const Submit = () => {
    if (!(email.trim() !== "" && email.includes("@"))) {
      setemailControl(true);
      setTimeout(() => {
        setemailControl(false);
      }, 2000);
    } else if (password.length < 1) {
      setpassControl(true);
      setTimeout(() => {
        setpassControl(false);
      }, 2000);
    } else {
      Login();
    }
  };

  Login.navigationOptions = {
    headerShown: false,
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);

      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }, [])
  );

  const fetchFromURL = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const fetchData = async () => {
    setloadingDeal(true);
    const url = `${apiUrl}sayfa/bireysel-uyelik-sozlesmesi`;
    try {
      const data = await fetchFromURL(url);
      setDeals(data.content);
    } catch (error) {
      console.error("İstek hatası:", error);
    } finally {
      setloadingDeal(false);
    }
  };

  const closeModal = () => {
    navigation.goBack();
  };

  useEffect(() => {
    dispatch(setShoppingProfile({ isShoppingProfile: false }));
  }, [navigation]);

  return (
    <AlertNotificationRoot>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          {loading ? (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <ActivityIndicator size={"large"} color="#333" />
            </View>
          ) : (
            <>
              <View style={styles.logIn}>
                <View style={styles.form}>
                  {IsShowAlert == true && (
                    <View
                      style={{
                        backgroundColor: "#E7FCEB",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 10,
                        gap: 15,
                        display: IsShowAlert ? "flex" : "none",
                      }}
                    >
                      <View>
                        <BackIcon
                          name="checkcircle"
                          color={"#1D8027"}
                          size={30}
                        />
                      </View>
                      <View style={{ flex: 1.9 / 2 }}>
                        <Text style={{ color: "#1D8027", fontSize: 12 }}>
                          Hesabınız oluşturuldu. Hesabınızı etkinleştirmek için
                          lütfen e-posta adresinize gönderilen doğrulama
                          bağlantısını tıklayarak e-postanızı onaylayın
                        </Text>
                      </View>
                    </View>
                  )}
                  <KeyboardAvoidingView>
                    <View style={{ gap: 20 }}>
                      <View>
                        <Text
                          style={{
                            color: "#17243e",
                            fontSize: 24,
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          Giriş Yap
                        </Text>
                      </View>

                      <View style={{ gap: 10 }}>
                        <View style={{}}>
                          <Text
                            style={{
                              fontSize: 13,
                              color: "#000000",
                              fontWeight: "600",
                            }}
                          >
                            E-Posta
                          </Text>
                        </View>

                        <TextInput
                          style={styles.Input}
                          placeholder="E-Posta Adresi"
                          value={email}
                          onChangeText={handleTextInputChange}
                          autoCapitalize="none" // İlk harfin büyük olmasını engeller
                        />
                        <Text
                          style={{
                            color: "red",
                            fontWeight: "500",
                            fontSize: 12,
                            display: emailControl ? "flex" : "none",
                          }}
                        >
                          Lütfen Geçerli Bir E-Posta Adresi Giriniz!
                        </Text>
                      </View>
                      <View style={{ gap: 10 }}>
                        <View style={{}}>
                          <Text
                            style={{
                              fontSize: 13,
                              color: "#000000",
                              fontWeight: "600",
                            }}
                          >
                            Şifre
                          </Text>
                        </View>
                        <View>
                          <TouchableOpacity
                            style={{
                              position: "absolute",
                              right: 9,
                              justifyContent: "center",
                              top: "21%",
                              // Bu değeri TextInput'un yüksekliğine göre ayarlayın
                              zIndex: 1,
                            }}
                            onPress={show}
                          >
                            <View style={{ height: "100%" }}>
                              <EyeIcon
                                name={Show ? "eye" : "eye-off-sharp"}
                                size={23}
                                color={"#333"}
                              />
                            </View>
                          </TouchableOpacity>
                          <TextInput
                            style={styles.Input}
                            placeholder="Şifre"
                            secureTextEntry={Show ? false : true}
                            value={password}
                            onChangeText={(value) => setPassword(value)}
                          />
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 15,
                          }}
                        >
                          <TouchableOpacity
                            onPress={toggleCheckbox}
                            style={[
                              styles.checkbox,
                              checked ? styles.checked : null,
                            ]}
                          >
                            {checked ? (
                              <FontAwesome5Icon
                                name="check-square"
                                size={18}
                                color="black"
                              />
                            ) : (
                              <FontAwesome5Icon
                                name="square"
                                size={18}
                                color="black"
                              />
                            )}
                            <Text style={styles.checkboxLabel}>
                              Beni Hatırla
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{}}
                            onPress={() => {
                              navigation.navigate("Forgot");
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: "600",
                                letterSpacing: 0.3,
                                color: "#161616",
                              }}
                            >
                              Şifremi Unuttum
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#EA2C2E",
                          padding: 8,
                          borderRadius: 5,
                        }}
                        onPress={Submit}
                      >
                        {loadingForLogin ? (
                          <ActivityIndicator color="white" size={"small"} />
                        ) : (
                          <Text
                            style={{
                              textAlign: "center",
                              color: "white",
                              fontWeight: "600",
                            }}
                          >
                            Giriş Yap
                          </Text>
                        )}
                      </TouchableOpacity>
                      <View>
                        <Text style={{ textAlign: "center", marginTop: 0 }}>
                          <Text
                            style={{
                              fontSize: 13,
                              color: "#000000",
                              fontWeight: "600",
                            }}
                          >
                            Henüz üye değil misiniz?{" "}
                          </Text>

                          <Text
                            style={{
                              fontWeight: "bold",
                              color: "#1A77F3",
                              fontSize: 13,
                            }}
                            onPress={() => {
                              closeModal();
                              setTimeout(() => {
                                navigation.navigate("Register");
                              }, 400);
                            }}
                          >
                            Üye Ol
                          </Text>
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: "#E7EBEE",
                            height: 1,
                            padding: 1,
                            width: "40%",
                          }}
                        />
                        <Text style={{ color: "#666666" }}>veya</Text>
                        <View
                          style={{
                            backgroundColor: "#E7EBEE",
                            height: 1,
                            padding: 1,
                            width: "40%",
                          }}
                        />
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-around",
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            backgroundColor: "#EEF4FE",
                            padding: 10,
                            width: "35%",
                            height: 50,
                            borderRadius: 5,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <Image
                            source={require("../../../assets/gogle.png")}
                            style={{ width: "25%", height: "100%" }}
                            resizeMode="contain"
                          />
                          <Text style={{ fontWeight: "bold", color: "#333" }}>
                            Google
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </KeyboardAvoidingView>

                  <View style={{}}>
                    <View style={{ width: "95%", justifyContent: "center" }}>
                      <Text
                        style={{
                          textAlign: "center",
                          color: "#333",
                          fontSize: 13,
                          fontWeight: "600",
                        }}
                      >
                        Google kimliğinizle bir sonraki adıma geçmeniz halinde
                        <Text
                          style={{ color: "#2F5F9E" }}
                          onPress={() => {
                            setModalVisible(true);
                            setTimeout(() => {
                              fetchData();
                            }, 100);
                          }}
                        >
                          {" "}
                          Bireysel Hesap Sözleşmesi ve Ekleri
                        </Text>{" "}
                        'ni kabul etmiş sayılırsınız.
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <Modal
                isVisible={modalVisible}
                onBackdropPress={() => setModalVisible(false)}
                backdropColor="transparent"
                style={styles.modal2}
                animationIn={"fadeInRightBig"}
                animationOut={"fadeOutRightBig"}
              >
                <SafeAreaView style={styles.modalContent2}>
                  <>
                    {loadingDeal ? (
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ActivityIndicator color="#333" size={"large"} />
                      </View>
                    ) : (
                      <ScrollView
                        style={{ padding: 10 }}
                        contentContainerStyle={{ gap: 20 }}
                      >
                        <HTML source={{ html: Deals }} contentWidth={100} />

                        <View
                          style={{ alignItems: "center", paddingBottom: 25 }}
                        >
                          <TouchableOpacity
                            style={styles.Acceptbtn}
                            onPress={() => {
                              setChecked(!checked);
                              setModalVisible(false);
                            }}
                          >
                            <Text
                              style={{
                                color: "white",
                                fontWeight: "bold",
                                width: "100%",
                                textAlign: "center",
                              }}
                            >
                              Kapat
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </ScrollView>
                    )}
                  </>
                </SafeAreaView>
              </Modal>
              <Modal isVisible={showMailSendAlert} style={styles.modal}>
                <View style={styles.modalContent}>
                  <View
                    style={{ flexDirection: "row", justifyContent: "flex-end" }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#333",
                        padding: 5,
                        borderRadius: 20,
                      }}
                      onPress={() => setshowMailSendAlert(false)}
                    >
                      <IconSocialMedia name="close" size={20} color={"white"} />
                    </TouchableOpacity>
                  </View>

                  <View style={{ gap: 10 }}>
                    <View style={{ alignItems: "center" }}>
                      <MailCheck
                        name="close"
                        size={55}
                        color={status ? "green" : "red"}
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 14,
                          color: "#333",
                          letterSpacing: 0.5,
                        }}
                      >
                        {statusMessage}
                      </Text>
                    </View>
                  </View>
                </View>
              </Modal>
            </>
          )}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </AlertNotificationRoot>
  );
}

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    margin: 0,
  },

  logIn: {
    paddingTop: Platform.OS !== "ios" ? 100 : 0,

    alignItems: "center",
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    fontSize: 12,
    color: "#000000",
    marginLeft: 5,
    fontWeight: "600",
  },
  Acceptbtn: {
    backgroundColor: "#2aaa46",
    padding: 10,
    width: "100%",
    textAlign: "center",
    borderRadius: 5,
    alignItems: "center",
  },
  form: {
    padding: 0,
    gap: 20,
    height: "100%",
    justifyContent: Platform.OS === "ios" ? "center" : null,
    display: "flex",
    alignItems: "center",
  },
  Input: {
    padding: 10,
    borderWidth: 0.9,
    borderColor: "#DDDDDD",
    borderRadius: 5,
    fontSize: 13,
    backgroundColor: "#fafafafa",
    color: "#717171",
    fontWeight: "600",
  },
  modal: {
    justifyContent: "center",
    margin: 0,
    padding: 30,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    paddingBottom: 50,
    borderRadius: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modal2: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent2: {
    backgroundColor: "#f4f4f4",
    padding: 10,

    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
