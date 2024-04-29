import { View, Text ,StyleSheet,Platform, TouchableOpacity,ScrollView } from 'react-native'
import React from 'react'
import HTML from 'react-native-render-html';
// import { FlatList, GestureHandlerRootView,ScrollView} from 'react-native-gesture-handler';
export default function Caption({data}) {
  const caption=data?.project?.description.replace(/<[^>]+>|&[a-zA-Z]+;|[%&]|&gt;/g, '')
  return (

    <View style={[styles.card,{paddingLeft:20,paddingRight:20,flex:1}]}>
    <Text>
    <HTML source={{ html: data?.project?.description }}  contentWidth={100}/>
</Text>
   




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