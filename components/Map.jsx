import { View, Text } from 'react-native'
import{ React,useEffect,useState} from 'react'
import MapView ,{ Marker }from 'react-native-maps';
import * as Location from 'expo-location'
export default function Map({map,maplo}) {
  const [location, setlocation] = useState()

    // useEffect(() => {
    //   const getLocation= async ()=>{
    //       let {status}=await Location.requestForegroundPermissionsAsync();
    //       if (status !== 'granted') {
              
    //           return;
    //       }
    //       let currentLocation = await Location.getCurrentPositionAsync({})
    //       setlocation(currentLocation);
        
    //   };
    //   getLocation();
    
      
    // }, [])
    

  return (
  
    <View style={{height:'100%'}}>   
    <MapView
  initialRegion={{
    latitude:40.908912269486486,
    longitude:29.180268198251724,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    altidute:50.03281021118164,
  }}
  style={{flex:1}}
  />

  </View>
 
  
   
  
    
  )
}