import { View, Text,StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

export default function CategoryAdverts({text,navigationRoute, DisplayParams,newRoute}) {
    const navigation=useNavigation()
  return (
   
    
       
        
      
    <View style={styles.ıtem}>
     <View style={{display:'flex',flexDirection:'row',}}>
        <View style={{flex:1.3/2,display:'flex',flexDirection:'row',gap:10}}>
      
          
          
          
          <Text style={{fontSize:15}}>{text}</Text>
        </View>
        <View style={{flex:0.7/2,alignItems:'flex-end'}}>         
          <Icon name='arrow-forward-ios' size={16} color={'#bebebe'}/>
        </View>
     </View>
    </View>
   
  )
}
const  styles = StyleSheet.create({
    container: {
        flex:1,
        padding:20
    },
    ıtem:{
        marginTop:5,
        padding:10,
        borderBottomWidth:0.5,
        borderBottomColor:'#bebebe',
       
      
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