import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView} from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableWithoutFeedback, Keyboard, } from 'react-native'
import CommentItem from './CommentItem'
import UploadIcon from 'react-native-vector-icons/AntDesign'
import { CheckBox } from '@rneui/themed';
import { Shadow } from 'react-native-shadow-2';
import { useNavigation } from '@react-navigation/native'
export default function Comment({data, handleModal}) {
  const navigation = useNavigation()
  const [checked, setChecked] = React.useState(false);
  const toggleCheckbox = () => setChecked(!checked);
  const [checked2, setChecked2] = React.useState(false);
  const toggleCheckbox2 = () => setChecked2(!checked2);




  const [starStates, setStarStates] = useState([false, false, false, false, false]);

  const handleStarPress = (index) => {
    const newStarStates = starStates.map((_, i) => i <= index);
    setStarStates(newStarStates);
  };





  return (
    <Shadow startColor='#ebebeb'>
    <View style={styles.container} onTouchMove={()=>Keyboard.dismiss()}>
      <View style={{padding:10,gap:10}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <Text style={{color:'#333',fontSize:17}}>Yorumlar</Text>
            
            </View>
            <View>
              <View style={{flexDirection:'row',gap:5}}> 
                <Text>{data?.housingComments?.rate}</Text>
                <Text>10 puan</Text>
                <Text>|</Text>
                <Text>{data?.housingComments?.length} Yorum</Text>
              </View>
            </View>
            <ScrollView horizontal contentContainerStyle={{padding:10,gap:10}} showsHorizontalScrollIndicator={false} >
               

              {
                 data?.housingComments?.length <1?
                 <View style={{width:'100%'}}>
                     <Text style={{textAlign:'center',color:'red'}}>Bu konut için yorum yapılmadı</Text>
                 </View>
              :
                data?.housingComments?.map((itemComment,_index)=>(
                  <CommentItem username={itemComment?.user?.name} key={_index} comment={itemComment?.comment} date={itemComment?.created_at} rate={itemComment.rate}/>
                ))
              }
        
         
      

            </ScrollView>
            <View>
            <TouchableOpacity
              onPress={()=>{
                  navigation.navigate('AddComment',{HouseID:data.housing.id})
              }}
            style={{
              backgroundColor:'#E54242',
              width:'30%',
              padding:8,
              borderTopRightRadius:10,
              borderBottomRightRadius:10,
              borderBottomLeftRadius:15
            }}>
        <Text style={{textAlign:'center',color:'white'}}>Yorum Yap</Text>
      </TouchableOpacity>
            </View>
         
      </View>
    
    </View>
    </Shadow>
  )
}
const styles = StyleSheet.create({

  container: {
    width: '100%',
    paddingLeft:8,
    paddingRight:8
   

  },
 


});