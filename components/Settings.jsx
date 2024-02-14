import { View, Text ,ScrollView, StyleSheet} from 'react-native'
import {React} from 'react'
import { useRoute } from '@react-navigation/native';
import SettingsItem from './SettingsItem'
import ShoppinInfo from './ShoppinInfo'

export default function Settings() {
  const route = useRoute();
  const { itemId, otherParam ,konum} = route.params;
  return (
    <View style={{padding:8}}>
    <View style={[styles.card, styles.shadowProp]}>
        <SettingsItem info='İlan No:' numbers='00000000'/>
        <SettingsItem info='Kullanım Durumu' numbers='Boş'/>
        <SettingsItem info='m2 (Brüt:)' numbers='90'/>
        <SettingsItem info='m2 (Net):' numbers='90'/>
        <SettingsItem info='Bina Yaşı:' numbers='0'/>
        <SettingsItem info='Isıtma:' numbers='Doğalgaz Sobası'/>
        <SettingsItem info='Banyo Sayısı:' numbers='1'/>
        <SettingsItem info='Eşyalı:' numbers='Hayır'/>
        <SettingsItem info='Krediye Uygun:' numbers='Evet'/>
        <SettingsItem info='Tapı Durumu:' numbers='Hisseli Tapu'/>
        <SettingsItem info='Bahçe Metrekaresi:' numbers='100'/>
        <SettingsItem info='Eşyalı' numbers='Evet'/>
        <SettingsItem info='Banyo Sayısı' numbers='1'/>
        <SettingsItem info='Kullanım Durumu' numbers='Boş'/>
         
    </View>
    <View style={styles.Info}>
        <ShoppinInfo/>
        </View>
       
    </View>
  )
}
const styles=StyleSheet.create({
  card: {  
      top:7,
    backgroundColor: '#FFFFFF',  
    
    paddingVertical: 22,  
    paddingHorizontal: 5,  
    width: '100%',  
    marginVertical: 10,  
    height:600,
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