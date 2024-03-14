import { View, Text,Image,ImageBackground, TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
export default function SliderItem() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity  onPress={()=>navigation.navigate('Profile')}>
    <View style={{backgroundColor:'transparent',width:65,
    height:65,
    borderRadius:30,
    margin:6
}}>
<ImageBackground source={require('../images/Logo.jpeg')} resizeMode='cover'  style={{
    flex: 1,
    justifyContent: 'center',
    
}}/>

      
    </View>
    </TouchableOpacity>
  )
}