import { View, Text,TouchableWithoutFeedback,Keyboard,ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import BasketItem from '../../components/BasketItem'


export default function Basket() {
  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
      <View style={styles.container}>
  
      <BasketItem/>

    </View>
    </TouchableWithoutFeedback>
  )
}
const styles=StyleSheet.create({
  container:{
    backgroundColor:'white',
    flex:1,
    padding:13
  }
})