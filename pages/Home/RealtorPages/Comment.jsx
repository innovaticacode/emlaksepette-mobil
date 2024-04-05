import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView} from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableWithoutFeedback, Keyboard, } from 'react-native'
import CommentItem from './CommentItem'
import UploadIcon from 'react-native-vector-icons/AntDesign'
import { CheckBox } from '@rneui/themed';
export default function Comment({data}) {
  
  const [checked, setChecked] = React.useState(false);
  const toggleCheckbox = () => setChecked(!checked);
  const [checked2, setChecked2] = React.useState(false);
  const toggleCheckbox2 = () => setChecked2(!checked2);




  const [starStates, setStarStates] = useState([false, false, false, false, false]);

  const handleStarPress = (index) => {
    const newStarStates = starStates.map((_, i) => i <= index);
    setStarStates(newStarStates);
  };


console.log(data.housingComments[0].comment)
const dateObject = new Date(data.housingComments.created_at)
const formattedDate = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
console.log(formattedDate)
  return (
    
    <View style={styles.container} onTouchMove={()=>Keyboard.dismiss()}>
      <View style={{padding:2,gap:10}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <Text style={{color:'#333',fontSize:17}}>Yorumlar</Text>
              <TouchableOpacity style={{backgroundColor:'#EA2C2E',paddingLeft:12,paddingRight:12,padding:4,borderRadius:5}}>
                <Text style={{textAlign:'center',fontSize:13,color:'white'}}>Tüm Yorumlar</Text>
              </TouchableOpacity>
            </View>
            <View>
              <View style={{flexDirection:'row',gap:5}}> 
                <Text>4.4</Text>
                <Text>10 puan</Text>
                <Text>|</Text>
                <Text>5 Yorum</Text>
              </View>
            </View>
            <ScrollView horizontal contentContainerStyle={{padding:10,gap:10}} showsHorizontalScrollIndicator={false} >
              {
                data.housingComments.map((itemComment,_index)=>(
                  <CommentItem username={itemComment.user.name} key={_index} comment={itemComment.comment} date={`${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`}/>
                ))
              }
        
         
      

            </ScrollView>
      </View>
    </View>
   
  )
}
const styles = StyleSheet.create({

  container: {
    width: '100%',
    paddingLeft:8,
    paddingRight:8
   

  },
 


});