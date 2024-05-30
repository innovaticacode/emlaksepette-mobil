import { View, Text ,StyleSheet, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import CategoryAdverts from './CategoryAdverts'
import { useRoute ,useNavigation} from '@react-navigation/native'
import Icon2 from 'react-native-vector-icons/AntDesign'
import { Platform } from "react-native";
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
    <View style={[styles.card,{}]}>
      <View style={{backgroundColor:'#ebebeb4d',padding:10,borderRadius:20}}>
            <Icon2 name='home' color={'red'} size={17}/>
            </View>
            <Text style={{fontWeight:'bold',fontSize:12}}>{previousName + ' > '+beforName +' > '  + name }</Text>
      </View>
    
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
    },
    card:{
      flexDirection:'row',
      alignItems:'center',
      gap:8,
      backgroundColor: '#FFFFFF',  
      borderRadius: 5,  
      paddingVertical: 12,  
      paddingHorizontal: 10,  
      width: '100%',  
      marginVertical: 5,  
    
      borderWidth:0.7,
      borderColor:'#CED4DA',
      ...Platform.select({
          ios: {
            shadowColor: ' #e6e6e6',
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
          },
          android: {
            elevation: 5,
          },
        }),
    }
})