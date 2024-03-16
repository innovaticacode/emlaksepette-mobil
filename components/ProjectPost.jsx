import { View, Text, StyleSheet, ImageBackground, TouchableOpacity ,Dimensions,Image} from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
export default function ProjectPost({caption,ımage,location,city, mahalle,acıklama,ShoppingName,ShoppingMail,ShopingInfo,Phone, ProfilImage,slug,ProjectNo,loading}) {
    const navigation = useNavigation();
    const generateRandomColorCode = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    
    const RandomColor=generateRandomColorCode()
  return (
    <TouchableOpacity style={{marginTop:10,padding:10}} onPress={() =>  navigation.navigate('Details', { 
     name:caption,
       otherParam: caption,
       konum:location ,
       ımage:ımage,
      sehir:city,
      mahalle:mahalle,
      acıklama:acıklama,
      ShoppingName:ShoppingName,
      ShoppingMail:ShoppingMail,
      ShopingInfo:ShopingInfo,
      Phone:Phone,
      slug:slug,
      ProjectId:ProjectNo
      
       })}>

      
           <View style={styles.container}>
      <ImageBackground source={{uri:ımage}} 
                         style={{ width: '100%', height: '100%' }}/>
     <View style={styles.ShoppingName}>
     <View style={styles.ShopImage}>
     <Image source={{uri:ProfilImage}} style={{width:'50%',height:'90%',}} resizeMode='cover' />
     </View>
     <View style={styles.ShopText}>
        <Text style={{color:'white',fontSize:8,textAlign:'center',fontWeight:'500'}}>{location} / {city}</Text>
     </View>
     </View>

     <View style={[styles.Description,{backgroundColor:RandomColor+'CC',padding:10}]}>
       <Text style={{color:'#FFFFFF',fontWeight:'800',fontSize:17,textAlign:'center'}}>{caption}</Text>
     </View>
      
   
         
    </View>
        
         
        
   
      

    </TouchableOpacity>
  )
}
const { width, height } = Dimensions.get('window');
const styles=StyleSheet.create({
    container:{
            
            height:width>400? 250:200,
            alignItems:'center',
            top:10,
        
            display:'flex',
            flexDirection:'row',
           
    },
   ShoppingName:{
   position:'absolute',
   width:'30%',
   backgroundColor:'#FFFFFF',
  left:0,
  height:'40%',
  display:'flex',
  flexDirection:'column',
  
   },
   ShopImage:{

    height:'75%',
   alignItems:'center',
   justifyContent:'center'
   },
   ShopText:{
  height:'25%',
    backgroundColor:'black',
    justifyContent:'center'
   },
   Description:{
    width:'40%',
    height:'100%',
    position:'absolute',
    right:0,
      alignItems:'center',
      justifyContent:'center'
   }
})
{/* <Text style={{fontSize:11,fontWeight:'300'}}>{location} / {city} / {mahalle}</Text> */}
{/* <View style={styles.ımageBackground}>
                       
                </View> */}
                 {/* <View>
                      <Text style={{fontSize:12,fontWeight:'500' }}>{caption}</Text>
                      // // </View> */}
                      // <Text style={{fontSize:11,fontWeight:'300'}}> {location}/{city} </Text>