import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRoute ,useNavigation} from '@react-navigation/native'
import Categories from '../../../components/Categories';
import CategoryAdverts from '../İlanYükleme/ProjectAdvertsAdd/CategoryAdverts';

export default function PublicPage() {

    const navigation=useNavigation()
    const route=useRoute();
    const{name,categories,subcategories}=route.params;
    const goToSubCategoriesPage = (subcategories) => {
        navigation.navigate('SubCategory', { subcategories });
      };
  return (
    <View style={{backgroundColor:'white',flex:1}}>
          <View>
      {categories.map((category, index) => (
                <TouchableOpacity key={index}onPress={()=>navigation.navigate('HomeList',{})} >
                    <CategoryAdverts text={category.name}/>
                  
            </TouchableOpacity>

       
      ))}
    </View>
           
          
    </View>
  )
}
  {/* {category.subcategories.map((subcategory, subIndex) => (
            <Text key={subIndex}>{subcategory}</Text>
          ))} */}