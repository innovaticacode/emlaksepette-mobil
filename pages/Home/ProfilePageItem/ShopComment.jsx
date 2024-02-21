import { View, Text } from 'react-native'
import React from 'react'

export default function ShopComment() {
  return (
    <View style={{width:'100%',borderBottomWidth:1,paddingBottom:10,borderBottomColor:'grey'}}>
      <View style={{padding:10,}}>
        <View>
            <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit mollitia quibusdam dolorum cupiditate nesciunt similique quidem, accusamus pariatur laudantium odio facilis, ut consequatur quisquam aspernatur eius officia, repudiandae ipsa doloribus.</Text>
        </View>
        <View style={{display:'flex',flexDirection:'row',top:10,gap:15}}>
                <View style={{width:34,height:34,backgroundColor:'blue',borderRadius:'50%'}}></View>
                <View style={{justifyContent:'center'}}>
                    <Text>Jonathan Greene</Text>
                    <Text style={{fontSize:11,color:'grey'}}>Bireysel Üye | 20 gün önce</Text>
                    </View>
        </View>
      </View>
    </View>
  )
}