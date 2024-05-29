import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { format, parseISO, eachDayOfInterval, isValid , differenceInDays} from "date-fns";
import { da, tr } from "date-fns/locale";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/AntDesign";
import * as SecureStore from 'expo-secure-store';

import { CheckBox } from '@rneui/themed';
import { useNavigation, useRoute } from "@react-navigation/native";

const App = () => {
  const route = useRoute();
  const { data } = route.params;
  const navigation = useNavigation();
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [GuestCount, setGuestCount] = useState(0);
  const [reservations, setReservations] = useState([]);
  const [totalNights, setTotalNights] = useState(0);
  const [checked, setChecked] =useState(false);
  const [acitveMoneySafe, setacitveMoneySafe] = useState('no Safe')
     const toggleCheckbox = () => {
      setChecked(!checked)
      setacitveMoneySafe(!checked? 'Safe':'no Safe')
    };
  useEffect(() => {
    setReservations(data.reservations);
  }, [data]);

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
        dates = dates.concat(interval.map((date) => format(date, 'yyyy-MM-dd')));
      }
    });
    return dates;
  };

  const bookedDates = getBookedDates(reservations);

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

  const onDateChange = (date, type) => {
    if (!isValid(date)) return;

    if (type === 'START_DATE') {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    } else if (type === 'END_DATE') {
      if (selectedStartDate && date < selectedStartDate) {
        setSelectedEndDate(null);
      } else {
        setSelectedEndDate(date);
      }
    }
  };

  const resetSelection = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  const months = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
  ];
  const weekdays = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];

  const formatDateString = (date) => {
    if (!date) return '';
    try {
      return format(date, 'dd MMMM', { locale: tr });
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
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
          style: { backgroundColor: 'red' },
          textStyle: { color: 'white' },
          containerStyle: [{ backgroundColor: 'red' }],
        };
      } catch (error) {
        console.error('Error parsing date:', error);
        return null;
      }
    }).filter(Boolean);
  };

  const isDateDisabled = (date) => {
    return bookedDates.includes(format(date, 'yyyy-MM-dd'));
  };

  const today = new Date();
  const formattedDate = format(today, 'dd MMMM yyyy', { locale: tr });
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount);
  };
  const totalCost = selectedStartDate && selectedEndDate ? JSON.parse(data.housing_type_data).daily_rent * totalNights : 0;
  const formattedTotalCost = formatCurrency(totalCost);
  const halfTotalCost = totalCost / 2;
  const formattedHalfTotalCost = formatCurrency(halfTotalCost);
  const totalPrice =formatCurrency(checked? halfTotalCost +1000:halfTotalCost)
  const saveData = async (key, value) => {
    try {
      await SecureStore.setItemAsync(key, value);
      console.log('Data saved successfully');
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };
  const saveAllStates = async () => {
    try {
      await saveData('startDate', startDate);
      await saveData('endDate', endDate);
      
      await saveData('checked',acitveMoneySafe)
      navigation.navigate('PaymentScreenForReserve',{HouseID:data.id,totalNight:totalNights})
      alert('All states saved successfully');
    } catch (error) {
      console.log('Error saving states:', error);
    }
  };
      
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
              <Text style={styles.DetailTitle}>{startDate}</Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.DetailTitle}>Çıkış Tarihi:</Text>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
              <Text style={styles.DetailTitle}>{endDate}</Text>
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
            <Text style={styles.DetailTitle}>Gecelik {JSON.parse(data.housing_type_data).daily_rent} TL</Text>
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
    color: "#696969",
    fontWeight: "500",
  },
});

export default App;
