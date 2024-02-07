import { View, Text,StyleSheet,TextInput, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import AddBtn from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/EvilIcons'
import { useNavigation } from "@react-navigation/native";
export default function Header() {
  const navigation = useNavigation();
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
     <View style={{alignItems:'center',left:12}}>
        <Text style={{fontSize:20,fontWeight:'bold',}}>Emlak Sepette</Text>
     </View>
     <View>
      <TouchableOpacity style={{
        
        width:50,
        alignItems: 'center',
        padding:6,
        borderRadius:15
      }}
        onPress={()=>navigation.navigate('Login')}
      >
       <Icon name='user' size={42}/>
      </TouchableOpacity>
     </View>
     
    </View>
  )
}
const styles = StyleSheet.create({
   header:{
    alignItems: 'center',
    height:90,
    display: 'flex',
    flexDirection:'row',
    justifyContent:"space-between",
    padding:12,
    width:'100%',
  
  
  
   }
  })