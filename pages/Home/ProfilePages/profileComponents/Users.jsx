import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Users({name}) {
  return (
    <View style={style.container}>
     <View style={style.UserContainer}>
        <View style={style.Name}>
                <Text>{name}</Text>
        </View>
        <View style={style.buttons}>
                <TouchableOpacity style={style.butons}>
                    <Text style={style.btnText}>Güncelle</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.butons}>
                    <Text style={style.btnText}>Sil</Text>
                </TouchableOpacity>
        </View>
     </View>
    </View>
  )
}
const style=StyleSheet.create({
        container:{
            top:10,
          
        },
        UserContainer:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            borderTopWidth:1,
            borderBottomWidth:1,
            borderBottomColor:'#ebebeb',
            borderTopColor:'#ebebeb',
            padding:8
        },
        Name:{
            flex:1/2,
          
          
            padding:10
        },
        buttons:{
            flex:1/2,
     
            flexDirection:'row',
            justifyContent:'center',
            gap:20,
            
        },
        butons:{
            backgroundColor:'#E54242',
            paddingLeft:15,
            paddingRight:15,
            justifyContent:'center',
            borderRadius:10
        },
        btnText:{
            color:"white",
            fontWeight:'bold'
        }
    })