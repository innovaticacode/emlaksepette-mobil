import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Onboard({setShowOnBoard}) {
    const navigation =useNavigation()
  return (
    <View>
      <Text onPress={()=>{
        setShowOnBoard(false)
       
      }}>Onboard</Text>
    </View>
  )
}