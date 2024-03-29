import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Feather'
export default function ProfileSettingsItem({text,ıconName,IconType,IconFeather}) {
  return (
    
    <View style={style.ıtem}>
     <View style={{display:'flex',flexDirection:'row',}}>
        <View style={{flex:1.3/2,display:'flex',flexDirection:'row',gap:10}}>
         {
          IconType===true?
          <Icon2 name={IconFeather} size={18} color={'#333'}/>:
          <Icon name={ıconName} size={18} color={'#333'}/>
         
         }
          
          
          
          <Text style={{fontSize:15,color:'#333'}}>{text}</Text>
        </View>
        <View style={{flex:0.7/2,alignItems:'flex-end'}}>         
          <Icon name='arrow-forward-ios' size={16} color={'#bebebe'}/>
        </View>
     </View>
    </View>
    
  )
}
const style=StyleSheet.create({
  ıtem:{
    marginTop:5,
    padding:10,
    borderBottomWidth:0.5,
    borderBottomColor:'#bebebe',
   
  
 
  }
})