import { View, Text,TouchableWithoutFeedback,Keyboard,ScrollView } from 'react-native'
import React from 'react'
import BasketItem from '../../components/BasketItem'


export default function Basket() {
  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
      <ScrollView>
    <View style={{alignItems:'center',height:800}}>
     <BasketItem/>
    </View>
    </ScrollView>
    </TouchableWithoutFeedback>
  )
}