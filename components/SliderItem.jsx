import { View, Text,Image,ImageBackground, TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
export default function SliderItem({image,StoreID}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity  onPress={()=>navigation.navigate('Profile',{name:'Master Realtor',id:StoreID})}>
    <View style={{backgroundColor:'transparent',width:50,
    height:50,
   flexWrap:'wrap',
    borderRadius:50,
    margin:6,
  
    padding:1,
    borderWidth:1,
    borderColor:'#E6E6E6'
}}>
<Image source={{uri:image}} resizeMode='cover'  style={{
   width:'100%',
   height:'100%',
    justifyContent: 'center',
    borderRadius:50,
  

}}
  borderRadius={50}

  
/>


      
    </View>
    {/* <View style={{width:50}}>
    <Text numberOfLines={4}>{name}</Text>
    </View> */}
  
    </TouchableOpacity>
  )
}