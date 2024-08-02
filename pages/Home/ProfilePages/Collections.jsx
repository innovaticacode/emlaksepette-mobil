
import { View, Text, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import CollectionsTab from '../Panel/CollectionsTab'
import CollectionsGraphic from '../Panel/CollectionsGraphic'


export default function Collections() {
 const [tab, settab] = useState(0)
  return (
    <View style={{flex:1}} >
    <View style={{flexDirection:'row',justifyContent: 'space-between',backgroundColor:'#fff'}}>
    <TouchableOpacity 
    onPress={()=>{
        settab(0)
    }}
            style={{
                padding:12,
                width:'45%',
                borderBottomWidth: tab==0 ?1:0,
                borderBottomColor:'#EA2C2E'
            }}>
                <Text style={{color: tab==0 ? '#EA2C2E':'#404040',fontWeight:'500',textAlign:'center',fontSize:15}}>Koleksiyonlar</Text>
            </TouchableOpacity>
       
            <TouchableOpacity 
               onPress={()=>{
                settab(1)
            }}
            style={{
                padding:12,
                width:'50%',
                 borderBottomWidth: tab==1 ?1:0,
                borderBottomColor:'#EA2C2E'
            }}>
                <Text style={{color: tab==1 ? '#EA2C2E':'#404040',textAlign:'center',fontSize:15}}>Koleksiyon İstatistikleri</Text>
            </TouchableOpacity>
         
           
    </View>
            {tab == 0 && <CollectionsTab/>}
            {tab==1 && <CollectionsGraphic/>}
    
 
    </View>
  )
}