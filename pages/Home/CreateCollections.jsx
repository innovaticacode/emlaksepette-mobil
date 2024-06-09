import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

export default function CreateCollections() {
    const route=useRoute()
    const {id}= route.params
  return (
    <ScrollView style={styles.container}>
            <View></View>
    </ScrollView>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f7f7f7f7',
        padding:10
    }
})