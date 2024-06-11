import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { React, useState, useRef } from "react";
import EyeIcon from "react-native-vector-icons/Ionicons";
import { CheckBox } from "@rneui/themed";
import Modal from "react-native-modal";
import MailCheck from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import HTML from "react-native-render-html";
import { useNavigation } from "@react-navigation/native";
export default function Personal({ type }) {
  const navigation = useNavigation();
  const [eye, seteye] = useState("eye-off-sharp");
  const [Show, setShow] = useState(false);
  const show = () => {
    setShow(!Show);
  };
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const toggleCheked = () => setChecked(!checked);
  const toggleCheked1 = () => setChecked1(!checked1);
  const toggleCheked2 = () => setChecked2(!checked2);
  const toggleCheked3 = () => setChecked3(!checked3);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [Deals, setDeals] = useState("");

  const GetDeal = (deal) => {
    // setDeals(deal)
    fetchData(deal);
  };
  const [succesRegister, setsuccesRegister] = useState(false);
  const [showMailSendAlert, setshowMailSendAlert] = useState(false);
  const [name, setname] = useState("");
  const [ePosta, setePosta] = useState("");
  const [password, setpassword] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [message, setmessage] = useState("");
  const [Isloading, setIsloading] = useState(false);
  
const [sendSuccesMessageToLogin, setsendSuccesMessageToLogin] = useState(false)
  const postData = async () => {
    setIsloading(true);
    try {
      var formData = new FormData();
      formData.append("type", 1);
      formData.append("name", name);
      formData.append("email", ePosta);
      formData.append("password", password);
      formData.append("mobile_phone", phoneNumber);
      formData.append("check-a", checked);
      formData.append("check-b", checked1);
      formData.append("check-c", checked2);
      formData.append("check-e", checked3);
      const response = await axios.post(
        "https://mobil.emlaksepette.com/api/register",
        formData
      );

      // İsteğin başarılı bir şekilde tamamlandığı durum
      console.log("İstek başarıyla tamamlandı:", response.data);
      setmessage(response.data.message);
      navigation.navigate("Login",{showAlert:true ,message:message});
      setname("");
      setePosta("");
      setpassword("");
      setphoneNumber("");
      setChecked(false);
      setChecked1(false);
      setChecked2(false);
      setChecked3(false);
      seterrorStatu(0);
      seterrorMessage("");
    } catch (error) {
      // Hata durumunda

      if (
        error.response &&
        error.response.data &&
        error.response.data.errors &&
        error.response.data.errors.email
      ) {
        const errorMessage = error.response.data.errors.email[0];
        console.log("API Hatası:", errorMessage);
        seterrorStatu(2);
        seterrorMessage(errorMessage);
      } else {
        console.error("Beklenmeyen bir hata oluştu:", error);
      }

      console.error("Beklenmeyen bir hata oluştu:", error);
    } finally {
      setIsloading(false);
     
    }
  };
  const [errorStatu, seterrorStatu] = useState(0);
  const [errorMessage, seterrorMessage] = useState("");

  const registerPersonal = () => {
    let ErrorMessage = "";

    switch (true) {
      case !name:
        seterrorStatu(1);
        seterrorMessage("İsim Alanı Boş Bırakılmaz");
        setTimeout(() => {
          // seterrorStatu(0)
        }, 1000);
        break;
      case !ePosta:
        seterrorStatu(2);
        seterrorMessage("Email alanı Boş Bırakılmaz");
        setTimeout(() => {
          seterrorStatu(0);
        }, 1000);
        break;
      case !phoneNumber:
        seterrorStatu(3);
        seterrorMessage("Telefon Alanı Boş Bırakılmaz");
        setTimeout(() => {
          seterrorStatu(0);
        }, 1000);
        break;
      case !password:
        seterrorStatu(4);
        seterrorMessage("Şifre Alanı Boş Bırakılamaz");
        setTimeout(() => {
          seterrorStatu(0);
        }, 1000);
        break;

      case !checked || !checked1 || !checked2:
        seterrorStatu(5);
        seterrorMessage("Sözleşmeleri Onaylamayı Unutmayın");
        setTimeout(() => {
          seterrorStatu(0);
        }, 1000);
        break;
      case password.length < 6:
        seterrorStatu(6);
        seterrorMessage("Şifreniz En Az 6 Karakter Olmalıdır");
        setTimeout(() => {
          seterrorStatu(0);
        }, 1000);
        break;
      default:
        postData();
    }

    if (ErrorMessage) {
      ShowAlert(ErrorMessage);
    }
  };

  const [alertMessage, setalertMessage] = useState("");
  const ShowAlert = (alert) => {
    setalertMessage(alert);
    setshowMailSendAlert(true);
  };

  const fetchFromURL = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Örnek kullanım

  const fetchData = async (deal) => {
    const url = `https://mobil.emlaksepette.com/api/sayfa/${deal}`;
    try {
      const data = await fetchFromURL(url);
      setDeals(data.content);
      // Burada isteğin başarılı olduğunda yapılacak işlemleri gerçekleştirebilirsiniz.
    } catch (error) {
      console.error("İstek hatası:", error);
      // Burada isteğin başarısız olduğunda yapılacak işlemleri gerçekleştirebilirsiniz.
    }
  };

  // Fonksiyonu çağırarak isteği gerçekleştirin

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} onScroll={()=>Keyboard.dismiss()} scrollEventThrottle={16}>
          <View style={{ padding: 15, gap: 20 }}>
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                  İsim
                </Text>
              </View>

              <TextInput
                style={[
                  styles.Input,
                  {
                    borderColor: errorStatu === 1 ? "#E54242" : "#ebebeb",
                  },
                ]}
                value={name}
                onChangeText={(value) => setname(value)}
                placeholder="Adınızı Giriniz..."
              />
              {errorStatu == 1 ? (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errorMessage}
                </Text>
              ) : (
                ""
              )}
            </View>

            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                  E-Posta
                </Text>
              </View>
              <TextInput
                style={[
                  styles.Input,
                  {
                    borderColor: errorStatu === 2 ? "#E54242" : "#ebebeb",
                  },
                ]}
                value={ePosta}
                onChangeText={(value) => setePosta(value)}
                placeholder="example@gmail.com"
              />
              {errorStatu == 2 ? (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errorMessage}
                </Text>
              ) : (
                ""
              )}
            </View>

            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                  Cep Telefonu
                </Text>
              </View>
              <TextInput
                style={[
                  styles.Input,
                  {
                    borderColor: errorStatu === 3 ? "#E54242" : "#ebebeb",
                  },
                ]}
                value={phoneNumber}
                onChangeText={(value) => setphoneNumber(value)}
                placeholder="5555555555"
                keyboardType="number-pad"
              />
              {errorStatu == 3 ? (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errorMessage}
                </Text>
              ) : (
                ""
              )}
            </View>
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                  Şifre
                </Text>
              </View>
              <View>
                <TextInput
                  style={[
                    styles.Input,
                    {
                      borderColor: errorStatu === 4 ? "#E54242" : "#ebebeb",
                    },
                  ]}
                  value={password}
                  onChangeText={(value) => setpassword(value)}
                  placeholder="*********"
                  secureTextEntry={Show ? false : true}
                />
                <TouchableOpacity
                  style={{ position: "absolute", right: 10, bottom: 9 }}
                  onPress={show}
                >
                  <EyeIcon
                    name={Show ? "eye" : "eye-off-sharp"}
                    size={20}
                    color={"#333"}
                  />
                </TouchableOpacity>
              </View>
              {errorStatu == 4 ? (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errorMessage}
                </Text>
              ) : (
                ""
              )}
              {errorStatu == 6 ? (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errorMessage}
                </Text>
              ) : (
                ""
              )}
            </View>

            <View>
              <CheckBox
                checked={checked}
                onPress={() => {
                  GetDeal("bireysel-uyelik-sozlesmesi");

                  checked ? setModalVisible(false) : setModalVisible(true);
                  setChecked(false);
                }}
                // Use ThemeProvider to make change for all checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="#E54242"
                title={
                  <Text style={{ color: errorStatu === 5 ? "red" : "black" }}>
                    <Text
                      style={{
                        color: errorStatu === 5 ? "red" : "#027BFF",
                        fontSize: 13,
                      }}
                    >
                      {" "}
                      Bireysel üyelik sözleşmesini
                    </Text>
                    <Text style={{ fontSize: 13 }}> okudum onaylıyorum</Text>
                  </Text>
                }
                textStyle={{ fontSize: 13, fontWeight: 400 }}
                size={22}
                containerStyle={{ padding: 0, width: "100%" }}
              />
              <CheckBox
                checked={checked1}
                onPress={() => {
                  GetDeal("kvkk-politikasi");
                  checked1 ? setModalVisible2(false) : setModalVisible2(true);
                  setChecked1(false);
                }}
                // Use ThemeProvider to make change for all checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="#E54242"
                title={
                  <Text style={{ color: errorStatu === 5 ? "red" : "black" }}>
                    <Text
                      style={{
                        color: errorStatu === 5 ? "red" : "#027BFF",
                        fontSize: 13,
                      }}
                    >
                      {" "}
                      Kvkk metnini
                    </Text>
                    <Text style={{ fontSize: 13 }}> okudum onaylıyorum</Text>
                  </Text>
                }
                textStyle={{ fontSize: 13, fontWeight: 400 }}
                size={22}
                containerStyle={{ padding: 1 }}
              />
              <CheckBox
                checked={checked2}
                onPress={() => {
                  GetDeal("gizlilik-sozlesmesi-ve-aydinlatma-metni");
                  checked2 ? setModalVisible3(false) : setModalVisible3(true);
                  setChecked2(false);
                }}
                // Use ThemeProvider to make change for all checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="#E54242"
                title={
                  <View style={{ paddingLeft: 5 }}>
                    <Text style={{ color: errorStatu === 5 ? "red" : "black" }}>
                      <Text
                        style={{
                          color: errorStatu === 5 ? "red" : "#027BFF",
                          fontSize: 13,
                        }}
                      >
                        Gizlilik sözleşmesi ve aydınlatma metnini
                      </Text>
                      <Text style={{ fontSize: 13 }}> okudum onaylıyorum</Text>
                    </Text>
                  </View>
                }
                textStyle={{ fontSize: 13, fontWeight: 400 }}
                size={22}
                containerStyle={{ padding: 1 }}
              />
              <CheckBox
                checked={checked3}
                onPress={toggleCheked3}
                // Use ThemeProvider to make change for all checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="#E54242"
                title={
                  <View style={{ paddingLeft: 5 }}>
                    <Text>
                      Tarafıma elektronik ileti gönderilmesini kabul ediyorum.
                    </Text>
                  </View>
                }
                textStyle={{ fontSize: 13, fontWeight: 400 }}
                size={22}
                containerStyle={{ padding: 1 }}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#E54242",
                  padding: 9,
                  borderRadius: 5,
                  width: "90%",
                }}
                onPress={registerPersonal}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  Üye Ol
                </Text>
              </TouchableOpacity>
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
              <ScrollView
                style={{ padding: 10 }}
                contentContainerStyle={{ gap: 20 }}
              >
                {/* <Text>
          
            </Text> */}
                <HTML source={{ html: Deals }} contentWidth={100} />

                <View style={{ alignItems: "center", paddingBottom: 25 }}>
                  <TouchableOpacity
                    style={styles.Acceptbtn}
                    onPress={() => {
                      setChecked(!checked);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      Okudum Kabul ediyorum
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </SafeAreaView>
          </Modal>
          <Modal
            isVisible={modalVisible2}
            onBackdropPress={() => setModalVisible2(false)}
            backdropColor="transparent"
            animationIn={"fadeInRightBig"}
            animationOut={"fadeOutRightBig"}
            style={styles.modal2}
          >
            <SafeAreaView style={styles.modalContent2}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ padding: 10 }}
              >
                <HTML source={{ html: Deals }} contentWidth={100} />

                <View style={{ alignItems: "center", paddingBottom: 20 }}>
                  <TouchableOpacity
                    style={styles.Acceptbtn}
                    onPress={() => {
                      setChecked1(true);
                      setModalVisible2(false);
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      Okudum Kabul ediyorum
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </SafeAreaView>
          </Modal>
          <Modal
            isVisible={modalVisible3}
            onBackdropPress={() => setModalVisible3(false)}
            backdropColor="transparent"
            style={styles.modal2}
            animationIn={"fadeInRightBig"}
            animationOut={"fadeOutRightBig"}
          >
            <SafeAreaView style={styles.modalContent2}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ padding: 10 }}
              >
                <HTML source={{ html: Deals }} contentWidth={100} />

                <View style={{ alignItems: "center", paddingBottom: 50 }}>
                  <TouchableOpacity
                    style={styles.Acceptbtn}
                    onPress={() => {
                      setChecked2(true);
                      setModalVisible3(false);
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      Okudum Kabul ediyorum
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </SafeAreaView>
          </Modal>
          <Modal
            isVisible={succesRegister}
            animationIn={"fadeInRightBig"}
            animationOut={"fadeOutLeftBig"}
            style={styles.modal}
          >
            <View style={styles.modalContent}>
              <View style={{ gap: 10 }}>
                <View style={{ alignItems: "center" }}>
                  <View
                    style={{
                      backgroundColor: "#D4EDDA",
                      borderRadius: 40,
                      padding: 10,
                    }}
                  >
                    <MailCheck name="email-send" size={40} color={"#316D40"} />
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 15,
                      color: "#333",
                      letterSpacing: 0.5,
                    }}
                  >
                    {JSON.stringify(message)}
                  </Text>
                </View>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#316D40",
                      padding: 10,
                      width: "100%",
                      borderRadius: 5,
                    }}
                    onPress={() => setsuccesRegister(false)}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#D4EDDA",
                        fontWeight: 500,
                      }}
                    >
                      Tamam
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            isVisible={showMailSendAlert}
            animationIn={"fadeInRightBig"}
            animationOut={"fadeOutLeftBig"}
            style={styles.modal}
          >
            <View style={styles.modalContent}>
              <View style={{ gap: 10 }}>
                <View style={{ alignItems: "center" }}>
                  <View
                    style={{
                      backgroundColor: "#E54242",
                      borderRadius: 40,
                      padding: 6,
                    }}
                  >
                    <MailCheck name="close" size={40} color={"#fff"} />
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 15,
                      color: "#333",
                      letterSpacing: 0.5,
                    }}
                  >
                    {alertMessage}
                  </Text>
                </View>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#E54242",
                      padding: 10,
                      width: "100%",
                      borderRadius: 5,
                    }}
                    onPress={() => setshowMailSendAlert(false)}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#ffff",
                        fontWeight: 500,
                      }}
                    >
                      Tamam
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            isVisible={Isloading}
            animationIn={"fadeInRightBig"}
            animationOut={"fadeOutLeftBig"}
            style={styles.modal}
          >
            <View style={styles.modalContent}>
              <ActivityIndicator size="large" />
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                Giriş Sayfasına Yönlendiriliyorsunuz
              </Text>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  Input: {
    padding: 9,
    borderWidth: 1,
    borderColor: "#ebebeb",
    borderRadius: 5,
    backgroundColor: "#FAFAFA",
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
  modal: {
    justifyContent: "center",
    margin: 0,
    padding: 30,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,

    borderRadius: 5,
  },
  Acceptbtn: {
    backgroundColor: "#2aaa46",
    padding: 10,
    borderRadius: 5,
  },
});
