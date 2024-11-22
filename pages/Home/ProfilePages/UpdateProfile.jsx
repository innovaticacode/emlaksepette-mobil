import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import userData, { getValueFor } from "../../../components/methods/user";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function UpdateProfile() {
  const [user, setUser] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    getValueFor('user', setUser)
  }, []);

  const SettingItem = ({ text, tab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (navigate) {
            navigation.navigate(navigate)
          } else {
            navigation.navigate("Upgrade", { name: text, tab: tab });
          }

        }}
        style={{
          borderColor: "#ebebeb",
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          paddingBottom: 4,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{}}>
          <Text style={{ color: "#333", fontWeight: "600", fontSize: 13 }}>
            {text}
          </Text>
        </View>
        <View>
          <Icon name="arrow-forward-ios" size={20} color={"#333"} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ gap: 10 }}>

      <View style={styles.card}>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#ebebeb",
            paddingTop: 15,
            paddingLeft: 15,
            paddingBottom: 10,
          }}
        >
          <Text style={{ color: "#333", fontSize: 16, fontWeight: "700" }}>
            Hesap Bigilerim
          </Text>
        </View>
        <View style={{ gap: 10, paddingBottom: 5 }}>
          <SettingItem text={"Kişisel Bilgilerim"} tab={0} />
          <SettingItem text={'E-Posta Bilgileri'} tab={1} />
          <SettingItem text={"Cep Telefonu"} tab={2} />
          <SettingItem text={"Şifre Değişikliği"} tab={3} navigate={'ChangePas'} />
        </View>
      </View>


      <View style={styles.card}>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#ebebeb",
            paddingTop: 15,
            paddingLeft: 15,
            paddingBottom: 10,
          }}
        >
          <Text style={{ color: "#333", fontSize: 16, fontWeight: "700" }}>
            Mağazam
          </Text>
        </View>
        <View style={{ gap: 10, paddingBottom: 5 }}>
          <SettingItem text={"Mağaza İçeriği"} tab={4} />
          <SettingItem text={"Mağaza Bilgileri"} tab={5} />
          <SettingItem text={"Ekip"} navigate={'UsersList'} />
          {/* <SettingItem text={"Paketler"} tab={7} /> */}
          {/* <SettingItem text={"Kayıtlı Kartlarım"} tab={8} /> */}
          {/* <SettingItem text={"Faturalarım"} tab={9} /> */}
          <SettingItem text={"Yetki Grubu"} navigate={'UserTypes'} />
          <SettingItem text={"Reklam Görselleri"} tab={11} navigate={'UploadAdsPicture'} />
          <SettingItem text={"Proje Sözleşmelerim"} tab={12} />
          <SettingItem text={'Tanıtım Yazısı Ekle'} navigate={'AddBioText'} />

        </View>
      </View>

    </ScrollView>
  );
}

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    gap: 10,
    padding: 10,
  },

  card: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 2,
    borderRadius: 6,
    width: "100%",

    marginTop: 5,
    borderWidth: 0,
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
});
