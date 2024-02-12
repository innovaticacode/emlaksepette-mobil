import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import SettingsItem from './SettingsItem'

export default function Information() {
  return (
    <View style={{padding:8}}>
    <View style={[styles.card, styles.shadowProp]}>
        <SettingsItem info='Proje Adı' numbers='Master Sonsuz Tatil Köyü'/>
        <SettingsItem info='Proje Durumu' numbers='Devam Eden Projeler'/>
        <SettingsItem info='Taksitli Toplam Fiyat' numbers='3.500.000'/>
        <SettingsItem info='Peşinat' numbers='490.000'/>
        <SettingsItem info='Taksit Sayısı' numbers='36'/>
        <SettingsItem info='m2 (Brüt)' numbers='120'/>
        <SettingsItem info='m2 (Net)' numbers='120'/>
        <SettingsItem info='Oda Sayıs' numbers='3+1'/>
        <SettingsItem info='Kat Sayısı' numbers='2'/>
        <SettingsItem info='Isıtma Şömine' numbers='3.500.000'/>
        <SettingsItem info='Tapı Durumu' numbers='Hisseli Tapu'/>
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