import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import ShoppinInfo from './ShoppinInfo'
import { GestureHandlerRootView,ScrollView} from 'react-native-gesture-handler';
export default function Caption({acıklama}) {
  return (
  
    <View style={[styles.card,{paddingLeft:10,paddingRight:10,zIndex:2}]}>
<View style={{height:500}}>
    <GestureHandlerRootView>
  <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
 
  <Text>

{acıklama}

</Text>

</ScrollView>
</GestureHandlerRootView>
</View> 

   
    
  
   


   
  
  
    <View style={styles.Info}>
        <ShoppinInfo/>
        
        </View>
        </View>
  )
}
const styles=StyleSheet.create({
  card: {  
        top:1,
          flex:1,
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