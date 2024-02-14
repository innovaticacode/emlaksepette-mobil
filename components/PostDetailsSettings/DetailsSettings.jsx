import { View, Text , StyleSheet } from 'react-native'
import React from 'react'
import SettingsItem from '../SettingsItem'
import ShoppinInfo from '../ShoppinInfo'
import { useRoute } from '@react-navigation/native';
export default function DetailsSettings() {
    const route = useRoute();
    const { itemId, otherParam ,konum ,key,location,metre,katSayısı,odaSayısı} = route.params;
  return (
    <View style={{padding:8}}>
    <View style={[styles.card, styles.shadowProp]}>
        <SettingsItem info='İlan No:' numbers='000000'/>
        <SettingsItem info='Kullanım Durumu' numbers='Boş'/>
        <SettingsItem info='m2 (Brüt:)' numbers={metre}/>
        <SettingsItem info='m2 (Net):' numbers={metre}/>
        <SettingsItem info='Bina Yaşı:' numbers='0'/>
        <SettingsItem info='Isıtma:' numbers='Doğalgaz Sobası'/>
        <SettingsItem info='Banyo Sayısı:' numbers='1'/>
        <SettingsItem info='Krediye Uygun:' numbers='Evet'/>
        <SettingsItem info='Tapı Durumu:' numbers='Hisseli Tapu'/>
       
        
    </View>
    <View style={styles.Info}>
        <ShoppinInfo/>
        </View>
       
    </View>
  )
  
}
const styles=StyleSheet.create({
  card: {  
        
    backgroundColor: '#FFFFFF',  
     top:6,
    paddingVertical: 22,  
    paddingHorizontal: 5,  
    width: '100%',  
    marginVertical: 10,  
    height:340,
    borderWidth:0.7,
    borderColor:'#e6e6e6',
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
  
    
  },
    Info: {
        
      width: '100%',
      top: 20,
      height: 240
    }
  })