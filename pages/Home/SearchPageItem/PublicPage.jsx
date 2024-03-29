import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRoute ,useNavigation} from '@react-navigation/native'
import Categories from '../../../components/Categories';
import CategoryAdverts from '../İlanYükleme/ProjectAdvertsAdd/CategoryAdverts';

export default function PublicPage() {

    const navigation=useNavigation()
    const route=useRoute();
    const{id,data,name}=route.params;
    const goToSubCategoriesPage = (subcategories) => {
       
      };
    
  return (
    <View style={{backgroundColor:'white',flex:1}}>
          <View>
          {
            data.map((item,index)=>(
              <TouchableOpacity onPress={()=>navigation.navigate('SubCategory',{name:item.text, Submenu:item.submenus})} key={index}>
              <CategoryAdverts text={item.text}  />
           
      </TouchableOpacity>

            ))
          }     
    </View>
           
          
    </View>
  )
}
  {/* {category.subcategories.map((subcategory, subIndex) => (
            <Text key={subIndex}>{subcategory}</Text>
          ))} */}