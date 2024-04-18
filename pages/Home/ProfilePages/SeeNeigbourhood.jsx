import { View, Text,StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import NeigbourhoodCard from './profileComponents/NeigbourhoodCard'

export default function SeeNeigbourhood() {

  return (
    <ScrollView style={styles.container}>
        <View style={{padding:0}}> 
        <Text style={{fontSize:22,letterSpacing:0.5,color:'#333'}}>Komşularım</Text>
        </View>
        <View style={{gap:5,paddingTop:20}}>
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
