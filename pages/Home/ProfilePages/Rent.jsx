import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import RentOrder from "./profileComponents/RentOrder";
import Icon from "react-native-vector-icons/Entypo";
import axios from "axios";
import { getValueFor } from "../../../components/methods/user";
export default function Rent({ display }) {
  const [Tabs, setTabs] = useState(0);
  const route = useRoute();

  const translateY = useRef(new Animated.Value(400)).current;
  const [display2, setdisplay2] = useState(false);
  const TabBarItem = [
    {
      label: "Onay Bekleyenler",
      value: "confirmReservations",
    },
    {
      label: "Onaylananlar",
      value: "housingReservations",
    },
    {
      label: "İptal Talepleri",
      value: "cancelRequestReservations",
    },
    {
      label: "Geçmiş",
      value: "expiredReservations",
    },
    {
      label: "Reddedilenler",
      value: "cancelReservations",
    },
    {
      label: "İade Edilenler",
      value: "refundedReservations",
    },
  ];
  const [user, setUser] = useState({});

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);
  const [RentItems, setRentItems] = useState({});
  const [reservations, setreservations] = useState({});
  const [cancel, setcancel] = useState([]);

  const getRentCategoriesAnItem = async () => {
    try {
      if (user?.access_token) {
        const response = await axios.get(
          "https://test.emlaksepette.com/api/institutional/kiraladiklarim",
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );

        setRentItems(response.data);
        setreservations(RentItems.housingReservations);
      }
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };

  useEffect(() => {
    getRentCategoriesAnItem();
  }, [user]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.navbar}>
          <View style={styles.TabBar}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ display: "flex", flexDirection: "row", gap: 20 }}>
                {TabBarItem.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.TabBarBtn,
                      {
                        backgroundColor: Tabs == index ? "#ebebeb" : "#E54242",
                        borderWidth: Tabs == index ? 1 : 0,
                        borderColor: "#E54242",
                      },
                    ]}
                    onPress={() => {
                      setTabs(index);
                      setreservations(RentItems[item.value] || []);

                    }}
                  >
                    <Text
                      style={[
                        styles.tabBarText,
                        {
                          color: Tabs === index ? "#E54242" : "white",
                          fontWeight: Tabs === index ? "600" : "normal",
                        },
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>

        <ScrollView>
          {/* {RentItems.map((reservation, index) => (
                <View key={index} style={styles.reservationCard}>
                    <Text>Reservation ID: {reservation.id}</Text>
                    <Text>Housing Title: {reservation.housing.title}</Text>
                    <Text>Check-in Date: {reservation.check_in_date}</Text>
                    <Text>Check-out Date: {reservation.check_out_date}</Text>
                    <Text>Total Price: {reservation.total_price}</Text>
                    <Text>Full Name: {reservation.full_name}</Text>
                    <Text>Email: {reservation.email}</Text>
                    <Text>Phone: {reservation.phone}</Text>
                    <Text>Address: {reservation.address}</Text>
                    <Text>Notes: {reservation.notes}</Text>
                </View>
            ))} */}
          <View style={styles.OrdersArea}>
            {reservations && reservations.length > 0 ? (
              reservations.map((item, index) => (
                <RentOrder
                  key={index}
                  title={item.housing.title}
                  display={"flex"}
                  chekIn={item.check_in_date}
                  chekOut={item.check_out_date}
                  price={item.down_payment}
                  status={item.status}
                />
              ))
            ) : (
              <Text>Rezervasyon bulunamadı.</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  TabBarBtn: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 4,
  },
  TabBar: {
    padding: 10,
  },
  OrdersArea: {
    gap: 10,
    paddingTop: 10,
    padding: 10,
    paddingBottom: 20,
  },
  animatedView: {
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
});
