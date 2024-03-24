import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
export default function Categories({category,ıconDisplay,displayIcon}) {
  return (
   
      <View style={styles.category}>
      {/* <View style={styles.IconContainer}>
    
                  <View
                    style={[styles.ıcons ,{display:displayIcon==='none'?'none':'flex'}]}
                  >
                    <Icon name='home' size={18} color={'white'} />
                  </View>
                
      </View> */}
      {/* <View style={[styles.CategoryItem,{borderBottomWidth:ıconDisplay==='none'? 0:1 ,}]}>
    
      </View>
      <View style={[styles.IconContainer2,{borderBottomWidth:ıconDisplay==='none'? 0:1}]}>
       
      </View> */}
      <View style={{flex:1.7/2,flexDirection:'row',}}>
         
      <Text style={{fontSize:19,color:'#333',fontWeight:'500'}}>{category}</Text>
      </View>
      <View style={{flex:0.3/2,alignItems:'center',justifyContent:'center'}}>
      <Icon name='arrow-forward-ios'size={18} color={'#bebebe'} style={{display:ıconDisplay==='none'? 'none':'flex',}}/>
      </View>
      </View>
 
   
  )
}
const styles=StyleSheet.create({
  category:{
   
      margin:5,
     padding:8,
      display:'flex',
      flexDirection:'row',
    borderBottomWidth:1,
    borderBottomColor:'#ebebeb'
     
  },


 
})