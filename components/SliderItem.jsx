import { View, Text,Image,ImageBackground, TouchableOpacity} from 'react-native'
import React from 'react'

export default function SliderItem() {
  return (
    <TouchableOpacity>
    <View style={{backgroundColor:'transparent',width:65,
    height:65,
    borderRadius:'50%',
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