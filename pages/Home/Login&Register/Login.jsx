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
} from "react-native";
import { React, useState } from "react";
import BackIcon from "react-native-vector-icons/AntDesign";
import EyeIcon from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import IconSocialMedia from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/Entypo";
import { CheckBox } from "react-native-elements";

export default function Login({ navigation }) {
  const [eye, seteye] = useState("eye-off-sharp");
  const [Show, setShow] = useState(false);
  const show = () => {
    setShow(!Show);
  };
  const [checked, setChecked] = useState(false);
  const toggleCheckbox = () => setChecked(!checked);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.logIn}>
          <KeyboardAwareScrollView>
            <View style={styles.form}>
              <View>
                <Text
                  style={{ color: "#17243e", fontSize: 20, fontWeight: "bold" }}
                >
                  Giriş Yap
                </Text>
              </View>

              <View style={{ gap: 10 }}>
                <View style={{ paddingLeft: 10 }}>
                  <Text
                    style={{ fontSize: 15, color: "grey", fontWeight: 600 }}
                  >
                    E-Mail
                  </Text>
                </View>

                <TextInput
                  style={styles.Input}
                  placeholder="example@gmail.com"
                />
              </View>
              <View style={{ gap: 10 }}>
                <View style={{ paddingLeft: 10 }}>
                  <Text
                    style={{ fontSize: 15, color: "grey", fontWeight: 600 }}
                  >
                    Şifre
                  </Text>
                </View>
                <View>
                  <TextInput
                    style={styles.Input}
                    placeholder="Şifrenizi Girin"
                    secureTextEntry={Show ? false : true}
                  />
                  <TouchableOpacity
                    style={{ position: "absolute", right: 10, bottom: 10 }}
                    onPress={show}
                  >
                    <EyeIcon
                      name={Show ? "eye" : "eye-off-sharp"}
                      size={20}
                      color={"#333"}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 15,
                  }}
                >
                  <View>
                    <CheckBox
                      checked={checked}
                      onPress={toggleCheckbox}
                      // Use ThemeProvider to make change for all checkbox
                      iconType="material-community"
                      checkedIcon="checkbox-marked"
                      uncheckedIcon="checkbox-blank-outline"
                      checkedColor="#EA2C2E"
                      title={"Beni Hatırla"}
                      textStyle={{ fontSize: 13, fontWeight: 400 }}
                      size={22}
                      containerStyle={{
                        padding: 0,
                        backgroundColor: "transparent",
                        borderWidth: 0,
                      }}
                    />
                  </View>
                  <TouchableOpacity style={{}}>
                    <Text
                      style={{
                        fontSize: 13,
                        letterSpacing: 0.5,
                        color: "#5D96F1",
                        textDecorationLine: "underline",
                      }}
                    >
                      Şifrenimi Unuttun?
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#EA2C2E",
                  padding: 8,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontWeight: "600",
                  }}
                >
                  Giriş Yap
                </Text>
              </TouchableOpacity>
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
                <Text>OR</Text>
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
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#EEF4FE",
                    padding: 5,
                    width: "40%",
                    height: 40,
                    borderRadius: 10,
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
                <TouchableOpacity
                  style={{
                    backgroundColor: "#EEF4FE",
                    padding: 5,
                    width: "40%",
                    height: 40,
                    borderRadius: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Icon
                    name="facebook-with-circle"
                    size={30}
                    color={"#1A77F3"}
                  />
                  <Text style={{ fontWeight: "bold", color: "#333" }}>
                    Facebook
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text style={{ textAlign: "center" }}>
                <Text style={{ fontSize: 13, color: "#333" }}>
                  Henüz Üye Değilmisiniz?{" "}
                </Text>

                <Text
                  style={{ fontWeight: "bold" }}
                  onPress={() => {
                    navigation.navigate("Register");
                  }}
                >
                  Üye Ol
                </Text>
              </Text>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flex: 0.2,
  },
  logIn: {
    backgroundColor: "#FFFFFF",
    flex: 1.8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "",
  },
  form: {
    padding: 40,
    gap: 20,
  },
  Input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ebebeb",
    borderRadius: 10,
    fontSize: 14,
  },
});
