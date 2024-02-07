import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from "react-native";
import { React,useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Heart from "react-native-vector-icons/AntDesign";
import Share from "react-native-vector-icons/Entypo"
import Bookmark from "react-native-vector-icons/FontAwesome";
import Info from "./Info";

export default function Posts({caption,price,ımage,odaSayısı,metre,katSayısı,location}) {
  const [heart, setHeart] = useState('hearto');
  const [bookmark, setbookmark] = useState('bookmark-o')
  const navigation = useNavigation();
  const changeColor = () => {
    setHeart(heart === 'hearto' ? 'heart' : 'hearto');
   
  };
  const changeBookmark=()=>{
    setbookmark(bookmark==='bookmark-o' ? 'bookmark': 'bookmark-o')
  }
  
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Details")}>
        <View style={styles.container}>
                <View style={styles.post}>
                    <View style={styles.Image}>
                          <ImageBackground source={ımage}
                            style={{width:'100%',height:'100%'}}
                        />
                    </View>
                    <View style={styles.CaptionAndButtons}>
                        <View style={styles.Caption}>
                          <Text style={{
                            fontSize:12,
                              fontWeight:'400'
                           
                          
                          }}>{caption}</Text>
                        </View>
                        <View style={styles.buttons}>
                          <View style={styles.priceAndAddBasketDiv}>
                            <View style={styles.priceAndAddBasket}>
        

                                <View style={styles.btnPrice}>
                                  <Text style={{
                                    color:'#274ABA',
                                    fontWeight:700,
                                    fontSize:13
                                  }}>{price}</Text>
                                </View>

                                <TouchableOpacity style={styles.btnbasket}>
                                  <Text style={{
                                    color:'white',
                                      fontSize:13,
                                      
                                  }} numberOfLines={1}>Sepete Ekle</Text>
                                </TouchableOpacity>
                            </View>

                          </View>
                          <View style={styles.Icons}>
                            <TouchableOpacity>
                                <View style={styles.IconContainer}>
                                  <Share name="share" size={18}/>
                                </View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                <View style={styles.IconContainer}>
                                  <Bookmark name={bookmark} size={18}/>
                                </View>
                                </TouchableOpacity>
                          </View>
                        </View>
                    </View>
                                  <View style={styles.infotmationArea}>
                                    <View style={{display:'flex',flexDirection:'row',gap:15,width:'50%'}}>
                                    <Info text={metre}/>
                                      <Info text={odaSayısı}/>
                                      <Info text={katSayısı}/>
                                    </View>
                                    <View style={{paddingRight:10,width:'50%',alignItems:'flex-end'}}>
                                      <Text>{location}</Text>
                                    </View>
                                     
                                    
                                   
                                  </View>
                </View>
               
        </View>
    </TouchableOpacity>
  );
}
const styles=StyleSheet.create({
  container:{
    display:'flex',
    flexDirection:'column',
    width:'100%',
    
    height:129,
   marginTop:20,
     paddingLeft:7,
     paddingRight:7,
     
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
  post:{
    width:'100%',
    height:'90%',
   
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap'

  },
  Image:{
        width:'40%',
        height:'100%',
        
  },
  Caption:{
      width:'100%',
      height:'50%',
      
      overflow:'hidden'
  },
 

  infotmationArea:{
    width:'100%',
    height:23,
    backgroundColor:'#E8E8E8',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    bottom:15
  },
  CaptionAndButtons:{
    width:'60%',
    height:'100%',
   
    paddingLeft:8,
    paddingRight:8,
    paddingTop:8,
    paddingBottom:5

  },
  buttons:{
    width:'100%',
    height:'50%' ,
   
    display:'flex',
    flexDirection:'row-reverse',
    bottom:20

  },
  Icons:{
    width:'50%',
    height:'100%',
    top:20,
    display:'flex',
    flexDirection:'row',
    gap:16
   
  },
  priceAndAddBasketDiv:{
    width:'50%',
    height:'100%',
   
   alignItems:'center',
   justifyContent:'center'
   
  },
  priceAndAddBasket:{
    width:94,
    height:40,
   
    
    
  },
  btnPrice:{
    backgroundColor:'#DBDBDB',
    alignItems:'center',
   
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
    borderWidth:2,
    borderColor:'#DBDBDB',
    padding:5,
    width:100,
    height:30,
    justifyContent:'center',

  },
  btnbasket:{
      backgroundColor:'#274ABA',
      alignItems:'center',
          
        borderBottomRightRadius:5,
        borderBottomLeftRadius:5,
          width:100,
          height:30,
          padding:5,
          justifyContent:'center',
        borderColor:'#DBDBDB',       
        
        
  },
  IconContainer: {  
          padding:2,
    backgroundColor: '#FFFFFF',  
    borderRadius: '50%',  
      alignItems:'center',
      justifyContent:'center',
      width:30,
      height:30,
    marginVertical: 8,  
    
    borderWidth:0.7,
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

})