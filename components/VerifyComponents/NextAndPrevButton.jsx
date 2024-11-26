import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const NextAndPrevButton = ({nextButtonPress,prevButtonPress,NextButtonDisabled,PrevButtonDisabled}) => {
    console.log(NextButtonDisabled+ 'fdf')
  return (
    <View style={styles.containerButtons}>
     <TouchableOpacity style={[styles.PrevButton]} onPress={()=>{
        prevButtonPress()
     }}>
            <Text style={styles.PrevButtonText}>Önceki Adım</Text>
     </TouchableOpacity>

     <TouchableOpacity disabled={NextButtonDisabled}  style={[styles.NextButton]} onPress={()=>{
        nextButtonPress()
     }}>
            <Text style={styles.NextButtonText}>Sonraki Adım</Text>
     </TouchableOpacity>
    </View>
  )
}

export default NextAndPrevButton

const styles=StyleSheet.create({
    NextButton:{
        backgroundColor:'#EA2C2E',
        padding:10,
        width:'45%',
        borderRadius:10
    },
    NextButtonText:{
        color:'white',
        fontSize:14,
        fontWeight:'600',
        textAlign:'center'
    },
    PrevButton:{
        backgroundColor:'white',
        padding:10,
        width:'45%',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#EA2C2E'
    },
    PrevButtonText:{
            color:'#EA2C2E',
            fontSize:14,
            fontWeight:'600',
            textAlign:'center'
    },
    containerButtons:{
        position:'absolute',
        zIndex:1,
        bottom:30,
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-around'
    }

})