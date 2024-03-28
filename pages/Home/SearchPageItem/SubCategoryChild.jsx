import { View, Text,TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useRoute,useNavigation } from '@react-navigation/native'
import CategoryAdverts from '../İlanYükleme/ProjectAdvertsAdd/CategoryAdverts'
import PostDetail from '../../PostDetail'
import HomeList from './HomeList'

export default function SubCategoryChild() {
    const route = useRoute()
    const {name,Submenu}=route.params;
    const navigation=useNavigation()
  return (

    <View style={{backgroundColor:'white',flex:1}}>
        <ScrollView>
     
     {
        Submenu.map((item,index)=>(
            <TouchableOpacity onPress={()=>navigation.navigate('HomeList',{name:item.text, Submenu:item.submenus})} key={index}>
            <CategoryAdverts text={item.text}  />
         
    </TouchableOpacity>
        ))
     }
     </ScrollView>
    </View>
  )
}