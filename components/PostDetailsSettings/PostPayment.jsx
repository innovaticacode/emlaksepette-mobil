import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import PaymentItem from '../PaymentItem'
import { addDotEveryThreeDigits } from '../methods/merhod'
import { Platform } from "react-native";

export default function PostPayment({data,roomOrder}) {
  var months = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];

  const paymentItems = [];

  // for döngüsü kullanarak PaymentItem bileşenlerini oluşturuyoruz
  for (let _index = 0; _index < data.projectHousingsList[roomOrder]['pay-dec-count' + roomOrder]; _index++) {
    const item = data.projectHousingsList[roomOrder]['pay-dec-count' + roomOrder][_index];
    const date = new Date(data.projectHousingsList[roomOrder]['pay_desc_date' + roomOrder + _index]);

    paymentItems.push(
      <View key={_index}>
        <PaymentItem header={`${_index+1} . Ara Ödeme`} price={addDotEveryThreeDigits(data.projectHousingsList[roomOrder][`pay_desc_price${roomOrder}` + _index])} date={months[date.getMonth()] + ', ' + date.getDate() + ' ' + date.getFullYear()}  dFlex="column"/>
      
      </View>
    );
  }
  return (
    <View style={{padding:8}}>
    <View style={styles.container}>
      <View style={styles.PaymentPlan}>
       
{
  data.projectHousingsList[roomOrder]['off_sale[]'] !='[]'? 
  <><Text style={{textAlign:'center',fontSize:12,color:'grey',fontWeight:'bold'}}>Bu ürün için ödeme detay bilgisi gösterilemiyor!</Text></>:

  <>
    <PaymentItem header='Peşin Fiyat:' price={addDotEveryThreeDigits(data.projectHousingsList[roomOrder]['price[]'])} align='center' top='7'/>
        <PaymentItem header={`${data.projectHousingsList[roomOrder]['installments[]']} Ay takstitli fiyat: `} price={addDotEveryThreeDigits(data.projectHousingsList[roomOrder]['installments-price[]'])} align='center' top='7'/>
        <PaymentItem header='Peşinat:' price={addDotEveryThreeDigits(data.projectHousingsList[roomOrder]['advance[]'])} align='center' top='7'/>
        {/* {data.projectHousingsList[roomOrder]} */}
        <PaymentItem header='Aylık Ödenecek Miktar: ' price={   addDotEveryThreeDigits(
                          (
                            (data.projectHousingsList[roomOrder][
                              "installments-price[]"
                            ] -
                              data.projectHousingsList[roomOrder][
                                "advance[]"
                              ]) /
                            data.projectHousingsList[roomOrder][
                              "installments[]"
                            ]
                          ).toFixed(0)
                        )}/>
        {
         paymentItems
        }
  </>
    
  
}
      
        

      </View>
    </View>
   
    </View>
  )

}
const styles=StyleSheet.create({
    container:{
        width:'100%',
       
       
        top:-20,
        backgroundColor: '#FFFFFF',  
     
        
       
        marginVertical: 10,  
        height:'auto',
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
    PaymentPlan:{
      width:'100%',
     
      gap:3,
      padding:8
    
    },
    Info:{
        bottom:35
    }
})