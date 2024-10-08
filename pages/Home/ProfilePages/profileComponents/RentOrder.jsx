import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/SimpleLineIcons";
import { Platform } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { addDotEveryThreeDigits } from "../../../../components/methods/merhod";
export default function RentOrder({
  id,
  display,
  title,
  checkIn,
  checkOut,
  price,
  status,
  address,
  totalPrice,
}) {
  const navigation = useNavigation();
  const months = [
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
  const checkInDateParts = checkIn.split("-");
  const checkOutDateParts = checkOut.split("-");

  const checkInDay = checkInDateParts[2];

  const checkInYear = checkInDateParts[0];
  const checkInMonth = months[parseInt(checkInDateParts[1], 10) - 1];
  const checkOutMonth = months[parseInt(checkOutDateParts[1], 10) - 1];
  const checkOutDay = checkOutDateParts[2];

  const checkOutYear = checkOutDateParts[0];
  const calculateDaysDifference = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the time difference
    const timeDifference = end.getTime() - start.getTime();

    // Convert time difference from milliseconds to days
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return daysDifference;
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainContent}>
        <View style={styles.image}>
          <Image
            source={require("../../../../assets/buyAndRentBg.png")}
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.content}>
          <View>
            <Text style={styles.name}>{title}</Text>
          </View>
          <View style={{ marginTop: 15 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 13, fontWeight: "400", opacity: "0.6" }}>
                {checkInDay}-{checkOutDay} {checkInMonth} {checkInYear}
              </Text>
            </View>
            <View style={{ flexDirection: "row", paddingVertical: 5 }}>
              <Icon
                name="wallet"
                size={17}
                color="#EA2B2E"
                style={{ paddingRight: 6 }}
              />
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                {addDotEveryThreeDigits(totalPrice)} ₺ /
                <Text style={{ fontWeight: "400", opacity: "0.7" }}>
                  {" "}
                  {calculateDaysDifference(checkIn, checkOut)} Gece
                </Text>
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.btn}>
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontWeight: "600",
              }}
            >
              Tekrar Rezervasyon Yap
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,

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
  mainContent: {
    padding: 10,
    flexDirection: "row",
  },
  image: {
    backgroundColor: "#fff",
    width: 130,
    height: 130,
    borderRadius: 10,
  },
  content: { flex: 1, marginLeft: 10, justifyContent: "space-between" },
  name: {
    flex: 1,
    flexDirection: "flex-start",
    fontSize: 17,
    fontWeight: "600",
  },
  btn: {
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#EA2B2E",
  },
});
