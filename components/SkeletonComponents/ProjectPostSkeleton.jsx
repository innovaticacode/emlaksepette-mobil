import { View, Text, StyleSheet, ImageBackground, TouchableOpacity ,Dimensions,Image} from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { Skeleton } from '@rneui/themed';
import ProjectPost from '../ProjectPost';
export default function ProjectPostSkeleton({}) {
   
  return (
  
    <TouchableOpacity style={{ backgroundColor:'#ebebeb'}} >


           <View style={styles.container}>
    
     <View style={styles.ShoppingName}>
       
     <View style={styles.ShopImage}>
      <Skeleton circle width={50} height={50} skeletonStyle={{backgroundColor:'#dbdbdb'}} style={{backgroundColor:'#ced4da'}} />
     </View>
   
    <Skeleton style={styles.ShopText} skeletonStyle={{backgroundColor:'#dbdbdb'}} />
    
   
     </View>
  
    <Skeleton style={styles.Description} skeletonStyle={{backgroundColor:'#dbdbdb'}} />
    
    
      
   
         
    </View>

         
        
   
      

    </TouchableOpacity>
   
  )
}
const { width, height } = Dimensions.get('window');
const styles=StyleSheet.create({
    container:{
            
            height:width>400? 200:200,
            alignItems:'center',
          
        
            display:'flex',
            flexDirection:'row',
           
    },
   ShoppingName:{
   position:'absolute',
   width:'30%',
   backgroundColor:'#ced4da',
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
    
    justifyContent:'center'
   },
   Description:{
    backgroundColor:'#ced4da',
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