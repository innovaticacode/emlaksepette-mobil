import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  TouchableOpacity,
  Switch,
  Modal,
  Touchable,
} from "react-native";
import { Platform } from "react-native";
import { useState, useRef, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native";
import UserTypes from "./profileComponents/UserTypes";
import Icon from "react-native-vector-icons/MaterialIcons";
import ModalEdit from "react-native-modal";
import DotIcon from "react-native-vector-icons/Entypo";
import RNPickerSelect from "react-native-picker-select";
import { getValueFor } from "../../../components/methods/user";
import axios from "axios";
export default function CreateUser() {
  const route = useRoute();
  const navigation = useNavigation();

  const [display, setdisplay] = useState(false);
  const translateY = useRef(new Animated.Value(400)).current;

  const [UserTypeValue, setUserTypeValue] = useState("");
  const [isSelected, setisSelected] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    setisActive(isEnabled ? 0 : 1);
  };
  const [isShowSheet, setisShowSheet] = useState(false);
  const [isShowText, setisShowText] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);

  const [roles, setroles] = useState([]);

  const fetchData = async () => {
    try {
      if (user?.access_token) {
        const response = await axios.get(
          `https://emlaksepette.com/api/institutional/roles`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );

        // Dönüştürülmüş veriyi state'e atama
        setroles(response.data.roles);
      }
    } catch (error) {
      console.error("Veri getirme hatası:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const roleItems = roles.map((role) => ({
    label: role.name,
    value: role.id.toString(), // ID'yi string olarak belirtmek önemlidir.
  }));
  // roles state'i güncellendikten sonra yazdırılmalı

  const [message, setmessage] = useState({});
  const [nameAndSurname, setnameAndSurname] = useState("");
  const [title, settitle] = useState("");
  const [email, setemail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setpassword] = useState("");
  const [UserType, setUserType] = useState(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isActive, setisActive] = useState(1);
  const [Succesalert, setSuccesalert] = useState(false);
  const [errorMessage, seterrorMessage] = useState([]);
  const createUser = async () => {
    let formdata = new FormData();
    formdata.append("name", nameAndSurname);
    formdata.append("title", title);
    formdata.append("email", email);
    formdata.append("mobile_phone", phoneNumber);
    formdata.append("password", password);
    formdata.append("type", UserType);

    try {
      if (user?.access_token) {
        const response = await axios.post(
          `https://emlaksepette.com/api/institutional/users`,
          formdata,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        // seterrorMessage(response.data.success,'fsdfdfds')
        // setSuccesalert(true)
        // setTimeout(() => {
        //     setSuccesalert(false)
        // }, 2000);
        setnameAndSurname("");
        setemail("");
        setpassword("");
        settitle("");
        setphoneNumber("");
        setUserType("");
        setmessage(response.data.message);

        // Dönüştürülmüş veriyi state'e atama
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={style.container}>
        <View style={[style.Form]}>
          <View style={style.Inputs}>
            <View>
              <Text style={style.Label}>İsim Soyisim</Text>
              <TextInput
                style={style.Input}
                value={nameAndSurname}
                onChangeText={(value) => setnameAndSurname(value)}
              />
            </View>
            <View>
              <Text style={style.Label}>Unvan</Text>
              <TextInput
                style={style.Input}
                value={title}
                onChangeText={(value) => settitle(value)}
              />
            </View>
            <View>
              <Text style={style.Label}>Email</Text>
              <TextInput
                style={style.Input}
                value={email}
                onChangeText={(value) => setemail(value)}
              />
            </View>
            <View>
              <Text style={style.Label}>Cep No</Text>
              <TextInput
                style={style.Input}
                value={phoneNumber}
                onChangeText={(value) => setphoneNumber(value)}
              />
            </View>
            <View>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Text style={style.Label}>Şifre</Text>
              </View>

              <TextInput
                style={style.Input}
                value={password}
                onChangeText={(value) => setpassword(value)}
              />
            </View>
            <View>
              <Text style={style.Label}>Kullanıcı Tipi</Text>
              <RNPickerSelect
                doneText="Tamam"
                value={UserType}
                placeholder={{
                  label: "Seçiniz...",
                  value: null,
                }}
                style={pickerSelectStyles}
                onValueChange={(value) => setUserType(value)}
                items={roleItems}
              />
            </View>
          </View>
          <View style={{ width: "100%", alignItems: "center" }}>
            <TouchableOpacity
              onPress={createUser}
              style={{
                backgroundColor: "#EA2A29",
                padding: 13,
                width: "50%",
                borderRadius: 5,
              }}
            >
              <Text
                style={[
                  style.label2,
                  { color: "white", textAlign: "center", fontSize: 16 },
                ]}
              >
                Kaydet
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/**/}
        <ModalEdit
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          swipeDirection={["down"]}
          onSwipeComplete={() => setModalVisible(false)}
          backdropColor="transparent"
          style={style.modal3}
        >
          <View style={[style.modalContent3, { gap: 10 }]}>
            <View style={{ alignItems: "center", paddingTop: 15 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#bdc6cf",
                  padding: 4,
                  width: "15%",
                  borderRadius: 20,
                }}
              />
            </View>
            <View style={{ gap: 10, padding: 10 }}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: "#EA2A28",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "white" }}>Kullanıcıyı Sil</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: "#79ad69",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "white" }}>Kullanıcıyı Düzenle</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ModalEdit>
        <ModalEdit
          isVisible={Succesalert}
          animationIn={"zoomInUp"}
          animationOut={"zoomOutUp"}
          onBackdropPress={() => setSuccesalert(false)}
          swipeDirection={["down"]}
          onSwipeComplete={() => setSuccesalert(false)}
          backdropColor="transparent"
          style={style.modal4}
        >
          <View style={[style.modalContent4, { gap: 10 }]}>
            <View style={{ alignItems: "center", padding: 15 }}>
              <Icon name="check-circle" size={35} color={"green"} />
            </View>
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                Kullanıcı oluşturuldu
              </Text>
            </View>
          </View>
        </ModalEdit>
      </View>
    </TouchableWithoutFeedback>
  );
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#ebebeb",
    borderRadius: 5,
    padding: 9,
    fontSize: 14, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#bdc6cf",
    borderRadius: 5,
    padding: 9,
    fontSize: 14, // to ensure the text is never behind the icon
  },
});
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  Form: {
    width: "100%",
    padding: 2,
  },
  Inputs: {
    gap: 20,
    padding: 20,
  },
  Input: {
    padding: 9,
    backgroundColor: "transparent",
    borderRadius: 5,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#ebebeb",
  },
  Label: {
    fontSize: 14,
    bottom: 3,
    left: 6,
    fontWeight: "300",
    letterSpacing: 0.5,
  },
  bottomSheetItem: {
    width: "100%",
    padding: 5,
  },
  animatedView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#FFFF",
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
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 20,
  },
  label2: {
    fontSize: 14,

    fontWeight: "300",
    letterSpacing: 0.5,
  },
  card: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "90%",
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    gap: 10,

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
  profileImage: {
    width: 60,
    height: 60,
    backgroundColor: "red",

    alignItems: "center",
    justifyContent: "center",
  },
  profileName: {
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
  modalView: {
    width: "70%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    gap: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  Btn: {
    backgroundColor: "#E54242",
    paddingLeft: 20,
    paddingRight: 20,
    padding: 8,
    justifyContent: "center",
    borderRadius: 5,
  },
  btnText: {
    color: "white",

    letterSpacing: 0.5,
  },
  modal3: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent3: {
    backgroundColor: "#f5f5f7",

    height: "30%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modal4: {
    backgroundColor: "#14141497",
    justifyContent: "center",
    margin: 0,
  },
  modalContent4: {
    backgroundColor: "#ffffff",
    margin: 10,
    borderRadius: 5,
    height: "15%",
  },
});
