import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet ,Dimensions } from "react-native";
import { React, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Heart from "react-native-vector-icons/AntDesign";
import Bookmark from "react-native-vector-icons/FontAwesome";
import Trash from "react-native-vector-icons/Entypo";
import Info from "./Info";

export default function Posts({title,loading,price,image,location,m2,roomCount,floor}) {
  const navigation = useNavigation();
  const [heart, setHeart] = useState('hearto');
  const [bookmark, setbookmark] = useState('bookmark-o')
  const changeHeart = () => {
    setHeart(heart === 'hearto' ? 'heart' : 'hearto');

  };
  const changeBookmark = () => {
    setbookmark(bookmark === 'bookmark-o' ? 'bookmark' : 'bookmark-o')
  }
   const formattedPriceZero = parseFloat(price).toLocaleString('tr-TR', {
     style: 'currency',
     currency: 'TRY',
   });
  formattedPrice=formattedPriceZero.replace(/,00$/,'')
  return (
    <TouchableOpacity >
      <View style={styles.container}>
        
        <View style={styles.İlan}>
         
            
           
            <View style={{ width: '35%' }}>
         <View style={{backgroundColor:'#E54242',padding:2,width:'90%'}}>
          <Text style={{fontSize:9,color:'white',}}>42342343243</Text>
         </View>
        <Image source={{uri:image}}
          style={{ width: '90%', height: '90%', }} />
      </View>
          
       
          <View style={styles.container2}>
            <View style={styles.captionAndIcons}>
              <View style={styles.caption}>
                <Text style={{fontSize:11}} numberOfLines={3}>{title}</Text>
              </View>
              <View style={styles.ıcons}>
                <TouchableOpacity onPress={changeBookmark}>
                  <View
                    style={styles.ıconContainer}
                  >
                    <Bookmark name={bookmark} size={15} color={bookmark == 'bookmark-o' ? 'black' : 'red'} />
                  </View>
                  </TouchableOpacity>
                 
                      <TouchableOpacity onPress={()=>{
                        changeHeart();

                      }}>
                  <View
                    style={styles.ıconContainer}
                  >
                   <Heart name={heart} size={15} color={heart=='hearto'?'black':'red'} /> 
                   
                  </View>
                </TouchableOpacity>
               
                  

              </View>
            </View>

            <View style={styles.PriceAndButtons}>
                <View style={{flex:1/2,alignItems:'center'}}>
                    <Text style={{color:'#264ABB',fontWeight:'600',fontSize:12, left:20} }>{formattedPrice}₺</Text>
                    </View>
                <View style={styles.btns}>
                    <TouchableOpacity style={styles.addBasket}>
                      <Text style={{color:'white',fontWeight:'500',fontSize:12}}>Sepete Ekle</Text>
                    </TouchableOpacity>
                   
                </View>
            </View>
          </View>


        </View>
        <View style={{backgroundColor:'#E8E8E8',height:30,display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{display:'flex',flexDirection:'row' }} >
          <Info text={m2 + 'm2'}/>
          <Info text={roomCount}/>
          <Info text={floor + 'Katlı'}/>
          </View>
         <View style={{justifyContent:'center',}}>
          <Text style={styles.InformationText}>{location}</Text>
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
    padding: 3,
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
  paddingTop:10,
  alignItems:'center',
   flexDirection:'row-reverse',

 justifyContent:'center'
    
  },
  caption: {
    width: '60%',
   
  },
  ıcons:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
      gap:width>400? 13:15,
   bottom:5,
   paddingLeft:width>400? 5:3,
    padding:width>400? 0:3,
    left: width >400?18:11
  },
  btns:{
    flex:1/2,
    display:'flex',
    flexDirection:'row',
   alignItems:'flex-start'
  },
  addBasket:{
    paddingLeft:20,
    paddingRight:20,
    padding:5,
    alignItems:'center',
    backgroundColor:'#264ABB',
    
  },

  ıconContainer:{
      
      width: 28,
      height: 28,
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
    
      
    
  },
  InformationText:{
      fontSize:width>400 ? 12:10,
      right:width>400 ? 10:5
  }

})