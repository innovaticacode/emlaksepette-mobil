import { View, Text, Image,  } from 'react-native'
import React from 'react'









export default function RealtorClubItem({description,ımage,colorcss}) {
  return (
    <View>
        <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#333'}}>
            <View style={{flex:0.2/2,backgroundColor:'#EA2A29',padding:5,}}>
            <View style={{width:'100%',height:55}}>
                    <Image source={ımage} style={{width:'100%',height:'100%', tintColor:colorcss?'white':null}} resizeMode='contain' />
            </View>
            </View>

            <View style={{padding:5,flex:1.8/2,borderRadius:5,backgroundColor:'#333'}}>
            <Text style={{color:'white',fontWeight:'400',fontSize:12}} >{description}</Text>
            </View>
      
        </View>
     
    </View>
  )
}