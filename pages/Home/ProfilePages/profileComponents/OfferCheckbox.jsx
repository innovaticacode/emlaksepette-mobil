import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { CheckBox } from '@rneui/base'
export default function OfferCheckbox({title,closeSheet,ChooseEstate}) {
    const [checked, setChecked] = React.useState(false);
    const toggleCheckbox = () => setChecked(!checked);
  return (
    <View style={{borderWidth:1 ,borderColor:'#ebebeb',borderRadius:10}}>
        <TouchableOpacity onPress={()=>{
           
        }}>
         <CheckBox
            onPressIn={()=>{
                ChooseEstate(title)
                
               
                
            }}
           checked={checked}
           onPress={toggleCheckbox}
           iconType="material-community"
           checkedIcon="checkbox-outline"
           uncheckedIcon={'checkbox-blank-outline'}
           title={title}
           checkedColor='green'
         />
         </TouchableOpacity>
    </View>
  )
}