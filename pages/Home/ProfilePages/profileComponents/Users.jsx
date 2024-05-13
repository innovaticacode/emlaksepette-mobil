import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Users({name,id,index}) {
    const navigation =useNavigation()
  return (
    <View style={style.container}>
     <View style={style.UserContainer}>
        <View style={style.Name}>
            <Text>{index+1}</Text>
                <Text>{name}</Text>
        </View>
        <View style={style.buttons}>
                <TouchableOpacity style={style.butons}
                    onPress={()=>navigation.navigate('CreateUserType',{ header: 'yeni ekleden geldi', name: 'Kullanıcı Güncelle', hidden2: 'none'  ,hidden4: 'none' })}
                >
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
            backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingVertical: 7,
    paddingHorizontal: 5,
    width: "100%",

    gap:5,
    borderWidth: 1,
    borderColor: "#f4f4f4",
    ...Platform.select({
      ios: {
        shadowColor: "#f4f4f4",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
    
        },
        UserContainer:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
         
            padding:8
        },
        Name:{
            flex:1/2,
            flexDirection:'row',
            gap:10,
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