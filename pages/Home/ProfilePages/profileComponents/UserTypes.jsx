import { View, Text, TouchableOpacity } from 'react-native'
import {useState} from 'react'

export default function UserTypes({onPress,rol,display}) {
const [role, setrole] = useState('')
    return (
        <View >
            <TouchableOpacity style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ebebeb', }}
                    onPress={onPress}
            >
                <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'flex-start', padding: 3, }}>

                    <Text style={{ textAlign: 'center', top: 2, }}>{rol}</Text>

                </View>
            </TouchableOpacity>
        </View>
    )
}