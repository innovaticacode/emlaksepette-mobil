import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Dot from "react-native-vector-icons/Entypo"
import Icon from "react-native-vector-icons/Ionicons"
import Icon2 from "react-native-vector-icons/FontAwesome5"
import { useNavigation } from '@react-navigation/native'
export default function CollectionsItem({openBottom, disabled}) {
    const navigation=useNavigation()
  return (
    <TouchableOpacity style={{alignItems:'center'}} onPress={()=>{
           
        }} 
        
        disabled={disabled}>
    <View style={style.container}>

     <View style={style.header}>
        <View style={{flex:1/2,flexDirection:'row',gap:8,alignItems:'center'}}>
            <Dot name='eye' size={17} color={'#EA6361'}/>
            <Text style={{color:'#EA6361'}}>0 Görüntülenme</Text>
        </View>
        <View  style={{flex:1/2,alignItems:'flex-end'}}>
            <TouchableOpacity onPress={openBottom}>
            <Dot name='dots-three-vertical' size={20}/>
            </TouchableOpacity>
           
        </View>
     </View>
     <View style={{padding:20,gap:10}}>
        <View style={{flexDirection:'row',gap:5}}>
            <Text>Koleksiyon Adı:</Text>
            <Text style={{color:'#EA6361'}}>Kartal</Text>
        </View>
        <View style={{flexDirection:'row',gap:5}}>
            <Text>İlan Sayısı:</Text>
            <Text style={{color:'#EA6361'}}>3</Text>
        </View>
     </View>
     <View style={{gap:10}}>
        <View>
            <TouchableOpacity style={{width:'100%',backgroundColor:'#FFEFCA',padding:8,flexDirection:'row',justifyContent:'center',gap:6}}>
                <Icon name='pencil' size={15} color={'#BD3803'}/>
                <Text style={{textAlign:'center',color:'#BD3803',fontWeight:'500'}}>DÜZENLE</Text>
            </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity style={{width:'100%',backgroundColor:'#C7EBFF', padding:8,flexDirection:'row',justifyContent:'center',gap:10}}>
            <Dot name='eye' size={15} style={{textAlign:'center'}}color={'#025787'}/>
                <Text style={{textAlign:'center',color:'#025787',fontWeight:'500'}}>ÖNİZLE</Text>
            </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity style={{width:'100%',backgroundColor:'#DAFBD0',padding:8,flexDirection:'row',justifyContent:'center',gap:10}}>
            <Icon2 name='copy'size={15} color={'#1F6F11'}/>
                <Text style={{textAlign:'center', color:'#1F6F11',fontWeight:'600'}}>LİNKİ KOPYALA</Text>
            </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity style={{width:'100%',backgroundColor:'#DAFBD0',padding:8,flexDirection:'row',justifyContent:'center',gap:10}}>
            <Icon name='logo-whatsapp' size={18} color={'#1F6F11'}/>
                <Text style={{textAlign:'center' ,color:'#1F6F11',fontWeight:'600'}}>WHATSAPPTA PAYLAŞ</Text>
        </TouchableOpacity>
        </View>

     </View>
        
    </View>
    </TouchableOpacity>
  )
}
const style=StyleSheet.create({
    container:{
    width:'100%',
    backgroundColor: '#FFFFFF',

    paddingVertical: 25,
    paddingHorizontal: 20,
    width: '90%',
    marginVertical: 10,
  borderRadius:4,
    borderWidth: 1,
    borderColor: '#e6e6e6',
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
    header:{
            display:'flex',
            flexDirection:'row',
           borderBottomWidth:1,
           borderBottomColor:'#ebebeb',
           padding:10,
    }
})