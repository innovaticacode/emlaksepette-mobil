import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import EditCollectionPost from './profileComponents/EditCollectionPost'
import { Platform } from "react-native";
export default function EditCollection() {
  return (
    <ScrollView style={{backgroundColor:'white'}} showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
       <View style={styles.shadowcard}>
           <EditCollectionPost/>
           <EditCollectionPost/>
       </View>
    </View>
    </ScrollView>
  )
}
const styles=StyleSheet.create({
        container:{
            height:1000,
            backgroundColor:'white'
        },
        shadowcard:{
            gap:10,
            backgroundColor: '#FFFFFF',  
            borderRadius: 10,  
            paddingVertical: 22,  
            paddingHorizontal: 5,  
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
    
        }
})