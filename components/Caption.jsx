import { View, Text ,StyleSheet,Platform, TouchableOpacity,ScrollView } from 'react-native'
import React from 'react'
import ShoppinInfo from './ShoppinInfo'
// import { FlatList, GestureHandlerRootView,ScrollView} from 'react-native-gesture-handler';
export default function Caption({acıklama}) {
  return (

    <View style={[styles.card,{paddingLeft:10,paddingRight:10,flex:1}]}>

   
  <ScrollView  showsVerticalScrollIndicator={false}contentContainerStyle={{flexGrow:1}} nestedScrollEnabled={true} >
   
    
    <Text>

{acıklama}

</Text>
   


</ScrollView>



   
    
  
   


   
  
  
    <View style={styles.Info}>
        <ShoppinInfo/>
        
        </View>
        </View>
  )
}
const styles=StyleSheet.create({
  card: {  
        top:10,
  
    backgroundColor: '#FFFFFF',  
    paddingBottom:20,
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