import { View, Text, StyleSheet, ImageBackground, TouchableOpacity ,Dimensions,Image} from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { Skeleton } from '@rneui/themed';
import ProjectPost from '../ProjectPost';
export default function ProjectPostSkeleton({}) {
   
  return (
    <Skeleton animation='pulse'  height={250}  skeletonStyle={{backgroundColor:'#ebebeb',padding:5}}>
    <TouchableOpacity style={{marginTop:10,padding:10}}>


           <View style={styles.container}>
        <Skeleton animation='pulse' skeletonStyle={{backgroundColor:'#ebebeb'}} >
     <View style={styles.ShoppingName}>
       
     <View style={styles.ShopImage}>

     </View>
   

     <View style={styles.ShopText}>
        <Text style={{color:'white',fontSize:8,textAlign:'center',fontWeight:'500'}}></Text>
     </View>
   
     </View>
     </Skeleton>
    <Skeleton  animation='pulse' skeletonStyle={{backgroundColor:'#ebebeb'}} >
     <View style={[styles.Description,{padding:10}]}>
       <Text style={{color:'#FFFFFF',fontWeight:'800',fontSize:17,textAlign:'center'}}></Text>
     </View>
     </Skeleton>
      
   
         
    </View>

         
        
   
      

    </TouchableOpacity>
    </Skeleton>
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