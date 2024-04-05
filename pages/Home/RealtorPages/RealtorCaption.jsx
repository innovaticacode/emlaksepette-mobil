import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

export default function RealtorCaption({data}) {
    const caption=data?.housing?.description.replace(/<[^>]+>|&[a-zA-Z]+;|[%&]|&gt;/g, '')
  return (
    <View style={{paddingLeft:8,paddingRight:8}}>
    <View style={[styles.card, styles.shadowProp]} indicatorStyle='white'>

    <Text>{caption}</Text>

    </View>
 
    </View>
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