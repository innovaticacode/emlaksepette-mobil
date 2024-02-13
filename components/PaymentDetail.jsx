import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import PaymentItem from './PaymentItem'

export default function PaymentDetail() {
  return (
    <View style={styles.container}>
      <View style={styles.PaymentPlan}>
        <PaymentItem header='Peşin Fiyat:' price='3.500.400' align='center' top='7'/>
        <PaymentItem header='36 ay Taksitli Fiyat:' price='4.500.400' align='center' top='7'/>
        <PaymentItem header='Peşinat:' price='690.000' align='center' top='7'/>
        <PaymentItem header='1.Ara Ödeme Tutarı :' price='690.000' dFlex='column' date='Aralık 30 2025'/>
        <PaymentItem header='2.Ara Ödeme Tutarı :'price='690.000' dFlex='column'date='Aralık 30 2026' />
        <PaymentItem header='3.Ara Ödeme Tutarı :' price='690.000' dFlex='column' date='Aralık 30 2027'/>
       

      </View>
    </View>
  )

}
const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        
        top:40
    },
    PaymentPlan:{
      width:'100%',
      height:'25%',
      gap:3,
    
    }
})