import { View, Text } from 'react-native'
import React from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';
export default function Rent() {
  const route = useRoute();
  const { text} = route.params;
  return (
    <View>
      <Text>{text}</Text>
    </View>
  )
}