import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  FlatList,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import RentOrder from "./profileComponents/RentOrder";
import Icon from "react-native-vector-icons/Entypo";
import axios from "axios";
import { Platform } from "react-native";
import { getValueFor } from "../../../components/methods/user";
import { apiUrl } from "../../../components/methods/apiRequest";
import { ActivityIndicator } from "react-native-paper";

export default function RentByMe() {
  const [Tabs, setTabs] = useState(0);
  const [TabIndex, setTabIndex] = useState(0);

  const route = useRoute();
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true); // Loading state
  const [RentItems, setRentItems] = useState([]);
  const [reservations, setreservations] = useState([]);
  const [cancel, setcancel] = useState([]);
  const translateY = useRef(new Animated.Value(400)).current;
  const [display2, setdisplay2] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const TabBarItem = [
    {
      label: "Onaylananlar",
      value: "CONFİRM_RESERVATİONS",
    },
    {
      label: "Onay Bekleyenler",
      value: "PENDİNG_RESERVATİONS",
    },

    {
      label: "İptal Talepleri",
      value: "CANCEL_PENDİNG_RESERVATİONS",
    },
    {
      label: "Geçmiş",
      value: "LATEST_RESERVATİONS",
    },
    {
      label: "Reddedilenler",
      value: "REJECTED_RESERVATİONS",
    },
    {
      label: "İptal Edilenler",
      value: "CANCEL_RESERVATİONS",
    },
  ];

  const getRentCategoriesAnItem = async (tabValue, page) => {
    setLoading(true);
    if (user?.access_token && user) {
      try {
        const skipValue = page * 10; // Calculate skip value
        console.log("Fetching items with skip:", skipValue, "and take:", 10);
        const response = await axios.get(apiUrl + "get_customer_reservations", {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
          params: {
            type: tabValue,
            skip: skipValue,
            take: 10,
          },
        });
        const newItems = response.data.reservations || [];

        setRentItems((prevItems) => {
          const updatedItems = [...prevItems, ...newItems];
          console.log("Current rentItems length:", updatedItems.length); // Log current item count
          return updatedItems; // Append new items
        });
        setHasMore(newItems.length === 10);
      } catch (error) {
        console.error("Hata:", error.response?.data || error.message);

        console.error("Hata:", error);
        throw error;
      } finally {
        setLoading(false); // Ensure loading state is reset
      }
    }
  };
  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

    // Check if the user has scrolled to the bottom of the ScrollView
    const isAtBottom =
      contentOffset.y + layoutMeasurement.height >= contentSize.height - 20;

    if (isAtBottom && hasMore && !loading) {
      console.log("Loading more items..."); // Log when loading starts

      setLoading(true); // Set loading state to true
      setCurrentPage((prevPage) => {
        const nextPage = prevPage + 1; // Increment page number
        getRentCategoriesAnItem(Tabs, nextPage); // Fetch the next page
        return nextPage; // Return updated page number
      });
    }
  };

  useEffect(() => {
    if (user?.access_token) {
      setRentItems([]); // Clear previous items when switching tabs
      setCurrentPage(0);
      setLoading(true);
      getRentCategoriesAnItem(TabBarItem[0].value, currentPage); // Fetch initial page
    }
  }, [user, Tabs]); // Include Tabs as a dependency
  console.log(RentItems);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.navbar}>
          <View style={styles.TabBar}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ display: "flex", flexDirection: "row", gap: 20 }}>
                <FlatList
                  data={TabBarItem}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View style={{ width: 10 }} />} // Aralık
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.tabBtn,
                        {
                          backgroundColor:
                            TabIndex === index ? "white" : "#EEEDEB",
                          borderWidth: TabIndex === index ? 0 : 1,
                        },
                      ]}
                      onPress={() => {
                        const selectedValue = item.value;
                        setTabIndex(index);
                        setTabs(item.value);
                        getRentCategoriesAnItem(item.value);
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: Tabs === index ? "#333" : "#333",
                          fontSize: 12,
                          fontWeight: "600",
                        }}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </ScrollView>
          </View>
        </View>

        <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
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
          {loading ? (
            <View
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator color="#333" size={"large"} />
            </View>
          ) : (
            <View style={styles.OrdersArea}>
              {RentItems.length > 0 ? (
                <FlatList
                  data={RentItems} // Veriyi FlatList'e veriyoruz
                  keyExtractor={(item) => item.id.toString()} // Benzersiz anahtar
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("RentByMeDetails", {
                          id: item.id, // item.id'yi parametre olarak gönder
                        });
                      }}
                    >
                      <RentOrder
                        id={item?.id}
                        title={item?.housing?.title}
                        display={"flex"}
                        checkIn={item?.check_in_date}
                        checkOut={item?.check_out_date}
                        price={item?.price}
                        status={item?.status}
                        address={item?.address}
                        email={item?.email}
                        totalPrice={item?.total_price}
                      />
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    color: "#333",
                    fontWeight: "600",
                  }}
                >
                  Rezervasyon bulunamadı.
                </Text>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  TabBarBtn: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 4,
  },
  TabBar: {
    padding: 5,
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
  tabBtn: {
    backgroundColor: "white",
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#C8C8C89B",
  },
});
