import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function AccordionItem({onpress,text,click}) {
  return (
    <View style={{backgroundColor:'#ebebeb54',padding:5,borderRadius:5}}
      

    >
      <Text style={{color:'#333'}}>{text}</Text>
    </View>
  )
}