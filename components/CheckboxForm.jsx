import { View, Text } from 'react-native'
import React from 'react'
import { CheckBox } from 'react-native-elements'
export default function CheckboxForm({item,getCheckedItems}) {

    const [checkedForm, setCheckedForm] = React.useState(false);
    const toggleCheckboxForm = () => {
      
      setCheckedForm(!checkedForm)
      getCheckedItems(item)
    };
  return (
    <View style={{width:'45%'}}>
         <CheckBox
                  
                    checked={checkedForm}
                    onPress={toggleCheckboxForm}
                    // Use ThemeProvider to make change for all checkbox
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checkedColor="red"
                    title={  <Text style={{fontSize:12}} >{item}</Text>}
                    size={20}
                    containerStyle={{backgroundColor:'white',borderWidth:0,width:'100%',margin:10}}
                  />
    </View>
  )
}