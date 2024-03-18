import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { useRoute ,useNavigation} from '@react-navigation/native'
import CategoryAdverts from '../İlanYükleme/ProjectAdvertsAdd/CategoryAdverts';


export default function SubCategoryPage({}) {
  const route=useRoute();
  const navigation=useNavigation()
  const {Submenu}=route.params;
  return (
    <View style={{backgroundColor:'white',flex:1}}>
           {
            Submenu.map((item,index)=>(
              <TouchableOpacity onPress={()=>navigation.navigate('SubCategoryChild',{name:item.text, Submenu:item.submenus})} key={index}>
              <CategoryAdverts text={item.text}  />
           
      </TouchableOpacity>

            ))
          } 
   
    </View>
  )
}