import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { ImageBackground } from 'react-native'
import Icon from "react-native-vector-icons/Entypo"
import Icon2 from 'react-native-vector-icons/SimpleLineIcons'
import { useNavigation } from '@react-navigation/native'
export default function RentOrder({display,openSheet}) {
    const navigation=useNavigation();
  return (
    <TouchableOpacity onPress={()=>{
        navigation.navigate('RentOrderDetail',{display})
    }}>
    <View style={styles.container}>
      <View style={styles.Post}>
            <View style={styles.Image}>
                <ImageBackground source={require('./home.jpg')} style={{width:'100%',height:'100%'}} borderRadius={20}/>
            </View>
            <View style={styles.CaptionArea}>
                    <View style={{padding:4}}> 
                        <Text style={{fontSize:14}}>Master Orman Köy Proje Arsaları</Text>
                    </View>
                    <View style={{flexDirection:'row',padding:4,gap:8}}>
                    <Text style={{fontSize:12}}>27-28 Şubat 2024</Text>
                    
                    <Text style={{fontSize:12}}>-  2500 ₺</Text>
                    </View>
                   <View style={{padding:4,flexDirection:'row',alignItems:'center',gap:5}}>
                    <Icon name='check'/>
                    <Text style={{fontSize:13}}>Onaylandı</Text>
                   </View>
                   
            </View>
        
      </View>
      <TouchableOpacity style={[styles.AgainReservation,{display:display}]}>
      <View style={{flexDirection:'row',gap:10,justifyContent:'center'}}>
           <View>
            <Icon name='back-in-time' size={20}/>
           </View>
           <View style={{justifyContent:'center'}}>
            <Text>Yeniden rezervasyon yap</Text>
           </View>
           </View>
           <View style={{alignItems:'center',justifyContent:'center'}}>
           <Icon2 name='arrow-right' color={'grey'} size={15}/>
           </View>
      </TouchableOpacity>
    </View>
    </TouchableOpacity>
  )
}

const styles=StyleSheet.create({
    container:{
        width:'100%',
       
        padding:2,
        borderWidth:1.5,
        borderRadius:5,
        backgroundColor: '#FFFF',  
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
          })
    },
    Image:{
       
      
        height:70,
        borderRadius:20,
       flex:0.4/2
    },
    Post:{
        display:'flex',
        flexDirection:'row',
       gap:10,
        padding:10,
        borderBottomWidth:1,
        borderBottomColor:'#ebebeb'
    },
    CaptionArea:{
        flex:1.5/2,
       
    },
    AgainReservation:{
        width:'100%',
        padding:10,
        flexDirection:'row',
        justifyContent:'space-between'
      
    }
})