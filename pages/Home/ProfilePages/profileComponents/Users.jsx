import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import { Platform } from "react-native";
export default function Users({name,id,index,item,deleteUser,isChoosed,SelectUserFunc}) {
    const navigation =useNavigation()
    const [ishighlated, setishighlated] = useState(false)
  return (
    <TouchableOpacity style={[style.container,{borderWidth:ishighlated && isChoosed? 1:0, borderColor:'red'}]}
            disabled={!isChoosed}
            onPress={()=>{
                SelectUserFunc(item.id)
                    setishighlated(!ishighlated)
                
               
            }}
    >
     <View style={style.UserContainer}>
        <View style={style.Name}>
            <Text>{index+1}</Text>
                <Text>{name}</Text>
        </View>
        <View style={style.buttons}>
                <TouchableOpacity style={style.butons}
                    onPress={()=>navigation.navigate('UpdateUserType',{ UserID:item.id , name:name})}
                >
                    <Text style={style.btnText}>Güncelle</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.butons} onPress={()=>{
                    deleteUser(item.id,item.name)
                }}>
                    <Text style={style.btnText}>Sil</Text>
                </TouchableOpacity>
        </View>
     </View>
    </TouchableOpacity>
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