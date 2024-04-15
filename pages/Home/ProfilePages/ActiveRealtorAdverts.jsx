import { View, Text, ScrollView } from 'react-native'
import React from 'react'

export default function ActiveRealtorAdverts() {
  return (
 <ScrollView>
  <View style={{
        paddingTop:20,
        paddingLeft:20
  }}>
    <Text style={{
       fontSize:20,
       color:'#141824',
       fontWeight:'600'
    }}>Emlak İlanları(0)</Text>
  </View>
 </ScrollView>
  )
}