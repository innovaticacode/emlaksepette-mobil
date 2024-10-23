import { View, Text,Button, TouchableOpacity ,Alert, Platform} from 'react-native'
import{ React,useEffect,useState} from 'react'
import MapView ,{ Marker,PROVIDER_GOOGLE }from 'react-native-maps';
import * as Location from 'expo-location'
import openMap from 'react-native-open-maps'
import { Shadow } from 'react-native-shadow-2';
export default function RealtorMap({mapData}) {

 
  const handleGetDirections = () => {
 
    if (mapData && mapData.housing && mapData.housing.latitude && mapData.housing.longitude) {
      openMap({
        latitude: parseFloat(mapData?.housing?.latitude),
        longitude: parseFloat(mapData?.housing?.longitude),
        query: mapData.housing.city.title + "/" + mapData.housing.county.title,
      });
    } else {
      Alert.alert("Hata", "Konum bilgisi bulunamadı.");
    }
 
  };


  return (

    <View style={{height:400,padding:10,
      backgroundColor: '#FFFFFF',  
   
      
     
    
      borderWidth:0.7,
      borderColor:'#e6e6e6',
      ...Platform.select({
          ios: {
            shadowColor: ' #e6e6e6',
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
          },
          android: {
            elevation: 5,
          },
        }),
    }}>  
     <TouchableOpacity
        onPress={handleGetDirections}
        style={{
          position: "absolute",
          zIndex: 2,
          backgroundColor: '#EA2C2E',
          left:10,
          padding:8,
          borderRadius:5,
          top: 10,
        }}
      >
        <Text style={{ color: "white",textAlign:'center' }}>Yol Tarifi Al</Text>
      </TouchableOpacity>
    
    <MapView
    
    
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