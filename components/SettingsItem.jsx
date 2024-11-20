import { View, Text } from "react-native";
import React from "react";

export default function SettingsItem({
  info,
  numbers,
  border,
  color,
  bold,
  number,
  fontWeight,
  icon,
}) {
  return (
    <View
      style={{
        width: "100%",
        height: 40,
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        borderWidth:border==='0'? 0 :1,
          borderRadius:10,
        borderColor: "#DBDBDB",
      }}
    >
      <View style={{ justifyContent: "center" }}>
        <Text
          style={{
            fontSize: 12,
            color: color ? color : "black",
            fontWeight: fontWeight ? fontWeight : 500,
          }}
        >
          {number ?? number} {info}
        </Text>
      </View>
      <View style={{ justifyContent: "center" }}>
        <Text
          style={{
            flexDirection: "row",
            alignItems: "center",
            fontSize: 12,
            color: color ? color : "black",
            fontWeight: 500,
          }}
        >
          {icon && icon} {numbers}
        </Text>
      </View>
    </View>
  );
}
