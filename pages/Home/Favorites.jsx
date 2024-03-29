import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Favorite from '../../components/Favorite'

export default function Favorites() {
  return (
 
    <View style={styles.container}>
           <ScrollView contentContainerStyle={{}} showsVerticalScrollIndicator={false}>
            <Favorite/>
            <Favorite/>
          
           


            </ScrollView>
    </View>
  
  )
}
const styles=StyleSheet.create({
        container:{
           
            paddingBottom:100,
            padding:1,
            height:'100%'
        }
})