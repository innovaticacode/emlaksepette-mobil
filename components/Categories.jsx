import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Categories({
  category,
  ıconDisplay,
  showImage,
  bordernone,
  ıconName,
}) {
  return (
    <View
      style={[
        styles.category,
        {
          borderBottomWidth: 0
        },
      ]}
    > 
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap:8
        }}
      >
        
        <Icon name={ıconName} size={18}/>
        <Text
          style={{
            fontSize: 14,
            color: "#333",
            fontWeight: "500",
            
          }}
        >
          {category}
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
     
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  category: {
    padding: 8,
    
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0,
    borderBottomColor: "#ebebeb",
  },
});
