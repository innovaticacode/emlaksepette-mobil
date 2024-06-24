import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

import { useRoute , useNavigation} from '@react-navigation/native';


export default function Emlak() {
  const navigation=useNavigation()
    const  route = useRoute();
    const {name}=route.params
   
    

  return (
    <View style={style.container}>
    <View style={style.categoryContainer}>
  
  
       
      </View>
    </View>
  )
}
const style=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    }
})