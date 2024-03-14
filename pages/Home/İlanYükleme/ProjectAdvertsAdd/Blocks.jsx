import { View, Text,TouchableOpacity } from 'react-native'
import {useState}from 'react'

export default function Blocks({text,id,remove}) {
    const [selectedblock, setselectedblock] = useState(false)
  return (
    <View style={{paddingTop:15,gap:1}} key={id}>
             
    <TouchableOpacity style={{backgroundColor:'red',width:'100%',padding:20, borderRadius:5,paddingLeft:30,paddingRight:30,borderWidth:1,borderColor:'red'}}
     
    >
      <Text style={{textAlign:'center',color:'white'}}>{text}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{backgroundColor:'red',width:'100%',padding:5, borderBottomLeftRadius:10,borderBottomRightRadius:10}}
     onPress={()=>{
        remove(text)
     }}
    >
      <Text style={{textAlign:'center',color:'white'}}>Sil</Text>
    </TouchableOpacity>
  </View>
  )
}