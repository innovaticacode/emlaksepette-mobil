import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView} from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableWithoutFeedback, Keyboard, } from 'react-native'
import CommentItem from './CommentItem'
import UploadIcon from 'react-native-vector-icons/AntDesign'
import { CheckBox } from '@rneui/themed';
export default function Comment() {
  
  const [checked, setChecked] = React.useState(false);
  const toggleCheckbox = () => setChecked(!checked);
  const [checked2, setChecked2] = React.useState(false);
  const toggleCheckbox2 = () => setChecked2(!checked2);
  const comments = [
    {
      username: 'user',
      comment: 'sdfsldfsdlfsd',
      date: '05/03/2000',
      id: 1
    },
    {
      username: 'user',
      comment: 'sdfsldfsdlfsd',
      date: '05/03/2000',
      id: 2
    },
    {
      username: 'user',
      comment: 'sdfsldfsdlfsd',
      date: '05/03/2000',
      id: 3
    }

  ]



  const [starStates, setStarStates] = useState([false, false, false, false, false]);

  const handleStarPress = (index) => {
    const newStarStates = starStates.map((_, i) => i <= index);
    setStarStates(newStarStates);
  };



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
            <ScrollView horizontal contentContainerStyle={{padding:10,backgroundColor:'red'}} >
            <CommentItem username='user'/>
      

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