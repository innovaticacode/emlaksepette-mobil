import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
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

  const SettingItem = ({ text, tab }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Upgrade", { name: text, tab: tab });
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
    <View style={styles.container}>
      {user.type == 1 && (
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
              Hesabım
            </Text>
          </View>
          <View style={{ gap: 10, paddingBottom: 5 }}>
            <SettingItem text={"Kişisel Bilgilerim"} tab={0} />
            <SettingItem text={"Cep Telefonu"} tab={1} />
          </View>
        </View>
      )}
      {user.type == 2 && (
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
            <SettingItem text={"Kişisel Bilgilerim"} tab={2} />
            <SettingItem text={"Cep Telefonu Güncelle"} tab={1} />
            <SettingItem text={"Firma Konumu Güncelle"} tab={3} />
            
          </View>
        </View>
      )}
    </View>
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
