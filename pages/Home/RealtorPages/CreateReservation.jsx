import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { format, parseISO, eachDayOfInterval, isValid } from "date-fns";
import { da, tr } from "date-fns/locale";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";

const App = () => {
  const route = useRoute()
  const {data}=route.params
  const navigation = useNavigation();
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [GuestCount, setGuestCount] = useState(0);
  const [reservations, setReservations] = useState([]);

  // Simulated API response
  const apiResponse = {
    reservations: [
      {
        id: 12,
        housing_id: 265,
        user_id: 694,
        check_in_date: "2024-06-03",
        check_out_date: "2024-06-13",
        status: 1,
        person_count: 1,
        total_price: 54000,
        created_at: "2024-05-27T12:25:16.000000Z",
        updated_at: "2024-05-27T12:25:55.000000Z",
        key: "NPMMZ847",
        owner_id: 694,
        full_name: "Kerem Bozmaz",
        tc: "17156324492",
        email: "emlaksepettetest@gmail.com",
        phone: "5537064474",
        address: "asdasdas",
        notes: "asdasd",
        money_trusted: 1,
        transaction: null,
        payment_result: null,
        dekont: "1716812717_🇨🇳 kopyası.pdf",
        price: 5400,
        money_is_safe: 0,
        filename: null,
        path: null,
        down_payment: "27000",
      },
    ],
  };

  useEffect(() => {
    // Simulate fetching data from an API
    setReservations(data.reservations);
  }, []);

  const getBookedDates = (reservations) => {
    let dates = [];
    reservations.forEach((reservation) => {
      const { check_in_date, check_out_date } = reservation;
      const startDate = parseISO(check_in_date);
      const endDate = parseISO(check_out_date);
      if (isValid(startDate) && isValid(endDate)) {
        const interval = eachDayOfInterval({
          start: startDate,
          end: endDate,
        });
        dates = dates.concat(interval.map((date) => format(date, "yyyy-MM-dd")));
      }
    });
    return dates;
  };

  const bookedDates = getBookedDates(reservations);
const [totalDay, settotalDay] = useState(null)
const calculateTotalDays = () => {
  if (startDate && endDate) {
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    settotalDay(diffDays);
  }
};

  const onDateChange = (date, type) => {
    if (!isValid(date)) return;
    calculateTotalDays()
    const selectedDate = format(date, "yyyy-MM-dd");
   
    if (type === "START_DATE") {
      if (selectedStartDate && format(selectedStartDate, "yyyy-MM-dd") === selectedDate) {
        setSelectedStartDate(null);
        setSelectedEndDate(null);
      } else if (!bookedDates.includes(selectedDate)) {
        setSelectedStartDate(date);
        setSelectedEndDate(null);
      }
    } else if (type === "END_DATE") {
      if (selectedEndDate && format(selectedEndDate, "yyyy-MM-dd") === selectedDate) {
        setSelectedEndDate(null);
      } else if (!bookedDates.includes(selectedDate)) {
        setSelectedEndDate(date);
      }
    }
  };

  const resetSelection = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

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
  const weekdays = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];
  const weekdaysLong = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ];

  const formatDateString = (date) => {
    if (!date) return "";
    try {
      return format(date, "dd MMMM", { locale: tr });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

  const startDate = formatDateString(selectedStartDate);
  const endDate = formatDateString(selectedEndDate);

  const RenderNextButton = () => {
    return <Icon name="chevron-right" size={20} color="#d7dadd" />;
  };

  const RenderPreviousButton = () => {
    return <Icon name="chevron-left" size={20} color="#d7dadd" />;
  };

  const getCustomDatesStyles = () => {
    return bookedDates.map((date) => {
      try {
        const parsedDate = parseISO(date);
        return {
          date: parsedDate,
          style: { backgroundColor: "red" },
          textStyle: { color: "white" },
          containerStyle: [{ backgroundColor: "red" }],
        };
      } catch (error) {
        console.error("Error parsing date:", error);
        return null;
      }
    }).filter(Boolean);
  };

  const isDateDisabled = (date) => {
    return bookedDates.includes(format(date, "yyyy-MM-dd"));
  };
  const today = new Date();
  const formattedDate = format(today, 'dd MMMM yyyy', { locale: tr });
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      <View style={styles.card}>
        <CalendarPicker
          nextComponent={<RenderNextButton />}
          previousComponent={<RenderPreviousButton />}
          selectYearTitle="Yıl Seçin"
          selectMonthTitle="Ay Seçin "
          yearTitleStyle={{ color: "#333", fontWeight: "500" }}
          monthTitleStyle={{ color: "#333", fontWeight: "500" }}
          restrictMonthNavigation={true}
          showDayStragglers={true}
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={new Date(2020, 1, 1)}
          maxDate={new Date(2050, 6, 3)}
          todayBackgroundColor="#B9E2F4"
          selectedDayColor="#569FF7"
          selectedDayTextColor="#FFFFFF"
          onDateChange={onDateChange}
          months={months}
          weekdays={weekdays}
          weekdaysLong={weekdaysLong}
          nextTitle={"İleri"}
          previousTitle={"Geri"}
          customDatesStyles={getCustomDatesStyles()}
          disabledDates={isDateDisabled}
        
        />
      </View>

      <View style={styles.dateContainer}>
        <View>
        
          <Text style={{ color: "#aab4c1", fontWeight: "600" }}>Tarih</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
          <Text style={{ color: "#569FF7", fontWeight: "500" }}>
            {startDate}
          </Text>
          <Icon name="long-arrow-right" color={"#53C2FD"} size={17} />
          <Text style={{ color: "#569FF7", fontWeight: "500" }}>{endDate}</Text>
        </View>

        <View style={{ paddingTop: 10 }}>
          <View>
            <Text style={{ color: "#aab4c1", fontWeight: "600" }}>
              Kişi Sayısı: {GuestCount}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 10,
              padding: 5,
              borderRadius: 10,
              backgroundColor: "#e0e3e5",
              alignItems: "center",
              width: "40%",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#ebebeb",
                padding: 6,
                borderRadius: 30,
              }}
              onPress={() => {
                setGuestCount(GuestCount + 1);
              }}
            >
              <Icon name="plus" color={"#0ba5ed"} size={17} />
            </TouchableOpacity>
            <View>
              <Text style={{ color: "#333" }}>{GuestCount}</Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#ebebeb",
                padding: 6,
                borderRadius: 30,
              }}
              onPress={() => {
                if (GuestCount > 0) {
                  setGuestCount(GuestCount - 1);
                }
              }}
            >
              <Icon name="minus" color={"#0ba5ed"} size={17} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={[styles.dateContainer, { gap: 10 }]}>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#ebebeb",
            paddingBottom: 10,
          }}
        >
          <Icon name="calendar" size={15} color={"#333"} />
          <Text style={{ color: "grey", fontWeight: "500" }}>
            Rezervasyon Detayı
          </Text>
        </View>
        <View style={{ gap: 20 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.DetailTitle}>İlan:</Text>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
              <Text style={styles.DetailTitle}>
                {data?.title}
              </Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.DetailTitle}>İlan No:</Text>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
              <Text style={styles.DetailTitle}>1000{data?.id}</Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.DetailTitle}>Rezervasyon Tarihi:</Text>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
              <Text style={styles.DetailTitle}>{formattedDate}</Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.DetailTitle}>Giriş Tarihi:</Text>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
              <Text style={styles.DetailTitle}>{JSON.parse(data.housing_type_data).starting_date}</Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.DetailTitle}>Çıkış Tarihi:</Text>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
              <Text style={styles.DetailTitle}>{JSON.parse(data.housing_type_data).release_date}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.dateContainer, { gap: 10 }]}>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#ebebeb",
            paddingBottom: 10,
          }}
        >
          <Icon name="star-o" size={15} color={"#333"} />
          <Text style={{ color: "grey", fontWeight: "500" }}>
              Sepet Özeti
          </Text>
        </View>
        <View style={{ gap: 20 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.DetailTitle}>Gecelik {JSON.parse(data.housing_type_data).daily_rent} TL</Text>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
              <Text style={styles.DetailTitle}>
                {totalDay}
              </Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.DetailTitle}>İlan No:</Text>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
              <Text style={styles.DetailTitle}>3242323</Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.DetailTitle}>Rezervasyon Tarihi:</Text>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
              <Text style={styles.DetailTitle}>27.05.2024</Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.DetailTitle}>Giriş Tarihi:</Text>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
              <Text style={styles.DetailTitle}>fsdfsdfsdf</Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.DetailTitle}>Çıkış Tarihi:</Text>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
              <Text style={styles.DetailTitle}>dsfsdfsdf</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  card: {
    backgroundColor: "#ffffff",
    margin: 10,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  dateContainer: {
    backgroundColor: "#ffffff",
    margin: 10,
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  DetailTitle: {
    color: "#333",
    fontWeight: "500",
  },
});

export default App;
