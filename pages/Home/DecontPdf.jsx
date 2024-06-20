import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

export default function DecontPdf() {
    const route =useRoute()
    const {name}=route.params
  return (
    <View>
      <Text>DecontPdf</Text>
    </View>
  )
}