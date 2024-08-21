import { View, Text ,TouchableOpacity} from 'react-native'
import React from 'react'

export default function AddCollection({removeItemOnCollection,checkFunc,item,getCollectionId,addLink,setPopUpForRemoveItem}) {
  var itemCheck = checkFunc(item.id);
  return (
    <TouchableOpacity style={{flexDirection:'row',alignItems:'center',backgroundColor:(itemCheck ? '#F8D7DA' : 'transparent')}}
        onPress={()=>{
          getCollectionId(item.id,item.name)
          if(itemCheck){
            setTimeout(() => {
                setPopUpForRemoveItem(true)
            }, 500);
            // setPopUpForRemoveItem(true)
            removeItemOnCollection(item.id,item?.name)
          }else{
            addLink(item.id,item.name)
          }
        }}
    >
  

  <View style={{width:'100%',borderBottomWidth:1,padding:15,borderBottomColor:'#ebebeb',flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={{fontSize:13,color: itemCheck? '#58151C':'#19181C',fontWeight:'500'}}>{item.name}</Text>
      <Text style={{fontSize:13,color: itemCheck? '#58151C':'#19181C',fontWeight:'500'}}>{item.links.length}</Text>
    </View>
  
     


    
  
  </TouchableOpacity>
  )
}