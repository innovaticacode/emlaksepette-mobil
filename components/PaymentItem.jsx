import { View, Text } from 'react-native'
import React from 'react'

export default function PaymentItem({header,price,dFlex,date,align,top}) {
  return (
    <View style={{
        width:'100%',
        
     
       borderTopWidth:1,
        borderTopColor:'black',
        justifyContent:'center',
      padding:4

    }}>
      <View style={{
        display:'flex',
        flexDirection:dFlex=='column'?'column':'row',
        alignItems:align=='center'?'center':'baseline',
        
        
      }}>
            <View>
                <Text style={{
                    fontSize:16,
                    fontWeight:'700',
                    
                }}>{header}</Text>
                </View>
                <View>
                <Text style={{
                    fontSize:14,
                    top:top=='7'?7.8:0
                }}> {price} </Text>
                <Text>{date}</Text>
                </View>
      </View>
    </View>
  )
}