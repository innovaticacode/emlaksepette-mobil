import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import IconUser from 'react-native-vector-icons/EvilIcons'
 import Ionicons from 'react-native-vector-icons/Ionicons'
export default function CommentItem({username,comment,date}) {
    const [stars, setStars] = useState([false, false, false, false, false]);

    const handleStarPress = (index) => {
      const newStars = stars.map((star, i) => (i <= index ? true : false));
      setStars(newStars);
    };
  
    const handleLastStarPress = () => {
      const allYellow = stars.every((star) => star === true);
      const newStars = allYellow ? [false, false, false, false, false] : [true, true, true, true, true];
      setStars(newStars);
    };
  
  return (
    <View style={styles.commentContainer}>
        <View style={{width:'100%',backgroundColor:'#ebebeb',padding:10,borderRadius:10,height:120}}>
          <View style={{flex:0.4/2,flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{flex:1/2,flexDirection:'row'}}>
          {stars.map((selected, index) => (
     
     <Ionicons
     key={index}
       name={'md-star'}
       size={9}
       color={'gold'}
     />
   
   ))}
  
          </View>
          <View style={{flex:1/2,alignItems:'flex-end'}}>
                <Text style={{fontSize:13,color:'grey'}}>{date}</Text>
            </View>
          </View>
          <View style={{flex:0.3/2, width:'100%'}}>
          <Text style={{fontSize:12,color:'#333'}}>{username}</Text>
          </View>
          <View style={{flex:1.5/2,paddingTop:5}}>
              <Text numberOfLines={3}>{comment}</Text>
          </View>
         

        </View>
    </View>
  )
}
const styles=StyleSheet.create({
    commentContainer:{
      width:250,
    
    }
})     
 {/* {stars.map((selected, index) => (
     
  <Ionicons
  key={index}
    name={'md-star'}
    size={10}
    color={'yellow'}
  />

))}   */}