import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'react-native'

export default function SplashScreen() {
  return (
    <View style={{flex:1,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
      <View style={{width:300,height:150}}>
                <Image source={require('../../../components/emlaksepettelogo.png')} style={{width:'100%',height:'100%'}} resizeMode='contain'/>
      </View>
    </View>
  )
}
const styles =StyleSheet.create({

})
