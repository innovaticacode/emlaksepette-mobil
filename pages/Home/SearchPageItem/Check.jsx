import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Check({title}) {
  return (
    <TouchableOpacity style={{flexDirection:'row',width:'100%',gap:10}}>
      <View style={{padding:8,borderWidth:1,paddingLeft:8,paddingRight:8}}/> 

   
      <Text>{title}</Text>
    </TouchableOpacity>
  )
}