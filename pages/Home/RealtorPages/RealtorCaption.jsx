import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { Shadow } from 'react-native-shadow-2';
import HTML from 'react-native-render-html';
export default function RealtorCaption({data}) {
    const caption=data?.housing?.description
  return (
    <Shadow  style={{width:'100%',margin:5}} paintInside={false}>
    <View style={{padding:10,}} >

  
    <HTML source={{ html: caption}}  contentWidth={100}/>
  

    </View>
    </Shadow>
   
  )
}
const styles=StyleSheet.create({
    card: {  
        
    
      backgroundColor: '#FFFFFF',  
      paddingBottom:10,
       paddingTop:10,
      paddingHorizontal: 15,  
      width: '100%',  
     
    
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
    Info: {
  
      width: '100%',
     
    
    }
  })