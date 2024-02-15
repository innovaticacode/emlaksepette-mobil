import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import SliderItem from './SliderItem'
import SettingsItem from './SettingsItem'
import { useNavigation } from '@react-navigation/native'
export default function ShoppinInfo({flex,bottom,top}) {
    const navigation=useNavigation()
    return (
        <TouchableOpacity onPress={()=>navigation.navigate('ShopProfile')}>
        <View style={{padding:0,display:flex,}}>

        <View style={[styles.card, styles.shadowProp, {bottom:bottom},{top:0}]}>
            <Text style={{
                fontSize: 12,
                bottom:5,
                left:10
            }}>Mağaza Bilgileri</Text>
             
            <View style={styles.InfoView}>
                <View style={{
                    width: 70,
                    height: 70,
                    borderRadius: 30,
                    margin: 6,
                    bottom:4
                
                   

                }}>
                    <ImageBackground source={require('../images/Logo.jpeg')} resizeMode='cover' style={{
                        flex: 1,
                        justifyContent: 'center',

                    }} />
                </View>
                <View style={{ width:'100%', left:10}}>
                    <Text style={{
                        fontSize: 12,
                        color: '#222222'
                    }}>Master Realtor Apex Gayrimenkul</Text>
                    <Text style={{
                        fontSize: 11,
                        color: '#666666'
                    }}
                    >Gayrimenkul Ofisi</Text>
                </View>

            </View>
            <View style={{ width: '100%', height: 200,display:'flex' }}>
                   <SettingsItem info='İlan No' numbers='0000000'/>
                   <SettingsItem info='İl-İlçe-Mahalle' numbers='Batman Merkez KuyuBaşı'/>
                   <SettingsItem info='Proje Tipi' numbers='Satılık Konut'/>
                   <SettingsItem info='E-Posta' numbers='masterrealtorbatman@gmail.com'/>

            </View>
        </View>
        </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    InfoView: {
        top:10,
        width: '100%',
        height: 95,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
     

    },
    card: {  
        
        backgroundColor: '#FFFFFF',  
        
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
     
})