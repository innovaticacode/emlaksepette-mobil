import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
export default function TextInputAndFilterBtn({openSortModal,searchTerm, setSearchTerm}) {
  return (
    <View
    style={{
      padding: 2,
    
      flexDirection: "row",
      gap: 4,
    }}
  >
    <TextInput
      style={{
     
            backgroundColor: "#ebebeb",
            padding: 10,
            borderRadius: 5,
            width: "90%",
        
      }}
      placeholder="Kelime veya İlan No ile ara"
       value={searchTerm}
       onChangeText={(value)=>setSearchTerm(value)}
    />
    <TouchableOpacity
      style={{
        backgroundColor: "#ebebeb",
        width: "10%",
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={() => {
        openSortModal(true);
      }}
    >
      <MaterialIcon name="swap-vertical" size={23} color={"#333"} />
    </TouchableOpacity>
  </View>
  )
}