import { View, Text ,TouchableOpacity} from 'react-native'
import React from 'react'

export default function AddCollection({item,getCollectionId,addLink}) {
  return (
    <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}
        onPress={()=>{
          getCollectionId(item.id,item.name)
          addLink()
        }}
    >
    <View style={{flex:0.2/2,alignItems:'center',justifyContent:'center'}}>
   
    </View>
    <View style={{width:'100%',borderBottomWidth:1,padding:15,borderBottomColor:'#ebebeb'}}>
      <Text style={{fontSize:13,color:'#19181C',fontWeight:'500'}}>{item.name}</Text>
    </View>
  </TouchableOpacity>
  )
}