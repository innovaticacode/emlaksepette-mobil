import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

import { useRoute , useNavigation} from '@react-navigation/native';
import CategoryAdverts from './ProjectAdvertsAdd/CategoryAdverts';

export default function Emlak() {
  const navigation=useNavigation()
    const  route = useRoute();
 
    const categories = [
      { title: 'Konut' },
      { title: 'İş Yeri' },
      { title: 'Arsa' },
      { title: 'Bina' },
      { title: 'Turistik Tesis' },
      { title: 'Müstakil Tatil' },
      { title: 'Turizm' },
      { title: 'Prefabrik' }
    ];
    

  return (
    <View style={style.container}>
    <View style={style.categoryContainer}>
  
     
   {
    categories.map((item,index)=>(
      <TouchableOpacity key={index} onPress={()=>navigation.navigate('AdvertStatu',{name:item.title})}>
        <CategoryAdverts key={index} text={item.title} navigationRoute={true} DisplayParams='none' />
        </TouchableOpacity>
    ))
   }
       
      </View>
    </View>
  )
}
const style=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    }
})