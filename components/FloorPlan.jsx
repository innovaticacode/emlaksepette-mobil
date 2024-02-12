import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function FloorPlan() {
  return (
    <View style={styles.container}>
      <View style={{
        width:'100%',
        height:'6%',
        backgroundColor:'#EA2C2E',
        paddingLeft:15,
        padding:10,
        justifyContent:'center'
      }}>
        <Text style={{
            color:'white',
            fontSize:20,
            fontWeight:'600'
        }}>Vaziyet planı belirtilmedi</Text>
      </View>
    </View>
  )
}
const styles=StyleSheet.create({
    container:{
      width:'100%',
      height:'100%',
      top:10
    }
})