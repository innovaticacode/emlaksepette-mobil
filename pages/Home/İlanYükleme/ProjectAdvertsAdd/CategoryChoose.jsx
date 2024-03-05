import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import CategoryAdverts from './CategoryAdverts'
import { useRoute , useNavigation} from '@react-navigation/native';

export default function CategoryChoose() {
  const navigation=useNavigation()
    const  route = useRoute();
    const { name,previousName} = route.params;
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
      
      <Text style={{fontWeight:'bold'}}>{ previousName +' > ' +name}</Text>
   {
    categories.map((item,index)=>(
      <TouchableOpacity key={index} onPress={()=>navigation.navigate('CategorieStatu',{name:item.title ,previousName:previousName ,beforName:name })}>
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