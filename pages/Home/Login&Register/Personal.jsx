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
} from "react-native";
import { React, useState, useRef } from "react";
import EyeIcon from "react-native-vector-icons/Ionicons";
import { CheckBox } from "@rneui/themed";
import Modal from "react-native-modal";
import MailCheck from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import HTML from "react-native-render-html";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { ActivityIndicator } from "react-native-paper";
import {
  AlertNotificationRoot,
  Dialog,
  ALERT_TYPE,
} from "react-native-alert-notification";
import { apiUrl } from "../../../components/methods/apiRequest";
import { sanitizeEmail } from "../../../utils";
import ContratsActionSheet from "../../../components/ContratsModal/ContratsActionSheet";
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

  const [sendSuccesMessageToLogin, setsendSuccesMessageToLogin] =
    useState(false);
  const [SuccessModal, setSuccessModal] = useState(false);

  const [Errors, setErrors] = useState({
    emailErr: null,
    passwordErr: null,
    mobilePhoneErr: null,
    userNameErr: null,
  });
  const setData = (key, value) => {
    setErrors((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const handleEpostaChange = (value) => {
    const filteredValue = sanitizeEmail(value);
    setePosta(filteredValue);
  };

  const postData = async () => {
    setIsloading(true);
    try {
      const data = {
        type: 1,
        name: name,
        email: ePosta,
        password: password,
        mobile_phone: phoneNumber,
        "check-a": checked,
        "check-b": checked1,
        "check-c": checked2,
        "check-e": checked3,
      };

      const response = await axios.post(apiUrl + "register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.status == true) {
        {
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
          navigation.replace("Login", { showAlert: true });
        }
      } else {
        seterrorStatu(5);
        seterrorMessage("Bir Hata Oluştu");
        setTimeout(() => {
          seterrorStatu(0);
        }, 5000);
      }
    } catch (error) {
      if (error.response.data.errors.email) {
        seterrorStatu(2);
        setData("emailErr", error.response.data.errors.email[0]);
        setTimeout(() => {
          setData("emailErr", null);
        }, 10000);
      }
      if (error.response.data.errors.mobile_phone) {
        seterrorStatu(3);
        setData("passwordErr", error.response.data.errors.mobile_phone[0]);
        setTimeout(() => {
          setData("passwordErr", null);
        }, 5000);
      }
      if (error.response.data.errors.password) {
        seterrorStatu(4);
        setData("mobilePhoneErr", error.response.data.errors.password[0]);
        setTimeout(() => {
          setData("mobilePhoneErr", null);
        }, 5000);
      }
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
        setData("userNameErr", "İsim Alanı Boş Bırakılmaz");

        setTimeout(() => {
          setData("userNameErr", null);
        }, 1000);
        break;
      case !ePosta:
        seterrorStatu(2);
        setData("emailErr", "Email alanı Boş Bırakılmaz");

        setTimeout(() => {
          setData("emailErr", null);
        }, 1000);
        break;
      case !phoneNumber:
        seterrorStatu(3);
        setData("mobilePhoneErr", "Telefon Alanı Boş Bırakılmaz");

        setTimeout(() => {
          setData("mobilePhoneErr", null);
        }, 1000);
        break;
      case !password:
        seterrorStatu(4);
        setData("passwordErr", "Şifre Alanı Boş Bırakılamaz");

        setTimeout(() => {
          setData("passwordErr", null);
        }, 1000);
        break;

      case !checked || !checked1 || !checked2:
        seterrorStatu(5);
        seterrorMessage("Sözleşmeleri Onaylamayı Unutmayın");
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

  const fetchData = async (deal) => {
    const url = `${apiUrl}sayfa/${deal}`;
    try {
      const data = await fetchFromURL(url);
      setDeals(data.content);
      // Burada isteğin başarılı olduğunda yapılacak işlemleri gerçekleştirebilirsiniz.
    } catch (error) {
      console.error("İstek hatası:", error);
      // Burada isteğin başarısız olduğunda yapılacak işlemleri gerçekleştirebilirsiniz.
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
    setphoneNumber(formattedPhoneNumber);
  };

  const handleCheckboxChange = (checked, setChecked, isVisible, deal) => {
    if (checked) {
      setChecked(false);
    } else {
      setModalVisible(true);
      if (deal) {
        setselectedUrl(deal);
      }
    }
  };
  const [passControl, setpassControl] = useState(false);
  const [showLengthAlert, setShowLengthAlert] = useState(false);
  const [showUpperAlert, setShowUpperAlert] = useState(false);
  const [showSymbolAlert, setShowSymbolAlert] = useState(false);
  const [showNumberAlert, setShowNumberAlert] = useState(false);
  const [colorForLength, setcolorForLength] = useState(false);
  const [colorForNumberAlert, setcolorForNumberAlert] = useState(false);
  const [colorForUpper, setcolorForUpper] = useState(false);
  const [colorForSymbol, setcolorForSymbol] = useState(false);
  const handlePasswordChange = (text) => {
    setpassword(text);
    // Şifre uzunluğunu kontrol edin ve uyarıyı göstermek/gizlemek için durumu güncelleyin

    if (text.length + 1 <= 8) {
      setShowLengthAlert(true);
      setcolorForLength(false);
    } else {
      setcolorForLength(true);
    }

    //rakam kontrölü
    const numberRegex = /[0-9]/;
    if (!numberRegex.test(text)) {
      setShowNumberAlert(true);
      setcolorForNumberAlert(false);
    } else {
      setcolorForNumberAlert(true);
    }
    //Büyük harf kontrolü
    const upperCaseRegex = /[A-Z]/;
    if (!upperCaseRegex.test(text)) {
      setShowUpperAlert(true);
      setcolorForUpper(false);
    } else {
      setcolorForUpper(true);
    }
    // Sembole kontrolü
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!symbolRegex.test(text)) {
      setShowSymbolAlert(true);
      setcolorForSymbol(false);
    } else {
      setcolorForSymbol(true);
    }
  };
  console.log("------> ", Errors.emailErr);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedUrl, setselectedUrl] = useState(null);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        onScroll={() => Keyboard.dismiss()}
        scrollEventThrottle={16}
      >
        <View style={{ padding: 15, gap: 20 }}>
          <View style={{ gap: 5 }}>
            <View style={{ paddingLeft: 5 }}>
              <Text style={{ fontSize: 14, color: "black", fontWeight: 600 }}>
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
              placeholder="İsim Soyisim"
            />
            {Errors.userNameErr ? (
              <Text style={{ color: "#EA2B2E", fontSize: 12 }}>
                {Errors.userNameErr}
              </Text>
            ) : null}
          </View>

          <View style={{ gap: 5 }}>
            <View style={{ paddingLeft: 5 }}>
              <Text style={{ fontSize: 14, color: "black", fontWeight: 600 }}>
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
              onChangeText={handleEpostaChange}
              placeholder="E-Posta Adresi"
              autoCapitalize="none" // İlk harfin büyük olmasını engeller
            />
            {Errors.emailErr ? (
              <Text style={{ color: "#EA2B2E", fontSize: 12 }}>
                {Errors.emailErr}
              </Text>
            ) : null}
          </View>

          <View style={{ gap: 5 }}>
            <View style={{ paddingLeft: 5 }}>
              <Text style={{ fontSize: 14, color: "black", fontWeight: 600 }}>
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
              onChangeText={handlePhoneNumberChange}
              placeholder="5*********"
              keyboardType="number-pad"
              maxLength={15}
            />
            {Errors.mobilePhoneErr ? (
              <Text style={{ color: "#EA2B2E", fontSize: 12 }}>
                {Errors.mobilePhoneErr}
              </Text>
            ) : null}
          </View>
          <View style={{ gap: 5 }}>
            <View style={{ paddingLeft: 5 }}>
              <Text style={{ fontSize: 14, color: "black", fontWeight: 600 }}>
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
                onChangeText={(value) => handlePasswordChange(value)}
                placeholder="Şifre"
                secureTextEntry={Show ? false : true}
                autoCapitalize="none" // İlk harfin büyük olmasını engeller
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 9,
                  top: "21%",
                }}
                onPress={show}
              >
                <EyeIcon
                  name={Show ? "eye" : "eye-off-sharp"}
                  size={23}
                  color={"#333"}
                />
              </TouchableOpacity>
            </View>
            <View style={{ paddingTop: 5, gap: 5 }}>
              {passControl && (
                <Text
                  style={{
                    color: "red",
                    fontWeight: "500",
                    fontSize: 12,
                  }}
                >
                  Lütfen Şifrenizi girin!
                </Text>
              )}
              {showLengthAlert && (
                <Text style={{ color: colorForLength ? "green" : "red" }}>
                  Şifreniz en az 8 karakter olmalıdır!
                </Text>
              )}
              {showNumberAlert && (
                <Text style={{ color: colorForNumberAlert ? "green" : "red" }}>
                  Şifrenizde en az bir rakam olmalıdır.
                </Text>
              )}
              {showUpperAlert && (
                <Text style={{ color: colorForUpper ? "green" : "red" }}>
                  Şifrenizde en az bir büyük harf olmalıdır!
                </Text>
              )}
              {showSymbolAlert && (
                <Text style={{ color: colorForSymbol ? "green" : "red" }}>
                  Şifrenizde en az bir özel karakter olmalıdır!
                </Text>
              )}
            </View>
            {Errors.passwordErr ? (
              <Text style={{ color: "#EA2B2E", fontSize: 12 }}>
                {Errors.passwordErr}
              </Text>
            ) : null}
          </View>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => {
                setChecked(!checked);
              }}
              style={styles.checkboxContainer}
            >
              {checked ? (
                <FontAwesome5Icon name="check-square" size={18} color="black" />
              ) : (
                <FontAwesome5Icon name="square" size={18} color="black" />
              )}
              <Text
                style={[
                  styles.checkboxLabel,
                  { color: errorStatu === 5 ? "red" : "black" },
                ]}
              >
                <Text
                  onPress={() => {
                    setIsVisible(true);
                    setselectedUrl("bireysel-uyelik-sozlesmesi");
                  }}
                  style={{
                    color: errorStatu === 5 ? "red" : "#027BFF",
                    fontSize: 13,
                  }}
                >
                  Bireysel üyelik sözleşmesini
                </Text>{" "}
                okudum onaylıyorum
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setChecked1(!checked1);
              }}
              style={styles.checkboxContainer}
            >
              {checked1 ? (
                <FontAwesome5Icon name="check-square" size={18} color="black" />
              ) : (
                <FontAwesome5Icon name="square" size={18} color="black" />
              )}
              <Text
                style={[
                  styles.checkboxLabel,
                  { color: errorStatu === 5 ? "red" : "black" },
                ]}
              >
                <Text
                  onPress={() => {
                    setselectedUrl(
                      "kisisel-verilerin-korunmasi-ve-islenmesi-politikasi"
                    );
                    setIsVisible(true);
                  }}
                  style={{
                    color: errorStatu === 5 ? "red" : "#027BFF",
                    fontSize: 13,
                  }}
                >
                  KVKK metnini
                </Text>{" "}
                okudum onaylıyorum
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setChecked2(!checked2);
              }}
              style={styles.checkboxContainer}
            >
              {checked2 ? (
                <FontAwesome5Icon name="check-square" size={18} color="black" />
              ) : (
                <FontAwesome5Icon name="square" size={18} color="black" />
              )}
              <Text
                style={[
                  styles.checkboxLabel,
                  { color: errorStatu === 5 ? "red" : "black" },
                ]}
              >
                <Text
                  onPress={() => {
                    setIsVisible(true);
                    setselectedUrl("gizlilik-sozlesmesi");
                  }}
                  style={{
                    color: errorStatu === 5 ? "red" : "#027BFF",
                    fontSize: 13,
                  }}
                >
                  Gizlilik sözleşmesi ve aydınlatma metnini
                </Text>{" "}
                okudum onaylıyorum
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={toggleCheked3}
              style={styles.checkboxContainer}
            >
              {checked3 ? (
                <FontAwesome5Icon name="check-square" size={18} color="black" />
              ) : (
                <FontAwesome5Icon name="square" size={18} color="black" />
              )}
              <Text style={styles.checkboxLabel}>
                İletişim bilgilerime kampanya, tanıtım ve reklam içerikli ticari
                elektronik ileti gönderilmesine, bu amaçla kişisel verilerimin
                “Emlaksepette” tarafından işlenmesine ve tedarikçileri ve
                işbirlikçileri ile paylaşılmasına, bu amaçlarla verilerimin yurt
                dışına aktarılmasına izin veriyorum.
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#E54242",
                padding: 9,
                borderRadius: 5,
                width: "100%",
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
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    Okudum kabul ediyorum
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
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    Okudum kabul ediyorum
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
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    Okudum kabul ediyorum
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
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
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
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
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
            <ActivityIndicator size="large" color="#333" />
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              Üyeliğiniz Oluşturuluyor
            </Text>
          </View>
        </Modal>
        <Modal
          isVisible={SuccessModal}
          animationIn={"fadeIn"}
          animationOut={"fadeOut"}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <View>
              <Text>Üyeliğiniz Başarı İle Oluşturuldu</Text>
            </View>
          </View>
        </Modal>
        <ContratsActionSheet
          isVisibleOpen={isVisible}
          setIsVisible={setIsVisible}
          url={selectedUrl}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  Input: {
    padding: 9,
    borderWidth: 1,
    borderColor: "#ebebeb",
    borderRadius: 5,
    fontSize: 13,
    backgroundColor: "#FAFAFA",
    color: "#717171",
    fontWeight: "600",
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
    width: "100%",
    textAlign: "center",
    borderRadius: 5,
    alignItems: "center",
  },

  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 13,
    flex: 1,
    marginLeft: 5,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxInner: {
    width: 18,
    height: 18,
    backgroundColor: "#E54242",
  },
});
