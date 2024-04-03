import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import IconUser from 'react-native-vector-icons/EvilIcons'
export default function CommentItem({username,comment,date}) {
  return (
    <View style={styles.commentContainer}>
        <View style={styles.header}>
            <View>
            <IconUser name='user' size={40}/>
            </View>
            <View style={{justifyContent:'center'}}>
                <Text>{username}</Text>
            </View>
            
        </View>


        <View style={styles.comment}>
            <Text style={{fontSize:13}}>{comment}</Text>
        </View>
        <View style={styles.date}>
            <Text>{date}</Text>
        </View>
    </View>
  )
}
const styles=StyleSheet.create({
    commentContainer:{
            width:'100%',
            height:80,
           
            display:'flex',
            justifyContent:'space-around',
            flexDirection:'column',
            borderWidth:1,
            padding:2,
            marginTop:5
    },
    header:{
        display:'flex',
        flexDirection:'row',
       
        width:'100%',
        height:'40%'
       
    },
    date:{
        alignItems:'flex-end'
    }
})