import { View, Text,StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import NeigbourhoodCard from './profileComponents/NeigbourhoodCard'

export default function SeeNeigbourhood() {

  return (
    <ScrollView style={styles.container}>
      
        <View style={{gap:5,paddingTop:10}}>
            <NeigbourhoodCard/>
            <NeigbourhoodCard/>
            <NeigbourhoodCard/>
        </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#F5F5F7',
        padding:10
    }
})
