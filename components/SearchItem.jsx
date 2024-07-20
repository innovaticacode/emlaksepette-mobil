import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
export default function SearchItem() {
  return (
    <TouchableOpacity style={{padding:7,borderBottomWidth:1,borderBottomColor:'#ebebeb'}}>
        <View style={{flexDirection:'row',alignItems:'center',gap:10,}}>
            <TouchableOpacity style={{padding:5,borderRadius:50}}>
                   <Icon  name='close' size={18} color={'grey'}/> 
            </TouchableOpacity>
            <View style={{width:'80%',}}>
            <Text style={{fontSize:12,fontWeight:'500',color:'#333'}} numberOfLines={1}>MASTER VİLLAS ERZİNCAN</Text>
            </View>
          
        </View>
   
    </TouchableOpacity>
  )
}