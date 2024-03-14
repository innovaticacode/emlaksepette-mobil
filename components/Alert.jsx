import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
export default function Alert({ text, show }) {
    return (
        <View style={{ flexDirection: 'row',
         alignItems: 'center',
          gap: 8,
          
             backgroundColor: '#6fdb4ebd',
         
        padding: 10 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{text}</Text>
            <Icon name='check' size={18} color={'white'} />
        </View>
    )
}