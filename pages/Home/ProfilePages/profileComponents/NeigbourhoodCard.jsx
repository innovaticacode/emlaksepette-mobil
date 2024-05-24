import { View, Text,StyleSheet, TouchableOpacity,Linking } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { Platform } from "react-native";
export default function NeigbourhoodCard() {
    const handleOpenPhone = () => {
        // Telefon uygulamasını açmak için
        Linking.openURL('tel:+905537064474');
      };
  return (
    <View style={styles.contain}>
        <View style={{flexDirection:'row',gap:3}}>
            <Text style={styles.Text}>Mülk Sahibi Adı:</Text>
            <Text  style={styles.Text}>Kerem Bozmaz</Text>
        </View>
        <View style={{flexDirection:'row',gap:3}}>
            <Text style={styles.Text}>Mülk Sahibi Telefonu:</Text>
            <Text  style={styles.Text}>(553) 706 44 74</Text>
        </View>
        <View  style={{paddingTop:15}}>
            <Text style={{textAlign:'center',fontSize:18,color:'#333',fontWeight:'500'}}>Master Sonsuz Tatil Köyü Projesinden 3 No'lu Konut </Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',padding:10,gap:10}}>
            <TouchableOpacity style={{backgroundColor:'#D1ECF1',flex:1/2,padding:10,borderRadius:6,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:10}}
            onPress={handleOpenPhone}
            >
                <Icon name='phone' color={'#0C5460'}/>
                <Text style={{textAlign:'center',color:'#0C5460',}}>Ara</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#D4EDDA',flex:1/2,padding:10,borderRadius:6}} >
                <Text style={{color:'#457C54',textAlign:'center'}}>İlanı Görüntüle</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    contain:{
    
       gap:10,
        backgroundColor: '#FFFFFF',  
        borderRadius: 10,  
        paddingVertical: 22,  
        paddingHorizontal: 10,  
        width: '100%',  
     
       
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
    Text:{
        color:'#333'
    }
})