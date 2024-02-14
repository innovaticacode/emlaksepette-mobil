import { View, Text } from 'react-native'
import{ React,useEffect,useState} from 'react'
import MapView ,{ Marker }from 'react-native-maps';
import * as Location from 'expo-location'
export default function Map() {
  const [location, setlocation] = useState()

    useEffect(() => {
      const getLocation= async ()=>{
          let {status}=await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
              
              return;
          }
          let currentLocation = await Location.getCurrentPositionAsync({})
          setlocation(currentLocation);
          
      };
      getLocation();
    
      
    }, [])
    

  return (
  
    <View style={{flex:1,top:14,padding:10}}>   
    <MapView
  initialRegion={{
    latitude: 40.909087177287915,
    longitude: 29.180233967506933,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    altidute:50.03281021118164,
  }}
  style={{flex:1}}
  />
  <Marker
        coordinate={{ latitude: 39.9255, longitude: 32.8662 }}
        title="Türkiye"
        description="Burada olmak istiyorum"
      />
  </View>
 
  
   
  
    
  )
}