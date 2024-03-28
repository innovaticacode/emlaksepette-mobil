import { View, Text,Image,ImageBackground, TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { Skeleton } from '@rneui/themed';
import SliderItem from '../SliderItem';
export default function SliderItemSkeleton({image,name}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity  onPress={()=>navigation.navigate('Profile',{name:'Master Realtor'})}>
     <Skeleton animation='pulse' LinearGradientComponent={SliderItem} height={75} skeletonStyle={{backgroundColor:'#ebebeb',borderRadius:50,padding:0}}circle={true} >
    <View style={{backgroundColor:'black',width:65,
    height:65,
   flexWrap:'wrap',
    borderRadius:50,
    margin:6,
    padding:1,
    borderWidth:1,
    borderColor:'#ebebeb'
}}>



      
    </View>
    </Skeleton>
    {/* <View style={{width:50}}>
    <Text numberOfLines={4}>{name}</Text>
    </View> */}
  
    </TouchableOpacity>
  )
}