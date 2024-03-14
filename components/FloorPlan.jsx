import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ShoppinInfo from './ShoppinInfo'

export default function FloorPlan() {
  return (
    <View style={{padding:9,top:1}}>
    <View style={styles.container}>
      <View style={{
        width:'100%',
       
        backgroundColor:'#EA2C2E',
        padding:12,
        
      }}>
        <Text style={{
            color:'white',
            fontSize:12,
            fontWeight:'600'
        }}>Vaziyet planı belirtilmedi</Text>
      </View>
    </View>
    <View style={{bottom:15}}>
    <ShoppinInfo/>
        
        </View>
    </View>
  )
}
const styles=StyleSheet.create({
    container:{
   
     
     
              
      backgroundColor: '#FFFFFF',  
     
    
      paddingVertical: 10,  
      paddingHorizontal: 5,  
      width: '100%',  
     
      height:'auto',
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

    }
})