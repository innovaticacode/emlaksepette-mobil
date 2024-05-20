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
import Warning from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";

export default function Order({ item }) {
  const date = new Date(item.created_at);
  // Ay isimleri dizisi
  const monthNames = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];
  // Günü, ay ismini ve yılı al
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;

  const cartString = `${item.cart}`;
  // JSON stringini nesneye dönüştür
  const cartObject = JSON.parse(cartString);
  // Image URL'sine eriş
  const imageUrl = cartObject.item.image;
  console.log(imageUrl);

  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("OrderDetail", {})}>
      <View style={style.container}>
        <View style={style.InfoDateButton}>
          <View style={style.Info}>
            <Text> {formattedDate} </Text>
            <View style={{ flexDirection: "row" }}>
              <Text>Toplam: </Text>
              <Text style={{ color: "green" }}> {item.amount} ₺ </Text>
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
              {item.status == 0 && (
                <FeatherIcon name="clock" color={"#F28907"} />
              )}
              {item.status == 1 && <FeatherIcon name="check" color={"green"} />}
              {item.status == 2 && <FeatherIcon name="warning" color={"red"} />}
              {item.status == 0 && (
                <Text style={{ color: "#F28907", fontSize: 13 }}>
                  {" "}
                  Onay bekliyor{" "}
                </Text>
              )}
              {item.status == 1 && (
                <Text style={{ color: "green", fontSize: 13 }}>
                  {" "}
                  Onaylandı{" "}
                </Text>
              )}
              {item.status == 2 && (
                <Text style={{ color: "red", fontSize: 13 }}>
                  {" "}
                  Onaylanmadı{" "}
                </Text>
              )}
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
                source={{ uri: imageUrl }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </View>
            {item.status == 0 && (
              <Text style={{ color: "#F28907", fontSize: 12 }}>
                1 Ürün Onayda
              </Text>
            )}
            {item.status == 1 && (
              <Text style={{ color: "green", fontSize: 12 }}>
                1 Ürün Onaylandı
              </Text>
            )}
            {item.status == 2 && (
              <Text style={{ color: "red", fontSize: 12 }}>
                1 Ürün Reddedildi
              </Text>
            )}
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
