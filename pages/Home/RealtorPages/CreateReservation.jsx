import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import { format, parseISO, eachDayOfInterval, isValid , differenceInDays} from "date-fns";
import { da, tr } from "date-fns/locale";
import * as SecureStore from 'expo-secure-store';
import "moment/locale/tr";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/AntDesign";
import { CheckBox } from '@rneui/themed';
import { useNavigation, useRoute } from "@react-navigation/native";
// Türkçe dil desteğini ayarla
moment.locale("tr");

const App = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [GuestCount, setGuestCount] = useState(0);
  const [totalNights, setTotalNights] = useState(0);
  const [checked, setChecked] =useState(false);
  const route = useRoute();
  const { data } = route.params;
  const navigation=useNavigation()
  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    setReservations(data.reservations);
  }, [data]);
  const [acitveMoneySafe, setacitveMoneySafe] = useState('no Safe')
     const toggleCheckbox = () => {
      setChecked(!checked)
      setacitveMoneySafe(!checked? 'Safe':'no Safe')
    };
  const onDateChange = (date, type) => {
    if (type === "START_DATE") {
      setSelectedStartDate(date);
      setSelectedEndDate(null); // Çıkış tarihini sıfırla
    } else {
      setSelectedEndDate(date);
    }
  };

  const getMarkedDates = () => {
    const markedDates = {};

    // Giriş tarihi işaretle
    if (selectedStartDate) {
      markedDates[selectedStartDate] = { startingDay: true, color: "green" };
    }

    // Çıkış tarihini işaretle
    if (selectedEndDate) {
      markedDates[selectedEndDate] = { endingDay: true, color: "green" };

      // Seçilen tarihler arasındaki günleri işaretle
      const start = moment(selectedStartDate);
      const end = moment(selectedEndDate);
      let currentDate = start.clone();

      while (currentDate <= end) {
        markedDates[currentDate.format("YYYY-MM-DD")] = { color: "green" };
        currentDate = currentDate.add(1, "day");
      }
    }

    return markedDates;
  };

  const RenderNextButton = () => {
    return <Icon name="chevron-right" size={20} color="#d7dadd" />;
  };

  const RenderPreviousButton = () => {
    return <Icon name="chevron-left" size={20} color="#d7dadd" />;
  };
  const formatDateString = (date) => {
    if (!date) return '';
    try {
      return format(date, 'dd MMMM', { locale: tr });
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };
  const getBookedDates = (reservations) => {
    let dates = [];
    reservations?.forEach((reservation) => {
      const { check_in_date, check_out_date } = reservation;
      const startDate = parseISO(check_in_date);
      const endDate = parseISO(check_out_date);
      if (isValid(startDate) && isValid(endDate)) {
        const interval = eachDayOfInterval({
          start: startDate,
          end: endDate,
        });
        dates = dates.concat(interval.map((date) => format(date, 'yyyy-MM-dd')));
      }
    });
    return dates;


  }; 
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount);
  };
  const bookedDates = getBookedDates(reservations);
  const getCustomDatesStyles = () => {
    return bookedDates.map((date) => {
      try {
        const parsedDate = parseISO(date);
        return {
          date: parsedDate,
          style: { backgroundColor: '#DA3119' },
          textStyle: { color: 'white' },
          containerStyle: [{ backgroundColor: '#DA3119' }],
        };
      } catch (error) {
        console.error('Error parsing date:', error);
        return null;
      }
    }).filter(Boolean);
  };

  const calculateNightsBetweenDates = (start, end) => {
    if (start && end) {
      return differenceInDays(end, start);
    }
    return 0;
  };

  useEffect(() => {
    const nights = calculateNightsBetweenDates(selectedStartDate, selectedEndDate);
    setTotalNights(nights);
  }, [selectedStartDate, selectedEndDate]);
  const today = new Date();
  const formattedDate = format(today, 'dd MMMM yyyy', { locale: tr });
  const totalCost = selectedStartDate && selectedEndDate && data.housing_type_data ? JSON.parse(data.housing_type_data).daily_rent * totalNights : 0;
  const formattedTotalCost = formatCurrency(totalCost);
  const halfTotalCost = totalCost / 2;
  const formattedHalfTotalCost = formatCurrency(halfTotalCost);
  const totalPrice =formatCurrency(checked? halfTotalCost +1000:halfTotalCost)

  const saveData = async (key, value) => {
    try {
      await SecureStore.setItemAsync(key, value);
     
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };
  const saveAllStates = async () => {
    try {
      await saveData('startDate',  moment(selectedStartDate).format("DD MMMM YYYY"));
      await saveData('endDate',  moment(selectedEndDate).format("DD MMMM YYYY"));
      
      await saveData('checked',acitveMoneySafe)
      navigation.navigate('PaymentScreenForReserve',{HouseID:data.id,totalNight:totalNights})
      
    } catch (error) {
      console.log('Error saving states:', error);
    }
  };
  console.log( selectedStartDate , selectedEndDate)

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom:30}}>
      <View style={styles.card}>
        <CalendarPicker
          nextComponent={<RenderNextButton />}
          previousComponent={<RenderPreviousButton />}
          startFromMonday={true}
          allowRangeSelection={true}
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          onDateChange={onDateChange}
          initialDate={moment().format("YYYY-MM-DD")}
          todayBackgroundColor="#B9E2F4"
          selectedDayColor="#569FF7"
          selectedDayTextColor="#FFFFFF"
          scaleFactor={375}
          textStyle={{
            fontFamily: "Cochin",
            color: "#000000",
          }}
          customDatesStyles={getCustomDatesStyles()}
          weekdays={["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cts"]}
          months={[
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
          ]}
        />
      </View>

      <View style={styles.dateContainer}>
        <View>
          <Text style={{ color: "#aab4c1", fontWeight: "600" }}>Tarih</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
          <Text style={{ color: "#569FF7", fontWeight: "500" }}>
            {selectedStartDate
              ? moment(selectedStartDate).format("DD MMMM YYYY")
              : "Seçilmedi"}
          </Text>
          <Icon name="long-arrow-right" color={"#53C2FD"} size={17} />
          <Text style={{ color: "#569FF7", fontWeight: "500" }}>
            {" "}
            {selectedEndDate
              ? moment(selectedEndDate).format("DD MMMM YYYY")
              : "Seçilmedi"}
          </Text>
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
              borderRadius: 5,
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
                if (GuestCount > 0) {
                  setGuestCount(GuestCount - 1);
                }
              }}
            >
              <Icon name="minus" color={"#0ba5ed"} size={17} />
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
                setGuestCount(GuestCount + 1);
              }}
            >
              <Icon name="plus" color={"#0ba5ed"} size={17} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.dateContainer}>
      <CheckBox
           checked={checked}
           onPress={toggleCheckbox}
           // Use ThemeProvider to make change for all checkbox
           iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank-outline"
           checkedColor="red"
           containerStyle={{margin:0,padding:0}}
           title={'Param Güvende (+1000 ₺)'}
           
         />
         <View style={{flexDirection:'row',gap:10,marginTop:10,width:'90%'}}>
              <Icon2 name="infocirlceo" size={17}/>
              <Text style={{fontSize:13}}>Param Güvende seçeneğini işaretlerseniz rezervasyon iptal durumunda paranızın iadesinde kesinti olmayacaktır.</Text>
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
          <Text style={{ color: "#333", fontWeight: "500" }}>
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
              <Text style={styles.DetailTitle}>  {selectedStartDate
              ? moment(selectedStartDate).format("DD MMMM YYYY")
              : "Seçilmedi"}</Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.DetailTitle}>Çıkış Tarihi:</Text>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
              <Text style={styles.DetailTitle}>  {selectedEndDate
              ? moment(selectedEndDate).format("DD MMMM YYYY")
              : "Seçilmedi"}</Text>
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
          <Text style={{ color: "#333", fontWeight: "500" }}>
              Sepet Özeti
          </Text>
        </View>
        <View style={{ gap: 20 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.DetailTitle}>Gecelik {data &&data.housing_type_data && JSON.parse(data.housing_type_data).daily_rent} TL</Text>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
              <Text style={styles.DetailTitle}>
                {totalNights} x Gece
              </Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.DetailTitle}>Toplam Tutar</Text>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
              <Text style={styles.DetailTitle}>
                {formattedTotalCost} 
              </Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.DetailTitle}>Kapıda Ödenecek Tutar</Text>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
              <Text style={styles.DetailTitle}>{formattedHalfTotalCost}</Text>
            </View>
          </View>
          {
            checked &&
            <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.DetailTitle}>Param Güvende:</Text>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
              <Text style={styles.DetailTitle}>1000 ₺</Text>
            </View>
          </View>
          }

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={[styles.DetailTitle,{color:'#208011'}]}>Şimdi Ödenecek Tutar</Text>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
              <Text style={[styles.DetailTitle,{color:'#208011'}]}>{totalPrice}</Text>
            </View>
            
          </View>
        </View>
      </View>
      <View style={{padding:5,alignItems:'center'}}>
    <TouchableOpacity style={{backgroundColor:'#EA2B2E',padding:10,borderRadius:7,width:'90%'}}
      onPress={()=>{
   
        saveAllStates()
      }}
    >
      <Text style={{textAlign:'center',color:'#ffffff',fontWeight:'500'}}>
        Ödeme Yap
      </Text>
    </TouchableOpacity>
   </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  selectedDateContainer: {},
  selectedDateText: {
    fontSize: 16,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#ffffff",
    margin: 5,
    borderRadius: 5,
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
    borderRadius: 5,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default App;
