import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import SettingsItem from './SettingsItem'
import { useRoute } from '@react-navigation/native';
export default function Information() {
  const route = useRoute();
  const { itemId, otherParam ,konum} = route.params;
  return (
    <View style={{padding:8}}>
    <View style={[styles.card, styles.shadowProp]}>
        <SettingsItem info='Proje Adı' numbers={otherParam}/>
        <SettingsItem info='Proje Durumu' numbers='Devam Eden Projeler'/>
        <SettingsItem info='Mağaza' numbers='Maliyetine Ev'/>
        <SettingsItem info='İl/İlçe/Mahalle' numbers='İstanbul/Kartal/Cevizli'/>
        <SettingsItem info='Telefon' numbers='444444'/>
        <SettingsItem info='E-Posta' numbers='fsdfsdf@fds.com'/>
        <SettingsItem info='Konut Tipi' numbers='Villa'/>
        <SettingsItem info='Toplam Konut Sayısı' numbers='50'/>
        <SettingsItem info='Satışa Açık Konut Sayfası' numbers='50'/>
        <SettingsItem info='Satılan Konut Sayısı' numbers='0'/>
        <SettingsItem info='Satışa Kapalı İlan Sayısı' numbers='Hisseli Tapu'/>
        <SettingsItem info='Eşyalı' numbers='Evet'/>
        <SettingsItem info='Banyo Sayısı' numbers='1'/>
        <SettingsItem info='Kullanım Durumu' numbers='Boş'/>

    </View>
   
       
    </View>
  )
}

const styles=StyleSheet.create({
    card: {  
      backgroundColor: '#FFFFFF',   
      paddingVertical: 20,  
      paddingHorizontal: 10,  
      width: '100%',  
      marginVertical: 10,  
      height:'auto',
      borderWidth:0.7,
      borderColor:'grey',
     top:20
    
      
    },  
    shadowProp: {  
      shadowOffset: {width: -1, height: 1},  
      shadowColor: 'grey',  
      shadowOpacity: 0.1,  
      shadowRadius: 1,  
    },
    Info: {
      
      width: '100%',
      top: 20,
      height: 240
    }
  })