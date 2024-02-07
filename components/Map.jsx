import { View, Text } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps';
import ShoppinInfo from './ShoppinInfo';
export default function Map() {
  return (
  
    <View style={{flex:1,top:15}}>   
    <MapView
  initialRegion={{
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
  style={{flex:1}}
  />
 
  </View>
 
  
   
  
    
  )
}