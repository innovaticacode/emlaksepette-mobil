import { View, Text } from 'react-native'
import React from 'react'
import { CheckBox } from '@rneui/base'
export default function Checkbox({title}) {
    const [checked, setChecked] = React.useState(false);
    const toggleCheckbox = () => setChecked(!checked);
  return (
    <View style={{borderWidth:1 ,borderColor:'#ebebeb',borderRadius:10}}>
         <CheckBox
           checked={checked}
           onPress={toggleCheckbox}
           iconType="material-community"
           checkedIcon="checkbox-outline"
           uncheckedIcon={'checkbox-blank-outline'}
           title={title}
           checkedColor='#EA2A29'
         />
    </View>
  )
}