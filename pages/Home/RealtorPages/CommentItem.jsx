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
        <View style={{flexDirection:'row',justifyContent:'space-between',flex:1/2}}>
        {stars.map((selected, index) => (
     
          <Ionicons
          key={index}
            name={'md-star'}
            size={10}
            color={'yellow'}
          />
     
      ))}
  

        </View>
    </View>
  )
}
const styles=StyleSheet.create({
    commentContainer:{
      width:'100%'
    }
})