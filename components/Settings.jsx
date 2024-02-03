import { View, Text ,ScrollView} from 'react-native'
import React from 'react'
import SettingsItem from './SettingsItem'

export default function Settings() {
  return (
    <View style={{borderWidth:0.3}}>
        <SettingsItem info='İlan No' numbers='0000000'/>
        <SettingsItem info='Peşin Fiyat' numbers='2.500.000'/>
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
  )
}