import { View, Text ,StyleSheet,ScrollView} from 'react-native'
import React from 'react'
import ShoppinInfo from './ShoppinInfo'

export default function Caption({acıklama}) {
  return (
    
    <View style={{paddingLeft:10,paddingRight:10}}>
    <ScrollView style={[styles.card, styles.shadowProp]} indicatorStyle='white'>
    <Text>{acıklama}</Text>


    </ScrollView>
    <View style={styles.Info}>
        <ShoppinInfo/>
        
        </View>
    </View>
   
  )
}
const styles=StyleSheet.create({
  card: {  
        top:1,
        
    backgroundColor: '#FFFFFF',  
    
     paddingTop:10,
    paddingHorizontal: 15,  
    width: '100%',  
    marginVertical: 10,  
  
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