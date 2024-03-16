import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
export default function Categories({category,ıconDisplay,displayIcon}) {
  return (
   
      <View style={styles.category}>
      <View style={styles.IconContainer}>
    
                  <View
                    style={[styles.ıcons ,{display:displayIcon==='none'?'none':'flex'}]}
                  >
                    <Icon name='home' size={18} color={'white'} />
                  </View>
                
      </View>
      <View style={[styles.CategoryItem,{borderBottomWidth:ıconDisplay==='none'? 0:1}]}>
      <Text>{category}</Text>
      </View>
      <View style={[styles.IconContainer2,{borderBottomWidth:ıconDisplay==='none'? 0:1}]}>
        <Icon name='arrow-forward-ios'size={16} color={'#bebebe'} style={{display:ıconDisplay==='none'? 'none':'flex', left:7}}/>
      </View>
      </View>
 
   
  )
}
const styles=StyleSheet.create({
  category:{
     
      margin:2,
     
      display:'flex',
      flexDirection:'row',
     
  },
  IconContainer:{
   padding:5,
    
    width:'11%'
  },
  CategoryItem:{
    width:'75%',
   
    justifyContent:'center',
    borderBottomWidth:1, 
    borderBottomColor:'#e5e5e5',
    left:15
  },
  IconContainer2:{
    padding:11,
     
     width:'10%',
     borderBottomWidth:1, 
     borderBottomColor:'#e5e5e5',
     alignItems:'center',
     justifyContent:'center'
   },
   ıcons:{
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: 'green',  
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