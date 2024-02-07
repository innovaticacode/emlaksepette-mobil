import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from "react-native";
import { React,useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Heart from "react-native-vector-icons/AntDesign";
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
        <TouchableOpacity style={[styles.card, styles.shadowProp,styles.Icons]}
                      onPress={changeColor}
                    >
                      <Heart name={heart} size={19} color={heart=='hearto'?'black':'red'}  />
                    </TouchableOpacity>
                  
          <View style={styles.post}>
                <View style={styles.Image}>
                  
                  <ImageBackground
                    source={ımage}
                    style={{width:'100%',height:'100%'}}
                    borderRadius={'5'}
                    />
                 
                </View>
                <View style={styles.Caption}>
                  <Text style={{color:'black',fontSize:15}}>{caption}...</Text>
                 <View style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>

                 <TouchableOpacity style={{
                    width:'40%',
                    height:'60%',
                    borderRadius:5,
                    top:15,
                    backgroundColor:'#264ABB',
                    alignItems:'center',
                    justifyContent:'center',
                    padding:5
                  }}>
                    <Text style={{color:'white'}}>Sepete Ekle</Text>
                  </TouchableOpacity>
                  <View style={{width:'50%', alignItems:'flex-end',justifyContent:'center'}}>
                  <Text style={{fontWeight:'bold',top:5 ,color:'#264ABB'}}>{price}</Text>
                  </View>
                    
                 </View>
                 
                </View>
                {/* */}

          </View>
          <View style={styles.infotmationArea}>
              <View style={{width:'55%',display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                 <Info text={metre}/>
                 <Info text={odaSayısı} />
                 <Info text={katSayısı}/>
              </View>
              <View style={{width:'45%',justifyContent:'center',padding:5}}>
                <Text style={{textAlign:'right'}}>{location}</Text>
              </View>
          </View>
                    <View style={{
                        width:'100%',
                        backgroundColor:'#E5E5E5',
                        height:2,
                        bottom:10
                    }}></View>
        </View>
    </TouchableOpacity>
  );
}
const styles=StyleSheet.create({
  container:{
    width:'100%',
    height:160,
   
    marginTop:0,
    justifyContent:'center',
    padding:5,
    overflow:'hidden',
    display:'flex',
    
    

   
  },
  post:{
    width:'90%',
    height:'75%',
    padding:4,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  Image:{
        alignItems:'center',
        width:'30%',
        height:80
  },
  Caption:{
      
    width:'80%',
    marginLeft:'3%'
  },
  Icons:{
    height:'19%',
    borderRadius:'50%',
    width:'8%',
   position:'absolute',
    paddingLeft:4,
    paddingTop:2,
  top:-2,
  left:'20%',  
   zIndex:9999,
   
   
  },
  card: {  
    backgroundColor: '#FFFFFF9E',  
    borderRadius: '50%',  
    
    paddingHorizontal: 3,  
    width: '100%',  
    marginVertical: 10,  
    height:30,
    width:30,
    alignItems:'center',
    justifyContent:'center',
   
  },  
  shadowProp: {  
    shadowOffset: {width: -2, height: 4},  
    shadowColor: '#171717',  
    shadowOpacity: 0.2,  
    shadowRadius: 3,  
  },
  infotmationArea:{
    width:'100%',
    height:40,
    backgroundColor:'#EFEFEF',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    bottom:15
  }

})