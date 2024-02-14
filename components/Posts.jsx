import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet ,Dimensions } from "react-native";
import { React, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Heart from "react-native-vector-icons/AntDesign";
import Bookmark from "react-native-vector-icons/FontAwesome";
import Info from "./Info";

export default function Posts({ caption, location, price, ımage ,metre,odaSayısı,katSayısı,No}) {
  const navigation = useNavigation();
  const [heart, setHeart] = useState('hearto');
  const [bookmark, setbookmark] = useState('bookmark-o')
  const changeHeart = () => {
    setHeart(heart === 'hearto' ? 'heart' : 'hearto');

  };
  const changeBookmark = () => {
    setbookmark(bookmark === 'bookmark-o' ? 'bookmark' : 'bookmark-o')
  }
  return (
    <TouchableOpacity onPress={() => navigation.navigate("PostDetails", { caption: caption, location: location, price: price ,metre:metre,odaSayısı:odaSayısı,katSayısı:katSayısı})}>
      <View style={styles.container}>
        
        <View style={styles.İlan}>
          <View style={{ width: '35%' }}>
          <View style={{
            position:'absolute',
            zIndex:1,
            left:0,
            backgroundColor:'#EA2C2E',
            padding:2
            }}>
          <Text style={{color:'white',fontWeight:'500'}}>No {No}</Text>
          </View>
            <Image source={ımage}
              style={{ width: '90%', height: '90%', }} />
          </View>
          <View style={styles.container2}>
            <View style={styles.captionAndIcons}>
              <View style={styles.caption}>
                <Text style={{fontSize:12}}>{caption.substring(0, 40)}...</Text>
              </View>
              <View style={styles.ıcons}>
                <TouchableOpacity onPress={changeBookmark}>
                  <View
                    style={styles.ıconContainer}
                  >
                    <Bookmark name={bookmark} size={18} color={bookmark == 'bookmark-o' ? 'black' : 'red'} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={changeHeart}>
            <View
              style={styles.ıconContainer}
            >
              <Heart name={heart} size={18} color={heart=='hearto'?'black':'red'} />
            </View>
          </TouchableOpacity>
              </View>
            </View>

            <View style={styles.PriceAndButtons}>
                <View><Text style={{color:'#264ABB',fontWeight:'600',fontSize:12}}>{price}</Text></View>
                <View style={styles.btns}>
                    <TouchableOpacity style={styles.addBasket}>
                      <Text style={{color:'white',fontWeight:'500',fontSize:12}}>Sepete Ekle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.PayDetailBtn}>
                      <Text style={{fontWeight:'500',fontSize:12}}>Ödeme Detayı</Text>
                    </TouchableOpacity>
                </View>
            </View>
          </View>


        </View>
        <View style={{backgroundColor:'#E8E8E8',height:30,display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{display:'flex',flexDirection:'row'}} >
          <Info text={metre}/>
          <Info text={odaSayısı}/>
          <Info text={katSayısı}/>
          </View>
         <View style={{justifyContent:'center'}}>
          <Text style={{fontSize:12}}>{location}</Text>
         </View>

        </View>
      </View>
    </TouchableOpacity>
  );
}
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 150,
   
    marginTop: 10,
   
    display: 'flex',
    flexDirection: 'column',
    borderBottomWidth:1,
    borderBottomColor:'#E5E5E5'

  },
  İlan: {
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
   
    justifyContent: 'space-between'
  },
  container2: {
    flex: 1,
   
    display: 'flex',
    flexDirection: 'column',

  },
  captionAndIcons: {
    height: '50%',
    
    display: 'flex',
    flexDirection: 'row',

  },
  PriceAndButtons: {
    height: '50%',
   
    
  },
  caption: {
    width: '60%',
   
  },
  ıcons:{
    display:'flex',
    flexDirection:'row',
      gap:width>400? 20:15,
    alignItems:'center',
    justifyContent:'center',
    padding:width>400? 10:3
  },
  btns:{
    display:'flex',
    flexDirection:'row',
   
  },
  addBasket:{
    width:'50%',
    alignItems:'center',
    backgroundColor:'#264ABB',
    padding:6
  },
  PayDetailBtn:{
    width:'50%',
    alignItems:'center',
    backgroundColor:'transparent',
    padding:6, 
    borderWidth:0.5
  },
  ıconContainer:{
    
      width: 35,
      height: 35,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
      backgroundColor: '#FFFF',  
     
       
   
     
      
      borderColor:'#e6e6e6',
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
    
      
    
  }

})