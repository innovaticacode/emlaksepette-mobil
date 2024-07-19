import { View, Text,StyleSheet,Dimensions } from 'react-native'
import React from 'react'
import EntypoIcon from "react-native-vector-icons/Entypo"
export default function Info({text}) {
  return (
    <View style={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'

    }}>
        
          {
            text ? 
              <View style={{ display:'flex',
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
                    <Text style={styles.text}>{text}</Text>
                </View>
              </View>
            : <View></View>
          }
        
    </View>
  )
}
const { width, height } = Dimensions.get('window');
const styles=StyleSheet.create({
  text:{
      fontSize:width>400 ? 11:9
  }
})