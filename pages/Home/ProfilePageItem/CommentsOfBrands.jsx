import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import CommentItem from '../RealtorPages/CommentItem'

export default function CommentsOfBrands({data}) {
    console.log(data.data.owners)
  return (
    <View style={{padding:10,gap:10}}>
        <View style={{width:'100%',padding:5,backgroundColor:'#EDEFF7',flexDirection:'row'}}>
            <View style={{width:'50%',backgroundColor:'red',padding:2}}>
                <View>

                </View>
            </View>

        </View>
            <ScrollView horizontal contentContainerStyle={{gap:10}} showsHorizontalScrollIndicator={false}>
      {
                data.data.owners.map((item,i)=>(
                    <CommentItem comment={item?.comment} rate={item?.rate} username={item?.username} key={i} date={item?.created_at} />
                ))
      }
    </ScrollView>
    </View>

  )
}




