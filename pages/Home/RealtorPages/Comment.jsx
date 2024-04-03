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
      <View style={styles.commentArea}>
        <View style={styles.card}>
          <View style={{ width: '30%' }}>
            <Text style={{
              fontSize: 17
            }}>Yorumlar</Text>
            <View style={{
              width: '100%',
              backgroundColor: 'red',
              height: 2,

            }}></View>
          </View>

          <ScrollView style={{ height: '20%', }}>
            <View>
              <Text style={{display:comments.length===0? 'flex':'none'}}>Bu konut içi henüz yorum yapılmadı</Text>
              {
                comments.map((item,index)=>(
                  <CommentItem username={item.username} comment={item.comment} date={item.date} key={item.id}/>
                ))
              }
            
             
            </View>

          </ScrollView>
        </View>

        <View style={styles.addComment}>
          <View style={{ width: '100%', display: 'flex', flexDirection: 'column',gap:7 }}>
            <View>
              <Text style={{
                fontSize:18
              }}>Yeni Yorum Ekle</Text>
               <View style={{
              width: '100%',
              backgroundColor: 'red',
              height: 2,

            }}></View>
            </View>

            <View style={{display: 'flex', flexDirection: 'row',top:5}}>
              {starStates.map((isStarred, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleStarPress(index)}
                >
                  <View>
                    <Icon
                      name={isStarred ? 'star' : 'star-o'}
                      size={30}
                      color={isStarred ? 'gold' : 'black'}
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
                  <View>
                    <TextInput style={styles.ınput} placeholder='Yorumu Girin...'/>
                  </View>
        </View>

        <View style={styles.uploadPhoto}>
          <View style={styles.uploadItem1}>
            <View>
              <Text style={{
                fontSize:18,
                bottom:10

              }}>Emlak Fotoğrafı Ekle</Text>
            </View>

            <View style={{
             width:'100%',
             height:'100%',
          
            
            }}>
                <TouchableOpacity style={styles.uploadBtn}>
                  <Icon name='camera' size={30}/>
                </TouchableOpacity>
            </View>

          </View>
          <View style={styles.uploadItem2}>
          <CheckBox
           checked={checked}
           onPress={toggleCheckbox}
           // Use ThemeProvider to make change for all checkbox
           iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank-outline"
           checkedColor='#264ABB'
           title={'Yorumlarda ismimin gözükmesine ve yorum detaylarının site genelinde kullanılmasına izin veriyorum aydınlatma metnine ulaşmak için tıklayınız'}
         />
         <CheckBox
           checked={checked2}
           onPress={toggleCheckbox2}
           iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon={'checkbox-blank-outline'}
           checkedColor='#264ABB'
            title={'Değerlendirme yapmak için kullanıcı sözleşmesini kabul ediyorum'}
         />
          </View>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.buton}>
            <Text style={{
              fontSize: 22,
              color: 'white'
            }}>Gönder</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
   
  )
}
const styles = StyleSheet.create({

  container: {
    width: '100%',
    height: '100%',
    top: 5,
 
    alignItems: 'center'
  },
  commentArea: {
    width: '96%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 5
    
    
  },
  card: {
   
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 22,
    paddingHorizontal: 5,
    width: '100%',
    marginVertical: 10,
    height: '25%',
    borderWidth: 0.7,
    borderColor: '#e6e6e6',
    ...Platform.select({
      ios: {
        shadowColor: ' #e6e6e6',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        
      },
      android: {
        elevation: 5,
      },
    }),


  },
  addComment: {
    width: '100%',
    height: '25%',
   
  },
  uploadPhoto: {
    width: '100%',
    height: '30%',
    
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  },
  uploadItem1: {
    width: '100%',
    height: '60%',
    backgroundColor: 'white'
  },
  uploadItem2: {
    width: '100%',
    height: '50%',
    backgroundColor: 'white'
  },
  btnContainer: {
    width: '100%',
    
    height: '7%',
    top:60
  },
  buton: {
    backgroundColor: '#264ABB',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'

  },
  ınput:{
    top:10,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    padding:15,
        fontSize:20,
    width: '100%',
    marginVertical: 10,
    height: '50%',
    
    borderWidth: 0.7,
    borderColor: '#e6e6e6',
    ...Platform.select({
      ios: {
       
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  uploadBtn:{
    width:'28%',
    height:'80%',
    backgroundColor:'#e6e6e6',
    alignItems:'center',
    justifyContent:'center',
    borderWidth:2,
    borderColor:'grey',
    borderStyle:'dashed'
  }


});