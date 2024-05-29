import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import CategoryAdverts from './CategoryAdverts';
import Icon2 from 'react-native-vector-icons/AntDesign'
import { Platform } from "react-native";
export default function AdvertsPlace() {
  const propertyTypes = [
    "Villa",
    "Daire",
    "Rezidans",
    "Müstakil Ev",
    "Çiftlik Evi",
    "Köşk & Konak",
    "Yalı",
    "Yalı Dairesi",
    "Yazlık",
    "Prefabrik Ev",
    "Kooperatif",
    "Komple Bina"
  ];
  const businessTypes = [
    "Büro & Ofis",
    "Dükkan Mağaza",
    "Fabrika",
    "İmalathane",
    "Atölye",
    "İş Hanı",
    "Avm",
    "Komple Bina",
    "Plaza",
    "Depo & Antrepo",
    "Kantin",
    "Pastane & Fırın",
    "Düğün Salonu",
    "Çiftlik",
    "Otopark",
    "Restoran & Lokanta",
    "Büfe"
  ];
const arsa=[
  "İmarlı",
  "İmarsız"
]  
const accommodationTypes = [
  "Otel",
  "Apart Otel",
  "Butik Otel",
  "Motel",
  "Pansiyon",
  "Kamp Yeri (Mocamp)",
  "Tatil Köyü"
];
const houseTypes = [
  "Villa",
  "Rezidans",
  "Müstakil Ev",
  "Apartman",
  "Bungalov",
  "Ahşap Ev",
  "Tiny House",
  "Otel"
];
const Tourism=[
  "Otel",
  "Devre Mülk"
]
const Prefabric=[
  "Bungalov",
  "Ahşap Ev",
  "Tiny House"
]

  const route=useRoute()
  const navigation=useNavigation()
  const {name,previousName,beforName,antesName}=route.params;
  return (
    <View style={styles.container}>
       <View style={[styles.card,{}]}>
      <View style={{backgroundColor:'#ebebeb4d',padding:10,borderRadius:50}}>
            <Icon2 name='home' color={'red'} size={17}/>
            </View>
            <Text style={{fontWeight:'bold',fontSize:12}}>{previousName + ' > '+ beforName + ' > ' + antesName +' > '+name}</Text>
      </View>
   
      {propertyTypes.map((item,index)=>(
        <TouchableOpacity key={index} onPress={()=>navigation.navigate('ShareAdvert',{name:item,previousName:previousName,beforName:beforName,antesName:antesName,AndName:name})}>
        <CategoryAdverts text={item} key={index}/>
        </TouchableOpacity>
      ))}
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