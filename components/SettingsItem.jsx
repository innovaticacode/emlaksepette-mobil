import { View, Text } from "react-native";
import React from "react";

export default function SettingsItem({info,numbers,border,color,bold}) {
  return (
    <View
      style={{
        width: "100%",
        height: 40,
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding:10,
        borderBottomWidth:border==='0'? 0 : 1,
       borderColor:'#EBEBEB'
       
      }}
    >
      <View style={{justifyContent:'center'}}>
        <Text style={{fontSize:11,}}>{info}</Text>
      </View>
      <View style={{justifyContent:'center'}}>
        <Text style={{fontSize:11,color: color==='#264ABB'? '#264ABB':'black',fontWeight:bold==='bold'? 'bold':'normal'}}>{numbers}</Text>
      
      </View>
      
    </View>
  );
}
