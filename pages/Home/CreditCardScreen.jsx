import { View, Text,StyleSheet,TextInput, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import RNPickerSelect from "react-native-picker-select";
import Icon from 'react-native-vector-icons/FontAwesome'
import { Platform } from "react-native";
export default function CreditCardScreen({CompeletePayment,creditCartData,setCreditCartData}) {
    const months = [
        { label: 'Ocak', value: 1 },
        { label: 'Şubat', value: 2 },
        { label: 'Mart', value: 3 },
        { label: 'Nisan', value: 4 },
        { label: 'Mayıs', value: 5 },
        { label: 'Haziran', value: 6 },
        { label: 'Temmuz', value: 7 },
        { label: 'Ağustos', value: 8 },
        { label: 'Eylül', value: 9 },
        { label: 'Ekim', value: 10 },
        { label: 'Kasım', value: 11 },
        { label: 'Aralık', value: 12 },
      ];
   const [month, setmonth] = useState('')
   const [Year, setYear] = useState('')
   const [cardNumber, setcardNumber] = useState('')
   const [NameOfCardUser, setNameOfCardUser] = useState('')
   const years = [];
   const currentYear = new Date().getFullYear();
 
   for (let i = currentYear; i >= 1990; i--) {
    years.push({ label: `${i}`, value: i });
  }
  const formattedCreditCardNumber = (number) => {
    const formattedNumber = number.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    return formattedNumber.length <= 19 ? formattedNumber : formattedNumber.slice(0, 19);
  };
  const handleCreditCardNumberChange = (number) => {
    setcardNumber(formattedCreditCardNumber(number));
  };
  return (
    <View>
       <View>
        <View style={styles.card}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <View style={{backgroundColor:'#BCC8D9',width:70,height:45,borderRadius:7,alignItems:'center',justifyContent:'center'}}>
            <View style={{backgroundColor:'transparent',width:50,height:30,borderRadius:7,borderWidth:1,borderColor:'#A5B6CD'}}>

                </View>
             </View>
             <View>
                    <Icon name='cc-visa' size={50} color={'white'} />
             </View>
            </View>
           <View style={{width:'100%',padding:5}}>
            <Text style={{fontSize:18,color:'#D4E7F0',fontWeight:'bold'}}>{cardNumber? cardNumber.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim():'****************'}</Text>
           </View>
                <View style={{gap:15}}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{fontSize:15,color:'#D4E7F0',fontWeight:'500'}}>Kart Sahibinin Adı</Text>
                <Text style={{fontSize:15,color:'#D4E7F0',fontWeight:'500'}}>Ay/Yıl</Text>
           </View>  
           <View>
           <View style={{flexDirection:'row',justifyContent:'space-between',paddingLeft:10,paddingRight:10}}>
                <Text style={{fontSize:14,color:'#D4E7F0',fontWeight:'500'}}>{NameOfCardUser? NameOfCardUser:'******'}</Text>
                <Text style={{fontSize:14,color:'#D4E7F0',fontWeight:'500'}}>{month<10 &&month? 0:''}{month? month:'**'}/{Year? String(Year).slice(-2):'**'}</Text>
           </View> 
           </View>
                </View>
         

        </View>
 
       </View>
       <View style={{paddingTop:10,gap:10}}>
       <View style={{gap:6}}>
                    <Text style={styles.label}>Kart Numarası</Text>
                    <TextInput value={creditCartData.card_number} style={styles.Input} onChangeText={(value) => {setCreditCartData({...creditCartData,card_number : value}); handleCreditCardNumberChange(value)}} keyboardType='number-pad' maxLength={19}/>
                </View>
                <View style={{gap:6}}>
                    <Text style={styles.label}>Kart Sahibin Adı Soyadı</Text>
                    <TextInput value={NameOfCardUser} style={styles.Input} onChangeText={(value)=>setNameOfCardUser(value)}/>
                </View>
                <View style={{flexDirection:'row',width:'100%',justifyContent:'space-around'}}>
                <RNPickerSelect doneText="Tamam"
          placeholder={{
            label: "Ay ",
            value: null,
          }}
          onValueChange={(value)=>{setmonth(value);setCreditCartData({...creditCartData,month : value})}}
          style={pickerSelectStyles}
          value={creditCartData.month}
          items={months}
        />
                <RNPickerSelect doneText="Tamam"
          placeholder={{
            label: "Yıl ",
            value: null,
          }}
          onValueChange={(value)=>{setYear(value);setCreditCartData({...creditCartData,year : value})}}
          style={pickerSelectStyles}
          value={creditCartData.year}
          items={years}
        />
                </View>
         
       
       </View>
          <View style={{padding:10,paddingTop:20}}>
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',backgroundColor: '#4797C3', padding:13,justifyContent:'center',gap:15,borderRadius:5 }}
                onPress={()=>{
                    CompeletePayment()
                }}
            >
                <Icon name='credit-card-alt' color={'white'}/>
                <Text style={{color:'white'}}>Ödemeyi Tamamla</Text>
            </TouchableOpacity>
          </View>
    </View>
  )
}
const pickerSelectStyles = StyleSheet.create({
  
    inputIOS: {
       width:150,
      backgroundColor: "#FAFAFA",
      borderWidth: 1,
      borderColor: "#ebebeb",
      borderRadius: 5,
      padding: 10,
      fontSize: 14, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      backgroundColor: "#FAFAFA",
      borderWidth: 1,
      borderColor: "#eaeff5",
      borderRadius: 5,
      padding: 10,
      fontSize: 14, // to ensure the text is never behind the icon
    },
  });
const styles = StyleSheet.create({
    card: {  
        gap:30,
        backgroundColor: '#4797C3',  
        borderRadius: 5,  
        paddingVertical: 22,  
        paddingHorizontal: 22,  
        width: '100%',  
 
      
        borderWidth:0.7,
        borderColor:'#e6e6e6',
        ...Platform.select({
            ios: {
              shadowColor: ' #e6e6e6',
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.0,
              shadowRadius: 1,
            },
            android: {
              elevation: 5,
            },
          }),
      
        
      },
      Input:{
        borderWidth:1.5,
        borderColor:'#ebebeb',
        padding:9,
        borderRadius:5
    },
    label:{
        fontSize: 14, 
        color: "grey",
        fontWeight: '600'
    }
})