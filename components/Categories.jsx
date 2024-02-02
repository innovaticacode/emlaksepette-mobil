import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
export default function Categories({category}) {
  return (
    <TouchableOpacity>
    <View style={{
        backgroundColor:'transparent',
        height:50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        marginTop:15,
        borderBottomWidth:0.3
        
    }}>
   
        <View style={{alignItems:'center',justifyContent:'center',padding:5,display:'flex',flexDirection:'row'}}>
        <Icon name='home' size={30}/>
            <Text style={{fontSize:20,left:10,color:'black'}}>{category}</Text>
        </View>
        <View style={{justifyContent:'center'}}>
            <Icon name='arrow-forward-ios' size={25} color={'black'}/>
        </View>
      
    </View>
    </TouchableOpacity>
  )
}