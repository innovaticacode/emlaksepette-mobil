import { View, Text,Button, TouchableOpacity } from 'react-native'
import{ React,useEffect,useState} from 'react'
import MapView ,{ Marker,PROVIDER_GOOGLE }from 'react-native-maps';
import * as Location from 'expo-location'
import openMap from 'react-native-open-maps'
import { Shadow } from 'react-native-shadow-2';
export default function RealtorMap({mapData}) {

 
  const handleGetDirections = () => {
 
   
      openMap({
        latitude:mapData.housing?.latitude,
        longitude: mapData.housing?.longitude,
        query: mapData?.housing?.city?.title / mapData?.housing?.county?.title,
      });
 
  };
    

  return (

    <View style={{height:400,paddingLeft:9,paddingRight:8}}>  

    
    <MapView
    
    provider={PROVIDER_GOOGLE} 
  initialRegion={{
    latitude:mapData.housing?.latitude,
    longitude:mapData?.housing?.longitude,
    
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    altidute:50.03281021118164,
    
  }}
  style={{flex:1}}
  >
        <Marker
          coordinate={{ latitude:mapData.housing?.latitude, longitude:mapData?.housing?.longitude}}
          // title={mapData?.housing?.city?.title / mapData?.housing?.county?.title}
          description="Konutun Konumu"
        />  
</MapView>

  </View>

 
  
   
  
    
  )
}