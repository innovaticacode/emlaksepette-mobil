import { View, Text ,StyleSheet, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import CategoryAdverts from './CategoryAdverts'
import { useRoute ,useNavigation} from '@react-navigation/native'

export default function CategorieStatus() {
 const [display, setdisplay] = useState(true)
 const route=useRoute()
 const { name, displayNone,previousName,beforName} = route.params;
 const navigation =useNavigation()
 const  showText=()=>{
    setdisplay(!display)
 }
  return (
    <View style={styles.container}>
    <View style={styles.categoryContainer}>
      <Text style={{fontWeight:'bold'}}>{previousName + ' > '+beforName +' > '  + name }</Text>
   {
    name=='İş Yeri'?<>
    <TouchableOpacity onPress={()=>navigation.navigate('AdvertPlace',{name:'Satılık',previousName:previousName,beforName:beforName,antesName:name})}>
    <CategoryAdverts  text='Satılık' click={showText} newRoute={true} />
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>navigation.navigate('AdvertPlace',{name:'Kiralık',previousName:previousName,beforName:beforName,antesName:name})}>
         <CategoryAdverts  text='Kiralık'  click={showText} newRoute={true} />
    </TouchableOpacity>
     <TouchableOpacity onPress={()=>navigation.navigate('AdvertPlace',{name:'Devren Satılık',previousName:previousName,beforName:beforName,antesName:name})}>
     <CategoryAdverts  text='Devren Satılık' click={showText} newRoute={true} />
     </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('AdvertPlace',{name:'Devren Kiralık',previousName:previousName,beforName:beforName,antesName:name})} >
      <CategoryAdverts  text='Devren Kiralık'  click={showText} newRoute={true} />
      </TouchableOpacity>
     
    </>:
    <>
    <TouchableOpacity onPress={()=>navigation.navigate('AdvertPlace',{name:'Satılık',previousName:previousName,beforName:beforName,antesName:name})}>
    <CategoryAdverts  text='Satılık'  click={showText} newRoute={true} />
    </TouchableOpacity>
   <TouchableOpacity onPress={()=>navigation.navigate('AdvertPlace',{name:'Kiralık',previousName:previousName,beforName:beforName,antesName:name})}>
   <CategoryAdverts  text='Kiralık' click={showText} newRoute={true} />
   </TouchableOpacity>
     
    </>
   }
      
      
      <Text style={{display:display? 'none':'flex'}}>Satılıktan geldi</Text>
       
      </View>
    </View>
  )
}
const  styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white'
    }
})