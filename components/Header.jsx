import { View, Text,StyleSheet,TextInput, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import AddBtn from 'react-native-vector-icons/AntDesign'

export default function Header() {
  return (
    <View style={styles.header}>
     <View style={{
      
        width:50,
        height:50,
     }}>
     <ImageBackground source={require('../images/Logo2.jpeg')} resizeMode='cover'  style={{
        flex: 1,
        justifyContent: 'center',
        
    }}/>
     </View>
     <View>
        <Text style={{fontSize:20,fontWeight:'bold',left:22,}}>Emlak Sepette</Text>
     </View>
     <View>
      <TouchableOpacity style={{
        backgroundColor:'red',
        width:90,
        alignItems: 'center',
        padding:6,
        borderRadius:15
      }}>
        <Text style={{color:'white',fontWeight:'bold'}}>Giriş Yap</Text>
      </TouchableOpacity>
     </View>
     
    </View>
  )
}
const styles = StyleSheet.create({
   header:{
    alignItems: 'center',
    height:100,
    display: 'flex',
    flexDirection:'row',
    justifyContent:"space-between",
    padding:15,
    paddingTop:35,
  
   }
  })