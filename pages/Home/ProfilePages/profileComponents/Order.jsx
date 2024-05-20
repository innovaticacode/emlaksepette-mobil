import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import StarIcon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { getValueFor } from "../../../../components/methods/user";

export default function Order({ display, text }) {
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const [İsLoggedIn, setisLoggedIn] = useState(true);

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("OrderDetail", { display, text })}
    >
      <View style={style.container}>
        <View style={style.InfoDateButton}>
          <View style={style.Info}>
            <Text>28 Şubat 2024</Text>
            <View style={{ flexDirection: "row" }}>
              <Text>Toplam: </Text>
              <Text style={{ color: "green" }}>2.500.000</Text>
            </View>
          </View>
          <View style={style.Button}>
            <Text style={{ color: "green", fontSize: 13 }}>Detaylar</Text>
            <Icon name="arrow-right" color={"green"} size={10} />
          </View>
        </View>

        <View style={style.PhotoAndComment}>
          <View
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <FeatherIcon name="check" color={"green"} />
              <Text style={{ color: "green", fontSize: 13 }}>Onaylandı</Text>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: "#ebebeb",
                  borderRadius: 4,
                  padding: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 7,
                }}
              >
                <StarIcon name="star" size={14} color={"green"} />
                <Text style={{ color: "#353030", fontSize: 12 }}>
                  Değerlendir
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ gap: 9 }}>
            <View style={{ height: 80, width: "24%" }}>
              <ImageBackground
                source={require("./home.jpg")}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </View>
            <Text style={{ color: "grey", fontSize: 12 }}>
              1 Ürün Teslim Edildi
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const style = StyleSheet.create({
  container: {
    width: "100%",

    padding: 2,
    borderWidth: 1.5,
    borderRadius: 5,
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
  },
  InfoDateButton: {
    borderBottomWidth: 1,
    borderBottomColor: "#ebebeb",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  PhotoAndComment: {
    padding: 10,
    display: "flex",
  },
  Info: {
    gap: 5,
  },
  Button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});
