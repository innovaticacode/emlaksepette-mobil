import { View, Text, SafeAreaView ,StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import CategoryAdverts from './ProjectAdvertsAdd/CategoryAdverts'
import { useNavigation, useRoute } from '@react-navigation/native'

export default function Projeİlanı() {
  const route=useRoute()
  const{name}=route.params;
  const navigation =useNavigation()
  return (
   <SafeAreaView style={styles.container}>
   
      <View style={styles.categoryContainer}>
        <TouchableOpacity onPress={()=>navigation.navigate('CategorieChoose',{name:'Tamamlanan Projeler',previousName:'Proje'})} >
        <CategoryAdverts text='Tamamlanan Projeler'/>
        </TouchableOpacity>
       <TouchableOpacity onPress={()=>navigation.navigate('CategorieChoose',{name:'Devam Eden Projeler',previousName:'Proje'})}>
       <CategoryAdverts text='Devam Eden Projeler'/>
       </TouchableOpacity>
     <TouchableOpacity onPress={()=>navigation.navigate('CategorieChoose',{name:'Topraktan Projeler',previousName:'Proje'})}>
     <CategoryAdverts text='Topraktan Projeler'/>
     </TouchableOpacity>
       
       
      </View>
   </SafeAreaView>
  )
}

const  styles = StyleSheet.create({
  container: {
      flex:1,
      padding:20,
      backgroundColor:'white'
  },
  categoryContainer:{
    
   
  }
})