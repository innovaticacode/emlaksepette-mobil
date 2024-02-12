import { View, Text } from 'react-native'
import React from 'react'
import EntypoIcon from "react-native-vector-icons/Entypo"
export default function Info({text}) {
  return (
    <View style={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'

    }}>
        <View>
        <EntypoIcon
                name="dot-single"
                style={{
                  color: "red",
                 
                  fontSize: 20,
                }}
              />
        </View>
        <View>
            <Text>{text}</Text>
        </View>
    </View>
  )
}