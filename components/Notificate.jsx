import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'

import Icon from 'react-native-vector-icons/AntDesign'
export default function Notificate({name,time}) {
  
  return (
  
    <View style={styles.container}>
      <View style={{flexDirection:'row',paddingTop:15}}>
            <View style={{flex:0.2/2,alignItems:'center'}}>
                <Icon name='home' size={20}/>
            </View>
            <View style={{flex:1.8/2,gap:8}}>
                <Text style={{fontSize:13,color:'#ea2b2e'}}>Emlak Sepette Yönetimi</Text>
                <Text>{name}</Text>
                <Text style={{color:'grey',textAlign:'right',right:10}}>{time}</Text>
            </View>
            
      </View>
    </View>
  
    
  )
}
const styles=StyleSheet.create({
    container:{
        borderTopWidth:1,
        borderTopColor:'#ebebeb',
        borderBottomWidth:1,
        borderBottomColor:'#ebebeb',
        paddingTop:5
    },
   
})  



