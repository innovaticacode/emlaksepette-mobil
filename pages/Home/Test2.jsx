import { View, Text,TouchableWithoutFeedback,Keyboard } from 'react-native'
import React from 'react'
import BasketItem from '../../components/BasketItem'

export default function Test2() {
  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    <View style={{alignItems:'center'}}>
     <BasketItem/>
    </View>
    </TouchableWithoutFeedback>
  )
}