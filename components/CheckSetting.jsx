import { View, Text } from 'react-native'
import React from 'react'
import CheckIcon from 'react-native-vector-icons/AntDesign';
export default function CheckSetting({text}) {
  return (
    <View style={{flexDirection:'row',alignItems:'center',gap:10,margin:9}}>
            <View>
                <CheckIcon name='checksquare' color={'#E54242'} size={14}/>
            </View>
            <Text style={{fontSize:12}}>{text}</Text>
    </View>
  )
}