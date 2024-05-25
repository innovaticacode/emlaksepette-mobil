import React, { useState } from 'react';
import { StyleSheet, Text, View, Button,Platform } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import Icon from 'react-native-vector-icons/FontAwesome'; 
const App = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const onDateChange = (date, type) => {
    if (type === 'START_DATE') {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    } else {
      setSelectedEndDate(date);
    }
  };

  const resetSelection = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };


  const months = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];
  const weekdays = [
    'Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'
  ];
  const weekdaysLong = [
    'Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'
  ];
  const formatDateString = (date) => {
    if (!date) return '';
    return format(date, 'dd MMMM', { locale: tr });
  };

  const startDate = formatDateString(selectedStartDate);
  const endDate = formatDateString(selectedEndDate);
  const RenderNextButton = () => {
    return <Icon name="chevron-right" size={20} color="#d7dadd" />;
  };

  const RenderPreviousButton = () => {
    return <Icon name="chevron-left" size={20} color="#d7dadd" />;
  };
  return (
    <View style={styles.container}>
    
      <View style={styles.card}>
      <CalendarPicker
        
        nextComponent={<RenderNextButton/>}
        previousComponent={<RenderPreviousButton/>}
        selectYearTitle='Yıl Seçin'
        yearTitleStyle={{color:'#333',fontWeight:'500'}}
        monthTitleStyle={{color:'#333',fontWeight:'500'}}
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
        nextTitle={'İleri'}
        previousTitle={'Geri'}
      />
      </View>
    

      <View style={styles.dateContainer}>
        <Text>Giriş Tarihi: {startDate}</Text>
        <Text>Çıkış Tarihi: {endDate}</Text>
      </View>

      <Button title="Seçimi İptal Et" onPress={resetSelection} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding:10

  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
  dateContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  card: {  
        
    backgroundColor: '#FFFFFF',  
    borderRadius: 10,  
    paddingVertical: 22,  

    width: '100%',  
    marginVertical: 3,  
 
    borderWidth:0.7,
    borderColor:'#e6e6e6',
    ...Platform.select({
        ios: {
          shadowColor: ' #e6e6e6',
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

export default App;
