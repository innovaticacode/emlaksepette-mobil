import { View, Text, TouchableOpacity } from 'react-native'
import {useState} from 'react'
import { CheckBox } from '@rneui/base'
export default function ListCheckBox({title,checked,onPress}) {
  // const [checked, setChecked] = useState(false);
  // const toggleCheckbox = () => setChecked(!checked);
  return (
    <View style={{borderWidth:1 ,borderColor:'#ebebeb',borderRadius:10,}}>
      
         <CheckBox
        containerStyle={{padding:5}}
           checked={checked}
           onPress={onPress}
           iconType="material-community"
           checkedIcon="checkbox-outline"
           uncheckedIcon={'checkbox-blank-outline'}
           title={title}
           checkedColor='green'
         />
       
    </View>
  )
}