import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView} from 'react-native'
import React, { useState ,useEffect} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableWithoutFeedback, Keyboard, } from 'react-native'

import UploadIcon from 'react-native-vector-icons/AntDesign'
import { CheckBox } from '@rneui/themed';
import { Shadow } from 'react-native-shadow-2';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { getValueFor } from './methods/user'
import CommentItem from '../pages/Home/RealtorPages/CommentItem'
export default function CommentForProject({projectId}) {
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
  const [user, setuser] = useState({});

  useEffect(() => {
    getValueFor("user", setuser);
  }, []);
 const [comments, setcomments] = useState([])
  const fetchData = async () => {
    try {
      if (user?.access_token ) {
       
        const response = await axios.get(
          `https://private.emlaksepette.com/api/project/${projectId}/comments`,
        );
            setcomments(response.data)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    
    }
  };
useEffect(() => {
    fetchData()
}, [user])

console.log(comments)
const totalRate = comments.map(item => parseFloat(item?.rate) || 0).reduce((acc, rate) => acc + rate, 0); 
  return (
    <Shadow startColor='#ebebeb'>
    <View style={styles.container} onTouchMove={()=>Keyboard.dismiss()}>
      <View style={{padding:10,gap:10}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <Text style={{color:'#333',fontSize:17}}>Yorumlar</Text>
            
            </View>
            <View>
              <View style={{flexDirection:'row',gap:5}}> 
                {/* <Text>{data?.housingComments?.rate}</Text> */}
                <Text>
                    {
                      totalRate ?
                      (totalRate /comments.length).toFixed(1):
                      ''
                    }
                 
                  
                  </Text>
                  {
                        totalRate ?
                        <Text>|</Text>:''
                  }
               
                <Text>{comments.length} Yorum</Text>
              </View>
            </View>
            <ScrollView horizontal contentContainerStyle={{padding:10,gap:10}} showsHorizontalScrollIndicator={false} >
               
                       
              {
                comments.length <1?
                 <View style={{width:'100%'}}>
                     <Text style={{textAlign:'center',color:'red'}}>Bu konut için yorum yapılmadı</Text>
                 </View>
              :
                comments.map((itemComment,_index)=>(
                  <CommentItem username={'Anonim'} key={_index} comment={itemComment?.comment} date={itemComment?.created_at} rate={itemComment.rate} image={itemComment.images}/>
                ))
              }
        
         
      

            </ScrollView>
            {
              user.access_token && 
              <View>
            <TouchableOpacity
              onPress={()=>{
                  navigation.navigate('AddCommentForProject',{projectId :projectId})
              }}
            style={{
              backgroundColor:'#E54242',
           
              padding:8,
              borderTopRightRadius:10,
              borderBottomRightRadius:10,
              borderBottomLeftRadius:15
            }}>
        <Text style={{textAlign:'center',color:'white'}}>Yorum Yap</Text>
      </TouchableOpacity>
            </View>
            }
            
         
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