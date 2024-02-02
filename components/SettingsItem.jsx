import { View, Text } from "react-native";
import React from "react";

export default function SettingsItem({info,numbers}) {
  return (
    <View
      style={{
        width: "100%",
        height: 50,
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding:10,
        borderBottomWidth:0.3,
       borderColor:'black'
       
      }}
    >
      <View style={{justifyContent:'center'}}>
        <Text>{info}</Text>
      </View>
      <View style={{justifyContent:'center'}}>
        <Text>{numbers}</Text>
      
      </View>
      
    </View>
  );
}
