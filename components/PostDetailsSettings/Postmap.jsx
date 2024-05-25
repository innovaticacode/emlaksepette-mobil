import { View, Text,TouchableOpacity } from 'react-native'
import{ React,useEffect,useState} from 'react'
import openMap from 'react-native-open-maps'
import MapView ,{ Marker ,PROVIDER_GOOGLE}from 'react-native-maps';
import * as Location from 'expo-location'
export default function PostMap({data}) {
  var locationCoords = data.project.location.split(',');
  console.log(locationCoords)
  const handleGetDirections = () => {
    // Harita uygulamasını açmak ve seçilen konuma yönlendirme yapmak için openMap fonksiyonunu kullanıyoruz
    if (locationCoords && locationCoords[0] && locationCoords[1]) {
      openMap({
        latitude: parseFloat(locationCoords[0]),
        longitude: parseFloat(locationCoords[1]),
        query: data.project.city.title + '/' + data.project.county.ilce_title,
      });
    } else {
      Alert.alert('Hata', 'Konum bilgisi bulunamadı.');
    }
  };



  return (
  
    <View style={{height:400}}>  
       <TouchableOpacity onPress={handleGetDirections} style={{position:'absolute',zIndex:2,backgroundColor:'red',padding:10,borderRadius:5,right:0}}>
      <Text style={{color:'white'}}>Yol Tarifi Al</Text>
      </TouchableOpacity>  
    <MapView
  
  initialRegion={{
    latitude:locationCoords[0],
    longitude:locationCoords[1],
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    altidute:50.03281021118164,
  }}
  style={{flex:1}}
  >
  <Marker
       coordinate={{ latitude:locationCoords[0], longitude:locationCoords[1]}}
       title={data.project.city.title + '/' +data.project.county.ilce_title}
        description="Proje Konumu"
      />
      </MapView>
  </View>
 
  
   
  
    
  )
}