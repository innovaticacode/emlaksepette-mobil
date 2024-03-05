import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import CategoryAdverts from './CategoryAdverts';


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
      <Text style={{fontWeight:'bold'}}>{previousName + ' > '+ beforName + ' > ' + antesName +' > '+name}</Text>
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
        }
})